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
/* harmony import */ var _utils_loading_loading_hub__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/loading/loading-hub */ "./src/utils/loading/loading-hub.tsx");
/* harmony import */ var _styles_block_type_a_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/block-type-a.css */ "./src/styles/block-type-a.css");
/* harmony import */ var _styles_block_type_a_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_block_type_a_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _dynamic_app_preload_dynamic_app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../dynamic-app/preload-dynamic-app */ "./src/dynamic-app/preload-dynamic-app.ts");
/* harmony import */ var _utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/media-providers/image-builder */ "./src/utils/media-providers/image-builder.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
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

  // When the frame is in place, warm LOW-QUALITY card images into cache
  const warmedOnce = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!imgLoaded || warmedOnce.current) return;
    warmedOnce.current = true;
    (async () => {
      try {
        const {
          images
        } = await (0,_dynamic_app_preload_dynamic_app__WEBPACK_IMPORTED_MODULE_7__.ensureDynamicPreload)(); // deduped with any other callers
        if (!Array.isArray(images) || images.length === 0) return;

        // tune these to taste
        const WARM_COUNT = 16; // how many items to warm
        const LQ_WIDTH = 320; // low-quality width
        const LQ_QUALITY = 25; // low-quality JPEG/WebP quality

        const head = document.head;
        let warmed = 0;
        outer: for (const it of images) {
          // warm both image1 and image2 if present, but respect WARM_COUNT cap
          const candidates = [it?.image1, it?.image2].filter(Boolean);
          for (const srcAsset of candidates) {
            const src = (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_8__.urlFor)(srcAsset).width(LQ_WIDTH).quality(LQ_QUALITY).auto('format').url();
            if (!src) continue;

            // Avoid duplicate <link> entries
            if (!document.querySelector(`link[rel="preload"][as="image"][href="${src}"]`)) {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = src;
              link.crossOrigin = 'anonymous';
              // TS-safe way to set fetch priority hint
              link.setAttribute('fetchpriority', 'low');
              head.appendChild(link);
            }

            // Kick off an actual request regardless of preload support
            const preImg = new Image();
            preImg.decoding = 'async';
            preImg.crossOrigin = 'anonymous';
            preImg.src = src;
            warmed += 1;
            if (warmed >= WARM_COUNT) break outer;
          }
        }
      } catch {
        // ignore; cards will still lazy-load normally
      }
    })();
  }, [imgLoaded]);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("section", {
    className: "block-type-a",
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "device-wrapper",
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("img", {
        ref: frameRef,
        id: "dynamic-device-frame",
        src: svgUrl || undefined,
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
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "screen-overlay",
        style: device === 'phone' ? {
          width: `${overlaySize.width}px`,
          height: isRealMobile ? `${overlaySize.heightSet1}svh` : `${overlaySize.heightSet2}px`
        } : undefined,
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          id: "dynamic-overlay-loader",
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_utils_loading_loading_hub__WEBPACK_IMPORTED_MODULE_5__["default"], {
            className: "loading-hub--dynamic loading-hub--center",
            keyword: "dynamic",
            lines: ['Measuring app frame…', 'Creating shadow root…', 'Injecting app styles…', 'Loading SVG icons…', 'Mounting app shell…', 'Wiring observers and input…'],
            minHeight: 72
          })
        })
      }), fetchErr && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "soft-warning",
        children: "media frame unavailable"
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Frame);

/***/ }),

/***/ "./src/dynamic-app/preload-dynamic-app.ts":
/*!************************************************!*\
  !*** ./src/dynamic-app/preload-dynamic-app.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/styles/block-type-a.css":
/*!*************************************!*\
  !*** ./src/styles/block-type-a.css ***!
  \*************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/loading-hub.css":
/*!************************************!*\
  !*** ./src/styles/loading-hub.css ***!
  \************************************/
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

/***/ }),

/***/ "./src/utils/loading/loading-hub.tsx":
/*!*******************************************!*\
  !*** ./src/utils/loading/loading-hub.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoadingHub)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_loading_hub_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/loading-hub.css */ "./src/styles/loading-hub.css");
/* harmony import */ var _styles_loading_hub_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_loading_hub_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");



function LoadingHub({
  keyword,
  lines = ['Loading…'],
  minHeight = 160,
  className = '',
  ariaLabel = 'Loading',
  progress = null,
  cycleMs = 1400,
  animMs = 900
}) {
  const [lineIndex, setLineIndex] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);

  // rotate through provided lines (no-op if only one)
  const hasMultiple = lines.length > 1;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!hasMultiple) return;
    const t = setInterval(() => {
      setLineIndex(i => (i + 1) % lines.length);
    }, cycleMs);
    return () => clearInterval(t);
  }, [hasMultiple, lines.length, cycleMs]);

  // Avoid reflow: lock container height
  const style = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const h = typeof minHeight === 'number' ? `${minHeight}px` : minHeight ?? 'auto';
    return {
      minHeight: h
    };
  }, [minHeight]);

  // SR-only progressive percent
  const srRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (progress == null || !srRef.current) return;
    srRef.current.textContent = `${Math.round(progress)}%`;
  }, [progress]);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: `loading-hub loading-hub--text ${className || ''}`,
    style: style,
    role: "status",
    "aria-live": "polite",
    "aria-label": ariaLabel,
    "data-keyword": keyword || undefined
    // expose anim timing to CSS
    ,
    "data-anim-ms": animMs,
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "loading-hub__copy",
      "aria-hidden": false,
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h2", {
        className: "loading-hub__line",
        children: lines[lineIndex]
      }, lineIndex), progress != null && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "loading-hub__progress",
        "aria-hidden": "true",
        children: [Math.round(progress), "%"]
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "sr-only",
        ref: srRef
      })]
    })
  });
}

/***/ })

};
;
//# sourceMappingURL=dynamic-frame.server.js.map