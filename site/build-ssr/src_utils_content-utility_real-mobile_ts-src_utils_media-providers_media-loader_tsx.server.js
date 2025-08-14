"use strict";
exports.id = "src_utils_content-utility_real-mobile_ts-src_utils_media-providers_media-loader_tsx";
exports.ids = ["src_utils_content-utility_real-mobile_ts-src_utils_media-providers_media-loader_tsx"];
exports.modules = {

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

/***/ }),

/***/ "./src/utils/media-providers/image-upgrade-manager.ts":
/*!************************************************************!*\
  !*** ./src/utils/media-providers/image-upgrade-manager.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
// src/utils/media-providers/MediaLoader.tsx






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
  const isSSR = typeof window === 'undefined';

  // Start as loaded in SSR to avoid fade-in on hydration
  const [loaded, setLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(isSSR);
  const [showMedium, setShowMedium] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showHigh, setShowHigh] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [posterRemoved, setPosterRemoved] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const imgRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const isNear = useNearViewport(containerRef);
  const shouldStart = priority || isNear;

  // If already cached, skip fade-in
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (type === 'image' && imgRef.current?.complete) {
      setLoaded(true);
    }
    if (type === 'video' && videoRef.current?.readyState >= 2) {
      setLoaded(true);
    }
  }, [type]);

  // IMAGE upgrade flow
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (type !== 'image') return;
    (0,_image_upgrade_manager__WEBPACK_IMPORTED_MODULE_4__.registerImage)();
    const t1 = setTimeout(() => setShowMedium(true), shouldStart ? 0 : 2000);
    if (shouldStart) setShowMedium(true);
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

  // VIDEO visibility/autoplay
  (0,_video_observer__WEBPACK_IMPORTED_MODULE_1__.useVideoVisibility)(videoRef, containerRef, type === 'video' && enableVisibilityControl ? 0.4 : undefined);

  // Only load video once before playback starts
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (type !== 'video' || !videoRef.current) return;
    const v = videoRef.current;
    let loadedOnce = false;
    const start = () => {
      if (loadedOnce) return;
      loadedOnce = true;
      if (v.preload !== 'metadata') v.preload = 'metadata';
      try {
        v.load();
      } catch {}
    };
    if (shouldStart) {
      start();
    } else {
      const t = setTimeout(start, 2000);
      return () => clearTimeout(t);
    }
  }, [type, shouldStart]);

  // Remove poster after first frame
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (type !== 'video' || !videoRef.current) return;
    const v = videoRef.current;
    const handleLoaded = () => {
      setPosterRemoved(true); // Remove in VDOM
      v.removeAttribute('poster'); // Remove in DOM
      v.play().catch(err => {
        console.warn('Autoplay failed:', err);
      });
    };
    v.addEventListener('loadeddata', handleLoaded, {
      once: true
    });
    return () => v.removeEventListener('loadeddata', handleLoaded);
  }, [type]);
  if (!src) return null;

  // ====== IMAGE ======
  if (type === 'image') {
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
        ref: imgRef,
        loading: priority ? 'eager' : undefined,
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
          transition: isSSR ? 'none' : 'filter 0.5s ease, opacity 0.3s ease'
        }
      })]
    });
  }

  // ====== VIDEO ======
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
        transition: isSSR ? 'none' : 'opacity 0.3s ease',
        pointerEvents: 'all'
      },
      loop: loop,
      muted: muted,
      playsInline: playsInline,
      preload: "none",
      controls: controls,
      poster: posterRemoved ? undefined : posterUrl,
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

/***/ })

};
;
//# sourceMappingURL=src_utils_content-utility_real-mobile_ts-src_utils_media-providers_media-loader_tsx.server.js.map