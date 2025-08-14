exports.id = "src_components_block-type-1_rotary-lamp_tsx";
exports.ids = ["src_components_block-type-1_rotary-lamp_tsx"];
exports.modules = {

/***/ "./src/components/block-type-1/rotary-lamp.tsx":
/*!*****************************************************!*\
  !*** ./src/components/block-type-1/rotary-lamp.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RotaryLamp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_get_project_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/get-project-data */ "./src/utils/get-project-data.ts");
/* harmony import */ var _utils_split_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/split-controller */ "./src/utils/split-controller.tsx");
/* harmony import */ var _utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/media-providers/media-loader */ "./src/utils/media-providers/media-loader.tsx");
/* harmony import */ var _utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/tooltip/tooltipInit */ "./src/utils/tooltip/tooltipInit.ts");
/* harmony import */ var _styles_block_type_1_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/block-type-1.css */ "./src/styles/block-type-1.css");
/* harmony import */ var _styles_block_type_1_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_block_type_1_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// RotaryLamp.tsx







function RotaryLamp() {
  const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [split, setSplit] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => window.innerWidth < 768 ? 55 : 50);
  const [isPortrait, setIsPortrait] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(window.innerHeight > window.innerWidth);
  (0,_utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_4__.useTooltipInit)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    (0,_utils_get_project_data__WEBPACK_IMPORTED_MODULE_1__.getProjectData)('rotary-lamp').then(d => setData(d));
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', onResize, {
      passive: true
    });
    return () => window.removeEventListener('resize', onResize);
  }, []);
  if (!data) return null;
  const media1 = isPortrait ? data.mediaOne : data.mediaTwo;
  const media2 = isPortrait ? data.mediaTwo : data.mediaOne;
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("section", {
    className: "block-type-1",
    id: "no-ssr",
    style: {
      position: 'relative'
    },
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "media-content-1",
      style: isPortrait ? {
        height: split <= 20 ? '0%' : `${split}%`,
        width: '100%',
        position: 'absolute',
        top: 0,
        transition: split <= 20 ? 'height 0.1s ease' : 'none'
      } : {
        width: `${split}%`,
        height: '100%',
        position: 'absolute',
        left: 0
      },
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
        type: "image",
        src: media1.image,
        alt: media1.alt || 'Rotary Lamp media',
        id: "rotary-media-1",
        className: "media-item-1 tooltip-rotary-lamp"
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_utils_split_controller__WEBPACK_IMPORTED_MODULE_2__["default"], {
      split: split,
      setSplit: setSplit
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "media-content-2",
      style: isPortrait ? {
        height: split <= 20 ? '100%' : `${100 - split}%`,
        width: '100%',
        position: 'absolute',
        top: split <= 20 ? '0%' : `${split}%`,
        transition: split <= 20 ? 'height 0.1s ease, top 0.1s ease' : 'none'
      } : {
        width: `${100 - split}%`,
        height: '100%',
        position: 'absolute',
        left: `${split}%`
      },
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
        type: media2?.video?.asset?.url ? 'video' : 'image',
        src: media2?.video?.asset?.url || media2.image,
        alt: media2.alt || 'Rotary Lamp media',
        id: "rotary-media-2",
        className: "media-item-2 tooltip-rotary-lamp"
      })
    })]
  });
}

/***/ }),

/***/ "./src/styles/block-type-1.css":
/*!*************************************!*\
  !*** ./src/styles/block-type-1.css ***!
  \*************************************/
/***/ (() => {



/***/ })

};
;
//# sourceMappingURL=src_components_block-type-1_rotary-lamp_tsx.server.js.map