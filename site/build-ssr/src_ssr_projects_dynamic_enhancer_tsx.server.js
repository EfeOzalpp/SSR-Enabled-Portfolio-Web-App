"use strict";
exports.id = "src_ssr_projects_dynamic_enhancer_tsx";
exports.ids = ["src_ssr_projects_dynamic_enhancer_tsx"];
exports.modules = {

/***/ "./src/ssr/projects/dynamic.enhancer.tsx":
/*!***********************************************!*\
  !*** ./src/ssr/projects/dynamic.enhancer.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_content_utility_dynamic_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/content-utility/dynamic-overlay */ "./src/utils/content-utility/dynamic-overlay.ts");
/* harmony import */ var _utils_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/content-utility/real-mobile */ "./src/utils/content-utility/real-mobile.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/ssr/projects/dynamic.enhancer.tsx





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
const DynamicEnhancer = () => {
  // locate SSR nodes
  const frameRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [overlayEl, setOverlayEl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    const img = document.getElementById('dynamic-device-frame');
    frameRef.current = img;
    const overlay = img?.closest('.device-wrapper')?.querySelector('.screen-overlay');
    setOverlayEl(overlay ?? null);
  }, []);

  // compute overlay sizing
  const overlaySize = (0,_utils_content_utility_dynamic_overlay__WEBPACK_IMPORTED_MODULE_2__.useDynamicOverlay)(frameRef);
  const isRealMobile = (0,_utils_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_3__.useRealMobileViewport)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!overlayEl) return;
    const isPhone = window.matchMedia('(max-width: 767.98px)').matches;
    if (isPhone) {
      overlayEl.style.width = `${overlaySize.width}px`;
      overlayEl.style.height = isRealMobile ? `${overlaySize.heightSet1}svh` : `${overlaySize.heightSet2}px`;
    } else {
      overlayEl.style.removeProperty('width');
      overlayEl.style.removeProperty('height');
    }
  }, [overlayEl, overlaySize.width, overlaySize.heightSet1, overlaySize.heightSet2, isRealMobile]);

  // gate mounting of shadow app
  const [shouldMountShadow, setShouldMountShadow] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const container = document.getElementById('block-dynamic');
    if (!container) {
      setShouldMountShadow(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.3) {
        setShouldMountShadow(true);
        io.disconnect();
      }
    }, {
      threshold: [0, 0.3]
    });
    io.observe(container);
    const cancel = scheduleIdle(() => setShouldMountShadow(true), 2000);
    return () => {
      io.disconnect();
      cancel();
    };
  }, []);

  // lazy import + portal
  const [ShadowInbound, setShadowInbound] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!shouldMountShadow) return;
    let alive = true;
    Promise.all(/*! import() */[__webpack_require__.e("src_utils_content-utility_loading_tsx"), __webpack_require__.e("src_dynamic-app_components_IntroOverlay_jsx-src_dynamic-app_components_fireworksDisplay_jsx-s-21d201"), __webpack_require__.e("src_dynamic-app_dynamic-app-shadow_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../dynamic-app/dynamic-app-shadow.jsx */ "./src/dynamic-app/dynamic-app-shadow.jsx")).then(m => {
      if (alive) setShadowInbound(() => m.default);
    }).catch(err => console.warn('[DynamicEnhancer] shadow import failed:', err));
    return () => {
      alive = false;
    };
  }, [shouldMountShadow]);

  // hide SSR loader when ready
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const loader = document.getElementById('dynamic-overlay-loader');
    const onHydrated = () => {
      if (loader) loader.style.display = 'none';
    };
    window.addEventListener('dynamic-app:hydrated', onHydrated);
    if (ShadowInbound && overlayEl) requestAnimationFrame(() => {
      if (loader) loader.style.display = 'none';
    });
    return () => window.removeEventListener('dynamic-app:hydrated', onHydrated);
  }, [ShadowInbound, overlayEl]);
  if (!overlayEl || !ShadowInbound || !shouldMountShadow) return null;
  const handleReady = () => window.dispatchEvent(new CustomEvent('dynamic-app:hydrated'));
  return /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ShadowInbound, {
    onFocusChange: () => {},
    onReady: handleReady
  }), overlayEl);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicEnhancer);

/***/ }),

/***/ "./src/utils/content-utility/dynamic-overlay.ts":
/*!******************************************************!*\
  !*** ./src/utils/content-utility/dynamic-overlay.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
      const minHeightSet1 = 63;
      const maxHeightSet1 = 93;

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

/***/ }),

/***/ "./src/utils/content-utility/real-mobile.ts":
/*!**************************************************!*\
  !*** ./src/utils/content-utility/real-mobile.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRealMobileViewport: () => (/* binding */ useRealMobileViewport)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// useRealMobileViewport.ts

function useRealMobileViewport() {
  const [isRealMobile, setIsRealMobile] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const checkMobile = () => {
      const touch = navigator.maxTouchPoints > 0;
      const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
      const width = window.innerWidth;
      const ua = navigator.userAgent || navigator.vendor || window.opera;

      // iOS detection (iPhone / iPad)
      const isIOS = /iPad|iPhone|iPod/.test(ua) || navigator.platform === 'MacIntel' && touch; // iPadOS pretends to be Mac

      // Android detection
      const isAndroid = /Android/.test(ua);

      // Consider it real mobile if:
      // - Touch exists, and viewport is small, or
      // - Known mobile UA
      const realMobile = touch && width <= 1024 || isIOS || isAndroid || coarse;
      setIsRealMobile(realMobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);
  return isRealMobile;
}

/***/ })

};
;
//# sourceMappingURL=src_ssr_projects_dynamic_enhancer_tsx.server.js.map