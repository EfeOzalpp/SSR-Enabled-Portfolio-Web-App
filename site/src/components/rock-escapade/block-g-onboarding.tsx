import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import onboardingAnimation from '../../svg/coin.json';
import { useProjectVisibility } from '../../utils/context-providers/project-context';
import { useTooltipInit } from '../../utils/tooltip/tooltipInit';

type Props = {
  onStart?: () => void;
  resetTrigger?: number;
  label?: string;          // NEW
  ctaEnabled?: boolean;    // NEW
};

const BlockGOnboarding: React.FC<Props> = ({
  onStart,
  resetTrigger,
  label = 'Click Here to Play!',
  ctaEnabled = true,
}) => {
  const [visible, setVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const lottieRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lottieInstance = useRef<ReturnType<typeof lottie.loadAnimation> | null>(null);

  useTooltipInit();
  const {
    focusedProjectKey,
    scrollContainerRef,
    previousScrollY,
    setPreviousScrollY,
    setFocusedProjectKey,
  } = useProjectVisibility();

  const handleClick = () => {
    if (!ctaEnabled) return; // gate until ready
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
    onStart?.();
    setIsFadingOut(true);
  };

  // Restore scroll pos on exit from focus mode
  useEffect(() => {
    if (!focusedProjectKey && previousScrollY !== null) {
      window.scrollTo({ top: previousScrollY, behavior: 'auto' });
      setPreviousScrollY(null);
    }
  }, [focusedProjectKey]);

  const initializeLottie = () => {
    if (!lottieRef.current) return;
    // reset any prior
    lottieInstance.current?.destroy();
    lottieInstance.current = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: onboardingAnimation,
    });
    lottieInstance.current.addEventListener('complete', () => {
      if (!lottieInstance.current) return;
      lottieInstance.current.playSegments([41, lottieInstance.current.totalFrames], true);
      lottieInstance.current.loop = true;
    });
  };

  const destroyLottie = () => {
    lottieInstance.current?.destroy();
    lottieInstance.current = null;
  };

  // IO mount/unmount of the Lottie — ONLY depends on resetTrigger (not on label/ctaEnabled)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      destroyLottie();
    };
  }, [resetTrigger]); // ← label/ctaEnabled intentionally omitted

  useEffect(() => {
    if (isFadingOut) {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
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
      aria-busy={!ctaEnabled}
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
        onClick={handleClick}
        style={{ pointerEvents: ctaEnabled ? 'auto' : 'none', cursor: ctaEnabled ? 'pointer' : 'default' }}
      />
      <h1
        className="onboarding-text"
        onClick={handleClick}
        aria-disabled={!ctaEnabled}
        style={{ pointerEvents: ctaEnabled ? 'auto' : 'none', cursor: ctaEnabled ? 'pointer' : 'default' }}
      >
        {label}
      </h1>
    </div>
  );
};

export default BlockGOnboarding;
