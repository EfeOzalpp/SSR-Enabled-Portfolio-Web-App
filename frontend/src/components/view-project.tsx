import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { useProjectVisibility } from '../utils/project-context.tsx';
import arrowData from '../svg/arrow.json';

// ViewProject – The little CTA at the bottom that shows project title + arrow wiggle
export const ViewProject = () => {
  // Bringing in project context stuff for scrolling and index management
  const { focusedProjectKey, setFocusedProjectKey, activeProject,  currentIndex, setCurrentIndex, projectComponents, scrollContainerRef, isDragging, setIsDragging, } = useProjectVisibility();

  // Refs for lottie container, lottie instance, and touch position tracking
  const arrowContainer = useRef<HTMLDivElement>(null);
  const arrowAnimRef = useRef<lottie.AnimationItem | null>(null);
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Scroll cooldown to avoid rapid firing scrolls
  const lastScrollTime = useRef(0);
  const SCROLL_DELAY = 300; // ms

  // State to control background visibility + hover state for bg opacity
  const [showBackground, setShowBackground] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hovered, setHovered] = useState(false);

  // Colors for each project background
  const projectColors: { [key: string]: string } = {
    'Ice Cream Scoop': '150, 80, 60',
    'Rotary Lamp': '85, 95, 90',
    'Evade the Rock': '140, 110, 160',
  };

  // Gets rgba background color based on active project and hover state
  const getBackgroundColor = () => {
    const rgb = projectColors[activeProject];
    if (!rgb) return 'rgba(240, 240, 240, 0.4)';

    // Hover increases opacity for more prominence
    const opacity = hovered ? 0.8 : 0.3;
    return `rgba(${rgb}, ${opacity})`;
  };

  // Sets up the arrow lottie on mount
  useEffect(() => {
    const arrowAnim = lottie.loadAnimation({
      container: arrowContainer.current!,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: arrowData,
    });
    arrowAnimRef.current = arrowAnim;

    // Pauses arrow after stopFrame to hold it there
    const stopFrame = 40;
    const onEnterFrame = () => {
      if (arrowAnim.currentFrame >= stopFrame) {
        arrowAnim.removeEventListener('enterFrame', onEnterFrame);
        arrowAnim.pause();
        arrowAnim.goToAndStop(stopFrame, true);
      }
    };
    arrowAnim.addEventListener('enterFrame', onEnterFrame);

    // Adds class for adding drop shadow to the lottie svg
    arrowAnim.addEventListener('DOMLoaded', () => {
      const svg = arrowContainer.current?.querySelector('svg');
      if (svg) svg.classList.add('arrow-svg');
    });

    return () => {
      arrowAnim.removeEventListener('enterFrame', onEnterFrame);
      arrowAnim.destroy();
    };
  }, []);

  // Handles showing background on any interaction, hides after 2s
  const handleInteraction = () => {
    setShowBackground(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowBackground(false), 2000);
  };

  // Touch start – track position, set dragging, trigger interaction
  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
    handleInteraction();
  };

  // Touch end – check if tap vs drag, unset dragging, trigger interaction
  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    if (distance < 10) {
      // Placeholder for click action if needed
    }
    setIsDragging(false);
    handleInteraction();
  };

  const handleProjectViewClick = () => {
    // Find the active project's key
    const activeProjectKey = projectComponents.find(p => p.title === activeProject)?.key;

    if (!focusedProjectKey) {
      setFocusedProjectKey(activeProjectKey || null);
    } else {
      setFocusedProjectKey(null); // restore all projects
    }
  };

  // Touch move – handles vertical swiping to navigate projects
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
      window.dispatchEvent(new CustomEvent('arrowWiggle'));
      lastScrollTime.current = now;
      touchStartPos.current.y = touch.clientY;
    }
    handleInteraction();
  };

  // Plays arrow wiggle animation from stop to end segment
  const playArrowWiggle = () => {
    const arrowAnim = arrowAnimRef.current;
    if (!arrowAnim) return;
    arrowAnim.playSegments([40, 90], true);
  };

  // Global touch triggers background reveal (mobile general touches)
  useEffect(() => {
    const handleGlobalTouch = (e) => {
      if (e.touches && e.touches.length > 1) return;
      handleInteraction();
    };
    window.addEventListener('touchstart', handleGlobalTouch);
    return () => {
      window.removeEventListener('touchstart', handleGlobalTouch);
    };
  }, []);

  // Play wiggle animation when currentIndex changes
  useEffect(() => {
    playArrowWiggle();
  }, [currentIndex]);

  // Mouse move near bottom triggers background reveal
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY > window.innerHeight * 0.66) {
        handleInteraction();
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    hideTimeoutRef.current = setTimeout(() => setShowBackground(false), 2000);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // IntersectionObserver to trigger background reveal when any block becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowBackground(true);
          if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = setTimeout(() => setShowBackground(false), 2000);
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

      targets.forEach(el => {
        observer.observe(el);
      });
    };

    checkAndObserve();

    return () => {
      observer.disconnect();
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Renders the button with dynamic background and arrow
  return (
    <div className="view-project-wrapper">
      <button
        className={`view-project-btn ${!showBackground ? 'no-bg' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={(e) => { handleTouchStart(e); setHovered(true); }}
        onTouchEnd={(e) => { handleTouchEnd(e); setHovered(false); }}
        onTouchCancel={() => setHovered(false)}
        onClick={handleProjectViewClick}
      >
        <div
          className={`view-project-background ${!showBackground ? 'no-bg' : ''}`}
          style={{
            backgroundColor: getBackgroundColor(),
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: 'inherit',
            zIndex: 0,
          }}
        />
        <h2 className="project-view" style={{ position: 'relative', zIndex: 1 }}>{activeProject}</h2>
        <div ref={arrowContainer} className="view-project-arrow" style={{ position: 'relative', zIndex: 1 }}></div>
      </button>
    </div>
  );
};

export default ViewProject;
