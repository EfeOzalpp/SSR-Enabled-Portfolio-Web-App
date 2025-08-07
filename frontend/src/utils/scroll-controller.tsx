import { useEffect, useRef, useState } from 'react';
import { useProjectVisibility } from './project-context.tsx';

import RockEscapade from '../components/rock-escapade-case-study/rock-escapade-case-study.tsx';
import LoadingScreen from './content-utility/loading.tsx';
import { attachOpacityObserver } from '../utils/content-utility/opacity-observer.tsx';
import { projects } from '../utils/content-utility/component-loader.tsx';
import LazyInView from './content-utility/lazy-view.tsx';

const ScrollController = () => {
  const {
    scrollContainerRef,
    focusedProjectKey,
    currentIndex,
  } = useProjectVisibility();

  const [justExitedFocusKey, setJustExitedFocusKey] = useState<string | null>(null);
  const [invisibleKeys, setInvisibleKeys] = useState<Set<string>>(new Set());
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [viewportStyle, setViewportStyle] = useState({
    height: '98dvh',
    paddingBottom: '2dvh',
  });

  const updateViewportStyle = () => {
    const width = window.innerWidth;
    if (width >= 1025) {
      setViewportStyle({ height: '96dvh', paddingBottom: '4dvh' });
    } else if (width >= 768) {
      setViewportStyle({ height: '92dvh', paddingBottom: '8dvh' });
    } else {
      setViewportStyle({ height: '98dvh', paddingBottom: '2dvh' });
    }
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
  }, [currentIndex]);

  useEffect(() => {
    if (focusedProjectKey) {
      const keysToHide = projects
        .filter((p) => p.key !== focusedProjectKey)
        .map((p) => p.key);
      setInvisibleKeys(new Set(keysToHide));
    } else {
      const timeout = setTimeout(() => setInvisibleKeys(new Set()), 400);
      return () => clearTimeout(timeout);
    }
  }, [focusedProjectKey]);

  useEffect(() => {
    if (focusedProjectKey) {
      setJustExitedFocusKey(focusedProjectKey);
    }
  }, [focusedProjectKey]);

  useEffect(() => {
    if (!focusedProjectKey && justExitedFocusKey && scrollContainerRef.current) {
      const el = projectRefs.current[justExitedFocusKey];
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'auto' });
          setJustExitedFocusKey(null);
        });
      }
    }
  }, [focusedProjectKey, justExitedFocusKey]);

useEffect(() => {
  const scrollContainer = scrollContainerRef.current;
  if (!scrollContainer) return;

  let cleanupFns: (() => void)[] = [];

  const observer = new MutationObserver(() => {
    const embeddedEl = document.querySelector('.embedded-app');
    if (embeddedEl && cleanupFns.length === 0) {
      // attach handlers once
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
        const scrollAmount = Math.max(100, window.innerHeight * 0.9);

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

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    observer.disconnect();
    cleanupFns.forEach((fn) => fn());
  };
}, []);


  useEffect(() => {
    const blockIds = projects.map((p) => `#block-${p.key}`);
    const cleanup = attachOpacityObserver(blockIds, focusedProjectKey);
    return cleanup;
  }, [focusedProjectKey]);

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

      {projects.map((item) => {
        const isFocused = focusedProjectKey === item.key;
        const isHidden = invisibleKeys.has(item.key);

        return (
          <div
            key={item.key}
            id={`block-${item.key}`}
            ref={(el) => (projectRefs.current[item.key] = el)}
            style={{
              height: isHidden ? '0px' : isFocused ? 'auto' : viewportStyle.height,
              overflow: isFocused ? 'visible' : 'hidden',
              scrollSnapAlign: isHidden ? 'none' : 'start',
              opacity: isHidden ? 0 : 1,
              visibility: isHidden ? 'hidden' : 'visible',
              pointerEvents: isHidden ? 'none' : 'auto',
              transition: 'opacity 0.4s ease, visibility 0.4s ease',
            }}
          >
            <div style={{ minHeight: viewportStyle.height }}>
              <LazyInView
                load={item.lazyImport}
                fallback={<LoadingScreen isFullScreen={false} />}
              />
              {isFocused && item.title === 'Evade the Rock' && <RockEscapade />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScrollController;
