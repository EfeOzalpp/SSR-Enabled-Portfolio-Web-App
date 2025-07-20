/* Snappy Scroll Behavior for the main grid */
import { useEffect, useRef, useState } from 'react';
import { useProjectVisibility } from './project-context.tsx';
import ViewProject from '../components/view-project.tsx';
import RockEscapade from '../components/rock-escapade-case-study/rock-escapade-case-study.tsx';

const ScrollController = () => {
  const {
    currentIndex,
    setCurrentIndex,
    projectComponents,
    scrollContainerRef,
    isDragging,
    focusedProjectKey,
    previousScrollY,
    setPreviousScrollY,
  } = useProjectVisibility();

  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);
  const SCROLL_DELAY = 300;

  const [justExitedFocusKey, setJustExitedFocusKey] = useState<string | null>(null);
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [viewportStyle, setViewportStyle] = useState({ height: '98dvh', paddingBottom: '2dvh' });

  const updateViewportStyle = () => {
    const width = window.innerWidth;
    if (width >= 1025) {
      setViewportStyle({ height: '96dvh', paddingBottom: '4dvh' });
    } else if (width >= 768 && width <= 1024) {
      setViewportStyle({ height: '97dvh', paddingBottom: '3dvh' });
    } else {
      setViewportStyle({ height: '98dvh', paddingBottom: '2dvh' });
    }
  };

  useEffect(() => {
    updateViewportStyle();
    window.addEventListener('resize', updateViewportStyle);
    return () => window.removeEventListener('resize', updateViewportStyle);
  }, []);

  const handleWheel = (e: WheelEvent) => {
    if (isDragging || focusedProjectKey) return;

    let newIndex = currentIndex;
    if (e.deltaY > 50) {
      newIndex = Math.min(currentIndex + 1, projectComponents.length - 1);
    } else if (e.deltaY < -50) {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      window.dispatchEvent(new CustomEvent('arrowWiggle'));
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging || focusedProjectKey) return;
    const now = Date.now();
    if (now - lastScrollTime.current < SCROLL_DELAY) return;

    const deltaY = e.touches[0].clientY - touchStartY.current;

    let newIndex = currentIndex;
    if (Math.abs(deltaY) > 30) {
      if (deltaY > 0) {
        newIndex = Math.max(currentIndex - 1, 0);
      } else {
        newIndex = Math.min(currentIndex + 1, projectComponents.length - 1);
      }

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        window.dispatchEvent(new CustomEvent('arrowWiggle'));
        lastScrollTime.current = now;
        touchStartY.current = e.touches[0].clientY;
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [projectComponents.length, currentIndex, isDragging, focusedProjectKey]);

  // Capture the key of the project before leaving focus mode
  useEffect(() => {
    if (focusedProjectKey) {
      setJustExitedFocusKey(focusedProjectKey);
    }
  }, [focusedProjectKey]);

  // After exiting focus mode, scroll to the original project by key
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

  return (
    <div
      ref={scrollContainerRef}
      className="SnappyScrollThingy"
      style={{
        height: viewportStyle.height,
        overflowY: 'scroll',
        scrollSnapType: focusedProjectKey ? 'none' : 'y mandatory',
        paddingBottom: viewportStyle.paddingBottom,
      }}
    >
      {projectComponents.map((item) =>
        (!focusedProjectKey || focusedProjectKey === item.key) && (
          <div
            key={item.key}
            ref={(el) => (projectRefs.current[item.key] = el)}
            style={{ height: viewportStyle.height, scrollSnapAlign: 'start' }}
          >
            {item.component}
            {focusedProjectKey === item.key && item.title === 'Evade the Rock' ? (
              <RockEscapade />
            ) : (
              focusedProjectKey === item.key &&
              console.log('[Focused] Not Evade the Rock:', item.title)
            )}
          </div>
        )
      )}

      <ViewProject
        currentProject={projectComponents[currentIndex]}
        nextProject={projectComponents[currentIndex + 1] ?? null}
      />
    </div>
  );
};

export default ScrollController;
