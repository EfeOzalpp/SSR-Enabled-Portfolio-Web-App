/* Drag handler for SSR Rotary (pure DOM updates) */
import React, { useRef, useEffect, useState } from 'react';
import lottie from 'lottie-web';
import { useProjectVisibility } from './context-providers/project-context';
import arrowData2 from '../svg/arrow2.json';

type SplitDragHandlerProps = {
  split: number;
  setSplit: React.Dispatch<React.SetStateAction<number>>;
};

const SplitDragHandler: React.FC<SplitDragHandlerProps> = ({ split, setSplit }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { setIsDragging } = useProjectVisibility();

  const splitRef = useRef(split); // track % split without causing re-renders
  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const arrowContainer = useRef<HTMLDivElement | null>(null);
  const arrowAnimRef = useRef<any>(null);

  const [isPortrait, setIsPortrait] = useState(
    typeof window !== 'undefined' ? window.innerHeight > window.innerWidth : false
  );
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const initialPinchDistance = useRef<number | null>(null);
  const pinchTriggeredRef = useRef(false);
  const pinchThreshold = 10;

  /** Maintain same container height ratio logic */
  const getContainerHeightRatio = () => {
    const width = window.innerWidth;
    if (width < 768) return 0.98;
    if (width < 1025) return 0.92;
    return 0.96;
  };

  /** Helper: update media container sizes directly */
  const updateMediaSizes = (newSplit: number, isPortraitLayout: boolean) => {
    const media1 = document.getElementById('rotary-media-1-container');
    const media2 = document.getElementById('rotary-media-2-container');
    if (!media1 || !media2) return;

    const containerRatio = getContainerHeightRatio();
    const adjustedSplit = Math.min(100, Math.max(0, newSplit));

    if (isPortraitLayout) {
      media1.style.height = `${adjustedSplit * containerRatio}%`;
      media2.style.height = `${(100 - adjustedSplit) * containerRatio}%`;
      media2.style.top = `${adjustedSplit * containerRatio}%`;
    } else {
      media1.style.width = `${adjustedSplit}%`;
      media2.style.width = `${100 - adjustedSplit}%`;
      media2.style.left = `${adjustedSplit}%`;
    }
  };

  /** Resize handler for orientation changes */
  useEffect(() => {
    const handleResize = () => {
      const portraitNow = window.innerHeight > window.innerWidth;
      setIsPortrait(portraitNow);
      updateMediaSizes(splitRef.current, portraitNow);
    };
    window.addEventListener('resize', handleResize);
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /** Sync internal ref with prop changes */
  useEffect(() => {
    splitRef.current = split;
    updateMediaSizes(split, isPortrait);
  }, [split, isPortrait]);

  /** Calculate split from pointer position */
  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isNowPortrait = viewportHeight > viewportWidth;

    let newSplit = isNowPortrait
      ? (clientY / viewportHeight) * 100
      : (clientX / viewportWidth) * 100;

    newSplit = Math.max(0, Math.min(100, newSplit));

    splitRef.current = newSplit;
    setSplit(newSplit); // tell parent to re-render
    updateMediaSizes(newSplit, isNowPortrait);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 1 && isDraggingRef.current && !pinchTriggeredRef.current) {
      e.preventDefault();
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2 && !isDraggingRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (initialPinchDistance.current === null) {
        initialPinchDistance.current = distance;
      } else if (!pinchTriggeredRef.current) {
        const diff = Math.abs(distance - initialPinchDistance.current);
        if (diff > pinchThreshold) {
          pinchTriggeredRef.current = true;
          isDraggingRef.current = false;
          setIsDragging(false);
          splitRef.current = 50;
          setSplit(50);
          updateMediaSizes(50, isPortrait);
          initialPinchDistance.current = null;
        }
      }
    }
  };

  const startDragging = (e: Event) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);

    const arrowAnim = arrowAnimRef.current;
    if (arrowAnim) {
      if (isTouchDevice) arrowAnim.playSegments([0, 25], true);
      else arrowAnim.goToAndStop(25, true);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', stopDragging);
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
    setIsDragging(false);

    const arrowAnim = arrowAnimRef.current;
    if (arrowAnim) {
      if (isTouchDevice) arrowAnim.playSegments([25, 75], true);
      else if (isHoveringRef.current) arrowAnim.goToAndStop(25, true);
      else arrowAnim.playSegments([25, 75], true);
    }

    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', stopDragging);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', stopDragging);
  };

  /** Arrow animation init */
  useEffect(() => {
    const arrowAnim = lottie.loadAnimation({
      container: arrowContainer.current!,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: arrowData2,
    });
    arrowAnimRef.current = arrowAnim;

    const container = containerRef.current;
    if (container) container.style.opacity = '0';

    const playInitial = () => {
      arrowAnim.goToAndStop(0, true);
      setTimeout(() => {
        arrowAnim.playSegments([0, 75], true);
      }, 1200);
      if (container) {
        setTimeout(() => {
          container.style.opacity = '1';
        }, 1200);
      }
      const svg = arrowContainer.current?.querySelector('svg');
      if (svg) svg.classList.add('drag-arrow');
    };

    arrowAnim.addEventListener('DOMLoaded', playInitial);
    return () => {
      arrowAnim.removeEventListener('DOMLoaded', playInitial);
      arrowAnim.destroy();
    };
  }, []);

  /** Attach drag listeners */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousedown', startDragging);
    container.addEventListener('touchstart', startDragging as any, { passive: false });

    return () => {
      container.removeEventListener('mousedown', startDragging);
      container.removeEventListener('touchstart', startDragging as any);
      stopDragging();
    };
  }, []);

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
              height: '5.4rem',
              cursor: 'ns-resize',
              transform: 'translateY(-50%)',
            }
          : {
              top: 0,
              bottom: 0,
              left: `${split}%`,
              width: '6.4rem',
              cursor: 'ew-resize',
              transform: 'translateX(-50%)',
            }),
        zIndex: 3000,
        pointerEvents: 'all',
        touchAction: isDraggingRef.current ? 'none' : 'auto',
      }}
    >
      <div
        ref={arrowContainer}
        style={{
          width: isPortrait ? '100%' : 'calc(100% - 2em)',
          height: isPortrait ? 'calc(100% - 4em)' : 'calc(100% + 3em)',
          pointerEvents: 'none',
          transform: isPortrait ? 'rotate(90deg)' : 'none',
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
};

export default SplitDragHandler;
