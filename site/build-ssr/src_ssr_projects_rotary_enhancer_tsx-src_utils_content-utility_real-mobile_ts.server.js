"use strict";
exports.id = "src_ssr_projects_rotary_enhancer_tsx-src_utils_content-utility_real-mobile_ts";
exports.ids = ["src_ssr_projects_rotary_enhancer_tsx-src_utils_content-utility_real-mobile_ts"];
exports.modules = {

/***/ "./src/ssr/projects/rotary.enhancer.tsx":
/*!**********************************************!*\
  !*** ./src/ssr/projects/rotary.enhancer.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RotaryEnhancer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_split_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/split-controller */ "./src/utils/split-controller.tsx");
/* harmony import */ var _utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/tooltip/tooltipInit */ "./src/utils/tooltip/tooltipInit.ts");
/* harmony import */ var _logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../logic/apply-split-style */ "./src/ssr/logic/apply-split-style.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// RotaryEnhancer.tsx






function RotaryEnhancer() {
  const [host, setHost] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [split, setSplit] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => window.innerWidth < 768 ? 55 : 50);
  const [isPortrait, setIsPortrait] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(window.innerHeight > window.innerWidth);
  (0,_utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_3__.useTooltipInit)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Remove SSR preset so JS can control layout without specificity fights
    document.getElementById('rotary-ssr')?.classList.remove('ssr-initial-split');

    // Upgrade images from SSR medium-quality to high-quality (if provided)
    // Upgrade images/videos from SSR medium-quality to high-quality (if provided)
    const img1El = document.querySelector('#rotary-ssr #rotary-media-1');
    const img2El = document.querySelector('#rotary-ssr #rotary-media-2');
    const full1 = img1El?.dataset?.srcFull;
    const full2 = img2El?.dataset?.srcFull;
    if (img1El && full1 && img1El.src !== full1) img1El.src = full1;
    if (img2El && full2 && img2El.src !== full2) img2El.src = full2;

    // Set mount host
    setHost(document.getElementById('rotary-enhancer-mount'));

    // Initial apply to exactly mirror non-SSR logic on hydration
    (0,_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.applySplitStyle)(split, isPortrait, {
      m1: 'rotary-media-1-container',
      m2: 'rotary-media-2-container'
    });

    // Orientation listener
    const onResize = () => {
      const p = window.innerHeight > window.innerWidth;
      setIsPortrait(p);
      // Re-apply immediately on orientation change
      (0,_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.applySplitStyle)(split, p, {
        m1: 'rotary-media-1-container',
        m2: 'rotary-media-2-container'
      });
    };
    window.addEventListener('resize', onResize, {
      passive: true
    });
    return () => window.removeEventListener('resize', onResize);
  }, []); // run once

  // Keep DOM in sync when split OR orientation changes
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    (0,_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.applySplitStyle)(split, isPortrait, {
      m1: 'rotary-media-1-container',
      m2: 'rotary-media-2-container'
    });
  }, [split, isPortrait]);
  if (!host) return null;
  return /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_utils_split_controller__WEBPACK_IMPORTED_MODULE_2__["default"], {
    split: split,
    setSplit: setSplit,
    ids: {
      m1: 'rotary-media-1-container',
      m2: 'rotary-media-2-container'
    }
  }), host);
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
//# sourceMappingURL=src_ssr_projects_rotary_enhancer_tsx-src_utils_content-utility_real-mobile_ts.server.js.map