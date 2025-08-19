// src/components/rock-escapade/BlockGHost.tsx
import { useCallback, useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

import BlockGOnboarding from './block-g-onboarding';
import BlockGGameOver from './block-g-game-over';
import CoinCounter from './block-g-coin-counter';
import ExitButton from './block-g-exit';

import { useRealMobileViewport } from '../../utils/content-utility/real-mobile';
import desktopOnboarding from '../../svg/desktop-onboarding.json';
import mobileOnboarding from '../../svg/mobile-onboarding.json';

import LazyViewMount from '../../utils/content-utility/lazy-view-mount';
import { gameLoaders } from '../../utils/content-utility/component-loader';
import { useHighScoreSubscription } from './subscribeHighScore';
import { updateHighScore } from './updateHighScore';

import '../../styles/block-type-g.css';

// --- Game mode helpers
const GAME_MODE_CLASS = 'game-mode-active';
function activateGameMode() { if (typeof document !== 'undefined') document.body.classList.add(GAME_MODE_CLASS); }
function deactivateGameMode() { if (typeof document !== 'undefined') document.body.classList.remove(GAME_MODE_CLASS); }
function isFullscreen() { return typeof document !== 'undefined' && !!document.fullscreenElement; }

export default function BlockGHost({ blockId }: { blockId: string }) {
  const isRealMobile = useRealMobileViewport();

  // lifecycle
  const [started, setStarted] = useState(false);
  const [fakeFS, setFakeFS] = useState(false);

  // HUD + meta
  const [coins, setCoins] = useState(0);
  const [gameOverVisible, setGameOverVisible] = useState(false);
  const [newHighScore, setNewHighScore] = useState(false);

  // High score from Sanity only (single source of truth)
  const remoteHighScore = useHighScoreSubscription();
  const stableHigh = typeof remoteHighScore === 'number' ? remoteHighScore : 0;

  // onboarding overlay state
  const [countdownPhase, setCountdownPhase] = useState<null | 'lottie' | 'begin'>(null);
  const [showBeginText, setShowBeginText] = useState(false);
  const [showOverlayBg, setShowOverlayBg] = useState(false);
  const [shouldRenderOverlayBg, setShouldRenderOverlayBg] = useState(false);
  const lottieRef = useRef<HTMLDivElement | null>(null);

  // API from GameCanvas (restart)
  const restartApi = useRef<{ restart: () => void } | null>(null);

  // --- Fullscreen
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
      setFakeFS(true); // CSS fallback for iOS etc.
    }
  }, [blockId]);

  const onStart = useCallback(async () => {
    void gameLoaders.game(); // prefetch canvas chunk immediately
    await enterFullscreen();
    activateGameMode();
    setStarted(true);
    setCoins(0);
    setCountdownPhase('lottie');

    requestAnimationFrame(() => {
      const el = document.getElementById(blockId);
      (el as HTMLElement | null)?.focus?.();
    });
  }, [enterFullscreen, blockId]);

  // Global key guard (prevent page scroll)
  useEffect(() => {
    if (!started) return;

    const gameRoot = document.getElementById(blockId);
    const preventScrollKeys = (e: KeyboardEvent) => {
      if (!document.body.classList.contains(GAME_MODE_CLASS)) return;

      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (tag && /INPUT|TEXTAREA|SELECT/.test(tag)) return;

      if (gameRoot && t && gameRoot.contains(t)) return;

      const k = e.key;
      if (
        k === ' ' || k === 'Spacebar' ||
        k === 'ArrowUp' || k === 'ArrowDown' ||
        k === 'ArrowLeft' || k === 'ArrowRight' ||
        k === 'PageUp' || k === 'PageDown' ||
        k === 'Home' || k === 'End'
      ) e.preventDefault();
    };

    window.addEventListener('keydown', preventScrollKeys);
    return () => window.removeEventListener('keydown', preventScrollKeys);
  }, [started, blockId]);

  // Scroll lock while started (real or fake FS)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!started && !fakeFS) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [started, fakeFS]);

  // Countdown Lottie -> BEGIN! -> hide
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
      const t = setTimeout(() => {
        setShowBeginText(false);
        setCountdownPhase(null);
      }, 1000);
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

  // GameCanvas callbacks
  const handleReady = (api: { restart: () => void }) => { restartApi.current = api; };

  const handleCoinsChange = (n: number) => {
    setCoins(n);
    // styling hint while current run is beating the remote value
    setNewHighScore(n > stableHigh);
  };

  const handleGameOver = (finalCoins: number, isNewHigh: boolean) => {
    setGameOverVisible(true);
    setNewHighScore(isNewHigh);

    if (isNewHigh) {
      // Only update Sanity; UI will reflect via subscription
      updateHighScore(finalCoins).catch((e) =>
        console.error('[HS] Remote update error:', e)
      );
    }
  };

  const handleRestart = () => {
    setGameOverVisible(false);
    setNewHighScore(false);
    setCountdownPhase(null);
    restartApi.current?.restart();
    setCoins(0);
  };

  const handleExit = () => {
    setStarted(false);
    setGameOverVisible(false);
    setNewHighScore(false);
    setCountdownPhase(null);
    setCoins(0);

    deactivateGameMode();
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

  // For display: if you’re beating the high, show the current coins next to “New High Score”
  const displayHigh = newHighScore ? coins : stableHigh;

  return (
    <section
      id={blockId}
      tabIndex={-1}
      className={`block-type-g ${fakeFS ? 'fake-fs' : ''} ${started ? 'ingame' : ''}`}
      style={{ position: 'relative' }}
    >
      {/* Onboarding UI */}
      {!started && (
        <BlockGOnboarding onStart={onStart} resetTrigger={started ? 1 : 0} />
      )}

      {/* HUD & overlays during live play */}
      {started && (
        <>
          <ExitButton onExit={handleExit} />
          <CoinCounter
            coins={coins}
            highScore={displayHigh}
            newHighScore={newHighScore}
          />

          {shouldRenderOverlayBg && (
            <div className={`countdown-bg-overlay ${!showOverlayBg ? 'hide' : ''}`} />
          )}

          {(countdownPhase === 'lottie' || countdownPhase === 'begin') && (
            <div ref={lottieRef} id="lottie-onboarding" className="countdown-lottie" />
          )}

          {showBeginText && (
            <div className="countdown-display">
              <h1 className="countdown-text">BEGIN!</h1>
            </div>
          )}

          {gameOverVisible && (
            <BlockGGameOver
              onRestart={handleRestart}
              visibleTrigger={gameOverVisible ? 1 : 0}
              coins={coins}
              newHighScore={newHighScore}
            />
          )}
        </>
      )}

      {/* Always mount the q5 canvas. It runs in demo mode while !started. */}
      <LazyViewMount
        load={() => import('./game-canvas')}
        fallback={null}
        eager={false}                 // ← keep lazy load FALSE (as requested)
        eagerThreshold={0.2}
        mountThreshold={0.4}
        allowIdle={true}
        observeTargetId={blockId}
        rootMargin="0px 0px -15% 0px"
        componentProps={{
          onReady: handleReady,
          onCoinsChange: handleCoinsChange,
          onGameOver: handleGameOver,
          highScore: stableHigh,      // engine baseline comes ONLY from Sanity
          pauseWhenHidden: true,
          demoMode: !started,
          overlayActive: countdownPhase === 'lottie' || countdownPhase === 'begin',
          allowSpawns:
            !started ||
            (started && (countdownPhase === 'begin' || countdownPhase === null)),
        }}
      />
    </section>
  );
}
