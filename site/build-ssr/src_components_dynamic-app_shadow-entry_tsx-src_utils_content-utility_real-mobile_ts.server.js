"use strict";
exports.id = "src_components_dynamic-app_shadow-entry_tsx-src_utils_content-utility_real-mobile_ts";
exports.ids = ["src_components_dynamic-app_shadow-entry_tsx-src_utils_content-utility_real-mobile_ts"];
exports.modules = {

/***/ "./src/components/dynamic-app/shadow-entry.tsx":
/*!*****************************************************!*\
  !*** ./src/components/dynamic-app/shadow-entry.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dynamic_app_dynamic_app_shadow_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dynamic-app/dynamic-app-shadow.jsx */ "./src/dynamic-app/dynamic-app-shadow.jsx");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/components/dynamic-app/shadow-entry.tsx




const ShadowEntry = ({
  blockId
}) => {
  const [target, setTarget] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (typeof document === 'undefined') return;
    const container = document.getElementById(blockId);
    if (!container) return;
    const tryFind = () => {
      const overlay = container.querySelector('.screen-overlay') || null;
      if (overlay) {
        setTarget(overlay);
        return true;
      }
      return false;
    };

    // First try immediately
    if (tryFind()) return;

    // Watch for it
    const observer = new MutationObserver(() => {
      if (tryFind()) {
        observer.disconnect();
      }
    });
    observer.observe(container, {
      childList: true,
      subtree: true
    });
    return () => observer.disconnect();
  }, [blockId]);
  if (!target) return null;
  return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1___default().createPortal((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_dynamic_app_dynamic_app_shadow_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onFocusChange: () => {}
  }), target);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShadowEntry);

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
//# sourceMappingURL=src_components_dynamic-app_shadow-entry_tsx-src_utils_content-utility_real-mobile_ts.server.js.map