"use strict";
exports.id = "src_ssr_projects_game_enhancer_tsx";
exports.ids = ["src_ssr_projects_game_enhancer_tsx"];
exports.modules = {

/***/ "./src/components/rock-escapade/block-g-onboarding-inner.tsx":
/*!*******************************************************************!*\
  !*** ./src/components/rock-escapade/block-g-onboarding-inner.tsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lottie-web */ "lottie-web");
/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lottie_web__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _svg_coin_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../svg/coin.json */ "./src/svg/coin.json");
/* harmony import */ var _utils_loading_loading_hub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/loading/loading-hub */ "./src/utils/loading/loading-hub.tsx");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/components/rock-escapade/block-g-onboarding-inner.tsx





const BlockGOnboardingInner = ({
  onClick,
  onMount,
  onUnmount,
  startAtFrame = 0,
  loopFromFrame = 41,
  debug = false,
  label = 'Click Here to Play!',
  ctaEnabled = false,
  loadingLines = ["Loading engine…", "Creating game canvas…", "Configuring frame loop…", "Setting up input controls…", "Applying display settings…", "Initializing game state…", "Spawning player…", "Almost ready…"]
}) => {
  const hostRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const animRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const phaseRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)('intro');
  const introDoneRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const absEndRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);

  // keep callbacks stable for the effect
  const mountRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onMount);
  const unmountRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onUnmount);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    mountRef.current = onMount;
  }, [onMount]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    unmountRef.current = onUnmount;
  }, [onUnmount]);
  const log = (...a) => debug && console.log('[Coin]', ...a);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    mountRef.current?.();
    const el = hostRef.current;
    if (!el) return () => unmountRef.current?.();

    // clean any prior
    try {
      animRef.current?.destroy();
    } catch {}
    animRef.current = null;
    phaseRef.current = 'intro';
    introDoneRef.current = false;
    const anim = lottie_web__WEBPACK_IMPORTED_MODULE_1___default().loadAnimation({
      container: el,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: _svg_coin_json__WEBPACK_IMPORTED_MODULE_2__,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
        progressiveLoad: true
      }
    });
    animRef.current = anim;
    const getAbsEnd = () => {
      const frames = Math.max(1, Math.floor(anim.getDuration?.(true) ?? anim.totalFrames ?? 1));
      return frames - 1;
    };
    const playIntroOnce = () => {
      const absEnd = absEndRef.current;
      const s = Math.max(0, Math.min(startAtFrame, absEnd));
      log('intro start', {
        startAtFrame: s,
        absEnd
      });
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
      log('→ tail loop', {
        tailStart,
        absEnd
      });
    };
    const onDOMLoaded = () => {
      absEndRef.current = getAbsEnd();
      log('DOMLoaded', {
        absEnd: absEndRef.current
      });
      playIntroOnce();
    };
    const onCompleteIntro = () => {
      if (!introDoneRef.current) {
        introDoneRef.current = true;
        log('intro complete', {
          frame: Math.floor(anim.currentFrame || 0)
        });
        startTailLoop();
      }
    };
    const onLoopComplete = () => {
      if (phaseRef.current === 'tail') {
        log('loopComplete (tail)', {
          frame: Math.floor(anim.currentFrame || 0)
        });
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
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      ref: hostRef,
      className: "coin",
      onClick: onClick,
      style: {
        pointerEvents: 'auto'
      }
    }), !ctaEnabled ? (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1", {
        className: "onboarding-text loading-text",
        style: {
          pointerEvents: 'none'
        },
        children: "Loading Game\u2026"
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_utils_loading_loading_hub__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "loading-hub--game loading-hub--left",
        keyword: "game",
        minHeight: 72,
        lines: loadingLines,
        ariaLabel: "Loading game"
      })]
    }) :
    // Ready → show CTA
    (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1", {
      className: "onboarding-text",
      onClick: onClick,
      style: {
        pointerEvents: 'auto'
      },
      children: label
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockGOnboardingInner);

/***/ }),

/***/ "./src/ssr/projects/game.enhancer.tsx":
/*!********************************************!*\
  !*** ./src/ssr/projects/game.enhancer.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_load_lottie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/load-lottie */ "./src/utils/load-lottie.ts");
/* harmony import */ var _components_rock_escapade_block_g_onboarding_inner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/rock-escapade/block-g-onboarding-inner */ "./src/components/rock-escapade/block-g-onboarding-inner.tsx");
/* harmony import */ var _components_rock_escapade_block_g_exit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/rock-escapade/block-g-exit */ "./src/components/rock-escapade/block-g-exit.tsx");
/* harmony import */ var _components_rock_escapade_block_g_coin_counter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/rock-escapade/block-g-coin-counter */ "./src/components/rock-escapade/block-g-coin-counter.tsx");
/* harmony import */ var _logic_game_over_controller__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../logic/game-over-controller */ "./src/ssr/logic/game-over-controller.tsx");
/* harmony import */ var _utils_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/content-utility/real-mobile */ "./src/utils/content-utility/real-mobile.ts");
/* harmony import */ var _utils_content_utility_lazy_view_mount__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/content-utility/lazy-view-mount */ "./src/utils/content-utility/lazy-view-mount.tsx");
/* harmony import */ var _utils_content_utility_component_loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/content-utility/component-loader */ "./src/utils/content-utility/component-loader.tsx");
/* harmony import */ var _components_rock_escapade_useHighScoreSubscription__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/rock-escapade/useHighScoreSubscription */ "./src/components/rock-escapade/useHighScoreSubscription.ts");
/* harmony import */ var _logic_game_input_guards__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../logic/game-input-guards */ "./src/ssr/logic/game-input-guards.tsx");
/* harmony import */ var _svg_desktop_onboarding_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../svg/desktop-onboarding.json */ "./src/svg/desktop-onboarding.json");
/* harmony import */ var _svg_mobile_onboarding_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../svg/mobile-onboarding.json */ "./src/svg/mobile-onboarding.json");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/ssr/projects/game.enhancer.tsx















const GAME_MODE_CLASS = 'game-mode-active';
const activateGameMode = () => document.body.classList.add(GAME_MODE_CLASS);
const deactivateGameMode = () => document.body.classList.remove(GAME_MODE_CLASS);
function scheduleIdle(cb, timeout = 2000) {
  const w = window;
  if (typeof w.requestIdleCallback === 'function') {
    const id = w.requestIdleCallback(cb, {
      timeout
    });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = window.setTimeout(cb, timeout);
  return () => window.clearTimeout(t);
}
const GameEnhancer = () => {
  const [sec, setSec] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [onboardingEl, setOnboardingEl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [rootEl, setRootEl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [shouldMount, setShouldMount] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [stageReady, setStageReady] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const firstHydrationUsedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const firstVisibilityCallbackSkippedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const wasVisibleRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);

  // Force a clean re-mount of onboarding inner (resets lottie/visibility) after exit
  const [onboardingReset, setOnboardingReset] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const reapplyOnboarding = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => setOnboardingReset(v => v + 1), []);
  const stableStartAtForThisMount = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => firstHydrationUsedRef.current ? 0 : 30, [onboardingReset] // ← only recompute when we intentionally remount onboarding
  );
  const handleInnerMount = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    firstHydrationUsedRef.current = true;
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const container = document.getElementById('block-game');
    if (!container) return;
    setSec(container);

    // SSR shell: <section … data-ssr-shell="block-game">
    const shell = container.querySelector('[data-ssr-shell="block-game"]');
    if (!shell) return;

    // Host for onboarding UI: prefer existing .block-g-onboarding, else decorate the shell
    let host = shell.querySelector('.block-g-onboarding');
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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!sec) return;
    const cancelIdle = scheduleIdle(() => setShouldMount(true), 2000);
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldMount(true);
        cancelIdle();
        io.disconnect();
      }
    }, {
      threshold: [0, 0.3]
    });
    io.observe(sec);
    return () => {
      io.disconnect();
      cancelIdle();
    };
  }, [sec]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!sec) return;
    const io = new IntersectionObserver(([entry]) => {
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
    }, {
      threshold: 0.01
    });
    io.observe(sec);
    return () => io.disconnect();
  }, [sec]);
  if (!sec || !onboardingEl || !rootEl || !shouldMount) return null;
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
    children: [/*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(OnboardingPortal, {
      reset: onboardingReset,
      startAtFrame: stableStartAtForThisMount,
      onInnerMount: handleInnerMount,
      label: stageReady ? 'Click Here to Play!' : 'Loading Game……',
      ctaEnabled: stageReady
    }), onboardingEl), /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(GameStage, {
      blockId: "block-game",
      container: sec,
      onboardingEl: onboardingEl,
      reapplyOnboarding: reapplyOnboarding,
      isStageReady: stageReady,
      onStageReady: setStageReady
    }), rootEl)]
  });
};

// let the portal thread the props to the inner

const OnboardingPortal = ({
  reset,
  startAtFrame,
  onInnerMount,
  label,
  ctaEnabled,
  loadingLines
}) => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_rock_escapade_block_g_onboarding_inner__WEBPACK_IMPORTED_MODULE_3__["default"], {
  startAtFrame: startAtFrame,
  onMount: onInnerMount,
  label: label,
  ctaEnabled: ctaEnabled,
  loadingLines: loadingLines
}, reset);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameEnhancer);

/* ---------- Stage (mirrors the working BlockGHost behavior) ---------- */
const GameStage = ({
  blockId,
  container,
  onboardingEl,
  reapplyOnboarding,
  isStageReady,
  onStageReady
}) => {
  void blockId; // silence unused param if you keep passing it

  const isRealMobile = (0,_utils_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_7__.useRealMobileViewport)();

  // lifecycle
  const [started, setStarted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // HUD + meta
  const [coins, setCoins] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [finalScore, setFinalScore] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const remoteHighScore = (0,_components_rock_escapade_useHighScoreSubscription__WEBPACK_IMPORTED_MODULE_10__.useHighScoreSubscription)();
  const stableHigh = typeof remoteHighScore === 'number' ? remoteHighScore : 0;

  // UI-only: mimic BlockGHost display logic
  const displayHigh = (finalScore == null ? coins : finalScore) > stableHigh ? finalScore == null ? coins : finalScore : stableHigh;
  const beatingHighNow = finalScore == null && coins > stableHigh;

  // overlays
  const [countdownPhase, setCountdownPhase] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [showBeginText, setShowBeginText] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showOverlayBg, setShowOverlayBg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [shouldRenderOverlayBg, setShouldRenderOverlayBg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const lottieRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // canvas restart API from game-canvas
  const restartApi = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Start — only when stage is ready
  const onStart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!isStageReady) return; // gate until canvas called onReady
    void _utils_content_utility_component_loader__WEBPACK_IMPORTED_MODULE_9__.gameLoaders.game();
    container.classList.add('ingame');
    activateGameMode();
    setStarted(true);
    setCoins(0);
    setFinalScore(null);
    setCountdownPhase('lottie');
    requestAnimationFrame(() => container?.focus?.());
    onboardingEl.style.transition = 'opacity 180ms ease';
    onboardingEl.style.opacity = '0';
    window.setTimeout(() => {
      onboardingEl.style.display = 'none';
    }, 180);
  }, [container, onboardingEl, isStageReady]);

  /** Limit start to coin/text only, AND reflect readiness in interactivity */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const CLICK_TARGETS = '.coin, .onboarding-text, [data-start-hit]';
    const armTargets = () => {
      onboardingEl.querySelectorAll(CLICK_TARGETS).forEach(el => {
        const node = el;
        node.style.pointerEvents = isStageReady ? 'auto' : 'none';
        node.style.cursor = isStageReady ? 'pointer' : 'default';
        if (!node.hasAttribute('role')) node.setAttribute('role', 'button');
        if (node.tabIndex < 0) node.tabIndex = 0;
      });
      onboardingEl.setAttribute('aria-busy', String(!isStageReady));
    };
    armTargets();
    const mo = new MutationObserver(armTargets);
    mo.observe(onboardingEl, {
      childList: true,
      subtree: true
    });
    const onClick = ev => {
      if (!isStageReady) return;
      const t = ev.target;
      if (t && t.closest(CLICK_TARGETS)) onStart();
    };
    const onKeyDown = ev => {
      if (!isStageReady) return;
      if (ev.key === 'Enter' || ev.key === ' ') {
        const t = ev.target;
        if (t && t.closest(CLICK_TARGETS)) {
          ev.preventDefault();
          onStart();
        }
      }
    };
    onboardingEl.addEventListener('click', onClick, {
      passive: true
    });
    onboardingEl.addEventListener('keydown', onKeyDown);
    return () => {
      mo.disconnect();
      onboardingEl.removeEventListener('click', onClick);
      onboardingEl.removeEventListener('keydown', onKeyDown);
    };
  }, [onboardingEl, onStart, isStageReady]);

  // Lottie countdown (lazy-loaded)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (countdownPhase !== 'lottie' || !lottieRef.current) return;
    let anim;
    let mounted = true;
    (async () => {
      anim = await _utils_load_lottie__WEBPACK_IMPORTED_MODULE_2__["default"].loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: isRealMobile ? _svg_mobile_onboarding_json__WEBPACK_IMPORTED_MODULE_13__ : _svg_desktop_onboarding_json__WEBPACK_IMPORTED_MODULE_12__
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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (countdownPhase === 'begin') {
      setShowBeginText(true);
      const t = setTimeout(() => {
        setShowBeginText(false);
        setCountdownPhase(null);
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [countdownPhase]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
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
  const handleReady = api => {
    restartApi.current = api;
    onStageReady(true); // flips CTA to "Click to Play!"
  };

  // If the whole enhancer unmounts, reset readiness
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => () => onStageReady(false), [onStageReady]);

  // Restart
  const handleRestart = () => {
    container.classList.add('ingame');
    setCountdownPhase(null);
    setCoins(0);
    setFinalScore(null);
    restartApi.current?.restart();
    requestAnimationFrame(() => container?.focus?.());
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
    requestAnimationFrame(() => {
      onboardingEl.style.opacity = '1';
    });
  };
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_logic_game_input_guards__WEBPACK_IMPORTED_MODULE_11__["default"], {
      active: started,
      lockBodyScroll: true,
      alsoBlockWheel: true,
      alsoBlockTouch: true,
      allowWhenTyping: true
    }), started && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_rock_escapade_block_g_exit__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onExit: handleExit
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_rock_escapade_block_g_coin_counter__WEBPACK_IMPORTED_MODULE_5__["default"], {
        coins: coins,
        highScore: displayHigh,
        newHighScore: beatingHighNow
      }), shouldRenderOverlayBg && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
        className: `countdown-bg-overlay ${!showOverlayBg ? 'hide' : ''}`,
        style: {
          pointerEvents: 'none'
        }
      }), (countdownPhase === 'lottie' || countdownPhase === 'begin') && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
        ref: lottieRef,
        id: "lottie-onboarding",
        className: "countdown-lottie",
        style: {
          pointerEvents: 'none'
        }
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_logic_game_over_controller__WEBPACK_IMPORTED_MODULE_6__["default"], {
        score: finalScore,
        highScore: stableHigh,
        onRestart: handleRestart,
        onHide: () => setFinalScore(null)
      })]
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_utils_content_utility_lazy_view_mount__WEBPACK_IMPORTED_MODULE_8__["default"], {
      load: () => __webpack_require__.e(/*! import() */ "src_components_rock-escapade_game-canvas_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/rock-escapade/game-canvas */ "./src/components/rock-escapade/game-canvas.tsx")),
      fallback: null
      /* Preload the chunk early so re-mounts are instant */,
      preloadOnIdle: true,
      preloadIdleTimeout: 2000,
      preloadOnFirstIO: true
      /* IO config */,
      rootMargin: "0px",
      placeholderMinHeight: 360,
      componentProps: {
        onReady: handleReady,
        // flips stageReady
        onCoinsChange: n => setCoins(n),
        onGameOver: finalCoins => setFinalScore(finalCoins),
        highScore: stableHigh,
        pauseWhenHidden: true,
        demoMode: !started,
        overlayActive: countdownPhase === 'lottie' || countdownPhase === 'begin',
        allowSpawns: !started || started && (countdownPhase === 'begin' || countdownPhase === null)
      }
    })]
  });
};

/***/ })

};
;
//# sourceMappingURL=src_ssr_projects_game_enhancer_tsx.server.js.map