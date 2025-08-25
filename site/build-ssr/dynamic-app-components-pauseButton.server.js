"use strict";
exports.id = "dynamic-app-components-pauseButton";
exports.ids = ["dynamic-app-components-pauseButton"];
exports.modules = {

/***/ "./src/dynamic-app/components/pauseButton.jsx":
/*!****************************************************!*\
  !*** ./src/dynamic-app/components/pauseButton.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lottie_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lottie-react */ "lottie-react");
/* harmony import */ var lottie_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lottie_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lottie_pauseButton_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lottie/pauseButton.json */ "./src/dynamic-app/lottie/pauseButton.json");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
/* Pause Animation Option - Accessibility */

 // Import Lottie React
 // Import your JSON animation

const PauseButton = ({
  toggleP5Animation
}) => {
  const lottieRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(); // Ref for Lottie animation
  const [isClicked, setIsClicked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false); // Track click state
  const [currentFrame, setCurrentFrame] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(3); // Start at frame 3

  // Sync initial state with the fireworks rendering logic
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (toggleP5Animation) {
      toggleP5Animation(!isClicked); // Initial sync
    }
  }, [toggleP5Animation, isClicked]);
  const handleMouseEnter = () => {
    if (lottieRef.current && !isClicked) {
      // Play the animation from frame 3 to frame 10 on hover
      lottieRef.current.playSegments([3, 10], true);
    }
  };
  const handleMouseLeave = () => {
    if (lottieRef.current && !isClicked) {
      // Pause the animation and leave it at the last hovered frame
      lottieRef.current.goToAndStop(currentFrame, true);
    }
  };
  const handleClick = event => {
    event.stopPropagation(); // Prevent the event from reaching parent components

    if (lottieRef.current) {
      let targetFrame = isClicked ? 3 : 20; // Toggle between frames
      lottieRef.current.playSegments([currentFrame, targetFrame], true);
      setCurrentFrame(targetFrame);
      setIsClicked(!isClicked);

      // Notify the parent about the toggle
      if (toggleP5Animation) {
        toggleP5Animation(!isClicked);
      }
    }
  };
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "lottie-container",
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick // Trigger click behavior
    ,
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((lottie_react__WEBPACK_IMPORTED_MODULE_1___default()), {
      lottieRef: lottieRef,
      animationData: _lottie_pauseButton_json__WEBPACK_IMPORTED_MODULE_2__,
      loop: false // Disable looping
      ,
      autoplay: false // Start paused
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PauseButton);

/***/ }),

/***/ "./src/dynamic-app/lottie/pauseButton.json":
/*!*************************************************!*\
  !*** ./src/dynamic-app/lottie/pauseButton.json ***!
  \*************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"v":"5.12.1","fr":30,"ip":0,"op":20,"w":1024,"h":1024,"nm":"PauseButton","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[550.752,510.464,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":0,"s":[112,112,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,1.147]},"t":5,"s":[112,112,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,2.855]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":9,"s":[117,117,100]},{"t":10,"s":[112,112,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-42,-167],[-129,-167],[-129,169],[-42,169],[-41.917,2.38]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":10,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-42,-167],[-129,-167],[-129,169],[-42,169],[-41.917,2.38]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":15.333,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-27.778,-125.889],[-129,-167],[-129,169],[-27.556,128.333],[46.165,1.794]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":16,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-26,-120.75],[-129,-167],[-129,169],[-25.75,121.583],[57.175,1.721]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":16.667,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-24.222,-115.611],[-129,-167],[-129,169],[-23.111,116.361],[68.185,1.647]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":17.333,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-22.444,-110.472],[-129,-167],[-129,169],[-21.889,111.222],[79.195,1.574]],"c":true}]},{"t":20,"s":[{"i":[[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-15.333,-89.917],[-129,-167],[-129,169],[-14.917,92.75],[123.236,1.281]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0.760784327984,0.760784327984,0.760784327984,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":2,"s":[0.760784327984,0.760784327984,0.760784327984,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":9,"s":[0.270588248968,0.270588248968,0.270588248968,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":10,"s":[0.956862747669,0.956862747669,0.956862747669,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":11,"s":[1,1,1,1]},{"t":20,"s":[0.956862747669,0.956862747669,0.956862747669,1]}],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[120,120],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-42,-167],[-129,-167],[-129,169],[-42,169]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":10,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-42,-167],[-129,-167],[-129,169],[-42,169]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":13.333,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-13.667,-32.833],[-91.5,-86.583],[-91.917,78.583],[-13.667,34.833]],"c":true}]},{"t":20,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-23.667,-12],[-83.583,-59.917],[-81.5,61.083],[-24.5,15.667]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0.760784327984,0.760784327984,0.760784327984,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":2,"s":[0.760784327984,0.760784327984,0.760784327984,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":9,"s":[0.270588248968,0.270588248968,0.270588248968,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":10,"s":[0.956862747669,0.956862747669,0.956862747669,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":11,"s":[1,1,1,1]},{"t":20,"s":[0.956862747669,0.956862747669,0.956862747669,1]}],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[136,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[120,120],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":10,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":18,"s":[100]},{"t":20,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 2","np":3,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"rd","nm":"Round Corners 1","r":{"a":0,"k":59,"ix":1},"ix":3,"mn":"ADBE Vector Filter - RC","hd":false}],"ip":0,"op":20,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[510,514,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":0,"s":[100,100,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,-0.758]},"t":5,"s":[100,100,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.242]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":9,"s":[105,105,100]},{"t":10,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1028,1028],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"r":{"a":0,"k":200,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect","hd":false},{"ty":"st","c":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0.760784327984,0.760784327984,0.760784327984,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":2,"s":[0.760784327984,0.760784327984,0.760784327984,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":9,"s":[0.270588368177,0.270588368177,0.270588368177,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":10,"s":[0.956862745098,0.956862745098,0.956862745098,1]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":11,"s":[1,1,1,1]},{"t":20,"s":[0.956862747669,0.956862747669,0.956862747669,1]}],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[135]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":5,"s":[135]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":9,"s":[115]},{"t":10,"s":[135]}],"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[2,-2],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[79,79],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":20,"st":0,"ct":1,"bm":0}],"markers":[],"props":{}}');

/***/ })

};
;
//# sourceMappingURL=dynamic-app-components-pauseButton.server.js.map