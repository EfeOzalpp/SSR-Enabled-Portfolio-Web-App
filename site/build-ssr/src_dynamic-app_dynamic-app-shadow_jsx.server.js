"use strict";
exports.id = "src_dynamic-app_dynamic-app-shadow_jsx";
exports.ids = ["src_dynamic-app_dynamic-app-shadow_jsx"];
exports.modules = {

/***/ "./src/dynamic-app/dynamic-app-outgoing.jsx":
/*!**************************************************!*\
  !*** ./src/dynamic-app/dynamic-app-outgoing.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/navigation */ "./src/dynamic-app/components/navigation.jsx");
/* harmony import */ var _components_title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/title */ "./src/dynamic-app/components/title.jsx");
/* harmony import */ var _components_sortBy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/sortBy */ "./src/dynamic-app/components/sortBy.jsx");
/* harmony import */ var _utils_loading_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/loading/loading */ "./src/utils/loading/loading.tsx");
/* harmony import */ var _components_fireworksDisplay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/fireworksDisplay */ "./src/dynamic-app/components/fireworksDisplay.jsx");
/* harmony import */ var _components_pauseButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/pauseButton */ "./src/dynamic-app/components/pauseButton.jsx");
/* harmony import */ var _components_footer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/footer */ "./src/dynamic-app/components/footer.jsx");
/* harmony import */ var _lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/fetchSVGIcons */ "./src/dynamic-app/lib/fetchSVGIcons.js");
/* harmony import */ var _lib_observedCard_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/observedCard.jsx */ "./src/dynamic-app/lib/observedCard.jsx");
/* harmony import */ var _lib_setupAltObserver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/setupAltObserver */ "./src/dynamic-app/lib/setupAltObserver.js");
/* harmony import */ var _components_IntroOverlay__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/IntroOverlay */ "./src/dynamic-app/components/IntroOverlay.jsx");
/* harmony import */ var _lib_colorString_ts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/colorString.ts */ "./src/dynamic-app/lib/colorString.ts");
/* harmony import */ var _utils_context_providers_shadow_root_context_tsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/context-providers/shadow-root-context.tsx */ "./src/utils/context-providers/shadow-root-context.tsx");
/* harmony import */ var _styles_dynamic_app_index_css_raw__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../styles/dynamic-app/index.css?raw */ "./src/styles/dynamic-app/index.css?raw");
/* harmony import */ var _styles_dynamic_app_index_css_raw__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_index_css_raw__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../styles/dynamic-app/misc.css?raw */ "./src/styles/dynamic-app/misc.css?raw");
/* harmony import */ var _styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _styles_loading_overlay_css_raw__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../styles/loading-overlay.css?raw */ "./src/styles/loading-overlay.css?raw");
/* harmony import */ var _styles_loading_overlay_css_raw__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_styles_loading_overlay_css_raw__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// DynamicTheme émbéd.jsx (with guarded alt observer)


















function DynamicTheme() {
  const [sortedImages, setSortedImages] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [svgIcons, setSvgIcons] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [activeColor, setActiveColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('#FFFFFF');
  const [movingTextColors, setMovingTextColors] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(['#FFFFFF', '#FFFFFF', '#FFFFFF']);
  const [lastKnownColor, setLastKnownColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('#FFFFFF');
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [pauseAnimation, setPauseAnimation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showNavigation, setShowNavigation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  /** @type {React.MutableRefObject<((enabled:boolean)=>void)|null>} */
  const toggleFireworksRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  /** @type {React.MutableRefObject<HTMLElement|null>} */
  const scrollContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  /** @type {React.MutableRefObject<HTMLElement|null>} */
  const shadowRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Derived fireworks mount flag (visibility && !paused)
  const [showFireworks, setShowFireworks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);

  // Track host visibility for guarding alt updates
  const [isHostVisible, setIsHostVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const hostVisibleRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const {
    getShadowRoot,
    injectStyle
  } = (0,_utils_context_providers_shadow_root_context_tsx__WEBPACK_IMPORTED_MODULE_13__.useShadowRoot)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    [(_styles_dynamic_app_index_css_raw__WEBPACK_IMPORTED_MODULE_14___default()), (_styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_15___default()), (_styles_loading_overlay_css_raw__WEBPACK_IMPORTED_MODULE_16___default())].forEach(injectStyle);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setShowNavigation(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setTimeout(() => {
      (0,_lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_8__["default"])().then(icons => {
        const iconMapping = icons.reduce((acc, icon) => {
          acc[icon.title] = icon.icon;
          return acc;
        }, /** @type {Record<string,string>} */{});
        setSvgIcons(iconMapping);
        setTimeout(() => setIsLoading(false), 200);
      });
    }, 400);
  }, []);

  /** @type {React.MutableRefObject<Document|ShadowRoot|null>} */
  const observerRoot = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const root = typeof getShadowRoot === 'function' ? getShadowRoot() : document;
    observerRoot.current = root;
  }, [getShadowRoot]);

  // ------ ALT color logic (unchanged helpers) ------
  const handleActivate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(alt1 => {
    const colors = _lib_colorString_ts__WEBPACK_IMPORTED_MODULE_12__.colorMapping[alt1];
    if (colors && colors[0] !== activeColor) {
      setActiveColor(colors[2]);
      setMovingTextColors([colors[0], colors[1], colors[3]]);
      setLastKnownColor(colors[2]);
    }
  }, [activeColor]);
  const handleDeactivate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (activeColor !== lastKnownColor) {
      setActiveColor(lastKnownColor);
    }
  }, [activeColor, lastKnownColor]);

  // ------ Guarded alt observer: only while host is visible; dedup events; cleanup properly ------
  const currentAltRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isLoading || sortedImages.length === 0) return;
    const root = observerRoot.current;
    if (!root) return;
    const guardedActivate = alt1 => {
      if (!hostVisibleRef.current) return; // ignore when section not visible
      if (currentAltRef.current === alt1) return; // ignore duplicate activate
      currentAltRef.current = alt1;
      handleActivate(alt1);
    };
    const guardedDeactivate = alt1 => {
      if (!hostVisibleRef.current) return; // ignore when section not visible
      if (currentAltRef.current !== alt1) return; // only deactivate if it was the active one
      handleDeactivate(alt1);
    };
    const cleanup = (0,_lib_setupAltObserver__WEBPACK_IMPORTED_MODULE_10__["default"])(guardedActivate, guardedDeactivate, root);
    return typeof cleanup === 'function' ? cleanup : undefined;
    // NOTE: don't include pauseAnimation here; pausing shouldn't rebuild the observer
  }, [isLoading, sortedImages, handleActivate, handleDeactivate]);

  // ------ Pause button bridge ------
  const handleSetToggleFireworks = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(toggleFunction => {
    toggleFireworksRef.current = toggleFunction;
  }, []);
  const handlePauseToggle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(isEnabled => {
    // sync internal engine immediately, if mounted
    if (toggleFireworksRef.current) toggleFireworksRef.current(isEnabled);
    setPauseAnimation(!isEnabled);
  }, []);

  // ------ Resize (as you had) ------
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!shadowRef.current) return;
    const observer = new ResizeObserver(() => {
      console.log('[🔁 Resize observed]', shadowRef.current?.getBoundingClientRect());
    });
    observer.observe(shadowRef.current);
    return () => observer.disconnect();
  }, []);

  // ------ Host visibility controls fireworks AND gates alt updates ------
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const container = document.querySelector('#block-dynamic');
    if (!container) {
      console.warn('[FireworkObserver] #block-dynamic not found in DOM');
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      const visible = !!entry.isIntersecting;
      hostVisibleRef.current = visible;
      setIsHostVisible(visible);
      const desired = visible && !pauseAnimation; // respect Pause
      setShowFireworks(prev => prev !== desired ? desired : prev);
      if (toggleFireworksRef.current) toggleFireworksRef.current(desired);
    }, {
      threshold: 0.3,
      root: null
    });
    io.observe(container);

    // Run once immediately
    const rect = container.getBoundingClientRect();
    const visibleNow = rect.top < window.innerHeight && rect.bottom > 0;
    hostVisibleRef.current = visibleNow;
    setIsHostVisible(visibleNow);
    const initialDesired = visibleNow && !pauseAnimation;
    setShowFireworks(prev => prev !== initialDesired ? initialDesired : prev);
    if (toggleFireworksRef.current) toggleFireworksRef.current(initialDesired);
    return () => io.disconnect();
  }, [pauseAnimation]);

  // Keep internal engine synced when pause toggles
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (toggleFireworksRef.current) toggleFireworksRef.current(!pauseAnimation && isHostVisible);
  }, [pauseAnimation, isHostVisible]);
  const cardRefs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  cardRefs.current = sortedImages.map((_, i) => cardRefs.current[i] ?? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createRef());
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.Fragment, {
    children: isLoading ? (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_utils_loading_loading__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isFullScreen: false
    }) : (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
      className: "homePage-container",
      ref: scrollContainerRef,
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_IntroOverlay__WEBPACK_IMPORTED_MODULE_11__["default"], {}), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        className: "navigation-wrapper",
        children: showNavigation && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_navigation__WEBPACK_IMPORTED_MODULE_1__["default"], {
          customArrowIcon2: svgIcons['arrow1'],
          customArrowIcon: svgIcons['arrow2'],
          items: sortedImages,
          activeColor: activeColor,
          isInShadow: typeof getShadowRoot === 'function' && getShadowRoot() !== document,
          scrollLockContainer: scrollContainerRef.current
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        className: "firework-wrapper",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
          className: "firework-divider",
          children: showFireworks && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_fireworksDisplay__WEBPACK_IMPORTED_MODULE_5__["default"], {
            colorMapping: _lib_colorString_ts__WEBPACK_IMPORTED_MODULE_12__.colorMapping,
            items: sortedImages,
            activeColor: activeColor,
            lastKnownColor: lastKnownColor,
            onToggleFireworks: handleSetToggleFireworks
          })
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        className: "section-divider"
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        className: "title-divider",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_title__WEBPACK_IMPORTED_MODULE_2__["default"], {
          svgIcon: svgIcons['logo-small-1'],
          movingTextColors: movingTextColors,
          pauseAnimation: pauseAnimation
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        id: "homePage",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
          className: "no-overflow",
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            className: "pause-button-wrapper",
            children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_pauseButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
              toggleP5Animation: handlePauseToggle
            })
          }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
            className: "sort-by-divider",
            children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("h3", {
              className: "students-heading",
              children: "Students"
            }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_sortBy__WEBPACK_IMPORTED_MODULE_3__["default"], {
              setSortOption: () => {},
              onFetchItems: setSortedImages,
              customArrowIcon: svgIcons['arrow2'],
              colorMapping: _lib_colorString_ts__WEBPACK_IMPORTED_MODULE_12__.colorMapping,
              getRoot: getShadowRoot
            })]
          }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            className: "section-divider2"
          }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            className: "UI-card-divider",
            children: sortedImages.map((data, index) => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_lib_observedCard_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
              data: data,
              index: index,
              getShadowRoot: getShadowRoot,
              pauseAnimation: pauseAnimation,
              customArrowIcon2: svgIcons['arrow1']
            }, index))
          }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_components_footer__WEBPACK_IMPORTED_MODULE_7__["default"], {
            customArrowIcon2: svgIcons['arrow1'],
            linkArrowIcon: svgIcons['link-icon']
          })]
        })
      })]
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicTheme);

/***/ }),

/***/ "./src/dynamic-app/dynamic-app-shadow.jsx":
/*!************************************************!*\
  !*** ./src/dynamic-app/dynamic-app-shadow.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_shadow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-shadow */ "react-shadow");
/* harmony import */ var react_shadow__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_shadow__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dynamic_app_outgoing_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dynamic-app-outgoing.jsx */ "./src/dynamic-app/dynamic-app-outgoing.jsx");
/* harmony import */ var _utils_context_providers_shadow_root_context_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/context-providers/shadow-root-context.tsx */ "./src/utils/context-providers/shadow-root-context.tsx");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// dynamic app shadow DOM wrappér





const DynamicAppInbound = ({
  onFocusChange
}) => {
  const shadowRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [shadowRoot, setShadowRoot] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const ShadowRoot = (react_shadow__WEBPACK_IMPORTED_MODULE_1___default().div);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setTimeout(() => {
      const root = shadowRef.current?.getRootNode?.();
      if (root && root.host) {
        setShadowRoot(root);
      } else {
        console.warn('[Not a ShadowRoot]', root);
      }
    }, 0);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const el = shadowRef.current;
    if (!el) return;
    let startY = 0;
    let focusTriggered = false;
    const triggerSyntheticClick = () => {
      const down = new PointerEvent('pointerdown', {
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerType: 'touch'
      });
      el.dispatchEvent(down);
      onFocusChange?.(true);
      console.log('[Focus triggered in embedded app]');
    };
    const handleTouchStart = e => {
      if (e.touches.length === 0) return;
      startY = e.touches[0].clientY;
      focusTriggered = false;
    };
    const handleTouchMove = e => {
      if (focusTriggered || e.touches.length === 0) return;
      const deltaY = e.touches[0].clientY - startY;
      if (Math.abs(deltaY) > 1) {
        el.scrollTop += 1;
        triggerSyntheticClick();
        focusTriggered = true;
      }
    };
    if ('ontouchstart' in window) {
      el.addEventListener('touchstart', handleTouchStart, {
        passive: true
      });
      el.addEventListener('touchmove', handleTouchMove, {
        passive: true
      });
    }
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onFocusChange]);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    className: "embedded-app",
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ShadowRoot, {
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        ref: shadowRef,
        className: "dynamic-app",
        id: "shadow-dynamic-app",
        children: shadowRoot ? (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_utils_context_providers_shadow_root_context_tsx__WEBPACK_IMPORTED_MODULE_3__.ShadowRootProvider, {
          getShadowRoot: () => shadowRoot,
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_dynamic_app_outgoing_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {})
        }) : null
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicAppInbound);

/***/ }),

/***/ "./src/dynamic-app/lib/observedCard.jsx":
/*!**********************************************!*\
  !*** ./src/dynamic-app/lib/observedCard.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_homepage_UIcards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/homepage-UIcards */ "./src/dynamic-app/components/homepage-UIcards.jsx");
/* harmony import */ var _shadowObserver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shadowObserver */ "./src/dynamic-app/lib/shadowObserver.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/dynamic-app/lib/observedCard.jsx




function ObservedCard({
  data,
  index,
  getShadowRoot,
  pauseAnimation,
  customArrowIcon2
}) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // The hook will accept whatever you pass — no TS constraint here
  (0,_shadowObserver__WEBPACK_IMPORTED_MODULE_2__["default"])(ref, getShadowRoot, pauseAnimation);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    ref: ref,
    className: `custom-card-${index}`,
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_homepage_UIcards__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: data.title,
      backgroundColor: data.backgroundColor,
      image1: data.image1,
      image2: data.image2,
      alt1: data.alt1,
      alt2: data.alt2,
      url1: data.url1,
      className: `custom-card-${index}`,
      customArrowIcon2: customArrowIcon2
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ObservedCard);

/***/ }),

/***/ "./src/dynamic-app/lib/shadowObserver.ts":
/*!***********************************************!*\
  !*** ./src/dynamic-app/lib/shadowObserver.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useIntersectionTransform)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// useIntersectionTransform.ts

function useIntersectionTransform(ref, getShadowRoot, pauseAnimation, getScrollRoot) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!ref.current || pauseAnimation) return;

    // Figure out where we live (shadow/dom) and what to use as IO root.
    const shadow = getShadowRoot?.() ?? null;
    const isInShadow = !!shadow;
    const containerEl = typeof getScrollRoot === 'function' && getScrollRoot() || (
    // prefer your inner scroller if we can find it:
    isInShadow ? shadow.querySelector('.embedded-app') : null) || null; // fallback = viewport

    // (optional) gate transforms to when pointer is inside shadow host
    let mouseInside = false;
    const hostEl = isInShadow ? shadow.host : null;
    const onEnter = () => mouseInside = true;
    const onLeave = () => mouseInside = false;
    if (hostEl) {
      hostEl.addEventListener('pointerenter', onEnter);
      hostEl.addEventListener('pointerleave', onLeave);
    }
    const cardEl = ref.current;
    const imageContainer = cardEl.querySelector('.image-container');
    const imageContainer2 = cardEl.querySelector('.image-container2');
    if (!imageContainer || !imageContainer2) return;
    const applyTransform = percentage => {
      const width = containerEl instanceof Element ? containerEl.clientWidth : window.innerWidth;
      let imageContainerTransform = 'translate(0em, 0em)';
      let imageContainer2Transform = 'translate(1em, -28em)';
      let imageContainerZIndex = '5';
      let imageContainer2ZIndex = '1';
      if (width <= 767) {
        if (percentage > 0.35 && percentage <= 1) {
          imageContainerTransform = 'translate(0.5em, 1em)';
          imageContainer2Transform = 'translate(0.5em, -32.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.15 && percentage <= 0.35) {
          imageContainerTransform = 'translate(1.5em, 0.5em)';
          imageContainer2Transform = 'translate(-0.25em, -34.5em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else if (percentage >= 0 && percentage <= 0.15) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(0em, -33.5em)';
        }
      } else if (width <= 1024) {
        if (percentage >= 0.3) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(0em, -23.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage < 0.3) {
          imageContainerTransform = 'translate(-0.5em, 0em)';
          imageContainer2Transform = 'translate(1em, -23.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage < 0.1) {
          imageContainerTransform = 'translate(-0.5em, 0em)';
          imageContainer2Transform = 'translate(1em, -23.5em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
      } else if (width > 1025) {
        if (percentage > 0.6 && percentage <= 1) {
          imageContainerTransform = 'translate(1em, 1em)';
          imageContainer2Transform = 'translate(0em, -29.2em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.3 && percentage <= 0.6) {
          imageContainerTransform = 'translate(1.2em, -0.8em)';
          imageContainer2Transform = 'translate(0em, -28em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else if (percentage >= 0 && percentage <= 0.3) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -27.4em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
      } else {
        if (percentage > 0.3 && percentage <= 1) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -43em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage >= 0 && percentage <= 0.3) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -43em)';
        }
      }
      imageContainer.style.transform = imageContainerTransform;
      imageContainer.style.zIndex = imageContainerZIndex;
      imageContainer2.style.transform = imageContainer2Transform;
      imageContainer2.style.zIndex = imageContainer2ZIndex;
    };

    // IO now uses the scroll container as root (if available)
    const observer = new IntersectionObserver(([entry]) => {
      if (isInShadow && !mouseInside) return;
      const rect = entry.boundingClientRect;

      // use the container’s rect/height instead of window
      const rootRect = containerEl ? containerEl.getBoundingClientRect() : document.documentElement.getBoundingClientRect();
      const rootHeight = containerEl instanceof Element ? containerEl.clientHeight : window.innerHeight;
      const rootCenter = rootRect.top + rootHeight;

      // replicate your old math but relative to the container center
      const percentage = Math.max(0, Math.min(rect.height, rootCenter - rect.top)) / rect.height;
      applyTransform(percentage);
    }, {
      root: containerEl || null,
      // ← critical change
      threshold: Array.from({
        length: 101
      }, (_, i) => i / 100)
    });

    // initial position apply (also relative to container)
    const rect = cardEl.getBoundingClientRect();
    const rootRect = containerEl ? containerEl.getBoundingClientRect() : document.documentElement.getBoundingClientRect();
    const rootHeight = containerEl instanceof Element ? containerEl.clientHeight : window.innerHeight;
    const rootCenter = rootRect.top + rootHeight / 1.5;
    const initialPct = Math.max(0, Math.min(rect.height, rootCenter - rect.top)) / rect.height;
    applyTransform(initialPct);
    observer.observe(cardEl);
    return () => {
      observer.disconnect();
      if (hostEl) {
        hostEl.removeEventListener('pointerenter', onEnter);
        hostEl.removeEventListener('pointerleave', onLeave);
      }
    };
  }, [ref, pauseAnimation, getShadowRoot, getScrollRoot]);
}

/***/ })

};
;
//# sourceMappingURL=src_dynamic-app_dynamic-app-shadow_jsx.server.js.map