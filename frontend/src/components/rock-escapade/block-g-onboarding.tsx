// Onboarding for the evade the rock
import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import onboardingAnimation from '../../svg/coin.json';
import { Tooltip } from 'react-tooltip';
import { useProjectVisibility } from '../../utils/project-context.tsx';
import ToolBar from '../../utils/toolbar.tsx';

const BlockGOnboarding = ({ onStart, resetTrigger }) => {
  const [visible, setVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [mouseIdle, setMouseIdle] = useState(false);

  const lottieRef = useRef(null);
  const containerRef = useRef(null);
  const lottieInstance = useRef(null);

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
        const target = scrollContainerRef.current || window;
        target.scrollTo({ top: 0, behavior: 'auto' });
      }, 0);
    }

    if (onStart) onStart();
    setIsFadingOut(true);
  };

  useEffect(() => {
    if (!focusedProjectKey && previousScrollY !== null) {
      window.scrollTo({ top: previousScrollY, behavior: 'auto' });
      setPreviousScrollY(null);
    }
  }, [focusedProjectKey]);

  const initializeLottie = () => {
    if (lottieRef.current) {
      if (lottieInstance.current) lottieInstance.current.destroy();

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
            lottieInstance.current?.stop();
            lottieInstance.current?.playSegments([0, lottieInstance.current.totalFrames], true);
          } else {
            destroyLottie();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      destroyLottie();
    };
  }, [resetTrigger]);

  useEffect(() => {
    if (isFadingOut) {
      const timeout = setTimeout(() => setVisible(false), 300);
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

  const tooltipRGB = '140, 110, 160';
  const backgroundColor = `rgba(${tooltipRGB}, 0.6)`;

  return (
    <>
      <ToolBar onIdleChange={setMouseIdle} />

      {/* Tooltip host layer */}
      <div
        data-tooltip-id="blockg-tooltip"
        data-tooltip-content=" "
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 998,
          pointerEvents: 'auto',
        }}
      />

      {/* Interactive content (NOT tooltip-bound) */}
      <div
        className="block-g-onboarding"
        ref={containerRef}
        onClick={handleClick}
        style={{
          opacity: isFadingOut ? 0 : 1,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 999,
        }}
      >
        <div
          ref={lottieRef}
          className="coin"
          style={{ pointerEvents: 'auto', zIndex: 1001 }}
        />
        <h1
          className="onboarding-text"
          style={{ pointerEvents: 'auto', zIndex: 1001 }}
        >
          Click to Play!
        </h1>
      </div>

      <Tooltip
        id="blockg-tooltip"
        place="top"
        float
        positionStrategy="absolute"
        unstyled
        noArrow
        className={mouseIdle ? 'tooltip-hidden' : ''}
        style={{
          backgroundColor,
        }}
        render={() => (
          <div className="custom-tooltip-blur">
            <span className="tooltip-tag">#q5.js Canvas</span>
            <span className="tooltip-tag">#Gamification</span>
            <span className="tooltip-tag">#Lottie Animation</span>
          </div>
        )}
      />
    </>
  );
};

export default BlockGOnboarding;

