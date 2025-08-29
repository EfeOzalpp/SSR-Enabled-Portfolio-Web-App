"use strict";
exports.id = "focused-details";
exports.ids = ["focused-details"];
exports.modules = {

/***/ "./src/components/case-studies/FocusedDetails.tsx":
/*!********************************************************!*\
  !*** ./src/components/case-studies/FocusedDetails.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FocusedDetails)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");


function FocusedDetails({
  title
}) {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("section", {
    style: {
      height: '140dvh',
      width: '100%',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--focused-bg, #1c1c1c)',
      color: 'white'
    },
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      style: {
        maxWidth: 900,
        textAlign: 'center'
      },
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
        style: {
          fontSize: 'clamp(28px, 4vw, 54px)',
          margin: 0
        },
        children: title ?? 'Focused Details'
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        style: {
          opacity: 0.75,
          marginTop: 12
        },
        children: "Drop richer content here later; this block is code-split and only mounts when focused."
      })]
    })
  });
}

/***/ })

};
;
//# sourceMappingURL=focused-details.server.js.map