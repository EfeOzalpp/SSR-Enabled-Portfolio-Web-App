// View Project Button
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { useProjectVisibility } from '../utils/project-context.tsx';
import arrowData from '../svg/arrow.json';

export const ViewProject = () => {
  const { activeProject, currentIndex, setCurrentIndex, projectComponents, scrollContainerRef } = useProjectVisibility();
  const arrowContainer = useRef<HTMLDivElement>(null);
  const arrowAnimRef = useRef<lottie.AnimationItem | null>(null);
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastScrollTime = useRef(0);
  const SCROLL_DELAY = 300; // ms

useEffect(() => {
  const arrowAnim = lottie.loadAnimation({
    container: arrowContainer.current!,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    animationData: arrowData,
  });

  arrowAnimRef.current = arrowAnim; // ✅ store the instance

  const stopFrame = 40;

  const onEnterFrame = () => {
    if (arrowAnim.currentFrame >= stopFrame) {
      arrowAnim.removeEventListener('enterFrame', onEnterFrame);
      arrowAnim.pause();
      arrowAnim.goToAndStop(stopFrame, true);
    }
  };

  arrowAnim.addEventListener('enterFrame', onEnterFrame);

  arrowAnim.addEventListener('DOMLoaded', () => {
    const svg = arrowContainer.current?.querySelector('svg');
    if (svg) {
      svg.classList.add('arrow-svg');
    }
  });

  return () => {
    arrowAnim.removeEventListener('enterFrame', onEnterFrame);
    arrowAnim.destroy();
  };
}, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distance < 10) {
      // Your intended click action here
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    const now = Date.now();
    if (now - lastScrollTime.current < SCROLL_DELAY) return;

    const touch = e.touches[0];
    const deltaY = touch.clientY - touchStartPos.current.y;

    const container = scrollContainerRef.current;
    if (!container) return;

    if (Math.abs(deltaY) > 30) {
      if (deltaY > 0 && currentIndex > 0) {
        const target = container.children[currentIndex - 1] as HTMLElement;
        target.scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(currentIndex - 1);
      } else if (deltaY < 0 && currentIndex < projectComponents.length - 1) {
        const target = container.children[currentIndex + 1] as HTMLElement;
        target.scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(currentIndex + 1);
      }

      playArrowWiggle();

      lastScrollTime.current = now;
      touchStartPos.current.y = touch.clientY; // reset for continuous drag
    }
  };

  const playArrowWiggle = () => {
    const arrowAnim = arrowAnimRef.current;
    if (!arrowAnim) return;

    arrowAnim.playSegments([40, 90], true);
  };
  useEffect(() => {
    playArrowWiggle();
  }, [currentIndex]);


  return (
    <div className="view-project-wrapper">
      <button
        className="view-project-btn"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <h2 className="project-view">{activeProject}</h2>
        <div ref={arrowContainer} className="view-project-arrow"></div>
      </button>
    </div>
  );
};

export default ViewProject;
