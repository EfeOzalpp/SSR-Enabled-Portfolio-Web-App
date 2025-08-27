exports.id = "dynamic-app-ssr-app-dynamic-theme-route-tsx";
exports.ids = ["dynamic-app-ssr-app-dynamic-theme-route-tsx"];
exports.modules = {

/***/ "./src/dynamic-app/lib/colorString.ts":
/*!********************************************!*\
  !*** ./src/dynamic-app/lib/colorString.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorMapping: () => (/* binding */ colorMapping),
/* harmony export */   colorMapping2: () => (/* binding */ colorMapping2)
/* harmony export */ });
// Student → color set mapping
const colorMapping = {
  'Yiner Xu ': ['#e9b2c2', '#ffc3d4', '#5f4f53', '#ffc9d8'],
  'Simone Schwartz': ['#d2b098', '#f0be9b', '#5b4e44', '#f2c5a5'],
  'Seth Abrahamson ': ['#a9a9a9', '#b9b9b9', '#292929', '#c0c0c0'],
  'Sanna Anwar': ['#e9d0a0', '#ffe4af', '#2f2d28', '#ffe7b7'],
  'Javi Ortiz': ['#e9afbd', '#ffbfcf', '#2f2a2b', '#ffc5d4'],
  'Janhvi Gokalgandhi': ['#a0e1e9', '#aff7ff', '#282e2f', '#b7f8ff'],
  'Andrew Adamides': ['#bef9da', '#7ca08d', '#262a28', '#9dccb4'],
  'Shozab Raza': ['#e9e0a7', '#fff6b6', '#2f2e29', '#fff7bd'],
  'Baopu Wang': ['#b3c2e9', '#c4d4ff', '#4f535f', '#cad8ff'],
  'Efe Ozalp': ['#6fc1e9', '#78d3ff', '#242b2f', '#85d7ff'],
  'Harry Liao ': ['#abcdb2', '#b5e7be', '#292d2a', '#bceac5'],
  'Jawad Naik': ['#97cfac', '#9bedb9', '#272d29', '#a5efc0']
};
const colorMapping2 = {
  'Yiner Xu': ['#e9b2c2', '#ffc3d4', '#5f4f53', '#ffc9d8'],
  'Simone Schwartz': ['#d2b098', '#f0be9b', '#5b4e44', '#f2c5a5'],
  'Seth Abrahamson': ['#a9a9a9', '#b9b9b9', '#292929', '#c0c0c0'],
  'Sanna Anwar': ['#e9d0a0', '#ffe4af', '#2f2d28', '#ffe7b7'],
  'Javi Ortiz': ['#e9afbd', '#ffbfcf', '#2f2a2b', '#ffc5d4'],
  'Janhvi Gokalgandhi': ['#a0e1e9', '#aff7ff', '#282e2f', '#b7f8ff'],
  'Andrew Adamides': ['#bef9da', '#7ca08d', '#262a28', '#9dccb4'],
  'Shozab Raza': ['#e9e0a7', '#fff6b6', '#2f2e29', '#fff7bd'],
  'Baopu Wang': ['#b3c2e9', '#c4d4ff', '#4f535f', '#cad8ff'],
  'Efe Ozalp': ['#6fc1e9', '#78d3ff', '#242b2f', '#85d7ff'],
  'Harry Liao': ['#abcdb2', '#b5e7be', '#292d2a', '#bceac5'],
  'Jawad Naik': ['#97cfac', '#9bedb9', '#272d29', '#a5efc0']
};

/***/ }),

/***/ "./src/dynamic-app/lib/documentObserver.ts":
/*!*************************************************!*\
  !*** ./src/dynamic-app/lib/documentObserver.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// setupIntersectionObserver.ts
let observer = null;
const setupIntersectionObserver = (pauseAnimation, rootElement = document) => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  if (pauseAnimation) return;
  const applyTransform = (percentage, imageContainer, imageContainer2) => {
    if (!imageContainer || !imageContainer2) return;
    let imageContainerTransform = 'translate(0em, 0em)';
    let imageContainer2Transform = 'translate(1em, -27.8em)';
    let imageContainerZIndex = '5';
    let imageContainer2ZIndex = '1';
    const width = window.innerWidth;
    if (width <= 767) {
      if (percentage > 0.35) {
        imageContainerTransform = 'translate(1em, 1.5em)';
        imageContainer2Transform = 'translate(-1em, -29.5em)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.15) {
        imageContainerTransform = 'translate(0.5em, 0.75em)';
        imageContainer2Transform = 'translate(-0.5em, -28.9em)';
      } else {
        imageContainer2Transform = 'translate(0em, -28.4em)';
      }
    } else if (width <= 1024) {
      if (percentage > 0.3) {
        imageContainerTransform = 'translate(-1em, 0em)';
        imageContainer2Transform = 'translate(0em, -29em)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.15) {
        imageContainerTransform = 'translate(0em, 1em)';
        imageContainer2Transform = 'translate(-1em, -28em)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      } else if (percentage <= 0.15) {
        imageContainerTransform = 'translate(-1em, 0em)';
        imageContainer2Transform = 'translate(0em, -29em)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      }
    } else if (width > 1025) {
      if (percentage > 0.5) {
        imageContainerTransform = 'translate(0em, 0em)';
        imageContainer2Transform = 'translate(1em, -27.2em)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.25) {
        imageContainerTransform = 'translate(1em, 1em)';
        imageContainer2Transform = 'translate(0em, -26em)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      } else if (percentage >= 0) {
        imageContainerTransform = 'translate(0em, 0em)';
        imageContainer2Transform = 'translate(1em, -27em)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      }
    }
    imageContainer.style.transform = imageContainerTransform;
    imageContainer.style.zIndex = imageContainerZIndex;
    imageContainer2.style.transform = imageContainer2Transform;
    imageContainer2.style.zIndex = imageContainer2ZIndex;
  };
  const observerCallback = entries => {
    entries.forEach(entry => {
      const element = entry.target;
      const imageContainer = element.querySelector('.image-container');
      const imageContainer2 = element.querySelector('.image-container2');
      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight;
      const vc = vh / 1.6;
      const percentage = Math.max(0, Math.min(rect.height, vc - rect.top)) / rect.height;
      applyTransform(percentage, imageContainer, imageContainer2);
    });
  };
  const observerOptions = {
    threshold: Array.from({
      length: 101
    }, (_, i) => i / 100)
  };
  observer = new IntersectionObserver(observerCallback, observerOptions);
  const cards = rootElement.querySelectorAll('.card-container');
  cards.forEach((card, index) => {
    if (index < 3) {
      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight;
      const vc = vh / 2;
      const percentage = Math.max(0, Math.min(rect.height, vc - rect.top)) / rect.height;
      const img1 = card.querySelector('.image-container');
      const img2 = card.querySelector('.image-container2');
      applyTransform(percentage, img1, img2);
    }
    observer.observe(card);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setupIntersectionObserver);

/***/ }),

/***/ "./src/dynamic-app/lib/palette-controller.ts":
/*!***************************************************!*\
  !*** ./src/dynamic-app/lib/palette-controller.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   computeStateFromPalette: () => (/* binding */ computeStateFromPalette),
/* harmony export */   resolvePalette: () => (/* binding */ resolvePalette)
/* harmony export */ });
// src/dynamic-app/lib/palette-controller.ts

const WHITE = '#FFFFFF';

// resolve alt → palette (handles trailing spaces too)
function resolvePalette(altRaw, colorMapping) {
  if (!altRaw) return null;
  const exact = colorMapping[altRaw];
  if (Array.isArray(exact)) return exact;
  const trimmed = colorMapping[altRaw.trim()];
  if (Array.isArray(trimmed)) return trimmed;
  return null;
}

// compute state from a quartet
function computeStateFromPalette(q, win = window) {
  const palette = q ?? [WHITE, WHITE, WHITE, WHITE];
  const [c0, c1, c2, c3] = palette;

  // desktop/mobile branching for first slot
  const isDesktop = win.innerWidth >= 1024;
  const first = isDesktop ? c1 ?? WHITE : c0 ?? WHITE;
  const movingText = [first, c1 ?? WHITE, c3 ?? c2 ?? WHITE];
  const activeColor = c2 ?? WHITE;
  return {
    activeColor,
    movingText,
    lastKnown: activeColor
  };
}

/***/ }),

/***/ "./src/dynamic-app/lib/svg-icon-map.ts":
/*!*********************************************!*\
  !*** ./src/dynamic-app/lib/svg-icon-map.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asInlineSvg: () => (/* binding */ asInlineSvg),
/* harmony export */   escapeAttr: () => (/* binding */ escapeAttr),
/* harmony export */   isInlineSvg: () => (/* binding */ isInlineSvg),
/* harmony export */   normalizeIconMap: () => (/* binding */ normalizeIconMap),
/* harmony export */   stripSvgPreamble: () => (/* binding */ stripSvgPreamble),
/* harmony export */   toClientIconMap: () => (/* binding */ toClientIconMap),
/* harmony export */   toImgHtml: () => (/* binding */ toImgHtml)
/* harmony export */ });
// Reusable helpers for turning icon payloads into safe HTML strings

/** remove BOM, <?xml …?>, <!DOCTYPE …> so innerHTML gets a clean <svg> root */
const stripSvgPreamble = (s = '') => s.replace(/^\uFEFF/, '').replace(/^\s*<\?xml[\s\S]*?\?>\s*/i, '').replace(/^\s*<!DOCTYPE[\s\S]*?>\s*/i, '').trim();
const isInlineSvg = s => {
  if (typeof s !== 'string') return false;
  const t = stripSvgPreamble(s);
  return /^\s*<svg[\s\S]*<\/svg>\s*$/i.test(t);
};
const asInlineSvg = s => isInlineSvg(s) ? stripSvgPreamble(s) : '';
const escapeAttr = s => String(s).replace(/"/g, '&quot;');
const toImgHtml = src => typeof src === 'string' && src.trim() ? `<img src="${escapeAttr(src)}" alt="" aria-hidden="true" />` : '';

/** normalize a plain { name: value } map (from SSR/window) to safe HTML strings */
function normalizeIconMap(raw) {
  const out = {};
  for (const [k, v] of Object.entries(raw || {})) {
    out[k] = asInlineSvg(v) || toImgHtml(v);
  }
  return out;
}

/** build a client icon map from Sanity rows (prefer inline; else URL→<img>) */
function toClientIconMap(list = []) {
  const out = {};
  for (const it of list) {
    if (!it?.title) continue;
    const inline = asInlineSvg(it.icon);
    out[it.title] = inline || toImgHtml(it.url) || toImgHtml(it.icon);
  }
  return out;
}

/***/ }),

/***/ "./src/dynamic-app/preload-dynamic-app-route.ts":
/*!******************************************************!*\
  !*** ./src/dynamic-app/preload-dynamic-app-route.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ensureDynamicThemeIcons: () => (/* binding */ ensureDynamicThemeIcons),
/* harmony export */   ensureDynamicThemeImages: () => (/* binding */ ensureDynamicThemeImages),
/* harmony export */   ensureDynamicThemePreload: () => (/* binding */ ensureDynamicThemePreload),
/* harmony export */   getPreloadedDynamicTheme: () => (/* binding */ getPreloadedDynamicTheme),
/* harmony export */   primeDynamicThemeFromSSR: () => (/* binding */ primeDynamicThemeFromSSR),
/* harmony export */   whenDynamicThemePreloadReady: () => (/* binding */ whenDynamicThemePreloadReady)
/* harmony export */ });
/* harmony import */ var _lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/fetchSVGIcons */ "./src/dynamic-app/lib/fetchSVGIcons.js");
/* harmony import */ var _lib_fetchUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/fetchUser */ "./src/dynamic-app/lib/fetchUser.js");


let cache = {};
let inFlight = null;
function getPreloadedDynamicTheme() {
  return cache;
}
function primeDynamicThemeFromSSR(data) {
  if (!data) return;
  cache = {
    ...cache,
    ...data
  };
}
async function whenDynamicThemePreloadReady() {
  if (cache.icons && cache.images) return cache;
  if (inFlight) {
    await inFlight;
    return cache;
  }
  return cache;
}
function toIconMap(list) {
  return (list || []).reduce((acc, it) => {
    if (!it?.title) return acc;
    const val = it.icon ?? it.url;
    if (typeof val === 'string' && val.length > 0) acc[it.title] = val;
    return acc;
  }, {});
}
async function ensureDynamicThemeIcons() {
  if (!cache.icons && inFlight) {
    await inFlight;
    return cache.icons || {};
  }
  if (cache.icons) return cache.icons;
  let iconsRaw = [];
  try {
    iconsRaw = await (0,_lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_0__["default"])();
  } catch {}
  const list = Array.isArray(iconsRaw) ? iconsRaw : [];
  const icons = toIconMap(list);
  cache.icons = icons;
  return icons;
}

/**
 * IMPORTANT: no seeding/reshuffle here.
 * If SSR provided images, we keep them as-is.
 * If not, we fetch and keep the API order.
 */
async function ensureDynamicThemeImages() {
  if (!cache.images && inFlight) {
    await inFlight;
    return cache.images || [];
  }
  if (cache.images) return cache.images;
  let imagesRaw = [];
  try {
    imagesRaw = await (0,_lib_fetchUser__WEBPACK_IMPORTED_MODULE_1__.fetchImages)();
  } catch {}
  const images = Array.isArray(imagesRaw) ? imagesRaw : [];
  cache.images = images;
  return cache.images;
}
async function ensureDynamicThemePreload() {
  if (cache.icons && cache.images) return cache;
  if (inFlight) return inFlight;
  inFlight = Promise.all([ensureDynamicThemeIcons(), ensureDynamicThemeImages()]).then(([icons, images]) => {
    cache = {
      ...cache,
      icons,
      images
    };
    return cache;
  }).finally(() => {
    inFlight = null;
  });
  return inFlight;
}

/* ---- hydrate from SSR bootstrap (window.__DYNAMIC_THEME_PRELOAD__) ---- */

if (typeof window !== 'undefined' && window.__DYNAMIC_THEME_PRELOAD__) {
  primeDynamicThemeFromSSR(window.__DYNAMIC_THEME_PRELOAD__);
}

/***/ }),

/***/ "./src/dynamic-app/ssr-app/dynamic-theme.route.tsx":
/*!*********************************************************!*\
  !*** ./src/dynamic-app/ssr-app/dynamic-theme.route.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DynamicThemeRoute)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @loadable/component */ "./node_modules/@loadable/component/dist/cjs/loadable.cjs.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/context-providers/ssr-data-context */ "./src/utils/context-providers/ssr-data-context.tsx");
/* harmony import */ var _utils_context_providers_style_injector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/context-providers/style-injector */ "./src/utils/context-providers/style-injector.ts");
/* harmony import */ var _preload_dynamic_app_route__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../preload-dynamic-app-route */ "./src/dynamic-app/preload-dynamic-app-route.ts");
/* harmony import */ var _ssr_dynamic_app_UIcards_sort__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ssr/dynamic-app/UIcards+sort */ "./src/ssr/dynamic-app/UIcards+sort.tsx");
/* harmony import */ var _dynamic_app_lib_colorString__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../dynamic-app/lib/colorString */ "./src/dynamic-app/lib/colorString.ts");
/* harmony import */ var _dynamic_app_lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../dynamic-app/lib/fetchSVGIcons */ "./src/dynamic-app/lib/fetchSVGIcons.js");
/* harmony import */ var _styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../styles/dynamic-app/misc.css?raw */ "./src/styles/dynamic-app/misc.css?raw");
/* harmony import */ var _styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _dynamic_app_lib_svg_icon_map__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../dynamic-app/lib/svg-icon-map */ "./src/dynamic-app/lib/svg-icon-map.ts");
/* harmony import */ var _lib_palette_controller__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/palette-controller */ "./src/dynamic-app/lib/palette-controller.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");











// use the actual export you have


// local types to satisfy TS based on your controller’s API

// client-only chunks
const Navigation = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__["default"])({
  resolved: {},
  chunkName() {
    return "dynamic-app-components-navigation";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (true) {
      return !!__webpack_require__.m[key];
    }
    // removed by dead control flow
{}
  },
  importAsync: () => __webpack_require__.e(/*! import() | dynamic-app-components-navigation */ "dynamic-app-components-navigation").then(__webpack_require__.bind(__webpack_require__, /*! ../../dynamic-app/components/navigation */ "./src/dynamic-app/components/navigation.jsx")),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (true) {
      return __webpack_require__(id);
    }
    // removed by dead control flow
{}
  },
  resolve() {
    if (true) {
      return /*require.resolve*/(/*! ../../dynamic-app/components/navigation */ "./src/dynamic-app/components/navigation.jsx");
    }
    // removed by dead control flow
{}
  }
}, {
  ssr: false
});
const FireworksDisplay = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__["default"])({
  resolved: {},
  chunkName() {
    return "dynamic-app-components-fireworksDisplay";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (true) {
      return !!__webpack_require__.m[key];
    }
    // removed by dead control flow
{}
  },
  importAsync: () => Promise.all(/*! import() | dynamic-app-components-fireworksDisplay */[__webpack_require__.e("src_dynamic-app_components_fireworksDisplay_jsx"), __webpack_require__.e("dynamic-app-components-fireworksDisplay")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../dynamic-app/components/fireworksDisplay */ "./src/dynamic-app/components/fireworksDisplay.jsx")),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (true) {
      return __webpack_require__(id);
    }
    // removed by dead control flow
{}
  },
  resolve() {
    if (true) {
      return /*require.resolve*/(/*! ../../dynamic-app/components/fireworksDisplay */ "./src/dynamic-app/components/fireworksDisplay.jsx");
    }
    // removed by dead control flow
{}
  }
}, {
  ssr: false
});
const Footer = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__["default"])({
  resolved: {},
  chunkName() {
    return "dynamic-app-components-footer";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (true) {
      return !!__webpack_require__.m[key];
    }
    // removed by dead control flow
{}
  },
  importAsync: () => __webpack_require__.e(/*! import() | dynamic-app-components-footer */ "dynamic-app-components-footer").then(__webpack_require__.bind(__webpack_require__, /*! ../../dynamic-app/components/footer */ "./src/dynamic-app/components/footer.jsx")),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (true) {
      return __webpack_require__(id);
    }
    // removed by dead control flow
{}
  },
  resolve() {
    if (true) {
      return /*require.resolve*/(/*! ../../dynamic-app/components/footer */ "./src/dynamic-app/components/footer.jsx");
    }
    // removed by dead control flow
{}
  }
}, {
  ssr: false
});
const TitleDivider = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__["default"])({
  resolved: {},
  chunkName() {
    return "dynamic-app-components-title";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (true) {
      return !!__webpack_require__.m[key];
    }
    // removed by dead control flow
{}
  },
  importAsync: () => __webpack_require__.e(/*! import() | dynamic-app-components-title */ "dynamic-app-components-title").then(__webpack_require__.bind(__webpack_require__, /*! ../../dynamic-app/components/title */ "./src/dynamic-app/components/title.jsx")),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (true) {
      return __webpack_require__(id);
    }
    // removed by dead control flow
{}
  },
  resolve() {
    if (true) {
      return /*require.resolve*/(/*! ../../dynamic-app/components/title */ "./src/dynamic-app/components/title.jsx");
    }
    // removed by dead control flow
{}
  }
}, {
  ssr: false
});
const PauseButton = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__["default"])({
  resolved: {},
  chunkName() {
    return "dynamic-app-components-pauseButton";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (true) {
      return !!__webpack_require__.m[key];
    }
    // removed by dead control flow
{}
  },
  importAsync: () => __webpack_require__.e(/*! import() | dynamic-app-components-pauseButton */ "dynamic-app-components-pauseButton").then(__webpack_require__.bind(__webpack_require__, /*! ../../dynamic-app/components/pauseButton */ "./src/dynamic-app/components/pauseButton.jsx")),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (true) {
      return __webpack_require__(id);
    }
    // removed by dead control flow
{}
  },
  resolve() {
    if (true) {
      return /*require.resolve*/(/*! ../../dynamic-app/components/pauseButton */ "./src/dynamic-app/components/pauseButton.jsx");
    }
    // removed by dead control flow
{}
  }
}, {
  ssr: false
});

// SSR shell (UI cards + sort stub)
const DynamicTheme = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__["default"])({
  resolved: {},
  chunkName() {
    return "DynamicTheme-jsx";
  },
  isReady(props) {
    const key = this.resolve(props);
    if (this.resolved[key] !== true) {
      return false;
    }
    if (true) {
      return !!__webpack_require__.m[key];
    }
    // removed by dead control flow
{}
  },
  importAsync: () => __webpack_require__.e(/*! import() | DynamicTheme-jsx */ "DynamicTheme-jsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../DynamicTheme.jsx */ "./src/DynamicTheme.jsx")),
  requireAsync(props) {
    const key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync(props) {
    const id = this.resolve(props);
    if (true) {
      return __webpack_require__(id);
    }
    // removed by dead control flow
{}
  },
  resolve() {
    if (true) {
      return /*require.resolve*/(/*! ../../DynamicTheme.jsx */ "./src/DynamicTheme.jsx");
    }
    // removed by dead control flow
{}
  }
}, {
  ssr: true
});

/* ---------- portals ---------- */
function NavigationPortal(props) {
  const [target, setTarget] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,_utils_context_providers_style_injector__WEBPACK_IMPORTED_MODULE_4__.useStyleInjection)((_styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_9___default()), 'dynamic-app-style-misc');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setTarget(document.getElementById('dynamic-nav-mount'));
  }, []);
  if (!target) return null;
  return /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(Navigation, {
    items: props.items,
    customArrowIcon2: props.arrow1,
    customArrowIcon: props.arrow2,
    activeColor: props.activeColor ?? '#FFFFFF',
    isInShadow: false,
    scrollLockContainer: undefined
  }), target);
}
function FireworksPortal(props) {
  const [target, setTarget] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setTarget(document.getElementById('dynamic-fireworks-mount'));
  }, []);
  if (!target) return null;
  return /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(FireworksDisplay, {
    colorMapping: _dynamic_app_lib_colorString__WEBPACK_IMPORTED_MODULE_7__.colorMapping,
    items: props.items,
    activeColor: props.activeColor,
    lastKnownColor: props.lastKnownColor,
    onToggleFireworks: props.onToggleFireworks || (() => {})
  }), target);
}
function TitlePortal(props) {
  const [target, setTarget] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setTarget(document.getElementById('dynamic-title-mount'));
  }, []);
  if (!target) return null;
  return /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(TitleDivider, {
    svgIcon: props.logoSvg || '',
    movingTextColors: props.movingTextColors || ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
    pauseAnimation: !!props.pauseAnimation
  }), target);
}
function PausePortal(props) {
  const [target, setTarget] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setTarget(document.getElementById('dynamic-pause-mount'));
  }, []);
  if (!target) return null;
  return /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
    className: "pause-button-wrapper",
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(PauseButton, {
      toggleP5Animation: props.onToggle
    })
  }), target);
}
function FooterPortal(props) {
  const [target, setTarget] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setTarget(document.getElementById('dynamic-footer-mount'));
  }, []);
  if (!target) return null;
  return /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(Footer, {
    customArrowIcon2: props.arrow1,
    linkArrowIcon: props.linkArrowIcon
  }), target);
}

/* ---------- route ---------- */
function DynamicThemeRoute() {
  const ssr = (0,_utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_3__.useSsrData)();
  const preload = ssr?.preloaded?.dynamicTheme;
  const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Array.isArray(preload?.images) ? preload.images : []);
  const [icons, setIcons] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((0,_dynamic_app_lib_svg_icon_map__WEBPACK_IMPORTED_MODULE_10__.normalizeIconMap)(preload?.icons || {}));
  const [pauseAnimation, setPauseAnimation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [activeColor, setActiveColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('#FFFFFF');
  const [movingTextColors, setMovingTextColors] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(['#FFFFFF', '#FFFFFF', '#FFFFFF']);
  const [lastKnownColor, setLastKnownColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('#FFFFFF');
  const fwToggleRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const handleSetToggleFireworks = fn => {
    fwToggleRef.current = fn;
  };
  const handlePauseToggle = isEnabled => {
    setPauseAnimation(!isEnabled);
    try {
      fwToggleRef.current?.(isEnabled);
    } catch {}
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (preload) (0,_preload_dynamic_app_route__WEBPACK_IMPORTED_MODULE_5__.primeDynamicThemeFromSSR)(preload);
  }, [preload]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const w = typeof window !== 'undefined' ? window : null;
    const boot = w?.__DYNAMIC_THEME_PRELOAD__;
    if (boot) {
      if (Array.isArray(boot.images)) setItems(boot.images);
      if (boot.icons) setIcons((0,_dynamic_app_lib_svg_icon_map__WEBPACK_IMPORTED_MODULE_10__.normalizeIconMap)(boot.icons));
      (0,_preload_dynamic_app_route__WEBPACK_IMPORTED_MODULE_5__.primeDynamicThemeFromSSR)(boot);
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let dead = false;
    (async () => {
      try {
        const cache = await (0,_preload_dynamic_app_route__WEBPACK_IMPORTED_MODULE_5__.ensureDynamicThemePreload)();
        if (!dead && cache) {
          if (!items.length && Array.isArray(cache.images)) setItems(cache.images);
          if (!Object.keys(icons).length && cache.icons) setIcons((0,_dynamic_app_lib_svg_icon_map__WEBPACK_IMPORTED_MODULE_10__.normalizeIconMap)(cache.icons));
        }
      } catch {}
    })();
    return () => {
      dead = true;
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let dead = false;
    (async () => {
      if (icons && (icons['arrow1'] || icons['arrow2'] || icons['link-icon'] || icons['logo-small-1'])) return;
      try {
        const raw = await (0,_dynamic_app_lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_8__["default"])().catch(() => []);
        if (!dead && Array.isArray(raw)) {
          const map = (0,_dynamic_app_lib_svg_icon_map__WEBPACK_IMPORTED_MODULE_10__.toClientIconMap)(raw);
          if (Object.keys(map).length) setIcons(prev => ({
            ...map,
            ...prev
          }));
        }
      } catch {}
    })();
    return () => {
      dead = true;
    };
  }, [icons]);

  // compute palette-driven state from the enhancer (which gives a Quartet)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (typeof window !== 'undefined') (0,_ssr_dynamic_app_UIcards_sort__WEBPACK_IMPORTED_MODULE_6__.enhanceDynamicThemeSSR)({
      onColorChange: (_alt, palette) => {
        // only accept quartets
        if (!Array.isArray(palette) || palette.length < 4) return;
        const {
          activeColor: nextActive,
          movingText: nextTriplet,
          lastKnown
        } = (0,_lib_palette_controller__WEBPACK_IMPORTED_MODULE_11__.computeStateFromPalette)(palette);
        if (nextActive !== activeColor) {
          setActiveColor(nextActive);
          setLastKnownColor(lastKnown ?? nextActive);
        }
        setMovingTextColors(nextTriplet);
      }
    });
  }, [activeColor]);
  const propsMemo = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    items,
    arrow1: icons['arrow1'] || '',
    arrow2: icons['arrow2'] || '',
    linkArrowIcon: icons['link-icon'] || '',
    logoSmall: icons['logo-small-1'] || ''
  }), [items, icons]);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(DynamicTheme, {}), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(NavigationPortal, {
      items: propsMemo.items,
      arrow1: propsMemo.arrow1,
      arrow2: propsMemo.arrow2,
      activeColor: activeColor
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(FireworksPortal, {
      items: propsMemo.items,
      activeColor: activeColor,
      lastKnownColor: lastKnownColor,
      onToggleFireworks: handleSetToggleFireworks
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(TitlePortal, {
      logoSvg: propsMemo.logoSmall,
      movingTextColors: movingTextColors,
      pauseAnimation: pauseAnimation
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(PausePortal, {
      onToggle: handlePauseToggle
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(FooterPortal, {
      arrow1: propsMemo.arrow1,
      linkArrowIcon: propsMemo.linkArrowIcon
    })]
  });
}

/***/ }),

/***/ "./src/ssr/dynamic-app/UIcards+sort.tsx":
/*!**********************************************!*\
  !*** ./src/ssr/dynamic-app/UIcards+sort.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   enhanceDynamicThemeSSR: () => (/* binding */ enhanceDynamicThemeSSR)
/* harmony export */ });
/* harmony import */ var _dynamic_app_preload_dynamic_app_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dynamic-app/preload-dynamic-app-route */ "./src/dynamic-app/preload-dynamic-app-route.ts");
/* harmony import */ var _dynamic_app_lib_documentObserver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dynamic-app/lib/documentObserver */ "./src/dynamic-app/lib/documentObserver.ts");
/* harmony import */ var _logic_dynamic_alt_observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logic/dynamic-alt-observer */ "./src/ssr/logic/dynamic-alt-observer.ts");
/* harmony import */ var _dynamic_app_lib_colorString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../dynamic-app/lib/colorString */ "./src/dynamic-app/lib/colorString.ts");





/* =========================
   Config / selectors
   ========================= */
const SEL = {
  list: '.UI-card-divider',
  card: '.card-container',
  imgPref: '.ui-image2',
  // prefer this image
  imgFallback: '.ui-image1' // fallback image
};

/* =========================
   Helpers
   ========================= */

// normalize for safer alphabetic sorting (accent/case/numeric)
function normalizeForSort(s) {
  return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('en');
}
function compareAsc(a, b) {
  return normalizeForSort(a).localeCompare(normalizeForSort(b), 'en', {
    sensitivity: 'base',
    numeric: true,
    ignorePunctuation: true
  });
}
function compareDesc(a, b) {
  return -compareAsc(a, b);
}

// fresh shuffle each call (seedless)
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// get <img alt> from a card; prefer .ui-image2 then .ui-image1
function getAltFromCard(cardEl) {
  const img = cardEl.querySelector(SEL.imgPref) || cardEl.querySelector(SEL.imgFallback);
  return (img?.getAttribute('alt') || '').trim();
}

// ES2019-safe replaceAll via split/join
function replaceAllCompat(h, n, r) {
  return h.split(n).join(r);
}

// Retag index-based classes if you rely on them for styling
function retagIndexClasses(cardEl, oldIndex, newIndex) {
  const rewrite = el => {
    const node = el;
    const cls = node.className;
    if (typeof cls === 'string' && cls) {
      let next = cls;
      next = replaceAllCompat(next, `custom-card-${oldIndex}-2`, `custom-card-${newIndex}-2`);
      next = replaceAllCompat(next, `custom-card-${oldIndex}`, `custom-card-${newIndex}`);
      node.className = next;
    }
  };
  rewrite(cardEl);
  cardEl.querySelectorAll('*').forEach(rewrite);
}

// tiny debounce
function debounce(fn, ms = 120) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

// hex (#rrggbb) -> rgba(r,g,b,a) with fallback to original if parse fails
function hexToRgba(hex, alpha = 0.65) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec((hex || '').trim());
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* =========================
   SortBy chrome color from current DOM order
   ========================= */

// Rule: ≥1025px → 3rd card, 768–1024 → 2nd card, <768 → 1st card.
// Use that card’s alt → colorMapping[alt][1].
function computeViewportIndex(width) {
  return width >= 1025 ? 2 : width >= 768 ? 1 : 0;
}
function applySortChromeColorFromDomOrder(listContainer, sortRoot) {
  if (!sortRoot || !listContainer) return;
  const cards = Array.from(listContainer.querySelectorAll(SEL.card));
  if (cards.length === 0) return;
  const idx = computeViewportIndex(window.innerWidth);
  const target = cards[idx];
  if (!target) return;
  const alt = getAltFromCard(target);
  if (!alt) return;
  const colors = _dynamic_app_lib_colorString__WEBPACK_IMPORTED_MODULE_3__.colorMapping2?.[alt];
  const color = Array.isArray(colors) ? colors[1] || null : null;
  if (!color) return;
  const borderRgba = hexToRgba(color, 0.3);
  sortRoot.style.border = `solid 1.6px ${borderRgba}`;
  sortRoot.style.boxShadow = `
    0 1px 8px rgba(0,0,0,0.1),
    0 22px 8px rgba(0,0,0,0.08),
    12px 12px ${color}
  `;
}

/* =========================
   Progressive HQ upgrade (visible first + background queue)
   ========================= */

// Quick pass: upgrade any images currently visible on screen
function upgradeVisibleImages(container) {
  const imgs = Array.from(container.querySelectorAll('img[data-src-full]'));
  const vh = window.innerHeight;
  for (const img of imgs) {
    const rect = img.getBoundingClientRect();
    const visible = rect.bottom > 0 && rect.top < vh;
    const full = img.dataset?.srcFull;
    if (visible && full && img.src !== full) {
      img.src = full;
      img.removeAttribute('data-src-full');
    }
  }
}

// Preload a URL with low priority then resolve (no swap here)
function preload(fullUrl) {
  return new Promise((resolve, reject) => {
    const ghost = new Image();
    try {
      ghost.decoding = 'async';
    } catch {}
    try {
      ghost.fetchPriority = 'low';
    } catch {}
    ghost.onload = () => resolve();
    ghost.onerror = () => resolve(); // tolerate failures; keep LQ
    ghost.src = fullUrl;
  });
}

// Background queue that eventually swaps every remaining image
let _bgHQStarted = false;
let _bgCancel = null;
function upgradeAllImagesInBackground(root, maxConcurrent = 3) {
  if (_bgHQStarted) return _bgCancel || null;
  _bgHQStarted = true;
  const pool = new Set();
  let cancelled = false;
  const allImgs = Array.from(root.querySelectorAll('img[data-src-full]'));

  // Optional: prioritize by distance from viewport top (still “all”, just nicer order)
  const vhMid = window.scrollY + window.innerHeight / 2;
  allImgs.sort((a, b) => {
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    const ya = ra.top + window.scrollY;
    const yb = rb.top + window.scrollY;
    return Math.abs(ya - vhMid) - Math.abs(yb - vhMid);
  });
  let index = 0;
  const pump = () => {
    if (cancelled) return;
    while (pool.size < maxConcurrent && index < allImgs.length) {
      const el = allImgs[index++];
      const full = el.dataset?.srcFull;
      if (!full) continue;
      const task = preload(full).then(() => {
        if (cancelled) return;
        // If still pointing to LQ and not already swapped, replace
        if (el.isConnected && el.getAttribute('data-src-full') === full) {
          // keep lazy decoding; just change the source
          el.src = full;
          el.removeAttribute('data-src-full');
        }
      }).finally(() => {
        pool.delete(task);
        pump();
      });
      pool.add(task);
    }
  };
  pump();
  const cancel = () => {
    cancelled = true;
  };
  _bgCancel = cancel;
  return cancel;
}

/* =========================
   Main enhancer (DOM-driven, seed-proof for A↔Z)
   ========================= */

function enhanceDynamicThemeSSR(opts = {}) {
  const {
    onColorChange
  } = opts;
  const host = document.getElementById('dynamic-theme-ssr');
  if (!host || host.__enhanced) return;
  host.__enhanced = true;

  // make the SSR section interactive now
  host.classList.remove('ssr-initial');
  host.style.pointerEvents = 'auto';

  // If your CSS was disabling pointer events on the snapshot, force-enable:
  const snapshot = document.getElementById('dynamic-snapshot') || host;
  if (snapshot) snapshot.style.pointerEvents = 'auto';
  const listContainer = snapshot?.querySelector(SEL.list);
  if (!listContainer) return;

  // Sort UI bits
  const sortRoot = document.querySelector('#dynamic-sortby-mount .custom-dropdown');
  const selectEl = sortRoot?.querySelector('.custom-select');
  const arrowEl = sortRoot?.querySelector('.custom-arrow');
  const selectedValueEl = sortRoot?.querySelector('.selected-value h5');
  let optionsEl = sortRoot?.querySelector('.options-container');
  if (!optionsEl) {
    optionsEl = document.createElement('div');
    optionsEl.className = 'options-container';
    optionsEl.style.display = 'none';
    optionsEl.innerHTML = `
      <div class="option selected" data-value="random">Randomized</div>
      <div class="option" data-value="titleAsc">A to Z</div>
      <div class="option" data-value="titleDesc">Z to A</div>
    `;
    sortRoot?.appendChild(optionsEl);
  }
  const openOptions = () => {
    optionsEl.style.display = '';
    arrowEl?.classList.add('open');
  };
  const closeOptions = () => {
    optionsEl.style.display = 'none';
    arrowEl?.classList.remove('open');
  };
  document.addEventListener('mousedown', e => {
    if (!sortRoot?.contains(e.target)) closeOptions();
  });
  selectEl?.addEventListener('click', () => {
    const isOpen = optionsEl.style.display !== 'none';
    isOpen ? closeOptions() : openOptions();
  });
  const setSelectedLabel = mode => {
    if (!selectedValueEl) return;
    selectedValueEl.textContent = mode === 'titleAsc' ? 'A to Z' : mode === 'titleDesc' ? 'Z to A' : 'Randomized';
  };
  const setSelectedClass = mode => {
    optionsEl.querySelectorAll('.option').forEach(o => {
      o.classList.toggle('selected', o.getAttribute('data-value') === mode);
    });
  };

  // Base SSR enhancements (always root = document)
  const prefersReduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  (0,_dynamic_app_lib_documentObserver__WEBPACK_IMPORTED_MODULE_1__["default"])(prefersReduced, document);

  // Observer for color dynamics
  let altObs = null;
  const rearmAlt = () => {
    if (altObs) altObs.dispose();
    altObs = (0,_logic_dynamic_alt_observer__WEBPACK_IMPORTED_MODULE_2__.createSsrAltObserver)({
      rootElement: document,
      onActivate: alt1 => {
        const colors = _dynamic_app_lib_colorString__WEBPACK_IMPORTED_MODULE_3__.colorMapping2?.[alt1];
        if (typeof onColorChange === 'function' && colors) onColorChange(alt1, colors);
      },
      onDeactivate: () => {/* no-op */}
    });
  };
  const afterReorder = () => {
    // keep your transforms/images work
    (0,_dynamic_app_lib_documentObserver__WEBPACK_IMPORTED_MODULE_1__["default"])(true, document);
    (0,_dynamic_app_lib_documentObserver__WEBPACK_IMPORTED_MODULE_1__["default"])(false, document);

    // ensure observer tracks current nodes
    altObs?.rearm();

    // apply SortBy color from current DOM order according to viewport rule
    applySortChromeColorFromDomOrder(listContainer, sortRoot);

    // visible first
    upgradeVisibleImages(document);
    // and make sure the background queue is running for the rest
    upgradeAllImagesInBackground(document, 3);
  };

  // DOM-driven sort (seed-proof): use <img alt> from each card
  optionsEl.addEventListener('click', e => {
    const opt = e.target.closest('.option');
    if (!opt) return;
    const mode = opt.getAttribute('data-value') || 'random';
    const cards = Array.from(listContainer.querySelectorAll(SEL.card));
    let ordered;
    if (mode === 'random') {
      ordered = shuffleArray(cards);
    } else {
      ordered = [...cards].sort((a, b) => {
        const A = getAltFromCard(a);
        const B = getAltFromCard(b);
        return mode === 'titleAsc' ? compareAsc(A, B) : compareDesc(A, B);
      });
    }

    // apply to DOM + keep index-based classes in sync
    const frag = document.createDocumentFragment();
    ordered.forEach((el, newIndex) => {
      const idxClass = [...el.classList].find(c => /^custom-card-\d+$/.test(c));
      const oldIndex = idxClass ? parseInt(idxClass.split('-').pop(), 10) : -1;
      if (oldIndex !== -1 && oldIndex !== newIndex) retagIndexClasses(el, oldIndex, newIndex);
      frag.appendChild(el);
    });
    listContainer.appendChild(frag);
    setSelectedLabel(mode);
    setSelectedClass(mode);
    closeOptions();
    afterReorder();
  });

  // Recompute SortBy color on viewport resize (debounced)
  const onResize = debounce(() => {
    applySortChromeColorFromDomOrder(listContainer, sortRoot);
    upgradeVisibleImages(document);
    upgradeAllImagesInBackground(document, 3);
  }, 150);
  window.addEventListener('resize', onResize);

  // Preload only to finish bootstrapping; color is from DOM order (not preload)
  (0,_dynamic_app_preload_dynamic_app_route__WEBPACK_IMPORTED_MODULE_0__.ensureDynamicThemePreload)().finally(() => {
    rearmAlt();
    setSelectedLabel('random');
    setSelectedClass('random');
    // initial color from current DOM order
    applySortChromeColorFromDomOrder(listContainer, sortRoot);
    // visible images first
    upgradeVisibleImages(document);
    // then *everything else* via background queue
    upgradeAllImagesInBackground(document, 3);
  });

  // optional cleanup (enable if your route unmounts)
  // return () => { window.removeEventListener('resize', onResize); altObs?.dispose(); _bgCancel?.(); };
}

/***/ }),

/***/ "./src/ssr/logic/dynamic-alt-observer.ts":
/*!***********************************************!*\
  !*** ./src/ssr/logic/dynamic-alt-observer.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSsrAltObserver: () => (/* binding */ createSsrAltObserver),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// src/ssr/logic/dynamic-alt-observer.ts
// Instance-scoped alt observer (mirrors your working setupAltObserver)

function createSsrAltObserver({
  rootElement = document,
  minActiveRatio = 0.10,
  onActivate,
  onDeactivate
}) {
  if (typeof onActivate !== 'function') {
    throw new Error('createSsrAltObserver: onActivate callback is required');
  }

  // keep RAW alt (including trailing spaces), like the working version
  let currentlyActiveAlt = null;
  let highestVisibility = 0;
  let debounceTimeout = null;

  // 0..1 with 0.01 steps
  const thresholds = Array.from({
    length: 101
  }, (_, i) => i / 100);
  const getImageAlt = cardEl => {
    const img = cardEl.querySelector('.ui-image2') || cardEl.querySelector('.ui-image1');
    return img ? img.getAttribute('alt') : null; // DO NOT trim
  };

  // Core logic operates on a simplified EntryLike[] so we can reuse it
  const handleEntries = entries => {
    // most-visible first
    entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    entries.forEach(entry => {
      const element = entry.target;
      const alt = getImageAlt(element);
      if (alt == null) return;
      const visibility = entry.intersectionRatio;
      if (visibility > minActiveRatio && visibility > highestVisibility) {
        if (currentlyActiveAlt !== alt) {
          if (currentlyActiveAlt && typeof onDeactivate === 'function') {
            try {
              onDeactivate(currentlyActiveAlt);
            } catch {}
          }
          try {
            onActivate(alt);
          } catch {}
          currentlyActiveAlt = alt;
          highestVisibility = visibility;
        }
      } else if (visibility <= minActiveRatio && currentlyActiveAlt === alt) {
        if (typeof onDeactivate === 'function') {
          try {
            onDeactivate(alt);
          } catch {}
        }
        currentlyActiveAlt = null;
        highestVisibility = 0;
      }
    });
  };

  // Real IO -> adapt to EntryLike
  const io = new IntersectionObserver(entries => {
    const simplified = entries.map(e => ({
      target: e.target,
      intersectionRatio: e.intersectionRatio
    }));
    handleEntries(simplified);
  }, {
    root: null,
    rootMargin: '0px',
    threshold: thresholds
  });
  const observeAll = () => {
    const cards = rootElement.querySelectorAll('.card-container');
    cards.forEach(el => io.observe(el));
  };
  const triggerInitial = () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const cards = Array.from(rootElement.querySelectorAll('.card-container'));
      const viewportHeight = window.innerHeight;

      // Synthetic first-pass, like your working code
      const synthetic = cards.map(card => {
        const rect = card.getBoundingClientRect();
        const visibility = Math.max(0, Math.min(rect.height, viewportHeight - rect.top) / rect.height);
        return {
          target: card,
          intersectionRatio: visibility
        };
      });
      handleEntries(synthetic);
    }, 50);
  };

  // bootstrap
  observeAll();
  triggerInitial();
  return {
    dispose() {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      io.disconnect();
      currentlyActiveAlt = null;
      highestVisibility = 0;
    },
    rearm() {
      io.disconnect();
      observeAll();
      triggerInitial();
    },
    debugState() {
      return {
        currentlyActiveAlt,
        highestVisibility
      };
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSsrAltObserver);

/***/ }),

/***/ "./src/styles/dynamic-app/misc.css?raw":
/*!*********************************************!*\
  !*** ./src/styles/dynamic-app/misc.css?raw ***!
  \*********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/utils/context-providers/shadow-root-context.tsx":
/*!*************************************************************!*\
  !*** ./src/utils/context-providers/shadow-root-context.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShadowRootProvider: () => (/* binding */ ShadowRootProvider),
/* harmony export */   useShadowRoot: () => (/* binding */ useShadowRoot)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/utils/context-providers/shadow-root-context.tsx


const hasDOM = typeof document !== 'undefined';
const hasConstructedSheets = hasDOM && typeof globalThis.Document !== 'undefined' && 'adoptedStyleSheets' in Document.prototype && typeof globalThis.CSSStyleSheet !== 'undefined' && 'replaceSync' in CSSStyleSheet.prototype;
const isShadowRoot = node => typeof globalThis.ShadowRoot !== 'undefined' && node instanceof globalThis.ShadowRoot;
const ShadowRootContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
let warnedOnce = false;
const useShadowRoot = () => {
  const ctx = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ShadowRootContext);
  if (!ctx) {
    if (!warnedOnce) {
      // Dev-friendly, harmless in prod too; only once.
      console.warn('useShadowRoot called outside provider; falling back to document.');
      warnedOnce = true;
    }
    const injectStyle = (css, id) => {
      if (!hasDOM) return;
      const existing = document.head.querySelector(`style[data-style-id="${id}"]`);
      if (existing) return;
      const style = document.createElement('style');
      style.dataset.styleId = id;
      style.textContent = css;
      document.head.appendChild(style);
    };
    const injectLink = (href, id) => {
      if (!hasDOM) return;
      const selector = id ? `link[data-style-id="${id}"]` : `link[rel="stylesheet"][href="${href}"]`;
      if (document.head.querySelector(selector)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      if (id) link.dataset.styleId = id;
      document.head.appendChild(link);
    };
    const removeStyle = id => {
      if (!hasDOM) return;
      document.head.querySelector(`style[data-style-id="${id}"]`)?.remove();
    };
    return {
      getShadowRoot: () => null,
      injectStyle,
      injectLink,
      removeStyle
    };
  }
  return ctx;
};
function ShadowRootProvider({
  getShadowRoot,
  children
}) {
  // Cache constructed sheets per ID (per provider)
  const sheetCacheRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Map());
  const injectStyle = (css, id) => {
    const root = getShadowRoot();

    // If no shadow root, gracefully inject into document.head
    if (!isShadowRoot(root)) {
      if (!hasDOM) return;
      const existing = document.head.querySelector(`style[data-style-id="${id}"]`);
      if (existing) return;
      const style = document.createElement('style');
      style.dataset.styleId = id;
      style.textContent = css;
      document.head.appendChild(style);
      return;
    }

    // Shadow root path
    if (hasConstructedSheets) {
      let sheet = sheetCacheRef.current.get(id);
      if (!sheet) {
        sheet = new CSSStyleSheet();
        sheet.replaceSync(css);
        sheetCacheRef.current.set(id, sheet);
      }
      if (!root.adoptedStyleSheets.includes(sheet)) {
        root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
      }
      return;
    }

    // Fallback <style> in shadow root
    if (root.querySelector(`style[data-style-id="${id}"]`)) return;
    const style = document.createElement('style');
    style.textContent = css;
    style.dataset.styleId = id;
    root.appendChild(style);
  };
  const injectLink = (href, id) => {
    const root = getShadowRoot();

    // If no shadow root, use document.head
    if (!isShadowRoot(root)) {
      if (!hasDOM) return;
      const selector = id ? `link[data-style-id="${id}"]` : `link[rel="stylesheet"][href="${href}"]`;
      if (document.head.querySelector(selector)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      if (id) link.dataset.styleId = id;
      document.head.appendChild(link);
      return;
    }

    // Shadow root link injection
    const selector = id ? `link[data-style-id="${id}"]` : `link[rel="stylesheet"][href="${href}"]`;
    if (root.querySelector(selector)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    if (id) link.dataset.styleId = id;
    root.appendChild(link);
  };
  const removeStyle = id => {
    const root = getShadowRoot();

    // Remove from doc head if no shadow root
    if (!isShadowRoot(root)) {
      if (!hasDOM) return;
      document.head.querySelector(`style[data-style-id="${id}"]`)?.remove();
      return;
    }
    if (hasConstructedSheets) {
      const sheet = sheetCacheRef.current.get(id);
      if (sheet) {
        root.adoptedStyleSheets = root.adoptedStyleSheets.filter(s => s !== sheet);
      }
      return;
    }
    root.querySelector(`style[data-style-id="${id}"]`)?.remove();
  };
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ShadowRootContext.Provider, {
    value: {
      getShadowRoot,
      injectStyle,
      injectLink,
      removeStyle
    },
    children: children
  });
}

/***/ }),

/***/ "./src/utils/context-providers/style-injector.ts":
/*!*******************************************************!*\
  !*** ./src/utils/context-providers/style-injector.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useStyleInjection: () => (/* binding */ useStyleInjection)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shadow_root_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shadow-root-context */ "./src/utils/context-providers/shadow-root-context.tsx");
// src/utils/context-providers/style-injector.ts



// Augment Window locally so TS always sees the field here

// Safe handle to window (SSR-friendly)
const win = typeof window !== 'undefined' ? window : undefined;

// Global dedupe set (persisted on window between renders)
const globalStyleIds = (() => {
  if (!win) return new Set();
  if (!win.__DYNAMIC_STYLE_IDS__) win.__DYNAMIC_STYLE_IDS__ = new Set();
  return win.__DYNAMIC_STYLE_IDS__;
})();
const useStyleInjection = (css, id) => {
  const {
    injectStyle,
    getShadowRoot
  } = (0,_shadow_root_context__WEBPACK_IMPORTED_MODULE_1__.useShadowRoot)() || {};
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!id) {
      if (true) {
        console.warn('useStyleInjection: id is required for dedupe');
      }
      return;
    }
    const shadowRoot = getShadowRoot?.();
    const isInShadow = shadowRoot && shadowRoot !== document;
    if (isInShadow && injectStyle) {
      // Shadow DOM dedupe by ID
      if (!shadowRoot.querySelector(`style[data-style-id="${id}"]`)) {
        injectStyle(css, id); // provider handles DOM append
      }
      return;
    }

    // Global dedupe (memo + DOM check as a safety)
    if (!globalStyleIds.has(id)) {
      const existing = document.head.querySelector(`style[data-style-id="${id}"]`);
      if (!existing) {
        const styleEl = document.createElement('style');
        styleEl.textContent = css;
        styleEl.dataset.styleId = id;
        document.head.appendChild(styleEl);
      }
      globalStyleIds.add(id);
    }
  }, [css, id, injectStyle, getShadowRoot]);
};

/***/ })

};
;
//# sourceMappingURL=dynamic-app-ssr-app-dynamic-theme-route-tsx.server.js.map