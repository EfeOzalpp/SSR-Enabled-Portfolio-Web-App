/* Snappy Scroll Behavior */
import { useEffect, useRef } from 'react';
import { getShuffledComponents } from './shuffled-components.tsx';

const ScrollController = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const projectComponents = getShuffledComponents();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.scrollBehavior = 'smooth'; // ensures smooth snap
    }
  }, []);

  return (
    <div className="SnappyScrollThingy"
      ref={containerRef}
      style={{
        height: '98dvh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        paddingBottom: '2dvh'
      }}
    >
      {projectComponents.map((comp, i) => (
        <div
          key={i}
          style={{
            height: '98dvh',
            scrollSnapAlign: 'start'
          }}
        >
          {comp}
        </div>
      ))}
    </div>
  );
};

export default ScrollController;

