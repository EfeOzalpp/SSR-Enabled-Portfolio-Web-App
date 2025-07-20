// ViewProject.tsx
import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { useProjectVisibility } from '../utils/project-context.tsx';
import arrowData from '../svg/arrow.json';

export const ViewProject = () => {
  const {
    focusedProjectKey,
    setFocusedProjectKey,
    activeProject,
    currentIndex,
    setCurrentIndex,
    projectComponents,
    scrollContainerRef,
    isDragging,
    setIsDragging,
  } = useProjectVisibility();

  const arrowContainer = useRef<HTMLDivElement>(null);
  const arrowAnimRef = useRef<lottie.AnimationItem | null>(null);
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const lastScrollTime = useRef(0);
  const SCROLL_DELAY = 300;

  const [showBackground, setShowBackground] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hovered, setHovered] = useState(false);

  const projectColors: { [key: string]: string } = {
    'Enhanced Scoop': '150, 80, 60',
    'Rotary Lamp': '85, 95, 90',
    'Evade the Rock': '140, 110, 160',
  };

  const getBackgroundColor = () => {
    const rgb = projectColors[activeProject];
    if (!rgb) return 'rgba(240, 240, 240, 0.4)';
    const opacity = hovered ? 0.8 : 0.3;
    return `rgba(${rgb}, ${opacity})`;
  };

  useEffect(() => {
    const arrowAnim = lottie.loadAnimation({
      container: arrowContainer.current!,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: arrowData,
    });
    arrowAnimRef.current = arrowAnim;

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
      if (svg) svg.classList.add('arrow-svg');
    });

    return () => {
      arrowAnim.removeEventListener('enterFrame', onEnterFrame);
      arrowAnim.destroy();
    };
  }, []);

  const handleHoverStart = () => {
    setHovered(true);
    setShowBackground(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleHoverEnd = () => {
    setHovered(false);
    hideTimeoutRef.current = setTimeout(() => setShowBackground(false), 2000);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
    handleHoverStart();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    if (distance < 10) {
      // Tap
    }
    setIsDragging(false);
    handleHoverEnd();
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
        container.children[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(currentIndex - 1);
      } else if (deltaY < 0 && currentIndex < projectComponents.length - 1) {
        container.children[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(currentIndex + 1);
      }
      playArrowWiggle();
      window.dispatchEvent(new CustomEvent('arrowWiggle'));
      lastScrollTime.current = now;
      touchStartPos.current.y = touch.clientY;
    }

    handleHoverStart();
  };

  const handleProjectViewClick = () => {
    const activeProjectKey = projectComponents.find(p => p.title === activeProject)?.key;
    setFocusedProjectKey(focusedProjectKey ? null : activeProjectKey || null);
  };

  const playArrowWiggle = () => {
    const arrowAnim = arrowAnimRef.current;
    if (!arrowAnim) return;
    arrowAnim.playSegments([40, 90], true);
  };

  useEffect(() => {
    const handleGlobalTouch = (e) => {
      if (e.touches?.length > 1) return;
      handleHoverStart();
    };
    window.addEventListener('touchstart', handleGlobalTouch);
    return () => {
      window.removeEventListener('touchstart', handleGlobalTouch);
    };
  }, []);

  useEffect(() => {
    playArrowWiggle();
  }, [currentIndex]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY > window.innerHeight * 0.66) {
        handleHoverStart();
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    hideTimeoutRef.current = setTimeout(() => setShowBackground(false), 2000);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          handleHoverStart();
        }
      });
    }, { threshold: 0.5 });

    const ids = ['#block-i', '#block-r', '#block-g'];

    const checkAndObserve = () => {
      const targets = ids
        .map(id => document.querySelector(id))
        .filter((el): el is HTMLElement => el !== null);

      if (targets.length < ids.length) {
        requestAnimationFrame(checkAndObserve);
        return;
      }

      targets.forEach(el => observer.observe(el));
    };

    checkAndObserve();

    return () => {
      observer.disconnect();
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <div className="view-project-wrapper">
      <button
        className={`view-project-btn ${!showBackground ? 'no-bg' : ''}`}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleHoverEnd}
        onTouchMove={handleTouchMove}
        onClick={handleProjectViewClick}
      >
        <div
          className={`view-project-background ${!showBackground ? 'no-bg' : ''}`}
          style={{
            backgroundColor: getBackgroundColor(),
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            zIndex: 0,
          }}
        />
        <h2 className="project-view" style={{ position: 'relative', zIndex: 1 }}>{activeProject}</h2>
        <div ref={arrowContainer} className="view-project-arrow" style={{ position: 'relative', zIndex: 1 }} />
      </button>
    </div>
  );
};

export default ViewProject;
