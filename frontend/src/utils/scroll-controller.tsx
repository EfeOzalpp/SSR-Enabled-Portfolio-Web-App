/* Snappy Scroll Behavior */
import { useEffect, useRef, useState } from 'react';
import getShuffledComponents from './shuffled-components.tsx';
import ViewProject from '../components/view-project.tsx';

const ScrollController = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectComponents = getShuffledComponents();

  const handleWheel = (e: WheelEvent) => {
    if (e.deltaY > 50) {
      setCurrentIndex((prev) => Math.min(prev + 1, projectComponents.length - 1));
    } else if (e.deltaY < -50) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className='SnappyScrollThingy'
      ref={containerRef}
      style={{ height: '98dvh', overflowY: 'scroll', scrollSnapType: 'y mandatory', paddingBottom: '2dvh' }}
    >
      {projectComponents.map((item, i) => (
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

