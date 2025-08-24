"use strict";
exports.id = "dynamic-app-ssr-app-dynamic-theme-route-jsx";
exports.ids = ["dynamic-app-ssr-app-dynamic-theme-route-jsx"];
exports.modules = {

/***/ "./src/dynamic-app/lib/fetchSVGIcons.js":
/*!**********************************************!*\
  !*** ./src/dynamic-app/lib/fetchSVGIcons.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fetchSVGIcons)
/* harmony export */ });
/* harmony import */ var _utils_sanity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/sanity */ "./src/utils/sanity.ts");
/* Fetch SVG icons */

async function fetchSVGIcons() {
  const query = `*[_type == "svgIcon"]{
    title,
    icon,                         // inline SVG string (portable text / string)
    "url": file.asset->url        // optional file URL if present in schema
  }`;
  const icons = await _utils_sanity__WEBPACK_IMPORTED_MODULE_0__["default"].fetch(query);
  return icons;
}

/***/ }),

/***/ "./src/dynamic-app/lib/fetchUser.js":
/*!******************************************!*\
  !*** ./src/dynamic-app/lib/fetchUser.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchImages: () => (/* binding */ fetchImages)
/* harmony export */ });
/* harmony import */ var _utils_sanity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/sanity */ "./src/utils/sanity.ts");
// lib/fetchUser.ts

const fetchImages = async (sortOption = 'default') => {
  let orderClause = '';
  switch (sortOption) {
    case 'titleAsc':
      orderClause = '| order(title asc)';
      break;
    case 'titleDesc':
      orderClause = '| order(title desc)';
      break;
    case 'dateAsc':
      orderClause = '| order(_createdAt asc)';
      break;
    case 'dateDesc':
      orderClause = '| order(_createdAt desc)';
      break;
  }
  const query = `*[_type == "imageAsset"] ${orderClause} {
    _id,
    title,
    description,
    image1,         // keep full Sanity image object
    image2,         // same
    caption1,
    alt1,
    alt2,
    iconName
  }`;
  try {
    const data = await _utils_sanity__WEBPACK_IMPORTED_MODULE_0__["default"].fetch(query);
    return data; // pass raw; AppMedia will render responsively
  } catch (error) {
    console.error('Error fetching images', error);
    return [];
  }
};

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

/***/ "./src/dynamic-app/ssr-app/dynamic-theme.route.jsx":
/*!*********************************************************!*\
  !*** ./src/dynamic-app/ssr-app/dynamic-theme.route.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DynamicThemeRoute)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @loadable/component */ "./node_modules/@loadable/component/dist/cjs/loadable.cjs.js");
/* harmony import */ var _utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/context-providers/ssr-data-context */ "./src/utils/context-providers/ssr-data-context.tsx");
/* harmony import */ var _preload_dynamic_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ..//preload-dynamic-app */ "./src/dynamic-app/preload-dynamic-app.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");





// Load the existing client page (no SSR false flag here)

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
  importAsync: () => Promise.all(/*! import() | DynamicTheme-jsx */[__webpack_require__.e("src_utils_loading_loading_tsx"), __webpack_require__.e("src_utils_media-providers_media-loader_tsx"), __webpack_require__.e("src_dynamic-app_components_IntroOverlay_jsx-src_dynamic-app_components_fireworksDisplay_jsx-s-73dd24"), __webpack_require__.e("DynamicTheme-jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../DynamicTheme.jsx */ "./src/DynamicTheme.jsx")),
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
  ssr: false
});
function DynamicThemeRoute() {
  // If your server provided preloaded data, push it into the shared cache
  const ssr = (0,_utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_2__.useSsrData)();
  const preload = ssr?.preloaded?.dynamicTheme; // { icons, images } if your server sets it

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (preload) (0,_preload_dynamic_app__WEBPACK_IMPORTED_MODULE_3__.primeFromSSR)(preload);
  }, [preload]);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(DynamicTheme, {});
}

/***/ })

};
;
//# sourceMappingURL=dynamic-app-ssr-app-dynamic-theme-route-jsx.server.js.map