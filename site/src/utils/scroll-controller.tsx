// src/utils/scroll-controller.tsx
import { useEffect, useRef, useState, useMemo } from 'react';
import { useProjectVisibility } from './context-providers/project-context';
import { baseProjects } from './content-utility/component-loader';
import { ProjectPane } from './project-pane';
import { useSsrData } from './context-providers/ssr-data-context';
import { seededShuffle } from './seed';

/* ===========================
   Synthetic Drag & Exit Events
   =========================== */
declare global {
  interface DocumentEventMap {
    'synthetic-drag': CustomEvent<{
      phase: 'start' | 'move' | 'end';
      direction: 'up' | 'down';
      magnitude: number;     // px intention applied to the OUTER scroller
      velocity?: number;     // px/ms (optional)
      source: 'touch' | 'wheel';
      ts: number;            // performance.now()
    }>;
    'focus-exit-start': CustomEvent<{ key: string }>;
    'focus-exit-unlock': CustomEvent<{ key: string }>;
  }
}

const ScrollController = () => {
  const { scrollContainerRef, focusedProjectKey, currentIndex, setFocusedProjectKey } =
    useProjectVisibility();
  const { seed = 12345 } = useSsrData() || {};

  // Shuffle once on mount; never recompute order during this session
  const projectsRef = useRef(seededShuffle(baseProjects, seed));
  const projects = projectsRef.current;

  // Keep DOM refs to each block for precise scrolling
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Track last outer scrollTop and direction while focused
  const lastScrollTopRef = useRef<number>(0);
  const lastScrollDirRef = useRef<'up' | 'down'>('down');

  // ---- Tunables ----
  const VIS_RATIO_TO_EXIT = 0.2;     // 20% of any OTHER pane => auto-unfocus
  const VIS_DWELL_MS      = 120;     // must remain candidate for this long
  const MAX_UNLOCK_VH     = 0.90;    // 90dvh movement cap before details unmount
  const MIN_LINGER_MS     = 280;     // require at least this much time before unlock
  const MAX_LINGER_MS     = 800;     // (optional) don't linger longer than this
  const SNAP_RAMP_MS      = 400;     // proximity ramp
  const SNAP_KB_FALLBACK_MS = 1200;  // snap re-enable fallback
  const UNLOCK_FALLBACK_MS  = 1400;  // unlock fallback if scroll events don’t fire

  // Track the last non-null focused key so we can anchor (fallback) on exit
  const lastFocusedKeyRef = useRef<string | null>(null);
  useEffect(() => {
    if (focusedProjectKey) lastFocusedKeyRef.current = focusedProjectKey;
  }, [focusedProjectKey]);

  // Preferred exit target (set when user scrolls away during focus)
  const exitTargetKeyRef = useRef<string | null>(null);

  // Helper: element's offsetTop within a custom scroller
  const getOffsetTopWithin = (el: HTMLElement, scroller: HTMLElement | any) => {
    const r1 = el.getBoundingClientRect();
    const r2 = (scroller as HTMLElement).getBoundingClientRect?.() ?? { top: 0 };
    const st = ('scrollTop' in scroller ? scroller.scrollTop : document.documentElement.scrollTop) || 0;
    return r1.top - r2.top + st;
  };

  // Temporarily disable snap after index changes, to allow smooth momentum handoff
  // Only do this while focused; when NOT focused we want strong snap.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (!focusedProjectKey) return; // keep snap strong outside focus
    container.classList.add('no-snap');
    const timeout = setTimeout(() => container.classList.remove('no-snap'), 800);
    return () => clearTimeout(timeout);
  }, [currentIndex, focusedProjectKey, scrollContainerRef]);

  /* ===========================
     Focus entry scroll choreography
     - On entering focus: align the focused block, then bump ~90dvh
     =========================== */
  useEffect(() => {
    if (!focusedProjectKey) return;

    const scroller = scrollContainerRef.current ?? (document.scrollingElement as any);
    if (!scroller) return;

    const targetEl =
      projectRefs.current[focusedProjectKey] ??
      (document.getElementById(`block-${focusedProjectKey}`) as HTMLDivElement | null);

    const getViewportH = () =>
      (scroller?.clientHeight as number) ||
      (scroller?.getBoundingClientRect?.().height as number) ||
      (window.visualViewport?.height ?? window.innerHeight ?? document.documentElement.clientHeight ?? 0);

    requestAnimationFrame(() => {
      if (targetEl?.scrollIntoView) {
        targetEl.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
      const bump = Math.round(getViewportH() * 0.9);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scroller.scrollBy?.({ top: bump, left: 0, behavior: 'smooth' });
        });
      });
    });
  }, [focusedProjectKey, scrollContainerRef]);

  // --------------------------
  // Scrolling helpers
  // --------------------------
  const setScrollTop = (scroller: any, top: number) => {
    if ('scrollTop' in scroller) {
      scroller.scrollTop = top;
    } else {
      scroller.scrollTo?.({ top, left: 0, behavior: 'auto' });
    }
  };

  // Kill inertia, then instantly place (used for re-anchors after layout changes)
  const hardPlaceAtKey = (key: string) => {
    const scroller = scrollContainerRef.current ?? (document.scrollingElement as any);
    if (!scroller) return;
    const el =
      projectRefs.current[key] ??
      (document.getElementById(`block-${key}`) as HTMLDivElement | null);
    if (!el) return;

    const targetTop = getOffsetTopWithin(el, scroller);

    const prevBehavior = (scroller as HTMLElement).style.scrollBehavior;
    const prevOverflow = (scroller as HTMLElement).style.overflowY;

    (scroller as HTMLElement).style.scrollBehavior = 'auto';
    (scroller as HTMLElement).style.overflowY = 'hidden';
    // @ts-ignore force sync
    void scroller.offsetHeight;

    setScrollTop(scroller, targetTop);

    // @ts-ignore force sync
    void scroller.offsetHeight;

    (scroller as HTMLElement).style.overflowY = prevOverflow || 'scroll';
    (scroller as HTMLElement).style.scrollBehavior = prevBehavior || '';

    lastScrollTopRef.current = scroller.scrollTop || 0;
  };

  // Kill inertia, then tween to a key over ~260ms ease-out (nice transition)
  const animatePlaceToKey = (key: string, ms = 260) => {
    const scroller = scrollContainerRef.current ?? (document.scrollingElement as any);
    if (!scroller) return;

    const el =
      projectRefs.current[key] ??
      (document.getElementById(`block-${key}`) as HTMLDivElement | null);
    if (!el) return;

    const targetTop = getOffsetTopWithin(el, scroller);
    const startTop = scroller.scrollTop || 0;
    const delta = targetTop - startTop;
    if (Math.abs(delta) < 1) {
      hardPlaceAtKey(key);
      return;
    }

    const reduce =
      typeof window !== 'undefined' &&
      (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

    const duration = reduce ? 80 : ms;
    const start = performance.now();

    const prevBehavior = (scroller as HTMLElement).style.scrollBehavior;
    const prevOverflow = (scroller as HTMLElement).style.overflowY;
    (scroller as HTMLElement).style.scrollBehavior = 'auto';
    (scroller as HTMLElement).style.overflowY = 'hidden';

    // cubic ease-out
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const y = startTop + delta * easeOutCubic(t);
      setScrollTop(scroller, y);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        // restore
        (scroller as HTMLElement).style.overflowY = prevOverflow || 'scroll';
        (scroller as HTMLElement).style.scrollBehavior = prevBehavior || '';
        lastScrollTopRef.current = scroller.scrollTop || 0;
      }
    };

    // start
    // @ts-ignore
    void scroller.offsetHeight;
    raf = requestAnimationFrame(step);
    return () => raf && cancelAnimationFrame(raf);
  };

  /* ===========================
     AUTO-UNFOCUS while focused:
     - If any OTHER pane is ≥ 20% visible (and remains for VIS_DWELL_MS),
       we exit focus and force the exit target to the *adjacent* pane
       in the scroll direction (no skipping).
     =========================== */
  useEffect(() => {
    const scroller = scrollContainerRef.current ?? (document.scrollingElement as any);
    if (!focusedProjectKey || !scroller) return;

    let raf = 0;
    let dwellTimer: number | null = null;
    let pendingKey: string | null = null;

    const getViewportH = () =>
      (scroller?.clientHeight as number) ||
      (scroller?.getBoundingClientRect?.().height as number) ||
      (window.visualViewport?.height ?? window.innerHeight ?? document.documentElement.clientHeight ?? 0);

    const focusedIdx = projects.findIndex(p => p.key === focusedProjectKey);
    const clampAdjacentKey = (dir: 'up' | 'down') => {
      if (focusedIdx < 0) return null;
      const nextIdx = dir === 'down' ? Math.min(focusedIdx + 1, projects.length - 1)
                                     : Math.max(focusedIdx - 1, 0);
      if (nextIdx === focusedIdx) return null;
      return projects[nextIdx].key;
    };

    const pickCandidate = () => {
      const vh = getViewportH();
      const viewportCenter = vh * 0.5;

      let bestKey: string | null = null;
      let bestDist = Infinity;

      for (const p of projects) {
        if (p.key === focusedProjectKey) continue;
        const el = document.getElementById(`block-${p.key}`) as HTMLElement | null;
        if (!el) continue;

        const r = el.getBoundingClientRect();
        if (r.bottom <= 0 || r.top >= vh) continue;

        const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        const ratio = Math.max(0, visible) / Math.max(1, r.height);
        if (ratio < VIS_RATIO_TO_EXIT) continue;

        const center = r.top + r.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestKey = p.key;
        }
      }
      return bestKey;
    };

    const onTick = () => {
      raf = 0;
      const curr = scroller.scrollTop || 0;
      const dir: 'up' | 'down' = curr < lastScrollTopRef.current ? 'up'
                            : curr > lastScrollTopRef.current ? 'down'
                            : lastScrollDirRef.current;
      lastScrollDirRef.current = dir;
      lastScrollTopRef.current = curr;

      const anyVisibleOther = Boolean(pickCandidate());
      if (anyVisibleOther) {
        const neighbor = clampAdjacentKey(dir) ?? pickCandidate();
        if (neighbor && pendingKey !== neighbor) {
          pendingKey = neighbor;
          if (dwellTimer) window.clearTimeout(dwellTimer);
          dwellTimer = window.setTimeout(() => {
            exitTargetKeyRef.current = neighbor; // lock to adjacent pane
            setFocusedProjectKey(null);          // triggers robust exit
          }, VIS_DWELL_MS);
        }
      } else {
        pendingKey = null;
        if (dwellTimer) {
          window.clearTimeout(dwellTimer);
          dwellTimer = null;
        }
      }
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(onTick); };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // prime once

    return () => {
      scroller.removeEventListener('scroll', onScroll as any);
      if (raf) cancelAnimationFrame(raf);
      if (dwellTimer) window.clearTimeout(dwellTimer);
    };
  }, [focusedProjectKey, projects, scrollContainerRef, setFocusedProjectKey]);

  /* ===========================
     Focus EXIT choreography (robust)
     - Tween to adjacent pane (soft), cancel inertia first
     - Re-anchor after the old focused block collapses (hard)
     =========================== */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Only act when we EXIT focus (focusedProjectKey === null)
    if (focusedProjectKey) return;

    const preferredKey = exitTargetKeyRef.current || lastFocusedKeyRef.current;
    if (!preferredKey) return;

    const scroller = scrollContainerRef.current ?? (document.scrollingElement as any);

    // Prevent native snap fighting us during the handoff
    container.classList.add('no-snap');

    // Tell panes which key is exiting (kept for existing listeners)
    document.dispatchEvent(new CustomEvent('focus-exit-start', { detail: { key: preferredKey } }));

    // 1) Tween to the intended neighbor after killing inertia
    const cancelTween = animatePlaceToKey(preferredKey, 260);

    // 2) Re-anchor once the old focused block actually shrinks (details unmount)
    const oldKey = lastFocusedKeyRef.current;
    const oldEl = oldKey
      ? (projectRefs.current[oldKey] ??
         (document.getElementById(`block-${oldKey}`) as HTMLDivElement | null))
      : null;

    let ro: ResizeObserver | null = null;
    if (oldEl && typeof ResizeObserver !== 'undefined') {
      let prevH = oldEl.offsetHeight || 0;
      ro = new ResizeObserver(() => {
        const h = oldEl.offsetHeight || 0;
        // height dropped => layout shifted; re-anchor once
        if (h < prevH - 8) {
          hardPlaceAtKey(preferredKey);
          ro?.disconnect();
          ro = null;
        }
        prevH = h;
      });
      ro.observe(oldEl);
    }

    // 3) Small dwell, then unlock + gently re-enable snapping (proximity ramp)
    const unlockTimer = setTimeout(() => {
      document.dispatchEvent(new CustomEvent('focus-exit-unlock', { detail: { key: preferredKey } }));

      requestAnimationFrame(() => {
        container.classList.add('snap-proximity');
        container.classList.remove('no-snap');
        const ramp = setTimeout(() => container.classList.remove('snap-proximity'), SNAP_RAMP_MS);
        cleanupFns.push(() => clearTimeout(ramp));
      });

      // Clear the used target
      exitTargetKeyRef.current = null;
    }, MIN_LINGER_MS);

    // Fallback re-anchor in case RO is not available / missed (covers EXIT_DELAY_MS + fade)
    const postTimer = setTimeout(() => hardPlaceAtKey(preferredKey), 900);

    const cleanupFns: Array<() => void> = [
      () => typeof cancelTween === 'function' && cancelTween(),
      () => clearTimeout(unlockTimer),
      () => clearTimeout(postTimer),
      () => ro?.disconnect?.(),
    ];

    return () => {
      cleanupFns.forEach(fn => fn());
    };
  }, [focusedProjectKey, scrollContainerRef]);

  /* ===========================
     Edge signalling only (no cancel, no programmatic scroll)
     (rebinding-safe version so it survives DOM swaps)
     =========================== */
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let attachedEl: HTMLElement | null = null;

    const atTop = (el: HTMLElement) => el.scrollTop <= 0;
    const atBottom = (el: HTMLElement) => {
      // give ourselves a little room for sticky footers/safe-area/subpixel rounding
      const EPS = Math.max(8, Math.ceil((window.devicePixelRatio || 1) * 12));
      const max = (el.scrollHeight - el.clientHeight);
      return (max - el.scrollTop) <= EPS;
    };

    const fireSyntheticDrag = (
      phase: 'start' | 'move' | 'end',
      direction: 'up' | 'down',
      magnitude: number,
      source: 'touch' | 'wheel',
      velocity?: number
    ) => {
      const evt = new CustomEvent('synthetic-drag', {
        detail: { phase, direction, magnitude, velocity, source, ts: performance.now() },
        bubbles: true,
        composed: true,
      });
      scrollContainer.dispatchEvent(evt);
    };

    let lastY = 0;
    let lastTs = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (!attachedEl) return;
      if (e.touches.length === 1) {
        lastY = e.touches[0].clientY;
        lastTs = performance.now();
        fireSyntheticDrag('start', 'down', 0, 'touch');
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!attachedEl) return;
      if (e.touches.length !== 1) return;
      const y = e.touches[0].clientY;
      const dy = y - lastY; // >0 down, <0 up
      const now = performance.now();
      const dt = Math.max(1, now - lastTs);
      const velocity = Math.abs(dy) / dt;
      lastY = y;
      lastTs = now;

      if ((dy > 0 && atTop(attachedEl)) || (dy < 0 && atBottom(attachedEl))) {
        fireSyntheticDrag('move', dy < 0 ? 'down' : 'up', Math.min(600, Math.abs(dy)), 'touch', velocity);
      }
    };

    const handleTouchEnd = () => {
      fireSyntheticDrag('end', 'down', 0, 'touch');
    };

    const handleWheel = (e: WheelEvent) => {
      if (!attachedEl) return;
      const { deltaY } = e;
      const top = atTop(attachedEl);
      const bottom = atBottom(attachedEl);
      if ((deltaY < 0 && top) || (deltaY > 0 && bottom)) {
        fireSyntheticDrag('move', deltaY > 0 ? 'down' : 'up', Math.min(600, Math.abs(deltaY)), 'wheel');
      }
    };

    const cleanupFrom = (el: HTMLElement | null) => {
      if (!el) return;
      el.removeEventListener('touchstart', handleTouchStart as any);
      el.removeEventListener('touchmove', handleTouchMove as any);
      el.removeEventListener('touchend', handleTouchEnd as any);
      el.removeEventListener('wheel', handleWheel as any);
    };

    const maybeAttach = () => {
      const el = document.querySelector('.embedded-app') as HTMLElement | null;
      if (!el || el === attachedEl) return;
      cleanupFrom(attachedEl);
      attachedEl = el;
      attachedEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      attachedEl.addEventListener('touchmove', handleTouchMove, { passive: true });
      attachedEl.addEventListener('touchend', handleTouchEnd, { passive: true });
      attachedEl.addEventListener('wheel', handleWheel, { passive: true });
    };

    const mo = new MutationObserver(maybeAttach);
    mo.observe(document.body, { childList: true, subtree: true });
    maybeAttach();

    return () => {
      mo.disconnect();
      cleanupFrom(attachedEl);
      attachedEl = null;
    };
  }, [scrollContainerRef, focusedProjectKey]);

  const blockIds = useMemo(() => projects.map(p => `#block-${p.key}`), [projects]);

  // Example consumer — left in place to react to synthetic-drag if you want
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onSynthetic = (_e: Event) => {};
    el.addEventListener('synthetic-drag', onSynthetic as EventListener);
    return () => el.removeEventListener('synthetic-drag', onSynthetic as EventListener);
  }, [scrollContainerRef]);

  return (
    <div
      ref={scrollContainerRef}
      className="SnappyScrollThingy"
      style={{
        overflowY: 'scroll',
        // STRONG snap whenever not focused; focus mode disables via inline/logic above.
        scrollSnapType: focusedProjectKey ? 'none' : 'y mandatory',
        scrollBehavior: 'smooth',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <style>{`
        .SnappyScrollThingy::-webkit-scrollbar { display: none; }
        /* Allow native edge handoff */
        .SnappyScrollThingy { overscroll-behavior: auto; }
        .embedded-app { touch-action: pan-y; overscroll-behavior: auto; }

        /* Snap control helpers */
        .SnappyScrollThingy.no-snap { scroll-snap-type: none !important; }
        .SnappyScrollThingy.snap-proximity { scroll-snap-type: y proximity !important; }
      `}</style>

      {projects.map((item, idx) => {
        const isFocused = focusedProjectKey === item.key;
        return (
          <ProjectPane
            key={item.key}
            item={item}
            isFocused={isFocused}
            isFirst={idx === 0}
            setRef={(el) => { projectRefs.current[item.key] = el; }}
          />
        );
      })}
    </div>
  );
};

export default ScrollController;
