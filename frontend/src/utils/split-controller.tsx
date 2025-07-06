/* Split control for block-1 */
import { useRef } from 'react';

const SplitDragHandler = ({ split, setSplit }) => {
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    const onMouseMove = (e) => {
      let newSplit = ((e.clientX - rect.left) / rect.width) * 100;

      // Clamp between 0 and 100
      newSplit = Math.max(0, Math.min(100, newSplit));

      setSplit(newSplit);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      className="split-drag-handler"
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${split}%`, // stick to split edge dynamically
        width: '8px',
        cursor: 'ew-resize',
        zIndex: 1000,
        background: 'rgba(255,255,255,0.2)',
        transform: 'translateX(-50%)',
        transition: 'left 0.05s linear, background 0.2s ease'
      }}
    />
  );
};

export default SplitDragHandler;
