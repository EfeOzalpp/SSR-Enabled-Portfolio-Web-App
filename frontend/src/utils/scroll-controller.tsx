/* Snappy Scroll Behavior for the main grid */
import { useEffect, useRef } from 'react';
import { useProjectVisibility } from './project-context.tsx';
import ViewProject from '../components/view-project.tsx';

const ScrollController = () => {
  const { currentIndex, setCurrentIndex, projectComponents, scrollContainerRef } = useProjectVisibility();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent) => {
    if (e.deltaY > 50) {
      setCurrentIndex((prev) => Math.min(prev + 1, projectComponents.length - 1));
    } else if (e.deltaY < -50) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel);
    return () => container.removeEventListener('wheel', handleWheel);
  }, [projectComponents.length]);

  return (
    <div 
      ref={scrollContainerRef}
      className='SnappyScrollThingy'
      style={{
        height: '98dvh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        paddingBottom: '2dvh'
      }}
    >
      {projectComponents.map((item) => (
        <div key={item.key} style={{ height: '98dvh', scrollSnapAlign: 'start' }}>
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


