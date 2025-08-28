// src/ssr/projects/game.enhancer.tsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import lottie from '../../utils/load-lottie'; 

import BlockGOnboarding from '../../components/rock-escapade/block-g-onboarding-inner';
import ExitButton from '../../components/rock-escapade/block-g-exit';
import CoinCounter from '../../components/rock-escapade/block-g-coin-counter';
import GameOverController from '../logic/game-over-controller';

import { useRealMobileViewport } from '../../utils/content-utility/real-mobile';
import LazyViewMount from '../../utils/content-utility/lazy-view-mount';
import { gameLoaders } from '../../utils/content-utility/component-loader';
import { useHighScoreSubscription } from '../../components/rock-escapade/useHighScoreSubscription';

import GameInputGuards from '../logic/game-input-guards';

import desktopOnboarding from '../../svg/desktop-onboarding.json';
import mobileOnboarding from '../../svg/mobile-onboarding.json';

import '../../styles/block-type-g.css';

const GAME_MODE_CLASS = 'game-mode-active';
const activateGameMode = () => document.body.classList.add(GAME_MODE_CLASS);
const deactivateGameMode = () => document.body.classList.remove(GAME_MODE_CLASS);

function scheduleIdle(cb: () => void, timeout = 2000) {
  const w = window as any;
  if (typeof w.requestIdleCallback === 'function') {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = window.setTimeout(cb, timeout);
  return () => window.clearTimeout(t);
}

const GameEnhancer: React.FC = () => {
  const [sec, setSec] = useState<HTMLElement | null>(null);
  const [onboardingEl, setOnboardingEl] = useState<HTMLElement | null>(null);
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [stageReady, setStageReady] = useState(false);

  const firstHydrationUsedRef = useRef(false);
  const firstVisibilityCallbackSkippedRef = useRef(false);

  const wasVisibleRef = useRef(false);

  // Force a clean re-mount of onboarding inner (resets lottie/visibility) after exit
  const [onboardingReset, setOnboardingReset] = useState(0);
  const reapplyOnboarding = useCallback(() => setOnboardingReset(v => v + 1), []);

  const stableStartAtForThisMount = useMemo(
    () => (firstHydrationUsedRef.current ? 0 : 30),
    [onboardingReset] // ← only recompute when we intentionally remount onboarding
  );

  const handleInnerMount = useCallback(() => {
    firstHydrationUsedRef.current = true;
  }, []);
  
  useEffect(() => {
    const container = document.getElementById('block-game') as HTMLElement | null;
    if (!container) return;
    setSec(container);

    // SSR shell: <section … data-ssr-shell="block-game">
    const shell = container.querySelector('[data-ssr-shell="block-game"]') as HTMLElement | null;
    if (!shell) return;

    // Host for onboarding UI: prefer existing .block-g-onboarding, else decorate the shell
    let host = shell.querySelector('.block-g-onboarding') as HTMLElement | null;
    if (!host) {
      host = shell;
      if (!host.classList.contains('block-g-onboarding')) {
        host.classList.add('block-g-onboarding', 'tooltip-block-g');
        host.setAttribute('aria-live', 'polite');
        host.style.display ||= 'flex';
        host.style.alignItems ||= 'center';
      }
    }

    // Clean host children; we portal the inner UI into it
    host.replaceChildren();
    setOnboardingEl(host);

    // Render the stage directly under the section (stacked after onboarding)
    setRootEl(shell);
  }, []);

  useEffect(() => {
    if (!sec) return;
    const cancelIdle = scheduleIdle(() => setShouldMount(true), 2000);
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldMount(true);
        cancelIdle();            
        io.disconnect();
      }
    }, { threshold: [0, 0.3] });
    io.observe(sec);
    return () => { io.disconnect(); cancelIdle(); };
  }, [sec]);

  useEffect(() => {
    if (!sec) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = !!entry.isIntersecting;

        // Skip the first callback after hydration, just prime the baseline.
        if (!firstVisibilityCallbackSkippedRef.current) {
          firstVisibilityCallbackSkippedRef.current = true;
          wasVisibleRef.current = nowVisible;
          return;
        }

        const wasVisible = wasVisibleRef.current;
        wasVisibleRef.current = nowVisible;

        // Only remount when coming back into view later (and not in-game)
        if (nowVisible && !wasVisible && !sec.classList.contains('ingame')) {
          setOnboardingReset(v => v + 1);
        }
      },
      { threshold: 0.01 }
    );

    io.observe(sec);
    return () => io.disconnect();
  }, [sec]);
  
  if (!sec || !onboardingEl || !rootEl || !shouldMount) return null;

  return (
    <>
      {createPortal(
        <OnboardingPortal
          reset={onboardingReset}
          startAtFrame={stableStartAtForThisMount} 
          onInnerMount={handleInnerMount}
          label={stageReady ? 'Click Here to Play!' : 'Loading Game……'}  
          ctaEnabled={stageReady}                                   
        />,
        onboardingEl
      )}
      {createPortal(
        <GameStage
          blockId="block-game"
          container={sec}
          onboardingEl={onboardingEl}
          reapplyOnboarding={reapplyOnboarding}
          isStageReady={stageReady}                 
          onStageReady={setStageReady}          
        />,
        rootEl
      )}
    </>
  );
};

// let the portal thread the props to the inner
type OnboardingPortalProps = {
  reset: number;
  startAtFrame: number;
  onInnerMount: () => void;
  label: string;
  ctaEnabled: boolean;
  loadingLines?: string[];
};

const OnboardingPortal: React.FC<OnboardingPortalProps> = ({
  reset, startAtFrame, onInnerMount, label, ctaEnabled, loadingLines
}) => (
  <BlockGOnboarding
    key={reset}
    startAtFrame={startAtFrame}
    onMount={onInnerMount}
    label={label}
    ctaEnabled={ctaEnabled}
    loadingLines={loadingLines}
  />
);

export default GameEnhancer;

/* ---------- Stage (mirrors the working BlockGHost behavior) ---------- */
const GameStage: React.FC<{
  blockId: string;                              // not used here; kept for signature compatibility
  container: HTMLElement;
  onboardingEl: HTMLElement;
  reapplyOnboarding: () => void;
  isStageReady: boolean;                        // NEW
  onStageReady: (ready: boolean) => void;       // NEW
}> = ({
  blockId,
  container,
  onboardingEl,
  reapplyOnboarding,
  isStageReady,
  onStageReady,
}) => {
  void blockId; // silence unused param if you keep passing it

  const isRealMobile = useRealMobileViewport();

  // lifecycle
  const [started, setStarted] = useState(false);

  // HUD + meta
  const [coins, setCoins] = useState(0);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const remoteHighScore = useHighScoreSubscription();
  const stableHigh = typeof remoteHighScore === 'number' ? remoteHighScore : 0;

  // UI-only: mimic BlockGHost display logic
  const displayHigh =
    (finalScore == null ? coins : finalScore) > stableHigh
      ? (finalScore == null ? coins : finalScore)
      : stableHigh;

  const beatingHighNow = finalScore == null && coins > stableHigh;

  // overlays
  const [countdownPhase, setCountdownPhase] = useState<null | 'lottie' | 'begin'>(null);
  const [showBeginText, setShowBeginText] = useState(false);
  const [showOverlayBg, setShowOverlayBg] = useState(false);
  const [shouldRenderOverlayBg, setShouldRenderOverlayBg] = useState(false);
  const lottieRef = useRef<HTMLDivElement | null>(null);

  // canvas restart API from game-canvas
  const restartApi = useRef<{ restart: () => void } | null>(null);

  // Start — only when stage is ready
  const onStart = useCallback(() => {
    if (!isStageReady) return; // gate until canvas called onReady
    void gameLoaders.game();
    container.classList.add('ingame');
    activateGameMode();

    setStarted(true);
    setCoins(0);
    setFinalScore(null);
    setCountdownPhase('lottie');

    requestAnimationFrame(() => (container as HTMLElement)?.focus?.());

    onboardingEl.style.transition = 'opacity 180ms ease';
    onboardingEl.style.opacity = '0';
    window.setTimeout(() => { onboardingEl.style.display = 'none'; }, 180);
  }, [container, onboardingEl, isStageReady]);

  /** Limit start to coin/text only, AND reflect readiness in interactivity */
  useEffect(() => {
    const CLICK_TARGETS = '.coin, .onboarding-text, [data-start-hit]';

    const armTargets = () => {
      onboardingEl.querySelectorAll(CLICK_TARGETS).forEach((el) => {
        const node = el as HTMLElement;
        node.style.pointerEvents = isStageReady ? 'auto' : 'none';
        node.style.cursor = isStageReady ? 'pointer' : 'default';
        if (!node.hasAttribute('role')) node.setAttribute('role', 'button');
        if (node.tabIndex < 0) node.tabIndex = 0;
      });
      onboardingEl.setAttribute('aria-busy', String(!isStageReady));
    };

    armTargets();
    const mo = new MutationObserver(armTargets);
    mo.observe(onboardingEl, { childList: true, subtree: true });

    const onClick = (ev: Event) => {
      if (!isStageReady) return;
      const t = ev.target as HTMLElement | null;
      if (t && t.closest(CLICK_TARGETS)) onStart();
    };
    const onKeyDown = (ev: KeyboardEvent) => {
      if (!isStageReady) return;
      if (ev.key === 'Enter' || ev.key === ' ') {
        const t = ev.target as HTMLElement | null;
        if (t && t.closest(CLICK_TARGETS)) {
          ev.preventDefault();
          onStart();
        }
      }
    };

    onboardingEl.addEventListener('click', onClick as EventListener, { passive: true });
    onboardingEl.addEventListener('keydown', onKeyDown as EventListener);

    return () => {
      mo.disconnect();
      onboardingEl.removeEventListener('click', onClick as EventListener);
      onboardingEl.removeEventListener('keydown', onKeyDown as EventListener);
    };
  }, [onboardingEl, onStart, isStageReady]);

  // Lottie countdown (lazy-loaded)
  useEffect(() => {
    if (countdownPhase !== 'lottie' || !lottieRef.current) return;

    let anim: any;
    let mounted = true;

    (async () => {
      anim = await lottie.loadAnimation({
        container: lottieRef.current!,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: isRealMobile ? mobileOnboarding : desktopOnboarding,
      });
      if (!mounted || !anim) return;

      const onComplete = () => setCountdownPhase('begin');
      anim.addEventListener('complete', onComplete);

      // local cleanup for this async init (effect will also run its cleanup)
      return () => anim?.removeEventListener?.('complete', onComplete);
    })();

    return () => {
      mounted = false;
      anim?.destroy?.();
    };
  }, [countdownPhase, isRealMobile]);

  useEffect(() => {
    if (countdownPhase === 'begin') {
      setShowBeginText(true);
      const t = setTimeout(() => { setShowBeginText(false); setCountdownPhase(null); }, 1000);
      return () => clearTimeout(t);
    }
  }, [countdownPhase]);

  useEffect(() => {
    if (countdownPhase === 'lottie') {
      setShowOverlayBg(true);
      setShouldRenderOverlayBg(true);
    } else if (countdownPhase === null) {
      setShowOverlayBg(false);
      const t = setTimeout(() => setShouldRenderOverlayBg(false), 400);
      return () => clearTimeout(t);
    }
  }, [countdownPhase]);

  // Canvas bridges
  const handleReady = (api: { restart: () => void }) => {
    restartApi.current = api;
    onStageReady(true); // flips CTA to "Click to Play!"
  };

  // If the whole enhancer unmounts, reset readiness
  useEffect(() => () => onStageReady(false), [onStageReady]);

  // Restart
  const handleRestart = () => {
    container.classList.add('ingame');
    setCountdownPhase(null);
    setCoins(0);
    setFinalScore(null);
    restartApi.current?.restart();
    requestAnimationFrame(() => (container as HTMLElement)?.focus?.());
  };

  // Exit → return to onboarding
  const handleExit = () => {
    setStarted(false);
    setCountdownPhase(null);
    setCoins(0);
    setFinalScore(null);
    deactivateGameMode();

    container.classList.remove('ingame');

    onboardingEl.style.display = '';
    reapplyOnboarding(); // remount onboarding inner
    requestAnimationFrame(() => { onboardingEl.style.opacity = '1'; });
  };

  return (
    <>
      {/* Global input guards while playing */}
      <GameInputGuards active={started} lockBodyScroll alsoBlockWheel alsoBlockTouch allowWhenTyping />

      {started && (
        <>
          <ExitButton onExit={handleExit} />
          <CoinCounter
            coins={coins}
            highScore={displayHigh}
            newHighScore={beatingHighNow}
          />

          {shouldRenderOverlayBg && (
            <div
              className={`countdown-bg-overlay ${!showOverlayBg ? 'hide' : ''}`}
              style={{ pointerEvents: 'none' }}
            />
          )}

          {(countdownPhase === 'lottie' || countdownPhase === 'begin') && (
            <div
              ref={lottieRef}
              id="lottie-onboarding"
              className="countdown-lottie"
              style={{ pointerEvents: 'none' }}
            />
          )}

          <GameOverController
            score={finalScore}
            highScore={stableHigh}
            onRestart={handleRestart}
            onHide={() => setFinalScore(null)}
          />
        </>
      )}

      {/* Stage under section */}
      <LazyViewMount
        load={() => import('../../components/rock-escapade/game-canvas')}
        fallback={null}
        /* Preload the chunk early so re-mounts are instant */
        preloadOnIdle
        preloadIdleTimeout={2000}
        preloadOnFirstIO
        /* IO config */
        rootMargin="0px"
        placeholderMinHeight={360}
        componentProps={{
          onReady: handleReady,            // flips stageReady
          onCoinsChange: (n: number) => setCoins(n),
          onGameOver: (finalCoins: number) => setFinalScore(finalCoins),
          highScore: stableHigh,
          pauseWhenHidden: true,
          demoMode: !started,
          overlayActive: countdownPhase === 'lottie' || countdownPhase === 'begin',
          allowSpawns: !started || (started && (countdownPhase === 'begin' || countdownPhase === null)),
        }}
      />
    </>
  );
};
