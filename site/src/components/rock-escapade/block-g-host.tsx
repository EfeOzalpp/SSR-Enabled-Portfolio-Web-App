import { useCallback, useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

import BlockGOnboarding from './block-g-onboarding';
import CoinCounter from './block-g-coin-counter';
import ExitButton from './block-g-exit';
import GameOverController from '../../ssr/logic/game-over-controller';

import { useRealMobileViewport } from '../../utils/content-utility/real-mobile';
import desktopOnboarding from '../../svg/desktop-onboarding.json';
import mobileOnboarding from '../../svg/mobile-onboarding.json';

import LazyViewMount from '../../utils/content-utility/lazy-view-mount';
import { gameLoaders } from '../../utils/content-utility/component-loader';
import { useHighScoreSubscription } from './useHighScoreSubscription';
import GameInputGuards from '../../ssr/logic/game-input-guards';

import '../../styles/block-type-g.css';

const GAME_MODE_CLASS = 'game-mode-active';
function activateGameMode() { if (typeof document !== 'undefined') document.body.classList.add(GAME_MODE_CLASS); }
function deactivateGameMode() { if (typeof document !== 'undefined') document.body.classList.remove(GAME_MODE_CLASS); }
function isFullscreen() { return typeof document !== 'undefined' && !!document.fullscreenElement; }

export default function BlockGHost({ blockId }: { blockId: string }) {
  const isRealMobile = useRealMobileViewport();

  // lifecycle
  const [started, setStarted] = useState(false);
  const [fakeFS, setFakeFS] = useState(false);

  // gate CTA until canvas reports ready
  const [stageReady, setStageReady] = useState(false);

  // HUD + meta
  const [coins, setCoins] = useState(0);
  const [countdownPhase, setCountdownPhase] = useState<null | 'lottie' | 'begin'>(null);
  const [showBeginText, setShowBeginText] = useState(false);
  const [showOverlayBg, setShowOverlayBg] = useState(false);
  const [shouldRenderOverlayBg, setShouldRenderOverlayBg] = useState(false);

  const lottieRef = useRef<HTMLDivElement | null>(null);

  // NEW: game-over final score (controls overlay)
  const [finalScore, setFinalScore] = useState<number | null>(null);

  // High score (remote)
  const remoteHighScore = useHighScoreSubscription();
  const stableHigh = typeof remoteHighScore === 'number' ? remoteHighScore : 0;

  // API from GameCanvas
  const restartApi = useRef<{ restart: () => void } | null>(null);

  const enterFullscreen = useCallback(async () => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(blockId);
    if (!el) return;
    const req =
      (el as any).requestFullscreen ||
      (el as any).webkitRequestFullscreen ||
      (el as any).msRequestFullscreen ||
      (el as any).mozRequestFullScreen;
    try {
      const p = req?.call(el);
      if (p?.then) await p;
      setFakeFS(false);
    } catch {
      setFakeFS(true);
    }
  }, [blockId]);

  const onStart = useCallback(async () => {
    void gameLoaders.game();
    await enterFullscreen();
    activateGameMode();
    setStarted(true);
    setCoins(0);
    setFinalScore(null);        // hide any lingering overlay
    setCountdownPhase('lottie');

    requestAnimationFrame(() => {
      const el = document.getElementById(blockId);
      (el as HTMLElement | null)?.focus?.();
    });
  }, [enterFullscreen, blockId]);

  // Lottie countdown
  useEffect(() => {
    if (countdownPhase !== 'lottie' || !lottieRef.current) return;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: isRealMobile ? mobileOnboarding : desktopOnboarding,
    });
    const onComplete = () => setCountdownPhase('begin');
    anim.addEventListener('complete', onComplete);
    return () => { anim.removeEventListener('complete', onComplete); anim.destroy(); };
  }, [countdownPhase, isRealMobile]);

  useEffect(() => {
    if (countdownPhase === 'begin') {
      setShowBeginText(true);
      const t = setTimeout(() => { setShowBeginText(false); setCountdownPhase(null); }, 1000);
      return () => clearTimeout(t);
    }
  }, [countdownPhase]);

  useEffect(() => {
    if (countdownPhase === 'lottie') { setShowOverlayBg(true); setShouldRenderOverlayBg(true); }
    else if (countdownPhase === null) {
      setShowOverlayBg(false);
      const t = setTimeout(() => setShouldRenderOverlayBg(false), 400);
      return () => clearTimeout(t);
    }
  }, [countdownPhase]);

  // Canvas bridges
  const handleReady = (api: { restart: () => void }) => {
    restartApi.current = api;
    setStageReady(true); // flip CTA from "Loading…" to "Click Here to Play!"
  };

  const handleCoinsChange = (n: number) => { setCoins(n); };
  const handleGameOver = (finalCoins: number) => { setFinalScore(finalCoins); };
  const handleRestart = () => { setCountdownPhase(null); restartApi.current?.restart(); setCoins(0); };
  const handleExit = () => {
    setStarted(false);
    setCountdownPhase(null);
    setCoins(0);
    setFinalScore(null);
    deactivateGameMode();
    setFakeFS(false);
    if (isFullscreen()) {
      const exit =
        (document as any).exitFullscreen ||
        (document as any).webkitExitFullscreen ||
        (document as any).msExitFullscreen ||
        (document as any).mozCancelFullScreen;
      try { exit?.call(document); } catch {}
    }
  };
  useEffect(() => () => deactivateGameMode(), []);

  const displayHigh = (finalScore == null ? coins : finalScore) > stableHigh
    ? (finalScore == null ? coins : finalScore)
    : stableHigh;
  const beatingHighNow = finalScore == null && coins > stableHigh;

  return (
    <section
      id={blockId}
      tabIndex={-1}
      className={`block-type-g ${fakeFS ? 'fake-fs' : ''} ${started ? 'ingame' : ''}`}
      style={{ position: 'relative' }}
    >
      <GameInputGuards
        active={started || fakeFS}
        lockBodyScroll
        alsoBlockWheel
        alsoBlockTouch
        allowWhenTyping
      />

      {!started && (
        <BlockGOnboarding
          onStart={onStart}
          resetTrigger={started ? 1 : 0}
          // NEW: text + interactivity gated on stage readiness
          label={stageReady ? 'Click Here to Play!' : 'Loading…'}
          ctaEnabled={stageReady}
        />
      )}

      {started && (
        <>
          <ExitButton onExit={handleExit} />
          <CoinCounter coins={coins} highScore={displayHigh} newHighScore={beatingHighNow} />

          {shouldRenderOverlayBg && (
            <div className={`countdown-bg-overlay ${!showOverlayBg ? 'hide' : ''}`} style={{ pointerEvents: 'none' }} />
          )}

          {(countdownPhase === 'lottie' || countdownPhase === 'begin') && (
            <div ref={lottieRef} id="lottie-onboarding" className="countdown-lottie" style={{ pointerEvents: 'none' }} />
          )}

          <GameOverController
            score={finalScore}
            highScore={stableHigh}
            onRestart={handleRestart}
            onHide={() => setFinalScore(null)}
          />
        </>
      )}

      {/* Lazy + Re-mountable:
          - Preloads chunk on idle & first IO
          - Mounts when in view, unmounts when out of view
          - Placeholder keeps height so IO can measure */}
      <LazyViewMount
        load={() => import('./game-canvas')}
        fallback={null}
        // Hysteresis: easy enter, generous exit
        enterThreshold={0.2}
        exitThreshold={0.05}
        unmountDelayMs={150}
        // Preloading
        preloadOnIdle
        preloadIdleTimeout={2000}
        preloadOnFirstIO
        // IO config
        // root={yourScrollContainerEl} // pass this if you scroll inside a custom container
        rootMargin="0px"
        placeholderMinHeight={360}
        componentProps={{
          onReady: handleReady,
          onCoinsChange: handleCoinsChange,
          onGameOver: handleGameOver,
          highScore: stableHigh,
          pauseWhenHidden: true,
          demoMode: !started,
          overlayActive: countdownPhase === 'lottie' || countdownPhase === 'begin',
          allowSpawns: !started || (started && (countdownPhase === 'begin' || countdownPhase === null)),
        }}
      />
    </section>
  );
}
