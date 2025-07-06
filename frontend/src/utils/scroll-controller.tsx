/* Snappy Scroll Behavior for the main grid */
import { useEffect, useRef, useState } from 'react';
import { useProjectVisibility } from './project-context.tsx';
import ViewProject from '../components/view-project.tsx';

const ScrollController = () => {
  const { currentIndex, setCurrentIndex, projectComponents, scrollContainerRef } = useProjectVisibility();
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerStyle, setContainerStyle] = useState({
    height: '98dvh',
    paddingBottom: '2dvh',
  });

  useEffect(() => {
    const viewportWidth = window.innerWidth;

    if (viewportWidth >= 1025) {
      setContainerStyle({ height: '96dvh', paddingBottom: '4dvh' });
    } else if (viewportWidth >= 768 && viewportWidth <= 1024) {
      setContainerStyle({ height: '97dvh', paddingBottom: '3dvh' });
    } else {
      setContainerStyle({ height: '98dvh', paddingBottom: '2dvh' });
    }
  }, []);

  const handleWheel = (e: WheelEvent) => {
    if (e.deltaY > 50) {
      setCurrentIndex((prev) => Math.min(prev + 1, projectComponents.length - 1));
    } else if (e.deltaY < -50) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel);

    const handleScroll = () => {
      const children = Array.from(container.children);
      let closestIndex = 0;
      let minDiff = Infinity;

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const diff = Math.abs(rect.top);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = index;
        }
      });

      setCurrentIndex(closestIndex);
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [projectComponents.length, setCurrentIndex, scrollContainerRef]);

  return (
    <div
      ref={scrollContainerRef}
      className='SnappyScrollThingy'
      style={{
        height: containerStyle.height,
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        paddingBottom: containerStyle.paddingBottom,
      }}
    >
      {projectComponents.map((item) => (
        <div key={item.key} style={{ height: containerStyle.height, scrollSnapAlign: 'start' }}>
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
