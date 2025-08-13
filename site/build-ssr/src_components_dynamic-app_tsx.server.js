exports.id = "src_components_dynamic-app_tsx";
exports.ids = ["src_components_dynamic-app_tsx"];
exports.modules = {

/***/ "./src/components/dynamic-app.tsx":
/*!****************************************!*\
  !*** ./src/components/dynamic-app.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_sanity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sanity */ "./src/utils/sanity.ts");
/* harmony import */ var _dynamic_app_dynamic_app_shadow_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamic-app/dynamic-app-shadow.jsx */ "./src/dynamic-app/dynamic-app-shadow.jsx");
/* harmony import */ var _utils_content_utility_dynamic_overlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/content-utility/dynamic-overlay */ "./src/utils/content-utility/dynamic-overlay.ts");
/* harmony import */ var _utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/context-providers/ssr-data-context */ "./src/utils/context-providers/ssr-data-context.tsx");
/* harmony import */ var _utils_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/content-utility/real-mobile */ "./src/utils/content-utility/real-mobile.ts");
/* harmony import */ var _styles_block_type_a_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/block-type-a.css */ "./src/styles/block-type-a.css");
/* harmony import */ var _styles_block_type_a_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_block_type_a_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");








const getDeviceType = w => w < 768 ? 'phone' : w < 1025 ? 'tablet' : 'laptop';

// 1x1 transparent PNG (keeps <img> real but invisible, no broken icon)
const BLANK_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMB9qzG3iAAAAAASUVORK5CYII=';
const DEBOUNCE_MS = 150;
const DynamicApp = () => {
  const ssrData = (0,_utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_4__.useSsrData)();
  const preloadedMap = ssrData?.preloaded?.dynamic || {}; // Preloaded SVG URLs map

  const [svgMap, setSvgMap] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(preloadedMap);
  const [device, setDevice] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getDeviceType(window.innerWidth));
  const [imgLoaded, setImgLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const frameRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const resizeTimer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const overlaySize = (0,_utils_content_utility_dynamic_overlay__WEBPACK_IMPORTED_MODULE_3__.useDynamicOverlay)(frameRef);
  const isRealMobile = (0,_utils_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_5__.useRealMobileViewport)();

  // Fetch SVG URLs only if no SSR data
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (Object.keys(svgMap).length > 0) return; // already have SSR map
    _utils_sanity__WEBPACK_IMPORTED_MODULE_1__["default"].fetch(`*[_type == "svgAsset" && title in ["Laptop", "Tablet", "Phone"]]{
          title,
          file { asset->{url} }
        }`).then(results => {
      const map = {};
      results.forEach(item => {
        map[item.title.toLowerCase()] = item.file?.asset?.url;
      });
      setSvgMap(map);
    }).catch(err => {
      console.warn('[DynamicApp] Failed to fetch SVG assets:', err);
    });
  }, [svgMap]);

  // Debounced device type change
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleResize = () => {
      if (resizeTimer.current) window.clearTimeout(resizeTimer.current);
      resizeTimer.current = window.setTimeout(() => {
        const next = getDeviceType(window.innerWidth);
        setDevice(prev => {
          if (prev !== next) {
            setImgLoaded(false);
            return next;
          }
          return prev;
        });
      }, DEBOUNCE_MS);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      if (resizeTimer.current) window.clearTimeout(resizeTimer.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const svgUrl = svgMap[device];

  // Handle cached image load state
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (svgUrl) {
      const img = frameRef.current;
      if (img && img.complete) {
        setImgLoaded(true);
      } else {
        setImgLoaded(false);
      }
    } else {
      setImgLoaded(false);
    }
  }, [svgUrl]);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("section", {
    className: "block-type-a",
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: "device-wrapper",
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("img", {
        ref: frameRef,
        src: svgUrl || BLANK_IMG,
        alt: device,
        className: `device-frame ${device}`,
        onLoad: () => setImgLoaded(true),
        onError: () => setImgLoaded(true),
        draggable: false,
        style: {
          visibility: svgUrl ? 'visible' : 'hidden',
          opacity: imgLoaded && svgUrl ? 1 : 0,
          transition: 'opacity 150ms ease'
        }
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "screen-overlay",
        style: device === 'phone' ? {
          width: `${overlaySize.width}px`,
          height: isRealMobile ? `${overlaySize.heightSet1}svh` : `${overlaySize.heightSet2}px`
        } : {},
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_dynamic_app_dynamic_app_shadow_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
          onFocusChange: () => {}
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicApp);

/***/ }),

/***/ "./src/dynamic-app/dynamic-app-outgoing.jsx":
/*!**************************************************!*\
  !*** ./src/dynamic-app/dynamic-app-outgoing.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/navigation */ "./src/dynamic-app/components/navigation.jsx");
/* harmony import */ var _components_title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/title */ "./src/dynamic-app/components/title.jsx");
/* harmony import */ var _components_sortBy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/sortBy */ "./src/dynamic-app/components/sortBy.jsx");
/* harmony import */ var _utils_content_utility_loading_tsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/content-utility/loading.tsx */ "./src/utils/content-utility/loading.tsx");
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
// DynamicTheme émbéd.jsx


















function DynamicTheme() {
  const [sortedImages, setSortedImages] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [svgIcons, setSvgIcons] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [activeColor, setActiveColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('#FFFFFF');
  const [movingTextColors, setMovingTextColors] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(['#FFFFFF', '#FFFFFF', '#FFFFFF']);
  const [lastKnownColor, setLastKnownColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('#FFFFFF');
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [pauseAnimation, setPauseAnimation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showNavigation, setShowNavigation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const toggleFireworksRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const scrollContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const shadowRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [showFireworks, setShowFireworks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true); // rémové firéwork to savé héadroom whén not in viéw 

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
      setShowNavigation(true); // runs when DOM is ready
    }, 200);
    return () => clearTimeout(timeout);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setTimeout(() => {
      (0,_lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_8__["default"])().then(icons => {
        const iconMapping = icons.reduce((acc, icon) => {
          acc[icon.title] = icon.icon;
          return acc;
        }, {});
        setSvgIcons(iconMapping);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      });
    }, 400);
  }, []);
  const observerRoot = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const root = typeof getShadowRoot === 'function' ? getShadowRoot() : document;
    observerRoot.current = root;
  }, [getShadowRoot]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isLoading && sortedImages.length > 0) {
      const root = observerRoot.current;
      (0,_lib_setupAltObserver__WEBPACK_IMPORTED_MODULE_10__["default"])(handleActivate, handleDeactivate, root);
    }
  }, [sortedImages, pauseAnimation, isLoading]);
  const handleSetToggleFireworks = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(toggleFunction => {
    toggleFireworksRef.current = toggleFunction;
  }, []);
  const handlePauseToggle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(isEnabled => {
    if (toggleFireworksRef.current) {
      toggleFireworksRef.current(isEnabled);
    }
    setPauseAnimation(!isEnabled);
  }, []);
  const handleActivate = alt1 => {
    const colors = _lib_colorString_ts__WEBPACK_IMPORTED_MODULE_12__.colorMapping[alt1];
    if (colors && colors[0] !== activeColor) {
      setActiveColor(colors[2]);
      setMovingTextColors([colors[0], colors[1], colors[3]]);
      setLastKnownColor(colors[2]);
    }
  };
  const handleDeactivate = alt1 => {
    if (activeColor !== lastKnownColor) {
      setActiveColor(lastKnownColor);
    }
  };

  // résizé
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!shadowRef.current) return;
    const observer = new ResizeObserver(() => {
      console.log('[🔁 Resize observed]', shadowRef.current?.getBoundingClientRect());
      // Optionally trigger reflows / state updates
    });
    observer.observe(shadowRef.current);
    return () => observer.disconnect();
  }, []);

  // rémové firéwork whén not in viéw
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const root = typeof getShadowRoot === 'function' ? getShadowRoot() : document;
    const shadowApp = root?.querySelector?.('#shadow-dynamic-app');
    const container = shadowApp?.querySelector?.('.firework-wrapper');
    if (!container) {
      console.warn('[FireworkObserver] Container not found inside #shadow-dynamic-app');
      return;
    }
    const validRoot = root instanceof Element || root instanceof Document ? root : null;
    const observer = new IntersectionObserver(([entry]) => {
      const isVisible = entry.isIntersecting;
      setShowFireworks(prev => prev !== isVisible ? isVisible : prev);
    }, {
      threshold: 0.1,
      root: validRoot
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [getShadowRoot]);
  const cardRefs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  cardRefs.current = sortedImages.map((_, i) => cardRefs.current[i] ?? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createRef());
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.Fragment, {
    children: isLoading ? (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_utils_content_utility_loading_tsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
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

"use strict";
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

"use strict";
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

"use strict";
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
        if (percentage > 0.4 && percentage <= 1) {
          imageContainerTransform = 'translate(-1em, 0em)';
          imageContainer2Transform = 'translate(0em, -23.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.15 && percentage <= 0.4) {
          imageContainerTransform = 'translate(0.5em, 0em)';
          imageContainer2Transform = 'translate(-1em, -24em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else if (percentage >= 0 && percentage <= 0.15) {
          imageContainerTransform = 'translate(-1em, 0em)';
          imageContainer2Transform = 'translate(0em, -23.5em)';
        }
      } else if (width > 1025) {
        if (percentage > 0.6 && percentage <= 1) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -29.4em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.3 && percentage <= 0.6) {
          imageContainerTransform = 'translate(1.2em, -0.8em)';
          imageContainer2Transform = 'translate(0em, -28em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else if (percentage >= 0 && percentage <= 0.3) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -28em)';
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
    const rootCenter = rootRect.top + rootHeight / 2;
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

/***/ }),

/***/ "./src/styles/block-type-a.css":
/*!*************************************!*\
  !*** ./src/styles/block-type-a.css ***!
  \*************************************/
/***/ (() => {



/***/ }),

/***/ "./src/utils/content-utility/dynamic-overlay.ts":
/*!******************************************************!*\
  !*** ./src/utils/content-utility/dynamic-overlay.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDynamicOverlay: () => (/* binding */ useDynamicOverlay)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useDynamicOverlay(frameRef) {
  const [style, setStyle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    width: 0,
    heightSet1: 0,
    heightSet2: 0
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const update = () => {
      if (!frameRef.current) return;
      const rect = frameRef.current.getBoundingClientRect();
      const aspect = rect.width / rect.height;

      // Aspect ratio breakpoints
      const minAspect = 1.5 / 6.5; // ~0.2307
      const maxAspect = 3.3 / 6.5; // ~0.5077

      // Width range (shared)
      const minWidth = 150;
      const maxWidth = 320;

      // Height range set 1 (your current svh-based values)
      const minHeightSet1 = 60;
      const maxHeightSet1 = 88;

      // Height range set 2 (original px-based)
      const minHeightSet2 = 280;
      const maxHeightSet2 = 610;

      // --- Aspect ratio-based lerp ---
      let width;
      let height1;
      let height2;
      if (aspect <= minAspect) {
        width = minWidth;
        height1 = minHeightSet1;
        height2 = minHeightSet2;
      } else if (aspect >= maxAspect) {
        width = maxWidth;
        height1 = maxHeightSet1;
        height2 = maxHeightSet2;
      } else {
        const t = (aspect - minAspect) / (maxAspect - minAspect);
        width = minWidth + (maxWidth - minWidth) * t;
        height1 = minHeightSet1 + (maxHeightSet1 - minHeightSet1) * t;
        height2 = minHeightSet2 + (maxHeightSet2 - minHeightSet2) * t;
      }

      // --- Absolute height multiplier (0 → 2 over 0–1300px) ---
      const minFrameHeight = 0;
      const maxFrameHeight = 1300;
      const minMultiplier = 0;
      const maxMultiplier = 2;
      const clampedHeight = Math.min(Math.max(rect.height, minFrameHeight), maxFrameHeight);
      const heightT = (clampedHeight - minFrameHeight) / (maxFrameHeight - minFrameHeight);
      const heightMultiplier = minMultiplier + (maxMultiplier - minMultiplier) * heightT;

      // Apply multiplier
      width *= heightMultiplier;
      height1 *= heightMultiplier;
      height2 *= heightMultiplier;
      setStyle({
        width,
        heightSet1: height1,
        heightSet2: height2
      });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [frameRef]);
  return style; // { width, heightSet1, heightSet2 }
}

/***/ })

};
;
//# sourceMappingURL=src_components_dynamic-app_tsx.server.js.map