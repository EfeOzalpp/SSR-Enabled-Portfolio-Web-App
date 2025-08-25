"use strict";
exports.id = "dynamic-shadow";
exports.ids = ["dynamic-shadow"];
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
    if (tryFind()) return;
    const observer = new MutationObserver(() => {
      if (tryFind()) observer.disconnect();
    });
    observer.observe(container, {
      childList: true,
      subtree: true
    });
    return () => observer.disconnect();
  }, [blockId]);

  // Announce mount/unmount of the embedded scroll container to the outer controller
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!target) return;
    const detail = {
      el: target,
      blockId
    };
    window.dispatchEvent(new CustomEvent('embedded-app:mounted', {
      detail
    }));
    return () => {
      window.dispatchEvent(new CustomEvent('embedded-app:unmounted', {
        detail
      }));
    };
  }, [target, blockId]);

  // Called by DynamicAppInbound (guarded there) on first paint
  const handleReady = () => {
    // hide any SSR/client spinner if present
    const loader = document.getElementById('dynamic-overlay-loader');
    if (loader) loader.style.display = 'none';
    // notify listeners (e.g. enhancer / other logic)
    window.dispatchEvent(new CustomEvent('dynamic-app:hydrated'));
  };
  if (!target) return null;
  return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1___default().createPortal((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_dynamic_app_dynamic_app_shadow_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onFocusChange: () => {},
    onReady: handleReady
  }), target);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShadowEntry);

/***/ }),

/***/ "./src/dynamic-app/preload-dynamic-app.ts":
/*!************************************************!*\
  !*** ./src/dynamic-app/preload-dynamic-app.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ensureDynamicPreload: () => (/* binding */ ensureDynamicPreload),
/* harmony export */   ensureIconsPreload: () => (/* binding */ ensureIconsPreload),
/* harmony export */   ensureImagesPreload: () => (/* binding */ ensureImagesPreload),
/* harmony export */   getPreloadedDynamicApp: () => (/* binding */ getPreloadedDynamicApp),
/* harmony export */   primeFromSSR: () => (/* binding */ primeFromSSR),
/* harmony export */   whenDynamicPreloadReady: () => (/* binding */ whenDynamicPreloadReady)
/* harmony export */ });
/* harmony import */ var _lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/fetchSVGIcons */ "./src/dynamic-app/lib/fetchSVGIcons.js");
/* harmony import */ var _lib_fetchUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/fetchUser */ "./src/dynamic-app/lib/fetchUser.js");
// src/dynamic-app/preload-dynamic-app.ts


let cache = {};
let inFlight = null;
function getPreloadedDynamicApp() {
  return cache;
}
function primeFromSSR(data) {
  if (!data) return;
  cache = {
    ...cache,
    ...data
  };
}
function toIconMap(list) {
  return list.reduce((acc, it) => {
    if (!it?.title) return acc;
    const val = it.icon ?? it.url; // inline SVG takes precedence; else URL
    if (typeof val === 'string' && val.length > 0) acc[it.title] = val;
    return acc;
  }, {});
}

/** Wait for current preloading (if any), then return cache */
async function whenDynamicPreloadReady() {
  if (cache.icons && cache.images) return cache;
  if (inFlight) {
    await inFlight;
    return cache;
  }
  return cache;
}
async function ensureIconsPreload() {
  // If a full preloading is in-flight, wait for it instead of double-fetching
  if (!cache.icons && inFlight) {
    await inFlight;
    return cache.icons || {};
  }
  if (cache.icons) return cache.icons;
  let iconsRaw;
  try {
    iconsRaw = await (0,_lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_0__["default"])();
  } catch {
    iconsRaw = [];
  }
  const list = Array.isArray(iconsRaw) ? iconsRaw : [];
  const icons = toIconMap(list);
  cache.icons = icons;
  return icons;
}
async function ensureImagesPreload() {
  // If a full preloading is in-flight, wait for it instead of double-fetching
  if (!cache.images && inFlight) {
    await inFlight;
    return cache.images || [];
  }
  if (cache.images) return cache.images;
  let imagesRaw;
  try {
    imagesRaw = await (0,_lib_fetchUser__WEBPACK_IMPORTED_MODULE_1__.fetchImages)();
  } catch {
    imagesRaw = [];
  }
  const images = Array.isArray(imagesRaw) ? imagesRaw : [];
  cache.images = images;
  return images;
}

/** Convenience: ensure both icons + images (with in-flight dedupe) */
async function ensureDynamicPreload() {
  if (cache.icons && cache.images) return cache;
  if (inFlight) return inFlight;
  inFlight = Promise.all([ensureIconsPreload(), ensureImagesPreload()]).then(([icons, images]) => {
    cache = {
      icons,
      images
    };
    return cache;
  }).finally(() => {
    inFlight = null;
  });
  return inFlight;
}

// Optional: hydrate from SSR

if (typeof window !== 'undefined' && window.__DYNAMIC_PRELOAD__) {
  primeFromSSR(window.__DYNAMIC_PRELOAD__);
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
//# sourceMappingURL=dynamic-shadow.server.js.map