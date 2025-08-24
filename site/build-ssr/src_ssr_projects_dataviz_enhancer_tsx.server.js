exports.id = "src_ssr_projects_dataviz_enhancer_tsx";
exports.ids = ["src_ssr_projects_dataviz_enhancer_tsx"];
exports.modules = {

/***/ "./src/ssr/projects/dataviz.enhancer.tsx":
/*!***********************************************!*\
  !*** ./src/ssr/projects/dataviz.enhancer.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataVizEnhancer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/tooltip/tooltipInit */ "./src/utils/tooltip/tooltipInit.ts");
// src/components/dataviz/DataVizEnhancer.tsx


function DataVizEnhancer() {
  (0,_utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_1__.useTooltipInit)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const vid = document.getElementById('dataviz-media-video');
    if (!vid) return;

    // 1) Upgrade poster to high-res if provided by SSR
    const fullPoster = vid.dataset?.srcFull;
    if (fullPoster && vid.poster !== fullPoster) {
      vid.poster = fullPoster;
    }

    // 2) Load only what's needed; let the browser fetch metadata first
    //    (SSR set preload="auto", but we can safely keep it eager here, or use 'metadata')
    if (vid.readyState === 0) {
      vid.preload = 'auto'; // or 'metadata' if you want to be lighter here
      try {
        vid.load();
      } catch {}
    }

    // 3) Keep the poster until the *first painted* frame, not loadeddata.
    const hidePoster = () => {
      // remove poster *after* a real frame is painted to avoid black flash
      vid.removeAttribute('poster');
    };
    const onPlay = () => {
      const anyV = vid;
      if (typeof anyV.requestVideoFrameCallback === 'function') {
        anyV.requestVideoFrameCallback(() => hidePoster());
      } else {
        // Fallback: wait until time advances and we have decoded frame(s)
        const onTime = () => {
          if (vid.currentTime > 0 && vid.readyState >= 2) {
            vid.removeEventListener('timeupdate', onTime);
            hidePoster();
          }
        };
        vid.addEventListener('timeupdate', onTime, {
          once: true
        });

        // Safety backstop in case timeupdate never fires
        const timer = setTimeout(() => {
          vid.removeEventListener('timeupdate', onTime);
          hidePoster();
        }, 1200);
        // clean backstop on unmount
        cleanupFns.push(() => clearTimeout(timer));
      }
    };

    // 4) Try to autoplay (muted + inline means iOS/Safari will usually allow it)
    const tryPlay = () => {
      vid.play().catch(() => {
        // If browser blocks autoplay, poster will remain until user interacts
        // (which is fine; the first frame hook above will still remove it later)
      });
    };

    // Wire listeners
    vid.addEventListener('play', onPlay, {
      once: true
    });

    // Kick playback promptly (you can gate with IO if you want)
    tryPlay();

    // Optional: pause when tab hidden; resume when visible
    const onVis = () => {
      if (document.hidden) vid.pause();
    };
    document.addEventListener('visibilitychange', onVis);
    const cleanupFns = [() => vid.removeEventListener('play', onPlay), () => document.removeEventListener('visibilitychange', onVis)];
    return () => cleanupFns.forEach(fn => fn());
  }, []);
  return null;
}

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
  hideTimeout = setTimeout(() => hideTooltip(), 2_000);
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
//# sourceMappingURL=src_ssr_projects_dataviz_enhancer_tsx.server.js.map