import React, { useRef, useEffect } from 'react';
import { useProjectVisibility } from './project-context.tsx';

const SplitDragHandler = ({ split, setSplit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const { setIsDragging } = useProjectVisibility();

  useEffect(() => {
    const isPortrait = window.innerHeight > window.innerWidth;

    const handlePointerMove = (clientX, clientY) => {
      if (!isDragging.current) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newSplit = isPortrait
        ? (clientY / viewportHeight) * 100
        : (clientX / viewportWidth) * 100;

      newSplit = Math.max(0, Math.min(100, newSplit));
      setSplit(newSplit);
    };

    const handleMouseMove = e => handlePointerMove(e.clientX, e.clientY);
    const handleTouchMove = e => {
      if (!isDragging.current) return;
      if (e.touches.length === 1) {
        e.preventDefault();
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const startDragging = e => {
      e.preventDefault();
      isDragging.current = true;
      setIsDragging(true);

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', stopDragging);
    };

    const stopDragging = () => {
      isDragging.current = false;
      setIsDragging(false);

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopDragging);
    };

    const handleMouseDown = e => startDragging(e);
    const handleTouchStart = e => {
      if (e.touches.length === 1) {
        startDragging(e);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('touchstart', handleTouchStart);
      }
      // Ensure cleanup if unmounting during drag
      stopDragging();
    };
  }, [setSplit, setIsDragging]);

  const isPortrait = window.innerHeight > window.innerWidth;

  return (
    <div
      ref={containerRef}
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
        pointerEvents: 'all',
        touchAction: isDragging.current ? 'none' : 'auto', // 👈 only disable touch actions while dragging
      }}
    />
  );
};

export default SplitDragHandler;
