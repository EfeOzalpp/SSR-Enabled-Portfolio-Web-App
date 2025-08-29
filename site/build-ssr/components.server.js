exports.id = "components";
exports.ids = ["components"];
exports.modules = {

/***/ "./src/components/rock-escapade/block-g-host.tsx":
/*!*******************************************************!*\
  !*** ./src/components/rock-escapade/block-g-host.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BlockGHost)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_load_lottie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/load-lottie */ "./src/utils/load-lottie.ts");
/* harmony import */ var _block_g_onboarding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block-g-onboarding */ "./src/components/rock-escapade/block-g-onboarding.tsx");
/* harmony import */ var _block_g_coin_counter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block-g-coin-counter */ "./src/components/rock-escapade/block-g-coin-counter.tsx");
/* harmony import */ var _block_g_exit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block-g-exit */ "./src/components/rock-escapade/block-g-exit.tsx");
/* harmony import */ var _ssr_logic_game_over_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ssr/logic/game-over-controller */ "./src/ssr/logic/game-over-controller.tsx");
/* harmony import */ var _utils_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/content-utility/real-mobile */ "./src/utils/content-utility/real-mobile.ts");
/* harmony import */ var _svg_desktop_onboarding_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../svg/desktop-onboarding.json */ "./src/svg/desktop-onboarding.json");
/* harmony import */ var _svg_mobile_onboarding_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../svg/mobile-onboarding.json */ "./src/svg/mobile-onboarding.json");
/* harmony import */ var _utils_content_utility_lazy_view_mount__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/content-utility/lazy-view-mount */ "./src/utils/content-utility/lazy-view-mount.tsx");
/* harmony import */ var _utils_content_utility_component_loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/content-utility/component-loader */ "./src/utils/content-utility/component-loader.tsx");
/* harmony import */ var _useHighScoreSubscription__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./useHighScoreSubscription */ "./src/components/rock-escapade/useHighScoreSubscription.ts");
/* harmony import */ var _ssr_logic_game_input_guards__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../ssr/logic/game-input-guards */ "./src/ssr/logic/game-input-guards.tsx");
/* harmony import */ var _styles_block_type_g_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../styles/block-type-g.css */ "./src/styles/block-type-g.css");
/* harmony import */ var _styles_block_type_g_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_styles_block_type_g_css__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");















const GAME_MODE_CLASS = 'game-mode-active';
function activateGameMode() {
  if (typeof document !== 'undefined') document.body.classList.add(GAME_MODE_CLASS);
}
function deactivateGameMode() {
  if (typeof document !== 'undefined') document.body.classList.remove(GAME_MODE_CLASS);
}
function isFullscreen() {
  return typeof document !== 'undefined' && !!document.fullscreenElement;
}
function BlockGHost({
  blockId
}) {
  const isRealMobile = (0,_utils_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_6__.useRealMobileViewport)();

  // lifecycle
  const [started, setStarted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [fakeFS, setFakeFS] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // gate CTA until canvas reports ready
  const [stageReady, setStageReady] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // HUD + meta
  const [coins, setCoins] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [countdownPhase, setCountdownPhase] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [showBeginText, setShowBeginText] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showOverlayBg, setShowOverlayBg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [shouldRenderOverlayBg, setShouldRenderOverlayBg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const lottieRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // NEW: game-over final score (controls overlay)
  const [finalScore, setFinalScore] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // High score (remote)
  const remoteHighScore = (0,_useHighScoreSubscription__WEBPACK_IMPORTED_MODULE_11__.useHighScoreSubscription)();
  const stableHigh = typeof remoteHighScore === 'number' ? remoteHighScore : 0;

  // API from GameCanvas
  const restartApi = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const enterFullscreen = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(blockId);
    if (!el) return;
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen || el.mozRequestFullScreen;
    try {
      const p = req?.call(el);
      if (p?.then) await p;
      setFakeFS(false);
    } catch {
      setFakeFS(true);
    }
  }, [blockId]);
  const onStart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    void _utils_content_utility_component_loader__WEBPACK_IMPORTED_MODULE_10__.gameLoaders.game();
    await enterFullscreen();
    activateGameMode();
    setStarted(true);
    setCoins(0);
    setFinalScore(null); // hide any lingering overlay
    setCountdownPhase('lottie');
    requestAnimationFrame(() => {
      const el = document.getElementById(blockId);
      el?.focus?.();
    });
  }, [enterFullscreen, blockId]);

  // Lottie countdown (lazy)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (countdownPhase !== 'lottie' || !lottieRef.current) return;
    let anim;
    let mounted = true;
    (async () => {
      anim = await _utils_load_lottie__WEBPACK_IMPORTED_MODULE_1__["default"].loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: isRealMobile ? _svg_mobile_onboarding_json__WEBPACK_IMPORTED_MODULE_8__ : _svg_desktop_onboarding_json__WEBPACK_IMPORTED_MODULE_7__
      });
      if (!mounted || !anim) return;
      const onComplete = () => setCountdownPhase('begin');
      anim.addEventListener('complete', onComplete);
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
    setStageReady(true); // flip CTA from "Loading…" to "Click Here to Play!"
  };
  const handleCoinsChange = n => setCoins(n);
  const handleGameOver = finalCoins => setFinalScore(finalCoins);
  const handleRestart = () => {
    setCountdownPhase(null);
    restartApi.current?.restart();
    setCoins(0);
  };
  const handleExit = () => {
    setStarted(false);
    setCountdownPhase(null);
    setCoins(0);
    setFinalScore(null);
    deactivateGameMode();
    setFakeFS(false);
    if (isFullscreen()) {
      const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen;
      try {
        exit?.call(document);
      } catch {}
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => () => deactivateGameMode(), []);
  const displayHigh = (finalScore == null ? coins : finalScore) > stableHigh ? finalScore == null ? coins : finalScore : stableHigh;
  const beatingHighNow = finalScore == null && coins > stableHigh;
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("section", {
    id: blockId,
    tabIndex: -1,
    className: `block-type-g ${fakeFS ? 'fake-fs' : ''} ${started ? 'ingame' : ''}`,
    style: {
      position: 'relative'
    },
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_ssr_logic_game_input_guards__WEBPACK_IMPORTED_MODULE_12__["default"], {
      active: started || fakeFS,
      lockBodyScroll: true,
      alsoBlockWheel: true,
      alsoBlockTouch: true,
      allowWhenTyping: true
    }), !started && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_block_g_onboarding__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onStart: onStart,
      resetTrigger: started ? 1 : 0
      // NEW: text + interactivity gated on stage readiness
      ,
      label: stageReady ? 'Click Here to Play!' : 'Loading Game…',
      ctaEnabled: stageReady
    }), started && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_block_g_exit__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onExit: handleExit
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_block_g_coin_counter__WEBPACK_IMPORTED_MODULE_3__["default"], {
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
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_ssr_logic_game_over_controller__WEBPACK_IMPORTED_MODULE_5__["default"], {
        score: finalScore,
        highScore: stableHigh,
        onRestart: handleRestart,
        onHide: () => setFinalScore(null)
      })]
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_utils_content_utility_lazy_view_mount__WEBPACK_IMPORTED_MODULE_9__["default"], {
      load: () => __webpack_require__.e(/*! import() */ "src_components_rock-escapade_game-canvas_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./game-canvas */ "./src/components/rock-escapade/game-canvas.tsx")),
      fallback: null,
      mountMode: "io",
      observeTargetId: blockId,
      rootMargin: "0px",
      enterThreshold: 0.2,
      exitThreshold: 0.05,
      unmountDelayMs: 150,
      preloadOnIdle: true,
      preloadIdleTimeout: 2000,
      preloadOnFirstIO: true,
      placeholderMinHeight: 360,
      componentProps: {
        onReady: handleReady,
        onCoinsChange: handleCoinsChange,
        onGameOver: handleGameOver,
        highScore: stableHigh,
        pauseWhenHidden: true,
        demoMode: !started,
        overlayActive: countdownPhase === 'lottie' || countdownPhase === 'begin',
        allowSpawns: !started || started && (countdownPhase === 'begin' || countdownPhase === null)
      }
    })]
  });
}

/***/ }),

/***/ "./src/components/rock-escapade/block-g-onboarding.tsx":
/*!*************************************************************!*\
  !*** ./src/components/rock-escapade/block-g-onboarding.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lottie-web */ "lottie-web");
/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lottie_web__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _svg_coin_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../svg/coin.json */ "./src/svg/coin.json");
/* harmony import */ var _utils_context_providers_project_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/context-providers/project-context */ "./src/utils/context-providers/project-context.tsx");
/* harmony import */ var _utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/tooltip/tooltipInit */ "./src/utils/tooltip/tooltipInit.ts");
/* harmony import */ var _utils_loading_loading_hub__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/loading/loading-hub */ "./src/utils/loading/loading-hub.tsx");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/components/rock-escapade/block-g-onboarding.tsx







const BlockGOnboarding = ({
  onStart,
  resetTrigger,
  label = 'Click Here to Play!',
  ctaEnabled = true,
  loadingLines = ["Loading engine…", "Creating game canvas…", "Configuring frame loop…", "Setting up input controls…", "Applying display settings…", "Initializing game state…", "Spawning player…", "Almost ready…"]
}) => {
  const [visible, setVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [isFadingOut, setIsFadingOut] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const lottieRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const lottieInstance = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_4__.useTooltipInit)();
  const {
    focusedProjectKey,
    scrollContainerRef,
    previousScrollY,
    setPreviousScrollY
  } = (0,_utils_context_providers_project_context__WEBPACK_IMPORTED_MODULE_3__.useProjectVisibility)();
  const handleClick = () => {
    if (!ctaEnabled) return; // gate until ready
    if (focusedProjectKey) {
      setPreviousScrollY(window.scrollY);
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            top: 0,
            behavior: 'auto'
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'auto'
          });
        }
      }, 0);
    }
    onStart?.();
    setIsFadingOut(true);
  };

  // Restore scroll pos on exit from focus mode
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // (kept from your version — omitted focusedProjectKey setter, just restore)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initializeLottie = () => {
    if (!lottieRef.current) return;
    lottieInstance.current?.destroy();
    lottieInstance.current = lottie_web__WEBPACK_IMPORTED_MODULE_1___default().loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: _svg_coin_json__WEBPACK_IMPORTED_MODULE_2__
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

  // IO mount/unmount of the Lottie
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const observer = new IntersectionObserver(entries => {
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
    }, {
      threshold: 0.1
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      destroyLottie();
    };
  }, [resetTrigger]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isFadingOut) {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [isFadingOut]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (resetTrigger) {
      setVisible(true);
      setIsFadingOut(false);
    }
  }, [resetTrigger]);
  if (!visible) return null;
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "block-g-onboarding tooltip-block-g",
    ref: containerRef,
    "aria-busy": !ctaEnabled,
    style: {
      opacity: isFadingOut ? 0 : 1,
      transition: 'opacity 0.3s ease',
      display: 'flex',
      alignItems: 'center'
    },
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ref: lottieRef,
      className: "coin",
      onClick: handleClick,
      style: {
        pointerEvents: ctaEnabled ? 'auto' : 'none',
        cursor: ctaEnabled ? 'pointer' : 'default'
      }
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h1", {
      className: "onboarding-text",
      onClick: handleClick,
      "aria-disabled": !ctaEnabled,
      style: {
        pointerEvents: ctaEnabled ? 'auto' : 'none',
        cursor: ctaEnabled ? 'pointer' : 'default'
      },
      children: label
    }), !ctaEnabled && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_utils_loading_loading_hub__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: "loading-hub--game loading-hub--left",
      keyword: "game",
      minHeight: 72,
      lines: loadingLines,
      ariaLabel: "Loading game"
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockGOnboarding);

/***/ }),

/***/ "./src/styles/block-type-g.css":
/*!*************************************!*\
  !*** ./src/styles/block-type-g.css ***!
  \*************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/tooltip.css":
/*!********************************!*\
  !*** ./src/styles/tooltip.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "./src/utils/content-utility/color-map.ts":
/*!************************************************!*\
  !*** ./src/utils/content-utility/color-map.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   projectColors: () => (/* binding */ projectColors)
/* harmony export */ });
// Master color config

const projectColors = {
  'Rotary Lamp': {
    rgb: '204, 85, 41',
    tooltipAlpha: 0.6,
    defaultAlpha: 0.6,
    darkThemeTop: 'rgba(72, 161, 161, 1)'
  },
  'Ice Cream Scoop': {
    rgb: '234, 103, 97',
    tooltipAlpha: 0.6,
    defaultAlpha: 0.6,
    darkThemeTop: 'rgba(23, 27, 24, 1)'
  },
  'Data Visualization': {
    rgb: '153, 199, 7',
    tooltipAlpha: 0.8,
    defaultAlpha: 0.6,
    darkThemeTop: 'rgba(28, 30, 31, 1)'
  },
  'Evade the Rock': {
    rgb: '101, 86, 175',
    tooltipAlpha: 0.6,
    defaultAlpha: 0.6,
    darkThemeTop: 'rgb(25, 25, 25)'
  },
  'Dynamic App': {
    rgb: '120, 211, 255',
    tooltipAlpha: 0.6,
    defaultAlpha: 0.6,
    darkThemeTop: 'rgba(17, 17, 17, 1)'
  }
};

/***/ }),

/***/ "./src/utils/context-providers/project-context.tsx":
/*!*********************************************************!*\
  !*** ./src/utils/context-providers/project-context.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectVisibilityProvider: () => (/* binding */ ProjectVisibilityProvider),
/* harmony export */   useProjectVisibility: () => (/* binding */ useProjectVisibility)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/utils/context-providers/project-context.tsx


const ProjectVisibilityContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);
const ProjectVisibilityProvider = ({
  children
}) => {
  const [activeProject, setActiveProject] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined);
  const [blockGClick, setBlockGClick] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [isDragging, setIsDragging] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [focusedProjectKey, setFocusedProjectKey] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [previousScrollY, setPreviousScrollY] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const scrollContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // The ScrollController will register its implementation here.
  const alignFnRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(() => {/* no-op by default */});
  const requestViewportAlign = react__WEBPACK_IMPORTED_MODULE_0___default().useCallback(args => {
    alignFnRef.current?.(args);
  }, []);
  const registerViewportAlign = react__WEBPACK_IMPORTED_MODULE_0___default().useCallback(fn => {
    alignFnRef.current = fn || (() => {});
  }, []);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ProjectVisibilityContext.Provider, {
    value: {
      activeProject,
      setActiveProject,
      blockGClick,
      setBlockGClick,
      currentIndex,
      setCurrentIndex,
      scrollContainerRef,
      isDragging,
      setIsDragging,
      focusedProjectKey,
      setFocusedProjectKey,
      previousScrollY,
      setPreviousScrollY,
      requestViewportAlign,
      registerViewportAlign
    },
    children: children
  });
};
const useProjectVisibility = () => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ProjectVisibilityContext);
  if (!context) {
    throw new Error('useProjectVisibility must be used within ProjectVisibilityProvider');
  }
  return context;
};

/***/ }),

/***/ "./src/utils/tooltip/tooltip.ts":
/*!**************************************!*\
  !*** ./src/utils/tooltip/tooltip.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchTooltipDataForKey: () => (/* binding */ fetchTooltipDataForKey),
/* harmony export */   initGlobalTooltip: () => (/* binding */ initGlobalTooltip)
/* harmony export */ });
/* harmony import */ var _styles_tooltip_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/tooltip.css */ "./src/styles/tooltip.css");
/* harmony import */ var _styles_tooltip_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_tooltip_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _content_utility_color_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../content-utility/color-map */ "./src/utils/content-utility/color-map.ts");
// utils/tooltip/global-tooltip.ts


const tooltipDataCache = {};
const LOCAL_FALLBACK_TAGS = {
  'block-g': ['#q5.js Canvas', '#Gamification', '#Lottie Animation']
};
const TITLE_BY_KEY = {
  'rotary-lamp': 'Rotary Lamp',
  'ice-scoop': 'Ice Cream Scoop',
  'data-viz': 'Data Visualization',
  'block-g': 'Evade the Rock',
  'dynamic': 'Dynamic App'
};
function bgForKey(key) {
  const colorInfo = _content_utility_color_map__WEBPACK_IMPORTED_MODULE_1__.projectColors[TITLE_BY_KEY[key]];
  const alpha = colorInfo?.tooltipAlpha ?? 0.6;
  return colorInfo ? `rgba(${colorInfo.rgb}, ${alpha})` : 'rgba(85,95,90,0.6)';
}
function createTooltipDOM() {
  const el = document.createElement('div');
  el.id = 'custom-global-tooltip';
  el.style.position = 'fixed';
  el.style.pointerEvents = 'none';
  el.style.zIndex = '9999';
  el.style.opacity = '0';
  el.style.visibility = 'hidden';
  el.style.backdropFilter = 'blur(8px)';
  el.style.color = '#fff';
  el.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
  el.className = 'custom-tooltip-blur';
  const root = document.getElementById('efe-portfolio') || document.body;
  root.appendChild(el);
  return el;
}
let tooltipEl = null;
let currentKey = '';
let hideTimeout = null;
const fetchTooltipDataForKey = async key => {
  if (tooltipDataCache[key]) return tooltipDataCache[key];
  const bg = bgForKey(key);

  // local fallback
  if (LOCAL_FALLBACK_TAGS[key]) {
    const info = {
      tags: LOCAL_FALLBACK_TAGS[key],
      backgroundColor: bg
    };
    tooltipDataCache[key] = info;
    return info;
  }

  // CMS fetch by slug
  try {
    const client = (await Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../sanity */ "./src/utils/sanity.ts"))).default;
    const res = await client.fetch(`*[_type=="mediaBlock" && slug.current == $key][0]{ tags }`, {
      key
    });
    const info = {
      tags: res?.tags ?? [],
      backgroundColor: bg
    };
    tooltipDataCache[key] = info;
    return info;
  } catch {
    const info = {
      tags: [],
      backgroundColor: bg
    };
    tooltipDataCache[key] = info;
    return info;
  }
};
const showTooltip = () => {
  if (!tooltipEl) return;
  if (hideTimeout) clearTimeout(hideTimeout);
  tooltipEl.style.opacity = '1';
  tooltipEl.style.visibility = 'visible';
  hideTimeout = setTimeout(() => hideTooltip(), 1_500);
};
const hideTooltip = () => {
  if (!tooltipEl) return;
  if (hideTimeout) clearTimeout(hideTimeout);
  tooltipEl.style.opacity = '0';
  tooltipEl.style.visibility = 'hidden';
  currentKey = '';
};
function positionTooltip(x, y) {
  if (!tooltipEl) return;
  const rect = tooltipEl.getBoundingClientRect();
  const padding = 0;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const nearTop = y < rect.height + padding + 20;
  const nearBottom = y + rect.height + padding > vh - 20;
  const nearRight = x + rect.width + padding > vw - 20;
  const nearLeft = x < rect.width + padding + 20;
  let left, top;
  if (nearBottom) {
    top = y - rect.height - padding - 8;
    left = x - rect.width * 0;
  } else if (nearTop) {
    top = y + padding - 14;
    left = x - rect.width * 0;
  } else if (nearRight) {
    top = y - rect.height / 2;
    left = x - rect.width - padding - 24;
  } else if (nearLeft) {
    top = y - rect.height / 2;
    left = x + padding - 4;
  } else {
    top = y - rect.height / 1.6;
    left = x + padding - 2;
  }
  left = Math.max(padding, Math.min(left, vw - rect.width - padding));
  top = Math.max(padding, Math.min(top, vh - rect.height - padding));
  tooltipEl.style.left = `${left}px`;
  tooltipEl.style.top = `${top}px`;
}
function initGlobalTooltip(isRealMobile) {
  if (tooltipEl) return () => {};
  tooltipEl = createTooltipDOM();
  let lastMouseX = -1;
  let lastMouseY = -1;
  let ticking = false;
  let scrollCheckTimeout = null;
  const updateForElement = async el => {
    if (!(el instanceof HTMLElement)) {
      hideTooltip();
      return;
    }
    const tooltipClass = [...el.classList].find(c => c.startsWith('tooltip-'));
    if (!tooltipClass) {
      hideTooltip();
      return;
    }
    const key = tooltipClass.replace('tooltip-', '');
    if (key !== currentKey) {
      currentKey = key;
      const info = await fetchTooltipDataForKey(key);
      if (!info.tags.length) {
        hideTooltip();
        return;
      }
      tooltipEl.innerHTML = info.tags.map(t => `<p class="tooltip-tag">${t}</p>`).join('');
      tooltipEl.style.backgroundColor = info.backgroundColor;
      showTooltip();
    } else if (tooltipEl.style.opacity === '0' || tooltipEl.style.visibility === 'hidden') {
      showTooltip();
    }
  };
  const onMouseMove = e => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    requestAnimationFrame(() => positionTooltip(lastMouseX, lastMouseY));
    updateForElement(e.target);
  };
  const checkHoveredElementOnScroll = () => {
    const el = document.elementFromPoint(lastMouseX, lastMouseY);
    updateForElement(el);
    requestAnimationFrame(() => positionTooltip(lastMouseX, lastMouseY));
  };
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkHoveredElementOnScroll();
        ticking = false;
      });
      ticking = true;
    }
    if (scrollCheckTimeout) clearTimeout(scrollCheckTimeout);
    scrollCheckTimeout = setTimeout(() => {}, 120);
  };
  const onMouseOut = e => {
    if (!e.relatedTarget) hideTooltip();
  };

  // only attach scroll observer for non-mobile real viewports
  if (!isRealMobile) window.addEventListener('scroll', onScroll, true);
  document.addEventListener('mousemove', onMouseMove, {
    passive: true
  });
  document.addEventListener('mouseout', onMouseOut, {
    passive: true
  });
  return () => {
    if (!tooltipEl) return;
    if (!isRealMobile) window.removeEventListener('scroll', onScroll, true);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseout', onMouseOut);
    tooltipEl.remove();
    tooltipEl = null;
    if (hideTimeout) clearTimeout(hideTimeout);
  };
}

/***/ }),

/***/ "./src/utils/tooltip/tooltipInit.ts":
/*!******************************************!*\
  !*** ./src/utils/tooltip/tooltipInit.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTooltipInit: () => (/* binding */ useTooltipInit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tooltip */ "./src/utils/tooltip/tooltip.ts");
/* harmony import */ var _content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../content-utility/real-mobile */ "./src/utils/content-utility/real-mobile.ts");
// utils/tooltip/tooltipInit.ts



const useTooltipInit = () => {
  const isRealMobile = (0,_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_2__.useRealMobileViewport)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const dispose = (0,_tooltip__WEBPACK_IMPORTED_MODULE_1__.initGlobalTooltip)(isRealMobile);
    return () => dispose?.();
  }, [isRealMobile]);
};

/***/ })

};
;
//# sourceMappingURL=components.server.js.map