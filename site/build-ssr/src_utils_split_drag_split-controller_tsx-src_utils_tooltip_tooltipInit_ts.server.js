exports.id = "src_utils_split_drag_split-controller_tsx-src_utils_tooltip_tooltipInit_ts";
exports.ids = ["src_utils_split_drag_split-controller_tsx-src_utils_tooltip_tooltipInit_ts"];
exports.modules = {

/***/ "./src/ssr/logic/apply-split-style.ts":
/*!********************************************!*\
  !*** ./src/ssr/logic/apply-split-style.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MIN_PORTRAIT_SPLIT: () => (/* binding */ MIN_PORTRAIT_SPLIT),
/* harmony export */   PORTRAIT_MIN_RULES: () => (/* binding */ PORTRAIT_MIN_RULES),
/* harmony export */   applySplitStyle: () => (/* binding */ applySplitStyle),
/* harmony export */   getPortraitMinSplit: () => (/* binding */ getPortraitMinSplit)
/* harmony export */ });
// One place to control the portrait floor, with a special rule for 768–1024.
const PORTRAIT_MIN_RULES = [{
  maxWidth: 767,
  value: 16
},
// phones
{
  maxWidth: 1024,
  value: 12
},
// tablets (your 768–1024 window)
{
  maxWidth: Infinity,
  value: 20
} // anything larger in portrait
];

// Legacy name kept so existing imports won't break.
// It is only used as a default when no window width exists (very rare here).
const MIN_PORTRAIT_SPLIT = 18;

// Tiny hysteresis used inside this module for snap animations.
const EPS = 0.25;

// Exported helper so client/non-SSR components can compute the same value.
function getPortraitMinSplit(viewportWidth) {
  const vw = typeof viewportWidth === 'number' && isFinite(viewportWidth) ? viewportWidth : 1024;
  for (const rule of PORTRAIT_MIN_RULES) {
    if (vw <= rule.maxWidth) return rule.value;
  }
  return PORTRAIT_MIN_RULES[PORTRAIT_MIN_RULES.length - 1].value;
}

/**
 * Apply split to two absolutely-positioned media containers.
 * Back-compat signature; optional 4th param lets callers pin a min floor explicitly.
 */
function applySplitStyle(split, isPortrait, ids, explicitMinPortrait) {
  const media1 = document.getElementById(ids.m1);
  const media2 = document.getElementById(ids.m2);
  if (!media1 || !media2) return;
  const sClamped = Math.max(0, Math.min(100, split));
  media1.style.position = 'absolute';
  media2.style.position = 'absolute';
  if (isPortrait) {
    const minPortrait = typeof explicitMinPortrait === 'number' ? explicitMinPortrait : getPortraitMinSplit(typeof window !== 'undefined' ? window.innerWidth : undefined);
    const TOP = minPortrait;
    const BOTTOM = 100 - minPortrait;

    // clamp into the rails so the handle can't hide completely
    const s = Math.max(TOP, Math.min(BOTTOM, sClamped));

    // common portrait rails
    media1.style.left = '0';
    media1.style.width = '100%';
    media2.style.left = '0';
    media2.style.width = '100%';
    media1.style.top = '0';
    if (s <= TOP + EPS) {
      // collapse TOP
      media1.style.height = '0%';
      media1.style.transition = 'height 0.1s ease';
      media2.style.top = '0%';
      media2.style.height = '100%';
      media2.style.transition = 'height 0.1s ease, top 0.1s ease';
    } else if (s >= BOTTOM - EPS) {
      // collapse BOTTOM
      media1.style.height = '100%';
      media1.style.transition = 'height 0.1s ease';
      media2.style.top = '100%';
      media2.style.height = '0%';
      media2.style.transition = 'height 0.1s ease, top 0.1s ease';
    } else {
      // normal split
      media1.style.height = `${s}%`;
      media1.style.transition = 'none';
      media2.style.top = `${s}%`;
      media2.style.height = `${100 - s}%`;
      media2.style.transition = 'none';
    }
  } else {
    // landscape unchanged
    media1.style.top = '0';
    media1.style.height = '100%';
    media2.style.top = '0';
    media2.style.height = '100%';
    media1.style.left = '0';
    media1.style.width = `${sClamped}%`;
    media2.style.left = `${sClamped}%`;
    media2.style.width = `${100 - sClamped}%`;
  }
}

/***/ }),

/***/ "./src/styles/tooltip.css":
/*!********************************!*\
  !*** ./src/styles/tooltip.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "./src/svg/arrow2.json":
/*!*****************************!*\
  !*** ./src/svg/arrow2.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"v":"5.12.1","fr":30,"ip":0,"op":90,"w":440,"h":284,"nm":"arrow2","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Layer 11 Outlines","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[219.975,141.702,0],"ix":2,"l":2},"a":{"a":0,"k":[219.975,141.702,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-219.975,141.702],[219.975,141.702],[219.975,-141.702],[-219.975,-141.702]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-219.975,-141.702],[219.975,-141.702],[219.975,141.702],[-219.975,141.702]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-0.095,-53.999],[17.506,-53.999],[17.506,-108.001],[-0.095,-108.001]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"mm","mm":1,"nm":"Merge Paths 1","mn":"ADBE Vector Filter - Merge","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[219.975,141.702],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":22,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":68,"s":[100]},{"t":70,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-8.801,26.998],[8.8,26.998],[8.8,-26.998],[-8.801,-26.998]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[211.065,114.702],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":16,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":18,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":62,"s":[100]},{"t":64,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-219.975,141.702],[219.975,141.702],[219.975,-141.702],[-219.975,-141.702]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-219.975,-141.702],[219.975,-141.702],[219.975,141.702],[-219.975,141.702]],"c":true},"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ind":2,"ty":"sh","ix":3,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-0.095,54.003],[17.506,54.003],[17.506,0.841],[-0.095,0.841]],"c":true},"ix":2},"nm":"Path 3","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"mm","mm":1,"nm":"Merge Paths 1","mn":"ADBE Vector Filter - Merge","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[219.975,141.702],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":10,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":12,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":60,"s":[100]},{"t":62,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":5,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-8.8,27.001],[8.801,27.001],[8.801,-27.002],[-8.8,-27.002]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[211.087,222.701],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":4,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":6,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":58,"s":[100]},{"t":60,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 4","np":4,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[17.635,-9],[-17.635,-9],[-17.635,9],[17.635,9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[26.299,141.702],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 5","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-17.605,9],[17.605,9],[17.605,-9],[-17.605,-9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[343.43,87.703],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 22","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[219.975,141.702],"ix":2},"a":{"a":0,"k":[219.975,141.702],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":22,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":56,"s":[100]},{"t":58,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 24","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[8.869,-9],[-8.869,-9],[-8.869,9],[8.869,9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[52.589,123.7],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 6","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-17.635,9],[17.634,9],[17.634,-9],[-17.635,-9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[413.651,141.702],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 14","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[219.975,141.702],"ix":2},"a":{"a":0,"k":[219.975,141.702],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":18,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":20,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":54,"s":[100]},{"t":56,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 30","np":2,"cix":2,"bm":0,"ix":6,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-26.595,9],[-26.595,3],[-26.595,-3],[-26.595,-9],[26.595,-9],[26.595,9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[140.52,213.701],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 7","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[8.707,-9],[8.707,-3],[8.707,3],[8.707,9],[-8.707,9],[-8.707,3],[-8.707,-3],[-8.707,-9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[369.737,177.702],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 19","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[219.975,141.702],"ix":2},"a":{"a":0,"k":[219.975,141.702],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":16,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":18,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":52,"s":[100]},{"t":54,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 26","np":2,"cix":2,"bm":0,"ix":7,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-17.495,9],[-17.495,3],[-17.495,-3],[-17.495,-9],[17.495,-9],[17.495,9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[149.32,69.702],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":14,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":16,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":50,"s":[100]},{"t":52,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 8","np":4,"cix":2,"bm":0,"ix":8,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-8.786,9],[-8.786,3],[-8.786,-3],[-8.786,-9],[8.786,-9],[8.786,9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[123.138,78.702],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 9","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-8.869,9],[8.869,9],[8.869,-9],[-8.869,-9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[387.361,159.703],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 15","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[219.975,141.702],"ix":2},"a":{"a":0,"k":[219.975,141.702],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":12,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":14,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":48,"s":[100]},{"t":50,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 29","np":2,"cix":2,"bm":0,"ix":9,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[-8.707,9],[-8.707,3],[-8.707,-3],[-8.707,-9],[8.707,-9],[8.707,-3],[8.707,3],[8.707,9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[70.213,105.701],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 10","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[26.595,-9],[26.595,-3],[26.595,3],[26.595,9],[-26.595,9],[-26.595,-9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[299.43,69.702],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 16","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[219.975,141.702],"ix":2},"a":{"a":0,"k":[219.975,141.702],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":10,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":12,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":46,"s":[100]},{"t":48,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 28","np":2,"cix":2,"bm":0,"ix":10,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[3.18,-3.26],[0,-4.97],[0,0],[-8.68,8.68],[-2.38,0],[0,0]],"o":[[-3.19,3.25],[0,0],[0,-2.13],[9.47,-9.47],[0,0],[-4.86,0]],"v":[[5.16,5.415],[0,18.135],[-17.6,18.135],[-8.8,-8.665],[17.6,-17.865],[17.6,0.135]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[96.636,87.567],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 11","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[17.495,-9],[17.495,-3],[17.495,3],[17.495,9],[-17.495,9],[-17.495,-9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[290.63,213.702],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 17","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[219.975,141.702],"ix":2},"a":{"a":0,"k":[219.975,141.702],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":8,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":10,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":44,"s":[100]},{"t":46,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 23","np":2,"cix":2,"bm":0,"ix":11,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[9.47,9.47],[0,2.13],[0,0],[-3.19,-3.25],[-4.86,0],[0,0]],"o":[[-8.68,-8.68],[0,0],[0,4.97],[3.18,3.26],[0,0],[-2.38,0]],"v":[[-8.8,8.665],[-17.6,-18.135],[0,-18.135],[5.16,-5.415],[17.6,-0.135],[17.6,17.865]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[61.32,168.833],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 12","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[8.787,-9],[8.787,-3],[8.787,3],[8.787,9],[-8.786,9],[-8.786,-9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[316.812,204.702],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 18","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[219.975,141.702],"ix":2},"a":{"a":0,"k":[219.975,141.702],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":6,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":8,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":42,"s":[100]},{"t":44,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 27","np":2,"cix":2,"bm":0,"ix":12,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[17.605,-9],[-17.605,-9],[-17.605,9],[17.605,9]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[96.52,195.7],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 13","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-3.18,3.26],[0,4.97],[0,0],[8.68,-8.68],[2.38,0],[0,0]],"o":[[3.19,-3.25],[0,0],[0,2.13],[-9.47,9.47],[0,0],[4.86,0]],"v":[[-5.16,-5.415],[0,-18.135],[17.6,-18.135],[8.8,8.665],[-17.6,17.865],[-17.6,-0.135]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[343.314,195.836],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 20","np":4,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[219.975,141.702],"ix":2},"a":{"a":0,"k":[219.975,141.702],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":4,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":6,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":64,"s":[100]},{"t":66,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 25","np":2,"cix":2,"bm":0,"ix":13,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-9.47,-9.47],[0,-2.13],[0,0],[3.19,3.25],[4.86,0],[0,0]],"o":[[8.68,8.68],[0,0],[0,-4.97],[-3.18,-3.26],[0,0],[2.38,0]],"v":[[8.8,-8.665],[17.6,18.135],[0,18.135],[-5.16,5.415],[-17.6,0.135],[-17.6,-17.865]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[378.63,114.571],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":2,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":4,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":66,"s":[100]},{"t":68,"s":[0]}],"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 21","np":4,"cix":2,"bm":0,"ix":14,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":90,"st":0,"ct":1,"bm":0}],"markers":[],"props":{}}');

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

/***/ "./src/utils/context-providers/project-context.tsx":
/*!*********************************************************!*\
  !*** ./src/utils/context-providers/project-context.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectVisibilityProvider: () => (/* binding */ ProjectVisibilityProvider),
/* harmony export */   useProjectVisibility: () => (/* binding */ useProjectVisibility)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");


const ProjectVisibilityContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);
const ProjectVisibilityProvider = ({
  children
}) => {
  const [activeProject, setActiveProject] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined);
  const [blockGClick, setBlockGClick] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [isDragging, setIsDragging] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [focusedProjectKey, setFocusedProjectKey] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [previousScrollY, setPreviousScrollY] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const scrollContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ProjectVisibilityContext.Provider, {
    value: {
      activeProject,
      setActiveProject,
      blockGClick,
      setBlockGClick,
      currentIndex,
      setCurrentIndex,
      scrollContainerRef,
      isDragging,
      setIsDragging,
      focusedProjectKey,
      setFocusedProjectKey,
      previousScrollY,
      setPreviousScrollY
    },
    children: children
  });
};
const useProjectVisibility = () => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ProjectVisibilityContext);
  if (!context) {
    throw new Error('useProjectVisibility must be used within ProjectVisibilityProvider');
  }
  return context;
};

/***/ }),

/***/ "./src/utils/split+drag/split-controller.tsx":
/*!***************************************************!*\
  !*** ./src/utils/split+drag/split-controller.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lottie-web */ "lottie-web");
/* harmony import */ var lottie_web__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lottie_web__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_providers_project_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context-providers/project-context */ "./src/utils/context-providers/project-context.tsx");
/* harmony import */ var _svg_arrow2_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../svg/arrow2.json */ "./src/svg/arrow2.json");
/* harmony import */ var _ssr_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ssr/logic/apply-split-style */ "./src/ssr/logic/apply-split-style.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");






const FLOOR_EPS = 0.25;
const PULSE_LOW_OPACITY = 0.35;
const PULSE_FADE_MS = 1500;
const PULSE_HOLD_MS = 180;
const PULSE_COOLDOWN_MS = 700;
const SplitDragHandler = ({
  split,
  setSplit,
  ids,
  minPortraitSplit
}) => {
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    setIsDragging
  } = (0,_context_providers_project_context__WEBPACK_IMPORTED_MODULE_2__.useProjectVisibility)();
  const splitRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(split);
  const isDraggingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const isHoveringRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const arrowContainer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const arrowAnimRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [isPortrait, setIsPortrait] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(typeof window !== 'undefined' ? window.innerHeight > window.innerWidth : false);
  const [isTouchDevice, setIsTouchDevice] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // keep a live min floor based on viewport width (unless override provided)
  const minRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(typeof minPortraitSplit === 'number' ? minPortraitSplit : (0,_ssr_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.getPortraitMinSplit)(typeof window !== 'undefined' ? window.innerWidth : undefined));

  // pinch-to-reset helpers
  const initialPinchDistance = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const pinchTriggeredRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const pinchThreshold = 10;

  // throttle pulse
  const lastPulseAtRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  const playSegment = (() => {
    let lastCompleteHandler = null;
    let currentSegment = null;
    return (segment, holdFrame) => {
      const anim = arrowAnimRef.current;
      if (!anim) return;
      if (lastCompleteHandler) {
        anim.removeEventListener('complete', lastCompleteHandler);
        lastCompleteHandler = null;
      }
      currentSegment = segment;
      const onComplete = () => {
        anim.removeEventListener('complete', onComplete);
        lastCompleteHandler = null;
        const currentFrame = anim.currentFrame ?? 0;
        if (currentSegment && Math.abs(currentFrame - currentSegment[1]) <= 2) {
          anim.goToAndStop(holdFrame, true);
        }
      };
      lastCompleteHandler = onComplete;
      anim.addEventListener('complete', onComplete);
      anim.playSegments(segment, true);
    };
  })();
  const pulseLottie = async () => {
    const now = performance.now();
    if (now - lastPulseAtRef.current < PULSE_COOLDOWN_MS) return;
    lastPulseAtRef.current = now;
    const node = arrowContainer.current;
    if (!node) return;
    const prevTransition = node.style.transition;
    try {
      node.style.transition = `opacity ${PULSE_FADE_MS}ms ease`;
      node.style.opacity = `${PULSE_LOW_OPACITY}`;
      await new Promise(r => setTimeout(r, PULSE_FADE_MS + PULSE_HOLD_MS));
      node.style.opacity = '1';
      await new Promise(r => setTimeout(r, PULSE_FADE_MS));
    } finally {
      node.style.opacity = '1';
      node.style.transition = prevTransition;
    }
  };

  // Initial apply (SSR ids only)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    if (!ids) return;
    const portraitNow = window.innerHeight > window.innerWidth;
    setIsPortrait(portraitNow);
    minRef.current = typeof minPortraitSplit === 'number' ? minPortraitSplit : (0,_ssr_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.getPortraitMinSplit)(window.innerWidth);
    (0,_ssr_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.applySplitStyle)(splitRef.current, portraitNow, ids, minRef.current);
  }, [ids, minPortraitSplit]);

  // Resize/orientation listener
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleResize = () => {
      const portraitNow = window.innerHeight > window.innerWidth;
      setIsPortrait(portraitNow);
      minRef.current = typeof minPortraitSplit === 'number' ? minPortraitSplit : (0,_ssr_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.getPortraitMinSplit)(window.innerWidth);
      if (ids) (0,_ssr_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.applySplitStyle)(splitRef.current, portraitNow, ids, minRef.current);
    };
    window.addEventListener('resize', handleResize, {
      passive: true
    });
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    return () => window.removeEventListener('resize', handleResize);
  }, [ids, minPortraitSplit]);

  // Sync DOM on split/orientation change
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    splitRef.current = split;
    if (ids) (0,_ssr_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.applySplitStyle)(split, isPortrait, ids, minRef.current);
  }, [split, isPortrait, ids]);
  const handlePointerMove = (clientX, clientY) => {
    if (!isDraggingRef.current) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const portraitNow = vh > vw;

    // live recompute (covers device rotation while dragging)
    const minPortrait = typeof minPortraitSplit === 'number' ? minPortraitSplit : (0,_ssr_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.getPortraitMinSplit)(vw);
    let next = portraitNow ? clientY / vh * 100 : clientX / vw * 100;
    if (portraitNow) {
      const TOP = minPortrait;
      const BOTTOM = 100 - minPortrait;
      next = Math.max(TOP, Math.min(BOTTOM, next));

      // pulse when user hits either floor
      if (next <= TOP + FLOOR_EPS || next >= BOTTOM - FLOOR_EPS) {
        pulseLottie();
      }
    } else {
      next = Math.max(0, Math.min(100, next));
    }
    splitRef.current = next;
    setSplit(next);
    if (ids) (0,_ssr_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.applySplitStyle)(next, portraitNow, ids, minPortrait);
  };
  const handleMouseMove = e => handlePointerMove(e.clientX, e.clientY);
  const handleTouchMove = e => {
    if (e.touches.length === 1 && isDraggingRef.current && !pinchTriggeredRef.current) {
      e.preventDefault();
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2 && !isDraggingRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (initialPinchDistance.current === null) {
        initialPinchDistance.current = distance;
      } else if (!pinchTriggeredRef.current) {
        const diff = Math.abs(distance - initialPinchDistance.current);
        if (diff > pinchThreshold) {
          pinchTriggeredRef.current = true;
          isDraggingRef.current = false;
          setIsDragging(false);
          splitRef.current = 50;
          setSplit(50);
          if (ids) (0,_ssr_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.applySplitStyle)(50, isPortrait, ids, minRef.current);
          initialPinchDistance.current = null;
        }
      }
    }
  };
  const startDragging = e => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    const anim = arrowAnimRef.current;
    if (anim) {
      if (isTouchDevice) anim.playSegments([0, 25], true);else anim.goToAndStop(25, true);
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchmove', handleTouchMove, {
      passive: false
    });
    window.addEventListener('touchend', stopDragging);
  };
  const stopDragging = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    const anim = arrowAnimRef.current;
    if (anim) {
      if (isTouchDevice) anim.playSegments([25, 75], true);else if (isHoveringRef.current) anim.goToAndStop(25, true);else anim.playSegments([25, 75], true);
    }
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', stopDragging);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', stopDragging);
  };
  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (isDraggingRef.current) {
      arrowAnimRef.current?.goToAndStop(25, true);
      return;
    }
    playSegment([0, 25], 25);
  };
  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    if (isDraggingRef.current) {
      arrowAnimRef.current?.goToAndStop(25, true);
      return;
    }
    playSegment([25, 75], 75);
  };
  const handleTouchStart = e => {
    e.preventDefault();
    startDragging(e);
  };
  const handleTouchEnd = async e => {
    let endSplit = splitRef.current;
    if (e.changedTouches.length === 1) {
      const t = e.changedTouches[0];
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const portraitNow = vh > vw;
      endSplit = portraitNow ? t.clientY / vh * 100 : t.clientX / vw * 100;
      const minPortrait = typeof minPortraitSplit === 'number' ? minPortraitSplit : (0,_ssr_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.getPortraitMinSplit)(vw);
      if (portraitNow) {
        const TOP = minPortrait;
        const BOTTOM = 100 - minPortrait;
        endSplit = Math.max(TOP, Math.min(BOTTOM, endSplit));
      } else {
        endSplit = Math.max(0, Math.min(100, endSplit));
      }
    }
    stopDragging();
    if (isPortrait) {
      const minPortrait = typeof minPortraitSplit === 'number' ? minPortraitSplit : (0,_ssr_logic_apply_split_style__WEBPACK_IMPORTED_MODULE_4__.getPortraitMinSplit)(window.innerWidth);
      const TOP = minPortrait;
      const BOTTOM = 100 - minPortrait;
      if (endSplit <= TOP + FLOOR_EPS || endSplit >= BOTTOM - FLOOR_EPS) {
        await pulseLottie();
        arrowAnimRef.current?.playSegments([25, 75], true);
      }
    }
    initialPinchDistance.current = null;
    pinchTriggeredRef.current = false;
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const anim = lottie_web__WEBPACK_IMPORTED_MODULE_1___default().loadAnimation({
      container: arrowContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: _svg_arrow2_json__WEBPACK_IMPORTED_MODULE_3__
    });
    arrowAnimRef.current = anim;
    const container = containerRef.current;
    if (container) container.style.opacity = '0';
    const playInitial = () => {
      anim.goToAndStop(0, true);
      setTimeout(() => anim.playSegments([0, 75], true), 1200);
      if (container) {
        setTimeout(() => container.style.opacity = '1', 1200);
      }
      arrowContainer.current?.querySelector('svg')?.classList.add('drag-arrow');
    };
    anim.addEventListener('DOMLoaded', playInitial);
    const fallback = setTimeout(() => {
      // @ts-ignore
      if (!anim.isLoaded) playInitial();
    }, 2000);
    return () => {
      clearTimeout(fallback);
      anim.removeEventListener('DOMLoaded', playInitial);
      anim.destroy();
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const container = containerRef.current;
    const anim = arrowAnimRef.current;
    if (!container || !anim) return;
    let views = 0;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && views < 3) {
          views += 1;
          anim.goToAndStop(0, true);
          setTimeout(() => anim.playSegments([0, 75], true), 200);
        }
      });
    }, {
      threshold: 0.6
    });
    io.observe(container);
    return () => io.disconnect();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousedown', startDragging);
    container.addEventListener('touchstart', handleTouchStart, {
      passive: false
    });
    container.addEventListener('touchend', handleTouchEnd, {
      passive: true
    });
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousedown', startDragging);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      stopDragging();
    };
  }, []);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    ref: containerRef,
    className: "split-drag-handler",
    style: {
      position: 'absolute',
      ...(isPortrait ? {
        left: 0,
        right: 0,
        top: `${split}%`,
        height: '5.4rem',
        cursor: 'ns-resize',
        transform: 'translateY(-50%)'
      } : {
        top: 0,
        bottom: 0,
        left: `${split}%`,
        width: '6.4rem',
        cursor: 'ew-resize',
        transform: 'translateX(-50%)',
        height: 'calc(100% - 6em)'
      }),
      zIndex: 3000,
      transition: isPortrait ? 'top 0s' : 'left 0s',
      pointerEvents: 'all',
      touchAction: isDraggingRef.current ? 'none' : 'auto'
    },
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ref: arrowContainer,
      className: "split-arrow",
      style: {
        width: isPortrait ? '100%' : 'none',
        height: isPortrait ? 'calc(100% - 4em)' : 'calc(100% + 3em)',
        pointerEvents: 'none',
        transform: isPortrait ? 'rotate(90deg)' : 'none',
        transformOrigin: 'center center'
      }
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SplitDragHandler);

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

// IO gating state
let io = null;
let observedEl = null;
let visibleEnough = true; // only show/apply when true

const fetchTooltipDataForKey = async key => {
  if (tooltipDataCache[key]) return tooltipDataCache[key];
  const bg = bgForKey(key);
  if (LOCAL_FALLBACK_TAGS[key]) {
    const info = {
      tags: LOCAL_FALLBACK_TAGS[key],
      backgroundColor: bg
    };
    tooltipDataCache[key] = info;
    return info;
  }
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
  if (!visibleEnough) return; // 🚫 gate: do not show if target < 0.3 visible
  if (hideTimeout) clearTimeout(hideTimeout);
  tooltipEl.style.opacity = '1';
  tooltipEl.style.visibility = 'visible';
  hideTimeout = setTimeout(() => hideTooltip(), 1_500);
};
const hideTooltip = () => {
  if (!tooltipEl) return;
  if (hideTimeout) clearTimeout(hideTimeout);
  tooltipEl.style.opacity = '0';
  tooltipEl.style.visibility = 'hidden';
  // keep currentKey so we can re-show quickly if still over same element
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

// (new) observe hovered/attached element and gate visibility
function observeTargetForVisibility(el) {
  if (!('IntersectionObserver' in window)) {
    visibleEnough = true;
    return;
  }
  if (!io) {
    io = new IntersectionObserver(entries => {
      const e = entries[0];
      const ratio = e?.intersectionRatio ?? 0;
      visibleEnough = !!e?.isIntersecting && ratio >= 0.3; // 🔑 gate at 0.3
      if (!visibleEnough) hideTooltip();
    }, {
      root: null,
      threshold: [0, 0.3, 1]
    });
  }
  if (observedEl) io.unobserve(observedEl);
  observedEl = el || null;
  if (observedEl) io.observe(observedEl);
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

    // find a tooltip-* class on the element or ancestors
    const tooltipHost = el.closest('[class*="tooltip-"]');
    if (!tooltipHost) {
      hideTooltip();
      observeTargetForVisibility(null);
      return;
    }
    const tooltipClass = Array.from(tooltipHost.classList).find(c => c.startsWith('tooltip-'));
    if (!tooltipClass) {
      hideTooltip();
      observeTargetForVisibility(null);
      return;
    }

    // observe this specific element for visibility gating
    observeTargetForVisibility(tooltipHost);
    if (!visibleEnough) {
      hideTooltip();
      return;
    } // don’t apply if under threshold

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
    if (lastMouseX < 0 || lastMouseY < 0) return;
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
    if (io) {
      if (observedEl) io.unobserve(observedEl);
      io.disconnect();
      io = null;
      observedEl = null;
    }
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
//# sourceMappingURL=src_utils_split_drag_split-controller_tsx-src_utils_tooltip_tooltipInit_ts.server.js.map