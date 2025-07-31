/* Drag handler for block type 1 */
import React, { useRef, useEffect, useState } from 'react';
import lottie from 'lottie-web';
import { useProjectVisibility } from './project-context.tsx';
import arrowData2 from '../svg/arrow2.json';

const SplitDragHandler = ({ split, setSplit }) => {
  const containerRef = useRef(null);
  const { setIsDragging } = useProjectVisibility();
  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const arrowContainer = useRef(null);
  const arrowAnimRef = useRef(null);

  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const initialPinchDistance = useRef(null);
  const pinchTriggeredRef = useRef(false);
  const pinchThreshold = 10;

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

const playSegment = (() => {
  let lastCompleteHandler = null;
  let currentSegment = null;

  return (segment, holdFrame) => {
    const arrowAnim = arrowAnimRef.current;
    if (!arrowAnim) return;

    // Remove any existing handler
    if (lastCompleteHandler) {
      arrowAnim.removeEventListener('complete', lastCompleteHandler);
      lastCompleteHandler = null;
    }

    currentSegment = segment;

    const onComplete = () => {
      arrowAnim.removeEventListener('complete', onComplete);
      lastCompleteHandler = null;

      const currentFrame = arrowAnim.currentFrame;

      // Only hold if animation stopped on expected range
      if (currentSegment?.[1] !== undefined && Math.abs(currentFrame - currentSegment[1]) <= 2) {
        arrowAnim.goToAndStop(holdFrame, true);
      } else {
      }
    };

    lastCompleteHandler = onComplete;
    arrowAnim.addEventListener('complete', onComplete);
    arrowAnim.playSegments(segment, true);
  };
})();


  const handlePointerMove = (clientX, clientY) => {
    if (!isDraggingRef.current) return;
    if (typeof clientX !== 'number' || typeof clientY !== 'number') return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isNowPortrait = viewportHeight > viewportWidth;

    let newSplit = isNowPortrait
      ? (clientY / viewportHeight) * 100
      : (clientX / viewportWidth) * 100;

    newSplit = isNowPortrait
      ? Math.max(25, Math.min(100, newSplit))
      : Math.max(0, Math.min(100, newSplit));

    setSplit(newSplit);
  };

  const handleMouseMove = (e) => {
    console.log('[MouseMove] X:', e.clientX, 'Y:', e.clientY);
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
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
          setSplit(50);
          initialPinchDistance.current = null;
        }
      }
    }
  };

  const startDragging = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);

    const arrowAnim = arrowAnimRef.current;
    if (arrowAnim) {
      if (isTouchDevice) {
        arrowAnim.playSegments([0, 25], true);
      } else {
        arrowAnim.goToAndStop(25, true);
      }
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
      if (isTouchDevice) {
        arrowAnim.playSegments([25, 75], true);
      } else if (isHoveringRef.current) {
        arrowAnim.goToAndStop(25, true);
      } else {
        arrowAnim.playSegments([25, 75], true);
      }
    }

    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', stopDragging);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', stopDragging);
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;

    const arrowAnim = arrowAnimRef.current;
    if (isDraggingRef.current) {
      if (arrowAnim) arrowAnim.goToAndStop(25, true);
      return;
    }

    playSegment([0, 25], 25);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;

    const arrowAnim = arrowAnimRef.current;
    if (isDraggingRef.current) {
      if (arrowAnim) arrowAnim.goToAndStop(25, true);
      return;
    }
    playSegment([25, 75], 75);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    startDragging(e);
  };

  const handleTouchEnd = async (e) => {
    let endSplit = split;

    if (e.changedTouches && e.changedTouches.length === 1) {
      const touch = e.changedTouches[0];
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isNowPortrait = viewportHeight > viewportWidth;

      endSplit = isNowPortrait
        ? (touch.clientY / viewportHeight) * 100
        : (touch.clientX / viewportWidth) * 100;

      endSplit = isNowPortrait
        ? Math.max(15, Math.min(100, endSplit))
        : Math.max(0, Math.min(100, endSplit));
    }

    stopDragging();

    if (endSplit <= 15.5) {
      const container = containerRef.current;
      if (!container) return;

      for (let i = 0; i < 3; i++) {
        container.style.opacity = '0.4';
        await new Promise(res => setTimeout(res, 100));
        container.style.opacity = '1';
        await new Promise(res => setTimeout(res, 100));
      }

      const arrowAnim = arrowAnimRef.current;
      if (arrowAnim) {
        arrowAnim.playSegments([25, 75], true);
      }
    }

    initialPinchDistance.current = null;
    pinchTriggeredRef.current = false;
  };

  useEffect(() => {
    const arrowAnim = lottie.loadAnimation({
      container: arrowContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: arrowData2,
    });
    arrowAnimRef.current = arrowAnim;

    const container = containerRef.current;
    if (container) {
      container.style.opacity = '0';
    }

    const playInitial = () => {
      arrowAnim.goToAndStop(0, true);

      setTimeout(() => {
        arrowAnim.playSegments([0, 75], true);
      }, 3200);

      if (container) {
        setTimeout(() => {
          container.style.opacity = '1';
        }, 3200);
      }

      const svg = arrowContainer.current?.querySelector('svg');
      if (svg) svg.classList.add('drag-arrow');
    };

    arrowAnim.addEventListener('DOMLoaded', playInitial);

    const fallback = setTimeout(() => {
      if (!arrowAnim.isLoaded) {
        playInitial();
      }
    }, 2000);

    return () => {
      clearTimeout(fallback);
      arrowAnim.removeEventListener('DOMLoaded', playInitial);
      arrowAnim.destroy();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !arrowAnimRef.current) return;

    let viewCount = 0;
    const arrowAnim = arrowAnimRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && viewCount < 1) {
          viewCount += 1;

          arrowAnim.goToAndStop(0, true);
          setTimeout(() => {
            arrowAnim.playSegments([0, 75], true);
          }, 200);
        }
      });
    }, {
      threshold: 0.1,
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousedown', startDragging);
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousedown', startDragging);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      stopDragging();
    };
  }, [setSplit, setIsDragging, isTouchDevice]);

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
              height: 'calc(100% - 6em)',
            }),
        zIndex: 3000,
        transition: isPortrait ? 'top 0s' : 'left 0s',
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
