// utils/split-controller.tsx
import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import lottie from 'lottie-web';
import { useProjectVisibility } from './context-providers/project-context';
import arrowData2 from '../svg/arrow2.json';
import { applySplitStyle, MIN_PORTRAIT_SPLIT } from '../ssr/logic/apply-split-style';

type SplitDragHandlerProps = {
  split: number;
  setSplit: React.Dispatch<React.SetStateAction<number>>;
  ids?: { m1: string; m2: string }; // optional (used for ssr components)
};

const FLOOR_EPS = 0.25;
const PULSE_LOW_OPACITY = 0.35;
const PULSE_FADE_MS = 1500;
const PULSE_HOLD_MS = 180;
const PULSE_COOLDOWN_MS = 700;

const SplitDragHandler: React.FC<SplitDragHandlerProps> = ({ split, setSplit, ids }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { setIsDragging } = useProjectVisibility();

  const splitRef = useRef(split);
  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);

  const arrowContainer = useRef<HTMLDivElement | null>(null);
  const arrowAnimRef = useRef<ReturnType<typeof lottie.loadAnimation> | null>(null);

  const [isPortrait, setIsPortrait] = useState(
    typeof window !== 'undefined' ? window.innerHeight > window.innerWidth : false
  );
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // pinch-to-reset helpers
  const initialPinchDistance = useRef<number | null>(null);
  const pinchTriggeredRef = useRef(false);
  const pinchThreshold = 10;

  // throttle pulse
  const lastPulseAtRef = useRef(0);

  const playSegment = (() => {
    let lastCompleteHandler: ((this: any) => void) | null = null;
    let currentSegment: [number, number] | null = null;

    return (segment: [number, number], holdFrame: number) => {
      const arrowAnim = arrowAnimRef.current;
      if (!arrowAnim) return;

      if (lastCompleteHandler) {
        arrowAnim.removeEventListener('complete', lastCompleteHandler as any);
        lastCompleteHandler = null;
      }

      currentSegment = segment;

      const onComplete = () => {
        arrowAnim.removeEventListener('complete', onComplete as any);
        lastCompleteHandler = null;
        const currentFrame = (arrowAnim as any).currentFrame ?? 0;
        if (
          currentSegment &&
          currentSegment[1] !== undefined &&
          Math.abs(currentFrame - currentSegment[1]) <= 2
        ) {
          arrowAnim.goToAndStop(holdFrame, true);
        }
      };

      lastCompleteHandler = onComplete;
      arrowAnim.addEventListener('complete', onComplete as any);
      arrowAnim.playSegments(segment, true);
    };
  })();

  const pulseLottie = async () => {
    const now = performance.now();
    if (now - lastPulseAtRef.current < PULSE_COOLDOWN_MS) return;
    lastPulseAtRef.current = now;

    const node = arrowContainer.current;
    if (!node) return;

    const prevTransition = node.style.transition;
    try {
      node.style.transition = `opacity ${PULSE_FADE_MS}ms ease`;
      node.style.opacity = `${PULSE_LOW_OPACITY}`;
      await new Promise((r) => setTimeout(r, PULSE_FADE_MS + PULSE_HOLD_MS));
      node.style.opacity = '1';
      await new Promise((r) => setTimeout(r, PULSE_FADE_MS));
    } finally {
      node.style.opacity = '1';
      node.style.transition = prevTransition;
    }
  };

  // Initial apply
  useLayoutEffect(() => {
    if (!ids) return; // only if ids are given
    const portraitNow = window.innerHeight > window.innerWidth;
    setIsPortrait(portraitNow);
    applySplitStyle(splitRef.current, portraitNow, ids);
  }, [ids]);

  // Resize/orientation listener
  useEffect(() => {
    const handleResize = () => {
      const portraitNow = window.innerHeight > window.innerWidth;
      setIsPortrait(portraitNow);
      if (ids) applySplitStyle(splitRef.current, portraitNow, ids);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    return () => window.removeEventListener('resize', handleResize);
  }, [ids]);

  // Sync DOM on split/orientation change
  useEffect(() => {
    splitRef.current = split;
    if (ids) applySplitStyle(split, isPortrait, ids);
  }, [split, isPortrait, ids]);

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isNowPortrait = vh > vw;

    let next = isNowPortrait ? (clientY / vh) * 100 : (clientX / vw) * 100;
    next = isNowPortrait
      ? Math.max(MIN_PORTRAIT_SPLIT, Math.min(100, next))
      : Math.max(0, Math.min(100, next));

    splitRef.current = next;
    setSplit(next);
    if (ids) applySplitStyle(next, isNowPortrait, ids);

    if (isNowPortrait && next <= MIN_PORTRAIT_SPLIT + FLOOR_EPS) {
      pulseLottie();
    }
  };

  const handleMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
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
          if (ids) applySplitStyle(50, isPortrait, ids);
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

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (isDraggingRef.current) {
      arrowAnimRef.current?.goToAndStop(25, true);
      return;
    }
    playSegment([0, 25], 25);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    if (isDraggingRef.current) {
      arrowAnimRef.current?.goToAndStop(25, true);
      return;
    }
    playSegment([25, 75], 75);
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    startDragging(e as unknown as Event);
  };

  const handleTouchEnd = async (e: TouchEvent) => {
    let endSplit = splitRef.current;
    if (e.changedTouches.length === 1) {
      const t = e.changedTouches[0];
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isNowPortrait = vh > vw;
      endSplit = isNowPortrait ? (t.clientY / vh) * 100 : (t.clientX / vw) * 100;
      endSplit = isNowPortrait
        ? Math.max(MIN_PORTRAIT_SPLIT, Math.min(100, endSplit))
        : Math.max(0, Math.min(100, endSplit));
    }
    stopDragging();
    if (endSplit <= MIN_PORTRAIT_SPLIT + FLOOR_EPS) {
      await pulseLottie();
      arrowAnimRef.current?.playSegments([25, 75], true);
    }
    initialPinchDistance.current = null;
    pinchTriggeredRef.current = false;
  };

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: arrowContainer.current!,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: arrowData2,
    });
    arrowAnimRef.current = anim;

    const container = containerRef.current;
    if (container) container.style.opacity = '0';

    const playInitial = () => {
      anim.goToAndStop(0, true);
      setTimeout(() => anim.playSegments([0, 75], true), 1200);
      if (container) {
        setTimeout(() => (container.style.opacity = '1'), 1200);
      }
      arrowContainer.current?.querySelector('svg')?.classList.add('drag-arrow');
    };

    anim.addEventListener('DOMLoaded', playInitial);
    const fallback = setTimeout(() => {
      // @ts-ignore
      if (!(anim as any).isLoaded) playInitial();
    }, 2000);

    return () => {
      clearTimeout(fallback);
      anim.removeEventListener('DOMLoaded', playInitial);
      anim.destroy();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const anim = arrowAnimRef.current;
    if (!container || !anim) return;
    let views = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && views < 3) {
            views += 1;
            anim.goToAndStop(0, true);
            setTimeout(() => anim.playSegments([0, 75], true), 200);
          }
        });
      },
      { threshold: 0.6 }
    );
    io.observe(container);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousedown', startDragging as any);
    container.addEventListener('touchstart', handleTouchStart as any, { passive: false });
    container.addEventListener('touchend', handleTouchEnd as any, { passive: true });
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousedown', startDragging as any);
      container.removeEventListener('touchstart', handleTouchStart as any);
      container.removeEventListener('touchend', handleTouchEnd as any);
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
        className="split-arrow"
        style={{
          width: isPortrait ? '100%' : 'none',
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
