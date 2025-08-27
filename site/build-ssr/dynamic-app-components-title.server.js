exports.id = "dynamic-app-components-title";
exports.ids = ["dynamic-app-components-title"];
exports.modules = {

/***/ "./src/dynamic-app/components/title.jsx":
/*!**********************************************!*\
  !*** ./src/dynamic-app/components/title.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_context_providers_style_injector_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/context-providers/style-injector.ts */ "./src/utils/context-providers/style-injector.ts");
/* harmony import */ var _styles_dynamic_app_title_css_raw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/dynamic-app/title.css?raw */ "./src/styles/dynamic-app/title.css?raw");
/* harmony import */ var _styles_dynamic_app_title_css_raw__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_title_css_raw__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// TitleDivider component (no flicker on enter/leave)




const isTriplet = v => Array.isArray(v) && v.length === 3 && v.every(x => typeof x === 'string');
const TitleDivider = ({
  svgIcon,
  movingTextColors,
  pauseAnimation
}) => {
  (0,_utils_context_providers_style_injector_ts__WEBPACK_IMPORTED_MODULE_1__.useStyleInjection)((_styles_dynamic_app_title_css_raw__WEBPACK_IMPORTED_MODULE_2___default()), 'dynamic-app-style-title');

  // ----- visibility of this component -----
  const rootRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [isVisible, setIsVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setIsVisible(!!entry.isIntersecting), {
      threshold: 0.01
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ----- stable palette that only changes when visible -----
  const defaultTriplet = ['#70c6b0', '#5670b5', '#50b0c5'];
  const incoming = isTriplet(movingTextColors) ? movingTextColors : defaultTriplet;
  const [stableColors, setStableColors] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(incoming);
  const pendingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // shallow compare helper
  const sameTriplet = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

  // When palette prop changes: apply immediately if visible, else stash it.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isTriplet(incoming)) return;
    if (isVisible) {
      setStableColors(prev => sameTriplet(prev, incoming) ? prev : incoming);
      pendingRef.current = null;
    } else {
      // hold for later to avoid flicker while hidden
      pendingRef.current = incoming;
    }
  }, [incoming, isVisible]);

  // When we become visible, commit any pending palette once.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isVisible && pendingRef.current && !sameTriplet(stableColors, pendingRef.current)) {
      setStableColors(pendingRef.current);
      pendingRef.current = null;
    }
  }, [isVisible, stableColors]);

  // ----- brightness adjust + smooth transition -----
  const adjustBrightness = (hex, mul) => {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return hex;
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.min(255, Math.max(0, Math.floor(r * mul)));
    g = Math.min(255, Math.max(0, Math.floor(g * mul)));
    b = Math.min(255, Math.max(0, Math.floor(b * mul)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  const colors = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => [adjustBrightness(stableColors[0], 1.05), adjustBrightness(stableColors[1], 1.25), adjustBrightness(stableColors[2], 1.10)], [stableColors]);
  const textSegments = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => [{
    text: 'Institute Gallery',
    suffix: ''
  }, {
    text: 'Dyna',
    suffix: 'mic Media'
  }, {
    text: 'Dyn',
    suffix: 'mic Media'
  }], []);
  const renderMovingContent = (repeatCount = 2) => [...Array(repeatCount)].flatMap((_, repeatIndex) => textSegments.map((segment, i) => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
    className: "moving-text",
    style: {
      color: colors[i],
      transition: 'color 120ms linear'
    },
    children: [segment.text, (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "logo-container",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "svg-icon"
        // If your injected SVG respects currentColor, you could instead set color here.
        ,
        style: {
          fill: colors[i],
          transition: 'fill 120ms linear'
        },
        dangerouslySetInnerHTML: {
          __html: svgIcon
        }
      })
    }), segment.suffix]
  }, `${repeatIndex}-${i}`)));
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "title-container",
    ref: rootRef,
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "static-title",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h1", {
        children: "MassArt 2024"
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: `moving-title ${pauseAnimation ? 'paused' : ''}`,
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h1", {
        className: "title-with-icon moving-text-wrapper",
        children: renderMovingContent()
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TitleDivider);

/***/ }),

/***/ "./src/styles/dynamic-app/title.css?raw":
/*!**********************************************!*\
  !*** ./src/styles/dynamic-app/title.css?raw ***!
  \**********************************************/
/***/ (() => {



/***/ })

};
;
//# sourceMappingURL=dynamic-app-components-title.server.js.map