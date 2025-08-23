import { useEffect, useRef, useState, useMemo } from 'react';
import { useProjectVisibility } from './context-providers/project-context';
import { attachOpacityObserver } from './content-utility/opacity-observer';
import { baseProjects } from './content-utility/component-loader';
import { ProjectPane } from './project-pane';
import { useSsrData } from './context-providers/ssr-data-context';
import { seededShuffle } from './seed';

const ScrollController = () => {
  const { scrollContainerRef, focusedProjectKey, currentIndex } = useProjectVisibility();
  const { seed = 12345 } = useSsrData() || {};
  const projects = useMemo(() => seededShuffle(baseProjects, seed), [seed]);

  const [justExitedFocusKey, setJustExitedFocusKey] = useState<string | null>(null);
  const [invisibleKeys, setInvisibleKeys] = useState<Set<string>>(new Set());
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [viewportStyle, setViewportStyle] = useState({ height: '98dvh', paddingBottom: '2dvh' });

  const updateViewportStyle = () => {
    const width = window.innerWidth;
    if (width >= 1025) setViewportStyle({ height: '96dvh', paddingBottom: '4dvh' });
    else if (width >= 768) setViewportStyle({ height: '92dvh', paddingBottom: '8dvh' });
    else setViewportStyle({ height: '98dvh', paddingBottom: '2dvh' });
  };

  useEffect(() => {
    updateViewportStyle();
    window.addEventListener('resize', updateViewportStyle);
    return () => window.removeEventListener('resize', updateViewportStyle);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.classList.add('no-snap');
    const timeout = setTimeout(() => container.classList.remove('no-snap'), 800);
    return () => clearTimeout(timeout);
  }, [currentIndex, scrollContainerRef]);

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

  /**
   * Global, capture-phase edge handoff for both wheel & touch.
   * - Uses composedPath() so it works through Shadow DOM.
   * - Finds the nearest scrollable in the path (overflow:auto/scroll and scrollHeight > clientHeight).
   * - When at top/bottom edge, prevents default and scrolls the outer container instead.
   * - Enabled only while #block-dynamic is in view.
   */
  useEffect(() => {
    const outer = scrollContainerRef.current;
    if (!outer) return;

    let enabled = false;
    let hostIO: IntersectionObserver | null = null;

    // Track a single active touch gesture
    let activeScrollEl: HTMLElement | null = null;
    let touchActive = false;
    let lastY = 0;

    const getPath = (e: Event): EventTarget[] =>
      (e as any).composedPath ? (e as any).composedPath() : [e.target as EventTarget];

    const isScrollableEl = (el: HTMLElement) => {
      const cs = getComputedStyle(el);
      const canScrollY = (cs.overflowY === 'auto' || cs.overflowY === 'scroll');
      return canScrollY && el.scrollHeight > el.clientHeight;
    };

    const findScrollableInPath = (path: EventTarget[]): HTMLElement | null => {
      for (const t of path) {
        if (!(t instanceof HTMLElement)) continue;
        // Prefer an explicit marker if you use one:
        if (t.classList?.contains('embedded-app')) return t;
        if (isScrollableEl(t)) return t;
      }
      return null;
    };

    const atTop = (el: HTMLElement) => el.scrollTop <= 0;
    const atBottom = (el: HTMLElement) => (el.scrollTop + el.clientHeight) >= (el.scrollHeight - 1);

    // ----- Wheel (desktop, trackpads) -----
    const onWheel = (e: WheelEvent) => {
      if (!enabled) return;
      const path = getPath(e);
      const scrollEl = findScrollableInPath(path);
      if (!scrollEl) return;

      // If the inner can still scroll, let it handle
      const goingDown = e.deltaY > 0;
      if (goingDown && !atBottom(scrollEl)) return;
      if (!goingDown && !atTop(scrollEl)) return;

      // Edge hit: hand off to outer
      e.preventDefault();
      outer.scrollBy({ top: e.deltaY > 0 ? 300 : -300, behavior: 'smooth' });
    };

    // ----- Touch (mobile) -----
    const onTouchStart = (e: TouchEvent) => {
      if (!enabled) return;
      if (e.touches.length !== 1) return;
      const path = getPath(e);
      activeScrollEl = findScrollableInPath(path);
      touchActive = true;
      lastY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!enabled || !touchActive || e.touches.length !== 1) return;

      const y = e.touches[0].clientY;
      const dy = y - lastY; // finger down => dy>0, finger up => dy<0
      lastY = y;

      // If no dedicated scroll el was captured, try again dynamically
      if (!activeScrollEl) {
        const path = getPath(e);
        activeScrollEl = findScrollableInPath(path);
      }
      const el = activeScrollEl;

      if (!el) return;

      const canScroll = el.scrollHeight > el.clientHeight;
      const hitTop = !canScroll || atTop(el);
      const hitBottom = !canScroll || atBottom(el);

      // Pulling down at top => scroll outer up; pulling up at bottom => scroll outer down
      if ((dy > 0 && hitTop) || (dy < 0 && hitBottom)) {
        // Important: passive MUST be false for this to take effect
        e.preventDefault();
        // Use sync scrollTop change for immediate response on iOS
        outer.scrollTop -= dy;
      }
    };

    const onTouchEnd = () => {
      touchActive = false;
      activeScrollEl = null;
    };

    const enable = () => {
      if (enabled) return;
      enabled = true;
      // capture:true so we see events before inner handlers; passive:false where we may call preventDefault
      window.addEventListener('wheel', onWheel as EventListener, { capture: true, passive: false });
      window.addEventListener('touchstart', onTouchStart as EventListener, { capture: true, passive: true });
      window.addEventListener('touchmove', onTouchMove as EventListener, { capture: true, passive: false });
      window.addEventListener('touchend', onTouchEnd as EventListener, { capture: true, passive: true });
      window.addEventListener('touchcancel', onTouchEnd as EventListener, { capture: true, passive: true });
    };

    const disable = () => {
      if (!enabled) return;
      enabled = false;
      window.removeEventListener('wheel', onWheel as EventListener, { capture: true } as any);
      window.removeEventListener('touchstart', onTouchStart as EventListener, { capture: true } as any);
      window.removeEventListener('touchmove', onTouchMove as EventListener, { capture: true } as any);
      window.removeEventListener('touchend', onTouchEnd as EventListener, { capture: true } as any);
      window.removeEventListener('touchcancel', onTouchEnd as EventListener, { capture: true } as any);
      touchActive = false;
      activeScrollEl = null;
    };

    // Gate by host visibility so we don't run globally all the time
    const host = document.getElementById('block-dynamic');
    if (host && 'IntersectionObserver' in window) {
      hostIO = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) enable();
          else disable();
        },
        { threshold: [0, 0.2] }
      );
      hostIO.observe(host);
    } else {
      // Fallback: just enable
      enable();
    }

    return () => {
      if (hostIO) hostIO.disconnect();
      disable();
    };
  }, [scrollContainerRef]);

  const blockIds = useMemo(() => projects.map(p => `#block-${p.key}`), [projects]);

  useEffect(() => {
    const cleanup = attachOpacityObserver(blockIds, focusedProjectKey);
    return cleanup;
  }, [blockIds, focusedProjectKey]);

  return (
    <div
      ref={scrollContainerRef}
      className="SnappyScrollThingy"
      style={{
        height: viewportStyle.height,
        overflowY: 'scroll',
        scrollSnapType: focusedProjectKey ? 'none' : 'y mandatory',
        scrollBehavior: 'smooth',
        paddingBottom: viewportStyle.paddingBottom,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <style>{`.SnappyScrollThingy::-webkit-scrollbar { display: none; }`}</style>

      {projects.map((item, idx) => {
        const isFocused = focusedProjectKey === item.key;
        const isHidden = invisibleKeys.has(item.key);
        return (
          <ProjectPane
            key={item.key}
            item={item}
            viewportHeight={viewportStyle.height}
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
