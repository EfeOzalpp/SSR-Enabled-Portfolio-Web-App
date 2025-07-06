import { useRef } from 'react';

const SplitDragHandler = ({ split, setSplit }) => {
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();

    const isPortrait = window.innerHeight > window.innerWidth;

    const onMouseMove = (e) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newSplit;

      if (isPortrait) {
        // Vertical split: mouse Y position maps to % height
        newSplit = (e.clientY / viewportHeight) * 100;
      } else {
        // Horizontal split: mouse X position maps to % width
        newSplit = (e.clientX / viewportWidth) * 100;
      }

      newSplit = Math.max(0, Math.min(100, newSplit));

      setSplit(newSplit);

      // Update CSS variable for immediate handler positioning if used
      if (isPortrait) {
        document.documentElement.style.setProperty('--split-height', `${newSplit}%`);
      } else {
        document.documentElement.style.setProperty('--split-width', `${newSplit}%`);
      }
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const isPortrait = window.innerHeight > window.innerWidth;

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      className="split-drag-handler"
      style={{
        position: 'absolute',
        ...(isPortrait
          ? {
              left: 0,
              right: 0,
              top: `${split}%`,
              height: '8px',
              cursor: 'ns-resize',
              transform: 'translateY(-50%)',
            }
          : {
              top: 0,
              bottom: 0,
              left: `${split}%`,
              width: '8px',
              cursor: 'ew-resize',
              transform: 'translateX(-50%)',
            }),
        zIndex: 1000,
        background: 'rgba(255,255,255,0.2)',
        transition: isPortrait ? 'top 0s' : 'left 0s',
      }}
    />
  );
};

export default SplitDragHandler;
