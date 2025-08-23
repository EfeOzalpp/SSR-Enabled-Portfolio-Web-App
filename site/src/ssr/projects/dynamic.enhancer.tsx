// src/ssr/projects/dynamic.enhancer.tsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDynamicOverlay } from '../../utils/content-utility/dynamic-overlay';
import { useRealMobileViewport } from '../../utils/content-utility/real-mobile';
import LoadingHub from '../../utils/loading/loading-hub';

type ShadowInboundProps = { onFocusChange?: (f: boolean) => void; onReady?: () => void };
type ShadowInboundType = React.ComponentType<ShadowInboundProps>;

function scheduleIdle(cb: () => void, timeout = 2000): () => void {
  const w = window as unknown as {
    requestIdleCallback?: (cb: IdleRequestCallback, opts?: { timeout?: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (typeof w.requestIdleCallback === 'function') {
    const id = w.requestIdleCallback(cb as unknown as IdleRequestCallback, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = window.setTimeout(cb, timeout);
  return () => window.clearTimeout(t);
}

const DynamicEnhancer: React.FC = () => {
  // locate SSR nodes
  const frameRef = useRef<HTMLElement | null>(null);
  const [overlayEl, setOverlayEl] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const img = document.getElementById('dynamic-device-frame') as HTMLElement | null;
    frameRef.current = img;
    const overlay = img?.closest('.device-wrapper')?.querySelector('.screen-overlay') as HTMLElement | null;
    setOverlayEl(overlay ?? null);
  }, []);

  // compute overlay sizing
  const overlaySize = useDynamicOverlay(frameRef);
  const isRealMobile = useRealMobileViewport();

  useEffect(() => {
    if (!overlayEl) return;
    const isPhone = window.matchMedia('(max-width: 767.98px)').matches;

    if (isPhone) {
      overlayEl.style.width = `${overlaySize.width}px`;
      overlayEl.style.height = isRealMobile
        ? `${overlaySize.heightSet1}svh`
        : `${overlaySize.heightSet2}px`;
    } else {
      overlayEl.style.removeProperty('width');
      overlayEl.style.removeProperty('height');
    }
  }, [overlayEl, overlaySize.width, overlaySize.heightSet1, overlaySize.heightSet2, isRealMobile]);

  // gate mounting of shadow app
  const [shouldMountShadow, setShouldMountShadow] = useState(false);

  useEffect(() => {
    const container = document.getElementById('block-dynamic');
    if (!container) { setShouldMountShadow(true); return; }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.3) {
          setShouldMountShadow(true);
          io.disconnect();
        }
      },
      { threshold: [0, 0.3] }
    );
    io.observe(container);

    const cancel = scheduleIdle(() => setShouldMountShadow(true), 2000);
    return () => { io.disconnect(); cancel(); };
  }, []);

  // lazy import + portal
  const [ShadowInbound, setShadowInbound] = useState<ShadowInboundType | null>(null);

  useEffect(() => {
    if (!shouldMountShadow) return;
    let alive = true;
    import('../../dynamic-app/dynamic-app-shadow.jsx')
      .then(m => { if (alive) setShadowInbound(() => m.default as ShadowInboundType); })
      .catch(err => console.warn('[DynamicEnhancer] shadow import failed:', err));
    return () => { alive = false; };
  }, [shouldMountShadow]);

  // manage loader visibility
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const onHydrated = () => setShowLoader(false);
    window.addEventListener('dynamic-app:hydrated', onHydrated as EventListener);
    return () => window.removeEventListener('dynamic-app:hydrated', onHydrated as EventListener);
  }, []);

  if (!overlayEl) return null;

  const handleReady = () => {
    setShowLoader(false);
    window.dispatchEvent(new CustomEvent('dynamic-app:hydrated'));
  };

  return createPortal(
    <>
      {showLoader && (
        <LoadingHub
          keyword="dynamic"
          lines={[
            "Mounting dynamic app…",
            "Loading interactive media…",
            "Almost ready…"
          ]}
          minHeight={200}
          cycleMs={1500}
          animMs={800}
        />
      )}
      {ShadowInbound && shouldMountShadow && (
        <ShadowInbound onFocusChange={() => {}} onReady={handleReady} />
      )}
    </>,
    overlayEl
  );
};

export default DynamicEnhancer;
