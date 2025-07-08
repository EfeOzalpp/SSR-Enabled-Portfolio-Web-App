/* Snappy Scroll Behavior for the main grid */
import { useEffect, useRef, useState } from 'react';
import { useProjectVisibility } from './project-context.tsx';
import ViewProject from '../components/view-project.tsx';

const ScrollController = () => {
  const { currentIndex, setCurrentIndex, projectComponents, scrollContainerRef, isDragging } = useProjectVisibility();
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);
  const SCROLL_DELAY = 300; // ms

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
    if (isDragging) return;

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
    if (isDragging) return;
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
  }, [projectComponents.length, currentIndex, isDragging]);

  return (
    <div
      ref={scrollContainerRef}
      className='SnappyScrollThingy'
      style={{
        height: viewportStyle.height,
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        paddingBottom: viewportStyle.paddingBottom,
      }}
    >
      {projectComponents.map((item) => (
        <div key={item.key} style={{ height: viewportStyle.height, scrollSnapAlign: 'start' }}>
          {item.component}
        </div>
      ))}

      <ViewProject
        currentProject={projectComponents[currentIndex]}
        nextProject={projectComponents[currentIndex + 1] ?? null}
      />
    </div>
  );
};

export default ScrollController;
