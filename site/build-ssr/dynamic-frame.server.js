exports.id = "dynamic-frame";
exports.ids = ["dynamic-frame"];
exports.modules = {

/***/ "./src/components/dynamic-app/frame.tsx":
/*!**********************************************!*\
  !*** ./src/components/dynamic-app/frame.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_sanity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/sanity */ "./src/utils/sanity.ts");
/* harmony import */ var _utils_content_utility_dynamic_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/content-utility/dynamic-overlay */ "./src/utils/content-utility/dynamic-overlay.ts");
/* harmony import */ var _utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/context-providers/ssr-data-context */ "./src/utils/context-providers/ssr-data-context.tsx");
/* harmony import */ var _utils_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/content-utility/real-mobile */ "./src/utils/content-utility/real-mobile.ts");
/* harmony import */ var _styles_block_type_a_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/block-type-a.css */ "./src/styles/block-type-a.css");
/* harmony import */ var _styles_block_type_a_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_block_type_a_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/components/dynamic-app/frame.tsx







const getDeviceType = w => w < 768 ? 'phone' : w < 1025 ? 'tablet' : 'laptop';
const Frame = () => {
  const ssrData = (0,_utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_3__.useSsrData)();
  const preloadedMap = ssrData?.preloaded?.dynamic || {};
  const [svgMap, setSvgMap] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(preloadedMap);
  const [device, setDevice] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getDeviceType(typeof window !== 'undefined' ? window.innerWidth : 1200));
  const [imgLoaded, setImgLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [fetchErr, setFetchErr] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const frameRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const overlaySize = (0,_utils_content_utility_dynamic_overlay__WEBPACK_IMPORTED_MODULE_2__.useDynamicOverlay)(frameRef);
  const isRealMobile = (0,_utils_content_utility_real_mobile__WEBPACK_IMPORTED_MODULE_4__.useRealMobileViewport)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onResize = () => setDevice(getDeviceType(window.innerWidth));
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (Object.keys(svgMap).length > 0) return;
    _utils_sanity__WEBPACK_IMPORTED_MODULE_1__["default"].fetch(`*[_type == "svgAsset" && title in ["Laptop", "Tablet", "Phone"]]{
        title, file { asset->{url} }
      }`).then(results => {
      const map = {};
      results.forEach(r => {
        map[r.title.toLowerCase()] = r.file?.asset?.url;
      });
      setSvgMap(map);
    }).catch(err => {
      setFetchErr('assets-unavailable');
      console.warn('[Frame] fetch SVG failed:', err);
    });
  }, [svgMap]);
  const svgUrl = svgMap[device];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const img = frameRef.current;
    setImgLoaded(Boolean(img && img.complete && svgUrl));
  }, [svgUrl]);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("section", {
    className: "block-type-a",
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "device-wrapper",
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
        ref: frameRef,
        id: "dynamic-device-frame",
        src: svgUrl || '',
        alt: device,
        className: `device-frame ${device}`,
        decoding: "async",
        loading: "eager",
        onLoad: () => setImgLoaded(true),
        onError: () => setImgLoaded(true),
        draggable: false,
        style: {
          visibility: svgUrl ? 'visible' : 'hidden',
          opacity: imgLoaded && svgUrl ? 1 : 0,
          transition: 'opacity 150ms ease'
        },
        "data-src-laptop": svgMap['laptop'] || '',
        "data-src-tablet": svgMap['tablet'] || '',
        "data-src-phone": svgMap['phone'] || '',
        "data-device": device
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "screen-overlay",
        style: device === 'phone' ? {
          width: `${overlaySize.width}px`,
          height: isRealMobile ? `${overlaySize.heightSet1}svh` : `${overlaySize.heightSet2}px`
        } : undefined
      }), fetchErr && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "soft-warning",
        children: "media frame unavailable"
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Frame);

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

"use strict";
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
//# sourceMappingURL=dynamic-frame.server.js.map