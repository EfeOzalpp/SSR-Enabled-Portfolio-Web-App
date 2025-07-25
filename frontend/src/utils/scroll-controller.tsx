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
    setPreviousScrollY,
  } = useProjectVisibility();

  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);
  const SCROLL_DELAY = 300;

  const [justExitedFocusKey, setJustExitedFocusKey] = useState<string | null>(null);
  const [invisibleKeys, setInvisibleKeys] = useState<Set<string>>(new Set());
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [viewportStyle, setViewportStyle] = useState({ height: '98dvh', paddingBottom: '2dvh' });

  const updateViewportStyle = () => {
    const width = window.innerWidth;
    if (width >= 1025) {
      setViewportStyle({ height: '96dvh', paddingBottom: '4dvh' });
    } else if (width >= 768) {
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

  const accumulatedDelta = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleWheel = (e: WheelEvent) => {
    if (isDragging || focusedProjectKey) return;

    accumulatedDelta.current += e.deltaY;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      accumulatedDelta.current = 0;
    }, 250); // reset if they stop scrolling for 250ms

    const SCROLL_THRESHOLD = 10000; // adjust this to taste
    const steps = Math.floor(accumulatedDelta.current / SCROLL_THRESHOLD);

    if (steps !== 0) {
      let newIndex = currentIndex + Math.sign(steps);
      newIndex = Math.max(0, Math.min(projectComponents.length - 1, newIndex));

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        window.dispatchEvent(new CustomEvent('arrowWiggle'));
        accumulatedDelta.current = 0; // reset after scroll
      }
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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isDragging || focusedProjectKey) return;

    let newIndex = currentIndex;

    if (e.key === 'ArrowDown') {
      newIndex = Math.min(currentIndex + 1, projectComponents.length - 1);
    } else if (e.key === 'ArrowUp') {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      window.dispatchEvent(new CustomEvent('arrowWiggle'));
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projectComponents.length, currentIndex, isDragging, focusedProjectKey]);

  useEffect(() => {
  const container = scrollContainerRef.current;
  if (!container) return;

  container.classList.add('no-snap');
  const timeout = setTimeout(() => container.classList.remove('no-snap'), 800);
  return () => clearTimeout(timeout);
  }, [currentIndex]);

  useEffect(() => {
    const targetEl = projectRefs.current[projectComponents[currentIndex]?.key];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentIndex, projectComponents]);

  useEffect(() => {
    if (focusedProjectKey) {
      const keysToHide = projectComponents
        .filter(p => p.key !== focusedProjectKey)
        .map(p => p.key);
      setInvisibleKeys(new Set(keysToHide));
    } else {
      const timeout = setTimeout(() => {
        setInvisibleKeys(new Set());
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [focusedProjectKey, projectComponents]);

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
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE 10+
      }}
    >
      <style>
        {`
          .SnappyScrollThingy::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {projectComponents.map((item) => {
        const isFocused = focusedProjectKey === item.key;
        const isHidden = invisibleKeys.has(item.key);

        return (
          <div
            key={item.key}
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
            <>
              {item.component}
              {isFocused && item.title === 'Evade the Rock' && <RockEscapade />}
            </>
          </div>
        );
      })}

      <ViewProject
        currentProject={projectComponents[currentIndex]}
        nextProject={projectComponents[currentIndex + 1] ?? null}
      />
    </div>
  );
};

export default ScrollController;