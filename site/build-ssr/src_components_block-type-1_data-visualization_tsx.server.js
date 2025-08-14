exports.id = "src_components_block-type-1_data-visualization_tsx";
exports.ids = ["src_components_block-type-1_data-visualization_tsx"];
exports.modules = {

/***/ "./src/components/block-type-1/data-visualization.tsx":
/*!************************************************************!*\
  !*** ./src/components/block-type-1/data-visualization.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_sanity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/sanity */ "./src/utils/sanity.ts");
/* harmony import */ var _utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/media-providers/media-loader */ "./src/utils/media-providers/media-loader.tsx");
/* harmony import */ var _utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/tooltip/tooltipInit */ "./src/utils/tooltip/tooltipInit.ts");
/* harmony import */ var _utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/context-providers/ssr-data-context */ "./src/utils/context-providers/ssr-data-context.tsx");
/* harmony import */ var _styles_block_type_1_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/block-type-1.css */ "./src/styles/block-type-1.css");
/* harmony import */ var _styles_block_type_1_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_block_type_1_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/components/DataVisualizationBlock.tsx







const DataVisualizationBlock = () => {
  const ssrData = (0,_utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_4__.useSsrData)(); // <-- read from SSR context
  const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(ssrData?.preloaded?.dataviz || null);
  (0,_utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_3__.useTooltipInit)();

  // Fetch data from Sanity
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (data) return; // already have SSR data
    _utils_sanity__WEBPACK_IMPORTED_MODULE_1__["default"].fetch(`*[_type == "mediaBlock" && slug.current == $slug][0]{
        mediaOne{
          alt,
          image,
          video{
            "webmUrl": webm.asset->url,
            "mp4Url": mp4.asset->url,
            poster
          }
        }
      }`, {
      slug: 'data-viz'
    }).then(setData).catch(err => {
      console.warn('[DataVisualizationBlock] GROQ fetch failed:', err);
      setData(null);
    });
  }, []);
  if (!data || !data.mediaOne) return null;
  const {
    alt = 'Data Visualization',
    image,
    video
  } = data.mediaOne;
  const isVideo = Boolean(video?.webmUrl || video?.mp4Url);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("section", {
    className: "block-type-1",
    style: {
      position: 'relative'
    },
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "media-content",
      style: {
        width: '100%',
        height: '100vh',
        position: 'relative'
      },
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_2__["default"], {
        type: isVideo ? 'video' : 'image',
        src: isVideo ? video : image,
        alt: alt,
        id: "block-d",
        className: "tooltip-data-viz",
        objectPosition: "center center",
        style: {
          width: '100%',
          height: '100%'
        }
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataVisualizationBlock);

/***/ }),

/***/ "./src/styles/block-type-1.css":
/*!*************************************!*\
  !*** ./src/styles/block-type-1.css ***!
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
// utils/useRealMobileViewport.ts

function useRealMobileViewport() {
  const [isRealMobile, setIsRealMobile] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    const touch = navigator.maxTouchPoints > 0;

    // detect address-bar/viewport shrink behavior
    const vv = window.visualViewport;
    let shrinks = false;
    const check = () => {
      if (!vv) return;
      // if visual viewport is meaningfully smaller than layout viewport, assume mobile browser chrome
      const gap = window.innerHeight - vv.height;
      if (gap > 48) shrinks = true; // ~top/bottom bars size
      setIsRealMobile(coarse && touch && (shrinks || gap > 48));
    };
    check();
    vv?.addEventListener?.('resize', check);
    window.addEventListener('orientationchange', check);
    return () => {
      vv?.removeEventListener?.('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);
  return isRealMobile;
}

/***/ }),

/***/ "./src/utils/media-providers/image-upgrade-manager.ts":
/*!************************************************************!*\
  !*** ./src/utils/media-providers/image-upgrade-manager.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   notifyLowResLoaded: () => (/* binding */ notifyLowResLoaded),
/* harmony export */   onAllLowResLoaded: () => (/* binding */ onAllLowResLoaded),
/* harmony export */   registerImage: () => (/* binding */ registerImage),
/* harmony export */   setUpgradeTimeout: () => (/* binding */ setUpgradeTimeout)
/* harmony export */ });
// src/utils/image-upgrade-manager.ts
let totalImages = 0;
let loadedLowRes = 0;
let listeners = [];
let upgradeTimeout = null;
const setUpgradeTimeout = (ms = 5000) => {
  if (upgradeTimeout) return;
  upgradeTimeout = setTimeout(() => {
    listeners.forEach(fn => fn());
    listeners = [];
  }, ms);
};
const registerImage = () => {
  totalImages++;
  setUpgradeTimeout();
};
const notifyLowResLoaded = () => {
  loadedLowRes++;
  if (loadedLowRes >= totalImages) {
    listeners.forEach(fn => fn());
    listeners = [];
  }
};
const onAllLowResLoaded = callback => {
  listeners.push(callback);
};

/***/ }),

/***/ "./src/utils/media-providers/media-loader.tsx":
/*!****************************************************!*\
  !*** ./src/utils/media-providers/media-loader.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _video_observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./video-observer */ "./src/utils/media-providers/video-observer.tsx");
/* harmony import */ var _content_utility_loading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../content-utility/loading */ "./src/utils/content-utility/loading.tsx");
/* harmony import */ var _image_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./image-builder */ "./src/utils/media-providers/image-builder.ts");
/* harmony import */ var _image_upgrade_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./image-upgrade-manager */ "./src/utils/media-providers/image-upgrade-manager.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// MediaLoader






function useNearViewport(ref, {
  rootMargin = '900px 0px',
  threshold = 0,
  once = true
} = {}) {
  const [near, setNear] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!ref.current || near) return;
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        setNear(true);
        if (once) io.disconnect();
      }
    }, {
      rootMargin,
      threshold
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, near, rootMargin, threshold, once]);
  return near;
}
const MediaLoader = ({
  type,
  src,
  alt = '',
  id,
  className = '',
  style = {},
  objectPosition = 'center center',
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'metadata',
  enableVisibilityControl = true,
  priority = false,
  controls = false
}) => {
  const [loaded, setLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false); // first frame/LQIP loaded
  const [showMedium, setShowMedium] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showHigh, setShowHigh] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const isNear = useNearViewport(containerRef);
  const shouldStart = priority || isNear;

  // IMAGE upgrade flow
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (type !== 'image') return;
    (0,_image_upgrade_manager__WEBPACK_IMPORTED_MODULE_4__.registerImage)();

    // start medium once near (or after 2s as a safety)
    const t1 = setTimeout(() => setShowMedium(true), shouldStart ? 0 : 2000);
    if (shouldStart) setShowMedium(true);

    // upgrade to high when all low-res are in OR 5s safety
    const off = () => setTimeout(() => setShowHigh(true), 300);
    (0,_image_upgrade_manager__WEBPACK_IMPORTED_MODULE_4__.onAllLowResLoaded)(off);
    const t2 = setTimeout(() => setShowHigh(true), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [type, shouldStart]);
  const onMediaLoaded = () => {
    setLoaded(true);
    if (type === 'image') (0,_image_upgrade_manager__WEBPACK_IMPORTED_MODULE_4__.notifyLowResLoaded)();
    if (id) {
      const event = new CustomEvent('mediaReady', {
        detail: {
          id
        }
      });
      window.dispatchEvent(event);
    }
  };

  // VIDEO visibility/autoplay + fetch control
  (0,_video_observer__WEBPACK_IMPORTED_MODULE_1__.useVideoVisibility)(videoRef, containerRef, type === 'video' && enableVisibilityControl ? 0.4 : undefined);

  // kick off video fetching when near (or fallback after 2s)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (type !== 'video' || !videoRef.current) return;
    const v = videoRef.current;
    const start = () => {
      // switch to metadata so the browser actually fetches
      if (v.preload !== 'metadata') v.preload = 'metadata';
      // if sources are present, ensure load is called
      try {
        v.load();
      } catch {}
    };
    if (shouldStart) start();
    const t = setTimeout(start, 2000);
    return () => clearTimeout(t);
  }, [type, shouldStart]);
  if (!src) return null;

  // ============== IMAGE ==============
  if (type === 'image') {
    // Always render LQIP immediately; upgrade sources via state
    const ultraLowSrc = typeof src === 'string' ? src : (0,_image_builder__WEBPACK_IMPORTED_MODULE_3__.getLowResImageUrl)(src);
    const mediumSrc = typeof src === 'string' ? src : (0,_image_builder__WEBPACK_IMPORTED_MODULE_3__.getMediumImageUrl)(src);
    const highResSrc = typeof src === 'string' ? src : (0,_image_builder__WEBPACK_IMPORTED_MODULE_3__.getHighQualityImageUrl)(src);
    const resolvedSrc = showHigh ? highResSrc : showMedium ? mediumSrc : ultraLowSrc;
    return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ref: containerRef,
      style: {
        position: 'relative',
        width: '100%',
        height: '100%'
      },
      children: [!loaded && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "absolute inset-0 z-10",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_content_utility_loading__WEBPACK_IMPORTED_MODULE_2__["default"], {
          isFullScreen: false
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
        loading: priority ? 'eager' : undefined // undefined → default
        ,
        fetchPriority: showHigh || priority ? 'high' : showMedium ? 'auto' : 'low',
        id: id,
        src: resolvedSrc,
        alt: alt,
        onLoad: onMediaLoaded,
        onError: e => console.warn('Image failed', e.target.src),
        className: className,
        draggable: false,
        style: {
          ...style,
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'filter 0.5s ease, opacity 0.3s ease'
        }
      })]
    });
  }

  // ============== VIDEO ==============
  const isVideoSetObj = typeof src === 'object' && !('asset' in src) && ('webmUrl' in src || 'mp4Url' in src);
  const vs = isVideoSetObj ? src : undefined;
  const legacyVideoUrl = typeof src === 'string' ? src : undefined;
  const posterUrl = vs?.poster ? typeof vs.poster === 'string' ? vs.poster : (0,_image_builder__WEBPACK_IMPORTED_MODULE_3__.urlFor)(vs.poster).width(1200).quality(80).auto('format').url() : undefined;
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    ref: containerRef,
    style: {
      position: 'relative',
      width: '100%',
      height: '100%'
    },
    children: [!loaded && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "absolute inset-0 z-10",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_content_utility_loading__WEBPACK_IMPORTED_MODULE_2__["default"], {
        isFullScreen: false
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("video", {
      id: id,
      ref: videoRef,
      onLoadedData: onMediaLoaded,
      onError: e => console.warn('Video failed', e),
      className: className,
      style: {
        ...style,
        objectFit: 'cover',
        objectPosition,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'all'
      },
      loop: loop,
      muted: muted,
      playsInline: playsInline
      // start conservative; we'll bump to 'metadata' and call load() when near
      ,
      preload: "none",
      controls: controls,
      poster: posterUrl,
      ...(muted ? {
        defaultmuted: true
      } : {}),
      children: [vs?.webmUrl && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("source", {
        src: vs.webmUrl,
        type: "video/webm"
      }), vs?.mp4Url && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("source", {
        src: vs.mp4Url,
        type: "video/mp4"
      }), !vs?.webmUrl && !vs?.mp4Url && legacyVideoUrl && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("source", {
        src: legacyVideoUrl
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MediaLoader);

/***/ }),

/***/ "./src/utils/media-providers/video-observer.tsx":
/*!******************************************************!*\
  !*** ./src/utils/media-providers/video-observer.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useVideoVisibility: () => (/* binding */ useVideoVisibility)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// video-observer.tsx

const useVideoVisibility = (videoRef, containerRef, threshold = 0.4) => {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!videoRef?.current || !containerRef?.current) return;
    const t = typeof threshold === 'number' && threshold >= 0 && threshold <= 1 ? threshold : 0.4;
    let observer;
    const video = videoRef.current;
    const container = containerRef.current;

    // IMPORTANT: load even when using <source> children
    // (video.src is empty in that case; currentSrc is set after load())
    video.load();
    video.muted = true;
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => setTimeout(() => video.play().catch(() => {}), 500));
      } else {
        video.pause();
      }
    }, {
      threshold: t
    });
    observer.observe(container);

    // kick once if already in view
    const rect = container.getBoundingClientRect();
    const ratio = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);
    if (ratio >= t) video.play().catch(() => {});
    return () => observer?.disconnect();
  }, [videoRef, containerRef, threshold]);
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
  hideTimeout = setTimeout(() => hideTooltip(), 99_000);
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
//# sourceMappingURL=src_components_block-type-1_data-visualization_tsx.server.js.map