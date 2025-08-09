import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import onboardingAnimation from '../../svg/coin.json';
import { useProjectVisibility } from '../../utils/context-providers/project-context.tsx';
import { useTooltipInit } from '../../utils/tooltip/tooltipInit.ts';

const BlockGOnboarding = ({ onStart, resetTrigger }) => {
  const [visible, setVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const lottieRef = useRef(null);
  const containerRef = useRef(null);
  const lottieInstance = useRef(null);
  useTooltipInit();
  const {
    focusedProjectKey,
    scrollContainerRef,
    previousScrollY,
    setPreviousScrollY,
    setFocusedProjectKey
  } = useProjectVisibility();

  const handleClick = () => {
    if (focusedProjectKey) {
      setPreviousScrollY(window.scrollY);

      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      }, 0);
    }
    
    if (onStart) onStart();
    setIsFadingOut(true);
  };

  // Restore scroll position when exiting focus mode
  useEffect(() => {
    if (!focusedProjectKey && previousScrollY !== null) {
      window.scrollTo({ top: previousScrollY, behavior: 'auto' });
      setPreviousScrollY(null);
    }
  }, [focusedProjectKey]);

  const initializeLottie = () => {
    if (lottieRef.current) {
      if (lottieInstance.current) {
        lottieInstance.current.destroy();
      }

      lottieInstance.current = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: onboardingAnimation,
      });

      lottieInstance.current.addEventListener('complete', () => {
        lottieInstance.current.playSegments([41, lottieInstance.current.totalFrames], true);
        lottieInstance.current.loop = true;
      });
    }
  };

  const destroyLottie = () => {
    if (lottieInstance.current) {
      lottieInstance.current.destroy();
      lottieInstance.current = null;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            initializeLottie();
            if (lottieInstance.current) {
              lottieInstance.current.stop();
              lottieInstance.current.playSegments([0, lottieInstance.current.totalFrames], true);
            }
          } else {
            destroyLottie();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      destroyLottie();
    };
  }, [resetTrigger]);

  useEffect(() => {
    if (isFadingOut) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isFadingOut]);

  useEffect(() => {
    if (resetTrigger) {
      setVisible(true);
      setIsFadingOut(false);
    }
  }, [resetTrigger]);

  if (!visible) return null;

  return (
    <div
      className="block-g-onboarding tooltip-block-g"
      ref={containerRef}
      style={{
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.3s ease',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        ref={lottieRef}
        className="coin"
        onClick={handleClick} // 👈 Only clickable here
        style={{ pointerEvents: 'auto' }}
      ></div>

      <h1
        className="onboarding-text"
        onClick={handleClick} // 👈 And here
        style={{ pointerEvents: 'auto' }}
      >
        Click Here to Play!
      </h1>
    </div>
  );
};

export default BlockGOnboarding;