import React, { useEffect, useRef } from 'react';

type Sensitivity = number | { x?: number; y?: number };

/**
 * Wrap a single <img> or <video>. Lets users drag to pan the media
 * inside its container by adjusting CSS `object-position`.
 *
 * - Works with object-fit: cover (default).
 * - Handles mouse/touch via Pointer Events (with safe fallbacks).
 * - Only pans on axes where the covered media is larger than the box.
 * - While dragging, sets data-gesture-lock="1" so outer scroll handoff ignores it.
 */
export default function PannableViewport({
  className,
  style,
  children,
  sensitivity = 1.75,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  sensitivity?: Sensitivity;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Find first img/video under this wrapper
    const media = host.querySelector('img, video') as
      | HTMLImageElement
      | HTMLVideoElement
      | null;
    if (!media) return;

    const styleMedia = (media as HTMLElement).style;
    if (!styleMedia.objectFit) styleMedia.objectFit = 'cover';
    // Make sure SSR and client match by forcing a default
    const computed = window.getComputedStyle(media);
    if (!computed.objectPosition || computed.objectPosition === 'initial') {
      styleMedia.objectPosition = '50% 50%'; // only if truly missing
    }
    (media as any).draggable = false;

    const sensX =
      typeof sensitivity === 'number'
        ? sensitivity
        : Math.max(0.1, Math.min(10, sensitivity?.x ?? 1));
    const sensY =
      typeof sensitivity === 'number'
        ? sensitivity
        : Math.max(0.1, Math.min(10, sensitivity?.y ?? 1));

    let cw = 0,
      ch = 0; // container box
    let mw = 0,
      mh = 0; // intrinsic media
    let dispW = 0,
      dispH = 0; // displayed (covered) size

    let canPanX = false,
      canPanY = false;
    let pctPerPxX = 0,
      pctPerPxY = 0;

    const parseOP = () => {
      const op = window.getComputedStyle(media).objectPosition || '50% 50%';
      const [oxRaw, oyRaw] = op.split(/\s+/).map((t) => t.trim());
      const toPct = (v: string) => {
        if (v.endsWith('%')) return parseFloat(v);
        const n = parseFloat(v);
        return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 50;
      };
      return [toPct(oxRaw), toPct(oyRaw)] as [number, number];
    };

    const setOP = (xPct: number, yPct: number) => {
      const x = Math.max(0, Math.min(100, xPct));
      const y = Math.max(0, Math.min(100, yPct));
      styleMedia.objectPosition = `${x}% ${y}%`;
    };

    const computeCover = () => {
      const rect = host.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;

      if (media instanceof HTMLImageElement) {
        mw = media.naturalWidth || 0;
        mh = media.naturalHeight || 0;
      } else if (media instanceof HTMLVideoElement) {
        mw = media.videoWidth || 0;
        mh = media.videoHeight || 0;
      }

      if (!mw || !mh || !cw || !ch) {
        dispW = dispH = 0;
        canPanX = canPanY = false;
        pctPerPxX = pctPerPxY = 0;
        return;
      }

      const scale = Math.max(cw / mw, ch / mh);
      dispW = mw * scale;
      dispH = mh * scale;

      const overflowX = dispW - cw;
      const overflowY = dispH - ch;

      canPanX = overflowX > 1;
      canPanY = overflowY > 1;

      pctPerPxX = canPanX ? (100 / overflowX) * sensX : 0;
      pctPerPxY = canPanY ? (100 / overflowY) * sensY : 0;
    };

    // initial compute
    computeCover();

    // Safe ResizeObserver
    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => computeCover());
      ro.observe(host);
    }

    // For videos, wait for metadata to get intrinsic size
    let onMeta: any = null;
    if (media instanceof HTMLVideoElement) {
      onMeta = () => computeCover();
      media.addEventListener('loadedmetadata', onMeta);
    }

    // Drag state
    let startX = 0,
      startY = 0;
    let startOPX = 50,
      startOPY = 50;

    const setGestureLock = (on: boolean) => {
      draggingRef.current = on;
      if (on) {
        host.dataset.gestureLock = '1';
        host.style.touchAction = 'none';
        host.style.cursor = 'grabbing';
      } else {
        delete host.dataset.gestureLock;
        host.style.touchAction = '';
        host.style.cursor = '';
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if ((e.target as HTMLElement)?.closest('a,button,[role="button"]')) return;

      const [ox, oy] = parseOP();
      startOPX = ox;
      startOPY = oy;

      startX = e.clientX;
      startY = e.clientY;

      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      setGestureLock(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      let nextX = startOPX;
      let nextY = startOPY;
      if (canPanX) nextX = startOPX + dx * pctPerPxX;
      if (canPanY) nextY = startOPY + dy * pctPerPxY;
      setOP(nextX, nextY);
    };

    const endDrag = (e?: PointerEvent) => {
      if (!draggingRef.current) return;
      if (e) (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      setGestureLock(false);
    };

    const onDblClick = () => setOP(50, 50);

    // Safe pointer events
    if ('PointerEvent' in window) {
      host.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerup', endDrag as any, { passive: true });
    }
    host.addEventListener('dblclick', onDblClick);

    return () => {
      ro?.disconnect();
      if (media instanceof HTMLVideoElement && onMeta) {
        media.removeEventListener('loadedmetadata', onMeta);
      }
      if ('PointerEvent' in window) {
        host.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove as any);
        window.removeEventListener('pointerup', endDrag as any);
      }
      host.removeEventListener('dblclick', onDblClick);
      setGestureLock(false);
    };
  }, [sensitivity]);

  return (
    <div
      ref={hostRef}
      className={['pannable-viewport', className].filter(Boolean).join(' ')}
      data-gesture-lock={draggingRef.current ? '1' : undefined}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: 'grab',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
