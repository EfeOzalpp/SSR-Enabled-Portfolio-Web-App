import { useEffect, useRef, useState, useMemo } from 'react';
import { useProjectVisibility } from './context-providers/project-context';
import { attachOpacityObserver } from './content-utility/opacity-observer';
import { baseProjects } from './content-utility/component-loader';
import { ProjectPane } from './project-pane';
import { useSsrData } from './context-providers/ssr-data-context';
import { seededShuffle } from './seed';

/* ===========================
   Synthetic Drag: Type Augments
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
  }
}

const ScrollController = () => {
  const { scrollContainerRef, focusedProjectKey, currentIndex } = useProjectVisibility();
  const { seed = 12345 } = useSsrData() || {};
  const projects = useMemo(() => seededShuffle(baseProjects, seed), [seed]);

  const [justExitedFocusKey, setJustExitedFocusKey] = useState<string | null>(null);
  const [invisibleKeys, setInvisibleKeys] = useState<Set<string>>(new Set());
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // temporarily disable snap after index changes, to allow smooth momentum handoff
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.classList.add('no-snap');
    const timeout = setTimeout(() => container.classList.remove('no-snap'), 800);
    return () => clearTimeout(timeout);
  }, [currentIndex, scrollContainerRef]);

  // hide non-focused cards while focused
  useEffect(() => {
    if (focusedProjectKey) {
      const keysToHide = projects.filter(p => p.key !== focusedProjectKey).map(p => p.key);
      setInvisibleKeys(new Set(keysToHide));
    } else {
      const timeout = setTimeout(() => setInvisibleKeys(new Set()), 400);
      return () => clearTimeout(timeout);
    }
  }, [focusedProjectKey, projects]);

  useEffect(() => {
    if (focusedProjectKey) setJustExitedFocusKey(focusedProjectKey);
  }, [focusedProjectKey]);

  /* ===========================
     Edge signalling only (no cancel, no programmatic scroll)
     =========================== */
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let cleanupFns: Array<() => void> = [];
    const observer = new MutationObserver(() => {
      const embeddedEl = document.querySelector('.embedded-app') as HTMLElement | null;
      if (!embeddedEl) return;
      if (cleanupFns.length > 0) return;

      const atTop = () => embeddedEl.scrollTop <= 0;
      const atBottom = () => embeddedEl.scrollTop + embeddedEl.clientHeight >= embeddedEl.scrollHeight - 1;

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

      // TOUCH — passive; never preventDefault; only emit synthetic-drag at edges
      let lastY = 0;
      let lastTs = 0;

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          lastY = e.touches[0].clientY;
          lastTs = performance.now();
          fireSyntheticDrag('start', 'down', 0, 'touch');
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        const y = e.touches[0].clientY;
        const dy = y - lastY; // >0 down, <0 up
        const now = performance.now();
        const dt = Math.max(1, now - lastTs);
        const velocity = Math.abs(dy) / dt; // px/ms
        lastY = y;
        lastTs = now;

        // Only announce when the inner scroller is at an edge and user drags further toward that edge
        if ((dy > 0 && atTop()) || (dy < 0 && atBottom())) {
          fireSyntheticDrag('move', dy < 0 ? 'down' : 'up', Math.abs(dy), 'touch', velocity);
        }
      };

      const handleTouchEnd = () => {
        fireSyntheticDrag('end', 'down', 0, 'touch');
      };

      embeddedEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      embeddedEl.addEventListener('touchmove', handleTouchMove, { passive: true });
      embeddedEl.addEventListener('touchend', handleTouchEnd, { passive: true });

      // WHEEL — passive; emit synthetic-drag only at edges
      const handleWheel = (e: WheelEvent) => {
        const { deltaY } = e;
        const top = atTop();
        const bottom = atBottom();
        if ((deltaY < 0 && top) || (deltaY > 0 && bottom)) {
          fireSyntheticDrag('move', deltaY > 0 ? 'down' : 'up', Math.min(600, Math.abs(deltaY)), 'wheel');
        }
      };

      embeddedEl.addEventListener('wheel', handleWheel, { passive: true });

      cleanupFns = [
        () => embeddedEl.removeEventListener('touchstart', handleTouchStart),
        () => embeddedEl.removeEventListener('touchmove', handleTouchMove),
        () => embeddedEl.removeEventListener('touchend', handleTouchEnd),
        () => embeddedEl.removeEventListener('wheel', handleWheel),
      ];
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanupFns.forEach(fn => fn());
      cleanupFns = [];
    };
  }, [scrollContainerRef]);

  const blockIds = useMemo(() => projects.map(p => `#block-${p.key}`), [projects]);

  useEffect(() => {
    const cleanup = attachOpacityObserver(blockIds, focusedProjectKey);
    return cleanup;
  }, [blockIds, focusedProjectKey]);

  // Example consumer — left in place to react to synthetic-drag if you want
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onSynthetic = (e: Event) => {
      const { direction, magnitude, phase, source, velocity } = (e as CustomEvent).detail as {
        phase: 'start' | 'move' | 'end';
        direction: 'up' | 'down';
        magnitude: number;
        source: 'touch' | 'wheel';
        velocity?: number;
      };
      // Example reaction (disabled):
      // if (phase === 'move') {
      //   const bias = direction === 'down' ? 0.9 : -0.9;
      //   el.scrollBy({ top: window.innerHeight * bias, behavior: 'smooth' });
      // }
    };

    el.addEventListener('synthetic-drag', onSynthetic as EventListener);
    return () => el.removeEventListener('synthetic-drag', onSynthetic as EventListener);
  }, [scrollContainerRef]);

  return (
    <div
      ref={scrollContainerRef}
      className="SnappyScrollThingy"
      style={{
        overflowY: 'scroll',
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
      `}</style>

      {projects.map((item, idx) => {
        const isFocused = focusedProjectKey === item.key;
        const isHidden = invisibleKeys.has(item.key);
        return (
          <ProjectPane
            key={item.key}
            item={item}
            isFocused={isFocused}
            isHidden={isHidden}
            isFirst={idx === 0}
            setRef={(el) => { projectRefs.current[item.key] = el; }}
          />
        );
      })}
    </div>
  );
};

export default ScrollController;
