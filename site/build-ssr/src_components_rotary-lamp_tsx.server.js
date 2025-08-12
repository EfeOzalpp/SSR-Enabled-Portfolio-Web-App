"use strict";
exports.id = "src_components_rotary-lamp_tsx";
exports.ids = ["src_components_rotary-lamp_tsx"];
exports.modules = {

/***/ "./src/components/rotary-lamp.tsx":
/*!****************************************!*\
  !*** ./src/components/rotary-lamp.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_sanity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sanity */ "./src/utils/sanity.ts");
/* harmony import */ var _utils_split_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/split-controller */ "./src/utils/split-controller.tsx");
/* harmony import */ var _utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/media-providers/media-loader */ "./src/utils/media-providers/media-loader.tsx");
/* harmony import */ var _utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/tooltip/tooltipInit */ "./src/utils/tooltip/tooltipInit.ts");
/* harmony import */ var _utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/context-providers/ssr-data-context */ "./src/utils/context-providers/ssr-data-context.tsx");
/* harmony import */ var _styles_block_type_1_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/block-type-1.css */ "./src/styles/block-type-1.css");
/* harmony import */ var _styles_block_type_1_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_block_type_1_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/sections/RotaryLamp.tsx








const RotaryLamp = () => {
  const ssrData = (0,_utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_5__.useSsrData)();
  const preloaded = ssrData?.preloaded?.rotary; // assuming you key it as "rotary"

  const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(preloaded || null);
  const [split, setSplit] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => window.innerWidth < 768 ? 55 : 50);
  const [isPortrait, setIsPortrait] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(window.innerHeight > window.innerWidth);
  (0,_utils_tooltip_tooltipInit__WEBPACK_IMPORTED_MODULE_4__.useTooltipInit)();

  // Fetch only if SSR data wasn't provided
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (data) return;
    const fetchData = async () => {
      const res = await _utils_sanity__WEBPACK_IMPORTED_MODULE_1__["default"].fetch(`
        *[_type == "mediaBlock" && title match "Rotary Lamp"][0]{
          mediaOne {
            alt,
            image,
            video { asset->{url} }
          },
          mediaTwo {
            alt,
            image,
            video { asset->{url} }
          }
        }
      `);
      setData(res);
    };
    fetchData();
  }, [data]);

  // Handle orientation switch
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  if (!data) return null;
  const media1 = isPortrait ? data.mediaOne : data.mediaTwo;
  const media2 = isPortrait ? data.mediaTwo : data.mediaOne;
  const alt1 = media1?.alt || 'Rotary Lamp media';
  const alt2 = media2?.alt || 'Rotary Lamp media';
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("section", {
    className: "block-type-1",
    style: {
      position: 'relative'
    },
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
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
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
        type: "image",
        src: media1?.image,
        alt: alt1,
        id: "rotary-media-1",
        className: "media-item-1 tooltip-rotary-lamp"
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_utils_split_controller__WEBPACK_IMPORTED_MODULE_2__["default"], {
      split: split,
      setSplit: setSplit
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
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
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
        type: media2?.video?.asset?.url ? 'video' : 'image',
        src: media2?.video?.asset?.url || media2?.image,
        alt: alt2,
        id: "rotary-media-2",
        className: "media-item-2 tooltip-rotary-lamp"
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RotaryLamp);

/***/ })

};
;
//# sourceMappingURL=src_components_rotary-lamp_tsx.server.js.map