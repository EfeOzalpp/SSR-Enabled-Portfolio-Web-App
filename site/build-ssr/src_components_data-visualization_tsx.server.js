"use strict";
exports.id = "src_components_data-visualization_tsx";
exports.ids = ["src_components_data-visualization_tsx"];
exports.modules = {

/***/ "./src/components/data-visualization.tsx":
/*!***********************************************!*\
  !*** ./src/components/data-visualization.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_sanity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sanity */ "./src/utils/sanity.ts");
/* harmony import */ var _utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/media-providers/media-loader */ "./src/utils/media-providers/media-loader.tsx");
/* harmony import */ var _utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/tooltip/tooltipInit */ "./src/utils/tooltip/tooltipInit.ts");
/* harmony import */ var _utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/context-providers/ssr-data-context */ "./src/utils/context-providers/ssr-data-context.tsx");
/* harmony import */ var _styles_block_type_1_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/block-type-1.css */ "./src/styles/block-type-1.css");
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

/***/ })

};
;
//# sourceMappingURL=src_components_data-visualization_tsx.server.js.map