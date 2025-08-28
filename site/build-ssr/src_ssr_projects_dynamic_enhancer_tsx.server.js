exports.id = "src_ssr_projects_dynamic_enhancer_tsx";
exports.ids = ["src_ssr_projects_dynamic_enhancer_tsx"];
exports.modules = {

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

/***/ "./src/ssr/projects/dynamic.enhancer.tsx":
/*!***********************************************!*\
  !*** ./src/ssr/projects/dynamic.enhancer.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _utils_loading_loading_hub__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/loading/loading-hub */ "./src/utils/loading/loading-hub.tsx");
/* harmony import */ var _dynamic_app_preload_dynamic_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dynamic-app/preload-dynamic-app */ "./src/dynamic-app/preload-dynamic-app.ts");
/* harmony import */ var _utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/media-providers/image-builder */ "./src/utils/media-providers/image-builder.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/ssr/projects/dynamic.enhancer.tsx






// add: shared cache/dedupe + URL builder for LQ warm



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

// ---- module-level dedupe so warm only runs once per page load
let warmedOnce = false;
function warmDynamicLowQuality(maxUrls = 32) {
  if (warmedOnce) return;
  warmedOnce = true;
  (async () => {
    try {
      const {
        images
      } = await (0,_dynamic_app_preload_dynamic_app__WEBPACK_IMPORTED_MODULE_5__.ensureDynamicPreload)(); // deduped at source
      if (!Array.isArray(images) || images.length === 0) return;

      // Collect LQ URLs for both image1 and image2, then cap
      const urls = [];
      for (const it of images) {
        const s1 = it?.image1 ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_6__.urlFor)(it.image1).width(320).quality(35).auto('format').url() : null;
        const s2 = it?.image2 ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_6__.urlFor)(it.image2).width(320).quality(35).auto('format').url() : null;
        if (s1) urls.push(s1);
        if (s2) urls.push(s2);
        if (urls.length >= maxUrls) break;
      }
      const head = document.head;
      const seen = new Set();
      for (const src of urls) {
        if (!src || seen.has(src)) continue;
        seen.add(src);

        // <link rel="preload" as="image"> (avoid duplicates)
        if (!document.querySelector(`link[rel="preload"][as="image"][href="${src}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          link.crossOrigin = 'anonymous';
          // TS-safe way to hint priority
          link.setAttribute('fetchpriority', 'low');
          head.appendChild(link);
        }

        // Kick actual network regardless of preload support
        const img = new Image();
        img.decoding = 'async';
        img.crossOrigin = 'anonymous';
        img.src = src;
      }
    } catch {
      /* ignore warm errors */
    }
  })();
}
const DynamicEnhancer = () => {
  // ----- find SSR nodes
  const frameRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [overlayEl, setOverlayEl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    const img = document.getElementById('dynamic-device-frame');
    frameRef.current = img;
    const overlay = img?.closest('.device-wrapper')?.querySelector('.screen-overlay');
    setOverlayEl(overlay ?? null);
  }, []);

  // ----- overlay sizing
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

  // ----- prewarm low-quality images (SSR path needs this; client-only path will no-op thanks to warmedOnce)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Gate by visibility with idle fallback, same as mounting
    const container = document.getElementById('block-dynamic');
    let cancelIdle = null;
    let io = null;
    const run = () => warmDynamicLowQuality(32);
    if (!container || typeof IntersectionObserver === 'undefined') {
      // No IO → just warm on idle
      cancelIdle = scheduleIdle(run, 500);
    } else {
      io = new IntersectionObserver(entries => {
        if (entries[0]?.isIntersecting) {
          run();
          io?.disconnect();
        }
      }, {
        root: null,
        rootMargin: '600px 0px',
        threshold: 0
      });
      io.observe(container);
      // backstop so we still warm if user never scrolls
      cancelIdle = scheduleIdle(run, 1200);
    }
    return () => {
      io?.disconnect();
      cancelIdle?.();
    };
  }, []);

  // ----- gate mounting of shadow app
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

  // ----- lazy import
  const [ShadowInbound, setShadowInbound] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!shouldMountShadow) return;
    let alive = true;
    Promise.all(/*! import() */[__webpack_require__.e("src_utils_loading_loading_tsx"), __webpack_require__.e("src_utils_media-providers_media-loader_tsx"), __webpack_require__.e("src_dynamic-app_components_fireworksDisplay_jsx"), __webpack_require__.e("dynamic-app-components-pauseButton"), __webpack_require__.e("src_dynamic-app_dynamic-app-shadow_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../dynamic-app/dynamic-app-shadow.jsx */ "./src/dynamic-app/dynamic-app-shadow.jsx")).then(m => {
      if (alive) setShadowInbound(() => m.default);
    }).catch(err => console.warn('[DynamicEnhancer] shadow import failed:', err));
    return () => {
      alive = false;
    };
  }, [shouldMountShadow]);

  // ----- loader visibility
  const [showLoader, setShowLoader] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false); // start hidden until we begin mount
  const watchdogRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // when we start mounting, show loader (and arm watchdog)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!shouldMountShadow) return;
    setShowLoader(true);
    if (watchdogRef.current) window.clearTimeout(watchdogRef.current);
    watchdogRef.current = window.setTimeout(() => {
      // fail-safe: hide after 8s even if onReady never fires
      setShowLoader(false);
      hideSsrSpinner();
    }, 8000);
    return () => {
      if (watchdogRef.current) {
        window.clearTimeout(watchdogRef.current);
        watchdogRef.current = null;
      }
    };
  }, [shouldMountShadow]);

  // listen to global hydrated event (secondary path)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onHydrated = () => {
      setShowLoader(false);
      hideSsrSpinner();
    };
    window.addEventListener('dynamic-app:hydrated', onHydrated);
    return () => window.removeEventListener('dynamic-app:hydrated', onHydrated);
  }, []);
  const hideSsrSpinner = () => {
    const loader = document.getElementById('dynamic-overlay-loader');
    if (loader) loader.style.display = 'none';
  };
  if (!overlayEl) return null;
  const handleReady = () => {
    setShowLoader(false);
    hideSsrSpinner();
    window.dispatchEvent(new CustomEvent('dynamic-app:hydrated'));
  };
  return /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [showLoader && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "loading-hub-overlay",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_utils_loading_loading_hub__WEBPACK_IMPORTED_MODULE_4__["default"], {
        className: "loading-hub--dynamic loading-hub--center",
        keyword: "dynamic",
        lines: ['Measuring app frame…', 'Creating shadow root…', 'Injecting app styles…', 'Loading SVG icons…', 'Mounting app shell…', 'Wiring observers and input…'],
        minHeight: 72
      })
    }), ShadowInbound && shouldMountShadow && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(ShadowInbound, {
      onFocusChange: () => {},
      onReady: handleReady
    })]
  }), overlayEl);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicEnhancer);

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
  animMs = 900,
  delayMs = 400
}) {
  const [lineIndex, setLineIndex] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [show, setShow] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // --- delay before showing loader ---
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const t = setTimeout(() => setShow(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  // rotate through provided lines
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
  if (!show) {
    // render an invisible placeholder with locked height
    return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      style: style,
      "aria-hidden": "true"
    });
  }
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: `loading-hub loading-hub--text ${className || ''}`,
    style: style,
    role: "status",
    "aria-live": "polite",
    "aria-label": ariaLabel,
    "data-keyword": keyword || undefined,
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
//# sourceMappingURL=src_ssr_projects_dynamic_enhancer_tsx.server.js.map