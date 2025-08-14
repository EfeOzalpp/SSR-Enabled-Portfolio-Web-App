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

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let cleanupFns: (() => void)[] = [];
    const observer = new MutationObserver(() => {
      const embeddedEl = document.querySelector('.embedded-app') as HTMLElement | null;
      if (embeddedEl && cleanupFns.length === 0) {
        const handleWheel = (e: WheelEvent) => {
          const { deltaY } = e;
          const { scrollTop, scrollHeight, clientHeight } = embeddedEl;
          const atTop = scrollTop <= 0;
          const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
          if ((deltaY < 0 && atTop) || (deltaY > 0 && atBottom)) {
            e.preventDefault();
            scrollContainer.scrollBy({ top: deltaY > 0 ? 300 : -300, behavior: 'smooth' });
          }
        };

        let startY = 0;
        const handleTouchStart = (e: TouchEvent) => {
          if (e.touches.length === 1) startY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
          if (e.touches.length !== 1) return;
          const currentY = e.touches[0].clientY;
          const deltaY = currentY - startY;
          const { scrollTop, scrollHeight, clientHeight } = embeddedEl;
          const atTop = scrollTop <= 0;
          const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
          const scrollAmount = Math.max(100, window.innerHeight * 1);
          if (deltaY > 5 && atTop) {
            e.preventDefault();
            scrollContainer.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
          } else if (deltaY < -5 && atBottom) {
            scrollContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' });
          }
        };

        embeddedEl.addEventListener('wheel', handleWheel, { passive: false });
        embeddedEl.addEventListener('touchstart', handleTouchStart, { passive: true });
        embeddedEl.addEventListener('touchmove', handleTouchMove, { passive: false });

        cleanupFns = [
          () => embeddedEl.removeEventListener('wheel', handleWheel),
          () => embeddedEl.removeEventListener('touchstart', handleTouchStart),
          () => embeddedEl.removeEventListener('touchmove', handleTouchMove),
        ];
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanupFns.forEach(fn => fn());
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
