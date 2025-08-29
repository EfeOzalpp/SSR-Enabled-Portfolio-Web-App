"use strict";
exports.id = "src_utils_media-providers_media-loader_tsx";
exports.ids = ["src_utils_media-providers_media-loader_tsx"];
exports.modules = {

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
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loading/loading */ "./src/utils/loading/loading.tsx");
/* harmony import */ var _image_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./image-builder */ "./src/utils/media-providers/image-builder.ts");
/* harmony import */ var _image_upgrade_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./image-upgrade-manager */ "./src/utils/media-providers/image-upgrade-manager.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/utils/media-providers/media-loader.tsx






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

  // Native poster control (no overlay)
  const [posterRemoved, setPosterRemoved] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const imgRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const isNear = useNearViewport(containerRef);
  const shouldStart = priority || isNear;

  // If already cached, skip fade-in
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (type === 'image' && imgRef.current?.complete) setLoaded(true);
    if (type === 'video' && videoRef.current?.readyState >= 2) setLoaded(true);
  }, [type]);

  // IMAGE progressive upgrade
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

  // ----- Video source parsing + poster URL -----
  const isVideoSetObj = typeof src === 'object' && src !== null && !('asset' in src) && ('webmUrl' in src || 'mp4Url' in src);
  const vs = isVideoSetObj ? src : undefined;
  const legacyVideoUrl = typeof src === 'string' ? src : undefined;
  const posterUrl = vs?.poster ? typeof vs.poster === 'string' ? vs.poster : (0,_image_builder__WEBPACK_IMPORTED_MODULE_3__.urlFor)(vs.poster).width(1200).quality(80).auto('format').url() : undefined;

  // ✅ Keep native poster visible until the first *painted* frame, then remove it.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (type !== 'video' || !videoRef.current) return;
    const v = videoRef.current;
    const hidePoster = () => {
      setPosterRemoved(true);
      v.removeAttribute('poster');
    };
    const onPlay = () => {
      const anyV = v;
      if (typeof anyV.requestVideoFrameCallback === 'function') {
        anyV.requestVideoFrameCallback(() => hidePoster());
      } else {
        const onTime = () => {
          if (v.currentTime > 0 && v.readyState >= 2) {
            v.removeEventListener('timeupdate', onTime);
            hidePoster();
          }
        };
        v.addEventListener('timeupdate', onTime);
        const timer = setTimeout(() => {
          v.removeEventListener('timeupdate', onTime);
          hidePoster();
        }, 1200);
        return () => clearTimeout(timer);
      }
    };
    v.addEventListener('play', onPlay, {
      once: true
    });
    return () => v.removeEventListener('play', onPlay);
  }, [type]);

  // VIDEO visibility/autoplay (your existing hook takes care of play/pause)
  (0,_video_observer__WEBPACK_IMPORTED_MODULE_1__.useVideoVisibility)(videoRef, containerRef, type === 'video' && enableVisibilityControl ? 0.35 : undefined);

  // ─────────────────────────────────────────────────────────────
  // VIDEO RELIABILITY PATCHES
  // - Kick load when near
  // - Retry once, then promote preload to 'auto'
  // - Decode nudge for iOS Safari after loadedmetadata
  // - Early "loaded" on loadedmetadata to remove spinner sooner
  // - Gentle play kick when data is ready (muted+inline)
  // ─────────────────────────────────────────────────────────────
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (type !== 'video' || !videoRef.current) return;
    const v = videoRef.current;
    let retryTimer = null;
    let promoteTimer = null;
    const clearTimers = () => {
      if (retryTimer) {
        window.clearTimeout(retryTimer);
        retryTimer = null;
      }
      if (promoteTimer) {
        window.clearTimeout(promoteTimer);
        promoteTimer = null;
      }
    };

    // If we’re near (or priority), ensure the browser actually fetches metadata
    const kickLoad = () => {
      try {
        // set the DOM property; the attribute React renders can be different and that's OK
        v.preload = preload ?? 'metadata';
        if (v.preload !== 'none') v.load(); // important: actually trigger the fetch
      } catch {}
    };
    const nudgeDecode = () => {
      // iOS Safari sometimes stalls after metadata; a tiny seek wakes decode
      try {
        if (v.readyState < 2) return;
        const t = v.currentTime;
        v.currentTime = t > 0 ? t : 0.001;
      } catch {}
    };
    const tryPlay = async () => {
      if (!enableVisibilityControl) return;
      try {
        if (v.muted && v.playsInline && v.paused && v.readyState >= 2) {
          await v.play().catch(() => {});
        }
      } catch {}
    };
    const onLoadedMeta = () => {
      // spinner can go away on metadata (poster is still covering until first frame)
      setLoaded(true);
      nudgeDecode();
    };
    const onLoadedData = () => {
      setLoaded(true);
      void tryPlay();
    };
    const onCanPlay = () => {
      setLoaded(true);
      void tryPlay();
    };
    if (shouldStart) {
      kickLoad();

      // If nothing after ~2.5s, try load() once more
      retryTimer = window.setTimeout(() => {
        if (v.readyState < 2) kickLoad();
      }, 2500);

      // Still nothing after ~5s? Promote preload to 'auto'
      promoteTimer = window.setTimeout(() => {
        if (v.readyState < 2) {
          try {
            v.preload = 'auto';
            v.load();
          } catch {}
        }
      }, 5000);
    }
    v.addEventListener('loadedmetadata', onLoadedMeta);
    v.addEventListener('loadeddata', onLoadedData);
    v.addEventListener('canplay', onCanPlay);

    // Optional: diagnostics for flaky networks
    const onError = e => console.warn('Video error', e);
    const onStalled = () => console.warn('Video stalled');
    const onSuspend = () => {/* benign on many browsers */};
    v.addEventListener('error', onError);
    v.addEventListener('stalled', onStalled);
    v.addEventListener('suspend', onSuspend);
    return () => {
      clearTimers();
      v.removeEventListener('loadedmetadata', onLoadedMeta);
      v.removeEventListener('loadeddata', onLoadedData);
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('error', onError);
      v.removeEventListener('stalled', onStalled);
      v.removeEventListener('suspend', onSuspend);
    };
  }, [type, shouldStart, preload, enableVisibilityControl,
  // if any URL changes, re-run the loader watchdog
  isVideoSetObj, vs && vs.webmUrl || '', vs && vs.mp4Url || '', legacyVideoUrl || '']);
  const hasVideoSource = Boolean(vs?.webmUrl || vs?.mp4Url || legacyVideoUrl);
  if (!src || type === 'video' && !hasVideoSource) return null;

  // ====== IMAGE ======
  if (type === 'image') {
    const ultraLowSrc = typeof src === 'string' ? src : (0,_image_builder__WEBPACK_IMPORTED_MODULE_3__.getLowResImageUrl)(src);
    const mediumSrc = typeof src === 'string' ? src : (0,_image_builder__WEBPACK_IMPORTED_MODULE_3__.getMediumImageUrl)(src);
    const highResSrc = typeof src === 'string' ? src : (0,_image_builder__WEBPACK_IMPORTED_MODULE_3__.getHighQualityImageUrl)(src);
    const resolvedSrc = showHigh ? highResSrc : showMedium ? mediumSrc : ultraLowSrc;
    if (!resolvedSrc) return null;
    return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ref: containerRef,
      style: {
        position: 'relative',
        width: '100%',
        height: '100%'
      },
      children: [!loaded && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "absolute-inset",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_loading_loading__WEBPACK_IMPORTED_MODULE_2__["default"], {
          isFullScreen: false
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
        ref: imgRef,
        loading: priority ? 'eager' : undefined,
        fetchPriority: showHigh || priority ? 'high' : showMedium ? 'auto' : 'low',
        id: id,
        src: resolvedSrc || undefined,
        alt: alt,
        onLoad: onMediaLoaded,
        onError: e => console.warn('Image failed', e.target.src),
        className: className,
        draggable: false,
        style: {
          ...style,
          objectFit: 'cover',
          objectPosition,
          opacity: loaded ? 1 : 0,
          transition: isSSR ? 'none' : 'filter 0.5s ease, opacity 0.3s ease'
        }
      })]
    });
  }

  // ====== VIDEO ======
  const showSpinner = !loaded;
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    ref: containerRef,
    style: {
      position: 'relative',
      width: '100%',
      height: '100%'
    },
    children: [showSpinner && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "absolute-inset",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_loading_loading__WEBPACK_IMPORTED_MODULE_2__["default"], {
        isFullScreen: false
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("video", {
      id: id,
      ref: videoRef
      // treat loadeddata & metadata as “ready enough” for UI
      ,
      onLoadedData: onMediaLoaded,
      onLoadedMetadata: () => setLoaded(true),
      onError: e => console.warn('Video failed', e),
      className: className,
      style: {
        ...style,
        objectFit: 'cover',
        objectPosition,
        opacity: loaded ? 1 : 0,
        transition: isSSR ? 'none' : 'opacity 0.3s ease',
        pointerEvents: 'all',
        zIndex: 1
      },
      loop: loop,
      muted: muted,
      playsInline: playsInline,
      preload: preload ?? 'metadata',
      controls: controls
      // If you host poster/video on different origins and ever read pixels to <canvas>,
      // uncomment next line and ensure CORS headers exist:
      // crossOrigin="anonymous"
      ,
      poster: posterRemoved ? undefined : posterUrl,
      children: [vs?.mp4Url && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("source", {
        src: vs.mp4Url || undefined,
        type: "video/mp4"
      }), vs?.webmUrl && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("source", {
        src: vs.webmUrl || undefined,
        type: "video/webm"
      }), !vs?.webmUrl && !vs?.mp4Url && legacyVideoUrl && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("source", {
        src: legacyVideoUrl || undefined
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
//# sourceMappingURL=src_utils_media-providers_media-loader_tsx.server.js.map