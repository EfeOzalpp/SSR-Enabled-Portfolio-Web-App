// src/components/rock-escapade/block-g-onboarding-inner.tsx
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import onboardingAnimation from '../../svg/coin.json';

type InnerProps = {
  onClick?: () => void;
  onMount?: () => void;
  onUnmount?: () => void;
  startAtFrame?: number;
  loopFromFrame?: number;
  debug?: boolean;
  label?: string;
  ctaEnabled?: boolean;
};

type Phase = 'intro' | 'tail';

const BlockGOnboardingInner: React.FC<InnerProps> = ({
  onClick,
  onMount,
  onUnmount,
  startAtFrame = 0,
  loopFromFrame = 41,
  debug = false,
  label = 'Click Here to Play!',
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<ReturnType<typeof lottie.loadAnimation> | null>(null);
  const phaseRef = useRef<Phase>('intro');
  const introDoneRef = useRef(false);
  const absEndRef = useRef<number>(0);

  // keep callbacks stable for the effect
  const mountRef = useRef(onMount);
  const unmountRef = useRef(onUnmount);
  useEffect(() => { mountRef.current = onMount; }, [onMount]);
  useEffect(() => { unmountRef.current = onUnmount; }, [onUnmount]);

  const log = (...a: any[]) => debug && console.log('[Coin]', ...a);

  useEffect(() => {
    mountRef.current?.();
    const el = hostRef.current;
    if (!el) return () => unmountRef.current?.();

    // clean any prior
    try { animRef.current?.destroy(); } catch {}
    animRef.current = null;
    phaseRef.current = 'intro';
    introDoneRef.current = false;

    const anim = lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: onboardingAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
        progressiveLoad: true,
      },
    });
    animRef.current = anim;

    const getAbsEnd = () => {
      const frames = Math.max(1, Math.floor((anim as any).getDuration?.(true) ?? anim.totalFrames ?? 1));
      return frames - 1;
    };

    const playIntroOnce = () => {
      const absEnd = absEndRef.current;
      const s = Math.max(0, Math.min(startAtFrame, absEnd));
      log('intro start', { startAtFrame: s, absEnd });
      anim.goToAndStop(s, true);
      anim.playSegments([s, absEnd], true);
    };

    const startTailLoop = () => {
      if (phaseRef.current === 'tail') return;
      phaseRef.current = 'tail';
      const absEnd = absEndRef.current;
      const tailStart = Math.max(0, Math.min(loopFromFrame, absEnd));
      anim.removeEventListener('complete', onCompleteIntro);
      anim.loop = true;
      anim.playSegments([tailStart, absEnd], true);
      log('→ tail loop', { tailStart, absEnd });
    };

    const onDOMLoaded = () => {
      absEndRef.current = getAbsEnd();
      log('DOMLoaded', { absEnd: absEndRef.current });
      playIntroOnce();
    };

    const onCompleteIntro = () => {
      if (!introDoneRef.current) {
        introDoneRef.current = true;
        log('intro complete', { frame: Math.floor(anim.currentFrame || 0) });
        startTailLoop();
      }
    };

    const onLoopComplete = () => {
      if (phaseRef.current === 'tail') {
        log('loopComplete (tail)', { frame: Math.floor(anim.currentFrame || 0) });
      }
    };

    anim.addEventListener('DOMLoaded', onDOMLoaded);
    anim.addEventListener('complete', onCompleteIntro);
    anim.addEventListener('loopComplete', onLoopComplete);

    return () => {
      log('destroy');
      try {
        anim.removeEventListener('DOMLoaded', onDOMLoaded);
        anim.removeEventListener('complete', onCompleteIntro);
        anim.removeEventListener('loopComplete', onLoopComplete);
        anim.destroy();
      } catch {}
      animRef.current = null;
      unmountRef.current?.();
    };
    // Only re-init when these truly need to change:
  }, [startAtFrame, loopFromFrame, debug]);

  return (
    <>
      <div ref={hostRef} className="coin" onClick={onClick} style={{ pointerEvents: 'auto' }} />
      <h1 className="onboarding-text" onClick={onClick} style={{ pointerEvents: 'auto' }}>
        {label}
      </h1>
    </>
  );
};

export default BlockGOnboardingInner;
