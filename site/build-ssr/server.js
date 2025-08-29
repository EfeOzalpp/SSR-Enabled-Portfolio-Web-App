/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../node_modules/@sanity/image-url/lib/node/builder.js":
/*!*******************************************************************!*\
  !*** ../../../node_modules/@sanity/image-url/lib/node/builder.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageUrlBuilder = void 0;
var urlForImage_1 = __importStar(__webpack_require__(/*! ./urlForImage */ "../../../node_modules/@sanity/image-url/lib/node/urlForImage.js"));
var validFits = ['clip', 'crop', 'fill', 'fillmax', 'max', 'scale', 'min'];
var validCrops = ['top', 'bottom', 'left', 'right', 'center', 'focalpoint', 'entropy'];
var validAutoModes = ['format'];
function isSanityModernClientLike(client) {
    return client && 'config' in client ? typeof client.config === 'function' : false;
}
function isSanityClientLike(client) {
    return client && 'clientConfig' in client ? typeof client.clientConfig === 'object' : false;
}
function rewriteSpecName(key) {
    var specs = urlForImage_1.SPEC_NAME_TO_URL_NAME_MAPPINGS;
    for (var _i = 0, specs_1 = specs; _i < specs_1.length; _i++) {
        var entry = specs_1[_i];
        var specName = entry[0], param = entry[1];
        if (key === specName || key === param) {
            return specName;
        }
    }
    return key;
}
function urlBuilder(options) {
    // Did we get a modernish client?
    if (isSanityModernClientLike(options)) {
        // Inherit config from client
        var _a = options.config(), apiUrl = _a.apiHost, projectId = _a.projectId, dataset = _a.dataset;
        var apiHost = apiUrl || 'https://api.sanity.io';
        return new ImageUrlBuilder(null, {
            baseUrl: apiHost.replace(/^https:\/\/api\./, 'https://cdn.'),
            projectId: projectId,
            dataset: dataset,
        });
    }
    // Did we get a SanityClient?
    if (isSanityClientLike(options)) {
        // Inherit config from client
        var _b = options.clientConfig, apiUrl = _b.apiHost, projectId = _b.projectId, dataset = _b.dataset;
        var apiHost = apiUrl || 'https://api.sanity.io';
        return new ImageUrlBuilder(null, {
            baseUrl: apiHost.replace(/^https:\/\/api\./, 'https://cdn.'),
            projectId: projectId,
            dataset: dataset,
        });
    }
    // Or just accept the options as given
    return new ImageUrlBuilder(null, options || {});
}
exports["default"] = urlBuilder;
var ImageUrlBuilder = /** @class */ (function () {
    function ImageUrlBuilder(parent, options) {
        this.options = parent
            ? __assign(__assign({}, (parent.options || {})), (options || {})) : __assign({}, (options || {})); // Copy options
    }
    ImageUrlBuilder.prototype.withOptions = function (options) {
        var baseUrl = options.baseUrl || this.options.baseUrl;
        var newOptions = { baseUrl: baseUrl };
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                var specKey = rewriteSpecName(key);
                newOptions[specKey] = options[key];
            }
        }
        return new ImageUrlBuilder(this, __assign({ baseUrl: baseUrl }, newOptions));
    };
    // The image to be represented. Accepts a Sanity 'image'-document, 'asset'-document or
    // _id of asset. To get the benefit of automatic hot-spot/crop integration with the content
    // studio, the 'image'-document must be provided.
    ImageUrlBuilder.prototype.image = function (source) {
        return this.withOptions({ source: source });
    };
    // Specify the dataset
    ImageUrlBuilder.prototype.dataset = function (dataset) {
        return this.withOptions({ dataset: dataset });
    };
    // Specify the projectId
    ImageUrlBuilder.prototype.projectId = function (projectId) {
        return this.withOptions({ projectId: projectId });
    };
    // Specify background color
    ImageUrlBuilder.prototype.bg = function (bg) {
        return this.withOptions({ bg: bg });
    };
    // Set DPR scaling factor
    ImageUrlBuilder.prototype.dpr = function (dpr) {
        // A DPR of 1 is the default - so only include it if we have a different value
        return this.withOptions(dpr && dpr !== 1 ? { dpr: dpr } : {});
    };
    // Specify the width of the image in pixels
    ImageUrlBuilder.prototype.width = function (width) {
        return this.withOptions({ width: width });
    };
    // Specify the height of the image in pixels
    ImageUrlBuilder.prototype.height = function (height) {
        return this.withOptions({ height: height });
    };
    // Specify focal point in fraction of image dimensions. Each component 0.0-1.0
    ImageUrlBuilder.prototype.focalPoint = function (x, y) {
        return this.withOptions({ focalPoint: { x: x, y: y } });
    };
    ImageUrlBuilder.prototype.maxWidth = function (maxWidth) {
        return this.withOptions({ maxWidth: maxWidth });
    };
    ImageUrlBuilder.prototype.minWidth = function (minWidth) {
        return this.withOptions({ minWidth: minWidth });
    };
    ImageUrlBuilder.prototype.maxHeight = function (maxHeight) {
        return this.withOptions({ maxHeight: maxHeight });
    };
    ImageUrlBuilder.prototype.minHeight = function (minHeight) {
        return this.withOptions({ minHeight: minHeight });
    };
    // Specify width and height in pixels
    ImageUrlBuilder.prototype.size = function (width, height) {
        return this.withOptions({ width: width, height: height });
    };
    // Specify blur between 0 and 100
    ImageUrlBuilder.prototype.blur = function (blur) {
        return this.withOptions({ blur: blur });
    };
    ImageUrlBuilder.prototype.sharpen = function (sharpen) {
        return this.withOptions({ sharpen: sharpen });
    };
    // Specify the desired rectangle of the image
    ImageUrlBuilder.prototype.rect = function (left, top, width, height) {
        return this.withOptions({ rect: { left: left, top: top, width: width, height: height } });
    };
    // Specify the image format of the image. 'jpg', 'pjpg', 'png', 'webp'
    ImageUrlBuilder.prototype.format = function (format) {
        return this.withOptions({ format: format });
    };
    ImageUrlBuilder.prototype.invert = function (invert) {
        return this.withOptions({ invert: invert });
    };
    // Rotation in degrees 0, 90, 180, 270
    ImageUrlBuilder.prototype.orientation = function (orientation) {
        return this.withOptions({ orientation: orientation });
    };
    // Compression quality 0-100
    ImageUrlBuilder.prototype.quality = function (quality) {
        return this.withOptions({ quality: quality });
    };
    // Make it a download link. Parameter is default filename.
    ImageUrlBuilder.prototype.forceDownload = function (download) {
        return this.withOptions({ download: download });
    };
    // Flip image horizontally
    ImageUrlBuilder.prototype.flipHorizontal = function () {
        return this.withOptions({ flipHorizontal: true });
    };
    // Flip image vertically
    ImageUrlBuilder.prototype.flipVertical = function () {
        return this.withOptions({ flipVertical: true });
    };
    // Ignore crop/hotspot from image record, even when present
    ImageUrlBuilder.prototype.ignoreImageParams = function () {
        return this.withOptions({ ignoreImageParams: true });
    };
    ImageUrlBuilder.prototype.fit = function (value) {
        if (validFits.indexOf(value) === -1) {
            throw new Error("Invalid fit mode \"".concat(value, "\""));
        }
        return this.withOptions({ fit: value });
    };
    ImageUrlBuilder.prototype.crop = function (value) {
        if (validCrops.indexOf(value) === -1) {
            throw new Error("Invalid crop mode \"".concat(value, "\""));
        }
        return this.withOptions({ crop: value });
    };
    // Saturation
    ImageUrlBuilder.prototype.saturation = function (saturation) {
        return this.withOptions({ saturation: saturation });
    };
    ImageUrlBuilder.prototype.auto = function (value) {
        if (validAutoModes.indexOf(value) === -1) {
            throw new Error("Invalid auto mode \"".concat(value, "\""));
        }
        return this.withOptions({ auto: value });
    };
    // Specify the number of pixels to pad the image
    ImageUrlBuilder.prototype.pad = function (pad) {
        return this.withOptions({ pad: pad });
    };
    // Vanity URL for more SEO friendly URLs
    ImageUrlBuilder.prototype.vanityName = function (value) {
        return this.withOptions({ vanityName: value });
    };
    ImageUrlBuilder.prototype.frame = function (frame) {
        if (frame !== 1) {
            throw new Error("Invalid frame value \"".concat(frame, "\""));
        }
        return this.withOptions({ frame: frame });
    };
    // Gets the url based on the submitted parameters
    ImageUrlBuilder.prototype.url = function () {
        return (0, urlForImage_1.default)(this.options);
    };
    // Alias for url()
    ImageUrlBuilder.prototype.toString = function () {
        return this.url();
    };
    return ImageUrlBuilder;
}());
exports.ImageUrlBuilder = ImageUrlBuilder;
//# sourceMappingURL=builder.js.map

/***/ }),

/***/ "../../../node_modules/@sanity/image-url/lib/node/index.js":
/*!*****************************************************************!*\
  !*** ../../../node_modules/@sanity/image-url/lib/node/index.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var builder_1 = __importDefault(__webpack_require__(/*! ./builder */ "../../../node_modules/@sanity/image-url/lib/node/builder.js"));
module.exports = builder_1.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../node_modules/@sanity/image-url/lib/node/parseAssetId.js":
/*!************************************************************************!*\
  !*** ../../../node_modules/@sanity/image-url/lib/node/parseAssetId.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var example = 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg';
function parseAssetId(ref) {
    var _a = ref.split('-'), id = _a[1], dimensionString = _a[2], format = _a[3];
    if (!id || !dimensionString || !format) {
        throw new Error("Malformed asset _ref '".concat(ref, "'. Expected an id like \"").concat(example, "\"."));
    }
    var _b = dimensionString.split('x'), imgWidthStr = _b[0], imgHeightStr = _b[1];
    var width = +imgWidthStr;
    var height = +imgHeightStr;
    var isValidAssetId = isFinite(width) && isFinite(height);
    if (!isValidAssetId) {
        throw new Error("Malformed asset _ref '".concat(ref, "'. Expected an id like \"").concat(example, "\"."));
    }
    return { id: id, width: width, height: height, format: format };
}
exports["default"] = parseAssetId;
//# sourceMappingURL=parseAssetId.js.map

/***/ }),

/***/ "../../../node_modules/@sanity/image-url/lib/node/parseSource.js":
/*!***********************************************************************!*\
  !*** ../../../node_modules/@sanity/image-url/lib/node/parseSource.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var isRef = function (src) {
    var source = src;
    return source ? typeof source._ref === 'string' : false;
};
var isAsset = function (src) {
    var source = src;
    return source ? typeof source._id === 'string' : false;
};
var isAssetStub = function (src) {
    var source = src;
    return source && source.asset ? typeof source.asset.url === 'string' : false;
};
// Convert an asset-id, asset or image to an image record suitable for processing
// eslint-disable-next-line complexity
function parseSource(source) {
    if (!source) {
        return null;
    }
    var image;
    if (typeof source === 'string' && isUrl(source)) {
        // Someone passed an existing image url?
        image = {
            asset: { _ref: urlToId(source) },
        };
    }
    else if (typeof source === 'string') {
        // Just an asset id
        image = {
            asset: { _ref: source },
        };
    }
    else if (isRef(source)) {
        // We just got passed an asset directly
        image = {
            asset: source,
        };
    }
    else if (isAsset(source)) {
        // If we were passed an image asset document
        image = {
            asset: {
                _ref: source._id || '',
            },
        };
    }
    else if (isAssetStub(source)) {
        // If we were passed a partial asset (`url`, but no `_id`)
        image = {
            asset: {
                _ref: urlToId(source.asset.url),
            },
        };
    }
    else if (typeof source.asset === 'object') {
        // Probably an actual image with materialized asset
        image = __assign({}, source);
    }
    else {
        // We got something that does not look like an image, or it is an image
        // that currently isn't sporting an asset.
        return null;
    }
    var img = source;
    if (img.crop) {
        image.crop = img.crop;
    }
    if (img.hotspot) {
        image.hotspot = img.hotspot;
    }
    return applyDefaults(image);
}
exports["default"] = parseSource;
function isUrl(url) {
    return /^https?:\/\//.test("".concat(url));
}
function urlToId(url) {
    var parts = url.split('/').slice(-1);
    return "image-".concat(parts[0]).replace(/\.([a-z]+)$/, '-$1');
}
// Mock crop and hotspot if image lacks it
function applyDefaults(image) {
    if (image.crop && image.hotspot) {
        return image;
    }
    // We need to pad in default values for crop or hotspot
    var result = __assign({}, image);
    if (!result.crop) {
        result.crop = {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
        };
    }
    if (!result.hotspot) {
        result.hotspot = {
            x: 0.5,
            y: 0.5,
            height: 1.0,
            width: 1.0,
        };
    }
    return result;
}
//# sourceMappingURL=parseSource.js.map

/***/ }),

/***/ "../../../node_modules/@sanity/image-url/lib/node/urlForImage.js":
/*!***********************************************************************!*\
  !*** ../../../node_modules/@sanity/image-url/lib/node/urlForImage.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseSource = exports.SPEC_NAME_TO_URL_NAME_MAPPINGS = void 0;
var parseAssetId_1 = __importDefault(__webpack_require__(/*! ./parseAssetId */ "../../../node_modules/@sanity/image-url/lib/node/parseAssetId.js"));
var parseSource_1 = __importDefault(__webpack_require__(/*! ./parseSource */ "../../../node_modules/@sanity/image-url/lib/node/parseSource.js"));
exports.parseSource = parseSource_1.default;
exports.SPEC_NAME_TO_URL_NAME_MAPPINGS = [
    ['width', 'w'],
    ['height', 'h'],
    ['format', 'fm'],
    ['download', 'dl'],
    ['blur', 'blur'],
    ['sharpen', 'sharp'],
    ['invert', 'invert'],
    ['orientation', 'or'],
    ['minHeight', 'min-h'],
    ['maxHeight', 'max-h'],
    ['minWidth', 'min-w'],
    ['maxWidth', 'max-w'],
    ['quality', 'q'],
    ['fit', 'fit'],
    ['crop', 'crop'],
    ['saturation', 'sat'],
    ['auto', 'auto'],
    ['dpr', 'dpr'],
    ['pad', 'pad'],
    ['frame', 'frame']
];
function urlForImage(options) {
    var spec = __assign({}, (options || {}));
    var source = spec.source;
    delete spec.source;
    var image = (0, parseSource_1.default)(source);
    if (!image) {
        throw new Error("Unable to resolve image URL from source (".concat(JSON.stringify(source), ")"));
    }
    var id = image.asset._ref || image.asset._id || '';
    var asset = (0, parseAssetId_1.default)(id);
    // Compute crop rect in terms of pixel coordinates in the raw source image
    var cropLeft = Math.round(image.crop.left * asset.width);
    var cropTop = Math.round(image.crop.top * asset.height);
    var crop = {
        left: cropLeft,
        top: cropTop,
        width: Math.round(asset.width - image.crop.right * asset.width - cropLeft),
        height: Math.round(asset.height - image.crop.bottom * asset.height - cropTop),
    };
    // Compute hot spot rect in terms of pixel coordinates
    var hotSpotVerticalRadius = (image.hotspot.height * asset.height) / 2;
    var hotSpotHorizontalRadius = (image.hotspot.width * asset.width) / 2;
    var hotSpotCenterX = image.hotspot.x * asset.width;
    var hotSpotCenterY = image.hotspot.y * asset.height;
    var hotspot = {
        left: hotSpotCenterX - hotSpotHorizontalRadius,
        top: hotSpotCenterY - hotSpotVerticalRadius,
        right: hotSpotCenterX + hotSpotHorizontalRadius,
        bottom: hotSpotCenterY + hotSpotVerticalRadius,
    };
    // If irrelevant, or if we are requested to: don't perform crop/fit based on
    // the crop/hotspot.
    if (!(spec.rect || spec.focalPoint || spec.ignoreImageParams || spec.crop)) {
        spec = __assign(__assign({}, spec), fit({ crop: crop, hotspot: hotspot }, spec));
    }
    return specToImageUrl(__assign(__assign({}, spec), { asset: asset }));
}
exports["default"] = urlForImage;
// eslint-disable-next-line complexity
function specToImageUrl(spec) {
    var cdnUrl = (spec.baseUrl || 'https://cdn.sanity.io').replace(/\/+$/, '');
    var vanityStub = spec.vanityName ? "/".concat(spec.vanityName) : '';
    var filename = "".concat(spec.asset.id, "-").concat(spec.asset.width, "x").concat(spec.asset.height, ".").concat(spec.asset.format).concat(vanityStub);
    var baseUrl = "".concat(cdnUrl, "/images/").concat(spec.projectId, "/").concat(spec.dataset, "/").concat(filename);
    var params = [];
    if (spec.rect) {
        // Only bother url with a crop if it actually crops anything
        var _a = spec.rect, left = _a.left, top_1 = _a.top, width = _a.width, height = _a.height;
        var isEffectiveCrop = left !== 0 || top_1 !== 0 || height !== spec.asset.height || width !== spec.asset.width;
        if (isEffectiveCrop) {
            params.push("rect=".concat(left, ",").concat(top_1, ",").concat(width, ",").concat(height));
        }
    }
    if (spec.bg) {
        params.push("bg=".concat(spec.bg));
    }
    if (spec.focalPoint) {
        params.push("fp-x=".concat(spec.focalPoint.x));
        params.push("fp-y=".concat(spec.focalPoint.y));
    }
    var flip = [spec.flipHorizontal && 'h', spec.flipVertical && 'v'].filter(Boolean).join('');
    if (flip) {
        params.push("flip=".concat(flip));
    }
    // Map from spec name to url param name, and allow using the actual param name as an alternative
    exports.SPEC_NAME_TO_URL_NAME_MAPPINGS.forEach(function (mapping) {
        var specName = mapping[0], param = mapping[1];
        if (typeof spec[specName] !== 'undefined') {
            params.push("".concat(param, "=").concat(encodeURIComponent(spec[specName])));
        }
        else if (typeof spec[param] !== 'undefined') {
            params.push("".concat(param, "=").concat(encodeURIComponent(spec[param])));
        }
    });
    if (params.length === 0) {
        return baseUrl;
    }
    return "".concat(baseUrl, "?").concat(params.join('&'));
}
function fit(source, spec) {
    var cropRect;
    var imgWidth = spec.width;
    var imgHeight = spec.height;
    // If we are not constraining the aspect ratio, we'll just use the whole crop
    if (!(imgWidth && imgHeight)) {
        return { width: imgWidth, height: imgHeight, rect: source.crop };
    }
    var crop = source.crop;
    var hotspot = source.hotspot;
    // If we are here, that means aspect ratio is locked and fitting will be a bit harder
    var desiredAspectRatio = imgWidth / imgHeight;
    var cropAspectRatio = crop.width / crop.height;
    if (cropAspectRatio > desiredAspectRatio) {
        // The crop is wider than the desired aspect ratio. That means we are cutting from the sides
        var height = Math.round(crop.height);
        var width = Math.round(height * desiredAspectRatio);
        var top_2 = Math.max(0, Math.round(crop.top));
        // Center output horizontally over hotspot
        var hotspotXCenter = Math.round((hotspot.right - hotspot.left) / 2 + hotspot.left);
        var left = Math.max(0, Math.round(hotspotXCenter - width / 2));
        // Keep output within crop
        if (left < crop.left) {
            left = crop.left;
        }
        else if (left + width > crop.left + crop.width) {
            left = crop.left + crop.width - width;
        }
        cropRect = { left: left, top: top_2, width: width, height: height };
    }
    else {
        // The crop is taller than the desired ratio, we are cutting from top and bottom
        var width = crop.width;
        var height = Math.round(width / desiredAspectRatio);
        var left = Math.max(0, Math.round(crop.left));
        // Center output vertically over hotspot
        var hotspotYCenter = Math.round((hotspot.bottom - hotspot.top) / 2 + hotspot.top);
        var top_3 = Math.max(0, Math.round(hotspotYCenter - height / 2));
        // Keep output rect within crop
        if (top_3 < crop.top) {
            top_3 = crop.top;
        }
        else if (top_3 + height > crop.top + crop.height) {
            top_3 = crop.top + crop.height - height;
        }
        cropRect = { left: left, top: top_3, width: width, height: height };
    }
    return {
        width: imgWidth,
        height: imgHeight,
        rect: cropRect,
    };
}
//# sourceMappingURL=urlForImage.js.map

/***/ }),

/***/ "./node_modules/@emotion/cache/dist/emotion-cache.cjs.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/emotion-cache.cjs.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var sheet = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/emotion-sheet.cjs.js");
var stylis = __webpack_require__(/*! stylis */ "stylis");
var weakMemoize = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.js");
var memoize = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.cjs.js");

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var weakMemoize__default = /*#__PURE__*/_interopDefault(weakMemoize);
var memoize__default = /*#__PURE__*/_interopDefault(memoize);

var isBrowser = typeof document !== 'undefined';

var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = stylis.peek(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if (stylis.token(character)) {
      break;
    }

    stylis.next();
  }

  return stylis.slice(begin, stylis.position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (stylis.token(character)) {
      case 0:
        // &\f
        if (character === 38 && stylis.peek() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(stylis.position - 1, points, index);
        break;

      case 2:
        parsed[index] += stylis.delimit(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = stylis.peek() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += stylis.from(character);
    }
  } while (character = stylis.next());

  return parsed;
};

var getRules = function getRules(value, points) {
  return stylis.dealloc(toRules(stylis.alloc(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value;
  var parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};

/* eslint-disable no-fallthrough */

function prefix(value, length) {
  switch (stylis.hash(value, length)) {
    // color-adjust
    case 5103:
      return stylis.WEBKIT + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return stylis.WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return stylis.WEBKIT + value + stylis.MOZ + value + stylis.MS + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return stylis.WEBKIT + value + stylis.MS + value + value;
    // order

    case 6165:
      return stylis.WEBKIT + value + stylis.MS + 'flex-' + value + value;
    // align-items

    case 5187:
      return stylis.WEBKIT + value + stylis.replace(value, /(\w+).+(:[^]+)/, stylis.WEBKIT + 'box-$1$2' + stylis.MS + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return stylis.WEBKIT + value + stylis.MS + 'flex-item-' + stylis.replace(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return stylis.WEBKIT + value + stylis.MS + 'flex-line-pack' + stylis.replace(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return stylis.WEBKIT + 'box-' + stylis.replace(value, '-grow', '') + stylis.WEBKIT + value + stylis.MS + stylis.replace(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return stylis.WEBKIT + stylis.replace(value, /([^-])(transform)/g, '$1' + stylis.WEBKIT + '$2') + value;
    // cursor

    case 6187:
      return stylis.replace(stylis.replace(stylis.replace(value, /(zoom-|grab)/, stylis.WEBKIT + '$1'), /(image-set)/, stylis.WEBKIT + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return stylis.replace(value, /(image-set\([^]*)/, stylis.WEBKIT + '$1' + '$`$1');
    // justify-content

    case 4968:
      return stylis.replace(stylis.replace(value, /(.+:)(flex-)?(.*)/, stylis.WEBKIT + 'box-pack:$3' + stylis.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + stylis.WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return stylis.replace(value, /(.+)-inline(.+)/, stylis.WEBKIT + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (stylis.strlen(value) - 1 - length > 6) switch (stylis.charat(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if (stylis.charat(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return stylis.replace(value, /(.+:)(.+)-([^]+)/, '$1' + stylis.WEBKIT + '$2-$3' + '$1' + stylis.MOZ + (stylis.charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~stylis.indexof(value, 'stretch') ? prefix(stylis.replace(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if (stylis.charat(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch (stylis.charat(value, stylis.strlen(value) - 3 - (~stylis.indexof(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return stylis.replace(value, ':', ':' + stylis.WEBKIT) + value;
        // (inline-)?fl(e)x

        case 101:
          return stylis.replace(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + stylis.WEBKIT + (stylis.charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + stylis.WEBKIT + '$2$3' + '$1' + stylis.MS + '$2box$3') + value;
      }

      break;
    // writing-mode

    case 5936:
      switch (stylis.charat(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }

      return stylis.WEBKIT + value + stylis.MS + value + value;
  }

  return value;
}

var prefixer = function prefixer(element, index, children, callback) {
  if (element.length > -1) if (!element["return"]) switch (element.type) {
    case stylis.DECLARATION:
      element["return"] = prefix(element.value, element.length);
      break;

    case stylis.KEYFRAMES:
      return stylis.serialize([stylis.copy(element, {
        value: stylis.replace(element.value, '@', '@' + stylis.WEBKIT)
      })], callback);

    case stylis.RULESET:
      if (element.length) return stylis.combine(element.props, function (value) {
        switch (stylis.match(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return stylis.serialize([stylis.copy(element, {
              props: [stylis.replace(value, /:(read-\w+)/, ':' + stylis.MOZ + '$1')]
            })], callback);
          // :placeholder

          case '::placeholder':
            return stylis.serialize([stylis.copy(element, {
              props: [stylis.replace(value, /:(plac\w+)/, ':' + stylis.WEBKIT + 'input-$1')]
            }), stylis.copy(element, {
              props: [stylis.replace(value, /:(plac\w+)/, ':' + stylis.MOZ + '$1')]
            }), stylis.copy(element, {
              props: [stylis.replace(value, /:(plac\w+)/, stylis.MS + 'input-$1')]
            })], callback);
        }

        return '';
      });
  }
};

var getServerStylisCache = isBrowser ? undefined : weakMemoize__default["default"](function () {
  return memoize__default["default"](function () {
    return {};
  });
});
var defaultStylisPlugins = [prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if (isBrowser && key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }

      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  var inserted = {};
  var container;
  var nodesToHydrate = [];

  if (isBrowser) {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' ');

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (!getServerStylisCache) {
    var currentSheet;
    var finalizingPlugins = [stylis.stringify, stylis.rulesheet(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis$1 = function stylis$1(styles) {
      return stylis.serialize(stylis.compile(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      stylis$1(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  } else {
    var _finalizingPlugins = [stylis.stringify];

    var _serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));

    var _stylis = function _stylis(styles) {
      return stylis.serialize(stylis.compile(styles), _serializer);
    };

    var serverStylisCache = getServerStylisCache(stylisPlugins)(key);

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  var cache = {
    key: key,
    sheet: new sheet.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

exports["default"] = createCache;


/***/ }),

/***/ "./node_modules/@emotion/hash/dist/emotion-hash.cjs.dev.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/emotion-hash.cjs.dev.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

exports["default"] = murmur2;


/***/ }),

/***/ "./node_modules/@emotion/hash/dist/emotion-hash.cjs.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/emotion-hash.cjs.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./emotion-hash.cjs.dev.js */ "./node_modules/@emotion/hash/dist/emotion-hash.cjs.dev.js");
}


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/emotion-memoize.cjs.dev.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/emotion-memoize.cjs.dev.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

exports["default"] = memoize;


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/emotion-memoize.cjs.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/emotion-memoize.cjs.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./emotion-memoize.cjs.dev.js */ "./node_modules/@emotion/memoize/dist/emotion-memoize.cjs.dev.js");
}


/***/ }),

/***/ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var hoistNonReactStatics$1 = __webpack_require__(/*! hoist-non-react-statics */ "hoist-non-react-statics");

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var hoistNonReactStatics__default = /*#__PURE__*/_interopDefault(hoistNonReactStatics$1);

// this file isolates this package that is not tree-shakeable
// and if this module doesn't actually contain any logic of its own
// then Rollup just use 'hoist-non-react-statics' directly in other chunks

var hoistNonReactStatics = (function (targetComponent, sourceComponent) {
  return hoistNonReactStatics__default["default"](targetComponent, sourceComponent);
});

exports["default"] = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-element-a1829a1e.cjs.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-element-a1829a1e.cjs.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var React = __webpack_require__(/*! react */ "react");
var createCache = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.cjs.js");
var _extends = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
var weakMemoize = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.js");
var _isolatedHnrs_dist_emotionReact_isolatedHnrs = __webpack_require__(/*! ../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js */ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js");
var utils = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.cjs.js");
var serialize = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.cjs.js");
var useInsertionEffectWithFallbacks = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.cjs.js");

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var createCache__default = /*#__PURE__*/_interopDefault(createCache);
var weakMemoize__default = /*#__PURE__*/_interopDefault(weakMemoize);

var isDevelopment = false;

var isBrowser = typeof document !== 'undefined';

var EmotionCacheContext = /* #__PURE__ */React__namespace.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache__default["default"]({
  key: 'css'
}) : null);

var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return React.useContext(EmotionCacheContext);
};

exports.withEmotionCache = function withEmotionCache(func) {
  return /*#__PURE__*/React.forwardRef(function (props, ref) {
    // the cache will never be null in the browser
    var cache = React.useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

if (!isBrowser) {
  exports.withEmotionCache = function withEmotionCache(func) {
    return function (props) {
      var cache = React.useContext(EmotionCacheContext);

      if (cache === null) {
        // yes, we're potentially creating this on every render
        // it doesn't actually matter though since it's only on the server
        // so there will only every be a single render
        // that could change in the future because of suspense and etc. but for now,
        // this works and i don't want to optimise for a future thing that we aren't sure about
        cache = createCache__default["default"]({
          key: 'css'
        });
        return /*#__PURE__*/React__namespace.createElement(EmotionCacheContext.Provider, {
          value: cache
        }, func(props, cache));
      } else {
        return func(props, cache);
      }
    };
  };
}

var ThemeContext = /* #__PURE__ */React__namespace.createContext({});

var useTheme = function useTheme() {
  return React__namespace.useContext(ThemeContext);
};

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    return mergedTheme;
  }

  return _extends({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */weakMemoize__default["default"](function (outerTheme) {
  return weakMemoize__default["default"](function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = React__namespace.useContext(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/React__namespace.createElement(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';
  var WithTheme = /*#__PURE__*/React__namespace.forwardRef(function render(props, ref) {
    var theme = React__namespace.useContext(ThemeContext);
    return /*#__PURE__*/React__namespace.createElement(Component, _extends({
      theme: theme,
      ref: ref
    }, props));
  });
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return _isolatedHnrs_dist_emotionReact_isolatedHnrs["default"](WithTheme, Component);
}

var hasOwn = {}.hasOwnProperty;

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {

  var newProps = {};

  for (var _key in props) {
    if (hasOwn.call(props, _key)) {
      newProps[_key] = props[_key];
    }
  }

  newProps[typePropName] = type; // Runtime labeling is an opt-in feature because:

  return newProps;
};

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  utils.registerStyles(cache, serialized, isStringTag);
  var rules = useInsertionEffectWithFallbacks.useInsertionEffectAlwaysWithSyncFallback(function () {
    return utils.insertStyles(cache, serialized, isStringTag);
  });

  if (!isBrowser && rules !== undefined) {
    var _ref2;

    var serializedNames = serialized.name;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      next = next.next;
    }

    return /*#__PURE__*/React__namespace.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref2.nonce = cache.sheet.nonce, _ref2));
  }

  return null;
};

var Emotion = /* #__PURE__ */exports.withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = utils.getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = serialize.serializeStyles(registeredStyles, undefined, React__namespace.useContext(ThemeContext));

  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var _key2 in props) {
    if (hasOwn.call(props, _key2) && _key2 !== 'css' && _key2 !== typePropName && (!isDevelopment )) {
      newProps[_key2] = props[_key2];
    }
  }

  newProps.className = className;

  if (ref) {
    newProps.ref = ref;
  }

  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Insertion, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/React__namespace.createElement(WrappedComponent, newProps));
});

var Emotion$1 = Emotion;

exports.CacheProvider = CacheProvider;
exports.Emotion = Emotion$1;
exports.ThemeContext = ThemeContext;
exports.ThemeProvider = ThemeProvider;
exports.__unsafe_useEmotionCache = __unsafe_useEmotionCache;
exports.createEmotionProps = createEmotionProps;
exports.hasOwn = hasOwn;
exports.isBrowser = isBrowser;
exports.isDevelopment = isDevelopment;
exports.useTheme = useTheme;
exports.withTheme = withTheme;


/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-react.cjs.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-react.cjs.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var emotionElement = __webpack_require__(/*! ./emotion-element-a1829a1e.cjs.js */ "./node_modules/@emotion/react/dist/emotion-element-a1829a1e.cjs.js");
var React = __webpack_require__(/*! react */ "react");
var utils = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.cjs.js");
var useInsertionEffectWithFallbacks = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.cjs.js");
var serialize = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.cjs.js");
__webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.cjs.js");
__webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
__webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.js");
__webpack_require__(/*! ../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js */ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js");
__webpack_require__(/*! hoist-non-react-statics */ "hoist-non-react-statics");

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

exports.jsx = function jsx(type, props) {
  // eslint-disable-next-line prefer-rest-params
  var args = arguments;

  if (props == null || !emotionElement.hasOwn.call(props, 'css')) {
    return React__namespace.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = emotionElement.Emotion;
  createElementArgArray[1] = emotionElement.createEmotionProps(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  }

  return React__namespace.createElement.apply(null, createElementArgArray);
};

(function (_jsx) {
  var JSX;

  (function (_JSX) {})(JSX || (JSX = _jsx.JSX || (_jsx.JSX = {})));
})(exports.jsx || (exports.jsx = {}));

// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */emotionElement.withEmotionCache(function (props, cache) {

  var styles = props.styles;
  var serialized = serialize.serializeStyles([styles], undefined, React__namespace.useContext(emotionElement.ThemeContext));

  if (!emotionElement.isBrowser) {
    var _ref;

    var serializedNames = serialized.name;
    var serializedStyles = serialized.styles;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      serializedStyles += next.styles;
      next = next.next;
    }

    var shouldCache = cache.compat === true;
    var rules = cache.insert("", {
      name: serializedNames,
      styles: serializedStyles
    }, cache.sheet, shouldCache);

    if (shouldCache) {
      return null;
    }

    return /*#__PURE__*/React__namespace.createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + "-global " + serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref));
  } // yes, i know these hooks are used conditionally
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = React__namespace.useRef();
  useInsertionEffectWithFallbacks.useInsertionEffectWithLayoutFallback(function () {
    var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675

    var sheet = new cache.sheet.constructor({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false;
    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  useInsertionEffectWithFallbacks.useInsertionEffectWithLayoutFallback(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      utils.insertStyles(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serialize.serializeStyles(args);
}

function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name;
  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = utils.getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serializedArr = _ref.serializedArr;
  var rules = useInsertionEffectWithFallbacks.useInsertionEffectAlwaysWithSyncFallback(function () {
    var rules = '';

    for (var i = 0; i < serializedArr.length; i++) {
      var res = utils.insertStyles(cache, serializedArr[i], false);

      if (!emotionElement.isBrowser && res !== undefined) {
        rules += res;
      }
    }

    if (!emotionElement.isBrowser) {
      return rules;
    }
  });

  if (!emotionElement.isBrowser && rules.length !== 0) {
    var _ref2;

    return /*#__PURE__*/React__namespace.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedArr.map(function (serialized) {
      return serialized.name;
    }).join(' '), _ref2.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref2.nonce = cache.sheet.nonce, _ref2));
  }

  return null;
};

var ClassNames = /* #__PURE__ */emotionElement.withEmotionCache(function (props, cache) {
  var hasRendered = false;
  var serializedArr = [];

  var css = function css() {
    if (hasRendered && emotionElement.isDevelopment) {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = serialize.serializeStyles(args, cache.registered);
    serializedArr.push(serialized); // registration has to happen here as the result of this might get consumed by `cx`

    utils.registerStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && emotionElement.isDevelopment) {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: React__namespace.useContext(emotionElement.ThemeContext)
  };
  var ele = props.children(content);
  hasRendered = true;
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Insertion, {
    cache: cache,
    serializedArr: serializedArr
  }), ele);
});

exports.CacheProvider = emotionElement.CacheProvider;
exports.ThemeContext = emotionElement.ThemeContext;
exports.ThemeProvider = emotionElement.ThemeProvider;
exports.__unsafe_useEmotionCache = emotionElement.__unsafe_useEmotionCache;
exports.useTheme = emotionElement.useTheme;
Object.defineProperty(exports, "withEmotionCache", ({
  enumerable: true,
  get: function () { return emotionElement.withEmotionCache; }
}));
exports.withTheme = emotionElement.withTheme;
exports.ClassNames = ClassNames;
exports.Global = Global;
exports.createElement = exports.jsx;
exports.css = css;
exports.keyframes = keyframes;


/***/ }),

/***/ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var ReactJSXRuntime = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
var emotionElement = __webpack_require__(/*! ../../dist/emotion-element-a1829a1e.cjs.js */ "./node_modules/@emotion/react/dist/emotion-element-a1829a1e.cjs.js");
__webpack_require__(/*! react */ "react");
__webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.cjs.js");
__webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
__webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.js");
__webpack_require__(/*! ../../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js */ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js");
__webpack_require__(/*! hoist-non-react-statics */ "hoist-non-react-statics");
__webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.cjs.js");
__webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.cjs.js");
__webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.cjs.js");

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var ReactJSXRuntime__namespace = /*#__PURE__*/_interopNamespace(ReactJSXRuntime);

var Fragment = ReactJSXRuntime__namespace.Fragment;
var jsx = function jsx(type, props, key) {
  if (!emotionElement.hasOwn.call(props, 'css')) {
    return ReactJSXRuntime__namespace.jsx(type, props, key);
  }

  return ReactJSXRuntime__namespace.jsx(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
};
var jsxs = function jsxs(type, props, key) {
  if (!emotionElement.hasOwn.call(props, 'css')) {
    return ReactJSXRuntime__namespace.jsxs(type, props, key);
  }

  return ReactJSXRuntime__namespace.jsxs(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
};

exports.Fragment = Fragment;
exports.jsx = jsx;
exports.jsxs = jsxs;


/***/ }),

/***/ "./node_modules/@emotion/serialize/dist/emotion-serialize.cjs.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/serialize/dist/emotion-serialize.cjs.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var hashString = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/emotion-hash.cjs.js");
var unitless = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/emotion-unitless.cjs.js");
var memoize = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.cjs.js");

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var hashString__default = /*#__PURE__*/_interopDefault(hashString);
var unitless__default = /*#__PURE__*/_interopDefault(unitless);
var memoize__default = /*#__PURE__*/_interopDefault(memoize);

var isDevelopment = false;

var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */memoize__default["default"](function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitless__default["default"][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  var componentSelector = interpolation;

  if (componentSelector.__emotion_styles !== undefined) {

    return componentSelector;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        var keyframes = interpolation;

        if (keyframes.anim === 1) {
          cursor = {
            name: keyframes.name,
            styles: keyframes.styles,
            next: cursor
          };
          return keyframes.name;
        }

        var serializedStyles = interpolation;

        if (serializedStyles.styles !== undefined) {
          var next = serializedStyles.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = serializedStyles.styles + ";";
          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        }

        break;
      }
  } // finalize string values (regular strings and functions interpolated into css calls)


  var asString = interpolation;

  if (registered == null) {
    return asString;
  }

  var cached = registered[asString];
  return cached !== undefined ? cached : asString;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var key in obj) {
      var value = obj[key];

      if (typeof value !== 'object') {
        var asString = value;

        if (registered != null && registered[asString] !== undefined) {
          string += key + "{" + registered[asString] + "}";
        } else if (isProcessableValue(asString)) {
          string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
        }
      } else {
        if (key === 'NO_COMPONENT_SELECTOR' && isDevelopment) {
          throw new Error(noComponentSelectorMessage);
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(key) + ":" + interpolated + ";";
                break;
              }

            default:
              {

                string += key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g; // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list

var cursor;
function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    var asTemplateStringsArr = strings;

    styles += asTemplateStringsArr[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      var templateStringsArr = strings;

      styles += templateStringsArr[i];
    }
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + match[1];
  }

  var name = hashString__default["default"](styles) + identifierName;

  return {
    name: name,
    styles: styles,
    next: cursor
  };
}

exports.serializeStyles = serializeStyles;


/***/ }),

/***/ "./node_modules/@emotion/server/create-instance/dist/emotion-server-create-instance.cjs.dev.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@emotion/server/create-instance/dist/emotion-server-create-instance.cjs.dev.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var through = __webpack_require__(/*! through */ "through");
var tokenize = __webpack_require__(/*! html-tokenize */ "html-tokenize");
var pipe = __webpack_require__(/*! multipipe */ "multipipe");

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var through__default = /*#__PURE__*/_interopDefault(through);
var tokenize__default = /*#__PURE__*/_interopDefault(tokenize);
var pipe__default = /*#__PURE__*/_interopDefault(pipe);

var createExtractCritical = function createExtractCritical(cache) {
  return function (html) {
    // parse out ids from html
    // reconstruct css/rules/cache to pass
    var RGX = new RegExp(cache.key + "-([a-zA-Z0-9-_]+)", 'gm');
    var o = {
      html: html,
      ids: [],
      css: ''
    };
    var match;
    var ids = {};

    while ((match = RGX.exec(html)) !== null) {
      // $FlowFixMe
      if (ids[match[1]] === undefined) {
        // $FlowFixMe
        ids[match[1]] = true;
      }
    }

    o.ids = Object.keys(cache.inserted).filter(function (id) {
      if ((ids[id] !== undefined || cache.registered[cache.key + "-" + id] === undefined) && cache.inserted[id] !== true) {
        o.css += cache.inserted[id];
        return true;
      }
    });
    return o;
  };
};

var createExtractCriticalToChunks = function createExtractCriticalToChunks(cache) {
  return function (html) {
    // parse out ids from html
    // reconstruct css/rules/cache to pass
    var RGX = new RegExp(cache.key + "-([a-zA-Z0-9-_]+)", 'gm');
    var o = {
      html: html,
      styles: []
    };
    var match;
    var ids = {};

    while ((match = RGX.exec(html)) !== null) {
      // $FlowFixMe
      if (ids[match[1]] === undefined) {
        // $FlowFixMe
        ids[match[1]] = true;
      }
    }

    var regularCssIds = [];
    var regularCss = '';
    Object.keys(cache.inserted).forEach(function (id) {
      if ((ids[id] !== undefined || cache.registered[cache.key + "-" + id] === undefined) && cache.inserted[id] !== true) {
        if (cache.registered[cache.key + "-" + id]) {
          // regular css can be added in one style tag
          regularCssIds.push(id); // $FlowFixMe

          regularCss += cache.inserted[id];
        } else {
          // each global styles require a new entry so it can be independently flushed
          o.styles.push({
            key: cache.key + "-global",
            ids: [id],
            css: cache.inserted[id]
          });
        }
      }
    }); // make sure that regular css is added after the global styles

    o.styles.push({
      key: cache.key,
      ids: regularCssIds,
      css: regularCss
    });
    return o;
  };
};

function generateStyleTag(cssKey, ids, styles, nonceString) {
  return "<style data-emotion=\"" + cssKey + " " + ids + "\"" + nonceString + ">" + styles + "</style>";
}

var createRenderStylesToString = function createRenderStylesToString(cache, nonceString) {
  return function (html) {
    var inserted = cache.inserted,
        cssKey = cache.key,
        registered = cache.registered;
    var regex = new RegExp("<|" + cssKey + "-([a-zA-Z0-9-_]+)", 'gm');
    var seen = {};
    var result = '';
    var globalIds = '';
    var globalStyles = '';

    for (var id in inserted) {
      // eslint-disable-next-line no-prototype-builtins
      if (inserted.hasOwnProperty(id)) {
        var style = inserted[id];
        var key = cssKey + "-" + id;

        if (style !== true && registered[key] === undefined) {
          globalStyles += style;
          globalIds += " " + id;
        }
      }
    }

    if (globalStyles !== '') {
      result = generateStyleTag(cssKey, globalIds.substring(1), globalStyles, nonceString);
    }

    var ids = '';
    var styles = '';
    var lastInsertionPoint = 0;
    var match;

    while ((match = regex.exec(html)) !== null) {
      // $FlowFixMe
      if (match[0] === '<') {
        if (ids !== '') {
          result += generateStyleTag(cssKey, ids.substring(1), styles, nonceString);
          ids = '';
          styles = '';
        } // $FlowFixMe


        result += html.substring(lastInsertionPoint, match.index); // $FlowFixMe

        lastInsertionPoint = match.index;
        continue;
      } // $FlowFixMe


      var _id = match[1];
      var _style = inserted[_id];

      if (_style === true || _style === undefined || seen[_id]) {
        continue;
      }

      seen[_id] = true;
      styles += _style;
      ids += " " + _id;
    }

    result += html.substring(lastInsertionPoint);
    return result;
  };
};

var createRenderStylesToNodeStream = function createRenderStylesToNodeStream(cache, nonceString) {
  return function () {
    var insed = {};
    var tokenStream = tokenize__default["default"]();
    var inlineStream = through__default["default"](function write(thing) {
      var type = thing[0],
          data = thing[1];

      if (type === 'open') {
        var css = '';
        var ids = {};
        var match;
        var fragment = data.toString();
        var regex = new RegExp(cache.key + "-([a-zA-Z0-9-_]+)", 'gm');

        while ((match = regex.exec(fragment)) !== null) {
          if (match !== null && insed[match[1]] === undefined) {
            ids[match[1]] = true;
          }
        }

        Object.keys(cache.inserted).forEach(function (id) {
          if (cache.inserted[id] !== true && insed[id] === undefined && (ids[id] === true || cache.registered[cache.key + "-" + id] === undefined && (ids[id] = true))) {
            insed[id] = true; // $FlowFixMe flow thinks emotion.caches.inserted[id] can be true even though it's checked earlier

            css += cache.inserted[id];
          }
        });

        if (css !== '') {
          this.queue("<style data-emotion=\"" + cache.key + " " + Object.keys(ids).join(' ') + "\"" + nonceString + ">" + css + "</style>");
        }
      }

      this.queue(data);
    }, function end() {
      this.queue(null);
    });
    return pipe__default["default"](tokenStream, inlineStream);
  };
};

var createConstructStyleTagsFromChunks = function createConstructStyleTagsFromChunks(cache, nonceString) {
  return function (criticalData) {
    var styleTagsString = '';
    criticalData.styles.forEach(function (item) {
      styleTagsString += generateStyleTag(item.key, item.ids.join(' '), item.css, nonceString);
    });
    return styleTagsString;
  };
};

function createEmotionServer (cache) {
  if (cache.compat !== true) {
    // is this good? should we do this automatically?
    // this is only for when using the new apis (not emotion or create-emotion)
    cache.compat = true;
  }

  var nonceString = cache.nonce !== undefined ? " nonce=\"" + cache.nonce + "\"" : '';
  return {
    extractCritical: createExtractCritical(cache),
    extractCriticalToChunks: createExtractCriticalToChunks(cache),
    renderStylesToString: createRenderStylesToString(cache, nonceString),
    renderStylesToNodeStream: createRenderStylesToNodeStream(cache, nonceString),
    constructStyleTagsFromChunks: createConstructStyleTagsFromChunks(cache, nonceString)
  };
}

exports["default"] = createEmotionServer;


/***/ }),

/***/ "./node_modules/@emotion/server/create-instance/dist/emotion-server-create-instance.cjs.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@emotion/server/create-instance/dist/emotion-server-create-instance.cjs.js ***!
  \*************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./emotion-server-create-instance.cjs.dev.js */ "./node_modules/@emotion/server/create-instance/dist/emotion-server-create-instance.cjs.dev.js");
}


/***/ }),

/***/ "./node_modules/@emotion/sheet/dist/emotion-sheet.cjs.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/emotion-sheet.cjs.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var isDevelopment = false;

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  } // this function should always return with a value
  // TS can't understand it though so we make it stop complaining here


  return undefined;
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? !isDevelopment : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    this.tags.forEach(function (tag) {
      var _tag$parentNode;

      return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

exports.StyleSheet = StyleSheet;


/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/emotion-unitless.cjs.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/emotion-unitless.cjs.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

exports["default"] = unitlessKeys;


/***/ }),

/***/ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.cjs.js":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.cjs.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var React = __webpack_require__(/*! react */ "react");

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var isBrowser = typeof document !== 'undefined';

var syncFallback = function syncFallback(create) {
  return create();
};

var useInsertionEffect = React__namespace['useInsertion' + 'Effect'] ? React__namespace['useInsertion' + 'Effect'] : false;
var useInsertionEffectAlwaysWithSyncFallback = !isBrowser ? syncFallback : useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || React__namespace.useLayoutEffect;

exports.useInsertionEffectAlwaysWithSyncFallback = useInsertionEffectAlwaysWithSyncFallback;
exports.useInsertionEffectWithLayoutFallback = useInsertionEffectWithLayoutFallback;


/***/ }),

/***/ "./node_modules/@emotion/utils/dist/emotion-utils.cjs.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/utils/dist/emotion-utils.cjs.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var isBrowser = typeof document !== 'undefined';

function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else if (className) {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var stylesForSSR = '';
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      if (!isBrowser && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }

      current = current.next;
    } while (current !== undefined);

    if (!isBrowser && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};

exports.getRegisteredStyles = getRegisteredStyles;
exports.insertStyles = insertStyles;
exports.registerStyles = registerStyles;


/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.dev.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.dev.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var weakMemoize = function weakMemoize(func) {
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // Use non-null assertion because we just checked that the cache `has` it
      // This allows us to remove `undefined` from the return value
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

exports["default"] = weakMemoize;


/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./emotion-weak-memoize.cjs.dev.js */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.dev.js");
}


/***/ }),

/***/ "./node_modules/@loadable/component/dist/cjs/loadable.cjs.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@loadable/component/dist/cjs/loadable.cjs.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(__webpack_require__(/*! react */ "react"));
var _objectWithoutPropertiesLoose = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends"));
var _assertThisInitialized = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "@babel/runtime/helpers/assertThisInitialized"));
var _inheritsLoose = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "@babel/runtime/helpers/inheritsLoose"));
var hoistNonReactStatics = _interopDefault(__webpack_require__(/*! hoist-non-react-statics */ "hoist-non-react-statics"));

/* eslint-disable import/prefer-default-export */
function invariant(condition, message) {
  if (condition) return;
  var error = new Error("loadable: " + message);
  error.framesToPop = 1;
  error.name = 'Invariant Violation';
  throw error;
}
function warn(message) {
  // eslint-disable-next-line no-console
  console.warn("loadable: " + message);
}

var Context = /*#__PURE__*/
React.createContext();

var LOADABLE_REQUIRED_CHUNKS_KEY = '__LOADABLE_REQUIRED_CHUNKS__';
function getRequiredChunkKey(namespace) {
  return "" + namespace + LOADABLE_REQUIRED_CHUNKS_KEY;
}

var sharedInternals = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getRequiredChunkKey: getRequiredChunkKey,
  invariant: invariant,
  Context: Context
});

var LOADABLE_SHARED = {
  initialChunks: {}
};

var STATUS_PENDING = 'PENDING';
var STATUS_RESOLVED = 'RESOLVED';
var STATUS_REJECTED = 'REJECTED';

function resolveConstructor(ctor) {
  if (typeof ctor === 'function') {
    return {
      requireAsync: ctor,
      resolve: function resolve() {
        return undefined;
      },
      chunkName: function chunkName() {
        return undefined;
      }
    };
  }

  return ctor;
}

var withChunkExtractor = function withChunkExtractor(Component) {
  var LoadableWithChunkExtractor = function LoadableWithChunkExtractor(props) {
    return React.createElement(Context.Consumer, null, function (extractor) {
      return React.createElement(Component, Object.assign({
        __chunkExtractor: extractor
      }, props));
    });
  };

  if (Component.displayName) {
    LoadableWithChunkExtractor.displayName = Component.displayName + "WithChunkExtractor";
  }

  return LoadableWithChunkExtractor;
};

var identity = function identity(v) {
  return v;
};

function createLoadable(_ref) {
  var _ref$defaultResolveCo = _ref.defaultResolveComponent,
      defaultResolveComponent = _ref$defaultResolveCo === void 0 ? identity : _ref$defaultResolveCo,
      _render = _ref.render,
      onLoad = _ref.onLoad;

  function loadable(loadableConstructor, options) {
    if (options === void 0) {
      options = {};
    }

    var ctor = resolveConstructor(loadableConstructor);
    var cache = {};
    /**
     * Cachekey represents the component to be loaded
     * if key changes - component has to be reloaded
     * @param props
     * @returns {null|Component}
     */

    function _getCacheKey(props) {
      if (options.cacheKey) {
        return options.cacheKey(props);
      }

      if (ctor.resolve) {
        return ctor.resolve(props);
      }

      return 'static';
    }
    /**
     * Resolves loaded `module` to a specific `Component
     * @param module
     * @param props
     * @param Loadable
     * @returns Component
     */


    function resolve(module, props, Loadable) {
      var Component = options.resolveComponent ? options.resolveComponent(module, props) : defaultResolveComponent(module); // FIXME: suppressed due to https://github.com/gregberge/loadable-components/issues/990
      // if (options.resolveComponent && !ReactIs.isValidElementType(Component)) {
      //   throw new Error(
      //     `resolveComponent returned something that is not a React component!`,
      //   )
      // }

      hoistNonReactStatics(Loadable, Component, {
        preload: true
      });
      return Component;
    }

    var cachedLoad = function cachedLoad(props) {
      var cacheKey = _getCacheKey(props);

      var promise = cache[cacheKey];

      if (!promise || promise.status === STATUS_REJECTED) {
        promise = ctor.requireAsync(props);
        promise.status = STATUS_PENDING;
        cache[cacheKey] = promise;
        promise.then(function () {
          promise.status = STATUS_RESOLVED;
        }, function (error) {
          console.error('loadable-components: failed to asynchronously load component', {
            fileName: ctor.resolve(props),
            chunkName: ctor.chunkName(props),
            error: error ? error.message : error
          });
          promise.status = STATUS_REJECTED;
        });
      }

      return promise;
    };

    var InnerLoadable =
    /*#__PURE__*/
    function (_React$Component) {
      _inheritsLoose(InnerLoadable, _React$Component);

      InnerLoadable.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
        var cacheKey = _getCacheKey(props);

        return _extends({}, state, {
          cacheKey: cacheKey,
          // change of a key triggers loading state automatically
          loading: state.loading || state.cacheKey !== cacheKey
        });
      };

      function InnerLoadable(props) {
        var _this;

        _this = _React$Component.call(this, props) || this;
        _this.state = {
          result: null,
          error: null,
          loading: true,
          cacheKey: _getCacheKey(props)
        };
        invariant(!props.__chunkExtractor || ctor.requireSync, 'SSR requires `@loadable/babel-plugin`, please install it'); // Server-side

        if (props.__chunkExtractor) {
          // This module has been marked with no SSR
          if (options.ssr === false) {
            return _assertThisInitialized(_this);
          } // We run load function, we assume that it won't fail and that it
          // triggers a synchronous loading of the module


          ctor.requireAsync(props)["catch"](function () {
            return null;
          }); // So we can require now the module synchronously

          _this.loadSync();

          props.__chunkExtractor.addChunk(ctor.chunkName(props));

          return _assertThisInitialized(_this);
        } // Client-side with `isReady` method present (SSR probably)
        // If module is already loaded, we use a synchronous loading
        // Only perform this synchronous loading if the component has not
        // been marked with no SSR, else we risk hydration mismatches


        if (options.ssr !== false && ( // is ready - was loaded in this session
        ctor.isReady && ctor.isReady(props) || // is ready - was loaded during SSR process
        ctor.chunkName && LOADABLE_SHARED.initialChunks[ctor.chunkName(props)])) {
          _this.loadSync();
        }

        return _this;
      }

      var _proto = InnerLoadable.prototype;

      _proto.componentDidMount = function componentDidMount() {
        this.mounted = true; // retrieve loading promise from a global cache

        var cachedPromise = this.getCache(); // if promise exists, but rejected - clear cache

        if (cachedPromise && cachedPromise.status === STATUS_REJECTED) {
          this.setCache();
        } // component might be resolved synchronously in the constructor


        if (this.state.loading) {
          this.loadAsync();
        }
      };

      _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        // Component has to be reloaded on cacheKey change
        if (prevState.cacheKey !== this.state.cacheKey) {
          this.loadAsync();
        }
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        this.mounted = false;
      };

      _proto.safeSetState = function safeSetState(nextState, callback) {
        if (this.mounted) {
          this.setState(nextState, callback);
        }
      }
      /**
       * returns a cache key for the current props
       * @returns {Component|string}
       */
      ;

      _proto.getCacheKey = function getCacheKey() {
        return _getCacheKey(this.props);
      }
      /**
       * access the persistent cache
       */
      ;

      _proto.getCache = function getCache() {
        return cache[this.getCacheKey()];
      }
      /**
       * sets the cache value. If called without value sets it as undefined
       */
      ;

      _proto.setCache = function setCache(value) {
        if (value === void 0) {
          value = undefined;
        }

        cache[this.getCacheKey()] = value;
      };

      _proto.triggerOnLoad = function triggerOnLoad() {
        var _this2 = this;

        if (onLoad) {
          setTimeout(function () {
            onLoad(_this2.state.result, _this2.props);
          });
        }
      }
      /**
       * Synchronously loads component
       * target module is expected to already exists in the module cache
       * or be capable to resolve synchronously (webpack target=node)
       */
      ;

      _proto.loadSync = function loadSync() {
        // load sync is expecting component to be in the "loading" state already
        // sounds weird, but loading=true is the initial state of InnerLoadable
        if (!this.state.loading) return;

        try {
          var loadedModule = ctor.requireSync(this.props);
          var result = resolve(loadedModule, this.props, Loadable);
          this.state.result = result;
          this.state.loading = false;
        } catch (error) {
          console.error('loadable-components: failed to synchronously load component, which expected to be available', {
            fileName: ctor.resolve(this.props),
            chunkName: ctor.chunkName(this.props),
            error: error ? error.message : error
          });
          this.state.error = error;
        }
      }
      /**
       * Asynchronously loads a component.
       */
      ;

      _proto.loadAsync = function loadAsync() {
        var _this3 = this;

        var promise = this.resolveAsync();
        promise.then(function (loadedModule) {
          var result = resolve(loadedModule, _this3.props, Loadable);

          _this3.safeSetState({
            result: result,
            loading: false
          }, function () {
            return _this3.triggerOnLoad();
          });
        })["catch"](function (error) {
          return _this3.safeSetState({
            error: error,
            loading: false
          });
        });
        return promise;
      }
      /**
       * Asynchronously resolves(not loads) a component.
       * Note - this function does not change the state
       */
      ;

      _proto.resolveAsync = function resolveAsync() {
        var _this$props = this.props,
            __chunkExtractor = _this$props.__chunkExtractor,
            forwardedRef = _this$props.forwardedRef,
            props = _objectWithoutPropertiesLoose(_this$props, ["__chunkExtractor", "forwardedRef"]);

        return cachedLoad(props);
      };

      _proto.render = function render() {
        var _this$props2 = this.props,
            forwardedRef = _this$props2.forwardedRef,
            propFallback = _this$props2.fallback,
            __chunkExtractor = _this$props2.__chunkExtractor,
            props = _objectWithoutPropertiesLoose(_this$props2, ["forwardedRef", "fallback", "__chunkExtractor"]);

        var _this$state = this.state,
            error = _this$state.error,
            loading = _this$state.loading,
            result = _this$state.result;

        if (options.suspense) {
          var cachedPromise = this.getCache() || this.loadAsync();

          if (cachedPromise.status === STATUS_PENDING) {
            throw this.loadAsync();
          }
        }

        if (error) {
          throw error;
        }

        var fallback = propFallback || options.fallback || null;

        if (loading) {
          return fallback;
        }

        return _render({
          fallback: fallback,
          result: result,
          options: options,
          props: _extends({}, props, {
            ref: forwardedRef
          })
        });
      };

      return InnerLoadable;
    }(React.Component);

    var EnhancedInnerLoadable = withChunkExtractor(InnerLoadable);
    var Loadable = React.forwardRef(function (props, ref) {
      return React.createElement(EnhancedInnerLoadable, Object.assign({
        forwardedRef: ref
      }, props));
    });
    Loadable.displayName = 'Loadable'; // In future, preload could use `<link rel="preload">`

    Loadable.preload = function (props) {
      Loadable.load(props);
    };

    Loadable.load = function (props) {
      return cachedLoad(props);
    };

    return Loadable;
  }

  function lazy(ctor, options) {
    return loadable(ctor, _extends({}, options, {
      suspense: true
    }));
  }

  return {
    loadable: loadable,
    lazy: lazy
  };
}

function defaultResolveComponent(loadedModule) {
  // eslint-disable-next-line no-underscore-dangle
  return loadedModule.__esModule ? loadedModule["default"] : loadedModule["default"] || loadedModule;
}

/* eslint-disable no-use-before-define, react/no-multi-comp */

var _createLoadable =
/*#__PURE__*/
createLoadable({
  defaultResolveComponent: defaultResolveComponent,
  render: function render(_ref) {
    var Component = _ref.result,
        props = _ref.props;
    return React.createElement(Component, props);
  }
}),
    loadable = _createLoadable.loadable,
    lazy = _createLoadable.lazy;

/* eslint-disable no-use-before-define, react/no-multi-comp */

var _createLoadable$1 =
/*#__PURE__*/
createLoadable({
  onLoad: function onLoad(result, props) {
    if (result && props.forwardedRef) {
      if (typeof props.forwardedRef === 'function') {
        props.forwardedRef(result);
      } else {
        props.forwardedRef.current = result;
      }
    }
  },
  render: function render(_ref) {
    var result = _ref.result,
        props = _ref.props;

    if (props.children) {
      return props.children(result);
    }

    return null;
  }
}),
    loadable$1 = _createLoadable$1.loadable,
    lazy$1 = _createLoadable$1.lazy;

/* eslint-disable no-underscore-dangle, camelcase */
var BROWSER = typeof window !== 'undefined';
function loadableReady(done, _temp) {
  if (done === void 0) {
    done = function done() {};
  }

  var _ref = _temp === void 0 ? {} : _temp,
      _ref$namespace = _ref.namespace,
      namespace = _ref$namespace === void 0 ? '' : _ref$namespace,
      _ref$chunkLoadingGlob = _ref.chunkLoadingGlobal,
      chunkLoadingGlobal = _ref$chunkLoadingGlob === void 0 ? '__LOADABLE_LOADED_CHUNKS__' : _ref$chunkLoadingGlob;

  if (!BROWSER) {
    warn('`loadableReady()` must be called in browser only');
    done();
    return Promise.resolve();
  }

  var requiredChunks = null;

  if (BROWSER) {
    var id = getRequiredChunkKey(namespace);
    var dataElement = document.getElementById(id);

    if (dataElement) {
      requiredChunks = JSON.parse(dataElement.textContent);
      var extElement = document.getElementById(id + "_ext");

      if (extElement) {
        var _JSON$parse = JSON.parse(extElement.textContent),
            namedChunks = _JSON$parse.namedChunks;

        namedChunks.forEach(function (chunkName) {
          LOADABLE_SHARED.initialChunks[chunkName] = true;
        });
      } else {
        // version mismatch
        throw new Error('loadable-component: @loadable/server does not match @loadable/component');
      }
    }
  }

  if (!requiredChunks) {
    warn('`loadableReady()` requires state, please use `getScriptTags` or `getScriptElements` server-side');
    done();
    return Promise.resolve();
  }

  var resolved = false;
  return new Promise(function (resolve) {
    window[chunkLoadingGlobal] = window[chunkLoadingGlobal] || [];
    var loadedChunks = window[chunkLoadingGlobal];
    var originalPush = loadedChunks.push.bind(loadedChunks);

    function checkReadyState() {
      if (requiredChunks.every(function (chunk) {
        return loadedChunks.some(function (_ref2) {
          var chunks = _ref2[0];
          return chunks.indexOf(chunk) > -1;
        });
      })) {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      }
    }

    loadedChunks.push = function () {
      originalPush.apply(void 0, arguments);
      checkReadyState();
    };

    checkReadyState();
  }).then(done);
}

/* eslint-disable no-underscore-dangle */
var loadable$2 = loadable;
loadable$2.lib = loadable$1;
var lazy$2 = lazy;
lazy$2.lib = lazy$1;
var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sharedInternals;

exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
exports["default"] = loadable$2;
exports.lazy = lazy$2;
exports.loadableReady = loadableReady;


/***/ }),

/***/ "./node_modules/@loadable/server/dist/cjs/loadable-server.cjs.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@loadable/server/dist/cjs/loadable-server.cjs.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(__webpack_require__(/*! react */ "react"));
var component = __webpack_require__(/*! @loadable/component */ "./node_modules/@loadable/component/dist/cjs/loadable.cjs.js");
var _extends = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends"));
var path = _interopDefault(__webpack_require__(/*! path */ "path"));
var fs = _interopDefault(__webpack_require__(/*! fs */ "fs"));
var uniq = _interopDefault(__webpack_require__(/*! lodash/uniq.js */ "lodash/uniq.js"));
var uniqBy = _interopDefault(__webpack_require__(/*! lodash/uniqBy.js */ "lodash/uniqBy.js"));
var flatMap = _interopDefault(__webpack_require__(/*! lodash/flatMap.js */ "lodash/flatMap.js"));

/* eslint-disable no-underscore-dangle */
var invariant = component.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.invariant,
    Context = component.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Context,
    getRequiredChunkKey = component.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.getRequiredChunkKey;

var ChunkExtractorManager = function ChunkExtractorManager(_ref) {
  var extractor = _ref.extractor,
      children = _ref.children;
  return React.createElement(Context.Provider, {
    value: extractor
  }, children);
};

// Use __non_webpack_require__ to prevent Webpack from compiling it
// when the server-side code is compiled with Webpack
// eslint-disable-next-line camelcase, no-undef, global-require, import/no-dynamic-require, no-eval
var getRequire = function getRequire() {
  return typeof require !== 'undefined' ? require : eval('require');
};

var clearModuleCache = function clearModuleCache(moduleName) {
  var _getRequire = getRequire(),
      cache = _getRequire.cache;

  var m = cache[moduleName];

  if (m) {
    // remove self from own parents
    if (m.parent && m.parent.children) {
      m.parent.children = m.parent.children.filter(function (x) {
        return x !== m;
      });
    } // remove self from own children


    if (m.children) {
      m.children.forEach(function (child) {
        if (child.parent && child.parent === m) {
          child.parent = null;
        }
      });
    }

    delete cache[moduleName];
  }
};
var smartRequire = function smartRequire(modulePath) {
  if (false) // removed by dead control flow
{}

  return getRequire()(modulePath);
};
var joinURLPath = function joinURLPath(publicPath, filename) {
  if (publicPath.substr(-1) === '/') {
    return "" + publicPath + filename;
  }

  return publicPath + "/" + filename;
};
var readJsonFileSync = function readJsonFileSync(inputFileSystem, jsonFilePath) {
  return JSON.parse(inputFileSystem.readFileSync(jsonFilePath));
};

var EXTENSION_SCRIPT_TYPES = {
  '.js': 'script',
  '.mjs': 'script',
  '.css': 'style'
};

function extensionToScriptType(extension) {
  return EXTENSION_SCRIPT_TYPES[extension] || null;
}
/**
 * some files can be references with extra query arguments which have to be removed
 * @param name
 * @returns {*}
 */


function cleanFileName(name) {
  return name.split('?')[0];
}

function getFileScriptType(fileName) {
  return extensionToScriptType(cleanFileName(path.extname(fileName)).toLowerCase());
}

function isScriptFile(fileName) {
  return getFileScriptType(fileName) === 'script';
}

function getAssets(chunks, getAsset) {
  return uniqBy(flatMap(chunks, function (chunk) {
    return getAsset(chunk);
  }), 'url');
}

function handleExtraProps(asset, extraProps) {
  return typeof extraProps === 'function' ? extraProps(asset) : extraProps;
}

function extraPropsToString(asset, extraProps) {
  return Object.entries(handleExtraProps(asset, extraProps)).reduce(function (acc, _ref) {
    var key = _ref[0],
        value = _ref[1];
    return acc + " " + key + "=\"" + value + "\"";
  }, '');
}

function getSriHtmlAttributes(asset) {
  if (!asset.integrity) {
    return '';
  }

  return " integrity=\"" + asset.integrity + "\"";
}

function assetToScriptTag(asset, extraProps) {
  return "<script async data-chunk=\"" + asset.chunk + "\" src=\"" + asset.url + "\"" + getSriHtmlAttributes(asset) + extraPropsToString(asset, extraProps) + "></script>";
}

function assetToScriptElement(asset, extraProps) {
  return React.createElement("script", Object.assign({
    key: asset.url,
    async: true,
    "data-chunk": asset.chunk,
    src: asset.url
  }, handleExtraProps(asset, extraProps)));
}

function assetToStyleString(asset, _ref2) {
  var inputFileSystem = _ref2.inputFileSystem;
  return new Promise(function (resolve, reject) {
    inputFileSystem.readFile(asset.path, 'utf8', function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

function assetToStyleTag(asset, extraProps) {
  return "<link data-chunk=\"" + asset.chunk + "\" rel=\"stylesheet\" href=\"" + asset.url + "\"" + getSriHtmlAttributes(asset) + extraPropsToString(asset, extraProps) + ">";
}

function assetToStyleTagInline(asset, extraProps, _ref3) {
  var inputFileSystem = _ref3.inputFileSystem;
  return new Promise(function (resolve, reject) {
    inputFileSystem.readFile(asset.path, 'utf8', function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve("<style type=\"text/css\" data-chunk=\"" + asset.chunk + "\"" + extraPropsToString(asset, extraProps) + ">\n" + data + "\n</style>");
    });
  });
}

function assetToStyleElement(asset, extraProps) {
  return React.createElement("link", Object.assign({
    key: asset.url,
    "data-chunk": asset.chunk,
    rel: "stylesheet",
    href: asset.url
  }, handleExtraProps(asset, extraProps)));
}

function assetToStyleElementInline(asset, extraProps, _ref4) {
  var inputFileSystem = _ref4.inputFileSystem;
  return new Promise(function (resolve, reject) {
    inputFileSystem.readFile(asset.path, 'utf8', function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(React.createElement("style", Object.assign({
        key: asset.url,
        "data-chunk": asset.chunk,
        dangerouslySetInnerHTML: {
          __html: data
        }
      }, handleExtraProps(asset, extraProps))));
    });
  });
}

var LINK_ASSET_HINTS = {
  mainAsset: 'data-chunk',
  childAsset: 'data-parent-chunk'
};

function assetToLinkTag(asset, extraProps) {
  var hint = LINK_ASSET_HINTS[asset.type];
  return "<link " + hint + "=\"" + asset.chunk + "\" rel=\"" + asset.linkType + "\" as=\"" + asset.scriptType + "\" href=\"" + asset.url + "\"" + getSriHtmlAttributes(asset) + extraPropsToString(asset, extraProps) + ">";
}

function assetToLinkElement(asset, extraProps) {
  var _extends2;

  var hint = LINK_ASSET_HINTS[asset.type];

  var props = _extends((_extends2 = {
    key: asset.url
  }, _extends2[hint] = asset.chunk, _extends2.rel = asset.linkType, _extends2.as = asset.scriptType, _extends2.href = asset.url, _extends2), handleExtraProps(asset, extraProps));

  return React.createElement("link", props);
}

function joinTags(tags) {
  return tags.join('\n');
}

var HOT_UPDATE_REGEXP = /\.hot-update\.js$/;

function isValidChunkAsset(chunkAsset) {
  return chunkAsset.scriptType && !HOT_UPDATE_REGEXP.test(chunkAsset.filename);
}

function checkIfChunkIncludesJs(chunkInfo) {
  return chunkInfo.files.some(function (file) {
    return isScriptFile(file);
  });
}

var ChunkExtractor =
/*#__PURE__*/
function () {
  function ChunkExtractor(_temp) {
    var _ref5 = _temp === void 0 ? {} : _temp,
        statsFile = _ref5.statsFile,
        stats = _ref5.stats,
        _ref5$entrypoints = _ref5.entrypoints,
        entrypoints = _ref5$entrypoints === void 0 ? ['main'] : _ref5$entrypoints,
        _ref5$namespace = _ref5.namespace,
        namespace = _ref5$namespace === void 0 ? '' : _ref5$namespace,
        outputPath = _ref5.outputPath,
        publicPath = _ref5.publicPath,
        _ref5$inputFileSystem = _ref5.inputFileSystem,
        inputFileSystem = _ref5$inputFileSystem === void 0 ? fs : _ref5$inputFileSystem;

    this.namespace = namespace;
    this.stats = stats || readJsonFileSync(inputFileSystem, statsFile);
    this.publicPath = publicPath || this.stats.publicPath;
    this.outputPath = outputPath || this.stats.outputPath;
    this.statsFile = statsFile;
    this.entrypoints = Array.isArray(entrypoints) ? entrypoints : [entrypoints];
    this.chunks = [];
    this.inputFileSystem = inputFileSystem;
  }

  var _proto = ChunkExtractor.prototype;

  _proto.resolvePublicUrl = function resolvePublicUrl(filename) {
    return joinURLPath(this.publicPath, filename);
  };

  _proto.getChunkGroup = function getChunkGroup(chunk) {
    var chunkGroup = this.stats.namedChunkGroups[chunk];
    invariant(chunkGroup, "cannot find " + chunk + " in stats");
    return chunkGroup;
  };

  _proto.getChunkInfo = function getChunkInfo(chunkId) {
    var chunkInfo = this.stats.chunks.find(function (chunk) {
      return chunk.id === chunkId;
    });
    invariant(chunkInfo, "cannot find chunk (chunkId: " + chunkId + ") in stats");
    return chunkInfo;
  };

  _proto.createChunkAsset = function createChunkAsset(_ref6) {
    var filename = _ref6.filename,
        chunk = _ref6.chunk,
        type = _ref6.type,
        linkType = _ref6.linkType;
    var resolvedFilename = typeof filename === 'object' && filename.name ? filename.name : filename;
    var resolvedIntegrity = typeof filename === 'object' && filename.integrity ? filename.integrity : null;
    return {
      filename: resolvedFilename,
      integrity: resolvedIntegrity,
      scriptType: getFileScriptType(resolvedFilename),
      chunk: chunk,
      url: this.resolvePublicUrl(resolvedFilename),
      path: path.join(this.outputPath, resolvedFilename),
      type: type,
      linkType: linkType
    };
  };

  _proto.getChunkAssets = function getChunkAssets(chunks) {
    var _this = this;

    var one = function one(chunk) {
      var chunkGroup = _this.getChunkGroup(chunk);

      return chunkGroup.assets.map(function (filename) {
        return _this.createChunkAsset({
          filename: filename,
          chunk: chunk,
          type: 'mainAsset',
          linkType: 'preload'
        });
      }).filter(isValidChunkAsset);
    };

    if (Array.isArray(chunks)) {
      return getAssets(chunks, one);
    }

    return one(chunks);
  };

  _proto.getChunkChildAssets = function getChunkChildAssets(chunks, type) {
    var _this2 = this;

    var one = function one(chunk) {
      var chunkGroup = _this2.getChunkGroup(chunk);

      var assets = chunkGroup.childAssets[type] || [];
      return assets.map(function (filename) {
        return _this2.createChunkAsset({
          filename: filename,
          chunk: chunk,
          type: 'childAsset',
          linkType: type
        });
      }).filter(isValidChunkAsset);
    };

    if (Array.isArray(chunks)) {
      return getAssets(chunks, one);
    }

    return one(chunks);
  };

  _proto.getChunkDependencies = function getChunkDependencies(chunks) {
    var _this3 = this;

    var one = function one(chunk) {
      var chunkGroup = _this3.getChunkGroup(chunk); // ignore chunk that only contains css files.


      return chunkGroup.chunks.filter(function (chunkId) {
        var chunkInfo = _this3.getChunkInfo(chunkId);

        if (!chunkInfo) {
          return false;
        }

        return checkIfChunkIncludesJs(chunkInfo);
      });
    };

    if (Array.isArray(chunks)) {
      return uniq(flatMap(chunks, one));
    }

    return one(chunks);
  };

  _proto.getRequiredChunksScriptContent = function getRequiredChunksScriptContent() {
    return JSON.stringify(this.getChunkDependencies(this.chunks));
  };

  _proto.getRequiredChunksNamesScriptContent = function getRequiredChunksNamesScriptContent() {
    return JSON.stringify({
      namedChunks: this.chunks
    });
  };

  _proto.getRequiredChunksScriptTag = function getRequiredChunksScriptTag(extraProps) {
    var id = getRequiredChunkKey(this.namespace);
    var props = "type=\"application/json\"" + extraPropsToString(null, extraProps);
    return ["<script id=\"" + id + "\" " + props + ">" + this.getRequiredChunksScriptContent() + "</script>", "<script id=\"" + id + "_ext\" " + props + ">" + this.getRequiredChunksNamesScriptContent() + "</script>"].join('');
  };

  _proto.getRequiredChunksScriptElements = function getRequiredChunksScriptElements(extraProps) {
    var id = getRequiredChunkKey(this.namespace);

    var props = _extends({
      type: 'application/json'
    }, handleExtraProps(null, extraProps));

    return [React.createElement("script", Object.assign({
      id: id,
      key: id,
      dangerouslySetInnerHTML: {
        __html: this.getRequiredChunksScriptContent()
      }
    }, props)), React.createElement("script", Object.assign({
      id: id + "_ext",
      key: id + "_ext",
      dangerouslySetInnerHTML: {
        __html: this.getRequiredChunksNamesScriptContent()
      }
    }, props))];
  } // Public methods
  // -----------------
  // Collect
  ;

  _proto.addChunk = function addChunk(chunk) {
    if (this.chunks.indexOf(chunk) !== -1) return;
    this.chunks.push(chunk);
  };

  _proto.collectChunks = function collectChunks(app) {
    return React.createElement(ChunkExtractorManager, {
      extractor: this
    }, app);
  } // Utilities
  ;

  _proto.requireEntrypoint = function requireEntrypoint(entrypoint) {
    var entrypointPath = this.getEntrypointPath(this.entrypoint);
    this.getAllScriptAssetsPaths().forEach(function (assetPath) {
      smartRequire(assetPath);
    });
    return smartRequire(entrypointPath);
  };

  _proto.getEntrypointPath = function getEntrypointPath(entrypoint) {
    entrypoint = entrypoint || this.entrypoints[0];
    var assets = this.getChunkAssets(entrypoint);
    var mainAsset = assets.find(function (asset) {
      return asset.scriptType === 'script';
    });
    invariant(mainAsset, 'asset not found');
    return cleanFileName(mainAsset.path);
  };

  _proto.getAllScriptAssetsPaths = function getAllScriptAssetsPaths() {
    var _this4 = this;

    return this.stats.assets.filter(function (_ref7) {
      var name = _ref7.name;
      return isScriptFile(name);
    }).map(function (_ref8) {
      var name = _ref8.name;
      return path.join(_this4.outputPath, cleanFileName(name));
    });
  } // Main assets
  ;

  _proto.getMainAssets = function getMainAssets(scriptType) {
    var chunks = [].concat(this.entrypoints, this.chunks);
    var assets = this.getChunkAssets(chunks);

    if (scriptType) {
      return assets.filter(function (asset) {
        return asset.scriptType === scriptType;
      });
    }

    return assets;
  };

  _proto.getScriptTags = function getScriptTags(extraProps) {
    if (extraProps === void 0) {
      extraProps = {};
    }

    var requiredScriptTag = this.getRequiredChunksScriptTag(extraProps);
    var mainAssets = this.getMainAssets('script');
    var assetsScriptTags = mainAssets.map(function (asset) {
      return assetToScriptTag(asset, extraProps);
    });
    return joinTags([requiredScriptTag].concat(assetsScriptTags));
  };

  _proto.getScriptElements = function getScriptElements(extraProps) {
    if (extraProps === void 0) {
      extraProps = {};
    }

    var requiredScriptElements = this.getRequiredChunksScriptElements(extraProps);
    var mainAssets = this.getMainAssets('script');
    var assetsScriptElements = mainAssets.map(function (asset) {
      return assetToScriptElement(asset, extraProps);
    });
    return [].concat(requiredScriptElements, assetsScriptElements);
  };

  _proto.getCssString = function getCssString() {
    var _this5 = this;

    var mainAssets = this.getMainAssets('style');
    var promises = mainAssets.map(function (asset) {
      return assetToStyleString(asset, _this5).then(function (data) {
        return data;
      });
    });
    return Promise.all(promises).then(function (results) {
      return joinTags(results);
    });
  };

  _proto.getStyleTags = function getStyleTags(extraProps) {
    if (extraProps === void 0) {
      extraProps = {};
    }

    var mainAssets = this.getMainAssets('style');
    return joinTags(mainAssets.map(function (asset) {
      return assetToStyleTag(asset, extraProps);
    }));
  };

  _proto.getInlineStyleTags = function getInlineStyleTags(extraProps) {
    var _this6 = this;

    if (extraProps === void 0) {
      extraProps = {};
    }

    var mainAssets = this.getMainAssets('style');
    var promises = mainAssets.map(function (asset) {
      return assetToStyleTagInline(asset, extraProps, _this6).then(function (data) {
        return data;
      });
    });
    return Promise.all(promises).then(function (results) {
      return joinTags(results);
    });
  };

  _proto.getStyleElements = function getStyleElements(extraProps) {
    if (extraProps === void 0) {
      extraProps = {};
    }

    var mainAssets = this.getMainAssets('style');
    return mainAssets.map(function (asset) {
      return assetToStyleElement(asset, extraProps);
    });
  };

  _proto.getInlineStyleElements = function getInlineStyleElements(extraProps) {
    var _this7 = this;

    if (extraProps === void 0) {
      extraProps = {};
    }

    var mainAssets = this.getMainAssets('style');
    var promises = mainAssets.map(function (asset) {
      return assetToStyleElementInline(asset, extraProps, _this7).then(function (data) {
        return data;
      });
    });
    return Promise.all(promises).then(function (results) {
      return results;
    });
  } // Pre assets
  ;

  _proto.getPreAssets = function getPreAssets() {
    var mainAssets = this.getMainAssets();
    var chunks = [].concat(this.entrypoints, this.chunks);
    var preloadAssets = this.getChunkChildAssets(chunks, 'preload');
    var prefetchAssets = this.getChunkChildAssets(chunks, 'prefetch');
    return [].concat(mainAssets, preloadAssets, prefetchAssets).sort(function (a) {
      return a.scriptType === 'style' ? -1 : 0;
    });
  };

  _proto.getLinkTags = function getLinkTags(extraProps) {
    if (extraProps === void 0) {
      extraProps = {};
    }

    var assets = this.getPreAssets();
    var linkTags = assets.map(function (asset) {
      return assetToLinkTag(asset, extraProps);
    });
    return joinTags(linkTags);
  };

  _proto.getLinkElements = function getLinkElements(extraProps) {
    if (extraProps === void 0) {
      extraProps = {};
    }

    var assets = this.getPreAssets();
    return assets.map(function (asset) {
      return assetToLinkElement(asset, extraProps);
    });
  };

  return ChunkExtractor;
}();

exports.ChunkExtractor = ChunkExtractor;
exports.ChunkExtractorManager = ChunkExtractorManager;


/***/ }),

/***/ "./node_modules/react-router-dom/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-router-dom/dist/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * react-router-dom v7.8.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var index_exports = {};
__export(index_exports, {
  HydratedRouter: () => import_dom.HydratedRouter,
  RouterProvider: () => import_dom.RouterProvider
});
module.exports = __toCommonJS(index_exports);
var import_dom = __webpack_require__(/*! react-router/dom */ "react-router/dom");
__reExport(index_exports, __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/index.js"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ "./node_modules/react-router/dist/development sync recursive":
/*!**********************************************************!*\
  !*** ./node_modules/react-router/dist/development/ sync ***!
  \**********************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/react-router/dist/development sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "./node_modules/react-router/dist/development/chunk-EVX7OBGB.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-router/dist/development/chunk-EVX7OBGB.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value: true})); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * react-router v7.8.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);

// lib/router/history.ts
var Action = /* @__PURE__ */ ((Action2) => {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
  return Action2;
})(Action || {});
var PopStateEventType = "popstate";
function createMemoryHistory(options = {}) {
  let { initialEntries = ["/"], initialIndex, v5Compat = false } = options;
  let entries;
  entries = initialEntries.map(
    (entry, index2) => createMemoryLocation(
      entry,
      typeof entry === "string" ? null : entry.state,
      index2 === 0 ? "default" : void 0
    )
  );
  let index = clampIndex(
    initialIndex == null ? entries.length - 1 : initialIndex
  );
  let action = "POP" /* Pop */;
  let listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state = null, key) {
    let location = createLocation(
      entries ? getCurrentLocation().pathname : "/",
      to,
      state,
      key
    );
    warning(
      location.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        to
      )}`
    );
    return location;
  }
  function createHref(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  let history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref,
    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = "PUSH" /* Push */;
      let nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({ action, location: nextLocation, delta: 1 });
      }
    },
    replace(to, state) {
      action = "REPLACE" /* Replace */;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({ action, location: nextLocation, delta: 0 });
      }
    },
    go(delta) {
      action = "POP" /* Pop */;
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({ action, location: nextLocation, delta });
      }
    },
    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }
  };
  return history;
}
function createBrowserHistory(options = {}) {
  function createBrowserLocation(window2, globalHistory) {
    let { pathname, search, hash } = window2.location;
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(
    createBrowserLocation,
    createBrowserHref,
    null,
    options
  );
}
function createHashHistory(options = {}) {
  function createHashLocation(window2, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window2.location.hash.substring(1));
    if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
      pathname = "/" + pathname;
    }
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createHashHref(window2, to) {
    let base = window2.document.querySelector("base");
    let href = "";
    if (base && base.getAttribute("href")) {
      let url = window2.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(
      location.pathname.charAt(0) === "/",
      `relative pathnames are not supported in hash history.push(${JSON.stringify(
        to
      )})`
    );
  }
  return getUrlBasedHistory(
    createHashLocation,
    createHashHref,
    validateHashLocation,
    options
  );
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substring(2, 10);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
function createLocation(current, to, state = null, key) {
  let location = {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...typeof to === "string" ? parsePath(to) : to,
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  };
  return location;
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options = {}) {
  let { window: window2 = document.defaultView, v5Compat = false } = options;
  let globalHistory = window2.history;
  let action = "POP" /* Pop */;
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState({ ...globalHistory.state, idx: index }, "");
  }
  function getIndex() {
    let state = globalHistory.state || { idx: null };
    return state.idx;
  }
  function handlePop() {
    action = "POP" /* Pop */;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({ action, location: history.location, delta });
    }
  }
  function push(to, state) {
    action = "PUSH" /* Push */;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 1 });
    }
  }
  function replace2(to, state) {
    action = "REPLACE" /* Replace */;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 0 });
    }
  }
  function createURL(to) {
    return createBrowserURLImpl(to);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace: replace2,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
function createBrowserURLImpl(to, isAbsolute = false) {
  let base = "http://localhost";
  if (typeof window !== "undefined") {
    base = window.location.origin !== "null" ? window.location.origin : window.location.href;
  }
  invariant(base, "No window.location.(origin|href) available to create URL");
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  if (!isAbsolute && href.startsWith("//")) {
    href = base + href;
  }
  return new URL(href, base);
}

// lib/router/utils.ts
function unstable_createContext(defaultValue) {
  return { defaultValue };
}
var _map;
var unstable_RouterContextProvider = class {
  /**
   * Create a new `unstable_RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(init) {
    __privateAdd(this, _map, /* @__PURE__ */ new Map());
    if (init) {
      for (let [context, value] of init) {
        this.set(context, value);
      }
    }
  }
  /**
   * Access a value from the context. If no value has been set for the context,
   * it will return the context's `defaultValue` if provided, or throw an error
   * if no `defaultValue` was set.
   * @param context The context to get the value for
   * @returns The value for the context, or the context's `defaultValue` if no
   * value was set
   */
  get(context) {
    if (__privateGet(this, _map).has(context)) {
      return __privateGet(this, _map).get(context);
    }
    if (context.defaultValue !== void 0) {
      return context.defaultValue;
    }
    throw new Error("No value found for context");
  }
  /**
   * Set a value for the context. If the context already has a value set, this
   * will overwrite it.
   *
   * @param context The context to set the value for
   * @param value The value to set for the context
   * @returns {void}
   */
  set(context, value) {
    __privateGet(this, _map).set(context, value);
  }
};
_map = new WeakMap();
var unsupportedLazyRouteObjectKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function isUnsupportedLazyRouteObjectKey(key) {
  return unsupportedLazyRouteObjectKeys.has(
    key
  );
}
var unsupportedLazyRouteFunctionKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "unstable_middleware",
  "children"
]);
function isUnsupportedLazyRouteFunctionKey(key) {
  return unsupportedLazyRouteFunctionKeys.has(
    key
  );
}
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes, mapRouteProperties, parentPath = [], manifest = {}, allowInPlaceMutations = false) {
  return routes.map((route, index) => {
    let treePath = [...parentPath, String(index)];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(
      route.index !== true || !route.children,
      `Cannot specify children on an index route`
    );
    invariant(
      allowInPlaceMutations || !manifest[id],
      `Found a route id collision on id "${id}".  Route id's must be globally unique within Data Router usages`
    );
    if (isIndexRoute(route)) {
      let indexRoute = {
        ...route,
        ...mapRouteProperties(route),
        id
      };
      manifest[id] = indexRoute;
      return indexRoute;
    } else {
      let pathOrLayoutRoute = {
        ...route,
        ...mapRouteProperties(route),
        id,
        children: void 0
      };
      manifest[id] = pathOrLayoutRoute;
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(
          route.children,
          mapRouteProperties,
          treePath,
          manifest,
          allowInPlaceMutations
        );
      }
      return pathOrLayoutRoute;
    }
  });
}
function matchRoutes(routes, locationArg, basename = "/") {
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(
      branches[i],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let { route, pathname, params } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    loaderData: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "") {
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(
        meta.relativePath.startsWith(parentPath),
        `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    if (route.path === "" || !_optionalChain([route, 'access', _2 => _2.path, 'optionalAccess', _3 => _3.includes, 'call', _4 => _4("?")])) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(
      a.routesMeta.map((meta) => meta.childrenIndex),
      b.routesMeta.map((meta) => meta.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath(
      { path: meta.relativePath, caseSensitive: meta.caseSensitive, end },
      remainingPathname
    );
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function generatePath(originalPath, params = {}) {
  let path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(
      false,
      `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
    );
    path = path.replace(/\*$/, "/*");
  }
  const prefix = path.startsWith("/") ? "/" : "";
  const stringify2 = (p) => p == null ? "" : typeof p === "string" ? p : String(p);
  const segments = path.split(/\/+/).map((segment, index, array) => {
    const isLastSegment = index === array.length - 1;
    if (isLastSegment && segment === "*") {
      const star = "*";
      return stringify2(params[star]);
    }
    const keyMatch = segment.match(/^:([\w-]+)(\??)$/);
    if (keyMatch) {
      const [, key, optional] = keyMatch;
      let param = params[key];
      invariant(optional === "?" || param != null, `Missing ":${key}" param`);
      return stringify2(param);
    }
    return segment.replace(/\?$/g, "");
  }).filter((segment) => !!segment);
  return prefix + segments.join("/");
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = { path: pattern, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end
  );
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo, { paramName, isOptional }, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo[paramName] = void 0;
      } else {
        memo[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (_, paramName, isOptional) => {
      params.push({ paramName, isOptional: isOptional != null });
      return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
    }
  );
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else {
  }
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function prependBasename({
  basename,
  pathname
}) {
  return pathname === "/" ? basename : joinPaths([basename, pathname]);
}
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = { ...toArg };
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to)
    );
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to)
    );
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to)
    );
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var DataWithResponseInit = class {
  constructor(data2, init) {
    this.type = "DataWithResponseInit";
    this.data = data2;
    this.init = init || null;
  }
};
function data(data2, init) {
  return new DataWithResponseInit(
    data2,
    typeof init === "number" ? { status: init } : init
  );
}
var redirect = (url, init = 302) => {
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = { status: responseInit };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, { ...responseInit, headers });
};
var redirectDocument = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Reload-Document", "true");
  return response;
};
var replace = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Replace", "true");
  return response;
};
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal = false) {
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
};
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}

// lib/router/router.ts
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
var validMutationMethods = new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
var validRequestMethods = new Set(validRequestMethodsArr);
var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
var IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
var defaultMapRouteProperties = (route) => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
var TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
var ResetLoaderDataSymbol = Symbol("ResetLoaderData");
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
  const isBrowser = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  invariant(
    init.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let hydrationRouteProperties = init.hydrationRouteProperties || [];
  let mapRouteProperties = init.mapRouteProperties || defaultMapRouteProperties;
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(
    init.routes,
    mapRouteProperties,
    void 0,
    manifest
  );
  let inFlightDataRoutes;
  let basename = init.basename || "/";
  let dataStrategyImpl = init.dataStrategy || defaultDataStrategyWithMiddleware;
  let future = {
    unstable_middleware: false,
    ...init.future
  };
  let unlistenHistory = null;
  let subscribers = /* @__PURE__ */ new Set();
  let savedScrollPositions = null;
  let getScrollRestorationKey = null;
  let getScrollPosition = null;
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
  let initialMatchesIsFOW = false;
  let initialErrors = null;
  let initialized;
  if (initialMatches == null && !init.patchRoutesOnNavigation) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let { matches, route } = getShortCircuitMatches(dataRoutes);
    initialized = true;
    initialMatches = matches;
    initialErrors = { [route.id]: error };
  } else {
    if (initialMatches && !init.hydrationData) {
      let fogOfWar = checkFogOfWar(
        initialMatches,
        dataRoutes,
        init.history.location.pathname
      );
      if (fogOfWar.active) {
        initialMatches = null;
      }
    }
    if (!initialMatches) {
      initialized = false;
      initialMatches = [];
      let fogOfWar = checkFogOfWar(
        null,
        dataRoutes,
        init.history.location.pathname
      );
      if (fogOfWar.active && fogOfWar.matches) {
        initialMatchesIsFOW = true;
        initialMatches = fogOfWar.matches;
      }
    } else if (initialMatches.some((m) => m.route.lazy)) {
      initialized = false;
    } else if (!initialMatches.some((m) => m.route.loader)) {
      initialized = true;
    } else {
      let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
      let errors = init.hydrationData ? init.hydrationData.errors : null;
      if (errors) {
        let idx = initialMatches.findIndex(
          (m) => errors[m.route.id] !== void 0
        );
        initialized = initialMatches.slice(0, idx + 1).every(
          (m) => !shouldLoadRouteOnHydration(m.route, loaderData, errors)
        );
      } else {
        initialized = initialMatches.every(
          (m) => !shouldLoadRouteOnHydration(m.route, loaderData, errors)
        );
      }
    }
  }
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  };
  let pendingAction = "POP" /* Pop */;
  let pendingPreventScrollReset = false;
  let pendingNavigationController;
  let pendingViewTransitionEnabled = false;
  let appliedViewTransitions = /* @__PURE__ */ new Map();
  let removePageHideEventListener = null;
  let isUninterruptedRevalidation = false;
  let isRevalidationRequired = false;
  let cancelledFetcherLoads = /* @__PURE__ */ new Set();
  let fetchControllers = /* @__PURE__ */ new Map();
  let incrementingLoadId = 0;
  let pendingNavigationLoadId = -1;
  let fetchReloadIds = /* @__PURE__ */ new Map();
  let fetchRedirectIds = /* @__PURE__ */ new Set();
  let fetchLoadMatches = /* @__PURE__ */ new Map();
  let activeFetchers = /* @__PURE__ */ new Map();
  let fetchersQueuedForDeletion = /* @__PURE__ */ new Set();
  let blockerFunctions = /* @__PURE__ */ new Map();
  let unblockBlockerHistoryUpdate = void 0;
  let pendingRevalidationDfd = null;
  function initialize() {
    unlistenHistory = init.history.listen(
      ({ action: historyAction, location, delta }) => {
        if (unblockBlockerHistoryUpdate) {
          unblockBlockerHistoryUpdate();
          unblockBlockerHistoryUpdate = void 0;
          return;
        }
        warning(
          blockerFunctions.size === 0 || delta != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let blockerKey = shouldBlockNavigation({
          currentLocation: state.location,
          nextLocation: location,
          historyAction
        });
        if (blockerKey && delta != null) {
          let nextHistoryUpdatePromise = new Promise((resolve) => {
            unblockBlockerHistoryUpdate = resolve;
          });
          init.history.go(delta * -1);
          updateBlocker(blockerKey, {
            state: "blocked",
            location,
            proceed() {
              updateBlocker(blockerKey, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location
              });
              nextHistoryUpdatePromise.then(() => init.history.go(delta));
            },
            reset() {
              let blockers = new Map(state.blockers);
              blockers.set(blockerKey, IDLE_BLOCKER);
              updateState({ blockers });
            }
          });
          return;
        }
        return startNavigation(historyAction, location);
      }
    );
    if (isBrowser) {
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
      removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    if (!state.initialized) {
      startNavigation("POP" /* Pop */, state.location, {
        initialHydration: true
      });
    }
    return router;
  }
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    if (removePageHideEventListener) {
      removePageHideEventListener();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  }
  function updateState(newState, opts = {}) {
    if (newState.matches) {
      newState.matches = newState.matches.map((m) => {
        let route = manifest[m.route.id];
        let matchRoute = m.route;
        if (matchRoute.element !== route.element || matchRoute.errorElement !== route.errorElement || matchRoute.hydrateFallbackElement !== route.hydrateFallbackElement) {
          return {
            ...m,
            route
          };
        }
        return m;
      });
    }
    state = {
      ...state,
      ...newState
    };
    let unmountedFetchers = [];
    let mountedFetchers = [];
    state.fetchers.forEach((fetcher, key) => {
      if (fetcher.state === "idle") {
        if (fetchersQueuedForDeletion.has(key)) {
          unmountedFetchers.push(key);
        } else {
          mountedFetchers.push(key);
        }
      }
    });
    fetchersQueuedForDeletion.forEach((key) => {
      if (!state.fetchers.has(key) && !fetchControllers.has(key)) {
        unmountedFetchers.push(key);
      }
    });
    [...subscribers].forEach(
      (subscriber) => subscriber(state, {
        deletedFetchers: unmountedFetchers,
        viewTransitionOpts: opts.viewTransitionOpts,
        flushSync: opts.flushSync === true
      })
    );
    unmountedFetchers.forEach((key) => deleteFetcher(key));
    mountedFetchers.forEach((key) => state.fetchers.delete(key));
  }
  function completeNavigation(location, newState, { flushSync } = {}) {
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && _optionalChain([location, 'access', _5 => _5.state, 'optionalAccess', _6 => _6._isRedirect]) !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        actionData = null;
      }
    } else if (isActionReload) {
      actionData = state.actionData;
    } else {
      actionData = null;
    }
    let loaderData = newState.loaderData ? mergeLoaderData(
      state.loaderData,
      newState.loaderData,
      newState.matches || [],
      newState.errors
    ) : state.loaderData;
    let blockers = state.blockers;
    if (blockers.size > 0) {
      blockers = new Map(blockers);
      blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
    }
    let restoreScrollPosition = isUninterruptedRevalidation ? false : getSavedScrollPosition(location, newState.matches || state.matches);
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && _optionalChain([location, 'access', _7 => _7.state, 'optionalAccess', _8 => _8._isRedirect]) !== true;
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = void 0;
    }
    if (isUninterruptedRevalidation) {
    } else if (pendingAction === "POP" /* Pop */) {
    } else if (pendingAction === "PUSH" /* Push */) {
      init.history.push(location, location.state);
    } else if (pendingAction === "REPLACE" /* Replace */) {
      init.history.replace(location, location.state);
    }
    let viewTransitionOpts;
    if (pendingAction === "POP" /* Pop */) {
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      if (priorPaths && priorPaths.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location
        };
      } else if (appliedViewTransitions.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: location,
          nextLocation: state.location
        };
      }
    } else if (pendingViewTransitionEnabled) {
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      if (toPaths) {
        toPaths.add(location.pathname);
      } else {
        toPaths = /* @__PURE__ */ new Set([location.pathname]);
        appliedViewTransitions.set(state.location.pathname, toPaths);
      }
      viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location
      };
    }
    updateState(
      {
        ...newState,
        // matches, errors, fetchers go through as-is
        actionData,
        loaderData,
        historyAction: pendingAction,
        location,
        initialized: true,
        navigation: IDLE_NAVIGATION,
        revalidation: "idle",
        restoreScrollPosition,
        preventScrollReset,
        blockers
      },
      {
        viewTransitionOpts,
        flushSync: flushSync === true
      }
    );
    pendingAction = "POP" /* Pop */;
    pendingPreventScrollReset = false;
    pendingViewTransitionEnabled = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    _optionalChain([pendingRevalidationDfd, 'optionalAccess', _9 => _9.resolve, 'call', _10 => _10()]);
    pendingRevalidationDfd = null;
  }
  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(
      state.location,
      state.matches,
      basename,
      to,
      _optionalChain([opts, 'optionalAccess', _11 => _11.fromRouteId]),
      _optionalChain([opts, 'optionalAccess', _12 => _12.relative])
    );
    let { path, submission, error } = normalizeNavigateOptions(
      false,
      normalizedPath,
      opts
    );
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state);
    nextLocation = {
      ...nextLocation,
      ...init.history.encodeLocation(nextLocation)
    };
    let userReplace = opts && opts.replace != null ? opts.replace : void 0;
    let historyAction = "PUSH" /* Push */;
    if (userReplace === true) {
      historyAction = "REPLACE" /* Replace */;
    } else if (userReplace === false) {
    } else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      historyAction = "REPLACE" /* Replace */;
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
    let flushSync = (opts && opts.flushSync) === true;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          });
          navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER);
          updateState({ blockers });
        }
      });
      return;
    }
    await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.viewTransition,
      flushSync
    });
  }
  function revalidate() {
    if (!pendingRevalidationDfd) {
      pendingRevalidationDfd = createDeferred();
    }
    interruptActiveLoads();
    updateState({ revalidation: "loading" });
    let promise = pendingRevalidationDfd.promise;
    if (state.navigation.state === "submitting") {
      return promise;
    }
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return promise;
    }
    startNavigation(
      pendingAction || state.historyAction,
      state.navigation.location,
      {
        overrideNavigation: state.navigation,
        // Proxy through any rending view transition
        enableViewTransition: pendingViewTransitionEnabled === true
      }
    );
    return promise;
  }
  async function startNavigation(historyAction, location, opts) {
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = _optionalChain([opts, 'optionalAccess', _13 => _13.initialHydration]) && state.matches && state.matches.length > 0 && !initialMatchesIsFOW ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      state.matches
    ) : matchRoutes(routesToUse, location, basename);
    let flushSync = (opts && opts.flushSync) === true;
    if (matches && state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, { matches }, { flushSync });
      return;
    }
    let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      let { error, notFoundMatches, route } = handleNavigational404(
        location.pathname
      );
      completeNavigation(
        location,
        {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        },
        { flushSync }
      );
      return;
    }
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(
      init.history,
      location,
      pendingNavigationController.signal,
      opts && opts.submission
    );
    let scopedContext = init.unstable_getContext ? await init.unstable_getContext() : new unstable_RouterContextProvider();
    let pendingActionResult;
    if (opts && opts.pendingError) {
      pendingActionResult = [
        findNearestBoundary(matches).route.id,
        { type: "error" /* error */, error: opts.pendingError }
      ];
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionResult = await handleAction(
        request,
        location,
        opts.submission,
        matches,
        scopedContext,
        fogOfWar.active,
        opts && opts.initialHydration === true,
        { replace: opts.replace, flushSync }
      );
      if (actionResult.shortCircuited) {
        return;
      }
      if (actionResult.pendingActionResult) {
        let [routeId, result] = actionResult.pendingActionResult;
        if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
          pendingNavigationController = null;
          completeNavigation(location, {
            matches: actionResult.matches,
            loaderData: {},
            errors: {
              [routeId]: result.error
            }
          });
          return;
        }
      }
      matches = actionResult.matches || matches;
      pendingActionResult = actionResult.pendingActionResult;
      loadingNavigation = getLoadingNavigation(location, opts.submission);
      flushSync = false;
      fogOfWar.active = false;
      request = createClientSideRequest(
        init.history,
        request.url,
        request.signal
      );
    }
    let {
      shortCircuited,
      matches: updatedMatches,
      loaderData,
      errors
    } = await handleLoaders(
      request,
      location,
      matches,
      scopedContext,
      fogOfWar.active,
      loadingNavigation,
      opts && opts.submission,
      opts && opts.fetcherSubmission,
      opts && opts.replace,
      opts && opts.initialHydration === true,
      flushSync,
      pendingActionResult
    );
    if (shortCircuited) {
      return;
    }
    pendingNavigationController = null;
    completeNavigation(location, {
      matches: updatedMatches || matches,
      ...getActionDataForCommit(pendingActionResult),
      loaderData,
      errors
    });
  }
  async function handleAction(request, location, submission, matches, scopedContext, isFogOfWar, initialHydration, opts = {}) {
    interruptActiveLoads();
    let navigation = getSubmittingNavigation(location, submission);
    updateState({ navigation }, { flushSync: opts.flushSync === true });
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        matches,
        location.pathname,
        request.signal
      );
      if (discoverResult.type === "aborted") {
        return { shortCircuited: true };
      } else if (discoverResult.type === "error") {
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          pendingActionResult: [
            boundaryId,
            {
              type: "error" /* error */,
              error: discoverResult.error
            }
          ]
        };
      } else if (!discoverResult.matches) {
        let { notFoundMatches, error, route } = handleNavigational404(
          location.pathname
        );
        return {
          matches: notFoundMatches,
          pendingActionResult: [
            route.id,
            {
              type: "error" /* error */,
              error
            }
          ]
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let result;
    let actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: "error" /* error */,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      let dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties,
        manifest,
        request,
        matches,
        actionMatch,
        initialHydration ? [] : hydrationRouteProperties,
        scopedContext
      );
      let results = await callDataStrategy(
        request,
        dsMatches,
        scopedContext,
        null
      );
      result = results[actionMatch.route.id];
      if (!result) {
        for (let match of matches) {
          if (results[match.route.id]) {
            result = results[match.route.id];
            break;
          }
        }
      }
      if (request.signal.aborted) {
        return { shortCircuited: true };
      }
    }
    if (isRedirectResult(result)) {
      let replace2;
      if (opts && opts.replace != null) {
        replace2 = opts.replace;
      } else {
        let location2 = normalizeRedirectLocation(
          result.response.headers.get("Location"),
          new URL(request.url),
          basename
        );
        replace2 = location2 === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(request, result, true, {
        submission,
        replace: replace2
      });
      return { shortCircuited: true };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      if ((opts && opts.replace) !== true) {
        pendingAction = "PUSH" /* Push */;
      }
      return {
        matches,
        pendingActionResult: [
          boundaryMatch.route.id,
          result,
          actionMatch.route.id
        ]
      };
    }
    return {
      matches,
      pendingActionResult: [actionMatch.route.id, result]
    };
  }
  async function handleLoaders(request, location, matches, scopedContext, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace2, initialHydration, flushSync, pendingActionResult) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
    let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
    let shouldUpdateNavigationState = !isUninterruptedRevalidation && !initialHydration;
    if (isFogOfWar) {
      if (shouldUpdateNavigationState) {
        let actionData = getUpdatedActionData(pendingActionResult);
        updateState(
          {
            navigation: loadingNavigation,
            ...actionData !== void 0 ? { actionData } : {}
          },
          {
            flushSync
          }
        );
      }
      let discoverResult = await discoverRoutes(
        matches,
        location.pathname,
        request.signal
      );
      if (discoverResult.type === "aborted") {
        return { shortCircuited: true };
      } else if (discoverResult.type === "error") {
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          loaderData: {},
          errors: {
            [boundaryId]: discoverResult.error
          }
        };
      } else if (!discoverResult.matches) {
        let { error, notFoundMatches, route } = handleNavigational404(
          location.pathname
        );
        return {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let { dsMatches, revalidatingFetchers } = getMatchesToLoad(
      request,
      scopedContext,
      mapRouteProperties,
      manifest,
      init.history,
      state,
      matches,
      activeSubmission,
      location,
      initialHydration ? [] : hydrationRouteProperties,
      initialHydration === true,
      isRevalidationRequired,
      cancelledFetcherLoads,
      fetchersQueuedForDeletion,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      init.patchRoutesOnNavigation != null,
      pendingActionResult
    );
    pendingNavigationLoadId = ++incrementingLoadId;
    if (!init.dataStrategy && !dsMatches.some((m) => m.shouldLoad) && !dsMatches.some((m) => m.route.unstable_middleware) && revalidatingFetchers.length === 0) {
      let updatedFetchers2 = markFetchRedirectsDone();
      completeNavigation(
        location,
        {
          matches,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? { [pendingActionResult[0]]: pendingActionResult[1].error } : null,
          ...getActionDataForCommit(pendingActionResult),
          ...updatedFetchers2 ? { fetchers: new Map(state.fetchers) } : {}
        },
        { flushSync }
      );
      return { shortCircuited: true };
    }
    if (shouldUpdateNavigationState) {
      let updates = {};
      if (!isFogOfWar) {
        updates.navigation = loadingNavigation;
        let actionData = getUpdatedActionData(pendingActionResult);
        if (actionData !== void 0) {
          updates.actionData = actionData;
        }
      }
      if (revalidatingFetchers.length > 0) {
        updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
      }
      updateState(updates, { flushSync });
    }
    revalidatingFetchers.forEach((rf) => {
      abortFetcher(rf.key);
      if (rf.controller) {
        fetchControllers.set(rf.key, rf.controller);
      }
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener(
        "abort",
        abortPendingFetchRevalidations
      );
    }
    let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
      dsMatches,
      revalidatingFetchers,
      request,
      scopedContext
    );
    if (request.signal.aborted) {
      return { shortCircuited: true };
    }
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener(
        "abort",
        abortPendingFetchRevalidations
      );
    }
    revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
    let redirect2 = findRedirect(loaderResults);
    if (redirect2) {
      await startRedirectNavigation(request, redirect2.result, true, {
        replace: replace2
      });
      return { shortCircuited: true };
    }
    redirect2 = findRedirect(fetcherResults);
    if (redirect2) {
      fetchRedirectIds.add(redirect2.key);
      await startRedirectNavigation(request, redirect2.result, true, {
        replace: replace2
      });
      return { shortCircuited: true };
    }
    let { loaderData, errors } = processLoaderData(
      state,
      matches,
      loaderResults,
      pendingActionResult,
      revalidatingFetchers,
      fetcherResults
    );
    if (initialHydration && state.errors) {
      errors = { ...state.errors, ...errors };
    }
    let updatedFetchers = markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return {
      matches,
      loaderData,
      errors,
      ...shouldUpdateFetchers ? { fetchers: new Map(state.fetchers) } : {}
    };
  }
  function getUpdatedActionData(pendingActionResult) {
    if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
      return {
        [pendingActionResult[0]]: pendingActionResult[1].data
      };
    } else if (state.actionData) {
      if (Object.keys(state.actionData).length === 0) {
        return null;
      } else {
        return state.actionData;
      }
    }
  }
  function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
    revalidatingFetchers.forEach((rf) => {
      let fetcher = state.fetchers.get(rf.key);
      let revalidatingFetcher = getLoadingFetcher(
        void 0,
        fetcher ? fetcher.data : void 0
      );
      state.fetchers.set(rf.key, revalidatingFetcher);
    });
    return new Map(state.fetchers);
  }
  async function fetch2(key, routeId, href, opts) {
    abortFetcher(key);
    let flushSync = (opts && opts.flushSync) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let normalizedPath = normalizeTo(
      state.location,
      state.matches,
      basename,
      href,
      routeId,
      _optionalChain([opts, 'optionalAccess', _14 => _14.relative])
    );
    let matches = matchRoutes(routesToUse, normalizedPath, basename);
    let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      setFetcherError(
        key,
        routeId,
        getInternalRouterError(404, { pathname: normalizedPath }),
        { flushSync }
      );
      return;
    }
    let { path, submission, error } = normalizeNavigateOptions(
      true,
      normalizedPath,
      opts
    );
    if (error) {
      setFetcherError(key, routeId, error, { flushSync });
      return;
    }
    let scopedContext = init.unstable_getContext ? await init.unstable_getContext() : new unstable_RouterContextProvider();
    let preventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      await handleFetcherAction(
        key,
        routeId,
        path,
        matches,
        scopedContext,
        fogOfWar.active,
        flushSync,
        preventScrollReset,
        submission
      );
      return;
    }
    fetchLoadMatches.set(key, { routeId, path });
    await handleFetcherLoader(
      key,
      routeId,
      path,
      matches,
      scopedContext,
      fogOfWar.active,
      flushSync,
      preventScrollReset,
      submission
    );
  }
  async function handleFetcherAction(key, routeId, path, requestMatches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(
      init.history,
      path,
      abortController.signal,
      submission
    );
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        requestMatches,
        new URL(fetchRequest.url).pathname,
        fetchRequest.signal,
        key
      );
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, { flushSync });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(
          key,
          routeId,
          getInternalRouterError(404, { pathname: path }),
          { flushSync }
        );
        return;
      } else {
        requestMatches = discoverResult.matches;
      }
    }
    let match = getTargetMatch(requestMatches, path);
    if (!match.route.action && !match.route.lazy) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId
      });
      setFetcherError(key, routeId, error, { flushSync });
      return;
    }
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let fetchMatches = getTargetedDataStrategyMatches(
      mapRouteProperties,
      manifest,
      fetchRequest,
      requestMatches,
      match,
      hydrationRouteProperties,
      scopedContext
    );
    let actionResults = await callDataStrategy(
      fetchRequest,
      fetchMatches,
      scopedContext,
      key
    );
    let actionResult = actionResults[match.route.id];
    if (fetchRequest.signal.aborted) {
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    if (fetchersQueuedForDeletion.has(key)) {
      if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      }
    } else {
      if (isRedirectResult(actionResult)) {
        fetchControllers.delete(key);
        if (pendingNavigationLoadId > originatingLoadId) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        } else {
          fetchRedirectIds.add(key);
          updateFetcherState(key, getLoadingFetcher(submission));
          return startRedirectNavigation(fetchRequest, actionResult, false, {
            fetcherSubmission: submission,
            preventScrollReset
          });
        }
      }
      if (isErrorResult(actionResult)) {
        setFetcherError(key, routeId, actionResult.error);
        return;
      }
    }
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(
      init.history,
      nextLocation,
      abortController.signal
    );
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key, loadFetcher);
    let { dsMatches, revalidatingFetchers } = getMatchesToLoad(
      revalidationRequest,
      scopedContext,
      mapRouteProperties,
      manifest,
      init.history,
      state,
      matches,
      submission,
      nextLocation,
      hydrationRouteProperties,
      false,
      isRevalidationRequired,
      cancelledFetcherLoads,
      fetchersQueuedForDeletion,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      init.patchRoutesOnNavigation != null,
      [match.route.id, actionResult]
    );
    revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
      let staleKey = rf.key;
      let existingFetcher2 = state.fetchers.get(staleKey);
      let revalidatingFetcher = getLoadingFetcher(
        void 0,
        existingFetcher2 ? existingFetcher2.data : void 0
      );
      state.fetchers.set(staleKey, revalidatingFetcher);
      abortFetcher(staleKey);
      if (rf.controller) {
        fetchControllers.set(staleKey, rf.controller);
      }
    });
    updateState({ fetchers: new Map(state.fetchers) });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
    abortController.signal.addEventListener(
      "abort",
      abortPendingFetchRevalidations
    );
    let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
      dsMatches,
      revalidatingFetchers,
      revalidationRequest,
      scopedContext
    );
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener(
      "abort",
      abortPendingFetchRevalidations
    );
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
    if (state.fetchers.has(key)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key, doneFetcher);
    }
    let redirect2 = findRedirect(loaderResults);
    if (redirect2) {
      return startRedirectNavigation(
        revalidationRequest,
        redirect2.result,
        false,
        { preventScrollReset }
      );
    }
    redirect2 = findRedirect(fetcherResults);
    if (redirect2) {
      fetchRedirectIds.add(redirect2.key);
      return startRedirectNavigation(
        revalidationRequest,
        redirect2.result,
        false,
        { preventScrollReset }
      );
    }
    let { loaderData, errors } = processLoaderData(
      state,
      matches,
      loaderResults,
      void 0,
      revalidatingFetchers,
      fetcherResults
    );
    abortStaleFetchLoads(loadId);
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      updateState({
        errors,
        loaderData: mergeLoaderData(
          state.loaderData,
          loaderData,
          matches,
          errors
        ),
        fetchers: new Map(state.fetchers)
      });
      isRevalidationRequired = false;
    }
  }
  async function handleFetcherLoader(key, routeId, path, matches, scopedContext, isFogOfWar, flushSync, preventScrollReset, submission) {
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(
      key,
      getLoadingFetcher(
        submission,
        existingFetcher ? existingFetcher.data : void 0
      ),
      { flushSync }
    );
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(
      init.history,
      path,
      abortController.signal
    );
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(
        matches,
        new URL(fetchRequest.url).pathname,
        fetchRequest.signal,
        key
      );
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, { flushSync });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(
          key,
          routeId,
          getInternalRouterError(404, { pathname: path }),
          { flushSync }
        );
        return;
      } else {
        matches = discoverResult.matches;
      }
    }
    let match = getTargetMatch(matches, path);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let dsMatches = getTargetedDataStrategyMatches(
      mapRouteProperties,
      manifest,
      fetchRequest,
      matches,
      match,
      hydrationRouteProperties,
      scopedContext
    );
    let results = await callDataStrategy(
      fetchRequest,
      dsMatches,
      scopedContext,
      key
    );
    let result = results[match.route.id];
    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    if (fetchersQueuedForDeletion.has(key)) {
      updateFetcherState(key, getDoneFetcher(void 0));
      return;
    }
    if (isRedirectResult(result)) {
      if (pendingNavigationLoadId > originatingLoadId) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      } else {
        fetchRedirectIds.add(key);
        await startRedirectNavigation(fetchRequest, result, false, {
          preventScrollReset
        });
        return;
      }
    }
    if (isErrorResult(result)) {
      setFetcherError(key, routeId, result.error);
      return;
    }
    updateFetcherState(key, getDoneFetcher(result.data));
  }
  async function startRedirectNavigation(request, redirect2, isNavigation, {
    submission,
    fetcherSubmission,
    preventScrollReset,
    replace: replace2
  } = {}) {
    if (redirect2.response.headers.has("X-Remix-Revalidate")) {
      isRevalidationRequired = true;
    }
    let location = redirect2.response.headers.get("Location");
    invariant(location, "Expected a Location header on the redirect Response");
    location = normalizeRedirectLocation(
      location,
      new URL(request.url),
      basename
    );
    let redirectLocation = createLocation(state.location, location, {
      _isRedirect: true
    });
    if (isBrowser) {
      let isDocumentReload = false;
      if (redirect2.response.headers.has("X-Remix-Reload-Document")) {
        isDocumentReload = true;
      } else if (isAbsoluteUrl(location)) {
        const url = createBrowserURLImpl(location, true);
        isDocumentReload = // Hard reload if it's an absolute URL to a new origin
        url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        if (replace2) {
          routerWindow.location.replace(location);
        } else {
          routerWindow.location.assign(location);
        }
        return;
      }
    }
    pendingNavigationController = null;
    let redirectNavigationType = replace2 === true || redirect2.response.headers.has("X-Remix-Replace") ? "REPLACE" /* Replace */ : "PUSH" /* Push */;
    let { formMethod, formAction, formEncType } = state.navigation;
    if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
      submission = getSubmissionFromNavigation(state.navigation);
    }
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect2.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
      await startNavigation(redirectNavigationType, redirectLocation, {
        submission: {
          ...activeSubmission,
          formAction: location
        },
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    } else {
      let overrideNavigation = getLoadingNavigation(
        redirectLocation,
        submission
      );
      await startNavigation(redirectNavigationType, redirectLocation, {
        overrideNavigation,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission,
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    }
  }
  async function callDataStrategy(request, matches, scopedContext, fetcherKey) {
    let results;
    let dataResults = {};
    try {
      results = await callDataStrategyImpl(
        dataStrategyImpl,
        request,
        matches,
        fetcherKey,
        scopedContext,
        false
      );
    } catch (e) {
      matches.filter((m) => m.shouldLoad).forEach((m) => {
        dataResults[m.route.id] = {
          type: "error" /* error */,
          error: e
        };
      });
      return dataResults;
    }
    if (request.signal.aborted) {
      return dataResults;
    }
    for (let [routeId, result] of Object.entries(results)) {
      if (isRedirectDataStrategyResult(result)) {
        let response = result.result;
        dataResults[routeId] = {
          type: "redirect" /* redirect */,
          response: normalizeRelativeRoutingRedirectResponse(
            response,
            request,
            routeId,
            matches,
            basename
          )
        };
      } else {
        dataResults[routeId] = await convertDataStrategyResultToDataResult(result);
      }
    }
    return dataResults;
  }
  async function callLoadersAndMaybeResolveData(matches, fetchersToLoad, request, scopedContext) {
    let loaderResultsPromise = callDataStrategy(
      request,
      matches,
      scopedContext,
      null
    );
    let fetcherResultsPromise = Promise.all(
      fetchersToLoad.map(async (f) => {
        if (f.matches && f.match && f.request && f.controller) {
          let results = await callDataStrategy(
            f.request,
            f.matches,
            scopedContext,
            f.key
          );
          let result = results[f.match.route.id];
          return { [f.key]: result };
        } else {
          return Promise.resolve({
            [f.key]: {
              type: "error" /* error */,
              error: getInternalRouterError(404, {
                pathname: f.path
              })
            }
          });
        }
      })
    );
    let loaderResults = await loaderResultsPromise;
    let fetcherResults = (await fetcherResultsPromise).reduce(
      (acc, r) => Object.assign(acc, r),
      {}
    );
    return {
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = true;
    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.add(key);
      }
      abortFetcher(key);
    });
  }
  function updateFetcherState(key, fetcher, opts = {}) {
    state.fetchers.set(key, fetcher);
    updateState(
      { fetchers: new Map(state.fetchers) },
      { flushSync: (opts && opts.flushSync) === true }
    );
  }
  function setFetcherError(key, routeId, error, opts = {}) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState(
      {
        errors: {
          [boundaryMatch.route.id]: error
        },
        fetchers: new Map(state.fetchers)
      },
      { flushSync: (opts && opts.flushSync) === true }
    );
  }
  function getFetcher(key) {
    activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
    if (fetchersQueuedForDeletion.has(key)) {
      fetchersQueuedForDeletion.delete(key);
    }
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
      abortFetcher(key);
    }
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    fetchersQueuedForDeletion.delete(key);
    cancelledFetcherLoads.delete(key);
    state.fetchers.delete(key);
  }
  function queueFetcherForDeletion(key) {
    let count = (activeFetchers.get(key) || 0) - 1;
    if (count <= 0) {
      activeFetchers.delete(key);
      fetchersQueuedForDeletion.add(key);
    } else {
      activeFetchers.set(key, count);
    }
    updateState({ fetchers: new Map(state.fetchers) });
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    if (controller) {
      controller.abort();
      fetchControllers.delete(key);
    }
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    let updatedFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, `Expected fetcher: ${key}`);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        updatedFetchers = true;
      }
    }
    markFetchersDone(doneKeys);
    return updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, `Expected fetcher: ${key}`);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(
      blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked",
      `Invalid blocker state transition: ${blocker.state} -> ${newBlocker.state}`
    );
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker);
    updateState({ blockers });
  }
  function shouldBlockNavigation({
    currentLocation,
    nextLocation,
    historyAction
  }) {
    if (blockerFunctions.size === 0) {
      return;
    }
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      return;
    }
    if (blockerFunction({ currentLocation, nextLocation, historyAction })) {
      return blockerKey;
    }
  }
  function handleNavigational404(pathname) {
    let error = getInternalRouterError(404, { pathname });
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let { matches, route } = getShortCircuitMatches(routesToUse);
    return { notFoundMatches: matches, route, error };
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey = getKey || null;
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);
      if (y != null) {
        updateState({ restoreScrollPosition: y });
      }
    }
    return () => {
      savedScrollPositions = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }
  function getScrollKey(location, matches) {
    if (getScrollRestorationKey) {
      let key = getScrollRestorationKey(
        location,
        matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData))
      );
      return key || location.key;
    }
    return location.key;
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollPosition) {
      let key = getScrollKey(location, matches);
      savedScrollPositions[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions) {
      let key = getScrollKey(location, matches);
      let y = savedScrollPositions[key];
      if (typeof y === "number") {
        return y;
      }
    }
    return null;
  }
  function checkFogOfWar(matches, routesToUse, pathname) {
    if (init.patchRoutesOnNavigation) {
      if (!matches) {
        let fogMatches = matchRoutesImpl(
          routesToUse,
          pathname,
          basename,
          true
        );
        return { active: true, matches: fogMatches || [] };
      } else {
        if (Object.keys(matches[0].params).length > 0) {
          let partialMatches = matchRoutesImpl(
            routesToUse,
            pathname,
            basename,
            true
          );
          return { active: true, matches: partialMatches };
        }
      }
    }
    return { active: false, matches: null };
  }
  async function discoverRoutes(matches, pathname, signal, fetcherKey) {
    if (!init.patchRoutesOnNavigation) {
      return { type: "success", matches };
    }
    let partialMatches = matches;
    while (true) {
      let isNonHMR = inFlightDataRoutes == null;
      let routesToUse = inFlightDataRoutes || dataRoutes;
      let localManifest = manifest;
      try {
        await init.patchRoutesOnNavigation({
          signal,
          path: pathname,
          matches: partialMatches,
          fetcherKey,
          patch: (routeId, children) => {
            if (signal.aborted) return;
            patchRoutesImpl(
              routeId,
              children,
              routesToUse,
              localManifest,
              mapRouteProperties,
              false
            );
          }
        });
      } catch (e) {
        return { type: "error", error: e, partialMatches };
      } finally {
        if (isNonHMR && !signal.aborted) {
          dataRoutes = [...dataRoutes];
        }
      }
      if (signal.aborted) {
        return { type: "aborted" };
      }
      let newMatches = matchRoutes(routesToUse, pathname, basename);
      if (newMatches) {
        return { type: "success", matches: newMatches };
      }
      let newPartialMatches = matchRoutesImpl(
        routesToUse,
        pathname,
        basename,
        true
      );
      if (!newPartialMatches || partialMatches.length === newPartialMatches.length && partialMatches.every(
        (m, i) => m.route.id === newPartialMatches[i].route.id
      )) {
        return { type: "success", matches: null };
      }
      partialMatches = newPartialMatches;
    }
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    inFlightDataRoutes = convertRoutesToDataRoutes(
      newRoutes,
      mapRouteProperties,
      void 0,
      manifest
    );
  }
  function patchRoutes(routeId, children, unstable_allowElementMutations = false) {
    let isNonHMR = inFlightDataRoutes == null;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    patchRoutesImpl(
      routeId,
      children,
      routesToUse,
      manifest,
      mapRouteProperties,
      unstable_allowElementMutations
    );
    if (isNonHMR) {
      dataRoutes = [...dataRoutes];
      updateState({});
    }
  }
  router = {
    get basename() {
      return basename;
    },
    get future() {
      return future;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch: fetch2,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (to) => init.history.createHref(to),
    encodeLocation: (to) => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher: queueFetcherForDeletion,
    dispose,
    getBlocker,
    deleteBlocker,
    patchRoutes,
    _internalFetchControllers: fetchControllers,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(newState) {
      updateState(newState);
    }
  };
  return router;
}
function createStaticHandler(routes, opts) {
  invariant(
    routes.length > 0,
    "You must provide a non-empty routes array to createStaticHandler"
  );
  let manifest = {};
  let basename = (opts ? opts.basename : null) || "/";
  let mapRouteProperties = _optionalChain([opts, 'optionalAccess', _15 => _15.mapRouteProperties]) || defaultMapRouteProperties;
  let dataRoutes = convertRoutesToDataRoutes(
    routes,
    mapRouteProperties,
    void 0,
    manifest
  );
  async function query(request, {
    requestContext,
    filterMatchesToLoad,
    skipLoaderErrorBubbling,
    skipRevalidation,
    dataStrategy,
    unstable_generateMiddlewareResponse: generateMiddlewareResponse
  } = {}) {
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    requestContext = requestContext != null ? requestContext : new unstable_RouterContextProvider();
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, { method });
      let { matches: methodNotAllowedMatches, route } = getShortCircuitMatches(dataRoutes);
      let staticContext = {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
      return generateMiddlewareResponse ? generateMiddlewareResponse(() => Promise.resolve(staticContext)) : staticContext;
    } else if (!matches) {
      let error = getInternalRouterError(404, { pathname: location.pathname });
      let { matches: notFoundMatches, route } = getShortCircuitMatches(dataRoutes);
      let staticContext = {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
      return generateMiddlewareResponse ? generateMiddlewareResponse(() => Promise.resolve(staticContext)) : staticContext;
    }
    if (generateMiddlewareResponse) {
      invariant(
        requestContext instanceof unstable_RouterContextProvider,
        "When using middleware in `staticHandler.query()`, any provided `requestContext` must be an instance of `unstable_RouterContextProvider`"
      );
      try {
        await loadLazyMiddlewareForMatches(
          matches,
          manifest,
          mapRouteProperties
        );
        let renderedStaticContext;
        let response = await runServerMiddlewarePipeline(
          {
            request,
            matches,
            params: matches[0].params,
            // If we're calling middleware then it must be enabled so we can cast
            // this to the proper type knowing it's not an `AppLoadContext`
            context: requestContext
          },
          async () => {
            let res = await generateMiddlewareResponse(
              async (revalidationRequest) => {
                let result2 = await queryImpl(
                  revalidationRequest,
                  location,
                  matches,
                  requestContext,
                  dataStrategy || null,
                  skipLoaderErrorBubbling === true,
                  null,
                  filterMatchesToLoad || null,
                  skipRevalidation === true
                );
                if (isResponse(result2)) {
                  return result2;
                }
                renderedStaticContext = { location, basename, ...result2 };
                return renderedStaticContext;
              }
            );
            return res;
          },
          async (error, routeId) => {
            if (isResponse(error)) {
              return error;
            }
            if (renderedStaticContext) {
              if (routeId in renderedStaticContext.loaderData) {
                renderedStaticContext.loaderData[routeId] = void 0;
              }
              let staticContext = getStaticContextFromError(
                dataRoutes,
                renderedStaticContext,
                error,
                skipLoaderErrorBubbling ? routeId : findNearestBoundary(matches, routeId).route.id
              );
              return generateMiddlewareResponse(
                () => Promise.resolve(staticContext)
              );
            } else {
              let boundaryRouteId = skipLoaderErrorBubbling ? routeId : findNearestBoundary(
                matches,
                _optionalChain([matches, 'access', _16 => _16.find, 'call', _17 => _17(
                  (m) => m.route.id === routeId || m.route.loader
                ), 'optionalAccess', _18 => _18.route, 'access', _19 => _19.id]) || routeId
              ).route.id;
              let staticContext = {
                matches,
                location,
                basename,
                loaderData: {},
                actionData: null,
                errors: {
                  [boundaryRouteId]: error
                },
                statusCode: isRouteErrorResponse(error) ? error.status : 500,
                actionHeaders: {},
                loaderHeaders: {}
              };
              return generateMiddlewareResponse(
                () => Promise.resolve(staticContext)
              );
            }
          }
        );
        invariant(isResponse(response), "Expected a response in query()");
        return response;
      } catch (e) {
        if (isResponse(e)) {
          return e;
        }
        throw e;
      }
    }
    let result = await queryImpl(
      request,
      location,
      matches,
      requestContext,
      dataStrategy || null,
      skipLoaderErrorBubbling === true,
      null,
      filterMatchesToLoad || null,
      skipRevalidation === true
    );
    if (isResponse(result)) {
      return result;
    }
    return { location, basename, ...result };
  }
  async function queryRoute(request, {
    routeId,
    requestContext,
    dataStrategy,
    unstable_generateMiddlewareResponse: generateMiddlewareResponse
  } = {}) {
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    requestContext = requestContext != null ? requestContext : new unstable_RouterContextProvider();
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, { method });
    } else if (!matches) {
      throw getInternalRouterError(404, { pathname: location.pathname });
    }
    let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      throw getInternalRouterError(404, { pathname: location.pathname });
    }
    if (generateMiddlewareResponse) {
      invariant(
        requestContext instanceof unstable_RouterContextProvider,
        "When using middleware in `staticHandler.queryRoute()`, any provided `requestContext` must be an instance of `unstable_RouterContextProvider`"
      );
      await loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties);
      let response = await runServerMiddlewarePipeline(
        {
          request,
          matches,
          params: matches[0].params,
          // If we're calling middleware then it must be enabled so we can cast
          // this to the proper type knowing it's not an `AppLoadContext`
          context: requestContext
        },
        async () => {
          let res = await generateMiddlewareResponse(
            async (innerRequest) => {
              let result2 = await queryImpl(
                innerRequest,
                location,
                matches,
                requestContext,
                dataStrategy || null,
                false,
                match,
                null,
                false
              );
              let processed = handleQueryResult(result2);
              return isResponse(processed) ? processed : typeof processed === "string" ? new Response(processed) : Response.json(processed);
            }
          );
          return res;
        },
        (error) => {
          if (isRouteErrorResponse(error)) {
            return Promise.resolve(errorResponseToResponse(error));
          }
          if (isResponse(error)) {
            return Promise.resolve(error);
          }
          throw error;
        }
      );
      return response;
    }
    let result = await queryImpl(
      request,
      location,
      matches,
      requestContext,
      dataStrategy || null,
      false,
      match,
      null,
      false
    );
    return handleQueryResult(result);
    function handleQueryResult(result2) {
      if (isResponse(result2)) {
        return result2;
      }
      let error = result2.errors ? Object.values(result2.errors)[0] : void 0;
      if (error !== void 0) {
        throw error;
      }
      if (result2.actionData) {
        return Object.values(result2.actionData)[0];
      }
      if (result2.loaderData) {
        return Object.values(result2.loaderData)[0];
      }
      return void 0;
    }
  }
  async function queryImpl(request, location, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, filterMatchesToLoad, skipRevalidation) {
    invariant(
      request.signal,
      "query()/queryRoute() requests must contain an AbortController signal"
    );
    try {
      if (isMutationMethod(request.method)) {
        let result2 = await submit(
          request,
          matches,
          routeMatch || getTargetMatch(matches, location),
          requestContext,
          dataStrategy,
          skipLoaderErrorBubbling,
          routeMatch != null,
          filterMatchesToLoad,
          skipRevalidation
        );
        return result2;
      }
      let result = await loadRouteData(
        request,
        matches,
        requestContext,
        dataStrategy,
        skipLoaderErrorBubbling,
        routeMatch,
        filterMatchesToLoad
      );
      return isResponse(result) ? result : {
        ...result,
        actionData: null,
        actionHeaders: {}
      };
    } catch (e) {
      if (isDataStrategyResult(e) && isResponse(e.result)) {
        if (e.type === "error" /* error */) {
          throw e.result;
        }
        return e.result;
      }
      if (isRedirectResponse(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, dataStrategy, skipLoaderErrorBubbling, isRouteRequest, filterMatchesToLoad, skipRevalidation) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: "error" /* error */,
        error
      };
    } else {
      let dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties,
        manifest,
        request,
        matches,
        actionMatch,
        [],
        requestContext
      );
      let results = await callDataStrategy(
        request,
        dsMatches,
        isRouteRequest,
        requestContext,
        dataStrategy
      );
      result = results[actionMatch.route.id];
      if (request.signal.aborted) {
        throwStaticHandlerAbortedError(request, isRouteRequest);
      }
    }
    if (isRedirectResult(result)) {
      throw new Response(null, {
        status: result.response.status,
        headers: {
          Location: result.response.headers.get("Location")
        }
      });
    }
    if (isRouteRequest) {
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: { [actionMatch.route.id]: result.data },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {}
      };
    }
    if (skipRevalidation) {
      if (isErrorResult(result)) {
        let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
        return {
          statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
          actionData: null,
          actionHeaders: {
            ...result.headers ? { [actionMatch.route.id]: result.headers } : {}
          },
          matches,
          loaderData: {},
          errors: {
            [boundaryMatch.route.id]: result.error
          },
          loaderHeaders: {}
        };
      } else {
        return {
          actionData: {
            [actionMatch.route.id]: result.data
          },
          actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {},
          matches,
          loaderData: {},
          errors: null,
          statusCode: result.statusCode || 200,
          loaderHeaders: {}
        };
      }
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    if (isErrorResult(result)) {
      let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
      let handlerContext2 = await loadRouteData(
        loaderRequest,
        matches,
        requestContext,
        dataStrategy,
        skipLoaderErrorBubbling,
        null,
        filterMatchesToLoad,
        [boundaryMatch.route.id, result]
      );
      return {
        ...handlerContext2,
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
        actionData: null,
        actionHeaders: {
          ...result.headers ? { [actionMatch.route.id]: result.headers } : {}
        }
      };
    }
    let handlerContext = await loadRouteData(
      loaderRequest,
      matches,
      requestContext,
      dataStrategy,
      skipLoaderErrorBubbling,
      null,
      filterMatchesToLoad
    );
    return {
      ...handlerContext,
      actionData: {
        [actionMatch.route.id]: result.data
      },
      // action status codes take precedence over loader status codes
      ...result.statusCode ? { statusCode: result.statusCode } : {},
      actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {}
    };
  }
  async function loadRouteData(request, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, filterMatchesToLoad, pendingActionResult) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !_optionalChain([routeMatch, 'optionalAccess', _20 => _20.route, 'access', _21 => _21.loader]) && !_optionalChain([routeMatch, 'optionalAccess', _22 => _22.route, 'access', _23 => _23.lazy])) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: _optionalChain([routeMatch, 'optionalAccess', _24 => _24.route, 'access', _25 => _25.id])
      });
    }
    let dsMatches;
    if (routeMatch) {
      dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties,
        manifest,
        request,
        matches,
        routeMatch,
        [],
        requestContext
      );
    } else {
      let maxIdx = pendingActionResult && isErrorResult(pendingActionResult[1]) ? (
        // Up to but not including the boundary
        matches.findIndex((m) => m.route.id === pendingActionResult[0]) - 1
      ) : void 0;
      dsMatches = matches.map((match, index) => {
        if (maxIdx != null && index > maxIdx) {
          return getDataStrategyMatch(
            mapRouteProperties,
            manifest,
            request,
            match,
            [],
            requestContext,
            false
          );
        }
        return getDataStrategyMatch(
          mapRouteProperties,
          manifest,
          request,
          match,
          [],
          requestContext,
          (match.route.loader || match.route.lazy) != null && (!filterMatchesToLoad || filterMatchesToLoad(match))
        );
      });
    }
    if (!dataStrategy && !dsMatches.some((m) => m.shouldLoad)) {
      return {
        matches,
        loaderData: {},
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null,
        statusCode: 200,
        loaderHeaders: {}
      };
    }
    let results = await callDataStrategy(
      request,
      dsMatches,
      isRouteRequest,
      requestContext,
      dataStrategy
    );
    if (request.signal.aborted) {
      throwStaticHandlerAbortedError(request, isRouteRequest);
    }
    let handlerContext = processRouteLoaderData(
      matches,
      results,
      pendingActionResult,
      true,
      skipLoaderErrorBubbling
    );
    return {
      ...handlerContext,
      matches
    };
  }
  async function callDataStrategy(request, matches, isRouteRequest, requestContext, dataStrategy) {
    let results = await callDataStrategyImpl(
      dataStrategy || defaultDataStrategy,
      request,
      matches,
      null,
      requestContext,
      true
    );
    let dataResults = {};
    await Promise.all(
      matches.map(async (match) => {
        if (!(match.route.id in results)) {
          return;
        }
        let result = results[match.route.id];
        if (isRedirectDataStrategyResult(result)) {
          let response = result.result;
          throw normalizeRelativeRoutingRedirectResponse(
            response,
            request,
            match.route.id,
            matches,
            basename
          );
        }
        if (isResponse(result.result) && isRouteRequest) {
          throw result;
        }
        dataResults[match.route.id] = await convertDataStrategyResultToDataResult(result);
      })
    );
    return dataResults;
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes, handlerContext, error, boundaryId) {
  let errorBoundaryId = boundaryId || handlerContext._deepestRenderedBoundaryId || routes[0].id;
  return {
    ...handlerContext,
    statusCode: isRouteErrorResponse(error) ? error.status : 500,
    errors: {
      [errorBoundaryId]: error
    }
  };
}
function throwStaticHandlerAbortedError(request, isRouteRequest) {
  if (request.signal.reason !== void 0) {
    throw request.signal.reason;
  }
  let method = isRouteRequest ? "queryRoute" : "query";
  throw new Error(
    `${method}() call aborted without an \`AbortSignal.reason\`: ${request.method} ${request.url}`
  );
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location, matches, basename, to, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId) {
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  let path = resolveTo(
    to ? to : ".",
    getResolveToMatches(contextualMatches),
    stripBasename(location.pathname, basename) || location.pathname,
    relative === "path"
  );
  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  }
  if ((to == null || to === "" || to === ".") && activeRouteMatch) {
    let nakedIndex = hasNakedIndexQuery(path.search);
    if (activeRouteMatch.route.index && !nakedIndex) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    } else if (!activeRouteMatch.route.index && nakedIndex) {
      let params = new URLSearchParams(path.search);
      let indexValues = params.getAll("index");
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if (basename !== "/") {
    path.pathname = prependBasename({ basename, pathname: path.pathname });
  }
  return createPath(path);
}
function normalizeNavigateOptions(isFetcher, path, opts) {
  if (!opts || !isSubmissionNavigation(opts)) {
    return { path };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, { method: opts.formMethod })
    };
  }
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, { type: "invalid-body" })
  });
  let rawFormMethod = opts.formMethod || "get";
  let formMethod = rawFormMethod.toUpperCase();
  let formAction = stripHashFromPath(path);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(opts.body.entries()).reduce(
          (acc, [name, value]) => `${acc}${name}=${value}
`,
          ""
        )
      ) : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      try {
        let json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json,
            text: void 0
          }
        };
      } catch (e) {
        return getInvalidBodyError();
      }
    }
  }
  invariant(
    typeof FormData === "function",
    "FormData is not available in this environment"
  );
  let searchParams;
  let formData;
  if (opts.formData) {
    searchParams = convertFormDataToSearchParams(opts.formData);
    formData = opts.formData;
  } else if (opts.body instanceof FormData) {
    searchParams = convertFormDataToSearchParams(opts.body);
    formData = opts.body;
  } else if (opts.body instanceof URLSearchParams) {
    searchParams = opts.body;
    formData = convertSearchParamsToFormData(searchParams);
  } else if (opts.body == null) {
    searchParams = new URLSearchParams();
    formData = new FormData();
  } else {
    try {
      searchParams = new URLSearchParams(opts.body);
      formData = convertSearchParamsToFormData(searchParams);
    } catch (e) {
      return getInvalidBodyError();
    }
  }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod)) {
    return { path, submission };
  }
  let parsedPath = parsePath(path);
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = `?${searchParams}`;
  return { path: createPath(parsedPath), submission };
}
function getMatchesToLoad(request, scopedContext, mapRouteProperties, manifest, history, state, matches, submission, location, lazyRoutePropertiesToSkip, initialHydration, isRevalidationRequired, cancelledFetcherLoads, fetchersQueuedForDeletion, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, hasPatchRoutesOnNavigation, pendingActionResult) {
  let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location);
  let maxIdx;
  if (initialHydration && state.errors) {
    let boundaryId = Object.keys(state.errors)[0];
    maxIdx = matches.findIndex((m) => m.route.id === boundaryId);
  } else if (pendingActionResult && isErrorResult(pendingActionResult[1])) {
    let boundaryId = pendingActionResult[0];
    maxIdx = matches.findIndex((m) => m.route.id === boundaryId) - 1;
  }
  let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
  let shouldSkipRevalidation = actionStatus && actionStatus >= 400;
  let baseShouldRevalidateArgs = {
    currentUrl,
    currentParams: _optionalChain([state, 'access', _26 => _26.matches, 'access', _27 => _27[0], 'optionalAccess', _28 => _28.params]) || {},
    nextUrl,
    nextParams: matches[0].params,
    ...submission,
    actionResult,
    actionStatus
  };
  let dsMatches = matches.map((match, index) => {
    let { route } = match;
    let forceShouldLoad = null;
    if (maxIdx != null && index > maxIdx) {
      forceShouldLoad = false;
    } else if (route.lazy) {
      forceShouldLoad = true;
    } else if (route.loader == null) {
      forceShouldLoad = false;
    } else if (initialHydration) {
      forceShouldLoad = shouldLoadRouteOnHydration(
        route,
        state.loaderData,
        state.errors
      );
    } else if (isNewLoader(state.loaderData, state.matches[index], match)) {
      forceShouldLoad = true;
    }
    if (forceShouldLoad !== null) {
      return getDataStrategyMatch(
        mapRouteProperties,
        manifest,
        request,
        match,
        lazyRoutePropertiesToSkip,
        scopedContext,
        forceShouldLoad
      );
    }
    let defaultShouldRevalidate = shouldSkipRevalidation ? false : (
      // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
      isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
      currentUrl.search !== nextUrl.search || isNewRouteInstance(state.matches[index], match)
    );
    let shouldRevalidateArgs = {
      ...baseShouldRevalidateArgs,
      defaultShouldRevalidate
    };
    let shouldLoad = shouldRevalidateLoader(match, shouldRevalidateArgs);
    return getDataStrategyMatch(
      mapRouteProperties,
      manifest,
      request,
      match,
      lazyRoutePropertiesToSkip,
      scopedContext,
      shouldLoad,
      shouldRevalidateArgs
    );
  });
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f, key) => {
    if (initialHydration || !matches.some((m) => m.route.id === f.routeId) || fetchersQueuedForDeletion.has(key)) {
      return;
    }
    let fetcher = state.fetchers.get(key);
    let isMidInitialLoad = fetcher && fetcher.state !== "idle" && fetcher.data === void 0;
    let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
    if (!fetcherMatches) {
      if (hasPatchRoutesOnNavigation && isMidInitialLoad) {
        return;
      }
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (fetchRedirectIds.has(key)) {
      return;
    }
    let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
    let fetchController = new AbortController();
    let fetchRequest = createClientSideRequest(
      history,
      f.path,
      fetchController.signal
    );
    let fetcherDsMatches = null;
    if (cancelledFetcherLoads.has(key)) {
      cancelledFetcherLoads.delete(key);
      fetcherDsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties,
        manifest,
        fetchRequest,
        fetcherMatches,
        fetcherMatch,
        lazyRoutePropertiesToSkip,
        scopedContext
      );
    } else if (isMidInitialLoad) {
      if (isRevalidationRequired) {
        fetcherDsMatches = getTargetedDataStrategyMatches(
          mapRouteProperties,
          manifest,
          fetchRequest,
          fetcherMatches,
          fetcherMatch,
          lazyRoutePropertiesToSkip,
          scopedContext
        );
      }
    } else {
      let shouldRevalidateArgs = {
        ...baseShouldRevalidateArgs,
        defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired
      };
      if (shouldRevalidateLoader(fetcherMatch, shouldRevalidateArgs)) {
        fetcherDsMatches = getTargetedDataStrategyMatches(
          mapRouteProperties,
          manifest,
          fetchRequest,
          fetcherMatches,
          fetcherMatch,
          lazyRoutePropertiesToSkip,
          scopedContext,
          shouldRevalidateArgs
        );
      }
    }
    if (fetcherDsMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherDsMatches,
        match: fetcherMatch,
        request: fetchRequest,
        controller: fetchController
      });
    }
  });
  return { dsMatches, revalidatingFetchers };
}
function shouldLoadRouteOnHydration(route, loaderData, errors) {
  if (route.lazy) {
    return true;
  }
  if (!route.loader) {
    return false;
  }
  let hasData = loaderData != null && route.id in loaderData;
  let hasError = errors != null && errors[route.id] !== void 0;
  if (!hasData && hasError) {
    return false;
  }
  if (typeof route.loader === "function" && route.loader.hydrate === true) {
    return true;
  }
  return !hasData && !hasError;
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = (
    // [a] -> [a, b]
    !currentMatch || // [a, b] -> [a, c]
    match.route.id !== currentMatch.route.id
  );
  let isMissingData = !currentLoaderData.hasOwnProperty(match.route.id);
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
function patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties, allowElementMutations) {
  let childrenToPatch;
  if (routeId) {
    let route = manifest[routeId];
    invariant(
      route,
      `No route found to patch children into: routeId = ${routeId}`
    );
    if (!route.children) {
      route.children = [];
    }
    childrenToPatch = route.children;
  } else {
    childrenToPatch = routesToUse;
  }
  let uniqueChildren = [];
  let existingChildren = [];
  children.forEach((newRoute) => {
    let existingRoute = childrenToPatch.find(
      (existingRoute2) => isSameRoute(newRoute, existingRoute2)
    );
    if (existingRoute) {
      existingChildren.push({ existingRoute, newRoute });
    } else {
      uniqueChildren.push(newRoute);
    }
  });
  if (uniqueChildren.length > 0) {
    let newRoutes = convertRoutesToDataRoutes(
      uniqueChildren,
      mapRouteProperties,
      [routeId || "_", "patch", String(_optionalChain([childrenToPatch, 'optionalAccess', _29 => _29.length]) || "0")],
      manifest
    );
    childrenToPatch.push(...newRoutes);
  }
  if (allowElementMutations && existingChildren.length > 0) {
    for (let i = 0; i < existingChildren.length; i++) {
      let { existingRoute, newRoute } = existingChildren[i];
      let existingRouteTyped = existingRoute;
      let [newRouteTyped] = convertRoutesToDataRoutes(
        [newRoute],
        mapRouteProperties,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        true
      );
      Object.assign(existingRouteTyped, {
        element: newRouteTyped.element ? newRouteTyped.element : existingRouteTyped.element,
        errorElement: newRouteTyped.errorElement ? newRouteTyped.errorElement : existingRouteTyped.errorElement,
        hydrateFallbackElement: newRouteTyped.hydrateFallbackElement ? newRouteTyped.hydrateFallbackElement : existingRouteTyped.hydrateFallbackElement
      });
    }
  }
}
function isSameRoute(newRoute, existingRoute) {
  if ("id" in newRoute && "id" in existingRoute && newRoute.id === existingRoute.id) {
    return true;
  }
  if (!(newRoute.index === existingRoute.index && newRoute.path === existingRoute.path && newRoute.caseSensitive === existingRoute.caseSensitive)) {
    return false;
  }
  if ((!newRoute.children || newRoute.children.length === 0) && (!existingRoute.children || existingRoute.children.length === 0)) {
    return true;
  }
  return newRoute.children.every(
    (aChild, i) => _optionalChain([existingRoute, 'access', _30 => _30.children, 'optionalAccess', _31 => _31.some, 'call', _32 => _32((bChild) => isSameRoute(aChild, bChild))])
  );
}
var lazyRoutePropertyCache = /* @__PURE__ */ new WeakMap();
var loadLazyRouteProperty = ({
  key,
  route,
  manifest,
  mapRouteProperties
}) => {
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  if (!routeToUpdate.lazy || typeof routeToUpdate.lazy !== "object") {
    return;
  }
  let lazyFn = routeToUpdate.lazy[key];
  if (!lazyFn) {
    return;
  }
  let cache = lazyRoutePropertyCache.get(routeToUpdate);
  if (!cache) {
    cache = {};
    lazyRoutePropertyCache.set(routeToUpdate, cache);
  }
  let cachedPromise = cache[key];
  if (cachedPromise) {
    return cachedPromise;
  }
  let propertyPromise = (async () => {
    let isUnsupported = isUnsupportedLazyRouteObjectKey(key);
    let staticRouteValue = routeToUpdate[key];
    let isStaticallyDefined = staticRouteValue !== void 0 && key !== "hasErrorBoundary";
    if (isUnsupported) {
      warning(
        !isUnsupported,
        "Route property " + key + " is not a supported lazy route property. This property will be ignored."
      );
      cache[key] = Promise.resolve();
    } else if (isStaticallyDefined) {
      warning(
        false,
        `Route "${routeToUpdate.id}" has a static property "${key}" defined. The lazy property will be ignored.`
      );
    } else {
      let value = await lazyFn();
      if (value != null) {
        Object.assign(routeToUpdate, { [key]: value });
        Object.assign(routeToUpdate, mapRouteProperties(routeToUpdate));
      }
    }
    if (typeof routeToUpdate.lazy === "object") {
      routeToUpdate.lazy[key] = void 0;
      if (Object.values(routeToUpdate.lazy).every((value) => value === void 0)) {
        routeToUpdate.lazy = void 0;
      }
    }
  })();
  cache[key] = propertyPromise;
  return propertyPromise;
};
var lazyRouteFunctionCache = /* @__PURE__ */ new WeakMap();
function loadLazyRoute(route, type, manifest, mapRouteProperties, lazyRoutePropertiesToSkip) {
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  if (!route.lazy) {
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  }
  if (typeof route.lazy === "function") {
    let cachedPromise = lazyRouteFunctionCache.get(routeToUpdate);
    if (cachedPromise) {
      return {
        lazyRoutePromise: cachedPromise,
        lazyHandlerPromise: cachedPromise
      };
    }
    let lazyRoutePromise2 = (async () => {
      invariant(
        typeof route.lazy === "function",
        "No lazy route function found"
      );
      let lazyRoute = await route.lazy();
      let routeUpdates = {};
      for (let lazyRouteProperty in lazyRoute) {
        let lazyValue = lazyRoute[lazyRouteProperty];
        if (lazyValue === void 0) {
          continue;
        }
        let isUnsupported = isUnsupportedLazyRouteFunctionKey(lazyRouteProperty);
        let staticRouteValue = routeToUpdate[lazyRouteProperty];
        let isStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        lazyRouteProperty !== "hasErrorBoundary";
        if (isUnsupported) {
          warning(
            !isUnsupported,
            "Route property " + lazyRouteProperty + " is not a supported property to be returned from a lazy route function. This property will be ignored."
          );
        } else if (isStaticallyDefined) {
          warning(
            !isStaticallyDefined,
            `Route "${routeToUpdate.id}" has a static property "${lazyRouteProperty}" defined but its lazy function is also returning a value for this property. The lazy route property "${lazyRouteProperty}" will be ignored.`
          );
        } else {
          routeUpdates[lazyRouteProperty] = lazyValue;
        }
      }
      Object.assign(routeToUpdate, routeUpdates);
      Object.assign(routeToUpdate, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...mapRouteProperties(routeToUpdate),
        lazy: void 0
      });
    })();
    lazyRouteFunctionCache.set(routeToUpdate, lazyRoutePromise2);
    lazyRoutePromise2.catch(() => {
    });
    return {
      lazyRoutePromise: lazyRoutePromise2,
      lazyHandlerPromise: lazyRoutePromise2
    };
  }
  let lazyKeys = Object.keys(route.lazy);
  let lazyPropertyPromises = [];
  let lazyHandlerPromise = void 0;
  for (let key of lazyKeys) {
    if (lazyRoutePropertiesToSkip && lazyRoutePropertiesToSkip.includes(key)) {
      continue;
    }
    let promise = loadLazyRouteProperty({
      key,
      route,
      manifest,
      mapRouteProperties
    });
    if (promise) {
      lazyPropertyPromises.push(promise);
      if (key === type) {
        lazyHandlerPromise = promise;
      }
    }
  }
  let lazyRoutePromise = lazyPropertyPromises.length > 0 ? Promise.all(lazyPropertyPromises).then(() => {
  }) : void 0;
  _optionalChain([lazyRoutePromise, 'optionalAccess', _33 => _33.catch, 'call', _34 => _34(() => {
  })]);
  _optionalChain([lazyHandlerPromise, 'optionalAccess', _35 => _35.catch, 'call', _36 => _36(() => {
  })]);
  return {
    lazyRoutePromise,
    lazyHandlerPromise
  };
}
function isNonNullable(value) {
  return value !== void 0;
}
function loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties) {
  let promises = matches.map(({ route }) => {
    if (typeof route.lazy !== "object" || !route.lazy.unstable_middleware) {
      return void 0;
    }
    return loadLazyRouteProperty({
      key: "unstable_middleware",
      route,
      manifest,
      mapRouteProperties
    });
  }).filter(isNonNullable);
  return promises.length > 0 ? Promise.all(promises) : void 0;
}
async function defaultDataStrategy(args) {
  let matchesToLoad = args.matches.filter((m) => m.shouldLoad);
  let keyedResults = {};
  let results = await Promise.all(matchesToLoad.map((m) => m.resolve()));
  results.forEach((result, i) => {
    keyedResults[matchesToLoad[i].route.id] = result;
  });
  return keyedResults;
}
async function defaultDataStrategyWithMiddleware(args) {
  if (!args.matches.some((m) => m.route.unstable_middleware)) {
    return defaultDataStrategy(args);
  }
  let didCallHandler = false;
  return runClientMiddlewarePipeline(
    args,
    () => {
      didCallHandler = true;
      return defaultDataStrategy(args);
    },
    (error, routeId) => clientMiddlewareErrorHandler(
      error,
      routeId,
      args.matches,
      didCallHandler
    )
  );
}
function clientMiddlewareErrorHandler(error, routeId, matches, didCallHandler) {
  if (didCallHandler) {
    return {
      [routeId]: { type: "error", result: error }
    };
  } else {
    let boundaryRouteId = findNearestBoundary(
      matches,
      _optionalChain([matches, 'access', _37 => _37.find, 'call', _38 => _38((m) => m.route.id === routeId || m.route.loader), 'optionalAccess', _39 => _39.route, 'access', _40 => _40.id]) || routeId
    ).route.id;
    return {
      [boundaryRouteId]: { type: "error", result: error }
    };
  }
}
async function runServerMiddlewarePipeline(args, handler, errorHandler) {
  let { matches, request, params, context } = args;
  let tuples = matches.flatMap(
    (m) => m.route.unstable_middleware ? m.route.unstable_middleware.map((fn) => [m.route.id, fn]) : []
  );
  let result = await callServerRouteMiddleware(
    { request, params, context },
    tuples,
    handler,
    errorHandler
  );
  if (isResponse(result)) {
    return result;
  }
  invariant(false, `Expected a Response to be returned from route middleware`);
}
async function callServerRouteMiddleware(args, middlewares, handler, errorHandler, idx = 0) {
  let { request } = args;
  if (request.signal.aborted) {
    if (request.signal.reason) {
      throw request.signal.reason;
    }
    throw new Error(
      `Request aborted without an \`AbortSignal.reason\`: ${request.method} ${request.url}`
    );
  }
  let tuple = middlewares[idx];
  if (!tuple) {
    let result = await handler();
    return result;
  }
  let [routeId, middleware] = tuple;
  let nextCalled = false;
  let nextResult = void 0;
  let next = async () => {
    if (nextCalled) {
      throw new Error("You may only call `next()` once per middleware");
    }
    nextCalled = true;
    try {
      let result = await callServerRouteMiddleware(
        args,
        middlewares,
        handler,
        errorHandler,
        idx + 1
      );
      if (isDataWithResponseInit(result)) {
        result = dataWithResponseInitToResponse(result);
      }
      nextResult = result;
      return nextResult;
    } catch (e) {
      nextResult = await errorHandler(
        // Convert thrown data() values to ErrorResponses
        isDataWithResponseInit(e) ? dataWithResponseInitToErrorResponse(e) : e,
        routeId
      );
      return nextResult;
    }
  };
  try {
    let result = await middleware(
      {
        request: args.request,
        params: args.params,
        context: args.context
      },
      next
    );
    if (isDataWithResponseInit(result)) {
      result = dataWithResponseInitToResponse(result);
    }
    if (nextCalled) {
      return typeof result === "undefined" ? nextResult : result;
    } else if (isResponse(result)) {
      return result;
    } else {
      nextResult = await next();
      return nextResult;
    }
  } catch (e) {
    let response = await errorHandler(
      // Convert thrown data() values to ErrorResponses
      isDataWithResponseInit(e) ? dataWithResponseInitToErrorResponse(e) : e,
      routeId
    );
    return response;
  }
}
async function runClientMiddlewarePipeline(args, handler, errorHandler) {
  let { matches, request, params, context } = args;
  let tuples = matches.flatMap(
    (m) => m.route.unstable_middleware ? m.route.unstable_middleware.map((fn) => [m.route.id, fn]) : []
  );
  let handlerResult = {};
  await callClientRouteMiddleware(
    { request, params, context },
    tuples,
    handler,
    errorHandler,
    handlerResult
  );
  return handlerResult;
}
async function callClientRouteMiddleware(args, middlewares, handler, errorHandler, handlerResult = {}, idx = 0) {
  let { request } = args;
  if (request.signal.aborted) {
    if (request.signal.reason) {
      throw request.signal.reason;
    }
    throw new Error(
      `Request aborted without an \`AbortSignal.reason\`: ${request.method} ${request.url}`
    );
  }
  let tuple = middlewares[idx];
  if (!tuple) {
    let result = await handler();
    Object.assign(handlerResult, result);
    return;
  }
  let [routeId, middleware] = tuple;
  let nextCalled = false;
  let next = async () => {
    if (nextCalled) {
      throw new Error("You may only call `next()` once per middleware");
    }
    nextCalled = true;
    try {
      let result = await callClientRouteMiddleware(
        args,
        middlewares,
        handler,
        errorHandler,
        handlerResult,
        idx + 1
      );
      Object.assign(handlerResult, result);
    } catch (e) {
      let result = await errorHandler(e, routeId);
      Object.assign(handlerResult, result);
    }
  };
  try {
    let result = await middleware(
      {
        request: args.request,
        params: args.params,
        context: args.context
      },
      next
    );
    if (typeof result !== "undefined") {
      console.warn(
        "client middlewares are not intended to return values, the value will be ignored",
        result
      );
    }
    if (!nextCalled) {
      await next();
    }
  } catch (error) {
    let result = await errorHandler(error, routeId);
    Object.assign(handlerResult, result);
  }
}
function getDataStrategyMatchLazyPromises(mapRouteProperties, manifest, request, match, lazyRoutePropertiesToSkip) {
  let lazyMiddlewarePromise = loadLazyRouteProperty({
    key: "unstable_middleware",
    route: match.route,
    manifest,
    mapRouteProperties
  });
  let lazyRoutePromises = loadLazyRoute(
    match.route,
    isMutationMethod(request.method) ? "action" : "loader",
    manifest,
    mapRouteProperties,
    lazyRoutePropertiesToSkip
  );
  return {
    middleware: lazyMiddlewarePromise,
    route: lazyRoutePromises.lazyRoutePromise,
    handler: lazyRoutePromises.lazyHandlerPromise
  };
}
function getDataStrategyMatch(mapRouteProperties, manifest, request, match, lazyRoutePropertiesToSkip, scopedContext, shouldLoad, unstable_shouldRevalidateArgs = null) {
  let isUsingNewApi = false;
  let _lazyPromises = getDataStrategyMatchLazyPromises(
    mapRouteProperties,
    manifest,
    request,
    match,
    lazyRoutePropertiesToSkip
  );
  return {
    ...match,
    _lazyPromises,
    shouldLoad,
    unstable_shouldRevalidateArgs,
    unstable_shouldCallHandler(defaultShouldRevalidate) {
      isUsingNewApi = true;
      if (!unstable_shouldRevalidateArgs) {
        return shouldLoad;
      }
      if (typeof defaultShouldRevalidate === "boolean") {
        return shouldRevalidateLoader(match, {
          ...unstable_shouldRevalidateArgs,
          defaultShouldRevalidate
        });
      }
      return shouldRevalidateLoader(match, unstable_shouldRevalidateArgs);
    },
    resolve(handlerOverride) {
      if (isUsingNewApi || shouldLoad || handlerOverride && !isMutationMethod(request.method) && (match.route.lazy || match.route.loader)) {
        return callLoaderOrAction({
          request,
          match,
          lazyHandlerPromise: _optionalChain([_lazyPromises, 'optionalAccess', _41 => _41.handler]),
          lazyRoutePromise: _optionalChain([_lazyPromises, 'optionalAccess', _42 => _42.route]),
          handlerOverride,
          scopedContext
        });
      }
      return Promise.resolve({ type: "data" /* data */, result: void 0 });
    }
  };
}
function getTargetedDataStrategyMatches(mapRouteProperties, manifest, request, matches, targetMatch, lazyRoutePropertiesToSkip, scopedContext, shouldRevalidateArgs = null) {
  return matches.map((match) => {
    if (match.route.id !== targetMatch.route.id) {
      return {
        ...match,
        shouldLoad: false,
        unstable_shouldRevalidateArgs: shouldRevalidateArgs,
        unstable_shouldCallHandler: () => false,
        _lazyPromises: getDataStrategyMatchLazyPromises(
          mapRouteProperties,
          manifest,
          request,
          match,
          lazyRoutePropertiesToSkip
        ),
        resolve: () => Promise.resolve({ type: "data", result: void 0 })
      };
    }
    return getDataStrategyMatch(
      mapRouteProperties,
      manifest,
      request,
      match,
      lazyRoutePropertiesToSkip,
      scopedContext,
      true,
      shouldRevalidateArgs
    );
  });
}
async function callDataStrategyImpl(dataStrategyImpl, request, matches, fetcherKey, scopedContext, isStaticHandler) {
  if (matches.some((m) => _optionalChain([m, 'access', _43 => _43._lazyPromises, 'optionalAccess', _44 => _44.middleware]))) {
    await Promise.all(matches.map((m) => _optionalChain([m, 'access', _45 => _45._lazyPromises, 'optionalAccess', _46 => _46.middleware])));
  }
  let dataStrategyArgs = {
    request,
    params: matches[0].params,
    context: scopedContext,
    matches
  };
  let unstable_runClientMiddleware = isStaticHandler ? () => {
    throw new Error(
      "You cannot call `unstable_runClientMiddleware()` from a static handler `dataStrategy`. Middleware is run outside of `dataStrategy` during SSR in order to bubble up the Response.  You can enable middleware via the `respond` API in `query`/`queryRoute`"
    );
  } : (cb) => {
    let typedDataStrategyArgs = dataStrategyArgs;
    let didCallHandler = false;
    return runClientMiddlewarePipeline(
      typedDataStrategyArgs,
      () => {
        didCallHandler = true;
        return cb({
          ...typedDataStrategyArgs,
          fetcherKey,
          unstable_runClientMiddleware: () => {
            throw new Error(
              "Cannot call `unstable_runClientMiddleware()` from within an `unstable_runClientMiddleware` handler"
            );
          }
        });
      },
      (error, routeId) => clientMiddlewareErrorHandler(
        error,
        routeId,
        matches,
        didCallHandler
      )
    );
  };
  let results = await dataStrategyImpl({
    ...dataStrategyArgs,
    fetcherKey,
    unstable_runClientMiddleware
  });
  try {
    await Promise.all(
      matches.flatMap((m) => [
        _optionalChain([m, 'access', _47 => _47._lazyPromises, 'optionalAccess', _48 => _48.handler]),
        _optionalChain([m, 'access', _49 => _49._lazyPromises, 'optionalAccess', _50 => _50.route])
      ])
    );
  } catch (e) {
  }
  return results;
}
async function callLoaderOrAction({
  request,
  match,
  lazyHandlerPromise,
  lazyRoutePromise,
  handlerOverride,
  scopedContext
}) {
  let result;
  let onReject;
  let isAction = isMutationMethod(request.method);
  let type = isAction ? "action" : "loader";
  let runHandler = (handler) => {
    let reject;
    let abortPromise = new Promise((_, r) => reject = r);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = (ctx) => {
      if (typeof handler !== "function") {
        return Promise.reject(
          new Error(
            `You cannot call the handler for a route which defines a boolean "${type}" [routeId: ${match.route.id}]`
          )
        );
      }
      return handler(
        {
          request,
          params: match.params,
          context: scopedContext
        },
        ...ctx !== void 0 ? [ctx] : []
      );
    };
    let handlerPromise = (async () => {
      try {
        let val = await (handlerOverride ? handlerOverride((ctx) => actualHandler(ctx)) : actualHandler());
        return { type: "data", result: val };
      } catch (e) {
        return { type: "error", result: e };
      }
    })();
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = isAction ? match.route.action : match.route.loader;
    if (lazyHandlerPromise || lazyRoutePromise) {
      if (handler) {
        let handlerError;
        let [value] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          runHandler(handler).catch((e) => {
            handlerError = e;
          }),
          // Ensure all lazy route promises are resolved before continuing
          lazyHandlerPromise,
          lazyRoutePromise
        ]);
        if (handlerError !== void 0) {
          throw handlerError;
        }
        result = value;
      } else {
        await lazyHandlerPromise;
        let handler2 = isAction ? match.route.action : match.route.loader;
        if (handler2) {
          [result] = await Promise.all([runHandler(handler2), lazyRoutePromise]);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          return { type: "data" /* data */, result: void 0 };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
  } catch (e) {
    return { type: "error" /* error */, result: e };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
  let { result, type } = dataStrategyResult;
  if (isResponse(result)) {
    let data2;
    try {
      let contentType = result.headers.get("Content-Type");
      if (contentType && /\bapplication\/json\b/.test(contentType)) {
        if (result.body == null) {
          data2 = null;
        } else {
          data2 = await result.json();
        }
      } else {
        data2 = await result.text();
      }
    } catch (e) {
      return { type: "error" /* error */, error: e };
    }
    if (type === "error" /* error */) {
      return {
        type: "error" /* error */,
        error: new ErrorResponseImpl(result.status, result.statusText, data2),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: "data" /* data */,
      data: data2,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === "error" /* error */) {
    if (isDataWithResponseInit(result)) {
      if (result.data instanceof Error) {
        return {
          type: "error" /* error */,
          error: result.data,
          statusCode: _optionalChain([result, 'access', _51 => _51.init, 'optionalAccess', _52 => _52.status]),
          headers: _optionalChain([result, 'access', _53 => _53.init, 'optionalAccess', _54 => _54.headers]) ? new Headers(result.init.headers) : void 0
        };
      }
      return {
        type: "error" /* error */,
        error: new ErrorResponseImpl(
          _optionalChain([result, 'access', _55 => _55.init, 'optionalAccess', _56 => _56.status]) || 500,
          void 0,
          result.data
        ),
        statusCode: isRouteErrorResponse(result) ? result.status : void 0,
        headers: _optionalChain([result, 'access', _57 => _57.init, 'optionalAccess', _58 => _58.headers]) ? new Headers(result.init.headers) : void 0
      };
    }
    return {
      type: "error" /* error */,
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : void 0
    };
  }
  if (isDataWithResponseInit(result)) {
    return {
      type: "data" /* data */,
      data: result.data,
      statusCode: _optionalChain([result, 'access', _59 => _59.init, 'optionalAccess', _60 => _60.status]),
      headers: _optionalChain([result, 'access', _61 => _61.init, 'optionalAccess', _62 => _62.headers]) ? new Headers(result.init.headers) : void 0
    };
  }
  return { type: "data" /* data */, data: result };
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename) {
  let location = response.headers.get("Location");
  invariant(
    location,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  );
  if (!isAbsoluteUrl(location)) {
    let trimmedMatches = matches.slice(
      0,
      matches.findIndex((m) => m.route.id === routeId) + 1
    );
    location = normalizeTo(
      new URL(request.url),
      trimmedMatches,
      basename,
      location
    );
    response.headers.set("Location", location);
  }
  return response;
}
function normalizeRedirectLocation(location, currentUrl, basename) {
  if (isAbsoluteUrl(location)) {
    let normalizedLocation = location;
    let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
    let isSameBasename = stripBasename(url.pathname, basename) != null;
    if (url.origin === currentUrl.origin && isSameBasename) {
      return url.pathname + url.search + url.hash;
    }
  }
  return location;
}
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = { signal };
  if (submission && isMutationMethod(submission.formMethod)) {
    let { formMethod, formEncType } = submission;
    init.method = formMethod.toUpperCase();
    if (formEncType === "application/json") {
      init.headers = new Headers({ "Content-Type": formEncType });
      init.body = JSON.stringify(submission.json);
    } else if (formEncType === "text/plain") {
      init.body = submission.text;
    } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
      init.body = convertFormDataToSearchParams(submission.formData);
    } else {
      init.body = submission.formData;
    }
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    searchParams.append(key, typeof value === "string" ? value : value.name);
  }
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries()) {
    formData.append(key, value);
  }
  return formData;
}
function processRouteLoaderData(matches, results, pendingActionResult, isStaticHandler = false, skipLoaderErrorBubbling = false) {
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
  matches.forEach((match) => {
    if (!(match.route.id in results)) {
      return;
    }
    let id = match.route.id;
    let result = results[id];
    invariant(
      !isRedirectResult(result),
      "Cannot handle redirect results in processLoaderData"
    );
    if (isErrorResult(result)) {
      let error = result.error;
      if (pendingError !== void 0) {
        error = pendingError;
        pendingError = void 0;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id] = error;
      } else {
        let boundaryMatch = findNearestBoundary(matches, id);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      if (!isStaticHandler) {
        loaderData[id] = ResetLoaderDataSymbol;
      }
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      loaderData[id] = result.data;
      if (result.statusCode && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  });
  if (pendingError !== void 0 && pendingActionResult) {
    errors = { [pendingActionResult[0]]: pendingError };
    if (pendingActionResult[2]) {
      loaderData[pendingActionResult[2]] = void 0;
    }
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, results, pendingActionResult, revalidatingFetchers, fetcherResults) {
  let { loaderData, errors } = processRouteLoaderData(
    matches,
    results,
    pendingActionResult
  );
  revalidatingFetchers.filter((f) => !f.matches || f.matches.some((m) => m.shouldLoad)).forEach((rf) => {
    let { key, match, controller } = rf;
    if (controller && controller.signal.aborted) {
      return;
    }
    let result = fetcherResults[key];
    invariant(result, "Did not find corresponding fetcher result");
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, _optionalChain([match, 'optionalAccess', _63 => _63.route, 'access', _64 => _64.id]));
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = {
          ...errors,
          [boundaryMatch.route.id]: result.error
        };
      }
      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else {
      let doneFetcher = getDoneFetcher(result.data);
      state.fetchers.set(key, doneFetcher);
    }
  });
  return { loaderData, errors };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = Object.entries(newLoaderData).filter(([, v]) => v !== ResetLoaderDataSymbol).reduce((merged, [k, v]) => {
    merged[k] = v;
    return merged;
  }, {});
  for (let match of matches) {
    let id = match.route.id;
    if (!newLoaderData.hasOwnProperty(id) && loaderData.hasOwnProperty(id) && match.route.loader) {
      mergedLoaderData[id] = loaderData[id];
    }
    if (errors && errors.hasOwnProperty(id)) {
      break;
    }
  }
  return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
  if (!pendingActionResult) {
    return {};
  }
  return isErrorResult(pendingActionResult[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [pendingActionResult[0]]: pendingActionResult[1].data
    }
  };
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
  let route = routes.length === 1 ? routes[0] : routes.find((r) => r.index || !r.path || r.path === "/") || {
    id: `__shim-error-route__`
  };
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route
      }
    ],
    route
  };
}
function getInternalRouterError(status, {
  pathname,
  routeId,
  method,
  type,
  message
} = {}) {
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method} request to "${pathname}" but did not provide a \`loader\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = `Route "${routeId}" does not match URL "${pathname}"`;
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = `No route matches URL "${pathname}"`;
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method.toUpperCase()} request to "${pathname}" but did not provide an \`action\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (method) {
      errorMessage = `Invalid request method "${method.toUpperCase()}"`;
    }
  }
  return new ErrorResponseImpl(
    status || 500,
    statusText,
    new Error(errorMessage),
    true
  );
}
function findRedirect(results) {
  let entries = Object.entries(results);
  for (let i = entries.length - 1; i >= 0; i--) {
    let [key, result] = entries[i];
    if (isRedirectResult(result)) {
      return { key, result };
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath({ ...parsedPath, hash: "" });
}
function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }
  if (a.hash === "") {
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    return true;
  } else if (b.hash !== "") {
    return true;
  }
  return false;
}
function dataWithResponseInitToResponse(data2) {
  return new Response(
    typeof data2.data === "string" ? data2.data : JSON.stringify(data2.data),
    data2.init || void 0
  );
}
function dataWithResponseInitToErrorResponse(data2) {
  return new ErrorResponseImpl(
    _nullishCoalesce(_optionalChain([data2, 'access', _65 => _65.init, 'optionalAccess', _66 => _66.status]), () => ( 500)),
    _nullishCoalesce(_optionalChain([data2, 'access', _67 => _67.init, 'optionalAccess', _68 => _68.statusText]), () => ( "Internal Server Error")),
    data2.data
  );
}
function errorResponseToResponse(error) {
  return new Response(
    typeof error.data === "string" ? error.data : JSON.stringify(error.data),
    {
      status: error.status,
      statusText: error.statusText
    }
  );
}
function isDataStrategyResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === "data" /* data */ || result.type === "error" /* error */);
}
function isRedirectDataStrategyResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isErrorResult(result) {
  return result.type === "error" /* error */;
}
function isRedirectResult(result) {
  return (result && result.type) === "redirect" /* redirect */;
}
function isDataWithResponseInit(value) {
  return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes.has(statusCode);
}
function isRedirectResponse(result) {
  return isResponse(result) && isRedirectStatusCode(result.status) && result.headers.has("Location");
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toUpperCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toUpperCase());
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    return matches[matches.length - 1];
  }
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let { formMethod, formAction, formEncType, text, formData, json } = navigation;
  if (!formMethod || !formAction || !formEncType) {
    return;
  }
  if (text != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: void 0,
      text
    };
  } else if (formData != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData,
      json: void 0,
      text: void 0
    };
  } else if (json !== void 0) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json,
      text: void 0
    };
  }
}
function getLoadingNavigation(location, submission) {
  if (submission) {
    let navigation = {
      state: "loading",
      location,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  } else {
    let navigation = {
      state: "loading",
      location,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    return navigation;
  }
}
function getSubmittingNavigation(location, submission) {
  let navigation = {
    state: "submitting",
    location,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
  return navigation;
}
function getLoadingFetcher(submission, data2) {
  if (submission) {
    let fetcher = {
      state: "loading",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data: data2
    };
    return fetcher;
  } else {
    let fetcher = {
      state: "loading",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: data2
    };
    return fetcher;
  }
}
function getSubmittingFetcher(submission, existingFetcher) {
  let fetcher = {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0
  };
  return fetcher;
}
function getDoneFetcher(data2) {
  let fetcher = {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: data2
  };
  return fetcher;
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(
      TRANSITIONS_STORAGE_KEY
    );
    if (sessionPositions) {
      let json = JSON.parse(sessionPositions);
      for (let [k, v] of Object.entries(json || {})) {
        if (v && Array.isArray(v)) {
          transitions.set(k, new Set(v || []));
        }
      }
    }
  } catch (e) {
  }
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json = {};
    for (let [k, v] of transitions) {
      json[k] = [...v];
    }
    try {
      _window.sessionStorage.setItem(
        TRANSITIONS_STORAGE_KEY,
        JSON.stringify(json)
      );
    } catch (error) {
      warning(
        false,
        `Failed to save applied view transitions in sessionStorage (${error}).`
      );
    }
  }
}
function createDeferred() {
  let resolve;
  let reject;
  let promise = new Promise((res, rej) => {
    resolve = async (val) => {
      res(val);
      try {
        await promise;
      } catch (e) {
      }
    };
    reject = async (error) => {
      rej(error);
      try {
        await promise;
      } catch (e) {
      }
    };
  });
  return {
    promise,
    //@ts-ignore
    resolve,
    //@ts-ignore
    reject
  };
}

// lib/dom/ssr/single-fetch.tsx
var _react = __webpack_require__(/*! react */ "react"); var React = _interopRequireWildcard(_react); var React2 = _interopRequireWildcard(_react); var React3 = _interopRequireWildcard(_react); var React8 = _interopRequireWildcard(_react); var React7 = _interopRequireWildcard(_react); var React6 = _interopRequireWildcard(_react); var React5 = _interopRequireWildcard(_react); var React4 = _interopRequireWildcard(_react);

// vendor/turbo-stream-v2/utils.ts
var HOLE = -1;
var NAN = -2;
var NEGATIVE_INFINITY = -3;
var NEGATIVE_ZERO = -4;
var NULL = -5;
var POSITIVE_INFINITY = -6;
var UNDEFINED = -7;
var TYPE_BIGINT = "B";
var TYPE_DATE = "D";
var TYPE_ERROR = "E";
var TYPE_MAP = "M";
var TYPE_NULL_OBJECT = "N";
var TYPE_PROMISE = "P";
var TYPE_REGEXP = "R";
var TYPE_SET = "S";
var TYPE_SYMBOL = "Y";
var TYPE_URL = "U";
var TYPE_PREVIOUS_RESOLVED = "Z";
var Deferred = class {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
};
function createLineSplittingTransform() {
  const decoder = new TextDecoder();
  let leftover = "";
  return new TransformStream({
    transform(chunk, controller) {
      const str = decoder.decode(chunk, { stream: true });
      const parts = (leftover + str).split("\n");
      leftover = parts.pop() || "";
      for (const part of parts) {
        controller.enqueue(part);
      }
    },
    flush(controller) {
      if (leftover) {
        controller.enqueue(leftover);
      }
    }
  });
}

// vendor/turbo-stream-v2/flatten.ts
function flatten(input) {
  const { indices } = this;
  const existing = indices.get(input);
  if (existing) return [existing];
  if (input === void 0) return UNDEFINED;
  if (input === null) return NULL;
  if (Number.isNaN(input)) return NAN;
  if (input === Number.POSITIVE_INFINITY) return POSITIVE_INFINITY;
  if (input === Number.NEGATIVE_INFINITY) return NEGATIVE_INFINITY;
  if (input === 0 && 1 / input < 0) return NEGATIVE_ZERO;
  const index = this.index++;
  indices.set(input, index);
  stringify.call(this, input, index);
  return index;
}
function stringify(input, index) {
  const { deferred, plugins, postPlugins } = this;
  const str = this.stringified;
  const stack = [[input, index]];
  while (stack.length > 0) {
    const [input2, index2] = stack.pop();
    const partsForObj = (obj) => Object.keys(obj).map((k) => `"_${flatten.call(this, k)}":${flatten.call(this, obj[k])}`).join(",");
    let error = null;
    switch (typeof input2) {
      case "boolean":
      case "number":
      case "string":
        str[index2] = JSON.stringify(input2);
        break;
      case "bigint":
        str[index2] = `["${TYPE_BIGINT}","${input2}"]`;
        break;
      case "symbol": {
        const keyFor = Symbol.keyFor(input2);
        if (!keyFor) {
          error = new Error(
            "Cannot encode symbol unless created with Symbol.for()"
          );
        } else {
          str[index2] = `["${TYPE_SYMBOL}",${JSON.stringify(keyFor)}]`;
        }
        break;
      }
      case "object": {
        if (!input2) {
          str[index2] = `${NULL}`;
          break;
        }
        const isArray = Array.isArray(input2);
        let pluginHandled = false;
        if (!isArray && plugins) {
          for (const plugin of plugins) {
            const pluginResult = plugin(input2);
            if (Array.isArray(pluginResult)) {
              pluginHandled = true;
              const [pluginIdentifier, ...rest] = pluginResult;
              str[index2] = `[${JSON.stringify(pluginIdentifier)}`;
              if (rest.length > 0) {
                str[index2] += `,${rest.map((v) => flatten.call(this, v)).join(",")}`;
              }
              str[index2] += "]";
              break;
            }
          }
        }
        if (!pluginHandled) {
          let result = isArray ? "[" : "{";
          if (isArray) {
            for (let i = 0; i < input2.length; i++)
              result += (i ? "," : "") + (i in input2 ? flatten.call(this, input2[i]) : HOLE);
            str[index2] = `${result}]`;
          } else if (input2 instanceof Date) {
            const dateTime = input2.getTime();
            str[index2] = `["${TYPE_DATE}",${Number.isNaN(dateTime) ? JSON.stringify("invalid") : dateTime}]`;
          } else if (input2 instanceof URL) {
            str[index2] = `["${TYPE_URL}",${JSON.stringify(input2.href)}]`;
          } else if (input2 instanceof RegExp) {
            str[index2] = `["${TYPE_REGEXP}",${JSON.stringify(
              input2.source
            )},${JSON.stringify(input2.flags)}]`;
          } else if (input2 instanceof Set) {
            if (input2.size > 0) {
              str[index2] = `["${TYPE_SET}",${[...input2].map((val) => flatten.call(this, val)).join(",")}]`;
            } else {
              str[index2] = `["${TYPE_SET}"]`;
            }
          } else if (input2 instanceof Map) {
            if (input2.size > 0) {
              str[index2] = `["${TYPE_MAP}",${[...input2].flatMap(([k, v]) => [
                flatten.call(this, k),
                flatten.call(this, v)
              ]).join(",")}]`;
            } else {
              str[index2] = `["${TYPE_MAP}"]`;
            }
          } else if (input2 instanceof Promise) {
            str[index2] = `["${TYPE_PROMISE}",${index2}]`;
            deferred[index2] = input2;
          } else if (input2 instanceof Error) {
            str[index2] = `["${TYPE_ERROR}",${JSON.stringify(input2.message)}`;
            if (input2.name !== "Error") {
              str[index2] += `,${JSON.stringify(input2.name)}`;
            }
            str[index2] += "]";
          } else if (Object.getPrototypeOf(input2) === null) {
            str[index2] = `["${TYPE_NULL_OBJECT}",{${partsForObj(input2)}}]`;
          } else if (isPlainObject(input2)) {
            str[index2] = `{${partsForObj(input2)}}`;
          } else {
            error = new Error("Cannot encode object with prototype");
          }
        }
        break;
      }
      default: {
        const isArray = Array.isArray(input2);
        let pluginHandled = false;
        if (!isArray && plugins) {
          for (const plugin of plugins) {
            const pluginResult = plugin(input2);
            if (Array.isArray(pluginResult)) {
              pluginHandled = true;
              const [pluginIdentifier, ...rest] = pluginResult;
              str[index2] = `[${JSON.stringify(pluginIdentifier)}`;
              if (rest.length > 0) {
                str[index2] += `,${rest.map((v) => flatten.call(this, v)).join(",")}`;
              }
              str[index2] += "]";
              break;
            }
          }
        }
        if (!pluginHandled) {
          error = new Error("Cannot encode function or unexpected type");
        }
      }
    }
    if (error) {
      let pluginHandled = false;
      if (postPlugins) {
        for (const plugin of postPlugins) {
          const pluginResult = plugin(input2);
          if (Array.isArray(pluginResult)) {
            pluginHandled = true;
            const [pluginIdentifier, ...rest] = pluginResult;
            str[index2] = `[${JSON.stringify(pluginIdentifier)}`;
            if (rest.length > 0) {
              str[index2] += `,${rest.map((v) => flatten.call(this, v)).join(",")}`;
            }
            str[index2] += "]";
            break;
          }
        }
      }
      if (!pluginHandled) {
        throw error;
      }
    }
  }
}
var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames;
}

// vendor/turbo-stream-v2/unflatten.ts
var globalObj = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : void 0;
function unflatten(parsed) {
  const { hydrated, values } = this;
  if (typeof parsed === "number") return hydrate.call(this, parsed);
  if (!Array.isArray(parsed) || !parsed.length) throw new SyntaxError();
  const startIndex = values.length;
  for (const value of parsed) {
    values.push(value);
  }
  hydrated.length = values.length;
  return hydrate.call(this, startIndex);
}
function hydrate(index) {
  const { hydrated, values, deferred, plugins } = this;
  let result;
  const stack = [
    [
      index,
      (v) => {
        result = v;
      }
    ]
  ];
  let postRun = [];
  while (stack.length > 0) {
    const [index2, set] = stack.pop();
    switch (index2) {
      case UNDEFINED:
        set(void 0);
        continue;
      case NULL:
        set(null);
        continue;
      case NAN:
        set(NaN);
        continue;
      case POSITIVE_INFINITY:
        set(Infinity);
        continue;
      case NEGATIVE_INFINITY:
        set(-Infinity);
        continue;
      case NEGATIVE_ZERO:
        set(-0);
        continue;
    }
    if (hydrated[index2]) {
      set(hydrated[index2]);
      continue;
    }
    const value = values[index2];
    if (!value || typeof value !== "object") {
      hydrated[index2] = value;
      set(value);
      continue;
    }
    if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const [type, b, c] = value;
        switch (type) {
          case TYPE_DATE:
            set(hydrated[index2] = new Date(b));
            continue;
          case TYPE_URL:
            set(hydrated[index2] = new URL(b));
            continue;
          case TYPE_BIGINT:
            set(hydrated[index2] = BigInt(b));
            continue;
          case TYPE_REGEXP:
            set(hydrated[index2] = new RegExp(b, c));
            continue;
          case TYPE_SYMBOL:
            set(hydrated[index2] = Symbol.for(b));
            continue;
          case TYPE_SET:
            const newSet = /* @__PURE__ */ new Set();
            hydrated[index2] = newSet;
            for (let i = value.length - 1; i > 0; i--)
              stack.push([
                value[i],
                (v) => {
                  newSet.add(v);
                }
              ]);
            set(newSet);
            continue;
          case TYPE_MAP:
            const map = /* @__PURE__ */ new Map();
            hydrated[index2] = map;
            for (let i = value.length - 2; i > 0; i -= 2) {
              const r = [];
              stack.push([
                value[i + 1],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                value[i],
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                map.set(r[0], r[1]);
              });
            }
            set(map);
            continue;
          case TYPE_NULL_OBJECT:
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index2] = obj;
            for (const key of Object.keys(b).reverse()) {
              const r = [];
              stack.push([
                b[key],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                Number(key.slice(1)),
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                obj[r[0]] = r[1];
              });
            }
            set(obj);
            continue;
          case TYPE_PROMISE:
            if (hydrated[b]) {
              set(hydrated[index2] = hydrated[b]);
            } else {
              const d = new Deferred();
              deferred[b] = d;
              set(hydrated[index2] = d.promise);
            }
            continue;
          case TYPE_ERROR:
            const [, message, errorType] = value;
            let error = errorType && globalObj && globalObj[errorType] ? new globalObj[errorType](message) : new Error(message);
            hydrated[index2] = error;
            set(error);
            continue;
          case TYPE_PREVIOUS_RESOLVED:
            set(hydrated[index2] = hydrated[b]);
            continue;
          default:
            if (Array.isArray(plugins)) {
              const r = [];
              const vals = value.slice(1);
              for (let i = 0; i < vals.length; i++) {
                const v = vals[i];
                stack.push([
                  v,
                  (v2) => {
                    r[i] = v2;
                  }
                ]);
              }
              postRun.push(() => {
                for (const plugin of plugins) {
                  const result2 = plugin(value[0], ...r);
                  if (result2) {
                    set(hydrated[index2] = result2.value);
                    return;
                  }
                }
                throw new SyntaxError();
              });
              continue;
            }
            throw new SyntaxError();
        }
      } else {
        const array = [];
        hydrated[index2] = array;
        for (let i = 0; i < value.length; i++) {
          const n = value[i];
          if (n !== HOLE) {
            stack.push([
              n,
              (v) => {
                array[i] = v;
              }
            ]);
          }
        }
        set(array);
        continue;
      }
    } else {
      const object = {};
      hydrated[index2] = object;
      for (const key of Object.keys(value).reverse()) {
        const r = [];
        stack.push([
          value[key],
          (v) => {
            r[1] = v;
          }
        ]);
        stack.push([
          Number(key.slice(1)),
          (k) => {
            r[0] = k;
          }
        ]);
        postRun.push(() => {
          object[r[0]] = r[1];
        });
      }
      set(object);
      continue;
    }
  }
  while (postRun.length > 0) {
    postRun.pop()();
  }
  return result;
}

// vendor/turbo-stream-v2/turbo-stream.ts
async function decode(readable, options) {
  const { plugins } = _nullishCoalesce(options, () => ( {}));
  const done = new Deferred();
  const reader = readable.pipeThrough(createLineSplittingTransform()).getReader();
  const decoder = {
    values: [],
    hydrated: [],
    deferred: {},
    plugins
  };
  const decoded = await decodeInitial.call(decoder, reader);
  let donePromise = done.promise;
  if (decoded.done) {
    done.resolve();
  } else {
    donePromise = decodeDeferred.call(decoder, reader).then(done.resolve).catch((reason) => {
      for (const deferred of Object.values(decoder.deferred)) {
        deferred.reject(reason);
      }
      done.reject(reason);
    });
  }
  return {
    done: donePromise.then(() => reader.closed),
    value: decoded.value
  };
}
async function decodeInitial(reader) {
  const read = await reader.read();
  if (!read.value) {
    throw new SyntaxError();
  }
  let line;
  try {
    line = JSON.parse(read.value);
  } catch (reason) {
    throw new SyntaxError();
  }
  return {
    done: read.done,
    value: unflatten.call(this, line)
  };
}
async function decodeDeferred(reader) {
  let read = await reader.read();
  while (!read.done) {
    if (!read.value) continue;
    const line = read.value;
    switch (line[0]) {
      case TYPE_PROMISE: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.resolve(value);
        break;
      }
      case TYPE_ERROR: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.reject(value);
        break;
      }
      default:
        throw new SyntaxError();
    }
    read = await reader.read();
  }
}
function encode(input, options) {
  const { plugins, postPlugins, signal } = _nullishCoalesce(options, () => ( {}));
  const encoder = {
    deferred: {},
    index: 0,
    indices: /* @__PURE__ */ new Map(),
    stringified: [],
    plugins,
    postPlugins,
    signal
  };
  const textEncoder = new TextEncoder();
  let lastSentIndex = 0;
  const readable = new ReadableStream({
    async start(controller) {
      const id = flatten.call(encoder, input);
      if (Array.isArray(id)) {
        throw new Error("This should never happen");
      }
      if (id < 0) {
        controller.enqueue(textEncoder.encode(`${id}
`));
      } else {
        controller.enqueue(
          textEncoder.encode(`[${encoder.stringified.join(",")}]
`)
        );
        lastSentIndex = encoder.stringified.length - 1;
      }
      const seenPromises = /* @__PURE__ */ new WeakSet();
      if (Object.keys(encoder.deferred).length) {
        let raceDone;
        const racePromise = new Promise((resolve, reject) => {
          raceDone = resolve;
          if (signal) {
            const rejectPromise = () => reject(signal.reason || new Error("Signal was aborted."));
            if (signal.aborted) {
              rejectPromise();
            } else {
              signal.addEventListener("abort", (event) => {
                rejectPromise();
              });
            }
          }
        });
        while (Object.keys(encoder.deferred).length > 0) {
          for (const [deferredId, deferred] of Object.entries(
            encoder.deferred
          )) {
            if (seenPromises.has(deferred)) continue;
            seenPromises.add(
              // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
              encoder.deferred[Number(deferredId)] = Promise.race([
                racePromise,
                deferred
              ]).then(
                (resolved) => {
                  const id2 = flatten.call(encoder, resolved);
                  if (Array.isArray(id2)) {
                    controller.enqueue(
                      textEncoder.encode(
                        `${TYPE_PROMISE}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`
                      )
                    );
                    encoder.index++;
                    lastSentIndex++;
                  } else if (id2 < 0) {
                    controller.enqueue(
                      textEncoder.encode(
                        `${TYPE_PROMISE}${deferredId}:${id2}
`
                      )
                    );
                  } else {
                    const values = encoder.stringified.slice(lastSentIndex + 1).join(",");
                    controller.enqueue(
                      textEncoder.encode(
                        `${TYPE_PROMISE}${deferredId}:[${values}]
`
                      )
                    );
                    lastSentIndex = encoder.stringified.length - 1;
                  }
                },
                (reason) => {
                  if (!reason || typeof reason !== "object" || !(reason instanceof Error)) {
                    reason = new Error("An unknown error occurred");
                  }
                  const id2 = flatten.call(encoder, reason);
                  if (Array.isArray(id2)) {
                    controller.enqueue(
                      textEncoder.encode(
                        `${TYPE_ERROR}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`
                      )
                    );
                    encoder.index++;
                    lastSentIndex++;
                  } else if (id2 < 0) {
                    controller.enqueue(
                      textEncoder.encode(
                        `${TYPE_ERROR}${deferredId}:${id2}
`
                      )
                    );
                  } else {
                    const values = encoder.stringified.slice(lastSentIndex + 1).join(",");
                    controller.enqueue(
                      textEncoder.encode(
                        `${TYPE_ERROR}${deferredId}:[${values}]
`
                      )
                    );
                    lastSentIndex = encoder.stringified.length - 1;
                  }
                }
              ).finally(() => {
                delete encoder.deferred[Number(deferredId)];
              })
            );
          }
          await Promise.race(Object.values(encoder.deferred));
        }
        raceDone();
      }
      await Promise.all(Object.values(encoder.deferred));
      controller.close();
    }
  });
  return readable;
}

// lib/dom/ssr/data.ts
async function createRequestInit(request) {
  let init = { signal: request.signal };
  if (request.method !== "GET") {
    init.method = request.method;
    let contentType = request.headers.get("Content-Type");
    if (contentType && /\bapplication\/json\b/.test(contentType)) {
      init.headers = { "Content-Type": contentType };
      init.body = JSON.stringify(await request.json());
    } else if (contentType && /\btext\/plain\b/.test(contentType)) {
      init.headers = { "Content-Type": contentType };
      init.body = await request.text();
    } else if (contentType && /\bapplication\/x-www-form-urlencoded\b/.test(contentType)) {
      init.body = new URLSearchParams(await request.text());
    } else {
      init.body = await request.formData();
    }
  }
  return init;
}

// lib/dom/ssr/markup.ts
var ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
function createHtml(html) {
  return { __html: html };
}

// lib/dom/ssr/invariant.ts
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}

// lib/dom/ssr/single-fetch.tsx
var SingleFetchRedirectSymbol = Symbol("SingleFetchRedirect");
var SingleFetchNoResultError = class extends Error {
};
var SINGLE_FETCH_REDIRECT_STATUS = 202;
var NO_BODY_STATUS_CODES = /* @__PURE__ */ new Set([100, 101, 204, 205]);
function StreamTransfer({
  context,
  identifier,
  reader,
  textDecoder,
  nonce
}) {
  if (!context.renderMeta || !context.renderMeta.didRenderScripts) {
    return null;
  }
  if (!context.renderMeta.streamCache) {
    context.renderMeta.streamCache = {};
  }
  let { streamCache } = context.renderMeta;
  let promise = streamCache[identifier];
  if (!promise) {
    promise = streamCache[identifier] = reader.read().then((result) => {
      streamCache[identifier].result = {
        done: result.done,
        value: textDecoder.decode(result.value, { stream: true })
      };
    }).catch((e) => {
      streamCache[identifier].error = e;
    });
  }
  if (promise.error) {
    throw promise.error;
  }
  if (promise.result === void 0) {
    throw promise;
  }
  let { done, value } = promise.result;
  let scriptTag = value ? /* @__PURE__ */ React.createElement(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `window.__reactRouterContext.streamController.enqueue(${escapeHtml(
          JSON.stringify(value)
        )});`
      }
    }
  ) : null;
  if (done) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, scriptTag, /* @__PURE__ */ React.createElement(
      "script",
      {
        nonce,
        dangerouslySetInnerHTML: {
          __html: `window.__reactRouterContext.streamController.close();`
        }
      }
    ));
  } else {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, scriptTag, /* @__PURE__ */ React.createElement(React.Suspense, null, /* @__PURE__ */ React.createElement(
      StreamTransfer,
      {
        context,
        identifier: identifier + 1,
        reader,
        textDecoder,
        nonce
      }
    )));
  }
}
function getTurboStreamSingleFetchDataStrategy(getRouter, manifest, routeModules, ssr, basename) {
  let dataStrategy = getSingleFetchDataStrategyImpl(
    getRouter,
    (match) => {
      let manifestRoute = manifest.routes[match.route.id];
      invariant2(manifestRoute, "Route not found in manifest");
      let routeModule = routeModules[match.route.id];
      return {
        hasLoader: manifestRoute.hasLoader,
        hasClientLoader: manifestRoute.hasClientLoader,
        hasShouldRevalidate: Boolean(_optionalChain([routeModule, 'optionalAccess', _69 => _69.shouldRevalidate]))
      };
    },
    fetchAndDecodeViaTurboStream,
    ssr,
    basename
  );
  return async (args) => args.unstable_runClientMiddleware(dataStrategy);
}
function getSingleFetchDataStrategyImpl(getRouter, getRouteInfo, fetchAndDecode, ssr, basename, shouldAllowOptOut = () => true) {
  return async (args) => {
    let { request, matches, fetcherKey } = args;
    let router = getRouter();
    if (request.method !== "GET") {
      return singleFetchActionStrategy(args, fetchAndDecode, basename);
    }
    let foundRevalidatingServerLoader = matches.some((m) => {
      let { hasLoader, hasClientLoader } = getRouteInfo(m);
      return m.unstable_shouldCallHandler() && hasLoader && !hasClientLoader;
    });
    if (!ssr && !foundRevalidatingServerLoader) {
      return nonSsrStrategy(args, getRouteInfo, fetchAndDecode, basename);
    }
    if (fetcherKey) {
      return singleFetchLoaderFetcherStrategy(args, fetchAndDecode, basename);
    }
    return singleFetchLoaderNavigationStrategy(
      args,
      router,
      getRouteInfo,
      fetchAndDecode,
      ssr,
      basename,
      shouldAllowOptOut
    );
  };
}
async function singleFetchActionStrategy(args, fetchAndDecode, basename) {
  let actionMatch = args.matches.find((m) => m.unstable_shouldCallHandler());
  invariant2(actionMatch, "No action match found");
  let actionStatus = void 0;
  let result = await actionMatch.resolve(async (handler) => {
    let result2 = await handler(async () => {
      let { data: data2, status } = await fetchAndDecode(args, basename, [
        actionMatch.route.id
      ]);
      actionStatus = status;
      return unwrapSingleFetchResult(data2, actionMatch.route.id);
    });
    return result2;
  });
  if (isResponse(result.result) || isRouteErrorResponse(result.result) || isDataWithResponseInit(result.result)) {
    return { [actionMatch.route.id]: result };
  }
  return {
    [actionMatch.route.id]: {
      type: result.type,
      result: data(result.result, actionStatus)
    }
  };
}
async function nonSsrStrategy(args, getRouteInfo, fetchAndDecode, basename) {
  let matchesToLoad = args.matches.filter(
    (m) => m.unstable_shouldCallHandler()
  );
  let results = {};
  await Promise.all(
    matchesToLoad.map(
      (m) => m.resolve(async (handler) => {
        try {
          let { hasClientLoader } = getRouteInfo(m);
          let routeId = m.route.id;
          let result = hasClientLoader ? await handler(async () => {
            let { data: data2 } = await fetchAndDecode(args, basename, [routeId]);
            return unwrapSingleFetchResult(data2, routeId);
          }) : await handler();
          results[m.route.id] = { type: "data", result };
        } catch (e) {
          results[m.route.id] = { type: "error", result: e };
        }
      })
    )
  );
  return results;
}
async function singleFetchLoaderNavigationStrategy(args, router, getRouteInfo, fetchAndDecode, ssr, basename, shouldAllowOptOut = () => true) {
  let routesParams = /* @__PURE__ */ new Set();
  let foundOptOutRoute = false;
  let routeDfds = args.matches.map(() => createDeferred2());
  let singleFetchDfd = createDeferred2();
  let results = {};
  let resolvePromise = Promise.all(
    args.matches.map(
      async (m, i) => m.resolve(async (handler) => {
        routeDfds[i].resolve();
        let routeId = m.route.id;
        let { hasLoader, hasClientLoader, hasShouldRevalidate } = getRouteInfo(m);
        let defaultShouldRevalidate = !m.unstable_shouldRevalidateArgs || m.unstable_shouldRevalidateArgs.actionStatus == null || m.unstable_shouldRevalidateArgs.actionStatus < 400;
        let shouldCall = m.unstable_shouldCallHandler(defaultShouldRevalidate);
        if (!shouldCall) {
          foundOptOutRoute || (foundOptOutRoute = m.unstable_shouldRevalidateArgs != null && // This is a revalidation,
          hasLoader && // for a route with a server loader,
          hasShouldRevalidate === true);
          return;
        }
        if (shouldAllowOptOut(m) && hasClientLoader) {
          if (hasLoader) {
            foundOptOutRoute = true;
          }
          try {
            let result = await handler(async () => {
              let { data: data2 } = await fetchAndDecode(args, basename, [routeId]);
              return unwrapSingleFetchResult(data2, routeId);
            });
            results[routeId] = { type: "data", result };
          } catch (e) {
            results[routeId] = { type: "error", result: e };
          }
          return;
        }
        if (hasLoader) {
          routesParams.add(routeId);
        }
        try {
          let result = await handler(async () => {
            let data2 = await singleFetchDfd.promise;
            return unwrapSingleFetchResult(data2, routeId);
          });
          results[routeId] = { type: "data", result };
        } catch (e) {
          results[routeId] = { type: "error", result: e };
        }
      })
    )
  );
  await Promise.all(routeDfds.map((d) => d.promise));
  let isInitialLoad = !router.state.initialized && router.state.navigation.state === "idle";
  if ((isInitialLoad || routesParams.size === 0) && !window.__reactRouterHdrActive) {
    singleFetchDfd.resolve({ routes: {} });
  } else {
    let targetRoutes = ssr && foundOptOutRoute && routesParams.size > 0 ? [...routesParams.keys()] : void 0;
    try {
      let data2 = await fetchAndDecode(args, basename, targetRoutes);
      singleFetchDfd.resolve(data2.data);
    } catch (e) {
      singleFetchDfd.reject(e);
    }
  }
  await resolvePromise;
  await bubbleMiddlewareErrors(
    singleFetchDfd.promise,
    args.matches,
    routesParams,
    results
  );
  return results;
}
async function bubbleMiddlewareErrors(singleFetchPromise, matches, routesParams, results) {
  try {
    let middlewareError;
    let fetchedData = await singleFetchPromise;
    if ("routes" in fetchedData) {
      for (let match of matches) {
        if (match.route.id in fetchedData.routes) {
          let routeResult = fetchedData.routes[match.route.id];
          if ("error" in routeResult) {
            middlewareError = routeResult.error;
            if (_optionalChain([results, 'access', _70 => _70[match.route.id], 'optionalAccess', _71 => _71.result]) == null) {
              results[match.route.id] = {
                type: "error",
                result: middlewareError
              };
            }
            break;
          }
        }
      }
    }
    if (middlewareError !== void 0) {
      Array.from(routesParams.values()).forEach((routeId) => {
        if (results[routeId].result instanceof SingleFetchNoResultError) {
          results[routeId].result = middlewareError;
        }
      });
    }
  } catch (e) {
  }
}
async function singleFetchLoaderFetcherStrategy(args, fetchAndDecode, basename) {
  let fetcherMatch = args.matches.find((m) => m.unstable_shouldCallHandler());
  invariant2(fetcherMatch, "No fetcher match found");
  let routeId = fetcherMatch.route.id;
  let result = await fetcherMatch.resolve(
    async (handler) => handler(async () => {
      let { data: data2 } = await fetchAndDecode(args, basename, [routeId]);
      return unwrapSingleFetchResult(data2, routeId);
    })
  );
  return { [fetcherMatch.route.id]: result };
}
function stripIndexParam(url) {
  let indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue);
    }
  }
  for (let toKeep of indexValuesToKeep) {
    url.searchParams.append("index", toKeep);
  }
  return url;
}
function singleFetchUrl(reqUrl, basename, extension) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (url.pathname === "/") {
    url.pathname = `_root.${extension}`;
  } else if (basename && stripBasename(url.pathname, basename) === "/") {
    url.pathname = `${basename.replace(/\/$/, "")}/_root.${extension}`;
  } else {
    url.pathname = `${url.pathname.replace(/\/$/, "")}.${extension}`;
  }
  return url;
}
async function fetchAndDecodeViaTurboStream(args, basename, targetRoutes) {
  let { request } = args;
  let url = singleFetchUrl(request.url, basename, "data");
  if (request.method === "GET") {
    url = stripIndexParam(url);
    if (targetRoutes) {
      url.searchParams.set("_routes", targetRoutes.join(","));
    }
  }
  let res = await fetch(url, await createRequestInit(request));
  if (res.status === 404 && !res.headers.has("X-Remix-Response")) {
    throw new ErrorResponseImpl(404, "Not Found", true);
  }
  if (res.status === 204 && res.headers.has("X-Remix-Redirect")) {
    return {
      status: SINGLE_FETCH_REDIRECT_STATUS,
      data: {
        redirect: {
          redirect: res.headers.get("X-Remix-Redirect"),
          status: Number(res.headers.get("X-Remix-Status") || "302"),
          revalidate: res.headers.get("X-Remix-Revalidate") === "true",
          reload: res.headers.get("X-Remix-Reload-Document") === "true",
          replace: res.headers.get("X-Remix-Replace") === "true"
        }
      }
    };
  }
  if (NO_BODY_STATUS_CODES.has(res.status)) {
    let routes = {};
    if (targetRoutes && request.method !== "GET") {
      routes[targetRoutes[0]] = { data: void 0 };
    }
    return {
      status: res.status,
      data: { routes }
    };
  }
  invariant2(res.body, "No response body to decode");
  try {
    let decoded = await decodeViaTurboStream(res.body, window);
    let data2;
    if (request.method === "GET") {
      let typed = decoded.value;
      if (SingleFetchRedirectSymbol in typed) {
        data2 = { redirect: typed[SingleFetchRedirectSymbol] };
      } else {
        data2 = { routes: typed };
      }
    } else {
      let typed = decoded.value;
      let routeId = _optionalChain([targetRoutes, 'optionalAccess', _72 => _72[0]]);
      invariant2(routeId, "No routeId found for single fetch call decoding");
      if ("redirect" in typed) {
        data2 = { redirect: typed };
      } else {
        data2 = { routes: { [routeId]: typed } };
      }
    }
    return { status: res.status, data: data2 };
  } catch (e) {
    throw new Error("Unable to decode turbo-stream response");
  }
}
function decodeViaTurboStream(body, global) {
  return decode(body, {
    plugins: [
      (type, ...rest) => {
        if (type === "SanitizedError") {
          let [name, message, stack] = rest;
          let Constructor = Error;
          if (name && name in global && typeof global[name] === "function") {
            Constructor = global[name];
          }
          let error = new Constructor(message);
          error.stack = stack;
          return { value: error };
        }
        if (type === "ErrorResponse") {
          let [data2, status, statusText] = rest;
          return {
            value: new ErrorResponseImpl(status, statusText, data2)
          };
        }
        if (type === "SingleFetchRedirect") {
          return { value: { [SingleFetchRedirectSymbol]: rest[0] } };
        }
        if (type === "SingleFetchClassInstance") {
          return { value: rest[0] };
        }
        if (type === "SingleFetchFallback") {
          return { value: void 0 };
        }
      }
    ]
  });
}
function unwrapSingleFetchResult(result, routeId) {
  if ("redirect" in result) {
    let {
      redirect: location,
      revalidate,
      reload,
      replace: replace2,
      status
    } = result.redirect;
    throw redirect(location, {
      status,
      headers: {
        // Three R's of redirecting (lol Veep)
        ...revalidate ? { "X-Remix-Revalidate": "yes" } : null,
        ...reload ? { "X-Remix-Reload-Document": "yes" } : null,
        ...replace2 ? { "X-Remix-Replace": "yes" } : null
      }
    });
  }
  let routeResult = result.routes[routeId];
  if (routeResult == null) {
    throw new SingleFetchNoResultError(
      `No result found for routeId "${routeId}"`
    );
  } else if ("error" in routeResult) {
    throw routeResult.error;
  } else if ("data" in routeResult) {
    return routeResult.data;
  } else {
    throw new Error(`Invalid response found for routeId "${routeId}"`);
  }
}
function createDeferred2() {
  let resolve;
  let reject;
  let promise = new Promise((res, rej) => {
    resolve = async (val) => {
      res(val);
      try {
        await promise;
      } catch (e) {
      }
    };
    reject = async (error) => {
      rej(error);
      try {
        await promise;
      } catch (e) {
      }
    };
  });
  return {
    promise,
    //@ts-ignore
    resolve,
    //@ts-ignore
    reject
  };
}

// lib/context.ts

var DataRouterContext = React2.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = React2.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var RSCRouterContext = React2.createContext(false);
function useIsRSCRouterContext() {
  return React2.useContext(RSCRouterContext);
}
var ViewTransitionContext = React2.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = React2.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = React2.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = React2.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = React2.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = React2.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = React2.createContext(null);
RouteErrorContext.displayName = "RouteError";
var ENABLE_DEV_WARNINGS = true;

// lib/hooks.tsx

function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename, navigator } = React3.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to, { relative });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return React3.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return React3.useContext(LocationContext).location;
}
function useNavigationType() {
  return React3.useContext(LocationContext).navigationType;
}
function useMatch(pattern) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useMatch() may be used only in the context of a <Router> component.`
  );
  let { pathname } = useLocation();
  return React3.useMemo(
    () => matchPath(pattern, decodePath(pathname)),
    [pathname, pattern]
  );
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = React3.useContext(NavigationContext).static;
  if (!isStatic) {
    React3.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let { isDataRoute } = React3.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = React3.useContext(DataRouterContext);
  let { basename, navigator } = React3.useContext(NavigationContext);
  let { matches } = React3.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = React3.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React3.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator.go(to);
        return;
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      (!!options.replace ? navigator.replace : navigator.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename,
      navigator,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
var OutletContext = React3.createContext(null);
function useOutletContext() {
  return React3.useContext(OutletContext);
}
function useOutlet(context) {
  let outlet = React3.useContext(RouteContext).outlet;
  if (outlet) {
    return /* @__PURE__ */ React3.createElement(OutletContext.Provider, { value: context }, outlet);
  }
  return outlet;
}
function useParams() {
  let { matches } = React3.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to, { relative } = {}) {
  let { matches } = React3.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return React3.useMemo(
    () => resolveTo(
      to,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator } = React3.useContext(NavigationContext);
  let { matches: parentMatches } = React3.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  if (ENABLE_DEV_WARNINGS) {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    invariant(
      parentPathnameBase === "/" || _optionalChain([parsedLocationArg, 'access', _73 => _73.pathname, 'optionalAccess', _74 => _74.startsWith, 'call', _75 => _75(parentPathnameBase)]),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`
    );
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, { pathname: remainingPathname });
  if (ENABLE_DEV_WARNINGS) {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location.pathname}${location.search}${location.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterState,
    future
  );
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ React3.createElement(
      LocationContext.Provider,
      {
        value: {
          location: {
            pathname: "/",
            search: "",
            hash: "",
            state: null,
            key: "default",
            ...location
          },
          navigationType: "POP" /* Pop */
        }
      },
      renderedMatches
    );
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  if (ENABLE_DEV_WARNINGS) {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error
    );
    devInfo = /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ React3.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ React3.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ React3.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React3.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ React3.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ React3.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends React3.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error(
      "React Router caught the following error during render",
      error,
      errorInfo
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ React3.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ React3.createElement(
      RouteErrorContext.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = React3.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ React3.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterState = null, future = null) {
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = _optionalChain([dataRouterState, 'optionalAccess', _76 => _76.errors]);
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m) => m.route.id && _optionalChain([errors, 'optionalAccess', _77 => _77[m.route.id]]) !== void 0
    );
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState) {
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight(
    (outlet, match, index) => {
      let error;
      let shouldRenderHydrateFallback = false;
      let errorElement = null;
      let hydrateFallbackElement = null;
      if (dataRouterState) {
        error = errors && match.route.id ? errors[match.route.id] : void 0;
        errorElement = match.route.errorElement || defaultErrorElement;
        if (renderFallback) {
          if (fallbackIndex < 0 && index === 0) {
            warningOnce(
              "route-fallback",
              false,
              "No `HydrateFallback` element provided to render during initial hydration"
            );
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = null;
          } else if (fallbackIndex === index) {
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = match.route.hydrateFallbackElement || null;
          }
        }
      }
      let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
      let getChildren = () => {
        let children;
        if (error) {
          children = errorElement;
        } else if (shouldRenderHydrateFallback) {
          children = hydrateFallbackElement;
        } else if (match.route.Component) {
          children = /* @__PURE__ */ React3.createElement(match.route.Component, null);
        } else if (match.route.element) {
          children = match.route.element;
        } else {
          children = outlet;
        }
        return /* @__PURE__ */ React3.createElement(
          RenderedRoute,
          {
            match,
            routeContext: {
              outlet,
              matches: matches2,
              isDataRoute: dataRouterState != null
            },
            children
          }
        );
      };
      return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ React3.createElement(
        RenderErrorBoundary,
        {
          location: dataRouterState.location,
          revalidation: dataRouterState.revalidation,
          component: errorElement,
          error,
          children: getChildren(),
          routeContext: { outlet: null, matches: matches2, isDataRoute: true }
        }
      ) : getChildren();
    },
    null
  );
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = React3.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = React3.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = React3.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId("useRouteId" /* UseRouteId */);
}
function useNavigation() {
  let state = useDataRouterState("useNavigation" /* UseNavigation */);
  return state.navigation;
}
function useRevalidator() {
  let dataRouterContext = useDataRouterContext("useRevalidator" /* UseRevalidator */);
  let state = useDataRouterState("useRevalidator" /* UseRevalidator */);
  let revalidate = React3.useCallback(async () => {
    await dataRouterContext.router.revalidate();
  }, [dataRouterContext.router]);
  return React3.useMemo(
    () => ({ revalidate, state: state.revalidation }),
    [revalidate, state.revalidation]
  );
}
function useMatches() {
  let { matches, loaderData } = useDataRouterState(
    "useMatches" /* UseMatches */
  );
  return React3.useMemo(
    () => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)),
    [matches, loaderData]
  );
}
function useLoaderData() {
  let state = useDataRouterState("useLoaderData" /* UseLoaderData */);
  let routeId = useCurrentRouteId("useLoaderData" /* UseLoaderData */);
  return state.loaderData[routeId];
}
function useRouteLoaderData(routeId) {
  let state = useDataRouterState("useRouteLoaderData" /* UseRouteLoaderData */);
  return state.loaderData[routeId];
}
function useActionData() {
  let state = useDataRouterState("useActionData" /* UseActionData */);
  let routeId = useCurrentRouteId("useLoaderData" /* UseLoaderData */);
  return state.actionData ? state.actionData[routeId] : void 0;
}
function useRouteError() {
  let error = React3.useContext(RouteErrorContext);
  let state = useDataRouterState("useRouteError" /* UseRouteError */);
  let routeId = useCurrentRouteId("useRouteError" /* UseRouteError */);
  if (error !== void 0) {
    return error;
  }
  return _optionalChain([state, 'access', _78 => _78.errors, 'optionalAccess', _79 => _79[routeId]]);
}
function useAsyncValue() {
  let value = React3.useContext(AwaitContext);
  return _optionalChain([value, 'optionalAccess', _80 => _80._data]);
}
function useAsyncError() {
  let value = React3.useContext(AwaitContext);
  return _optionalChain([value, 'optionalAccess', _81 => _81._error]);
}
var blockerId = 0;
function useBlocker(shouldBlock) {
  let { router, basename } = useDataRouterContext("useBlocker" /* UseBlocker */);
  let state = useDataRouterState("useBlocker" /* UseBlocker */);
  let [blockerKey, setBlockerKey] = React3.useState("");
  let blockerFunction = React3.useCallback(
    (arg) => {
      if (typeof shouldBlock !== "function") {
        return !!shouldBlock;
      }
      if (basename === "/") {
        return shouldBlock(arg);
      }
      let { currentLocation, nextLocation, historyAction } = arg;
      return shouldBlock({
        currentLocation: {
          ...currentLocation,
          pathname: stripBasename(currentLocation.pathname, basename) || currentLocation.pathname
        },
        nextLocation: {
          ...nextLocation,
          pathname: stripBasename(nextLocation.pathname, basename) || nextLocation.pathname
        },
        historyAction
      });
    },
    [basename, shouldBlock]
  );
  React3.useEffect(() => {
    let key = String(++blockerId);
    setBlockerKey(key);
    return () => router.deleteBlocker(key);
  }, [router]);
  React3.useEffect(() => {
    if (blockerKey !== "") {
      router.getBlocker(blockerKey, blockerFunction);
    }
  }, [router, blockerKey, blockerFunction]);
  return blockerKey && state.blockers.has(blockerKey) ? state.blockers.get(blockerKey) : IDLE_BLOCKER;
}
function useNavigateStable() {
  let { router } = useDataRouterContext("useNavigate" /* UseNavigateStable */);
  let id = useCurrentRouteId("useNavigate" /* UseNavigateStable */);
  let activeRef = React3.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React3.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        router.navigate(to);
      } else {
        await router.navigate(to, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}

// lib/dom/ssr/errorBoundaries.tsx


// lib/dom/ssr/components.tsx


// lib/dom/ssr/routeModules.ts
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__("./node_modules/react-router/dist/development sync recursive")(route.module)));
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    void 0) {
      throw error;
    }
    window.location.reload();
    return new Promise(() => {
    });
  }
}

// lib/dom/ssr/links.ts
function getKeyedLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    let module = routeModules[match.route.id];
    let route = manifest.routes[match.route.id];
    return [
      route && route.css ? route.css.map((href) => ({ rel: "stylesheet", href })) : [],
      _optionalChain([module, 'optionalAccess', _82 => _82.links, 'optionalCall', _83 => _83()]) || []
    ];
  }).flat(2);
  let preloads = getModuleLinkHrefs(matches, manifest);
  return dedupeLinkDescriptors(descriptors, preloads);
}
function getRouteCssDescriptors(route) {
  if (!route.css) return [];
  return route.css.map((href) => ({ rel: "stylesheet", href }));
}
async function prefetchRouteCss(route) {
  if (!route.css) return;
  let descriptors = getRouteCssDescriptors(route);
  await Promise.all(descriptors.map(prefetchStyleLink));
}
async function prefetchStyleLinks(route, routeModule) {
  if (!route.css && !routeModule.links || !isPreloadSupported()) return;
  let descriptors = [];
  if (route.css) {
    descriptors.push(...getRouteCssDescriptors(route));
  }
  if (routeModule.links) {
    descriptors.push(...routeModule.links());
  }
  if (descriptors.length === 0) return;
  let styleLinks = [];
  for (let descriptor of descriptors) {
    if (!isPageLinkDescriptor(descriptor) && descriptor.rel === "stylesheet") {
      styleLinks.push({
        ...descriptor,
        rel: "preload",
        as: "style"
      });
    }
  }
  await Promise.all(styleLinks.map(prefetchStyleLink));
}
async function prefetchStyleLink(descriptor) {
  return new Promise((resolve) => {
    if (descriptor.media && !window.matchMedia(descriptor.media).matches || document.querySelector(
      `link[rel="stylesheet"][href="${descriptor.href}"]`
    )) {
      return resolve();
    }
    let link = document.createElement("link");
    Object.assign(link, descriptor);
    function removeLink() {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    }
    link.onload = () => {
      removeLink();
      resolve();
    };
    link.onerror = () => {
      removeLink();
      resolve();
    };
    document.head.appendChild(link);
  });
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page === "string";
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      _optionalChain([currentMatches, 'access', _84 => _84[index], 'access', _85 => _85.route, 'access', _86 => _86.path, 'optionalAccess', _87 => _87.endsWith, 'call', _88 => _88("*")]) && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location.pathname + location.search + location.hash,
            window.origin
          ),
          currentParams: _optionalChain([currentMatches, 'access', _89 => _89[0], 'optionalAccess', _90 => _90.params]) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifest.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.clientActionModule) {
        hrefs = hrefs.concat(route.clientActionModule);
      }
      if (route.clientLoaderModule) {
        hrefs = hrefs.concat(route.clientLoaderModule);
      }
      if (includeHydrateFallback && route.hydrateFallbackModule) {
        hrefs = hrefs.concat(route.hydrateFallbackModule);
      }
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  let preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let alreadyModulePreload = preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
    if (alreadyModulePreload) {
      return deduped;
    }
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
var _isPreloadSupported;
function isPreloadSupported() {
  if (_isPreloadSupported !== void 0) {
    return _isPreloadSupported;
  }
  let el = document.createElement("link");
  _isPreloadSupported = el.relList.supports("preload");
  el = null;
  return _isPreloadSupported;
}

// lib/server-runtime/warnings.ts
var alreadyWarned2 = {};
function warnOnce(condition, message) {
  if (!condition && !alreadyWarned2[message]) {
    alreadyWarned2[message] = true;
    console.warn(message);
  }
}

// lib/dom/ssr/fog-of-war.ts


// lib/dom/ssr/routes.tsx


// lib/dom/ssr/fallback.tsx

function RemixRootDefaultHydrateFallback() {
  return /* @__PURE__ */ React4.createElement(BoundaryShell, { title: "Loading...", renderScripts: true }, ENABLE_DEV_WARNINGS ? /* @__PURE__ */ React4.createElement(
    "script",
    {
      dangerouslySetInnerHTML: {
        __html: `
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://reactrouter.com/start/framework/route-module#hydratefallback " +
                "for more information."
              );
            `
      }
    }
  ) : null);
}

// lib/dom/ssr/routes.tsx
function groupRoutesByParentId(manifest) {
  let routes = {};
  Object.values(manifest).forEach((route) => {
    if (route) {
      let parentId = route.parentId || "";
      if (!routes[parentId]) {
        routes[parentId] = [];
      }
      routes[parentId].push(route);
    }
  });
  return routes;
}
function getRouteComponents(route, routeModule, isSpaMode) {
  let Component3 = getRouteModuleComponent(routeModule);
  let HydrateFallback = routeModule.HydrateFallback && (!isSpaMode || route.id === "root") ? routeModule.HydrateFallback : route.id === "root" ? RemixRootDefaultHydrateFallback : void 0;
  let ErrorBoundary = routeModule.ErrorBoundary ? routeModule.ErrorBoundary : route.id === "root" ? () => /* @__PURE__ */ React5.createElement(RemixRootDefaultErrorBoundary, { error: useRouteError() }) : void 0;
  if (route.id === "root" && routeModule.Layout) {
    return {
      ...Component3 ? {
        element: /* @__PURE__ */ React5.createElement(routeModule.Layout, null, /* @__PURE__ */ React5.createElement(Component3, null))
      } : { Component: Component3 },
      ...ErrorBoundary ? {
        errorElement: /* @__PURE__ */ React5.createElement(routeModule.Layout, null, /* @__PURE__ */ React5.createElement(ErrorBoundary, null))
      } : { ErrorBoundary },
      ...HydrateFallback ? {
        hydrateFallbackElement: /* @__PURE__ */ React5.createElement(routeModule.Layout, null, /* @__PURE__ */ React5.createElement(HydrateFallback, null))
      } : { HydrateFallback }
    };
  }
  return { Component: Component3, ErrorBoundary, HydrateFallback };
}
function createServerRoutes(manifest, routeModules, future, isSpaMode, parentId = "", routesByParentId = groupRoutesByParentId(manifest), spaModeLazyPromise = Promise.resolve({ Component: () => null })) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModules[route.id];
    invariant2(
      routeModule,
      "No `routeModule` available to create server routes"
    );
    let dataRoute = {
      ...getRouteComponents(route, routeModule, isSpaMode),
      caseSensitive: route.caseSensitive,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModule.handle,
      // For SPA Mode, all routes are lazy except root.  However we tell the
      // router root is also lazy here too since we don't need a full
      // implementation - we just need a `lazy` prop to tell the RR rendering
      // where to stop which is always at the root route in SPA mode
      lazy: isSpaMode ? () => spaModeLazyPromise : void 0,
      // For partial hydration rendering, we need to indicate when the route
      // has a loader/clientLoader, but it won't ever be called during the static
      // render, so just give it a no-op function so we can render down to the
      // proper fallback
      loader: route.hasLoader || route.hasClientLoader ? () => null : void 0
      // We don't need middleware/action/shouldRevalidate on these routes since
      // they're for a static render
    };
    let children = createServerRoutes(
      manifest,
      routeModules,
      future,
      isSpaMode,
      route.id,
      routesByParentId,
      spaModeLazyPromise
    );
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function createClientRoutesWithHMRRevalidationOptOut(needsRevalidation, manifest, routeModulesCache, initialState, ssr, isSpaMode) {
  return createClientRoutes(
    manifest,
    routeModulesCache,
    initialState,
    ssr,
    isSpaMode,
    "",
    groupRoutesByParentId(manifest),
    needsRevalidation
  );
}
function preventInvalidServerHandlerCall(type, route) {
  if (type === "loader" && !route.hasLoader || type === "action" && !route.hasAction) {
    let fn = type === "action" ? "serverAction()" : "serverLoader()";
    let msg = `You are trying to call ${fn} on a route that does not have a server ${type} (routeId: "${route.id}")`;
    console.error(msg);
    throw new ErrorResponseImpl(400, "Bad Request", new Error(msg), true);
  }
}
function noActionDefinedError(type, routeId) {
  let article = type === "clientAction" ? "a" : "an";
  let msg = `Route "${routeId}" does not have ${article} ${type}, but you are trying to submit to it. To fix this, please add ${article} \`${type}\` function to the route`;
  console.error(msg);
  throw new ErrorResponseImpl(405, "Method Not Allowed", new Error(msg), true);
}
function createClientRoutes(manifest, routeModulesCache, initialState, ssr, isSpaMode, parentId = "", routesByParentId = groupRoutesByParentId(manifest), needsRevalidation) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModulesCache[route.id];
    function fetchServerHandler(singleFetch) {
      invariant2(
        typeof singleFetch === "function",
        "No single fetch function available for route handler"
      );
      return singleFetch();
    }
    function fetchServerLoader(singleFetch) {
      if (!route.hasLoader) return Promise.resolve(null);
      return fetchServerHandler(singleFetch);
    }
    function fetchServerAction(singleFetch) {
      if (!route.hasAction) {
        throw noActionDefinedError("action", route.id);
      }
      return fetchServerHandler(singleFetch);
    }
    function prefetchModule(modulePath) {
      Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__("./node_modules/react-router/dist/development sync recursive")(modulePath)));
    }
    function prefetchRouteModuleChunks(route2) {
      if (route2.clientActionModule) {
        prefetchModule(route2.clientActionModule);
      }
      if (route2.clientLoaderModule) {
        prefetchModule(route2.clientLoaderModule);
      }
    }
    async function prefetchStylesAndCallHandler(handler) {
      let cachedModule = routeModulesCache[route.id];
      let linkPrefetchPromise = cachedModule ? prefetchStyleLinks(route, cachedModule) : Promise.resolve();
      try {
        return handler();
      } finally {
        await linkPrefetchPromise;
      }
    }
    let dataRoute = {
      id: route.id,
      index: route.index,
      path: route.path
    };
    if (routeModule) {
      Object.assign(dataRoute, {
        ...dataRoute,
        ...getRouteComponents(route, routeModule, isSpaMode),
        unstable_middleware: routeModule.unstable_clientMiddleware,
        handle: routeModule.handle,
        shouldRevalidate: getShouldRevalidateFunction(
          dataRoute.path,
          routeModule,
          route,
          ssr,
          needsRevalidation
        )
      });
      let hasInitialData = initialState && initialState.loaderData && route.id in initialState.loaderData;
      let initialData = hasInitialData ? _optionalChain([initialState, 'optionalAccess', _91 => _91.loaderData, 'optionalAccess', _92 => _92[route.id]]) : void 0;
      let hasInitialError = initialState && initialState.errors && route.id in initialState.errors;
      let initialError = hasInitialError ? _optionalChain([initialState, 'optionalAccess', _93 => _93.errors, 'optionalAccess', _94 => _94[route.id]]) : void 0;
      let isHydrationRequest = needsRevalidation == null && (_optionalChain([routeModule, 'access', _95 => _95.clientLoader, 'optionalAccess', _96 => _96.hydrate]) === true || !route.hasLoader);
      dataRoute.loader = async ({ request, params, context }, singleFetch) => {
        try {
          let result = await prefetchStylesAndCallHandler(async () => {
            invariant2(
              routeModule,
              "No `routeModule` available for critical-route loader"
            );
            if (!routeModule.clientLoader) {
              return fetchServerLoader(singleFetch);
            }
            return routeModule.clientLoader({
              request,
              params,
              context,
              async serverLoader() {
                preventInvalidServerHandlerCall("loader", route);
                if (isHydrationRequest) {
                  if (hasInitialData) {
                    return initialData;
                  }
                  if (hasInitialError) {
                    throw initialError;
                  }
                }
                return fetchServerLoader(singleFetch);
              }
            });
          });
          return result;
        } finally {
          isHydrationRequest = false;
        }
      };
      dataRoute.loader.hydrate = shouldHydrateRouteLoader(
        route.id,
        routeModule.clientLoader,
        route.hasLoader,
        isSpaMode
      );
      dataRoute.action = ({ request, params, context }, singleFetch) => {
        return prefetchStylesAndCallHandler(async () => {
          invariant2(
            routeModule,
            "No `routeModule` available for critical-route action"
          );
          if (!routeModule.clientAction) {
            if (isSpaMode) {
              throw noActionDefinedError("clientAction", route.id);
            }
            return fetchServerAction(singleFetch);
          }
          return routeModule.clientAction({
            request,
            params,
            context,
            async serverAction() {
              preventInvalidServerHandlerCall("action", route);
              return fetchServerAction(singleFetch);
            }
          });
        });
      };
    } else {
      if (!route.hasClientLoader) {
        dataRoute.loader = (_, singleFetch) => prefetchStylesAndCallHandler(() => {
          return fetchServerLoader(singleFetch);
        });
      }
      if (!route.hasClientAction) {
        dataRoute.action = (_, singleFetch) => prefetchStylesAndCallHandler(() => {
          if (isSpaMode) {
            throw noActionDefinedError("clientAction", route.id);
          }
          return fetchServerAction(singleFetch);
        });
      }
      let lazyRoutePromise;
      async function getLazyRoute() {
        if (lazyRoutePromise) {
          return await lazyRoutePromise;
        }
        lazyRoutePromise = (async () => {
          if (route.clientLoaderModule || route.clientActionModule) {
            await new Promise((resolve) => setTimeout(resolve, 0));
          }
          let routeModulePromise = loadRouteModuleWithBlockingLinks(
            route,
            routeModulesCache
          );
          prefetchRouteModuleChunks(route);
          return await routeModulePromise;
        })();
        return await lazyRoutePromise;
      }
      dataRoute.lazy = {
        loader: route.hasClientLoader ? async () => {
          let { clientLoader } = route.clientLoaderModule ? await Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__("./node_modules/react-router/dist/development sync recursive")(route.clientLoaderModule))) : await getLazyRoute();
          invariant2(clientLoader, "No `clientLoader` export found");
          return (args, singleFetch) => clientLoader({
            ...args,
            async serverLoader() {
              preventInvalidServerHandlerCall("loader", route);
              return fetchServerLoader(singleFetch);
            }
          });
        } : void 0,
        action: route.hasClientAction ? async () => {
          let clientActionPromise = route.clientActionModule ? Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__("./node_modules/react-router/dist/development sync recursive")(route.clientActionModule))) : getLazyRoute();
          prefetchRouteModuleChunks(route);
          let { clientAction } = await clientActionPromise;
          invariant2(clientAction, "No `clientAction` export found");
          return (args, singleFetch) => clientAction({
            ...args,
            async serverAction() {
              preventInvalidServerHandlerCall("action", route);
              return fetchServerAction(singleFetch);
            }
          });
        } : void 0,
        unstable_middleware: route.hasClientMiddleware ? async () => {
          let { unstable_clientMiddleware } = route.clientMiddlewareModule ? await Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__("./node_modules/react-router/dist/development sync recursive")(route.clientMiddlewareModule))) : await getLazyRoute();
          invariant2(
            unstable_clientMiddleware,
            "No `unstable_clientMiddleware` export found"
          );
          return unstable_clientMiddleware;
        } : void 0,
        shouldRevalidate: async () => {
          let lazyRoute = await getLazyRoute();
          return getShouldRevalidateFunction(
            dataRoute.path,
            lazyRoute,
            route,
            ssr,
            needsRevalidation
          );
        },
        handle: async () => (await getLazyRoute()).handle,
        // No need to wrap these in layout since the root route is never
        // loaded via route.lazy()
        Component: async () => (await getLazyRoute()).Component,
        ErrorBoundary: route.hasErrorBoundary ? async () => (await getLazyRoute()).ErrorBoundary : void 0
      };
    }
    let children = createClientRoutes(
      manifest,
      routeModulesCache,
      initialState,
      ssr,
      isSpaMode,
      route.id,
      routesByParentId,
      needsRevalidation
    );
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function getShouldRevalidateFunction(path, route, manifestRoute, ssr, needsRevalidation) {
  if (needsRevalidation) {
    return wrapShouldRevalidateForHdr(
      manifestRoute.id,
      route.shouldRevalidate,
      needsRevalidation
    );
  }
  if (!ssr && manifestRoute.hasLoader && !manifestRoute.hasClientLoader) {
    let myParams = path ? compilePath(path)[1].map((p) => p.paramName) : [];
    const didParamsChange = (opts) => myParams.some((p) => opts.currentParams[p] !== opts.nextParams[p]);
    if (route.shouldRevalidate) {
      let fn = route.shouldRevalidate;
      return (opts) => fn({
        ...opts,
        defaultShouldRevalidate: didParamsChange(opts)
      });
    } else {
      return (opts) => didParamsChange(opts);
    }
  }
  if (ssr && route.shouldRevalidate) {
    let fn = route.shouldRevalidate;
    return (opts) => fn({ ...opts, defaultShouldRevalidate: true });
  }
  return route.shouldRevalidate;
}
function wrapShouldRevalidateForHdr(routeId, routeShouldRevalidate, needsRevalidation) {
  let handledRevalidation = false;
  return (arg) => {
    if (!handledRevalidation) {
      handledRevalidation = true;
      return needsRevalidation.has(routeId);
    }
    return routeShouldRevalidate ? routeShouldRevalidate(arg) : arg.defaultShouldRevalidate;
  };
}
async function loadRouteModuleWithBlockingLinks(route, routeModules) {
  let routeModulePromise = loadRouteModule(route, routeModules);
  let prefetchRouteCssPromise = prefetchRouteCss(route);
  let routeModule = await routeModulePromise;
  await Promise.all([
    prefetchRouteCssPromise,
    prefetchStyleLinks(route, routeModule)
  ]);
  return {
    Component: getRouteModuleComponent(routeModule),
    ErrorBoundary: routeModule.ErrorBoundary,
    unstable_clientMiddleware: routeModule.unstable_clientMiddleware,
    clientAction: routeModule.clientAction,
    clientLoader: routeModule.clientLoader,
    handle: routeModule.handle,
    links: routeModule.links,
    meta: routeModule.meta,
    shouldRevalidate: routeModule.shouldRevalidate
  };
}
function getRouteModuleComponent(routeModule) {
  if (routeModule.default == null) return void 0;
  let isEmptyObject = typeof routeModule.default === "object" && Object.keys(routeModule.default).length === 0;
  if (!isEmptyObject) {
    return routeModule.default;
  }
}
function shouldHydrateRouteLoader(routeId, clientLoader, hasLoader, isSpaMode) {
  return isSpaMode && routeId !== "root" || clientLoader != null && (clientLoader.hydrate === true || hasLoader !== true);
}

// lib/dom/ssr/fog-of-war.ts
var nextPaths = /* @__PURE__ */ new Set();
var discoveredPathsMaxSize = 1e3;
var discoveredPaths = /* @__PURE__ */ new Set();
var URL_LIMIT = 7680;
function isFogOfWarEnabled(routeDiscovery, ssr) {
  return routeDiscovery.mode === "lazy" && ssr === true;
}
function getPartialManifest({ sri, ...manifest }, router) {
  let routeIds = new Set(router.state.matches.map((m) => m.route.id));
  let segments = router.state.location.pathname.split("/").filter(Boolean);
  let paths = ["/"];
  segments.pop();
  while (segments.length > 0) {
    paths.push(`/${segments.join("/")}`);
    segments.pop();
  }
  paths.forEach((path) => {
    let matches = matchRoutes(router.routes, path, router.basename);
    if (matches) {
      matches.forEach((m) => routeIds.add(m.route.id));
    }
  });
  let initialRoutes = [...routeIds].reduce(
    (acc, id) => Object.assign(acc, { [id]: manifest.routes[id] }),
    {}
  );
  return {
    ...manifest,
    routes: initialRoutes,
    sri: sri ? true : void 0
  };
}
function getPatchRoutesOnNavigationFunction(manifest, routeModules, ssr, routeDiscovery, isSpaMode, basename) {
  if (!isFogOfWarEnabled(routeDiscovery, ssr)) {
    return void 0;
  }
  return async ({ path, patch, signal, fetcherKey }) => {
    if (discoveredPaths.has(path)) {
      return;
    }
    await fetchAndApplyManifestPatches(
      [path],
      fetcherKey ? window.location.href : path,
      manifest,
      routeModules,
      ssr,
      isSpaMode,
      basename,
      routeDiscovery.manifestPath,
      patch,
      signal
    );
  };
}
function useFogOFWarDiscovery(router, manifest, routeModules, ssr, routeDiscovery, isSpaMode) {
  React6.useEffect(() => {
    if (!isFogOfWarEnabled(routeDiscovery, ssr) || // @ts-expect-error - TS doesn't know about this yet
    _optionalChain([window, 'access', _97 => _97.navigator, 'optionalAccess', _98 => _98.connection, 'optionalAccess', _99 => _99.saveData]) === true) {
      return;
    }
    function registerElement(el) {
      let path = el.tagName === "FORM" ? el.getAttribute("action") : el.getAttribute("href");
      if (!path) {
        return;
      }
      let pathname = el.tagName === "A" ? el.pathname : new URL(path, window.location.origin).pathname;
      if (!discoveredPaths.has(pathname)) {
        nextPaths.add(pathname);
      }
    }
    async function fetchPatches() {
      document.querySelectorAll("a[data-discover], form[data-discover]").forEach(registerElement);
      let lazyPaths = Array.from(nextPaths.keys()).filter((path) => {
        if (discoveredPaths.has(path)) {
          nextPaths.delete(path);
          return false;
        }
        return true;
      });
      if (lazyPaths.length === 0) {
        return;
      }
      try {
        await fetchAndApplyManifestPatches(
          lazyPaths,
          null,
          manifest,
          routeModules,
          ssr,
          isSpaMode,
          router.basename,
          routeDiscovery.manifestPath,
          router.patchRoutes
        );
      } catch (e) {
        console.error("Failed to fetch manifest patches", e);
      }
    }
    let debouncedFetchPatches = debounce(fetchPatches, 100);
    fetchPatches();
    let observer = new MutationObserver(() => debouncedFetchPatches());
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-discover", "href", "action"]
    });
    return () => observer.disconnect();
  }, [ssr, isSpaMode, manifest, routeModules, router, routeDiscovery]);
}
function getManifestPath(_manifestPath, basename) {
  let manifestPath = _manifestPath || "/__manifest";
  if (basename == null) {
    return manifestPath;
  }
  return `${basename}${manifestPath}`.replace(/\/+/g, "/");
}
var MANIFEST_VERSION_STORAGE_KEY = "react-router-manifest-version";
async function fetchAndApplyManifestPatches(paths, errorReloadPath, manifest, routeModules, ssr, isSpaMode, basename, manifestPath, patchRoutes, signal) {
  const searchParams = new URLSearchParams();
  paths.sort().forEach((path) => searchParams.append("p", path));
  searchParams.set("version", manifest.version);
  let url = new URL(
    getManifestPath(manifestPath, basename),
    window.location.origin
  );
  url.search = searchParams.toString();
  if (url.toString().length > URL_LIMIT) {
    nextPaths.clear();
    return;
  }
  let serverPatches;
  try {
    let res = await fetch(url, { signal });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    } else if (res.status === 204 && res.headers.has("X-Remix-Reload-Document")) {
      if (!errorReloadPath) {
        console.warn(
          "Detected a manifest version mismatch during eager route discovery. The next navigation/fetch to an undiscovered route will result in a new document navigation to sync up with the latest manifest."
        );
        return;
      }
      if (sessionStorage.getItem(MANIFEST_VERSION_STORAGE_KEY) === manifest.version) {
        console.error(
          "Unable to discover routes due to manifest version mismatch."
        );
        return;
      }
      sessionStorage.setItem(MANIFEST_VERSION_STORAGE_KEY, manifest.version);
      window.location.href = errorReloadPath;
      console.warn("Detected manifest version mismatch, reloading...");
      await new Promise(() => {
      });
    } else if (res.status >= 400) {
      throw new Error(await res.text());
    }
    sessionStorage.removeItem(MANIFEST_VERSION_STORAGE_KEY);
    serverPatches = await res.json();
  } catch (e) {
    if (_optionalChain([signal, 'optionalAccess', _100 => _100.aborted])) return;
    throw e;
  }
  let knownRoutes = new Set(Object.keys(manifest.routes));
  let patches = Object.values(serverPatches).reduce((acc, route) => {
    if (route && !knownRoutes.has(route.id)) {
      acc[route.id] = route;
    }
    return acc;
  }, {});
  Object.assign(manifest.routes, patches);
  paths.forEach((p) => addToFifoQueue(p, discoveredPaths));
  let parentIds = /* @__PURE__ */ new Set();
  Object.values(patches).forEach((patch) => {
    if (patch && (!patch.parentId || !patches[patch.parentId])) {
      parentIds.add(patch.parentId);
    }
  });
  parentIds.forEach(
    (parentId) => patchRoutes(
      parentId || null,
      createClientRoutes(patches, routeModules, null, ssr, isSpaMode, parentId)
    )
  );
}
function addToFifoQueue(path, queue) {
  if (queue.size >= discoveredPathsMaxSize) {
    let first = queue.values().next().value;
    queue.delete(first);
  }
  queue.add(path);
}
function debounce(callback, wait) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), wait);
  };
}

// lib/dom/ssr/components.tsx
function useDataRouterContext2() {
  let context = React7.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = React7.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = React7.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = React7.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = React7.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = React7.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = React7.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = React7.useRef(null);
  React7.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  React7.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function getActiveMatches(matches, errors, isSpaMode) {
  if (isSpaMode && !isHydrated) {
    return [matches[0]];
  }
  if (errors) {
    let errorIdx = matches.findIndex((m) => errors[m.route.id] !== void 0);
    return matches.slice(0, errorIdx + 1);
  }
  return matches;
}
var CRITICAL_CSS_DATA_ATTRIBUTE = "data-react-router-critical-css";
function Links({ nonce }) {
  let { isSpaMode, manifest, routeModules, criticalCss } = useFrameworkContext();
  let { errors, matches: routerMatches } = useDataRouterStateContext();
  let matches = getActiveMatches(routerMatches, errors, isSpaMode);
  let keyedLinks = React7.useMemo(
    () => getKeyedLinksForMatches(matches, routeModules, manifest),
    [matches, routeModules, manifest]
  );
  return /* @__PURE__ */ React7.createElement(React7.Fragment, null, typeof criticalCss === "string" ? /* @__PURE__ */ React7.createElement(
    "style",
    {
      ...{ [CRITICAL_CSS_DATA_ATTRIBUTE]: "" },
      dangerouslySetInnerHTML: { __html: criticalCss }
    }
  ) : null, typeof criticalCss === "object" ? /* @__PURE__ */ React7.createElement(
    "link",
    {
      ...{ [CRITICAL_CSS_DATA_ATTRIBUTE]: "" },
      rel: "stylesheet",
      href: criticalCss.href,
      nonce
    }
  ) : null, keyedLinks.map(
    ({ key, link }) => isPageLinkDescriptor(link) ? /* @__PURE__ */ React7.createElement(PrefetchPageLinks, { key, nonce, ...link }) : /* @__PURE__ */ React7.createElement("link", { key, nonce, ...link })
  ));
}
function PrefetchPageLinks({ page, ...linkProps }) {
  let { router } = useDataRouterContext2();
  let matches = React7.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename]
  );
  if (!matches) {
    return null;
  }
  return /* @__PURE__ */ React7.createElement(PrefetchPageLinksImpl, { page, matches, ...linkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = React7.useState([]);
  React7.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { manifest, routeModules } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = React7.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "data"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let newMatchesForAssets = React7.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let dataHrefs = React7.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m) => {
      let manifestRoute = manifest.routes[m.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && _optionalChain([routeModules, 'access', _101 => _101[m.route.id], 'optionalAccess', _102 => _102.shouldRevalidate])) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(page, basename, "data");
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    basename,
    loaderData,
    location,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = React7.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ React7.createElement(React7.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React7.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ React7.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ React7.createElement("link", { key, nonce: linkProps.nonce, ...link })
  )));
}
function Meta() {
  let { isSpaMode, routeModules } = useFrameworkContext();
  let {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext();
  let location = useLocation();
  let _matches = getActiveMatches(routerMatches, errors, isSpaMode);
  let error = null;
  if (errors) {
    error = errors[_matches[_matches.length - 1].route.id];
  }
  let meta = [];
  let leafMeta = null;
  let matches = [];
  for (let i = 0; i < _matches.length; i++) {
    let _match = _matches[i];
    let routeId = _match.route.id;
    let data2 = loaderData[routeId];
    let params = _match.params;
    let routeModule = routeModules[routeId];
    let routeMeta = [];
    let match = {
      id: routeId,
      data: data2,
      loaderData: data2,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      error
    };
    matches[i] = match;
    if (_optionalChain([routeModule, 'optionalAccess', _103 => _103.meta])) {
      routeMeta = typeof routeModule.meta === "function" ? routeModule.meta({
        data: data2,
        loaderData: data2,
        params,
        location,
        matches,
        error
      }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta;
    } else if (leafMeta) {
      routeMeta = [...leafMeta];
    }
    routeMeta = routeMeta || [];
    if (!Array.isArray(routeMeta)) {
      throw new Error(
        "The route at " + _match.route.path + " returns an invalid value. All route meta functions must return an array of meta objects.\n\nTo reference the meta function API, see https://remix.run/route/meta"
      );
    }
    match.meta = routeMeta;
    matches[i] = match;
    meta = [...routeMeta];
    leafMeta = meta;
  }
  return /* @__PURE__ */ React7.createElement(React7.Fragment, null, meta.flat().map((metaProps) => {
    if (!metaProps) {
      return null;
    }
    if ("tagName" in metaProps) {
      let { tagName, ...rest } = metaProps;
      if (!isValidMetaTag(tagName)) {
        console.warn(
          `A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`
        );
        return null;
      }
      let Comp = tagName;
      return /* @__PURE__ */ React7.createElement(Comp, { key: JSON.stringify(rest), ...rest });
    }
    if ("title" in metaProps) {
      return /* @__PURE__ */ React7.createElement("title", { key: "title" }, String(metaProps.title));
    }
    if ("charset" in metaProps) {
      _nullishCoalesce(metaProps.charSet, () => ( (metaProps.charSet = metaProps.charset)));
      delete metaProps.charset;
    }
    if ("charSet" in metaProps && metaProps.charSet != null) {
      return typeof metaProps.charSet === "string" ? /* @__PURE__ */ React7.createElement("meta", { key: "charSet", charSet: metaProps.charSet }) : null;
    }
    if ("script:ld+json" in metaProps) {
      try {
        let json = JSON.stringify(metaProps["script:ld+json"]);
        return /* @__PURE__ */ React7.createElement(
          "script",
          {
            key: `script:ld+json:${json}`,
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: json }
          }
        );
      } catch (err) {
        return null;
      }
    }
    return /* @__PURE__ */ React7.createElement("meta", { key: JSON.stringify(metaProps), ...metaProps });
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName === "string" && /^(meta|link)$/.test(tagName);
}
var isHydrated = false;
function Scripts(scriptProps) {
  let {
    manifest,
    serverHandoffString,
    isSpaMode,
    renderMeta,
    routeDiscovery,
    ssr
  } = useFrameworkContext();
  let { router, static: isStatic, staticContext } = useDataRouterContext2();
  let { matches: routerMatches } = useDataRouterStateContext();
  let isRSCRouterContext = useIsRSCRouterContext();
  let enableFogOfWar = isFogOfWarEnabled(routeDiscovery, ssr);
  if (renderMeta) {
    renderMeta.didRenderScripts = true;
  }
  let matches = getActiveMatches(routerMatches, null, isSpaMode);
  React7.useEffect(() => {
    isHydrated = true;
  }, []);
  let initialScripts = React7.useMemo(() => {
    if (isRSCRouterContext) {
      return null;
    }
    let streamScript = "window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());";
    let contextScript = staticContext ? `window.__reactRouterContext = ${serverHandoffString};${streamScript}` : " ";
    let routeModulesScript = !isStatic ? " " : `${_optionalChain([manifest, 'access', _104 => _104.hmr, 'optionalAccess', _105 => _105.runtime]) ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}${!enableFogOfWar ? `import ${JSON.stringify(manifest.url)}` : ""};
${matches.map((match, routeIndex) => {
      let routeVarName = `route${routeIndex}`;
      let manifestEntry = manifest.routes[match.route.id];
      invariant2(manifestEntry, `Route ${match.route.id} not found in manifest`);
      let {
        clientActionModule,
        clientLoaderModule,
        clientMiddlewareModule,
        hydrateFallbackModule,
        module
      } = manifestEntry;
      let chunks = [
        ...clientActionModule ? [
          {
            module: clientActionModule,
            varName: `${routeVarName}_clientAction`
          }
        ] : [],
        ...clientLoaderModule ? [
          {
            module: clientLoaderModule,
            varName: `${routeVarName}_clientLoader`
          }
        ] : [],
        ...clientMiddlewareModule ? [
          {
            module: clientMiddlewareModule,
            varName: `${routeVarName}_clientMiddleware`
          }
        ] : [],
        ...hydrateFallbackModule ? [
          {
            module: hydrateFallbackModule,
            varName: `${routeVarName}_HydrateFallback`
          }
        ] : [],
        { module, varName: `${routeVarName}_main` }
      ];
      if (chunks.length === 1) {
        return `import * as ${routeVarName} from ${JSON.stringify(module)};`;
      }
      let chunkImportsSnippet = chunks.map((chunk) => `import * as ${chunk.varName} from "${chunk.module}";`).join("\n");
      let mergedChunksSnippet = `const ${routeVarName} = {${chunks.map((chunk) => `...${chunk.varName}`).join(",")}};`;
      return [chunkImportsSnippet, mergedChunksSnippet].join("\n");
    }).join("\n")}
  ${enableFogOfWar ? (
      // Inline a minimal manifest with the SSR matches
      `window.__reactRouterManifest = ${JSON.stringify(
        getPartialManifest(manifest, router),
        null,
        2
      )};`
    ) : ""}
  window.__reactRouterRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});`;
    return /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement(
      "script",
      {
        ...scriptProps,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: createHtml(contextScript),
        type: void 0
      }
    ), /* @__PURE__ */ React7.createElement(
      "script",
      {
        ...scriptProps,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: createHtml(routeModulesScript),
        type: "module",
        async: true
      }
    ));
  }, []);
  let preloads = isHydrated || isRSCRouterContext ? [] : dedupe(
    manifest.entry.imports.concat(
      getModuleLinkHrefs(matches, manifest, {
        includeHydrateFallback: true
      })
    )
  );
  let sri = typeof manifest.sri === "object" ? manifest.sri : {};
  warnOnce(
    !isRSCRouterContext,
    "The <Scripts /> element is a no-op when using RSC and can be safely removed."
  );
  return isHydrated || isRSCRouterContext ? null : /* @__PURE__ */ React7.createElement(React7.Fragment, null, typeof manifest.sri === "object" ? /* @__PURE__ */ React7.createElement(
    "script",
    {
      "rr-importmap": "",
      type: "importmap",
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: JSON.stringify({
          integrity: sri
        })
      }
    }
  ) : null, !enableFogOfWar ? /* @__PURE__ */ React7.createElement(
    "link",
    {
      rel: "modulepreload",
      href: manifest.url,
      crossOrigin: scriptProps.crossOrigin,
      integrity: sri[manifest.url],
      suppressHydrationWarning: true
    }
  ) : null, /* @__PURE__ */ React7.createElement(
    "link",
    {
      rel: "modulepreload",
      href: manifest.entry.module,
      crossOrigin: scriptProps.crossOrigin,
      integrity: sri[manifest.entry.module],
      suppressHydrationWarning: true
    }
  ), preloads.map((path) => /* @__PURE__ */ React7.createElement(
    "link",
    {
      key: path,
      rel: "modulepreload",
      href: path,
      crossOrigin: scriptProps.crossOrigin,
      integrity: sri[path],
      suppressHydrationWarning: true
    }
  )), initialScripts);
}
function dedupe(array) {
  return [...new Set(array)];
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

// lib/dom/ssr/errorBoundaries.tsx
var RemixErrorBoundary = class extends React8.Component {
  constructor(props) {
    super(props);
    this.state = { error: props.error || null, location: props.location };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return { error: props.error || null, location: props.location };
    }
    return { error: props.error || state.error, location: state.location };
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ React8.createElement(
        RemixRootDefaultErrorBoundary,
        {
          error: this.state.error,
          isOutsideRemixApp: true
        }
      );
    } else {
      return this.props.children;
    }
  }
};
function RemixRootDefaultErrorBoundary({
  error,
  isOutsideRemixApp
}) {
  console.error(error);
  let heyDeveloper = /* @__PURE__ */ React8.createElement(
    "script",
    {
      dangerouslySetInnerHTML: {
        __html: `
        console.log(
          "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."
        );
      `
      }
    }
  );
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ React8.createElement(BoundaryShell, { title: "Unhandled Thrown Response!" }, /* @__PURE__ */ React8.createElement("h1", { style: { fontSize: "24px" } }, error.status, " ", error.statusText), ENABLE_DEV_WARNINGS ? heyDeveloper : null);
  }
  let errorInstance;
  if (error instanceof Error) {
    errorInstance = error;
  } else {
    let errorString = error == null ? "Unknown Error" : typeof error === "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ React8.createElement(
    BoundaryShell,
    {
      title: "Application Error!",
      isOutsideRemixApp
    },
    /* @__PURE__ */ React8.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"),
    /* @__PURE__ */ React8.createElement(
      "pre",
      {
        style: {
          padding: "2rem",
          background: "hsla(10, 50%, 50%, 0.1)",
          color: "red",
          overflow: "auto"
        }
      },
      errorInstance.stack
    ),
    heyDeveloper
  );
}
function BoundaryShell({
  title,
  renderScripts,
  isOutsideRemixApp,
  children
}) {
  let { routeModules } = useFrameworkContext();
  if (_optionalChain([routeModules, 'access', _106 => _106.root, 'optionalAccess', _107 => _107.Layout]) && !isOutsideRemixApp) {
    return children;
  }
  return /* @__PURE__ */ React8.createElement("html", { lang: "en" }, /* @__PURE__ */ React8.createElement("head", null, /* @__PURE__ */ React8.createElement("meta", { charSet: "utf-8" }), /* @__PURE__ */ React8.createElement(
    "meta",
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,viewport-fit=cover"
    }
  ), /* @__PURE__ */ React8.createElement("title", null, title)), /* @__PURE__ */ React8.createElement("body", null, /* @__PURE__ */ React8.createElement("main", { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } }, children, renderScripts ? /* @__PURE__ */ React8.createElement(Scripts, null) : null)));
}





































































































exports.Action = Action; exports.createMemoryHistory = createMemoryHistory; exports.createBrowserHistory = createBrowserHistory; exports.createHashHistory = createHashHistory; exports.invariant = invariant; exports.warning = warning; exports.createPath = createPath; exports.parsePath = parsePath; exports.unstable_createContext = unstable_createContext; exports.unstable_RouterContextProvider = unstable_RouterContextProvider; exports.convertRoutesToDataRoutes = convertRoutesToDataRoutes; exports.matchRoutes = matchRoutes; exports.generatePath = generatePath; exports.matchPath = matchPath; exports.stripBasename = stripBasename; exports.resolvePath = resolvePath; exports.getResolveToMatches = getResolveToMatches; exports.resolveTo = resolveTo; exports.joinPaths = joinPaths; exports.data = data; exports.redirect = redirect; exports.redirectDocument = redirectDocument; exports.replace = replace; exports.ErrorResponseImpl = ErrorResponseImpl; exports.isRouteErrorResponse = isRouteErrorResponse; exports.encode = encode; exports.IDLE_NAVIGATION = IDLE_NAVIGATION; exports.IDLE_FETCHER = IDLE_FETCHER; exports.IDLE_BLOCKER = IDLE_BLOCKER; exports.createRouter = createRouter; exports.createStaticHandler = createStaticHandler; exports.getStaticContextFromError = getStaticContextFromError; exports.isDataWithResponseInit = isDataWithResponseInit; exports.isResponse = isResponse; exports.isRedirectStatusCode = isRedirectStatusCode; exports.isRedirectResponse = isRedirectResponse; exports.isMutationMethod = isMutationMethod; exports.createRequestInit = createRequestInit; exports.SingleFetchRedirectSymbol = SingleFetchRedirectSymbol; exports.SINGLE_FETCH_REDIRECT_STATUS = SINGLE_FETCH_REDIRECT_STATUS; exports.NO_BODY_STATUS_CODES = NO_BODY_STATUS_CODES; exports.StreamTransfer = StreamTransfer; exports.getTurboStreamSingleFetchDataStrategy = getTurboStreamSingleFetchDataStrategy; exports.getSingleFetchDataStrategyImpl = getSingleFetchDataStrategyImpl; exports.stripIndexParam = stripIndexParam; exports.singleFetchUrl = singleFetchUrl; exports.decodeViaTurboStream = decodeViaTurboStream; exports.DataRouterContext = DataRouterContext; exports.DataRouterStateContext = DataRouterStateContext; exports.RSCRouterContext = RSCRouterContext; exports.ViewTransitionContext = ViewTransitionContext; exports.FetchersContext = FetchersContext; exports.AwaitContext = AwaitContext; exports.NavigationContext = NavigationContext; exports.LocationContext = LocationContext; exports.RouteContext = RouteContext; exports.ENABLE_DEV_WARNINGS = ENABLE_DEV_WARNINGS; exports.warnOnce = warnOnce; exports.useHref = useHref; exports.useInRouterContext = useInRouterContext; exports.useLocation = useLocation; exports.useNavigationType = useNavigationType; exports.useMatch = useMatch; exports.useNavigate = useNavigate; exports.useOutletContext = useOutletContext; exports.useOutlet = useOutlet; exports.useParams = useParams; exports.useResolvedPath = useResolvedPath; exports.useRoutes = useRoutes; exports.useRoutesImpl = useRoutesImpl; exports._renderMatches = _renderMatches; exports.useRouteId = useRouteId; exports.useNavigation = useNavigation; exports.useRevalidator = useRevalidator; exports.useMatches = useMatches; exports.useLoaderData = useLoaderData; exports.useRouteLoaderData = useRouteLoaderData; exports.useActionData = useActionData; exports.useRouteError = useRouteError; exports.useAsyncValue = useAsyncValue; exports.useAsyncError = useAsyncError; exports.useBlocker = useBlocker; exports.RemixErrorBoundary = RemixErrorBoundary; exports.createServerRoutes = createServerRoutes; exports.createClientRoutesWithHMRRevalidationOptOut = createClientRoutesWithHMRRevalidationOptOut; exports.noActionDefinedError = noActionDefinedError; exports.createClientRoutes = createClientRoutes; exports.shouldHydrateRouteLoader = shouldHydrateRouteLoader; exports.getPatchRoutesOnNavigationFunction = getPatchRoutesOnNavigationFunction; exports.useFogOFWarDiscovery = useFogOFWarDiscovery; exports.getManifestPath = getManifestPath; exports.FrameworkContext = FrameworkContext; exports.usePrefetchBehavior = usePrefetchBehavior; exports.CRITICAL_CSS_DATA_ATTRIBUTE = CRITICAL_CSS_DATA_ATTRIBUTE; exports.Links = Links; exports.PrefetchPageLinks = PrefetchPageLinks; exports.Meta = Meta; exports.Scripts = Scripts; exports.mergeRefs = mergeRefs;


/***/ }),

/***/ "./node_modules/react-router/dist/development/chunk-VC6RBZTR.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-router/dist/development/chunk-VC6RBZTR.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value: true})); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * react-router v7.8.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */





















































var _chunkEVX7OBGBjs = __webpack_require__(/*! ./chunk-EVX7OBGB.js */ "./node_modules/react-router/dist/development/chunk-EVX7OBGB.js");

// lib/components.tsx
var _react = __webpack_require__(/*! react */ "react"); var React = _interopRequireWildcard(_react); var React2 = _interopRequireWildcard(_react); var React3 = _interopRequireWildcard(_react);
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.hasErrorBoundary || route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    if (_chunkEVX7OBGBjs.ENABLE_DEV_WARNINGS) {
      if (route.element) {
        _chunkEVX7OBGBjs.warning.call(void 0, 
          false,
          "You should not include both `Component` and `element` on your route - `Component` will be used."
        );
      }
    }
    Object.assign(updates, {
      element: React.createElement(route.Component),
      Component: void 0
    });
  }
  if (route.HydrateFallback) {
    if (_chunkEVX7OBGBjs.ENABLE_DEV_WARNINGS) {
      if (route.hydrateFallbackElement) {
        _chunkEVX7OBGBjs.warning.call(void 0, 
          false,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
        );
      }
    }
    Object.assign(updates, {
      hydrateFallbackElement: React.createElement(route.HydrateFallback),
      HydrateFallback: void 0
    });
  }
  if (route.ErrorBoundary) {
    if (_chunkEVX7OBGBjs.ENABLE_DEV_WARNINGS) {
      if (route.errorElement) {
        _chunkEVX7OBGBjs.warning.call(void 0, 
          false,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
        );
      }
    }
    Object.assign(updates, {
      errorElement: React.createElement(route.ErrorBoundary),
      ErrorBoundary: void 0
    });
  }
  return updates;
}
var hydrationRouteProperties = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function createMemoryRouter(routes, opts) {
  return _chunkEVX7OBGBjs.createRouter.call(void 0, {
    basename: _optionalChain([opts, 'optionalAccess', _2 => _2.basename]),
    unstable_getContext: _optionalChain([opts, 'optionalAccess', _3 => _3.unstable_getContext]),
    future: _optionalChain([opts, 'optionalAccess', _4 => _4.future]),
    history: _chunkEVX7OBGBjs.createMemoryHistory.call(void 0, {
      initialEntries: _optionalChain([opts, 'optionalAccess', _5 => _5.initialEntries]),
      initialIndex: _optionalChain([opts, 'optionalAccess', _6 => _6.initialIndex])
    }),
    hydrationData: _optionalChain([opts, 'optionalAccess', _7 => _7.hydrationData]),
    routes,
    hydrationRouteProperties,
    mapRouteProperties,
    dataStrategy: _optionalChain([opts, 'optionalAccess', _8 => _8.dataStrategy]),
    patchRoutesOnNavigation: _optionalChain([opts, 'optionalAccess', _9 => _9.patchRoutesOnNavigation])
  }).initialize();
}
var Deferred = class {
  constructor() {
    this.status = "pending";
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (value) => {
        if (this.status === "pending") {
          this.status = "resolved";
          resolve(value);
        }
      };
      this.reject = (reason) => {
        if (this.status === "pending") {
          this.status = "rejected";
          reject(reason);
        }
      };
    });
  }
};
function RouterProvider({
  router,
  flushSync: reactDomFlushSyncImpl
}) {
  let [state, setStateImpl] = React.useState(router.state);
  let [pendingState, setPendingState] = React.useState();
  let [vtContext, setVtContext] = React.useState({
    isTransitioning: false
  });
  let [renderDfd, setRenderDfd] = React.useState();
  let [transition, setTransition] = React.useState();
  let [interruption, setInterruption] = React.useState();
  let fetcherData = React.useRef(/* @__PURE__ */ new Map());
  let setState = React.useCallback(
    (newState, { deletedFetchers, flushSync, viewTransitionOpts }) => {
      newState.fetchers.forEach((fetcher, key) => {
        if (fetcher.data !== void 0) {
          fetcherData.current.set(key, fetcher.data);
        }
      });
      deletedFetchers.forEach((key) => fetcherData.current.delete(key));
      _chunkEVX7OBGBjs.warnOnce.call(void 0, 
        flushSync === false || reactDomFlushSyncImpl != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let isViewTransitionAvailable = router.window != null && router.window.document != null && typeof router.window.document.startViewTransition === "function";
      _chunkEVX7OBGBjs.warnOnce.call(void 0, 
        viewTransitionOpts == null || isViewTransitionAvailable,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      );
      if (!viewTransitionOpts || !isViewTransitionAvailable) {
        if (reactDomFlushSyncImpl && flushSync) {
          reactDomFlushSyncImpl(() => setStateImpl(newState));
        } else {
          React.startTransition(() => setStateImpl(newState));
        }
        return;
      }
      if (reactDomFlushSyncImpl && flushSync) {
        reactDomFlushSyncImpl(() => {
          if (transition) {
            renderDfd && renderDfd.resolve();
            transition.skipTransition();
          }
          setVtContext({
            isTransitioning: true,
            flushSync: true,
            currentLocation: viewTransitionOpts.currentLocation,
            nextLocation: viewTransitionOpts.nextLocation
          });
        });
        let t = router.window.document.startViewTransition(() => {
          reactDomFlushSyncImpl(() => setStateImpl(newState));
        });
        t.finished.finally(() => {
          reactDomFlushSyncImpl(() => {
            setRenderDfd(void 0);
            setTransition(void 0);
            setPendingState(void 0);
            setVtContext({ isTransitioning: false });
          });
        });
        reactDomFlushSyncImpl(() => setTransition(t));
        return;
      }
      if (transition) {
        renderDfd && renderDfd.resolve();
        transition.skipTransition();
        setInterruption({
          state: newState,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      } else {
        setPendingState(newState);
        setVtContext({
          isTransitioning: true,
          flushSync: false,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      }
    },
    [router.window, reactDomFlushSyncImpl, transition, renderDfd]
  );
  React.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  React.useEffect(() => {
    if (vtContext.isTransitioning && !vtContext.flushSync) {
      setRenderDfd(new Deferred());
    }
  }, [vtContext]);
  React.useEffect(() => {
    if (renderDfd && pendingState && router.window) {
      let newState = pendingState;
      let renderPromise = renderDfd.promise;
      let transition2 = router.window.document.startViewTransition(async () => {
        React.startTransition(() => setStateImpl(newState));
        await renderPromise;
      });
      transition2.finished.finally(() => {
        setRenderDfd(void 0);
        setTransition(void 0);
        setPendingState(void 0);
        setVtContext({ isTransitioning: false });
      });
      setTransition(transition2);
    }
  }, [pendingState, renderDfd, router.window]);
  React.useEffect(() => {
    if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
      renderDfd.resolve();
    }
  }, [renderDfd, transition, state.location, pendingState]);
  React.useEffect(() => {
    if (!vtContext.isTransitioning && interruption) {
      setPendingState(interruption.state);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: interruption.currentLocation,
        nextLocation: interruption.nextLocation
      });
      setInterruption(void 0);
    }
  }, [vtContext.isTransitioning, interruption]);
  let navigator = React.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: (n) => router.navigate(n),
      push: (to, state2, opts) => router.navigate(to, {
        state: state2,
        preventScrollReset: _optionalChain([opts, 'optionalAccess', _10 => _10.preventScrollReset])
      }),
      replace: (to, state2, opts) => router.navigate(to, {
        replace: true,
        state: state2,
        preventScrollReset: _optionalChain([opts, 'optionalAccess', _11 => _11.preventScrollReset])
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = React.useMemo(
    () => ({
      router,
      navigator,
      static: false,
      basename
    }),
    [router, navigator, basename]
  );
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(_chunkEVX7OBGBjs.DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ React.createElement(_chunkEVX7OBGBjs.DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ React.createElement(_chunkEVX7OBGBjs.FetchersContext.Provider, { value: fetcherData.current }, /* @__PURE__ */ React.createElement(_chunkEVX7OBGBjs.ViewTransitionContext.Provider, { value: vtContext }, /* @__PURE__ */ React.createElement(
    Router,
    {
      basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator
    },
    /* @__PURE__ */ React.createElement(
      MemoizedDataRoutes,
      {
        routes: router.routes,
        future: router.future,
        state
      }
    )
  ))))), null);
}
var MemoizedDataRoutes = React.memo(DataRoutes);
function DataRoutes({
  routes,
  future,
  state
}) {
  return _chunkEVX7OBGBjs.useRoutesImpl.call(void 0, routes, void 0, state, future);
}
function MemoryRouter({
  basename,
  children,
  initialEntries,
  initialIndex
}) {
  let historyRef = React.useRef();
  if (historyRef.current == null) {
    historyRef.current = _chunkEVX7OBGBjs.createMemoryHistory.call(void 0, {
      initialEntries,
      initialIndex,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = React.useState({
    action: history.action,
    location: history.location
  });
  let setState = React.useCallback(
    (newState) => {
      React.startTransition(() => setStateImpl(newState));
    },
    [setStateImpl]
  );
  React.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ React.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    }
  );
}
function Navigate({
  to,
  replace,
  state,
  relative
}) {
  _chunkEVX7OBGBjs.invariant.call(void 0, 
    _chunkEVX7OBGBjs.useInRouterContext.call(void 0, ),
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    `<Navigate> may be used only in the context of a <Router> component.`
  );
  let { static: isStatic } = React.useContext(_chunkEVX7OBGBjs.NavigationContext);
  _chunkEVX7OBGBjs.warning.call(void 0, 
    !isStatic,
    `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`
  );
  let { matches } = React.useContext(_chunkEVX7OBGBjs.RouteContext);
  let { pathname: locationPathname } = _chunkEVX7OBGBjs.useLocation.call(void 0, );
  let navigate = _chunkEVX7OBGBjs.useNavigate.call(void 0, );
  let path = _chunkEVX7OBGBjs.resolveTo.call(void 0, 
    to,
    _chunkEVX7OBGBjs.getResolveToMatches.call(void 0, matches),
    locationPathname,
    relative === "path"
  );
  let jsonPath = JSON.stringify(path);
  React.useEffect(() => {
    navigate(JSON.parse(jsonPath), { replace, state, relative });
  }, [navigate, jsonPath, relative, replace, state]);
  return null;
}
function Outlet(props) {
  return _chunkEVX7OBGBjs.useOutlet.call(void 0, props.context);
}
function Route(props) {
  _chunkEVX7OBGBjs.invariant.call(void 0, 
    false,
    `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`
  );
}
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = "POP" /* Pop */,
  navigator,
  static: staticProp = false
}) {
  _chunkEVX7OBGBjs.invariant.call(void 0, 
    !_chunkEVX7OBGBjs.useInRouterContext.call(void 0, ),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = React.useMemo(
    () => ({
      basename,
      navigator,
      static: staticProp,
      future: {}
    }),
    [basename, navigator, staticProp]
  );
  if (typeof locationProp === "string") {
    locationProp = _chunkEVX7OBGBjs.parsePath.call(void 0, locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = React.useMemo(() => {
    let trailingPathname = _chunkEVX7OBGBjs.stripBasename.call(void 0, pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  _chunkEVX7OBGBjs.warning.call(void 0, 
    locationContext != null,
    `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
  );
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(_chunkEVX7OBGBjs.NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ React.createElement(_chunkEVX7OBGBjs.LocationContext.Provider, { children, value: locationContext }));
}
function Routes({
  children,
  location
}) {
  return _chunkEVX7OBGBjs.useRoutes.call(void 0, createRoutesFromChildren(children), location);
}
function Await({
  children,
  errorElement,
  resolve
}) {
  return /* @__PURE__ */ React.createElement(AwaitErrorBoundary, { resolve, errorElement }, /* @__PURE__ */ React.createElement(ResolveAwait, null, children));
}
var AwaitErrorBoundary = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, errorInfo) {
    console.error(
      "<Await> caught the following error during render",
      error,
      errorInfo
    );
  }
  render() {
    let { children, errorElement, resolve } = this.props;
    let promise = null;
    let status = 0 /* pending */;
    if (!(resolve instanceof Promise)) {
      status = 1 /* success */;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", { get: () => true });
      Object.defineProperty(promise, "_data", { get: () => resolve });
    } else if (this.state.error) {
      status = 2 /* error */;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {
      });
      Object.defineProperty(promise, "_tracked", { get: () => true });
      Object.defineProperty(promise, "_error", { get: () => renderError });
    } else if (resolve._tracked) {
      promise = resolve;
      status = "_error" in promise ? 2 /* error */ : "_data" in promise ? 1 /* success */ : 0 /* pending */;
    } else {
      status = 0 /* pending */;
      Object.defineProperty(resolve, "_tracked", { get: () => true });
      promise = resolve.then(
        (data) => Object.defineProperty(resolve, "_data", { get: () => data }),
        (error) => Object.defineProperty(resolve, "_error", { get: () => error })
      );
    }
    if (status === 2 /* error */ && !errorElement) {
      throw promise._error;
    }
    if (status === 2 /* error */) {
      return /* @__PURE__ */ React.createElement(_chunkEVX7OBGBjs.AwaitContext.Provider, { value: promise, children: errorElement });
    }
    if (status === 1 /* success */) {
      return /* @__PURE__ */ React.createElement(_chunkEVX7OBGBjs.AwaitContext.Provider, { value: promise, children });
    }
    throw promise;
  }
};
function ResolveAwait({
  children
}) {
  let data = _chunkEVX7OBGBjs.useAsyncValue.call(void 0, );
  let toRender = typeof children === "function" ? children(data) : children;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, toRender);
}
function createRoutesFromChildren(children, parentPath = []) {
  let routes = [];
  React.Children.forEach(children, (element, index) => {
    if (!React.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === React.Fragment) {
      routes.push.apply(
        routes,
        createRoutesFromChildren(element.props.children, treePath)
      );
      return;
    }
    _chunkEVX7OBGBjs.invariant.call(void 0, 
      element.type === Route,
      `[${typeof element.type === "string" ? element.type : element.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    );
    _chunkEVX7OBGBjs.invariant.call(void 0, 
      !element.props.index || !element.props.children,
      "An index route cannot have child routes."
    );
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      hydrateFallbackElement: element.props.hydrateFallbackElement,
      HydrateFallback: element.props.HydrateFallback,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.hasErrorBoundary === true || element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(
        element.props.children,
        treePath
      );
    }
    routes.push(route);
  });
  return routes;
}
var createRoutesFromElements = createRoutesFromChildren;
function renderMatches(matches) {
  return _chunkEVX7OBGBjs._renderMatches.call(void 0, matches);
}
function useRouteComponentProps() {
  return {
    params: _chunkEVX7OBGBjs.useParams.call(void 0, ),
    loaderData: _chunkEVX7OBGBjs.useLoaderData.call(void 0, ),
    actionData: _chunkEVX7OBGBjs.useActionData.call(void 0, ),
    matches: _chunkEVX7OBGBjs.useMatches.call(void 0, )
  };
}
function WithComponentProps({
  children
}) {
  const props = useRouteComponentProps();
  return React.cloneElement(children, props);
}
function withComponentProps(Component2) {
  return function WithComponentProps2() {
    const props = useRouteComponentProps();
    return React.createElement(Component2, props);
  };
}
function useHydrateFallbackProps() {
  return {
    params: _chunkEVX7OBGBjs.useParams.call(void 0, ),
    loaderData: _chunkEVX7OBGBjs.useLoaderData.call(void 0, ),
    actionData: _chunkEVX7OBGBjs.useActionData.call(void 0, )
  };
}
function WithHydrateFallbackProps({
  children
}) {
  const props = useHydrateFallbackProps();
  return React.cloneElement(children, props);
}
function withHydrateFallbackProps(HydrateFallback) {
  return function WithHydrateFallbackProps2() {
    const props = useHydrateFallbackProps();
    return React.createElement(HydrateFallback, props);
  };
}
function useErrorBoundaryProps() {
  return {
    params: _chunkEVX7OBGBjs.useParams.call(void 0, ),
    loaderData: _chunkEVX7OBGBjs.useLoaderData.call(void 0, ),
    actionData: _chunkEVX7OBGBjs.useActionData.call(void 0, ),
    error: _chunkEVX7OBGBjs.useRouteError.call(void 0, )
  };
}
function WithErrorBoundaryProps({
  children
}) {
  const props = useErrorBoundaryProps();
  return React.cloneElement(children, props);
}
function withErrorBoundaryProps(ErrorBoundary) {
  return function WithErrorBoundaryProps2() {
    const props = useErrorBoundaryProps();
    return React.createElement(ErrorBoundary, props);
  };
}

// lib/dom/dom.ts
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
function createSearchParams(init = "") {
  return new URLSearchParams(
    typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo2, key) => {
      let value = init[key];
      return memo2.concat(
        Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
      );
    }, [])
  );
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams) {
    defaultSearchParams.forEach((_, key) => {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach((value) => {
          searchParams.append(key, value);
        });
      }
    });
  }
  return searchParams;
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    _chunkEVX7OBGBjs.warning.call(void 0, 
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? _chunkEVX7OBGBjs.stripBasename.call(void 0, attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? _chunkEVX7OBGBjs.stripBasename.call(void 0, attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action, method: method.toLowerCase(), encType, formData, body };
}

// lib/dom/lib.tsx

var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser) {
    window.__reactRouterVersion = // @ts-expect-error
    "7.8.0";
  }
} catch (e) {
}
function createBrowserRouter(routes, opts) {
  return _chunkEVX7OBGBjs.createRouter.call(void 0, {
    basename: _optionalChain([opts, 'optionalAccess', _12 => _12.basename]),
    unstable_getContext: _optionalChain([opts, 'optionalAccess', _13 => _13.unstable_getContext]),
    future: _optionalChain([opts, 'optionalAccess', _14 => _14.future]),
    history: _chunkEVX7OBGBjs.createBrowserHistory.call(void 0, { window: _optionalChain([opts, 'optionalAccess', _15 => _15.window]) }),
    hydrationData: _optionalChain([opts, 'optionalAccess', _16 => _16.hydrationData]) || parseHydrationData(),
    routes,
    mapRouteProperties,
    hydrationRouteProperties,
    dataStrategy: _optionalChain([opts, 'optionalAccess', _17 => _17.dataStrategy]),
    patchRoutesOnNavigation: _optionalChain([opts, 'optionalAccess', _18 => _18.patchRoutesOnNavigation]),
    window: _optionalChain([opts, 'optionalAccess', _19 => _19.window])
  }).initialize();
}
function createHashRouter(routes, opts) {
  return _chunkEVX7OBGBjs.createRouter.call(void 0, {
    basename: _optionalChain([opts, 'optionalAccess', _20 => _20.basename]),
    unstable_getContext: _optionalChain([opts, 'optionalAccess', _21 => _21.unstable_getContext]),
    future: _optionalChain([opts, 'optionalAccess', _22 => _22.future]),
    history: _chunkEVX7OBGBjs.createHashHistory.call(void 0, { window: _optionalChain([opts, 'optionalAccess', _23 => _23.window]) }),
    hydrationData: _optionalChain([opts, 'optionalAccess', _24 => _24.hydrationData]) || parseHydrationData(),
    routes,
    mapRouteProperties,
    hydrationRouteProperties,
    dataStrategy: _optionalChain([opts, 'optionalAccess', _25 => _25.dataStrategy]),
    patchRoutesOnNavigation: _optionalChain([opts, 'optionalAccess', _26 => _26.patchRoutesOnNavigation]),
    window: _optionalChain([opts, 'optionalAccess', _27 => _27.window])
  }).initialize();
}
function parseHydrationData() {
  let state = _optionalChain([window, 'optionalAccess', _28 => _28.__staticRouterHydrationData]);
  if (state && state.errors) {
    state = {
      ...state,
      errors: deserializeErrors(state.errors)
    };
  }
  return state;
}
function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new (0, _chunkEVX7OBGBjs.ErrorResponseImpl)(
        val.status,
        val.statusText,
        val.data,
        val.internal === true
      );
    } else if (val && val.__type === "Error") {
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor === "function") {
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = "";
            serialized[key] = error;
          } catch (e) {
          }
        }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        error.stack = "";
        serialized[key] = error;
      }
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function BrowserRouter({
  basename,
  children,
  window: window2
}) {
  let historyRef = React2.useRef();
  if (historyRef.current == null) {
    historyRef.current = _chunkEVX7OBGBjs.createBrowserHistory.call(void 0, { window: window2, v5Compat: true });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  });
  let setState = React2.useCallback(
    (newState) => {
      React2.startTransition(() => setStateImpl(newState));
    },
    [setStateImpl]
  );
  React2.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ React2.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    }
  );
}
function HashRouter({ basename, children, window: window2 }) {
  let historyRef = React2.useRef();
  if (historyRef.current == null) {
    historyRef.current = _chunkEVX7OBGBjs.createHashHistory.call(void 0, { window: window2, v5Compat: true });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  });
  let setState = React2.useCallback(
    (newState) => {
      React2.startTransition(() => setStateImpl(newState));
    },
    [setStateImpl]
  );
  React2.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ React2.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    }
  );
}
function HistoryRouter({
  basename,
  children,
  history
}) {
  let [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  });
  let setState = React2.useCallback(
    (newState) => {
      React2.startTransition(() => setStateImpl(newState));
    },
    [setStateImpl]
  );
  React2.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ React2.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    }
  );
}
HistoryRouter.displayName = "unstable_HistoryRouter";
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = React2.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    ...rest
  }, forwardedRef) {
    let { basename } = React2.useContext(_chunkEVX7OBGBjs.NavigationContext);
    let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
    let absoluteHref;
    let isExternal = false;
    if (typeof to === "string" && isAbsolute) {
      absoluteHref = to;
      if (isBrowser) {
        try {
          let currentUrl = new URL(window.location.href);
          let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
          let path = _chunkEVX7OBGBjs.stripBasename.call(void 0, targetUrl.pathname, basename);
          if (targetUrl.origin === currentUrl.origin && path != null) {
            to = path + targetUrl.search + targetUrl.hash;
          } else {
            isExternal = true;
          }
        } catch (e) {
          _chunkEVX7OBGBjs.warning.call(void 0, 
            false,
            `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
          );
        }
      }
    }
    let href = _chunkEVX7OBGBjs.useHref.call(void 0, to, { relative });
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = _chunkEVX7OBGBjs.usePrefetchBehavior.call(void 0, 
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ React2.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: absoluteHref || href,
          onClick: isExternal || reloadDocument ? onClick : handleClick,
          ref: _chunkEVX7OBGBjs.mergeRefs.call(void 0, forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React2.createElement(React2.Fragment, null, link, /* @__PURE__ */ React2.createElement(_chunkEVX7OBGBjs.PrefetchPageLinks, { page: href })) : link;
  }
);
Link.displayName = "Link";
var NavLink = React2.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = _chunkEVX7OBGBjs.useResolvedPath.call(void 0, to, { relative: rest.relative });
    let location = _chunkEVX7OBGBjs.useLocation.call(void 0, );
    let routerState = React2.useContext(_chunkEVX7OBGBjs.DataRouterStateContext);
    let { navigator, basename } = React2.useContext(_chunkEVX7OBGBjs.NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename) {
      nextLocationPathname = _chunkEVX7OBGBjs.stripBasename.call(void 0, nextLocationPathname, basename) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ React2.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink.displayName = "NavLink";
var Form = React2.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    ...props
  }, forwardedRef) => {
    let submit = useSubmit();
    let formAction = useFormAction(action, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX.test(action);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = _optionalChain([submitter, 'optionalAccess', _29 => _29.getAttribute, 'call', _30 => _30("formmethod")]) || method;
      submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace,
        state,
        relative,
        preventScrollReset,
        viewTransition
      });
    };
    return /* @__PURE__ */ React2.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function ScrollRestoration({
  getKey,
  storageKey,
  ...props
}) {
  let remixContext = React2.useContext(_chunkEVX7OBGBjs.FrameworkContext);
  let { basename } = React2.useContext(_chunkEVX7OBGBjs.NavigationContext);
  let location = _chunkEVX7OBGBjs.useLocation.call(void 0, );
  let matches = _chunkEVX7OBGBjs.useMatches.call(void 0, );
  useScrollRestoration({ getKey, storageKey });
  let ssrKey = React2.useMemo(
    () => {
      if (!remixContext || !getKey) return null;
      let userKey = getScrollRestorationKey(
        location,
        matches,
        basename,
        getKey
      );
      return userKey !== location.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (!remixContext || remixContext.isSpaMode) {
    return null;
  }
  let restoreScroll = ((storageKey2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key = Math.random().toString(32).slice(2);
      window.history.replaceState({ key }, "");
    }
    try {
      let positions = JSON.parse(sessionStorage.getItem(storageKey2) || "{}");
      let storedY = positions[restoreKey || window.history.state.key];
      if (typeof storedY === "number") {
        window.scrollTo(0, storedY);
      }
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(storageKey2);
    }
  }).toString();
  return /* @__PURE__ */ React2.createElement(
    "script",
    {
      ...props,
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: `(${restoreScroll})(${JSON.stringify(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY
        )}, ${JSON.stringify(ssrKey)})`
      }
    }
  );
}
ScrollRestoration.displayName = "ScrollRestoration";
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = React2.useContext(_chunkEVX7OBGBjs.DataRouterContext);
  _chunkEVX7OBGBjs.invariant.call(void 0, ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = React2.useContext(_chunkEVX7OBGBjs.DataRouterStateContext);
  _chunkEVX7OBGBjs.invariant.call(void 0, state, getDataRouterConsoleError(hookName));
  return state;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  state,
  preventScrollReset,
  relative,
  viewTransition
} = {}) {
  let navigate = _chunkEVX7OBGBjs.useNavigate.call(void 0, );
  let location = _chunkEVX7OBGBjs.useLocation.call(void 0, );
  let path = _chunkEVX7OBGBjs.useResolvedPath.call(void 0, to, { relative });
  return React2.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace = replaceProp !== void 0 ? replaceProp : _chunkEVX7OBGBjs.createPath.call(void 0, location) === _chunkEVX7OBGBjs.createPath.call(void 0, path);
        navigate(to, {
          replace,
          state,
          preventScrollReset,
          relative,
          viewTransition
        });
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      viewTransition
    ]
  );
}
function useSearchParams(defaultInit) {
  _chunkEVX7OBGBjs.warning.call(void 0, 
    typeof URLSearchParams !== "undefined",
    `You cannot use the \`useSearchParams\` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.`
  );
  let defaultSearchParamsRef = React2.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = React2.useRef(false);
  let location = _chunkEVX7OBGBjs.useLocation.call(void 0, );
  let searchParams = React2.useMemo(
    () => (
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once we call that we want those to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      getSearchParamsForLocation(
        location.search,
        hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current
      )
    ),
    [location.search]
  );
  let navigate = _chunkEVX7OBGBjs.useNavigate.call(void 0, );
  let setSearchParams = React2.useCallback(
    (nextInit, navigateOptions) => {
      const newSearchParams = createSearchParams(
        typeof nextInit === "function" ? nextInit(new URLSearchParams(searchParams)) : nextInit
      );
      hasSetSearchParamsRef.current = true;
      navigate("?" + newSearchParams, navigateOptions);
    },
    [navigate, searchParams]
  );
  return [searchParams, setSearchParams];
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router } = useDataRouterContext("useSubmit" /* UseSubmit */);
  let { basename } = React2.useContext(_chunkEVX7OBGBjs.NavigationContext);
  let currentRouteId = _chunkEVX7OBGBjs.useRouteId.call(void 0, );
  return React2.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await router.fetch(key, currentRouteId, options.action || action, {
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await router.navigate(options.action || action, {
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [router, basename, currentRouteId]
  );
}
function useFormAction(action, { relative } = {}) {
  let { basename } = React2.useContext(_chunkEVX7OBGBjs.NavigationContext);
  let routeContext = React2.useContext(_chunkEVX7OBGBjs.RouteContext);
  _chunkEVX7OBGBjs.invariant.call(void 0, routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ..._chunkEVX7OBGBjs.useResolvedPath.call(void 0, action ? action : ".", { relative }) };
  let location = _chunkEVX7OBGBjs.useLocation.call(void 0, );
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : _chunkEVX7OBGBjs.joinPaths.call(void 0, [basename, path.pathname]);
  }
  return _chunkEVX7OBGBjs.createPath.call(void 0, path);
}
function useFetcher({
  key
} = {}) {
  let { router } = useDataRouterContext("useFetcher" /* UseFetcher */);
  let state = useDataRouterState("useFetcher" /* UseFetcher */);
  let fetcherData = React2.useContext(_chunkEVX7OBGBjs.FetchersContext);
  let route = React2.useContext(_chunkEVX7OBGBjs.RouteContext);
  let routeId = _optionalChain([route, 'access', _31 => _31.matches, 'access', _32 => _32[route.matches.length - 1], 'optionalAccess', _33 => _33.route, 'access', _34 => _34.id]);
  _chunkEVX7OBGBjs.invariant.call(void 0, fetcherData, `useFetcher must be used inside a FetchersContext`);
  _chunkEVX7OBGBjs.invariant.call(void 0, route, `useFetcher must be used inside a RouteContext`);
  _chunkEVX7OBGBjs.invariant.call(void 0, 
    routeId != null,
    `useFetcher can only be used on routes that contain a unique "id"`
  );
  let defaultKey = React2.useId();
  let [fetcherKey, setFetcherKey] = React2.useState(key || defaultKey);
  if (key && key !== fetcherKey) {
    setFetcherKey(key);
  }
  React2.useEffect(() => {
    router.getFetcher(fetcherKey);
    return () => router.deleteFetcher(fetcherKey);
  }, [router, fetcherKey]);
  let load = React2.useCallback(
    async (href, opts) => {
      _chunkEVX7OBGBjs.invariant.call(void 0, routeId, "No routeId available for fetcher.load()");
      await router.fetch(fetcherKey, routeId, href, opts);
    },
    [fetcherKey, routeId, router]
  );
  let submitImpl = useSubmit();
  let submit = React2.useCallback(
    async (target, opts) => {
      await submitImpl(target, {
        ...opts,
        navigate: false,
        fetcherKey
      });
    },
    [fetcherKey, submitImpl]
  );
  let FetcherForm = React2.useMemo(() => {
    let FetcherForm2 = React2.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ React2.createElement(Form, { ...props, navigate: false, fetcherKey, ref });
      }
    );
    FetcherForm2.displayName = "fetcher.Form";
    return FetcherForm2;
  }, [fetcherKey]);
  let fetcher = state.fetchers.get(fetcherKey) || _chunkEVX7OBGBjs.IDLE_FETCHER;
  let data = fetcherData.get(fetcherKey);
  let fetcherWithComponents = React2.useMemo(
    () => ({
      Form: FetcherForm,
      submit,
      load,
      ...fetcher,
      data
    }),
    [FetcherForm, submit, load, fetcher, data]
  );
  return fetcherWithComponents;
}
function useFetchers() {
  let state = useDataRouterState("useFetchers" /* UseFetchers */);
  return Array.from(state.fetchers.entries()).map(([key, fetcher]) => ({
    ...fetcher,
    key
  }));
}
var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
var savedScrollPositions = {};
function getScrollRestorationKey(location, matches, basename, getKey) {
  let key = null;
  if (getKey) {
    if (basename !== "/") {
      key = getKey(
        {
          ...location,
          pathname: _chunkEVX7OBGBjs.stripBasename.call(void 0, location.pathname, basename) || location.pathname
        },
        matches
      );
    } else {
      key = getKey(location, matches);
    }
  }
  if (key == null) {
    key = location.key;
  }
  return key;
}
function useScrollRestoration({
  getKey,
  storageKey
} = {}) {
  let { router } = useDataRouterContext("useScrollRestoration" /* UseScrollRestoration */);
  let { restoreScrollPosition, preventScrollReset } = useDataRouterState(
    "useScrollRestoration" /* UseScrollRestoration */
  );
  let { basename } = React2.useContext(_chunkEVX7OBGBjs.NavigationContext);
  let location = _chunkEVX7OBGBjs.useLocation.call(void 0, );
  let matches = _chunkEVX7OBGBjs.useMatches.call(void 0, );
  let navigation = _chunkEVX7OBGBjs.useNavigation.call(void 0, );
  React2.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);
  usePageHide(
    React2.useCallback(() => {
      if (navigation.state === "idle") {
        let key = getScrollRestorationKey(location, matches, basename, getKey);
        savedScrollPositions[key] = window.scrollY;
      }
      try {
        sessionStorage.setItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY,
          JSON.stringify(savedScrollPositions)
        );
      } catch (error) {
        _chunkEVX7OBGBjs.warning.call(void 0, 
          false,
          `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`
        );
      }
      window.history.scrollRestoration = "auto";
    }, [navigation.state, getKey, basename, location, matches, storageKey])
  );
  if (typeof document !== "undefined") {
    React2.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY
        );
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {
      }
    }, [storageKey]);
    React2.useLayoutEffect(() => {
      let disableScrollRestoration = _optionalChain([router, 'optionalAccess', _35 => _35.enableScrollRestoration, 'call', _36 => _36(
        savedScrollPositions,
        () => window.scrollY,
        getKey ? (location2, matches2) => getScrollRestorationKey(location2, matches2, basename, getKey) : void 0
      )]);
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, basename, getKey]);
    React2.useLayoutEffect(() => {
      if (restoreScrollPosition === false) {
        return;
      }
      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      try {
        if (location.hash) {
          let el = document.getElementById(
            decodeURIComponent(location.hash.slice(1))
          );
          if (el) {
            el.scrollIntoView();
            return;
          }
        }
      } catch (e2) {
        _chunkEVX7OBGBjs.warning.call(void 0, 
          false,
          `"${location.hash.slice(
            1
          )}" is not a decodable element ID. The view will not scroll to it.`
        );
      }
      if (preventScrollReset === true) {
        return;
      }
      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
function useBeforeUnload(callback, options) {
  let { capture } = options || {};
  React2.useEffect(() => {
    let opts = capture != null ? { capture } : void 0;
    window.addEventListener("beforeunload", callback, opts);
    return () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
function usePageHide(callback, options) {
  let { capture } = options || {};
  React2.useEffect(() => {
    let opts = capture != null ? { capture } : void 0;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function usePrompt({
  when,
  message
}) {
  let blocker = _chunkEVX7OBGBjs.useBlocker.call(void 0, when);
  React2.useEffect(() => {
    if (blocker.state === "blocked") {
      let proceed = window.confirm(message);
      if (proceed) {
        setTimeout(blocker.proceed, 0);
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);
  React2.useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);
}
function useViewTransitionState(to, { relative } = {}) {
  let vtContext = React2.useContext(_chunkEVX7OBGBjs.ViewTransitionContext);
  _chunkEVX7OBGBjs.invariant.call(void 0, 
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename } = useDataRouterContext(
    "useViewTransitionState" /* useViewTransitionState */
  );
  let path = _chunkEVX7OBGBjs.useResolvedPath.call(void 0, to, { relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = _chunkEVX7OBGBjs.stripBasename.call(void 0, vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = _chunkEVX7OBGBjs.stripBasename.call(void 0, vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return _chunkEVX7OBGBjs.matchPath.call(void 0, path.pathname, nextPath) != null || _chunkEVX7OBGBjs.matchPath.call(void 0, path.pathname, currentPath) != null;
}

// lib/dom/server.tsx

function StaticRouter({
  basename,
  children,
  location: locationProp = "/"
}) {
  if (typeof locationProp === "string") {
    locationProp = _chunkEVX7OBGBjs.parsePath.call(void 0, locationProp);
  }
  let action = "POP" /* Pop */;
  let location = {
    pathname: locationProp.pathname || "/",
    search: locationProp.search || "",
    hash: locationProp.hash || "",
    state: locationProp.state != null ? locationProp.state : null,
    key: locationProp.key || "default"
  };
  let staticNavigator = getStatelessNavigator();
  return /* @__PURE__ */ React3.createElement(
    Router,
    {
      basename,
      children,
      location,
      navigationType: action,
      navigator: staticNavigator,
      static: true
    }
  );
}
function StaticRouterProvider({
  context,
  router,
  hydrate = true,
  nonce
}) {
  _chunkEVX7OBGBjs.invariant.call(void 0, 
    router && context,
    "You must provide `router` and `context` to <StaticRouterProvider>"
  );
  let dataRouterContext = {
    router,
    navigator: getStatelessNavigator(),
    static: true,
    staticContext: context,
    basename: context.basename || "/"
  };
  let fetchersContext = /* @__PURE__ */ new Map();
  let hydrateScript = "";
  if (hydrate !== false) {
    let data = {
      loaderData: context.loaderData,
      actionData: context.actionData,
      errors: serializeErrors(context.errors)
    };
    let json = htmlEscape(JSON.stringify(JSON.stringify(data)));
    hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${json});`;
  }
  let { state } = dataRouterContext.router;
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(_chunkEVX7OBGBjs.DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ React3.createElement(_chunkEVX7OBGBjs.DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ React3.createElement(_chunkEVX7OBGBjs.FetchersContext.Provider, { value: fetchersContext }, /* @__PURE__ */ React3.createElement(_chunkEVX7OBGBjs.ViewTransitionContext.Provider, { value: { isTransitioning: false } }, /* @__PURE__ */ React3.createElement(
    Router,
    {
      basename: dataRouterContext.basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator: dataRouterContext.navigator,
      static: dataRouterContext.static
    },
    /* @__PURE__ */ React3.createElement(
      DataRoutes2,
      {
        routes: router.routes,
        future: router.future,
        state
      }
    )
  ))))), hydrateScript ? /* @__PURE__ */ React3.createElement(
    "script",
    {
      suppressHydrationWarning: true,
      nonce,
      dangerouslySetInnerHTML: { __html: hydrateScript }
    }
  ) : null);
}
function DataRoutes2({
  routes,
  future,
  state
}) {
  return _chunkEVX7OBGBjs.useRoutesImpl.call(void 0, routes, void 0, state, future);
}
function serializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (_chunkEVX7OBGBjs.isRouteErrorResponse.call(void 0, val)) {
      serialized[key] = { ...val, __type: "RouteErrorResponse" };
    } else if (val instanceof Error) {
      serialized[key] = {
        message: val.message,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.
        ...val.name !== "Error" ? {
          __subType: val.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function getStatelessNavigator() {
  return {
    createHref,
    encodeLocation,
    push(to) {
      throw new Error(
        `You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`
      );
    },
    replace(to) {
      throw new Error(
        `You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`
      );
    },
    go(delta) {
      throw new Error(
        `You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`
      );
    },
    back() {
      throw new Error(
        `You cannot use navigator.back() on the server because it is a stateless environment.`
      );
    },
    forward() {
      throw new Error(
        `You cannot use navigator.forward() on the server because it is a stateless environment.`
      );
    }
  };
}
function createStaticHandler2(routes, opts) {
  return _chunkEVX7OBGBjs.createStaticHandler.call(void 0, routes, {
    ...opts,
    mapRouteProperties
  });
}
function createStaticRouter(routes, context, opts = {}) {
  let manifest = {};
  let dataRoutes = _chunkEVX7OBGBjs.convertRoutesToDataRoutes.call(void 0, 
    routes,
    mapRouteProperties,
    void 0,
    manifest
  );
  let matches = context.matches.map((match) => {
    let route = manifest[match.route.id] || match.route;
    return {
      ...match,
      route
    };
  });
  let msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
  return {
    get basename() {
      return context.basename;
    },
    get future() {
      return {
        unstable_middleware: false,
        ..._optionalChain([opts, 'optionalAccess', _37 => _37.future])
      };
    },
    get state() {
      return {
        historyAction: "POP" /* Pop */,
        location: context.location,
        matches,
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: context.errors,
        initialized: true,
        navigation: _chunkEVX7OBGBjs.IDLE_NAVIGATION,
        restoreScrollPosition: null,
        preventScrollReset: false,
        revalidation: "idle",
        fetchers: /* @__PURE__ */ new Map(),
        blockers: /* @__PURE__ */ new Map()
      };
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return void 0;
    },
    initialize() {
      throw msg("initialize");
    },
    subscribe() {
      throw msg("subscribe");
    },
    enableScrollRestoration() {
      throw msg("enableScrollRestoration");
    },
    navigate() {
      throw msg("navigate");
    },
    fetch() {
      throw msg("fetch");
    },
    revalidate() {
      throw msg("revalidate");
    },
    createHref,
    encodeLocation,
    getFetcher() {
      return _chunkEVX7OBGBjs.IDLE_FETCHER;
    },
    deleteFetcher() {
      throw msg("deleteFetcher");
    },
    dispose() {
      throw msg("dispose");
    },
    getBlocker() {
      return _chunkEVX7OBGBjs.IDLE_BLOCKER;
    },
    deleteBlocker() {
      throw msg("deleteBlocker");
    },
    patchRoutes() {
      throw msg("patchRoutes");
    },
    _internalFetchControllers: /* @__PURE__ */ new Map(),
    _internalSetRoutes() {
      throw msg("_internalSetRoutes");
    },
    _internalSetStateDoNotUseOrYouWillBreakYourApp() {
      throw msg("_internalSetStateDoNotUseOrYouWillBreakYourApp");
    }
  };
}
function createHref(to) {
  return typeof to === "string" ? to : _chunkEVX7OBGBjs.createPath.call(void 0, to);
}
function encodeLocation(to) {
  let href = typeof to === "string" ? to : _chunkEVX7OBGBjs.createPath.call(void 0, to);
  href = href.replace(/ $/, "%20");
  let encoded = ABSOLUTE_URL_REGEX2.test(href) ? new URL(href) : new URL(href, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash
  };
}
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function htmlEscape(str) {
  return str.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}














































exports.mapRouteProperties = mapRouteProperties; exports.hydrationRouteProperties = hydrationRouteProperties; exports.createMemoryRouter = createMemoryRouter; exports.RouterProvider = RouterProvider; exports.MemoryRouter = MemoryRouter; exports.Navigate = Navigate; exports.Outlet = Outlet; exports.Route = Route; exports.Router = Router; exports.Routes = Routes; exports.Await = Await; exports.createRoutesFromChildren = createRoutesFromChildren; exports.createRoutesFromElements = createRoutesFromElements; exports.renderMatches = renderMatches; exports.WithComponentProps = WithComponentProps; exports.withComponentProps = withComponentProps; exports.WithHydrateFallbackProps = WithHydrateFallbackProps; exports.withHydrateFallbackProps = withHydrateFallbackProps; exports.WithErrorBoundaryProps = WithErrorBoundaryProps; exports.withErrorBoundaryProps = withErrorBoundaryProps; exports.createSearchParams = createSearchParams; exports.createBrowserRouter = createBrowserRouter; exports.createHashRouter = createHashRouter; exports.BrowserRouter = BrowserRouter; exports.HashRouter = HashRouter; exports.HistoryRouter = HistoryRouter; exports.Link = Link; exports.NavLink = NavLink; exports.Form = Form; exports.ScrollRestoration = ScrollRestoration; exports.useLinkClickHandler = useLinkClickHandler; exports.useSearchParams = useSearchParams; exports.useSubmit = useSubmit; exports.useFormAction = useFormAction; exports.useFetcher = useFetcher; exports.useFetchers = useFetchers; exports.useScrollRestoration = useScrollRestoration; exports.useBeforeUnload = useBeforeUnload; exports.usePrompt = usePrompt; exports.useViewTransitionState = useViewTransitionState; exports.StaticRouter = StaticRouter; exports.StaticRouterProvider = StaticRouterProvider; exports.createStaticHandler = createStaticHandler2; exports.createStaticRouter = createStaticRouter;


/***/ }),

/***/ "./node_modules/react-router/dist/development/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-router/dist/development/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value: true})); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * react-router v7.8.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
"use client";













































var _chunkVC6RBZTRjs = __webpack_require__(/*! ./chunk-VC6RBZTR.js */ "./node_modules/react-router/dist/development/chunk-VC6RBZTR.js");























































































var _chunkEVX7OBGBjs = __webpack_require__(/*! ./chunk-EVX7OBGB.js */ "./node_modules/react-router/dist/development/chunk-EVX7OBGB.js");

// lib/dom/ssr/server.tsx
var _react = __webpack_require__(/*! react */ "react"); var React = _interopRequireWildcard(_react); var React2 = _interopRequireWildcard(_react); var React4 = _interopRequireWildcard(_react); var React5 = _interopRequireWildcard(_react);
function ServerRouter({
  context,
  url,
  nonce
}) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  let { manifest, routeModules, criticalCss, serverHandoffString } = context;
  let routes = _chunkEVX7OBGBjs.createServerRoutes.call(void 0, 
    manifest.routes,
    routeModules,
    context.future,
    context.isSpaMode
  );
  context.staticHandlerContext.loaderData = {
    ...context.staticHandlerContext.loaderData
  };
  for (let match of context.staticHandlerContext.matches) {
    let routeId = match.route.id;
    let route = routeModules[routeId];
    let manifestRoute = context.manifest.routes[routeId];
    if (route && manifestRoute && _chunkEVX7OBGBjs.shouldHydrateRouteLoader.call(void 0, 
      routeId,
      route.clientLoader,
      manifestRoute.hasLoader,
      context.isSpaMode
    ) && (route.HydrateFallback || !manifestRoute.hasLoader)) {
      delete context.staticHandlerContext.loaderData[routeId];
    }
  }
  let router = _chunkVC6RBZTRjs.createStaticRouter.call(void 0, routes, context.staticHandlerContext);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    _chunkEVX7OBGBjs.FrameworkContext.Provider,
    {
      value: {
        manifest,
        routeModules,
        criticalCss,
        serverHandoffString,
        future: context.future,
        ssr: context.ssr,
        isSpaMode: context.isSpaMode,
        routeDiscovery: context.routeDiscovery,
        serializeError: context.serializeError,
        renderMeta: context.renderMeta
      }
    },
    /* @__PURE__ */ React.createElement(_chunkEVX7OBGBjs.RemixErrorBoundary, { location: router.state.location }, /* @__PURE__ */ React.createElement(
      _chunkVC6RBZTRjs.StaticRouterProvider,
      {
        router,
        context: context.staticHandlerContext,
        hydrate: false
      }
    ))
  ), context.serverHandoffStream ? /* @__PURE__ */ React.createElement(React.Suspense, null, /* @__PURE__ */ React.createElement(
    _chunkEVX7OBGBjs.StreamTransfer,
    {
      context,
      identifier: 0,
      reader: context.serverHandoffStream.getReader(),
      textDecoder: new TextDecoder(),
      nonce
    }
  )) : null);
}

// lib/dom/ssr/routes-test-stub.tsx

function createRoutesStub(routes, _context) {
  return function RoutesTestStub({
    initialEntries,
    initialIndex,
    hydrationData,
    future
  }) {
    let routerRef = React2.useRef();
    let frameworkContextRef = React2.useRef();
    if (routerRef.current == null) {
      frameworkContextRef.current = {
        future: {
          unstable_subResourceIntegrity: _optionalChain([future, 'optionalAccess', _2 => _2.unstable_subResourceIntegrity]) === true,
          unstable_middleware: _optionalChain([future, 'optionalAccess', _3 => _3.unstable_middleware]) === true
        },
        manifest: {
          routes: {},
          entry: { imports: [], module: "" },
          url: "",
          version: ""
        },
        routeModules: {},
        ssr: false,
        isSpaMode: false,
        routeDiscovery: { mode: "lazy", manifestPath: "/__manifest" }
      };
      let patched = processRoutes(
        // @ts-expect-error `StubRouteObject` is stricter about `loader`/`action`
        // types compared to `AgnosticRouteObject`
        _chunkEVX7OBGBjs.convertRoutesToDataRoutes.call(void 0, routes, (r) => r),
        _context !== void 0 ? _context : _optionalChain([future, 'optionalAccess', _4 => _4.unstable_middleware]) ? new (0, _chunkEVX7OBGBjs.unstable_RouterContextProvider)() : {},
        frameworkContextRef.current.manifest,
        frameworkContextRef.current.routeModules
      );
      routerRef.current = _chunkVC6RBZTRjs.createMemoryRouter.call(void 0, patched, {
        initialEntries,
        initialIndex,
        hydrationData
      });
    }
    return /* @__PURE__ */ React2.createElement(_chunkEVX7OBGBjs.FrameworkContext.Provider, { value: frameworkContextRef.current }, /* @__PURE__ */ React2.createElement(_chunkVC6RBZTRjs.RouterProvider, { router: routerRef.current }));
  };
}
function processRoutes(routes, context, manifest, routeModules, parentId) {
  return routes.map((route) => {
    if (!route.id) {
      throw new Error(
        "Expected a route.id in react-router processRoutes() function"
      );
    }
    let newRoute = {
      id: route.id,
      path: route.path,
      index: route.index,
      Component: route.Component ? _chunkVC6RBZTRjs.withComponentProps.call(void 0, route.Component) : void 0,
      HydrateFallback: route.HydrateFallback ? _chunkVC6RBZTRjs.withHydrateFallbackProps.call(void 0, route.HydrateFallback) : void 0,
      ErrorBoundary: route.ErrorBoundary ? _chunkVC6RBZTRjs.withErrorBoundaryProps.call(void 0, route.ErrorBoundary) : void 0,
      action: route.action ? (args) => route.action({ ...args, context }) : void 0,
      loader: route.loader ? (args) => route.loader({ ...args, context }) : void 0,
      handle: route.handle,
      shouldRevalidate: route.shouldRevalidate
    };
    let entryRoute = {
      id: route.id,
      path: route.path,
      index: route.index,
      parentId,
      hasAction: route.action != null,
      hasLoader: route.loader != null,
      // When testing routes, you should be stubbing loader/action/middleware,
      // not trying to re-implement the full loader/clientLoader/SSR/hydration
      // flow. That is better tested via E2E tests.
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasErrorBoundary: route.ErrorBoundary != null,
      // any need for these?
      module: "build/stub-path-to-module.js",
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0
    };
    manifest.routes[newRoute.id] = entryRoute;
    routeModules[route.id] = {
      default: newRoute.Component || _chunkVC6RBZTRjs.Outlet,
      ErrorBoundary: newRoute.ErrorBoundary || void 0,
      handle: route.handle,
      links: route.links,
      meta: route.meta,
      shouldRevalidate: route.shouldRevalidate
    };
    if (route.children) {
      newRoute.children = processRoutes(
        route.children,
        context,
        manifest,
        routeModules,
        newRoute.id
      );
    }
    return newRoute;
  });
}

// lib/server-runtime/cookies.ts
var _cookie = __webpack_require__(/*! cookie */ "cookie");

// lib/server-runtime/crypto.ts
var encoder = /* @__PURE__ */ new TextEncoder();
var sign = async (value, secret) => {
  let data2 = encoder.encode(value);
  let key = await createKey(secret, ["sign"]);
  let signature = await crypto.subtle.sign("HMAC", key, data2);
  let hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(
    /=+$/,
    ""
  );
  return value + "." + hash;
};
var unsign = async (cookie, secret) => {
  let index = cookie.lastIndexOf(".");
  let value = cookie.slice(0, index);
  let hash = cookie.slice(index + 1);
  let data2 = encoder.encode(value);
  let key = await createKey(secret, ["verify"]);
  try {
    let signature = byteStringToUint8Array(atob(hash));
    let valid = await crypto.subtle.verify("HMAC", key, signature, data2);
    return valid ? value : false;
  } catch (error) {
    return false;
  }
};
var createKey = async (secret, usages) => crypto.subtle.importKey(
  "raw",
  encoder.encode(secret),
  { name: "HMAC", hash: "SHA-256" },
  false,
  usages
);
function byteStringToUint8Array(byteString) {
  let array = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    array[i] = byteString.charCodeAt(i);
  }
  return array;
}

// lib/server-runtime/cookies.ts
var createCookie = (name, cookieOptions = {}) => {
  let { secrets = [], ...options } = {
    path: "/",
    sameSite: "lax",
    ...cookieOptions
  };
  warnOnceAboutExpiresCookie(name, options.expires);
  return {
    get name() {
      return name;
    },
    get isSigned() {
      return secrets.length > 0;
    },
    get expires() {
      return typeof options.maxAge !== "undefined" ? new Date(Date.now() + options.maxAge * 1e3) : options.expires;
    },
    async parse(cookieHeader, parseOptions) {
      if (!cookieHeader) return null;
      let cookies = _cookie.parse.call(void 0, cookieHeader, { ...options, ...parseOptions });
      if (name in cookies) {
        let value = cookies[name];
        if (typeof value === "string" && value !== "") {
          let decoded = await decodeCookieValue(value, secrets);
          return decoded;
        } else {
          return "";
        }
      } else {
        return null;
      }
    },
    async serialize(value, serializeOptions) {
      return _cookie.serialize.call(void 0, 
        name,
        value === "" ? "" : await encodeCookieValue(value, secrets),
        {
          ...options,
          ...serializeOptions
        }
      );
    }
  };
};
var isCookie = (object) => {
  return object != null && typeof object.name === "string" && typeof object.isSigned === "boolean" && typeof object.parse === "function" && typeof object.serialize === "function";
};
async function encodeCookieValue(value, secrets) {
  let encoded = encodeData(value);
  if (secrets.length > 0) {
    encoded = await sign(encoded, secrets[0]);
  }
  return encoded;
}
async function decodeCookieValue(value, secrets) {
  if (secrets.length > 0) {
    for (let secret of secrets) {
      let unsignedValue = await unsign(value, secret);
      if (unsignedValue !== false) {
        return decodeData(unsignedValue);
      }
    }
    return null;
  }
  return decodeData(value);
}
function encodeData(value) {
  return btoa(myUnescape(encodeURIComponent(JSON.stringify(value))));
}
function decodeData(value) {
  try {
    return JSON.parse(decodeURIComponent(myEscape(atob(value))));
  } catch (error) {
    return {};
  }
}
function myEscape(value) {
  let str = value.toString();
  let result = "";
  let index = 0;
  let chr, code;
  while (index < str.length) {
    chr = str.charAt(index++);
    if (/[\w*+\-./@]/.exec(chr)) {
      result += chr;
    } else {
      code = chr.charCodeAt(0);
      if (code < 256) {
        result += "%" + hex(code, 2);
      } else {
        result += "%u" + hex(code, 4).toUpperCase();
      }
    }
  }
  return result;
}
function hex(code, length) {
  let result = code.toString(16);
  while (result.length < length) result = "0" + result;
  return result;
}
function myUnescape(value) {
  let str = value.toString();
  let result = "";
  let index = 0;
  let chr, part;
  while (index < str.length) {
    chr = str.charAt(index++);
    if (chr === "%") {
      if (str.charAt(index) === "u") {
        part = str.slice(index + 1, index + 5);
        if (/^[\da-f]{4}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 5;
          continue;
        }
      } else {
        part = str.slice(index, index + 2);
        if (/^[\da-f]{2}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 2;
          continue;
        }
      }
    }
    result += chr;
  }
  return result;
}
function warnOnceAboutExpiresCookie(name, expires) {
  _chunkEVX7OBGBjs.warnOnce.call(void 0, 
    !expires,
    `The "${name}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`
  );
}

// lib/server-runtime/entry.ts
function createEntryRouteModules(manifest) {
  return Object.keys(manifest).reduce((memo, routeId) => {
    let route = manifest[routeId];
    if (route) {
      memo[routeId] = route.module;
    }
    return memo;
  }, {});
}

// lib/server-runtime/mode.ts
var ServerMode = /* @__PURE__ */ ((ServerMode2) => {
  ServerMode2["Development"] = "development";
  ServerMode2["Production"] = "production";
  ServerMode2["Test"] = "test";
  return ServerMode2;
})(ServerMode || {});
function isServerMode(value) {
  return value === "development" /* Development */ || value === "production" /* Production */ || value === "test" /* Test */;
}

// lib/server-runtime/errors.ts
function sanitizeError(error, serverMode) {
  if (error instanceof Error && serverMode !== "development" /* Development */) {
    let sanitized = new Error("Unexpected Server Error");
    sanitized.stack = void 0;
    return sanitized;
  }
  return error;
}
function sanitizeErrors(errors, serverMode) {
  return Object.entries(errors).reduce((acc, [routeId, error]) => {
    return Object.assign(acc, { [routeId]: sanitizeError(error, serverMode) });
  }, {});
}
function serializeError(error, serverMode) {
  let sanitized = sanitizeError(error, serverMode);
  return {
    message: sanitized.message,
    stack: sanitized.stack
  };
}
function serializeErrors(errors, serverMode) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (_chunkEVX7OBGBjs.isRouteErrorResponse.call(void 0, val)) {
      serialized[key] = { ...val, __type: "RouteErrorResponse" };
    } else if (val instanceof Error) {
      let sanitized = sanitizeError(val, serverMode);
      serialized[key] = {
        message: sanitized.message,
        stack: sanitized.stack,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.  This will only apply
        // in dev mode since all production errors are sanitized to normal
        // Error instances
        ...sanitized.name !== "Error" ? {
          __subType: sanitized.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}

// lib/server-runtime/routeMatching.ts
function matchServerRoutes(routes, pathname, basename) {
  let matches = _chunkEVX7OBGBjs.matchRoutes.call(void 0, 
    routes,
    pathname,
    basename
  );
  if (!matches) return null;
  return matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route
  }));
}

// lib/server-runtime/data.ts
async function callRouteHandler(handler, args) {
  let result = await handler({
    request: stripRoutesParam(stripIndexParam2(args.request)),
    params: args.params,
    context: args.context
  });
  if (_chunkEVX7OBGBjs.isDataWithResponseInit.call(void 0, result) && result.init && result.init.status && _chunkEVX7OBGBjs.isRedirectStatusCode.call(void 0, result.init.status)) {
    throw new Response(null, result.init);
  }
  return result;
}
function stripIndexParam2(request) {
  let url = new URL(request.url);
  let indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue);
    }
  }
  for (let toKeep of indexValuesToKeep) {
    url.searchParams.append("index", toKeep);
  }
  let init = {
    method: request.method,
    body: request.body,
    headers: request.headers,
    signal: request.signal
  };
  if (init.body) {
    init.duplex = "half";
  }
  return new Request(url.href, init);
}
function stripRoutesParam(request) {
  let url = new URL(request.url);
  url.searchParams.delete("_routes");
  let init = {
    method: request.method,
    body: request.body,
    headers: request.headers,
    signal: request.signal
  };
  if (init.body) {
    init.duplex = "half";
  }
  return new Request(url.href, init);
}

// lib/server-runtime/invariant.ts
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    console.error(
      "The following error is a bug in React Router; please open an issue! https://github.com/remix-run/react-router/issues/new/choose"
    );
    throw new Error(message);
  }
}

// lib/server-runtime/dev.ts
var globalDevServerHooksKey = "__reactRouterDevServerHooks";
function setDevServerHooks(devServerHooks) {
  globalThis[globalDevServerHooksKey] = devServerHooks;
}
function getDevServerHooks() {
  return globalThis[globalDevServerHooksKey];
}
function getBuildTimeHeader(request, headerName) {
  if (typeof process !== "undefined") {
    try {
      if (_optionalChain([process, 'access', _5 => _5.env, 'optionalAccess', _6 => _6.IS_RR_BUILD_REQUEST]) === "yes") {
        return request.headers.get(headerName);
      }
    } catch (e) {
    }
  }
  return null;
}

// lib/server-runtime/routes.ts
function groupRoutesByParentId(manifest) {
  let routes = {};
  Object.values(manifest).forEach((route) => {
    if (route) {
      let parentId = route.parentId || "";
      if (!routes[parentId]) {
        routes[parentId] = [];
      }
      routes[parentId].push(route);
    }
  });
  return routes;
}
function createRoutes(manifest, parentId = "", routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => ({
    ...route,
    children: createRoutes(manifest, route.id, routesByParentId)
  }));
}
function createStaticHandlerDataRoutes(manifest, future, parentId = "", routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => {
    let commonRoute = {
      // Always include root due to default boundaries
      hasErrorBoundary: route.id === "root" || route.module.ErrorBoundary != null,
      id: route.id,
      path: route.path,
      unstable_middleware: route.module.unstable_middleware,
      // Need to use RR's version in the param typed here to permit the optional
      // context even though we know it'll always be provided in remix
      loader: route.module.loader ? async (args) => {
        let preRenderedData = getBuildTimeHeader(
          args.request,
          "X-React-Router-Prerender-Data"
        );
        if (preRenderedData != null) {
          let encoded = preRenderedData ? decodeURI(preRenderedData) : preRenderedData;
          invariant2(encoded, "Missing prerendered data for route");
          let uint8array = new TextEncoder().encode(encoded);
          let stream = new ReadableStream({
            start(controller) {
              controller.enqueue(uint8array);
              controller.close();
            }
          });
          let decoded = await _chunkEVX7OBGBjs.decodeViaTurboStream.call(void 0, stream, global);
          let data2 = decoded.value;
          if (data2 && _chunkEVX7OBGBjs.SingleFetchRedirectSymbol in data2) {
            let result = data2[_chunkEVX7OBGBjs.SingleFetchRedirectSymbol];
            let init = { status: result.status };
            if (result.reload) {
              throw _chunkEVX7OBGBjs.redirectDocument.call(void 0, result.redirect, init);
            } else if (result.replace) {
              throw _chunkEVX7OBGBjs.replace.call(void 0, result.redirect, init);
            } else {
              throw _chunkEVX7OBGBjs.redirect.call(void 0, result.redirect, init);
            }
          } else {
            invariant2(
              data2 && route.id in data2,
              "Unable to decode prerendered data"
            );
            let result = data2[route.id];
            invariant2(
              "data" in result,
              "Unable to process prerendered data"
            );
            return result.data;
          }
        }
        let val = await callRouteHandler(route.module.loader, args);
        return val;
      } : void 0,
      action: route.module.action ? (args) => callRouteHandler(route.module.action, args) : void 0,
      handle: route.module.handle
    };
    return route.index ? {
      index: true,
      ...commonRoute
    } : {
      caseSensitive: route.caseSensitive,
      children: createStaticHandlerDataRoutes(
        manifest,
        future,
        route.id,
        routesByParentId
      ),
      ...commonRoute
    };
  });
}

// lib/server-runtime/markup.ts
var ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}

// lib/server-runtime/serverHandoff.ts
function createServerHandoffString(serverHandoff) {
  return escapeHtml(JSON.stringify(serverHandoff));
}

// lib/server-runtime/headers.ts
var _setcookieparser = __webpack_require__(/*! set-cookie-parser */ "set-cookie-parser");
function getDocumentHeaders(context, build) {
  return getDocumentHeadersImpl(context, (m) => {
    let route = build.routes[m.route.id];
    invariant2(route, `Route with id "${m.route.id}" not found in build`);
    return route.module.headers;
  });
}
function getDocumentHeadersImpl(context, getRouteHeadersFn, _defaultHeaders) {
  let boundaryIdx = context.errors ? context.matches.findIndex((m) => context.errors[m.route.id]) : -1;
  let matches = boundaryIdx >= 0 ? context.matches.slice(0, boundaryIdx + 1) : context.matches;
  let errorHeaders;
  if (boundaryIdx >= 0) {
    let { actionHeaders, actionData, loaderHeaders, loaderData } = context;
    context.matches.slice(boundaryIdx).some((match) => {
      let id = match.route.id;
      if (actionHeaders[id] && (!actionData || !actionData.hasOwnProperty(id))) {
        errorHeaders = actionHeaders[id];
      } else if (loaderHeaders[id] && !loaderData.hasOwnProperty(id)) {
        errorHeaders = loaderHeaders[id];
      }
      return errorHeaders != null;
    });
  }
  const defaultHeaders = new Headers(_defaultHeaders);
  return matches.reduce((parentHeaders, match, idx) => {
    let { id } = match.route;
    let loaderHeaders = context.loaderHeaders[id] || new Headers();
    let actionHeaders = context.actionHeaders[id] || new Headers();
    let includeErrorHeaders = errorHeaders != null && idx === matches.length - 1;
    let includeErrorCookies = includeErrorHeaders && errorHeaders !== loaderHeaders && errorHeaders !== actionHeaders;
    let headersFn = getRouteHeadersFn(match);
    if (headersFn == null) {
      let headers2 = new Headers(parentHeaders);
      if (includeErrorCookies) {
        prependCookies(errorHeaders, headers2);
      }
      prependCookies(actionHeaders, headers2);
      prependCookies(loaderHeaders, headers2);
      return headers2;
    }
    let headers = new Headers(
      typeof headersFn === "function" ? headersFn({
        loaderHeaders,
        parentHeaders,
        actionHeaders,
        errorHeaders: includeErrorHeaders ? errorHeaders : void 0
      }) : headersFn
    );
    if (includeErrorCookies) {
      prependCookies(errorHeaders, headers);
    }
    prependCookies(actionHeaders, headers);
    prependCookies(loaderHeaders, headers);
    prependCookies(parentHeaders, headers);
    return headers;
  }, new Headers(defaultHeaders));
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get("Set-Cookie");
  if (parentSetCookieString) {
    let cookies = _setcookieparser.splitCookiesString.call(void 0, parentSetCookieString);
    let childCookies = new Set(childHeaders.getSetCookie());
    cookies.forEach((cookie) => {
      if (!childCookies.has(cookie)) {
        childHeaders.append("Set-Cookie", cookie);
      }
    });
  }
}

// lib/server-runtime/single-fetch.ts
var SERVER_NO_BODY_STATUS_CODES = /* @__PURE__ */ new Set([
  ..._chunkEVX7OBGBjs.NO_BODY_STATUS_CODES,
  304
]);
async function singleFetchAction(build, serverMode, staticHandler, request, handlerUrl, loadContext, handleError) {
  try {
    let handlerRequest = new Request(handlerUrl, {
      method: request.method,
      body: request.body,
      headers: request.headers,
      signal: request.signal,
      ...request.body ? { duplex: "half" } : void 0
    });
    let result = await staticHandler.query(handlerRequest, {
      requestContext: loadContext,
      skipLoaderErrorBubbling: true,
      skipRevalidation: true,
      unstable_generateMiddlewareResponse: build.future.unstable_middleware ? async (query) => {
        try {
          let innerResult = await query(handlerRequest);
          return handleQueryResult(innerResult);
        } catch (error) {
          return handleQueryError(error);
        }
      } : void 0
    });
    return handleQueryResult(result);
  } catch (error) {
    return handleQueryError(error);
  }
  function handleQueryResult(result) {
    if (!_chunkEVX7OBGBjs.isResponse.call(void 0, result)) {
      result = staticContextToResponse(result);
    }
    if (_chunkEVX7OBGBjs.isRedirectResponse.call(void 0, result)) {
      return generateSingleFetchResponse(request, build, serverMode, {
        result: getSingleFetchRedirect(
          result.status,
          result.headers,
          build.basename
        ),
        headers: result.headers,
        status: _chunkEVX7OBGBjs.SINGLE_FETCH_REDIRECT_STATUS
      });
    }
    return result;
  }
  function handleQueryError(error) {
    handleError(error);
    return generateSingleFetchResponse(request, build, serverMode, {
      result: { error },
      headers: new Headers(),
      status: 500
    });
  }
  function staticContextToResponse(context) {
    let headers = getDocumentHeaders(context, build);
    if (_chunkEVX7OBGBjs.isRedirectStatusCode.call(void 0, context.statusCode) && headers.has("Location")) {
      return generateSingleFetchResponse(request, build, serverMode, {
        result: getSingleFetchRedirect(
          context.statusCode,
          headers,
          build.basename
        ),
        headers,
        status: _chunkEVX7OBGBjs.SINGLE_FETCH_REDIRECT_STATUS
      });
    }
    if (context.errors) {
      Object.values(context.errors).forEach((err) => {
        if (!_chunkEVX7OBGBjs.isRouteErrorResponse.call(void 0, err) || err.error) {
          handleError(err);
        }
      });
      context.errors = sanitizeErrors(context.errors, serverMode);
    }
    let singleFetchResult;
    if (context.errors) {
      singleFetchResult = { error: Object.values(context.errors)[0] };
    } else {
      singleFetchResult = {
        data: Object.values(context.actionData || {})[0]
      };
    }
    return generateSingleFetchResponse(request, build, serverMode, {
      result: singleFetchResult,
      headers,
      status: context.statusCode
    });
  }
}
async function singleFetchLoaders(build, serverMode, staticHandler, request, handlerUrl, loadContext, handleError) {
  let routesParam = new URL(request.url).searchParams.get("_routes");
  let loadRouteIds = routesParam ? new Set(routesParam.split(",")) : null;
  try {
    let handlerRequest = new Request(handlerUrl, {
      headers: request.headers,
      signal: request.signal
    });
    let result = await staticHandler.query(handlerRequest, {
      requestContext: loadContext,
      filterMatchesToLoad: (m) => !loadRouteIds || loadRouteIds.has(m.route.id),
      skipLoaderErrorBubbling: true,
      unstable_generateMiddlewareResponse: build.future.unstable_middleware ? async (query) => {
        try {
          let innerResult = await query(handlerRequest);
          return handleQueryResult(innerResult);
        } catch (error) {
          return handleQueryError(error);
        }
      } : void 0
    });
    return handleQueryResult(result);
  } catch (error) {
    return handleQueryError(error);
  }
  function handleQueryResult(result) {
    let response = _chunkEVX7OBGBjs.isResponse.call(void 0, result) ? result : staticContextToResponse(result);
    if (_chunkEVX7OBGBjs.isRedirectResponse.call(void 0, response)) {
      return generateSingleFetchResponse(request, build, serverMode, {
        result: {
          [_chunkEVX7OBGBjs.SingleFetchRedirectSymbol]: getSingleFetchRedirect(
            response.status,
            response.headers,
            build.basename
          )
        },
        headers: response.headers,
        status: _chunkEVX7OBGBjs.SINGLE_FETCH_REDIRECT_STATUS
      });
    }
    return response;
  }
  function handleQueryError(error) {
    handleError(error);
    return generateSingleFetchResponse(request, build, serverMode, {
      result: { error },
      headers: new Headers(),
      status: 500
    });
  }
  function staticContextToResponse(context) {
    let headers = getDocumentHeaders(context, build);
    if (_chunkEVX7OBGBjs.isRedirectStatusCode.call(void 0, context.statusCode) && headers.has("Location")) {
      return generateSingleFetchResponse(request, build, serverMode, {
        result: {
          [_chunkEVX7OBGBjs.SingleFetchRedirectSymbol]: getSingleFetchRedirect(
            context.statusCode,
            headers,
            build.basename
          )
        },
        headers,
        status: _chunkEVX7OBGBjs.SINGLE_FETCH_REDIRECT_STATUS
      });
    }
    if (context.errors) {
      Object.values(context.errors).forEach((err) => {
        if (!_chunkEVX7OBGBjs.isRouteErrorResponse.call(void 0, err) || err.error) {
          handleError(err);
        }
      });
      context.errors = sanitizeErrors(context.errors, serverMode);
    }
    let results = {};
    let loadedMatches = new Set(
      context.matches.filter(
        (m) => loadRouteIds ? loadRouteIds.has(m.route.id) : m.route.loader != null
      ).map((m) => m.route.id)
    );
    if (context.errors) {
      for (let [id, error] of Object.entries(context.errors)) {
        results[id] = { error };
      }
    }
    for (let [id, data2] of Object.entries(context.loaderData)) {
      if (!(id in results) && loadedMatches.has(id)) {
        results[id] = { data: data2 };
      }
    }
    return generateSingleFetchResponse(request, build, serverMode, {
      result: results,
      headers,
      status: context.statusCode
    });
  }
}
function generateSingleFetchResponse(request, build, serverMode, {
  result,
  headers,
  status
}) {
  let resultHeaders = new Headers(headers);
  resultHeaders.set("X-Remix-Response", "yes");
  if (SERVER_NO_BODY_STATUS_CODES.has(status)) {
    return new Response(null, { status, headers: resultHeaders });
  }
  resultHeaders.set("Content-Type", "text/x-script");
  resultHeaders.delete("Content-Length");
  return new Response(
    encodeViaTurboStream(
      result,
      request.signal,
      build.entry.module.streamTimeout,
      serverMode
    ),
    {
      status: status || 200,
      headers: resultHeaders
    }
  );
}
function getSingleFetchRedirect(status, headers, basename) {
  let redirect2 = headers.get("Location");
  if (basename) {
    redirect2 = _chunkEVX7OBGBjs.stripBasename.call(void 0, redirect2, basename) || redirect2;
  }
  return {
    redirect: redirect2,
    status,
    revalidate: (
      // Technically X-Remix-Revalidate isn't needed here - that was an implementation
      // detail of ?_data requests as our way to tell the front end to revalidate when
      // we didn't have a response body to include that information in.
      // With single fetch, we tell the front end via this revalidate boolean field.
      // However, we're respecting it for now because it may be something folks have
      // used in their own responses
      // TODO(v3): Consider removing or making this official public API
      headers.has("X-Remix-Revalidate") || headers.has("Set-Cookie")
    ),
    reload: headers.has("X-Remix-Reload-Document"),
    replace: headers.has("X-Remix-Replace")
  };
}
function encodeViaTurboStream(data2, requestSignal, streamTimeout, serverMode) {
  let controller = new AbortController();
  let timeoutId = setTimeout(
    () => controller.abort(new Error("Server Timeout")),
    typeof streamTimeout === "number" ? streamTimeout : 4950
  );
  requestSignal.addEventListener("abort", () => clearTimeout(timeoutId));
  return _chunkEVX7OBGBjs.encode.call(void 0, data2, {
    signal: controller.signal,
    plugins: [
      (value) => {
        if (value instanceof Error) {
          let { name, message, stack } = serverMode === "production" /* Production */ ? sanitizeError(value, serverMode) : value;
          return ["SanitizedError", name, message, stack];
        }
        if (value instanceof _chunkEVX7OBGBjs.ErrorResponseImpl) {
          let { data: data3, status, statusText } = value;
          return ["ErrorResponse", data3, status, statusText];
        }
        if (value && typeof value === "object" && _chunkEVX7OBGBjs.SingleFetchRedirectSymbol in value) {
          return ["SingleFetchRedirect", value[_chunkEVX7OBGBjs.SingleFetchRedirectSymbol]];
        }
      }
    ],
    postPlugins: [
      (value) => {
        if (!value) return;
        if (typeof value !== "object") return;
        return [
          "SingleFetchClassInstance",
          Object.fromEntries(Object.entries(value))
        ];
      },
      () => ["SingleFetchFallback"]
    ]
  });
}

// lib/server-runtime/server.ts
function derive(build, mode) {
  let routes = createRoutes(build.routes);
  let dataRoutes = createStaticHandlerDataRoutes(build.routes, build.future);
  let serverMode = isServerMode(mode) ? mode : "production" /* Production */;
  let staticHandler = _chunkEVX7OBGBjs.createStaticHandler.call(void 0, dataRoutes, {
    basename: build.basename
  });
  let errorHandler = build.entry.module.handleError || ((error, { request }) => {
    if (serverMode !== "test" /* Test */ && !request.signal.aborted) {
      console.error(
        // @ts-expect-error This is "private" from users but intended for internal use
        _chunkEVX7OBGBjs.isRouteErrorResponse.call(void 0, error) && error.error ? error.error : error
      );
    }
  });
  return {
    routes,
    dataRoutes,
    serverMode,
    staticHandler,
    errorHandler
  };
}
var createRequestHandler = (build, mode) => {
  let _build;
  let routes;
  let serverMode;
  let staticHandler;
  let errorHandler;
  return async function requestHandler(request, initialContext) {
    _build = typeof build === "function" ? await build() : build;
    if (typeof build === "function") {
      let derived = derive(_build, mode);
      routes = derived.routes;
      serverMode = derived.serverMode;
      staticHandler = derived.staticHandler;
      errorHandler = derived.errorHandler;
    } else if (!routes || !serverMode || !staticHandler || !errorHandler) {
      let derived = derive(_build, mode);
      routes = derived.routes;
      serverMode = derived.serverMode;
      staticHandler = derived.staticHandler;
      errorHandler = derived.errorHandler;
    }
    let params = {};
    let loadContext;
    let handleError = (error) => {
      if (mode === "development" /* Development */) {
        _optionalChain([getDevServerHooks, 'call', _7 => _7(), 'optionalAccess', _8 => _8.processRequestError, 'optionalCall', _9 => _9(error)]);
      }
      errorHandler(error, {
        context: loadContext,
        params,
        request
      });
    };
    if (_build.future.unstable_middleware) {
      if (initialContext && !(initialContext instanceof _chunkEVX7OBGBjs.unstable_RouterContextProvider)) {
        let error = new Error(
          "Invalid `context` value provided to `handleRequest`. When middleware is enabled you must return an instance of `unstable_RouterContextProvider` from your `getLoadContext` function."
        );
        handleError(error);
        return returnLastResortErrorResponse(error, serverMode);
      }
      loadContext = initialContext || new (0, _chunkEVX7OBGBjs.unstable_RouterContextProvider)();
    } else {
      loadContext = initialContext || {};
    }
    let url = new URL(request.url);
    let normalizedBasename = _build.basename || "/";
    let normalizedPath = url.pathname;
    if (_chunkEVX7OBGBjs.stripBasename.call(void 0, normalizedPath, normalizedBasename) === "/_root.data") {
      normalizedPath = normalizedBasename;
    } else if (normalizedPath.endsWith(".data")) {
      normalizedPath = normalizedPath.replace(/\.data$/, "");
    }
    if (_chunkEVX7OBGBjs.stripBasename.call(void 0, normalizedPath, normalizedBasename) !== "/" && normalizedPath.endsWith("/")) {
      normalizedPath = normalizedPath.slice(0, -1);
    }
    let isSpaMode = getBuildTimeHeader(request, "X-React-Router-SPA-Mode") === "yes";
    if (!_build.ssr) {
      let decodedPath = decodeURI(normalizedPath);
      if (_build.prerender.length === 0) {
        isSpaMode = true;
      } else if (!_build.prerender.includes(decodedPath) && !_build.prerender.includes(decodedPath + "/")) {
        if (url.pathname.endsWith(".data")) {
          errorHandler(
            new (0, _chunkEVX7OBGBjs.ErrorResponseImpl)(
              404,
              "Not Found",
              `Refusing to SSR the path \`${decodedPath}\` because \`ssr:false\` is set and the path is not included in the \`prerender\` config, so in production the path will be a 404.`
            ),
            {
              context: loadContext,
              params,
              request
            }
          );
          return new Response("Not Found", {
            status: 404,
            statusText: "Not Found"
          });
        } else {
          isSpaMode = true;
        }
      }
    }
    let manifestUrl = _chunkEVX7OBGBjs.getManifestPath.call(void 0, 
      _build.routeDiscovery.manifestPath,
      normalizedBasename
    );
    if (url.pathname === manifestUrl) {
      try {
        let res = await handleManifestRequest(_build, routes, url);
        return res;
      } catch (e) {
        handleError(e);
        return new Response("Unknown Server Error", { status: 500 });
      }
    }
    let matches = matchServerRoutes(routes, normalizedPath, _build.basename);
    if (matches && matches.length > 0) {
      Object.assign(params, matches[0].params);
    }
    let response;
    if (url.pathname.endsWith(".data")) {
      let handlerUrl = new URL(request.url);
      handlerUrl.pathname = normalizedPath;
      let singleFetchMatches = matchServerRoutes(
        routes,
        handlerUrl.pathname,
        _build.basename
      );
      response = await handleSingleFetchRequest(
        serverMode,
        _build,
        staticHandler,
        request,
        handlerUrl,
        loadContext,
        handleError
      );
      if (_build.entry.module.handleDataRequest) {
        response = await _build.entry.module.handleDataRequest(response, {
          context: loadContext,
          params: singleFetchMatches ? singleFetchMatches[0].params : {},
          request
        });
        if (_chunkEVX7OBGBjs.isRedirectResponse.call(void 0, response)) {
          let result = getSingleFetchRedirect(
            response.status,
            response.headers,
            _build.basename
          );
          if (request.method === "GET") {
            result = {
              [_chunkEVX7OBGBjs.SingleFetchRedirectSymbol]: result
            };
          }
          let headers = new Headers(response.headers);
          headers.set("Content-Type", "text/x-script");
          return new Response(
            encodeViaTurboStream(
              result,
              request.signal,
              _build.entry.module.streamTimeout,
              serverMode
            ),
            {
              status: _chunkEVX7OBGBjs.SINGLE_FETCH_REDIRECT_STATUS,
              headers
            }
          );
        }
      }
    } else if (!isSpaMode && matches && matches[matches.length - 1].route.module.default == null && matches[matches.length - 1].route.module.ErrorBoundary == null) {
      response = await handleResourceRequest(
        serverMode,
        _build,
        staticHandler,
        matches.slice(-1)[0].route.id,
        request,
        loadContext,
        handleError
      );
    } else {
      let { pathname } = url;
      let criticalCss = void 0;
      if (_build.unstable_getCriticalCss) {
        criticalCss = await _build.unstable_getCriticalCss({ pathname });
      } else if (mode === "development" /* Development */ && _optionalChain([getDevServerHooks, 'call', _10 => _10(), 'optionalAccess', _11 => _11.getCriticalCss])) {
        criticalCss = await _optionalChain([getDevServerHooks, 'call', _12 => _12(), 'optionalAccess', _13 => _13.getCriticalCss, 'optionalCall', _14 => _14(pathname)]);
      }
      response = await handleDocumentRequest(
        serverMode,
        _build,
        staticHandler,
        request,
        loadContext,
        handleError,
        isSpaMode,
        criticalCss
      );
    }
    if (request.method === "HEAD") {
      return new Response(null, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText
      });
    }
    return response;
  };
};
async function handleManifestRequest(build, routes, url) {
  if (build.assets.version !== url.searchParams.get("version")) {
    return new Response(null, {
      status: 204,
      headers: {
        "X-Remix-Reload-Document": "true"
      }
    });
  }
  let patches = {};
  if (url.searchParams.has("p")) {
    let paths = /* @__PURE__ */ new Set();
    url.searchParams.getAll("p").forEach((path) => {
      if (!path.startsWith("/")) {
        path = `/${path}`;
      }
      let segments = path.split("/").slice(1);
      segments.forEach((_, i) => {
        let partialPath = segments.slice(0, i + 1).join("/");
        paths.add(`/${partialPath}`);
      });
    });
    for (let path of paths) {
      let matches = matchServerRoutes(routes, path, build.basename);
      if (matches) {
        for (let match of matches) {
          let routeId = match.route.id;
          let route = build.assets.routes[routeId];
          if (route) {
            patches[routeId] = route;
          }
        }
      }
    }
    return Response.json(patches, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  }
  return new Response("Invalid Request", { status: 400 });
}
async function handleSingleFetchRequest(serverMode, build, staticHandler, request, handlerUrl, loadContext, handleError) {
  let response = request.method !== "GET" ? await singleFetchAction(
    build,
    serverMode,
    staticHandler,
    request,
    handlerUrl,
    loadContext,
    handleError
  ) : await singleFetchLoaders(
    build,
    serverMode,
    staticHandler,
    request,
    handlerUrl,
    loadContext,
    handleError
  );
  return response;
}
async function handleDocumentRequest(serverMode, build, staticHandler, request, loadContext, handleError, isSpaMode, criticalCss) {
  try {
    let result = await staticHandler.query(request, {
      requestContext: loadContext,
      unstable_generateMiddlewareResponse: build.future.unstable_middleware ? async (query) => {
        try {
          let innerResult = await query(request);
          if (!_chunkEVX7OBGBjs.isResponse.call(void 0, innerResult)) {
            innerResult = await renderHtml(innerResult, isSpaMode);
          }
          return innerResult;
        } catch (error) {
          handleError(error);
          return new Response(null, { status: 500 });
        }
      } : void 0
    });
    if (!_chunkEVX7OBGBjs.isResponse.call(void 0, result)) {
      result = await renderHtml(result, isSpaMode);
    }
    return result;
  } catch (error) {
    handleError(error);
    return new Response(null, { status: 500 });
  }
  async function renderHtml(context, isSpaMode2) {
    let headers = getDocumentHeaders(context, build);
    if (SERVER_NO_BODY_STATUS_CODES.has(context.statusCode)) {
      return new Response(null, { status: context.statusCode, headers });
    }
    if (context.errors) {
      Object.values(context.errors).forEach((err) => {
        if (!_chunkEVX7OBGBjs.isRouteErrorResponse.call(void 0, err) || err.error) {
          handleError(err);
        }
      });
      context.errors = sanitizeErrors(context.errors, serverMode);
    }
    let state = {
      loaderData: context.loaderData,
      actionData: context.actionData,
      errors: serializeErrors(context.errors, serverMode)
    };
    let baseServerHandoff = {
      basename: build.basename,
      future: build.future,
      routeDiscovery: build.routeDiscovery,
      ssr: build.ssr,
      isSpaMode: isSpaMode2
    };
    let entryContext = {
      manifest: build.assets,
      routeModules: createEntryRouteModules(build.routes),
      staticHandlerContext: context,
      criticalCss,
      serverHandoffString: createServerHandoffString({
        ...baseServerHandoff,
        criticalCss
      }),
      serverHandoffStream: encodeViaTurboStream(
        state,
        request.signal,
        build.entry.module.streamTimeout,
        serverMode
      ),
      renderMeta: {},
      future: build.future,
      ssr: build.ssr,
      routeDiscovery: build.routeDiscovery,
      isSpaMode: isSpaMode2,
      serializeError: (err) => serializeError(err, serverMode)
    };
    let handleDocumentRequestFunction = build.entry.module.default;
    try {
      return await handleDocumentRequestFunction(
        request,
        context.statusCode,
        headers,
        entryContext,
        loadContext
      );
    } catch (error) {
      handleError(error);
      let errorForSecondRender = error;
      if (_chunkEVX7OBGBjs.isResponse.call(void 0, error)) {
        try {
          let data2 = await unwrapResponse(error);
          errorForSecondRender = new (0, _chunkEVX7OBGBjs.ErrorResponseImpl)(
            error.status,
            error.statusText,
            data2
          );
        } catch (e) {
        }
      }
      context = _chunkEVX7OBGBjs.getStaticContextFromError.call(void 0, 
        staticHandler.dataRoutes,
        context,
        errorForSecondRender
      );
      if (context.errors) {
        context.errors = sanitizeErrors(context.errors, serverMode);
      }
      let state2 = {
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: serializeErrors(context.errors, serverMode)
      };
      entryContext = {
        ...entryContext,
        staticHandlerContext: context,
        serverHandoffString: createServerHandoffString(baseServerHandoff),
        serverHandoffStream: encodeViaTurboStream(
          state2,
          request.signal,
          build.entry.module.streamTimeout,
          serverMode
        ),
        renderMeta: {}
      };
      try {
        return await handleDocumentRequestFunction(
          request,
          context.statusCode,
          headers,
          entryContext,
          loadContext
        );
      } catch (error2) {
        handleError(error2);
        return returnLastResortErrorResponse(error2, serverMode);
      }
    }
  }
}
async function handleResourceRequest(serverMode, build, staticHandler, routeId, request, loadContext, handleError) {
  try {
    let result = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext,
      unstable_generateMiddlewareResponse: build.future.unstable_middleware ? async (queryRoute) => {
        try {
          let innerResult = await queryRoute(request);
          return handleQueryRouteResult(innerResult);
        } catch (error) {
          return handleQueryRouteError(error);
        }
      } : void 0
    });
    return handleQueryRouteResult(result);
  } catch (error) {
    return handleQueryRouteError(error);
  }
  function handleQueryRouteResult(result) {
    if (_chunkEVX7OBGBjs.isResponse.call(void 0, result)) {
      return result;
    }
    if (typeof result === "string") {
      return new Response(result);
    }
    return Response.json(result);
  }
  function handleQueryRouteError(error) {
    if (_chunkEVX7OBGBjs.isResponse.call(void 0, error)) {
      error.headers.set("X-Remix-Catch", "yes");
      return error;
    }
    if (_chunkEVX7OBGBjs.isRouteErrorResponse.call(void 0, error)) {
      handleError(error);
      return errorResponseToJson(error, serverMode);
    }
    if (error instanceof Error && error.message === "Expected a response from queryRoute") {
      let newError = new Error(
        "Expected a Response to be returned from resource route handler"
      );
      handleError(newError);
      return returnLastResortErrorResponse(newError, serverMode);
    }
    handleError(error);
    return returnLastResortErrorResponse(error, serverMode);
  }
}
function errorResponseToJson(errorResponse, serverMode) {
  return Response.json(
    serializeError(
      // @ts-expect-error This is "private" from users but intended for internal use
      errorResponse.error || new Error("Unexpected Server Error"),
      serverMode
    ),
    {
      status: errorResponse.status,
      statusText: errorResponse.statusText,
      headers: {
        "X-Remix-Error": "yes"
      }
    }
  );
}
function returnLastResortErrorResponse(error, serverMode) {
  let message = "Unexpected Server Error";
  if (serverMode !== "production" /* Production */) {
    message += `

${String(error)}`;
  }
  return new Response(message, {
    status: 500,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
function unwrapResponse(response) {
  let contentType = response.headers.get("Content-Type");
  return contentType && /\bapplication\/json\b/.test(contentType) ? response.body == null ? null : response.json() : response.text();
}

// lib/server-runtime/sessions.ts
function flash(name) {
  return `__flash_${name}__`;
}
var createSession = (initialData = {}, id = "") => {
  let map = new Map(Object.entries(initialData));
  return {
    get id() {
      return id;
    },
    get data() {
      return Object.fromEntries(map);
    },
    has(name) {
      return map.has(name) || map.has(flash(name));
    },
    get(name) {
      if (map.has(name)) return map.get(name);
      let flashName = flash(name);
      if (map.has(flashName)) {
        let value = map.get(flashName);
        map.delete(flashName);
        return value;
      }
      return void 0;
    },
    set(name, value) {
      map.set(name, value);
    },
    flash(name, value) {
      map.set(flash(name), value);
    },
    unset(name) {
      map.delete(name);
    }
  };
};
var isSession = (object) => {
  return object != null && typeof object.id === "string" && typeof object.data !== "undefined" && typeof object.has === "function" && typeof object.get === "function" && typeof object.set === "function" && typeof object.flash === "function" && typeof object.unset === "function";
};
function createSessionStorage({
  cookie: cookieArg,
  createData,
  readData,
  updateData,
  deleteData
}) {
  let cookie = isCookie(cookieArg) ? cookieArg : createCookie(_optionalChain([cookieArg, 'optionalAccess', _15 => _15.name]) || "__session", cookieArg);
  warnOnceAboutSigningSessionCookie(cookie);
  return {
    async getSession(cookieHeader, options) {
      let id = cookieHeader && await cookie.parse(cookieHeader, options);
      let data2 = id && await readData(id);
      return createSession(data2 || {}, id || "");
    },
    async commitSession(session, options) {
      let { id, data: data2 } = session;
      let expires = _optionalChain([options, 'optionalAccess', _16 => _16.maxAge]) != null ? new Date(Date.now() + options.maxAge * 1e3) : _optionalChain([options, 'optionalAccess', _17 => _17.expires]) != null ? options.expires : cookie.expires;
      if (id) {
        await updateData(id, data2, expires);
      } else {
        id = await createData(data2, expires);
      }
      return cookie.serialize(id, options);
    },
    async destroySession(session, options) {
      await deleteData(session.id);
      return cookie.serialize("", {
        ...options,
        maxAge: void 0,
        expires: /* @__PURE__ */ new Date(0)
      });
    }
  };
}
function warnOnceAboutSigningSessionCookie(cookie) {
  _chunkEVX7OBGBjs.warnOnce.call(void 0, 
    cookie.isSigned,
    `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://reactrouter.com/explanation/sessions-and-cookies#signing-cookies for more information.`
  );
}

// lib/server-runtime/sessions/cookieStorage.ts
function createCookieSessionStorage({ cookie: cookieArg } = {}) {
  let cookie = isCookie(cookieArg) ? cookieArg : createCookie(_optionalChain([cookieArg, 'optionalAccess', _18 => _18.name]) || "__session", cookieArg);
  warnOnceAboutSigningSessionCookie(cookie);
  return {
    async getSession(cookieHeader, options) {
      return createSession(
        cookieHeader && await cookie.parse(cookieHeader, options) || {}
      );
    },
    async commitSession(session, options) {
      let serializedCookie = await cookie.serialize(session.data, options);
      if (serializedCookie.length > 4096) {
        throw new Error(
          "Cookie length will exceed browser maximum. Length: " + serializedCookie.length
        );
      }
      return serializedCookie;
    },
    async destroySession(_session, options) {
      return cookie.serialize("", {
        ...options,
        maxAge: void 0,
        expires: /* @__PURE__ */ new Date(0)
      });
    }
  };
}

// lib/server-runtime/sessions/memoryStorage.ts
function createMemorySessionStorage({ cookie } = {}) {
  let map = /* @__PURE__ */ new Map();
  return createSessionStorage({
    cookie,
    async createData(data2, expires) {
      let id = Math.random().toString(36).substring(2, 10);
      map.set(id, { data: data2, expires });
      return id;
    },
    async readData(id) {
      if (map.has(id)) {
        let { data: data2, expires } = map.get(id);
        if (!expires || expires > /* @__PURE__ */ new Date()) {
          return data2;
        }
        if (expires) map.delete(id);
      }
      return null;
    },
    async updateData(id, data2, expires) {
      map.set(id, { data: data2, expires });
    },
    async deleteData(id) {
      map.delete(id);
    }
  });
}

// lib/href.ts
function href(path, ...args) {
  let params = args[0];
  return path.split("/").map((segment) => {
    if (segment === "*") {
      return params ? params["*"] : void 0;
    }
    const match = segment.match(/^:([\w-]+)(\?)?/);
    if (!match) return segment;
    const param = match[1];
    const value = params ? params[param] : void 0;
    const isRequired = match[2] === void 0;
    if (isRequired && value === void 0) {
      throw Error(
        `Path '${path}' requires param '${param}' but it was not provided`
      );
    }
    return value;
  }).filter((segment) => segment !== void 0).join("/");
}

// lib/rsc/browser.tsx

var _reactdom = __webpack_require__(/*! react-dom */ "react-dom"); var ReactDOM = _interopRequireWildcard(_reactdom);

// lib/dom/ssr/hydration.tsx
function getHydrationData(state, routes, getRouteInfo, location2, basename, isSpaMode) {
  let hydrationData = {
    ...state,
    loaderData: { ...state.loaderData }
  };
  let initialMatches = _chunkEVX7OBGBjs.matchRoutes.call(void 0, routes, location2, basename);
  if (initialMatches) {
    for (let match of initialMatches) {
      let routeId = match.route.id;
      let routeInfo = getRouteInfo(routeId);
      if (_chunkEVX7OBGBjs.shouldHydrateRouteLoader.call(void 0, 
        routeId,
        routeInfo.clientLoader,
        routeInfo.hasLoader,
        isSpaMode
      ) && (routeInfo.hasHydrateFallback || !routeInfo.hasLoader)) {
        delete hydrationData.loaderData[routeId];
      } else if (!routeInfo.hasLoader) {
        hydrationData.loaderData[routeId] = null;
      }
    }
  }
  return hydrationData;
}

// lib/rsc/errorBoundaries.tsx

var RSCRouterGlobalErrorBoundary = class extends React.default.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, location: props.location };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return { error: null, location: props.location };
    }
    return { error: state.error, location: state.location };
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ React.default.createElement(
        RSCDefaultRootErrorBoundaryImpl,
        {
          error: this.state.error,
          renderAppShell: true
        }
      );
    } else {
      return this.props.children;
    }
  }
};
function ErrorWrapper({
  renderAppShell,
  title,
  children
}) {
  if (!renderAppShell) {
    return children;
  }
  return /* @__PURE__ */ React.default.createElement("html", { lang: "en" }, /* @__PURE__ */ React.default.createElement("head", null, /* @__PURE__ */ React.default.createElement("meta", { charSet: "utf-8" }), /* @__PURE__ */ React.default.createElement(
    "meta",
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,viewport-fit=cover"
    }
  ), /* @__PURE__ */ React.default.createElement("title", null, title)), /* @__PURE__ */ React.default.createElement("body", null, /* @__PURE__ */ React.default.createElement("main", { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } }, children)));
}
function RSCDefaultRootErrorBoundaryImpl({
  error,
  renderAppShell
}) {
  console.error(error);
  let heyDeveloper = /* @__PURE__ */ React.default.createElement(
    "script",
    {
      dangerouslySetInnerHTML: {
        __html: `
        console.log(
          "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."
        );
      `
      }
    }
  );
  if (_chunkEVX7OBGBjs.isRouteErrorResponse.call(void 0, error)) {
    return /* @__PURE__ */ React.default.createElement(
      ErrorWrapper,
      {
        renderAppShell,
        title: "Unhandled Thrown Response!"
      },
      /* @__PURE__ */ React.default.createElement("h1", { style: { fontSize: "24px" } }, error.status, " ", error.statusText),
      _chunkEVX7OBGBjs.ENABLE_DEV_WARNINGS ? heyDeveloper : null
    );
  }
  let errorInstance;
  if (error instanceof Error) {
    errorInstance = error;
  } else {
    let errorString = error == null ? "Unknown Error" : typeof error === "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ React.default.createElement(ErrorWrapper, { renderAppShell, title: "Application Error!" }, /* @__PURE__ */ React.default.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"), /* @__PURE__ */ React.default.createElement(
    "pre",
    {
      style: {
        padding: "2rem",
        background: "hsla(10, 50%, 50%, 0.1)",
        color: "red",
        overflow: "auto"
      }
    },
    errorInstance.stack
  ), heyDeveloper);
}
function RSCDefaultRootErrorBoundary({
  hasRootLayout
}) {
  let error = _chunkEVX7OBGBjs.useRouteError.call(void 0, );
  if (hasRootLayout === void 0) {
    throw new Error("Missing 'hasRootLayout' prop");
  }
  return /* @__PURE__ */ React.default.createElement(
    RSCDefaultRootErrorBoundaryImpl,
    {
      renderAppShell: !hasRootLayout,
      error
    }
  );
}

// lib/rsc/browser.tsx
function createCallServer({
  createFromReadableStream,
  createTemporaryReferenceSet,
  encodeReply,
  fetch: fetchImplementation = fetch
}) {
  const globalVar = window;
  let landedActionId = 0;
  return async (id, args) => {
    let actionId = globalVar.__routerActionID = (_nullishCoalesce(globalVar.__routerActionID, () => ( (globalVar.__routerActionID = 0)))) + 1;
    const temporaryReferences = createTemporaryReferenceSet();
    const response = await fetchImplementation(
      new Request(location.href, {
        body: await encodeReply(args, { temporaryReferences }),
        method: "POST",
        headers: {
          Accept: "text/x-component",
          "rsc-action-id": id
        }
      })
    );
    if (!response.body) {
      throw new Error("No response body");
    }
    const payload = await createFromReadableStream(response.body, {
      temporaryReferences
    });
    if (payload.type === "redirect") {
      if (payload.reload) {
        window.location.href = payload.location;
        return;
      }
      globalVar.__router.navigate(payload.location, {
        replace: payload.replace
      });
      return payload.actionResult;
    }
    if (payload.type !== "action") {
      throw new Error("Unexpected payload type");
    }
    if (payload.rerender) {
      React4.startTransition(
        // @ts-expect-error - We have old react types that don't know this can be async
        async () => {
          const rerender = await payload.rerender;
          if (!rerender) return;
          if (landedActionId < actionId && globalVar.__routerActionID <= actionId) {
            landedActionId = actionId;
            if (rerender.type === "redirect") {
              if (rerender.reload) {
                window.location.href = rerender.location;
                return;
              }
              globalVar.__router.navigate(rerender.location, {
                replace: rerender.replace
              });
              return;
            }
            let lastMatch;
            for (const match of rerender.matches) {
              globalVar.__router.patchRoutes(
                _nullishCoalesce(_optionalChain([lastMatch, 'optionalAccess', _19 => _19.id]), () => ( null)),
                [createRouteFromServerManifest(match)],
                true
              );
              lastMatch = match;
            }
            window.__router._internalSetStateDoNotUseOrYouWillBreakYourApp({});
            React4.startTransition(() => {
              window.__router._internalSetStateDoNotUseOrYouWillBreakYourApp({
                loaderData: Object.assign(
                  {},
                  globalVar.__router.state.loaderData,
                  rerender.loaderData
                ),
                errors: rerender.errors ? Object.assign(
                  {},
                  globalVar.__router.state.errors,
                  rerender.errors
                ) : null
              });
            });
          }
        }
      );
    }
    return payload.actionResult;
  };
}
function createRouterFromPayload({
  fetchImplementation,
  createFromReadableStream,
  unstable_getContext,
  payload
}) {
  const globalVar = window;
  if (globalVar.__router) return globalVar.__router;
  if (payload.type !== "render") throw new Error("Invalid payload type");
  let patches = /* @__PURE__ */ new Map();
  _optionalChain([payload, 'access', _20 => _20.patches, 'optionalAccess', _21 => _21.forEach, 'call', _22 => _22((patch) => {
    _chunkEVX7OBGBjs.invariant.call(void 0, patch.parentId, "Invalid patch parentId");
    if (!patches.has(patch.parentId)) {
      patches.set(patch.parentId, []);
    }
    _optionalChain([patches, 'access', _23 => _23.get, 'call', _24 => _24(patch.parentId), 'optionalAccess', _25 => _25.push, 'call', _26 => _26(patch)]);
  })]);
  let routes = payload.matches.reduceRight((previous, match) => {
    const route = createRouteFromServerManifest(
      match,
      payload
    );
    if (previous.length > 0) {
      route.children = previous;
      let childrenToPatch = patches.get(match.id);
      if (childrenToPatch) {
        route.children.push(
          ...childrenToPatch.map((r) => createRouteFromServerManifest(r))
        );
      }
    }
    return [route];
  }, []);
  globalVar.__router = _chunkEVX7OBGBjs.createRouter.call(void 0, {
    routes,
    unstable_getContext,
    basename: payload.basename,
    history: _chunkEVX7OBGBjs.createBrowserHistory.call(void 0, ),
    hydrationData: getHydrationData(
      {
        loaderData: payload.loaderData,
        actionData: payload.actionData,
        errors: payload.errors
      },
      routes,
      (routeId) => {
        let match = payload.matches.find((m) => m.id === routeId);
        _chunkEVX7OBGBjs.invariant.call(void 0, match, "Route not found in payload");
        return {
          clientLoader: match.clientLoader,
          hasLoader: match.hasLoader,
          hasHydrateFallback: match.hydrateFallbackElement != null
        };
      },
      payload.location,
      void 0,
      false
    ),
    async patchRoutesOnNavigation({ path, signal }) {
      if (discoveredPaths.has(path)) {
        return;
      }
      await fetchAndApplyManifestPatches(
        [path],
        createFromReadableStream,
        fetchImplementation,
        signal
      );
    },
    // FIXME: Pass `build.ssr` into this function
    dataStrategy: getRSCSingleFetchDataStrategy(
      () => globalVar.__router,
      true,
      payload.basename,
      createFromReadableStream,
      fetchImplementation
    )
  });
  if (globalVar.__router.state.initialized) {
    globalVar.__routerInitialized = true;
    globalVar.__router.initialize();
  } else {
    globalVar.__routerInitialized = false;
  }
  let lastLoaderData = void 0;
  globalVar.__router.subscribe(({ loaderData, actionData }) => {
    if (lastLoaderData !== loaderData) {
      globalVar.__routerActionID = (_nullishCoalesce(globalVar.__routerActionID, () => ( (globalVar.__routerActionID = 0)))) + 1;
    }
  });
  return globalVar.__router;
}
var renderedRoutesContext = _chunkEVX7OBGBjs.unstable_createContext.call(void 0, );
function getRSCSingleFetchDataStrategy(getRouter, ssr, basename, createFromReadableStream, fetchImplementation) {
  let dataStrategy = _chunkEVX7OBGBjs.getSingleFetchDataStrategyImpl.call(void 0, 
    getRouter,
    (match) => {
      let M = match;
      return {
        hasLoader: M.route.hasLoader,
        hasClientLoader: M.route.hasClientLoader,
        hasComponent: M.route.hasComponent,
        hasAction: M.route.hasAction,
        hasClientAction: M.route.hasClientAction,
        hasShouldRevalidate: M.route.hasShouldRevalidate
      };
    },
    // pass map into fetchAndDecode so it can add payloads
    getFetchAndDecodeViaRSC(createFromReadableStream, fetchImplementation),
    ssr,
    basename,
    // If the route has a component but we don't have an element, we need to hit
    // the server loader flow regardless of whether the client loader calls
    // `serverLoader` or not, otherwise we'll have nothing to render.
    (match) => {
      let M = match;
      return M.route.hasComponent && !M.route.element;
    }
  );
  return async (args) => args.unstable_runClientMiddleware(async () => {
    let context = args.context;
    context.set(renderedRoutesContext, []);
    let results = await dataStrategy(args);
    const renderedRoutesById = /* @__PURE__ */ new Map();
    for (const route of context.get(renderedRoutesContext)) {
      if (!renderedRoutesById.has(route.id)) {
        renderedRoutesById.set(route.id, []);
      }
      renderedRoutesById.get(route.id).push(route);
    }
    for (const match of args.matches) {
      const renderedRoutes = renderedRoutesById.get(match.route.id);
      if (renderedRoutes) {
        for (const rendered of renderedRoutes) {
          window.__router.patchRoutes(
            _nullishCoalesce(rendered.parentId, () => ( null)),
            [createRouteFromServerManifest(rendered)],
            true
          );
        }
      }
    }
    return results;
  });
}
function getFetchAndDecodeViaRSC(createFromReadableStream, fetchImplementation) {
  return async (args, basename, targetRoutes) => {
    let { request, context } = args;
    let url = _chunkEVX7OBGBjs.singleFetchUrl.call(void 0, request.url, basename, "rsc");
    if (request.method === "GET") {
      url = _chunkEVX7OBGBjs.stripIndexParam.call(void 0, url);
      if (targetRoutes) {
        url.searchParams.set("_routes", targetRoutes.join(","));
      }
    }
    let res = await fetchImplementation(
      new Request(url, await _chunkEVX7OBGBjs.createRequestInit.call(void 0, request))
    );
    if (res.status === 404 && !res.headers.has("X-Remix-Response")) {
      throw new (0, _chunkEVX7OBGBjs.ErrorResponseImpl)(404, "Not Found", true);
    }
    _chunkEVX7OBGBjs.invariant.call(void 0, res.body, "No response body to decode");
    try {
      const payload = await createFromReadableStream(res.body, {
        temporaryReferences: void 0
      });
      if (payload.type === "redirect") {
        return {
          status: res.status,
          data: {
            redirect: {
              redirect: payload.location,
              reload: payload.reload,
              replace: payload.replace,
              revalidate: false,
              status: payload.status
            }
          }
        };
      }
      if (payload.type !== "render") {
        throw new Error("Unexpected payload type");
      }
      context.get(renderedRoutesContext).push(...payload.matches);
      let results = { routes: {} };
      const dataKey = _chunkEVX7OBGBjs.isMutationMethod.call(void 0, request.method) ? "actionData" : "loaderData";
      for (let [routeId, data2] of Object.entries(payload[dataKey] || {})) {
        results.routes[routeId] = { data: data2 };
      }
      if (payload.errors) {
        for (let [routeId, error] of Object.entries(payload.errors)) {
          results.routes[routeId] = { error };
        }
      }
      return { status: res.status, data: results };
    } catch (e) {
      throw new Error("Unable to decode RSC response");
    }
  };
}
function RSCHydratedRouter({
  createFromReadableStream,
  fetch: fetchImplementation = fetch,
  payload,
  routeDiscovery = "eager",
  unstable_getContext
}) {
  if (payload.type !== "render") throw new Error("Invalid payload type");
  let router = React4.useMemo(
    () => createRouterFromPayload({
      payload,
      fetchImplementation,
      unstable_getContext,
      createFromReadableStream
    }),
    [
      createFromReadableStream,
      payload,
      fetchImplementation,
      unstable_getContext
    ]
  );
  React4.useLayoutEffect(() => {
    const globalVar = window;
    if (!globalVar.__routerInitialized) {
      globalVar.__routerInitialized = true;
      globalVar.__router.initialize();
    }
  }, []);
  let [location2, setLocation] = React4.useState(router.state.location);
  React4.useLayoutEffect(
    () => router.subscribe((newState) => {
      if (newState.location !== location2) {
        setLocation(newState.location);
      }
    }),
    [router, location2]
  );
  React4.useEffect(() => {
    if (routeDiscovery === "lazy" || // @ts-expect-error - TS doesn't know about this yet
    _optionalChain([window, 'access', _27 => _27.navigator, 'optionalAccess', _28 => _28.connection, 'optionalAccess', _29 => _29.saveData]) === true) {
      return;
    }
    function registerElement(el) {
      let path = el.tagName === "FORM" ? el.getAttribute("action") : el.getAttribute("href");
      if (!path) {
        return;
      }
      let pathname = el.tagName === "A" ? el.pathname : new URL(path, window.location.origin).pathname;
      if (!discoveredPaths.has(pathname)) {
        nextPaths.add(pathname);
      }
    }
    async function fetchPatches() {
      document.querySelectorAll("a[data-discover], form[data-discover]").forEach(registerElement);
      let paths = Array.from(nextPaths.keys()).filter((path) => {
        if (discoveredPaths.has(path)) {
          nextPaths.delete(path);
          return false;
        }
        return true;
      });
      if (paths.length === 0) {
        return;
      }
      try {
        await fetchAndApplyManifestPatches(
          paths,
          createFromReadableStream,
          fetchImplementation
        );
      } catch (e) {
        console.error("Failed to fetch manifest patches", e);
      }
    }
    let debouncedFetchPatches = debounce(fetchPatches, 100);
    fetchPatches();
    let observer = new MutationObserver(() => debouncedFetchPatches());
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-discover", "href", "action"]
    });
  }, [routeDiscovery, createFromReadableStream, fetchImplementation]);
  const frameworkContext = {
    future: {
      // These flags have no runtime impact so can always be false.  If we add
      // flags that drive runtime behavior they'll need to be proxied through.
      unstable_middleware: false,
      unstable_subResourceIntegrity: false
    },
    isSpaMode: true,
    ssr: true,
    criticalCss: "",
    manifest: {
      routes: {},
      version: "1",
      url: "",
      entry: {
        module: "",
        imports: []
      }
    },
    routeDiscovery: { mode: "lazy", manifestPath: "/__manifest" },
    routeModules: {}
  };
  return /* @__PURE__ */ React4.createElement(_chunkEVX7OBGBjs.RSCRouterContext.Provider, { value: true }, /* @__PURE__ */ React4.createElement(RSCRouterGlobalErrorBoundary, { location: location2 }, /* @__PURE__ */ React4.createElement(_chunkEVX7OBGBjs.FrameworkContext.Provider, { value: frameworkContext }, /* @__PURE__ */ React4.createElement(_chunkVC6RBZTRjs.RouterProvider, { router, flushSync: ReactDOM.flushSync }))));
}
function createRouteFromServerManifest(match, payload) {
  let hasInitialData = payload && match.id in payload.loaderData;
  let initialData = _optionalChain([payload, 'optionalAccess', _30 => _30.loaderData, 'access', _31 => _31[match.id]]);
  let hasInitialError = _optionalChain([payload, 'optionalAccess', _32 => _32.errors]) && match.id in payload.errors;
  let initialError = _optionalChain([payload, 'optionalAccess', _33 => _33.errors, 'optionalAccess', _34 => _34[match.id]]);
  let isHydrationRequest = _optionalChain([match, 'access', _35 => _35.clientLoader, 'optionalAccess', _36 => _36.hydrate]) === true || !match.hasLoader || // If the route has a component but we don't have an element, we need to hit
  // the server loader flow regardless of whether the client loader calls
  // `serverLoader` or not, otherwise we'll have nothing to render.
  match.hasComponent && !match.element;
  let dataRoute = {
    id: match.id,
    element: match.element,
    errorElement: match.errorElement,
    handle: match.handle,
    hasErrorBoundary: match.hasErrorBoundary,
    hydrateFallbackElement: match.hydrateFallbackElement,
    index: match.index,
    loader: match.clientLoader ? async (args, singleFetch) => {
      try {
        let result = await match.clientLoader({
          ...args,
          serverLoader: () => {
            preventInvalidServerHandlerCall(
              "loader",
              match.id,
              match.hasLoader
            );
            if (isHydrationRequest) {
              if (hasInitialData) {
                return initialData;
              }
              if (hasInitialError) {
                throw initialError;
              }
            }
            return callSingleFetch(singleFetch);
          }
        });
        return result;
      } finally {
        isHydrationRequest = false;
      }
    } : (
      // We always make the call in this RSC world since even if we don't
      // have a `loader` we may need to get the `element` implementation
      (_, singleFetch) => callSingleFetch(singleFetch)
    ),
    action: match.clientAction ? (args, singleFetch) => match.clientAction({
      ...args,
      serverAction: async () => {
        preventInvalidServerHandlerCall(
          "action",
          match.id,
          match.hasLoader
        );
        return await callSingleFetch(singleFetch);
      }
    }) : match.hasAction ? (_, singleFetch) => callSingleFetch(singleFetch) : () => {
      throw _chunkEVX7OBGBjs.noActionDefinedError.call(void 0, "action", match.id);
    },
    path: match.path,
    shouldRevalidate: match.shouldRevalidate,
    // We always have a "loader" in this RSC world since even if we don't
    // have a `loader` we may need to get the `element` implementation
    hasLoader: true,
    hasClientLoader: match.clientLoader != null,
    hasAction: match.hasAction,
    hasClientAction: match.clientAction != null,
    hasShouldRevalidate: match.shouldRevalidate != null
  };
  if (typeof dataRoute.loader === "function") {
    dataRoute.loader.hydrate = _chunkEVX7OBGBjs.shouldHydrateRouteLoader.call(void 0, 
      match.id,
      match.clientLoader,
      match.hasLoader,
      false
    );
  }
  return dataRoute;
}
function callSingleFetch(singleFetch) {
  _chunkEVX7OBGBjs.invariant.call(void 0, typeof singleFetch === "function", "Invalid singleFetch parameter");
  return singleFetch();
}
function preventInvalidServerHandlerCall(type, routeId, hasHandler) {
  if (!hasHandler) {
    let fn = type === "action" ? "serverAction()" : "serverLoader()";
    let msg = `You are trying to call ${fn} on a route that does not have a server ${type} (routeId: "${routeId}")`;
    console.error(msg);
    throw new (0, _chunkEVX7OBGBjs.ErrorResponseImpl)(400, "Bad Request", new Error(msg), true);
  }
}
var nextPaths = /* @__PURE__ */ new Set();
var discoveredPathsMaxSize = 1e3;
var discoveredPaths = /* @__PURE__ */ new Set();
var URL_LIMIT = 7680;
function getManifestUrl(paths) {
  if (paths.length === 0) {
    return null;
  }
  if (paths.length === 1) {
    return new URL(`${paths[0]}.manifest`, window.location.origin);
  }
  const globalVar = window;
  let basename = (_nullishCoalesce(globalVar.__router.basename, () => ( ""))).replace(/^\/|\/$/g, "");
  let url = new URL(`${basename}/.manifest`, window.location.origin);
  paths.sort().forEach((path) => url.searchParams.append("p", path));
  return url;
}
async function fetchAndApplyManifestPatches(paths, createFromReadableStream, fetchImplementation, signal) {
  let url = getManifestUrl(paths);
  if (url == null) {
    return;
  }
  if (url.toString().length > URL_LIMIT) {
    nextPaths.clear();
    return;
  }
  let response = await fetchImplementation(new Request(url, { signal }));
  if (!response.body || response.status < 200 || response.status >= 300) {
    throw new Error("Unable to fetch new route matches from the server");
  }
  let payload = await createFromReadableStream(response.body, {
    temporaryReferences: void 0
  });
  if (payload.type !== "manifest") {
    throw new Error("Failed to patch routes");
  }
  paths.forEach((p) => addToFifoQueue(p, discoveredPaths));
  payload.patches.forEach((p) => {
    window.__router.patchRoutes(
      _nullishCoalesce(p.parentId, () => ( null)),
      [createRouteFromServerManifest(p)]
    );
  });
}
function addToFifoQueue(path, queue) {
  if (queue.size >= discoveredPathsMaxSize) {
    let first = queue.values().next().value;
    queue.delete(first);
  }
  queue.add(path);
}
function debounce(callback, wait) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), wait);
  };
}

// lib/rsc/server.ssr.tsx


// lib/rsc/html-stream/server.ts
var encoder2 = new TextEncoder();
var trailer = "</body></html>";
function injectRSCPayload(rscStream) {
  let decoder = new TextDecoder();
  let resolveFlightDataPromise;
  let flightDataPromise = new Promise(
    (resolve) => resolveFlightDataPromise = resolve
  );
  let startedRSC = false;
  let buffered = [];
  let timeout = null;
  function flushBufferedChunks(controller) {
    for (let chunk of buffered) {
      let buf = decoder.decode(chunk, { stream: true });
      if (buf.endsWith(trailer)) {
        buf = buf.slice(0, -trailer.length);
      }
      controller.enqueue(encoder2.encode(buf));
    }
    buffered.length = 0;
    timeout = null;
  }
  return new TransformStream({
    transform(chunk, controller) {
      buffered.push(chunk);
      if (timeout) {
        return;
      }
      timeout = setTimeout(async () => {
        flushBufferedChunks(controller);
        if (!startedRSC) {
          startedRSC = true;
          writeRSCStream(rscStream, controller).catch((err) => controller.error(err)).then(resolveFlightDataPromise);
        }
      }, 0);
    },
    async flush(controller) {
      await flightDataPromise;
      if (timeout) {
        clearTimeout(timeout);
        flushBufferedChunks(controller);
      }
      controller.enqueue(encoder2.encode("</body></html>"));
    }
  });
}
async function writeRSCStream(rscStream, controller) {
  let decoder = new TextDecoder("utf-8", { fatal: true });
  const reader = rscStream.getReader();
  try {
    let read;
    while ((read = await reader.read()) && !read.done) {
      const chunk = read.value;
      try {
        writeChunk(
          JSON.stringify(decoder.decode(chunk, { stream: true })),
          controller
        );
      } catch (err) {
        let base64 = JSON.stringify(btoa(String.fromCodePoint(...chunk)));
        writeChunk(
          `Uint8Array.from(atob(${base64}), m => m.codePointAt(0))`,
          controller
        );
      }
    }
  } finally {
    reader.releaseLock();
  }
  let remaining = decoder.decode();
  if (remaining.length) {
    writeChunk(JSON.stringify(remaining), controller);
  }
}
function writeChunk(chunk, controller) {
  controller.enqueue(
    encoder2.encode(
      `<script>${escapeScript(
        `(self.__FLIGHT_DATA||=[]).push(${chunk})`
      )}</script>`
    )
  );
}
function escapeScript(script) {
  return script.replace(/<!--/g, "<\\!--").replace(/<\/(script)/gi, "</\\$1");
}

// lib/rsc/server.ssr.tsx
var REACT_USE = "use";
var useImpl = React5[REACT_USE];
function useSafe(promise) {
  if (useImpl) {
    return useImpl(promise);
  }
  throw new Error("React Router v7 requires React 19+ for RSC features.");
}
async function routeRSCServerRequest({
  request,
  fetchServer,
  createFromReadableStream,
  renderHTML,
  hydrate = true
}) {
  const url = new URL(request.url);
  const isDataRequest = isReactServerRequest(url);
  const respondWithRSCPayload = isDataRequest || isManifestRequest(url) || request.headers.has("rsc-action-id");
  const serverResponse = await fetchServer(request);
  if (respondWithRSCPayload || serverResponse.headers.get("React-Router-Resource") === "true") {
    return serverResponse;
  }
  if (!serverResponse.body) {
    throw new Error("Missing body in server response");
  }
  let serverResponseB = null;
  if (hydrate) {
    serverResponseB = serverResponse.clone();
  }
  const body = serverResponse.body;
  let payloadPromise;
  const getPayload = async () => {
    if (payloadPromise) return payloadPromise;
    payloadPromise = createFromReadableStream(body);
    return payloadPromise;
  };
  try {
    const payload = await getPayload();
    if (serverResponse.status === _chunkEVX7OBGBjs.SINGLE_FETCH_REDIRECT_STATUS && payload.type === "redirect") {
      const headers2 = new Headers(serverResponse.headers);
      headers2.delete("Content-Encoding");
      headers2.delete("Content-Length");
      headers2.delete("Content-Type");
      headers2.delete("x-remix-response");
      headers2.set("Location", payload.location);
      return new Response(_optionalChain([serverResponseB, 'optionalAccess', _37 => _37.body]) || "", {
        headers: headers2,
        status: payload.status,
        statusText: serverResponse.statusText
      });
    }
    const html = await renderHTML(getPayload);
    const headers = new Headers(serverResponse.headers);
    headers.set("Content-Type", "text/html");
    if (!hydrate) {
      return new Response(html, {
        status: serverResponse.status,
        headers
      });
    }
    if (!_optionalChain([serverResponseB, 'optionalAccess', _38 => _38.body])) {
      throw new Error("Failed to clone server response");
    }
    const body2 = html.pipeThrough(injectRSCPayload(serverResponseB.body));
    return new Response(body2, {
      status: serverResponse.status,
      headers
    });
  } catch (reason) {
    if (reason instanceof Response) {
      return reason;
    }
    throw reason;
  }
}
function RSCStaticRouter({ getPayload }) {
  const payload = useSafe(getPayload());
  if (payload.type === "redirect") {
    throw new Response(null, {
      status: payload.status,
      headers: {
        Location: payload.location
      }
    });
  }
  if (payload.type !== "render") return null;
  let patchedLoaderData = { ...payload.loaderData };
  for (const match of payload.matches) {
    if (_chunkEVX7OBGBjs.shouldHydrateRouteLoader.call(void 0, 
      match.id,
      match.clientLoader,
      match.hasLoader,
      false
    ) && (match.hydrateFallbackElement || !match.hasLoader)) {
      delete patchedLoaderData[match.id];
    }
  }
  const context = {
    actionData: payload.actionData,
    actionHeaders: {},
    basename: payload.basename,
    errors: payload.errors,
    loaderData: patchedLoaderData,
    loaderHeaders: {},
    location: payload.location,
    statusCode: 200,
    matches: payload.matches.map((match) => ({
      params: match.params,
      pathname: match.pathname,
      pathnameBase: match.pathnameBase,
      route: {
        id: match.id,
        action: match.hasAction || !!match.clientAction,
        handle: match.handle,
        hasErrorBoundary: match.hasErrorBoundary,
        loader: match.hasLoader || !!match.clientLoader,
        index: match.index,
        path: match.path,
        shouldRevalidate: match.shouldRevalidate
      }
    }))
  };
  const router = _chunkVC6RBZTRjs.createStaticRouter.call(void 0, 
    payload.matches.reduceRight((previous, match) => {
      const route = {
        id: match.id,
        action: match.hasAction || !!match.clientAction,
        element: match.element,
        errorElement: match.errorElement,
        handle: match.handle,
        hasErrorBoundary: !!match.errorElement,
        hydrateFallbackElement: match.hydrateFallbackElement,
        index: match.index,
        loader: match.hasLoader || !!match.clientLoader,
        path: match.path,
        shouldRevalidate: match.shouldRevalidate
      };
      if (previous.length > 0) {
        route.children = previous;
      }
      return [route];
    }, []),
    context
  );
  const frameworkContext = {
    future: {
      // These flags have no runtime impact so can always be false.  If we add
      // flags that drive runtime behavior they'll need to be proxied through.
      unstable_middleware: false,
      unstable_subResourceIntegrity: false
    },
    isSpaMode: false,
    ssr: true,
    criticalCss: "",
    manifest: {
      routes: {},
      version: "1",
      url: "",
      entry: {
        module: "",
        imports: []
      }
    },
    routeDiscovery: { mode: "lazy", manifestPath: "/__manifest" },
    routeModules: {}
  };
  return /* @__PURE__ */ React5.createElement(_chunkEVX7OBGBjs.RSCRouterContext.Provider, { value: true }, /* @__PURE__ */ React5.createElement(RSCRouterGlobalErrorBoundary, { location: payload.location }, /* @__PURE__ */ React5.createElement(_chunkEVX7OBGBjs.FrameworkContext.Provider, { value: frameworkContext }, /* @__PURE__ */ React5.createElement(
    _chunkVC6RBZTRjs.StaticRouterProvider,
    {
      context,
      router,
      hydrate: false,
      nonce: payload.nonce
    }
  ))));
}
function isReactServerRequest(url) {
  return url.pathname.endsWith(".rsc");
}
function isManifestRequest(url) {
  return url.pathname.endsWith(".manifest");
}

// lib/rsc/html-stream/browser.ts
function getRSCStream() {
  let encoder3 = new TextEncoder();
  let streamController = null;
  let rscStream = new ReadableStream({
    start(controller) {
      if (typeof window === "undefined") {
        return;
      }
      let handleChunk = (chunk) => {
        if (typeof chunk === "string") {
          controller.enqueue(encoder3.encode(chunk));
        } else {
          controller.enqueue(chunk);
        }
      };
      window.__FLIGHT_DATA || (window.__FLIGHT_DATA = []);
      window.__FLIGHT_DATA.forEach(handleChunk);
      window.__FLIGHT_DATA.push = (chunk) => {
        handleChunk(chunk);
        return 0;
      };
      streamController = controller;
    }
  });
  if (typeof document !== "undefined" && document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      _optionalChain([streamController, 'optionalAccess', _39 => _39.close, 'call', _40 => _40()]);
    });
  } else {
    _optionalChain([streamController, 'optionalAccess', _41 => _41.close, 'call', _42 => _42()]);
  }
  return rscStream;
}

// lib/dom/ssr/errors.ts
function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new (0, _chunkEVX7OBGBjs.ErrorResponseImpl)(
        val.status,
        val.statusText,
        val.data,
        val.internal === true
      );
    } else if (val && val.__type === "Error") {
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor === "function") {
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = val.stack;
            serialized[key] = error;
          } catch (e) {
          }
        }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        error.stack = val.stack;
        serialized[key] = error;
      }
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}

































































































































exports.Await = _chunkVC6RBZTRjs.Await; exports.BrowserRouter = _chunkVC6RBZTRjs.BrowserRouter; exports.Form = _chunkVC6RBZTRjs.Form; exports.HashRouter = _chunkVC6RBZTRjs.HashRouter; exports.IDLE_BLOCKER = _chunkEVX7OBGBjs.IDLE_BLOCKER; exports.IDLE_FETCHER = _chunkEVX7OBGBjs.IDLE_FETCHER; exports.IDLE_NAVIGATION = _chunkEVX7OBGBjs.IDLE_NAVIGATION; exports.Link = _chunkVC6RBZTRjs.Link; exports.Links = _chunkEVX7OBGBjs.Links; exports.MemoryRouter = _chunkVC6RBZTRjs.MemoryRouter; exports.Meta = _chunkEVX7OBGBjs.Meta; exports.NavLink = _chunkVC6RBZTRjs.NavLink; exports.Navigate = _chunkVC6RBZTRjs.Navigate; exports.NavigationType = _chunkEVX7OBGBjs.Action; exports.Outlet = _chunkVC6RBZTRjs.Outlet; exports.PrefetchPageLinks = _chunkEVX7OBGBjs.PrefetchPageLinks; exports.Route = _chunkVC6RBZTRjs.Route; exports.Router = _chunkVC6RBZTRjs.Router; exports.RouterProvider = _chunkVC6RBZTRjs.RouterProvider; exports.Routes = _chunkVC6RBZTRjs.Routes; exports.Scripts = _chunkEVX7OBGBjs.Scripts; exports.ScrollRestoration = _chunkVC6RBZTRjs.ScrollRestoration; exports.ServerRouter = ServerRouter; exports.StaticRouter = _chunkVC6RBZTRjs.StaticRouter; exports.StaticRouterProvider = _chunkVC6RBZTRjs.StaticRouterProvider; exports.UNSAFE_DataRouterContext = _chunkEVX7OBGBjs.DataRouterContext; exports.UNSAFE_DataRouterStateContext = _chunkEVX7OBGBjs.DataRouterStateContext; exports.UNSAFE_ErrorResponseImpl = _chunkEVX7OBGBjs.ErrorResponseImpl; exports.UNSAFE_FetchersContext = _chunkEVX7OBGBjs.FetchersContext; exports.UNSAFE_FrameworkContext = _chunkEVX7OBGBjs.FrameworkContext; exports.UNSAFE_LocationContext = _chunkEVX7OBGBjs.LocationContext; exports.UNSAFE_NavigationContext = _chunkEVX7OBGBjs.NavigationContext; exports.UNSAFE_RSCDefaultRootErrorBoundary = RSCDefaultRootErrorBoundary; exports.UNSAFE_RemixErrorBoundary = _chunkEVX7OBGBjs.RemixErrorBoundary; exports.UNSAFE_RouteContext = _chunkEVX7OBGBjs.RouteContext; exports.UNSAFE_ServerMode = ServerMode; exports.UNSAFE_SingleFetchRedirectSymbol = _chunkEVX7OBGBjs.SingleFetchRedirectSymbol; exports.UNSAFE_ViewTransitionContext = _chunkEVX7OBGBjs.ViewTransitionContext; exports.UNSAFE_WithComponentProps = _chunkVC6RBZTRjs.WithComponentProps; exports.UNSAFE_WithErrorBoundaryProps = _chunkVC6RBZTRjs.WithErrorBoundaryProps; exports.UNSAFE_WithHydrateFallbackProps = _chunkVC6RBZTRjs.WithHydrateFallbackProps; exports.UNSAFE_createBrowserHistory = _chunkEVX7OBGBjs.createBrowserHistory; exports.UNSAFE_createClientRoutes = _chunkEVX7OBGBjs.createClientRoutes; exports.UNSAFE_createClientRoutesWithHMRRevalidationOptOut = _chunkEVX7OBGBjs.createClientRoutesWithHMRRevalidationOptOut; exports.UNSAFE_createRouter = _chunkEVX7OBGBjs.createRouter; exports.UNSAFE_decodeViaTurboStream = _chunkEVX7OBGBjs.decodeViaTurboStream; exports.UNSAFE_deserializeErrors = deserializeErrors; exports.UNSAFE_getHydrationData = getHydrationData; exports.UNSAFE_getPatchRoutesOnNavigationFunction = _chunkEVX7OBGBjs.getPatchRoutesOnNavigationFunction; exports.UNSAFE_getTurboStreamSingleFetchDataStrategy = _chunkEVX7OBGBjs.getTurboStreamSingleFetchDataStrategy; exports.UNSAFE_hydrationRouteProperties = _chunkVC6RBZTRjs.hydrationRouteProperties; exports.UNSAFE_invariant = _chunkEVX7OBGBjs.invariant; exports.UNSAFE_mapRouteProperties = _chunkVC6RBZTRjs.mapRouteProperties; exports.UNSAFE_shouldHydrateRouteLoader = _chunkEVX7OBGBjs.shouldHydrateRouteLoader; exports.UNSAFE_useFogOFWarDiscovery = _chunkEVX7OBGBjs.useFogOFWarDiscovery; exports.UNSAFE_useScrollRestoration = _chunkVC6RBZTRjs.useScrollRestoration; exports.UNSAFE_withComponentProps = _chunkVC6RBZTRjs.withComponentProps; exports.UNSAFE_withErrorBoundaryProps = _chunkVC6RBZTRjs.withErrorBoundaryProps; exports.UNSAFE_withHydrateFallbackProps = _chunkVC6RBZTRjs.withHydrateFallbackProps; exports.createBrowserRouter = _chunkVC6RBZTRjs.createBrowserRouter; exports.createCookie = createCookie; exports.createCookieSessionStorage = createCookieSessionStorage; exports.createHashRouter = _chunkVC6RBZTRjs.createHashRouter; exports.createMemoryRouter = _chunkVC6RBZTRjs.createMemoryRouter; exports.createMemorySessionStorage = createMemorySessionStorage; exports.createPath = _chunkEVX7OBGBjs.createPath; exports.createRequestHandler = createRequestHandler; exports.createRoutesFromChildren = _chunkVC6RBZTRjs.createRoutesFromChildren; exports.createRoutesFromElements = _chunkVC6RBZTRjs.createRoutesFromElements; exports.createRoutesStub = createRoutesStub; exports.createSearchParams = _chunkVC6RBZTRjs.createSearchParams; exports.createSession = createSession; exports.createSessionStorage = createSessionStorage; exports.createStaticHandler = _chunkVC6RBZTRjs.createStaticHandler; exports.createStaticRouter = _chunkVC6RBZTRjs.createStaticRouter; exports.data = _chunkEVX7OBGBjs.data; exports.generatePath = _chunkEVX7OBGBjs.generatePath; exports.href = href; exports.isCookie = isCookie; exports.isRouteErrorResponse = _chunkEVX7OBGBjs.isRouteErrorResponse; exports.isSession = isSession; exports.matchPath = _chunkEVX7OBGBjs.matchPath; exports.matchRoutes = _chunkEVX7OBGBjs.matchRoutes; exports.parsePath = _chunkEVX7OBGBjs.parsePath; exports.redirect = _chunkEVX7OBGBjs.redirect; exports.redirectDocument = _chunkEVX7OBGBjs.redirectDocument; exports.renderMatches = _chunkVC6RBZTRjs.renderMatches; exports.replace = _chunkEVX7OBGBjs.replace; exports.resolvePath = _chunkEVX7OBGBjs.resolvePath; exports.unstable_HistoryRouter = _chunkVC6RBZTRjs.HistoryRouter; exports.unstable_RSCHydratedRouter = RSCHydratedRouter; exports.unstable_RSCStaticRouter = RSCStaticRouter; exports.unstable_RouterContextProvider = _chunkEVX7OBGBjs.unstable_RouterContextProvider; exports.unstable_createCallServer = createCallServer; exports.unstable_createContext = _chunkEVX7OBGBjs.unstable_createContext; exports.unstable_getRSCStream = getRSCStream; exports.unstable_routeRSCServerRequest = routeRSCServerRequest; exports.unstable_setDevServerHooks = setDevServerHooks; exports.unstable_usePrompt = _chunkVC6RBZTRjs.usePrompt; exports.useActionData = _chunkEVX7OBGBjs.useActionData; exports.useAsyncError = _chunkEVX7OBGBjs.useAsyncError; exports.useAsyncValue = _chunkEVX7OBGBjs.useAsyncValue; exports.useBeforeUnload = _chunkVC6RBZTRjs.useBeforeUnload; exports.useBlocker = _chunkEVX7OBGBjs.useBlocker; exports.useFetcher = _chunkVC6RBZTRjs.useFetcher; exports.useFetchers = _chunkVC6RBZTRjs.useFetchers; exports.useFormAction = _chunkVC6RBZTRjs.useFormAction; exports.useHref = _chunkEVX7OBGBjs.useHref; exports.useInRouterContext = _chunkEVX7OBGBjs.useInRouterContext; exports.useLinkClickHandler = _chunkVC6RBZTRjs.useLinkClickHandler; exports.useLoaderData = _chunkEVX7OBGBjs.useLoaderData; exports.useLocation = _chunkEVX7OBGBjs.useLocation; exports.useMatch = _chunkEVX7OBGBjs.useMatch; exports.useMatches = _chunkEVX7OBGBjs.useMatches; exports.useNavigate = _chunkEVX7OBGBjs.useNavigate; exports.useNavigation = _chunkEVX7OBGBjs.useNavigation; exports.useNavigationType = _chunkEVX7OBGBjs.useNavigationType; exports.useOutlet = _chunkEVX7OBGBjs.useOutlet; exports.useOutletContext = _chunkEVX7OBGBjs.useOutletContext; exports.useParams = _chunkEVX7OBGBjs.useParams; exports.useResolvedPath = _chunkEVX7OBGBjs.useResolvedPath; exports.useRevalidator = _chunkEVX7OBGBjs.useRevalidator; exports.useRouteError = _chunkEVX7OBGBjs.useRouteError; exports.useRouteLoaderData = _chunkEVX7OBGBjs.useRouteLoaderData; exports.useRoutes = _chunkEVX7OBGBjs.useRoutes; exports.useSearchParams = _chunkVC6RBZTRjs.useSearchParams; exports.useSubmit = _chunkVC6RBZTRjs.useSubmit; exports.useViewTransitionState = _chunkVC6RBZTRjs.useViewTransitionState;


/***/ }),

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @loadable/component */ "./node_modules/@loadable/component/dist/cjs/loadable.cjs.js");
/* harmony import */ var _ScopedShell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ScopedShell */ "./src/ScopedShell.jsx");
/* harmony import */ var _utils_load_lottie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/load-lottie */ "./src/utils/load-lottie.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");






const Frontpage = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_2__["default"])({
  resolved: {},
  chunkName() {
    return "FrontPage-jsx";
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
  importAsync: () => Promise.all(/*! import() | FrontPage-jsx */[__webpack_require__.e("src_utils_loading_loading_tsx"), __webpack_require__.e("FrontPage-jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./FrontPage.jsx */ "./src/FrontPage.jsx")),
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
      return /*require.resolve*/(/*! ./FrontPage.jsx */ "./src/FrontPage.jsx");
    }
    // removed by dead control flow
{}
  }
});
const DynamicThemeRoute = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_2__["default"])({
  resolved: {},
  chunkName() {
    return "dynamic-app-ssr-app-dynamic-theme-route-tsx";
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
  importAsync: () => __webpack_require__.e(/*! import() | dynamic-app-ssr-app-dynamic-theme-route-tsx */ "dynamic-app-ssr-app-dynamic-theme-route-tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./dynamic-app/ssr-app/dynamic-theme.route.tsx */ "./src/dynamic-app/ssr-app/dynamic-theme.route.tsx")),
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
      return /*require.resolve*/(/*! ./dynamic-app/ssr-app/dynamic-theme.route.tsx */ "./src/dynamic-app/ssr-app/dynamic-theme.route.tsx");
    }
    // removed by dead control flow
{}
  }
});
function App() {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Eagerly load Lottie right after hydration; stays in its own async chunk.
    (0,_utils_load_lottie__WEBPACK_IMPORTED_MODULE_4__.loadLottie)();
  }, []);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Routes, {
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {
      path: "/",
      element: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ScopedShell__WEBPACK_IMPORTED_MODULE_3__["default"], {
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Frontpage, {})
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {
      path: "/home",
      element: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ScopedShell__WEBPACK_IMPORTED_MODULE_3__["default"], {
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Frontpage, {})
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {
      path: "/dynamic-theme/*",
      element: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(DynamicThemeRoute, {})
    })]
  });
}

/***/ }),

/***/ "./src/ScopedShell.jsx":
/*!*****************************!*\
  !*** ./src/ScopedShell.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScopedShell)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");

// src/ScopedShell.jsx
function ScopedShell({
  children
}) {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    id: "efe-portfolio",
    children: children
  });
}

/***/ }),

/***/ "./src/dynamic-app/lib/fetchSVGIcons.js":
/*!**********************************************!*\
  !*** ./src/dynamic-app/lib/fetchSVGIcons.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
    // dereference to get real URLs on the server
    image1{ ..., asset->{ url } },
    image2{ ..., asset->{ url } },
    caption1,
    alt1,
    alt2,
    iconName,
    url1
  }`;
  try {
    const data = await _utils_sanity__WEBPACK_IMPORTED_MODULE_0__["default"].fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching images', error);
    return [];
  }
};

/***/ }),

/***/ "./src/server/assets.ts":
/*!******************************!*\
  !*** ./src/server/assets.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildDynamicImagePreloads: () => (/* binding */ buildDynamicImagePreloads),
/* harmony export */   buildPreloadLinks: () => (/* binding */ buildPreloadLinks),
/* harmony export */   loadManifestIfAny: () => (/* binding */ loadManifestIfAny),
/* harmony export */   readFontCss: () => (/* binding */ readFontCss),
/* harmony export */   resolveStatsFile: () => (/* binding */ resolveStatsFile)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
// src/server/assets.ts


function resolveStatsFile() {
  const BUILD_DIR = path__WEBPACK_IMPORTED_MODULE_1___default().resolve(process.cwd(), 'build');
  const PROD_STATS_FILE = path__WEBPACK_IMPORTED_MODULE_1___default().resolve(BUILD_DIR, 'loadable-stats.json');
  const DEV_STATS_FILE = path__WEBPACK_IMPORTED_MODULE_1___default().resolve(process.cwd(), 'loadable-stats.json');
  const statsFile = fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(PROD_STATS_FILE) ? PROD_STATS_FILE : DEV_STATS_FILE;
  return {
    BUILD_DIR,
    STATS_FILE: statsFile,
    ASSET_MANIFEST: path__WEBPACK_IMPORTED_MODULE_1___default().resolve(BUILD_DIR, 'asset-manifest.json')
  };
}
function loadManifestIfAny(IS_DEV, manifestPath) {
  if (IS_DEV) return null;
  try {
    return JSON.parse(fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(manifestPath, 'utf8'));
  } catch {
    return null;
  }
}
function readFontCss() {
  const safeRead = file => fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(file) ? fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(file, 'utf8') : '';
  const root = process.cwd();
  return {
    rubikCss: safeRead(path__WEBPACK_IMPORTED_MODULE_1___default().resolve(root, 'public/fonts/rubik.css')),
    orbitronCss: safeRead(path__WEBPACK_IMPORTED_MODULE_1___default().resolve(root, 'public/fonts/orbitron.css')),
    poppinsCss: safeRead(path__WEBPACK_IMPORTED_MODULE_1___default().resolve(root, 'public/fonts2/poppins.css')),
    epilogueCss: safeRead(path__WEBPACK_IMPORTED_MODULE_1___default().resolve(root, 'public/fonts2/epilogue.css'))
  };
}

// Build <link rel="preload"> set based on your normalized media shape
function buildPreloadLinks(firstData) {
  const links = [];
  if (!firstData?.media) return links;
  const arr = Array.isArray(firstData.media) ? firstData.media : [firstData.media];
  for (const m of arr) {
    if (m?.imageUrl) links.push(`<link rel="preload" as="image" href="${m.imageUrl}">`);
    if (m?.video?.posterUrl) links.push(`<link rel="preload" as="image" href="${m.video.posterUrl}">`);
    if (m?.video?.mp4Url) links.push(`<link rel="preload" as="video" href="${m.video.mp4Url}">`);
    if (m?.video?.webmUrl) links.push(`<link rel="preload" as="video" href="${m.video.webmUrl}">`);
  }
  return links;
}
function buildDynamicImagePreloads(images, limit = 6) {
  if (!Array.isArray(images) || !images.length) return [];
  const links = [];
  const seen = new Set();
  let count = 0;
  const toUrl = img => img?.asset?.url || img?.url || (typeof img === 'string' ? img : null);
  const toLq = url => {
    // if it's a sanity CDN URL, ask for a smaller version; else leave as is
    return /cdn\.sanity\.io/.test(url) ? `${url}${url.includes('?') ? '&' : '?'}auto=format&w=640&q=60` : url;
  };
  for (const it of images) {
    const u1 = toUrl(it?.image1);
    const u2 = toUrl(it?.image2);
    for (const raw of [u1, u2]) {
      if (!raw || seen.has(raw)) continue;
      seen.add(raw);
      const href = toLq(raw);
      links.push(`<link rel="preload" as="image" href="${href}" imagesrcset="${href}">`);
      if (++count >= limit) break;
    }
    if (count >= limit) break;
  }
  return links;
}

/***/ }),

/***/ "./src/server/cssPipeline.ts":
/*!***********************************!*\
  !*** ./src/server/cssPipeline.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildCriticalCss: () => (/* binding */ buildCriticalCss)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var postcss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! postcss */ "postcss");
/* harmony import */ var postcss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(postcss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var postcss_prefix_selector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! postcss-prefix-selector */ "postcss-prefix-selector");
/* harmony import */ var postcss_prefix_selector__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(postcss_prefix_selector__WEBPACK_IMPORTED_MODULE_3__);





/**
 * Processes CSS files with the same prefixer logic used in client build.
 * Returns one concatenated CSS string.
 */
async function buildCriticalCss(files, {
  prefix = '#efe-portfolio',
  allow = selector => selector.startsWith('html') || selector.startsWith('body') || selector.startsWith(':root') || selector.includes('#dynamic-theme') || selector.includes('#shadow-dynamic-app') || selector.includes('::slotted')
} = {}) {
  const root = process.cwd();
  const out = [];
  const plugins = [postcss_prefix_selector__WEBPACK_IMPORTED_MODULE_3___default()({
    prefix,
    transform: (_p, selector, prefixed) => allow(selector) ? selector : prefixed
  })];
  for (const rel of files) {
    const abs = path__WEBPACK_IMPORTED_MODULE_1___default().resolve(root, rel);
    if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(abs)) continue;
    const css = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(abs, 'utf8');
    const result = await postcss__WEBPACK_IMPORTED_MODULE_2___default()(plugins).process(css, {
      from: abs
    });
    out.push(result.css);
  }
  return out.join('\n/* --- separator --- */\n');
}

/***/ }),

/***/ "./src/server/emotion.ts":
/*!*******************************!*\
  !*** ./src/server/emotion.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createEmotion: () => (/* binding */ createEmotion)
/* harmony export */ });
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.cjs.js");
/* harmony import */ var _emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/server/create-instance */ "./node_modules/@emotion/server/create-instance/dist/emotion-server-create-instance.cjs.js");
// src/server/emotion.ts


function createEmotion() {
  const cache = (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_0__["default"])({
    key: 'css',
    prepend: true
  });
  const {
    extractCriticalToChunks,
    constructStyleTagsFromChunks
  } = (0,_emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_1__["default"])(cache);
  return {
    cache,
    extractCriticalToChunks,
    constructStyleTagsFromChunks
  };
}

/***/ }),

/***/ "./src/server/highScoreRoute.ts":
/*!**************************************!*\
  !*** ./src/server/highScoreRoute.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sanityWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sanityWrite */ "./src/server/sanityWrite.ts");


const router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();
router.post('/highscore', async (req, res) => {
  const {
    score
  } = req.body;
  if (typeof score !== 'number') {
    return res.status(400).json({
      error: 'Invalid score'
    });
  }
  try {
    const current = await _sanityWrite__WEBPACK_IMPORTED_MODULE_1__.writeClient.fetch(`*[_type == "highScore"] | order(score desc)[0]{score}`);
    if (current && score <= current.score) {
      return res.json({
        highScore: current.score
      });
    }
    const created = await _sanityWrite__WEBPACK_IMPORTED_MODULE_1__.writeClient.create({
      _type: 'highScore',
      score
    });
    return res.json({
      highScore: created.score
    });
  } catch (err) {
    console.error('[HS API] update failed:', err.message || err);
    return res.status(500).json({
      error: 'Failed to update score'
    });
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);

/***/ }),

/***/ "./src/server/html.ts":
/*!****************************!*\
  !*** ./src/server/html.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildHtmlClose: () => (/* binding */ buildHtmlClose),
/* harmony export */   buildHtmlOpen: () => (/* binding */ buildHtmlOpen),
/* harmony export */   buildRouteHead: () => (/* binding */ buildRouteHead),
/* harmony export */   prefixCss: () => (/* binding */ prefixCss)
/* harmony export */ });
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);


function readTextSafe(p) {
  try {
    return node_fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(p, 'utf8');
  } catch {
    return '';
  }
}
function readFirst(paths) {
  for (const p of paths) {
    const txt = readTextSafe(p);
    if (txt) return txt;
  }
  return '';
}

/** Prefix helper */
function prefixCss(css, prefix = '#efe-portfolio') {
  // 1) Recurse into @media blocks and prefix their inner rules only.
  css = css.replace(/@media[^{]+\{([\s\S]*?)\}/g, (full, inner) => {
    const prefixedInner = prefixCss(inner, prefix);
    return full.replace(inner, prefixedInner);
  });

  // 2) Remove block comments so a comment before @media isn't misread as a selector token.
  //    (Safe for critical inline CSS; you weren’t using comments there for logic.)
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // 3) Prefix normal rule selectors (skip at-rules and special roots).
  return css.replace(/(^|})\s*([^@}{][^{}]*)\{/g, (m, brace, selectorList) => {
    const selectors = selectorList.split(',').map(s => s.trim()).filter(Boolean);
    const safeSelectors = selectors.map(sel => {
      // leave these alone
      if (sel.startsWith('html') || sel.startsWith('body') || sel.startsWith(':root') || sel.includes('#dynamic-theme') || sel.includes('#shadow-dynamic-app') || sel.includes('::slotted') || sel.startsWith('@') ||
      // any at-rule safety
      sel === 'from' || sel === 'to' || /\d+%$/.test(sel) // keyframes stages
      ) {
        return sel;
      }
      return `${prefix} ${sel}`;
    }).join(', ');
    return `${brace} ${safeSelectors}{`;
  });
}

/** Build limited font preloads from the blocks actually emitted */
function buildFontPreloads(fontCssBlocks, limit = 4) {
  const urlRegex = /url\((['"]?)([^)]+?\.woff2)\1\)/g;
  const urls = [];
  for (const block of fontCssBlocks) {
    let m;
    while ((m = urlRegex.exec(block)) !== null) {
      const href = m[2];
      if (!urls.includes(href)) urls.push(href);
      if (urls.length >= limit) break;
    }
    if (urls.length >= limit) break;
  }
  return urls.map(href => `<link rel="preload" as="font" href="${href}" type="font/woff2" crossorigin>`);
}

/* Per-route head */
function buildRouteHead(routePath) {
  if (routePath.startsWith('/dynamic-theme')) {
    return `
      <title>DMI - Dynamic Theme</title>
      <meta name="description" content="Fresh Media is a Dynamic Media Institute at MassArt tradition! Students exhibit their projects. This is the 2024 curation.">
      <meta name="keywords" content="Innovation, Art, Technology, Science, Culture, Exhibition, Installation, Display, Projects">
      <meta name="theme-color" content="#1e1e1f">
    `;
  }
  return '';
}
function buildHtmlOpen(opts) {
  const {
    IS_DEV,
    routePath,
    iconSvg,
    iconIco,
    preloadLinks,
    fontsCss,
    extractorLinkTags,
    extractorStyleTags,
    emotionStyleTags,
    extraCriticalCss = '',
    injectBeforeRoot = ''
  } = opts;
  const ROOT = process.cwd();
  const cssTheme = readTextSafe(node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(ROOT, 'src/styles/font+theme.css'));
  const cssBlocks = readTextSafe(node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(ROOT, 'src/styles/general-block.css'));

  // App-level critical CSS only for landing routes
  let appCriticalCss = '';
  if (routePath === '/' || routePath === '/home') {
    appCriticalCss = prefixCss(cssTheme) + '\n' + prefixCss(cssBlocks);
  }
  const projectCriticalCss = extraCriticalCss ? '\n' + extraCriticalCss : '';
  const htmlClass = routePath.startsWith('/dynamic-theme') ? 'route-dynamic' : routePath === '/' || routePath === '/home' ? 'font-small' : '';
  const routeHead = buildRouteHead(routePath);
  const injectDefaultSiteHead = routeHead === '';
  const defaultTitle = `<title>Efe Ozalp - Portfolio</title>`;
  const defaultDesc = `<meta name="description" content="web engineering, 3D modeling, visual design portfolio of Efe Ozalp" />`;
  const isDynamicTheme = routePath.startsWith('/dynamic-theme');
  const v = IS_DEV ? `?v=${Date.now()}` : '';
  const iconLinks = isDynamicTheme ? `<link rel="icon" href="${iconSvg}${v}" type="image/svg+xml" sizes="any">` : `<link rel="icon" href="${iconIco}${v}" sizes="any">`;
  const appleTouch = isDynamicTheme ? `<link rel="apple-touch-icon" sizes="180x180" href="/freshmedia-icon.png${v}">` : `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png${v}">`;

  // Inline Dynamic Theme UIcards.css only on /dynamic-theme (no prefix)
  let dynamicThemeInlineCss = '';
  if (isDynamicTheme) {
    const uiCardsCss = readFirst([node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(ROOT, 'src/dynamic-app/styles/UIcards.css'), node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(ROOT, 'src/styles/dynamic-app/UIcards.css')]);
    const sortByCss = readFirst([node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(ROOT, 'src/dynamic-app/styles/sortByStyles.css'), node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(ROOT, 'src/styles/dynamic-app/sortByStyles.css')]);
    const indexCss = readFirst([node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(ROOT, 'src/dynamic-app/styles/index.css'), node_path__WEBPACK_IMPORTED_MODULE_1___default().resolve(ROOT, 'src/styles/dynamic-app/index.css')]);
    if (uiCardsCss) {
      dynamicThemeInlineCss += `<style id="critical-dynamic-ui-cards">${uiCardsCss}</style>`;
    }
    if (sortByCss) {
      dynamicThemeInlineCss += `<style id="critical-dynamic-sortby">${sortByCss}</style>`;
    }
    if (indexCss) {
      dynamicThemeInlineCss += `<style id="critical-dynamic-index">${indexCss}</style>`;
    }
  }

  // FONTS: use whatever was passed (index.jsx trims Poppins/Epilogue for dynamic)
  const fontBlocks = [fontsCss.rubikCss, fontsCss.orbitronCss, fontsCss.poppinsCss, fontsCss.epilogueCss].filter(Boolean);
  const fontPreloadLinks = buildFontPreloads(fontBlocks, 4).join('\n');
  return `<!doctype html>
<html lang="en" class="${htmlClass}">
<head>
<meta charSet="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
${injectDefaultSiteHead ? defaultTitle : ''}
${injectDefaultSiteHead ? defaultDesc : ''}
${IS_DEV ? `<script>window.__ASSET_ORIGIN__="http://"+(window.location.hostname)+":3000"</script>` : ''}

${iconLinks}
${appleTouch}

<link rel="manifest" href="/site.webmanifest" />
<link rel="preconnect" href="https://cdn.sanity.io" crossorigin>
<link rel="dns-prefetch" href="https://cdn.sanity.io">
${(preloadLinks || []).join('\n')}
${fontPreloadLinks}

<style>
${fontBlocks.join('\n')}
</style>

${extractorLinkTags}
${extractorStyleTags}
${appCriticalCss || projectCriticalCss ? `<style id="critical-inline-app-css">${appCriticalCss}${projectCriticalCss}</style>` : ''}
${emotionStyleTags}

${dynamicThemeInlineCss}
${routeHead}
</head>
<body>
${injectBeforeRoot}
<div id="root">`;
}
function buildHtmlClose(ssrPayload, scriptTags, extraScripts = '') {
  const ssrJson = `<script>window.__SSR_DATA__=${JSON.stringify(ssrPayload).replace(/</g, '\\u003c')}</script>`;
  return `</div>${ssrJson}
${extraScripts}
${scriptTags}
</body></html>`;
}

/***/ }),

/***/ "./src/server/index.jsx":
/*!******************************!*\
  !*** ./src/server/index.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv/config */ "dotenv/config");
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/development/index.js");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../App */ "./src/App.jsx");
/* harmony import */ var _loadable_server__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @loadable/server */ "./node_modules/@loadable/server/dist/cjs/loadable-server.cjs.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.cjs.js");
/* harmony import */ var _emotion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./emotion */ "./src/server/emotion.ts");
/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! http-proxy-middleware */ "http-proxy-middleware");
/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(http_proxy_middleware__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _highScoreRoute__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./highScoreRoute */ "./src/server/highScoreRoute.ts");
/* harmony import */ var _utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/context-providers/ssr-data-context */ "./src/utils/context-providers/ssr-data-context.tsx");
/* harmony import */ var _prepareSsrData__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./prepareSsrData */ "./src/server/prepareSsrData.ts");
/* harmony import */ var _ssr_registry__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../ssr/registry */ "./src/ssr/registry.ts");
/* harmony import */ var _ssr_route_registry__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../ssr/route-registry */ "./src/ssr/route-registry.ts");
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./html */ "./src/server/html.ts");
/* harmony import */ var _cssPipeline__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./cssPipeline */ "./src/server/cssPipeline.ts");
/* harmony import */ var _seed__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./seed */ "./src/server/seed.ts");
/* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./assets */ "./src/server/assets.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/server/index.jsx















 // homepage registry
 // dynamic-route registry






const app = express__WEBPACK_IMPORTED_MODULE_4___default()();
app.use(express__WEBPACK_IMPORTED_MODULE_4___default().json());
const IS_DEV = "development" !== 'production';
const HOST = '192.168.1.104';
const DEV_HOST_FOR_ASSETS = '192.168.1.104';
const DEV_ASSETS_ORIGIN = `http://${DEV_HOST_FOR_ASSETS}:3000/`;
const {
  BUILD_DIR,
  STATS_FILE,
  ASSET_MANIFEST
} = (0,_assets__WEBPACK_IMPORTED_MODULE_20__.resolveStatsFile)();

/** API routes */
app.use('/api', _highScoreRoute__WEBPACK_IMPORTED_MODULE_12__["default"]);

/** Static assets */
app.use(express__WEBPACK_IMPORTED_MODULE_4___default()["static"](path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), 'public'), {
  maxAge: '1y',
  index: false
}));
if (IS_DEV) {
  app.use('/static', (0,http_proxy_middleware__WEBPACK_IMPORTED_MODULE_11__.createProxyMiddleware)({
    target: DEV_ASSETS_ORIGIN,
    changeOrigin: true,
    ws: true
  }));
  app.use('/sockjs-node', (0,http_proxy_middleware__WEBPACK_IMPORTED_MODULE_11__.createProxyMiddleware)({
    target: DEV_ASSETS_ORIGIN,
    changeOrigin: true,
    ws: true
  }));
} else {
  app.use('/static', express__WEBPACK_IMPORTED_MODULE_4___default()["static"](path__WEBPACK_IMPORTED_MODULE_1___default().join(BUILD_DIR, 'static'), {
    maxAge: '1y',
    index: false
  }));
  app.use(express__WEBPACK_IMPORTED_MODULE_4___default()["static"](BUILD_DIR, {
    index: false
  }));
}

/** SSR catch-all */
app.get('/*', async (req, res) => {
  const isDynamicTheme = req.path.startsWith('/dynamic-theme');
  if (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(STATS_FILE)) {
    res.status(500).send('<pre>Missing build artifacts. Run `npm run build` or `npm run dev:ssr`.</pre>');
    return;
  }

  // Seed + preload data: only for NON-dynamic routes
  let ssrPayload = {
    seed: null,
    preloaded: {},
    preloadLinks: []
  };

  // Dynamic route bootstrap state
  let dynamicPreload = null;
  let dynamicPreloadLinks = [];
  let dynamicSnapshotHtml = '';
  let dynamicSeed = null;
  if (!isDynamicTheme) {
    const {
      seed
    } = (0,_seed__WEBPACK_IMPORTED_MODULE_19__.getEphemeralSeed)();
    ssrPayload = await (0,_prepareSsrData__WEBPACK_IMPORTED_MODULE_14__.prepareSsrData)(seed);
  } else {
    const desc = _ssr_route_registry__WEBPACK_IMPORTED_MODULE_16__.routeRegistry['dynamic-theme'];
    if (!desc || typeof desc.render !== 'function' || typeof desc.fetch !== 'function') {
      res.status(500).send('<pre>dynamic-theme descriptor missing or invalid.</pre>');
      return;
    }

    // Resolve seed (query wins over ephemeral)
    const rawSeed = Number((req.query || {}).seed);
    dynamicSeed = Number.isFinite(rawSeed) ? rawSeed : (0,_seed__WEBPACK_IMPORTED_MODULE_19__.getEphemeralSeed)().seed;

    // Call the proper fetch variant (seeded or unseeded) based on function arity
    const fetchPromise = desc.fetch.length === 0 ? desc.fetch() : desc.fetch(dynamicSeed);
    dynamicPreload = await fetchPromise;

    // Image preloads for head
    dynamicPreloadLinks = (0,_assets__WEBPACK_IMPORTED_MODULE_20__.buildDynamicImagePreloads)(dynamicPreload?.images || [], 8);

    // Render descriptor section (includes SortBy stub + snapshot container)
    const sectionNode = desc.render(dynamicPreload);
    dynamicSnapshotHtml = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_6__.renderToString)(sectionNode);
  }

  // Chunk extractor / emotion
  const extractor = new _loadable_server__WEBPACK_IMPORTED_MODULE_8__.ChunkExtractor({
    statsFile: STATS_FILE,
    publicPath: IS_DEV ? DEV_ASSETS_ORIGIN : '/'
  });
  const {
    cache,
    extractCriticalToChunks,
    constructStyleTagsFromChunks
  } = (0,_emotion__WEBPACK_IMPORTED_MODULE_10__.createEmotion)();
  const jsx = extractor.collectChunks((0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(_emotion_react__WEBPACK_IMPORTED_MODULE_9__.CacheProvider, {
    value: cache,
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(_utils_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_13__.SsrDataProvider, {
      value: ssrPayload,
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(react_router__WEBPACK_IMPORTED_MODULE_5__.StaticRouter, {
        location: req.url,
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(_App__WEBPACK_IMPORTED_MODULE_7__["default"], {})
      })
    })
  }));
  const prerender = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_6__.renderToString)(jsx);
  const emotionChunks = extractCriticalToChunks(prerender);
  const emotionStyleTags = constructStyleTagsFromChunks(emotionChunks);
  const manifest = (0,_assets__WEBPACK_IMPORTED_MODULE_20__.loadManifestIfAny)(IS_DEV, ASSET_MANIFEST);

  // Icons (html builder chooses which to emit)
  const iconSvg = '/freshmedia-icon.svg';
  const iconIco = !IS_DEV && manifest?.files?.['favicon.ico'] ? manifest.files['favicon.ico'] : '/favicon.ico';

  // Fonts: keep only Rubik + Orbitron on /dynamic-theme
  const allFonts = (0,_assets__WEBPACK_IMPORTED_MODULE_20__.readFontCss)();
  const fontsCss = isDynamicTheme ? {
    rubikCss: allFonts.rubikCss,
    orbitronCss: allFonts.orbitronCss,
    poppinsCss: '',
    epilogueCss: ''
  } : allFonts;

  // Preloads
  const preloadLinks = isDynamicTheme ? dynamicPreloadLinks : (() => {
    const firstKey = Object.keys(ssrPayload.preloaded || {})[0];
    const firstData = firstKey ? ssrPayload.preloaded[firstKey] : null;
    return (0,_assets__WEBPACK_IMPORTED_MODULE_20__.buildPreloadLinks)(firstData);
  })();

  // Critical CSS
  let extraCriticalCss = '';
  if (!isDynamicTheme) {
    const keys = Object.keys(ssrPayload.preloaded || {}).slice(0, 3); // top 3
    const allFiles = keys.flatMap(k => _ssr_registry__WEBPACK_IMPORTED_MODULE_15__.ssrRegistry[k]?.criticalCssFiles ?? []);
    const uniqueFiles = Array.from(new Set(allFiles));
    if (uniqueFiles.length > 0) {
      try {
        extraCriticalCss = await (0,_cssPipeline__WEBPACK_IMPORTED_MODULE_18__.buildCriticalCss)(uniqueFiles);
      } catch {
        extraCriticalCss = '';
      }
    }
  } else {
    const d = _ssr_route_registry__WEBPACK_IMPORTED_MODULE_16__.routeRegistry['dynamic-theme'];
    const files = d && d.criticalCssFiles || [];
    if (files.length > 0) {
      try {
        extraCriticalCss = await (0,_cssPipeline__WEBPACK_IMPORTED_MODULE_18__.buildCriticalCss)(files);
      } catch {
        extraCriticalCss = '';
      }
    }
  }

  // Filter CRA/Loadable CSS on /dynamic-theme (keep JS, drop CSS tags)
  const rawLinkTags = extractor.getLinkTags();
  const extractorLinkTags = isDynamicTheme ? rawLinkTags.replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/g, '') : rawLinkTags;
  const extractorStyleTags = isDynamicTheme ? '' : extractor.getStyleTags();
  const htmlOpen = (0,_html__WEBPACK_IMPORTED_MODULE_17__.buildHtmlOpen)({
    IS_DEV,
    routePath: req.path,
    iconSvg,
    iconIco,
    preloadLinks,
    fontsCss,
    extractorLinkTags,
    extractorStyleTags,
    emotionStyleTags,
    extraCriticalCss,
    injectBeforeRoot: isDynamicTheme ? dynamicSnapshotHtml : ''
  });

  // One dynamic bootstrap (seed included)
  const dynamicBootstrap = isDynamicTheme ? `<script>window.__DYNAMIC_PRELOAD__=${JSON.stringify({
    ...(dynamicPreload || {}),
    seed: dynamicSeed
  }).replace(/</g, '\\u003c')}</script>` : '';
  const htmlClose = (0,_html__WEBPACK_IMPORTED_MODULE_17__.buildHtmlClose)(ssrPayload, extractor.getScriptTags(), dynamicBootstrap);
  let didError = false;
  const ABORT_MS = IS_DEV ? 30000 : 10000;
  const stream = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_6__.renderToPipeableStream)(jsx, {
    onShellReady() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.write(htmlOpen);
      stream.pipe(res, {
        end: false
      });
    },
    onAllReady() {
      clearTimeout(abortTimer);
      res.write(htmlClose);
      res.end();
    },
    onShellError(err) {
      clearTimeout(abortTimer);
      console.error('[SSR] Shell error:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('An error occurred while loading the app.');
    },
    onError(err) {
      didError = true;
      console.error('[SSR] Error:', err);
    }
  });
  const abortTimer = setTimeout(() => {
    if (!res.writableEnded) {
      console.warn('[SSR] Aborting stream after timeout');
      stream.abort();
    }
  }, ABORT_MS);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, HOST, () => {
  console.log(`SSR server running at http://${HOST}:${PORT} (${IS_DEV ? 'development' : 'production'})`);
});

/***/ }),

/***/ "./src/server/prepareDynamicRoute.ts":
/*!*******************************************!*\
  !*** ./src/server/prepareDynamicRoute.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   prepareDynamicRoute: () => (/* binding */ prepareDynamicRoute)
/* harmony export */ });
/* harmony import */ var _dynamic_app_lib_fetchUser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dynamic-app/lib/fetchUser */ "./src/dynamic-app/lib/fetchUser.js");
/* harmony import */ var _dynamic_app_lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-app/lib/fetchSVGIcons */ "./src/dynamic-app/lib/fetchSVGIcons.js");
/* harmony import */ var _utils_seed_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/seed/index */ "./src/utils/seed/index.ts");



function toIconMap(list) {
  return (list || []).reduce((acc, it) => {
    if (!it?.title) return acc;
    const val = it.icon ?? it.url;
    if (typeof val === 'string' && val) acc[it.title] = val;
    return acc;
  }, {});
}

/**
 * Seed is ONLY used on the server to set first-paint order.
 * We also return it for debugging/telemetry, but the client shouldn't reshuffle with it.
 */
async function prepareDynamicRoute(seed) {
  const [iconsRaw, imagesRaw] = await Promise.all([(0,_dynamic_app_lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_1__["default"])().catch(() => []), (0,_dynamic_app_lib_fetchUser__WEBPACK_IMPORTED_MODULE_0__.fetchImages)().catch(() => [])]);
  const icons = toIconMap(Array.isArray(iconsRaw) ? iconsRaw : []);
  const images = Array.isArray(imagesRaw) ? imagesRaw : [];
  const ordered = Number.isFinite(seed) ? (0,_utils_seed_index__WEBPACK_IMPORTED_MODULE_2__.seededShuffle)(images, seed) : images;

  // ok to include seed for logs — client strips/ignores it
  return {
    icons,
    images: ordered,
    seed
  };
}

/***/ }),

/***/ "./src/server/prepareSsrData.ts":
/*!**************************************!*\
  !*** ./src/server/prepareSsrData.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   prepareSsrData: () => (/* binding */ prepareSsrData)
/* harmony export */ });
/* harmony import */ var _utils_content_utility_component_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/content-utility/component-loader */ "./src/utils/content-utility/component-loader.tsx");
/* harmony import */ var _utils_seed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/seed */ "./src/utils/seed/index.ts");
/* harmony import */ var _ssr_registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ssr/registry */ "./src/ssr/registry.ts");
// src/server/prepareSsrData.ts



async function prepareSsrData(seed, count = 3) {
  const order = (0,_utils_seed__WEBPACK_IMPORTED_MODULE_1__.seededShuffle)(_utils_content_utility_component_loader__WEBPACK_IMPORTED_MODULE_0__.baseProjects, seed);
  const preloaded = {};
  let preloadLinks = [];
  const top = order.slice(0, count); // take first N
  for (const proj of top) {
    const desc = _ssr_registry__WEBPACK_IMPORTED_MODULE_2__.ssrRegistry[proj.key];
    if (!desc?.fetch) continue;
    const data = await desc.fetch();
    preloaded[proj.key] = {
      kind: proj.key,
      data
    };
    // skip desc.buildPreloads() since you don’t want any <link rel="preload">
  }
  return {
    seed,
    preloaded,
    preloadLinks
  }; // preloadLinks stays empty
}

/***/ }),

/***/ "./src/server/sanityWrite.ts":
/*!***********************************!*\
  !*** ./src/server/sanityWrite.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   writeClient: () => (/* binding */ writeClient)
/* harmony export */ });
/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sanity/client */ "@sanity/client");
/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sanity_client__WEBPACK_IMPORTED_MODULE_0__);
// src/server/sanityWrite.ts

const writeClient = (0,_sanity_client__WEBPACK_IMPORTED_MODULE_0__.createClient)({
  projectId: 'uyghamp6',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN
});

/***/ }),

/***/ "./src/server/seed.ts":
/*!****************************!*\
  !*** ./src/server/seed.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEphemeralSeed: () => (/* binding */ getEphemeralSeed)
/* harmony export */ });
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:crypto */ "node:crypto");
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_seed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/seed */ "./src/utils/seed/index.ts");
// src/server/seed.ts



// New seed each request; no cookies, nothing persisted.
function getEphemeralSeed() {
  const seedStr = node_crypto__WEBPACK_IMPORTED_MODULE_0__.randomUUID();
  const seed = (0,_utils_seed__WEBPACK_IMPORTED_MODULE_1__.stringToSeed)(seedStr);
  return {
    seed,
    seedStr
  };
}

/***/ }),

/***/ "./src/ssr/dynamic-app/UIcards.ssr.ts":
/*!********************************************!*\
  !*** ./src/ssr/dynamic-app/UIcards.ssr.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderUIcardsHTML: () => (/* binding */ renderUIcardsHTML)
/* harmony export */ });
/** Build a Sanity-style URL pair for low and high quality */
function urlPair(img) {
  const raw = img?.asset?.url || img?.url || (typeof img === 'string' ? img : null);
  if (!raw) return {
    lq: null,
    hq: null
  };
  const sep = raw.includes('?') ? '&' : '?';
  return {
    lq: `${raw}${sep}auto=format&w=320&q=40`,
    hq: `${raw}${sep}auto=format&w=1280&q=80`
  };
}

/** Normalization helpers (trim, collapse spaces, strip accents, lowercase) */
function normalizeKey(s) {
  return s.trim().replace(/\s+/g, ' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('en');
}

/** Build a loose lookup map once per render */
function buildLooseIconMap(icons) {
  const loose = new Map();
  for (const [k, v] of Object.entries(icons || {})) {
    loose.set(normalizeKey(k), v);
  }
  return loose;
}

/** Is the string an inline SVG snippet? */
function isInlineSvg(s) {
  return typeof s === 'string' && /^\s*<svg[\s\S]*<\/svg>\s*$/i.test(s);
}

/** Safe attribute escape for URLs */
function escapeAttr(s) {
  return String(s).replace(/"/g, '&quot;');
}

/** Turn an icon value into HTML (inline <svg> or <img>) */
function iconToHtml(val) {
  if (!val) return '';
  if (isInlineSvg(val)) {
    return `<div class="svg-icon">${val}</div>`;
  }
  return `<img class="svg-icon" src="${escapeAttr(val)}" alt="" aria-hidden="true">`;
}

/** Resolve an icon by (iconName | title) using exact → trimmed → normalized */
function resolveIconValue(icons, loose, iconName, title) {
  const tryKeys = [iconName, title].filter(Boolean);
  for (const key of tryKeys) {
    if (Object.prototype.hasOwnProperty.call(icons, key)) return icons[key];
    const t = key.trim();
    if (Object.prototype.hasOwnProperty.call(icons, t)) return icons[t];
    const n = normalizeKey(key);
    const hit = loose.get(n);
    if (hit) return hit;
  }
  return undefined;
}

/**
 * Render the server HTML snapshot of the cards.
 * Pass the `icons` map returned by `prepareDynamicRoute()` to SSR-inject the SVG.
 * If no per-item icon is found, defaults to `icons['arrow1']`.
 */
function renderUIcardsHTML(images, icons = {}, limit = 12) {
  const items = (Array.isArray(images) ? images : []).slice(0, limit);
  const looseIcons = buildLooseIconMap(icons);
  const Arrow = icons['arrow1'];
  const cards = items.map((it, i) => {
    const {
      lq: u1Lq,
      hq: u1Hq
    } = urlPair(it.image1);
    const {
      lq: u2Lq,
      hq: u2Hq
    } = urlPair(it.image2);
    const alt1 = it?.alt1 ?? it?.title ?? '';
    const alt2 = it?.alt2 ?? it?.title ?? '';
    const url1 = it?.url1 ?? '#';

    // Prefer per-item icon (iconName → title). If none → global arrow
    const iconVal = resolveIconValue(icons, looseIcons, it?.iconName, it?.title) ?? Arrow;
    const iconHtml = iconToHtml(iconVal);

    // first card eager, rest lazy
    const eagerAttrs = i === 0 ? `loading="eager" fetchpriority="high" decoding="async"` : `loading="lazy" decoding="async"`;
    return `
        <div class="card-container custom-card-${i}">
          <div class="image-container custom-card-${i}">
            <a href="${url1}" class="ui-link custom-card-${i}">
              ${u2Lq ? `<img 
                      src="${u2Lq}" 
                      data-src-full="${u2Hq}" 
                      alt="${escapeHtml(alt1)}" 
                      class="ui-image1 custom-card-${i}" 
                      ${eagerAttrs}
                    >` : ''}
            </a>
          </div>
          <div class="image-container2 custom-card-${i}-2">
            <a href="${url1}" class="ui-link-3 custom-card-${i}">
              ${u1Lq ? `<img 
                      src="${u1Lq}" 
                      data-src-full="${u1Hq}" 
                      alt="${escapeHtml(alt2)}" 
                      class="ui-image2 custom-card-${i}-2" 
                      loading="lazy" 
                      decoding="async"
                    >` : ''}
            </a>
            <h-name class="image-title custom-card-${i}">
              <a href="${url1}" class="ui-link-2 custom-card-${i}">
                <span class="title-text">${escapeHtml(it?.title ?? '')}</span>
                ${iconHtml}
              </a>
            </h-name>
          </div>
        </div>
      `;
  }).join('');
  return `
    <div id="dynamic-snapshot" data-ssr-snapshot="1">
      <div class="homePage-container">
        <div class="UI-card-divider">
          ${cards}
        </div>
      </div>
    </div>
  `;
}
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/***/ }),

/***/ "./src/ssr/dynamic-app/dynamic-theme.ssr.tsx":
/*!***************************************************!*\
  !*** ./src/ssr/dynamic-app/dynamic-theme.ssr.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dynamicThemeSSR: () => (/* binding */ dynamicThemeSSR)
/* harmony export */ });
/* harmony import */ var _server_prepareDynamicRoute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../server/prepareDynamicRoute */ "./src/server/prepareDynamicRoute.ts");
/* harmony import */ var _UIcards_ssr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIcards.ssr */ "./src/ssr/dynamic-app/UIcards.ssr.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");



const dynamicThemeSSR = {
  fetch: async seed => (0,_server_prepareDynamicRoute__WEBPACK_IMPORTED_MODULE_0__.prepareDynamicRoute)(seed),
  render: data => {
    const {
      images = [],
      icons = {}
    } = data || {};
    const arrow = icons['arrow2'] || ''; // inline SVG expected

    return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("section", {
      id: "dynamic-theme-ssr",
      className: "dynamic-theme-block ssr-initial",
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "navigation-wrapper",
        id: "dynamic-nav-mount"
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "firework-wrapper",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "firework-divider",
          id: "dynamic-fireworks-mount"
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "section-divider"
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "title-divider",
        id: "dynamic-title-mount"
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "pause-button-wrapper",
        id: "dynamic-pause-mount"
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "sort-by-divider",
        id: "dynamic-sortby-mount",
        "data-ssr-stub": "true",
        children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
          className: "students-heading",
          children: "Students"
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "sort-by-container",
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sort-container",
            children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
              children: "Sort by:"
            })
          }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sort-container2",
            children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              className: "custom-dropdown",
              children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                className: "custom-select",
                children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                  className: "selected-value",
                  children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h5", {
                    children: "Randomized"
                  })
                }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                  className: "custom-arrow",
                  children: arrow ? (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                    className: "svg-icon",
                    dangerouslySetInnerHTML: {
                      __html: arrow
                    }
                  }) : null
                })]
              })
            })
          })]
        })]
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "section-divider2"
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        dangerouslySetInnerHTML: {
          __html: (0,_UIcards_ssr__WEBPACK_IMPORTED_MODULE_1__.renderUIcardsHTML)(images, icons, 12)
        }
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "footer-wrapper",
        id: "dynamic-footer-mount"
      })]
    });
  }
};

/***/ }),

/***/ "./src/ssr/projects/dataviz.ssr.tsx":
/*!******************************************!*\
  !*** ./src/ssr/projects/dataviz.ssr.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   datavizSSR: () => (/* binding */ datavizSSR)
/* harmony export */ });
/* harmony import */ var _utils_get_project_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/get-project-data */ "./src/utils/get-project-data.ts");
/* harmony import */ var _utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/media-providers/image-builder */ "./src/utils/media-providers/image-builder.ts");
/* harmony import */ var _utils_split_drag_pannable_object_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/split+drag/pannable-object-position */ "./src/utils/split+drag/pannable-object-position.tsx");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/ssr/dataviz.ssr.tsx





const datavizSSR = {
  fetch: () => (0,_utils_get_project_data__WEBPACK_IMPORTED_MODULE_0__.getProjectData)('data-viz'),
  render: data => {
    const m1 = data?.mediaOne || {};
    const video = m1.video || {};
    const posterMedium = video.poster ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getMediumImageUrl)(video.poster) : undefined;
    const posterHigh = video.poster ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getHighQualityImageUrl)(video.poster, 1920, 1080, 90) : undefined;
    return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("section", {
      id: "dataviz-ssr",
      className: "block-type-1",
      style: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden'
      },
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        id: "dataviz-media-container",
        className: "media-content",
        style: {
          position: 'absolute',
          width: '100%',
          height: '100%'
        },
        children: posterMedium && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_utils_split_drag_pannable_object_position__WEBPACK_IMPORTED_MODULE_2__["default"], {
          sensitivity: 2,
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("video", {
            id: "dataviz-media-video",
            className: "tooltip-data-viz",
            poster: posterMedium,
            ...(posterHigh ? {
              'data-src-full': posterHigh
            } : {}),
            muted: true,
            playsInline: true,
            loop: true,
            preload: "auto",
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '50% 50%',
              // ensures SSR/client match
              display: 'block'
            },
            children: [video.webmUrl && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("source", {
              src: video.webmUrl,
              type: "video/webm"
            }), video.mp4Url && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("source", {
              src: video.mp4Url,
              type: "video/mp4"
            })]
          })
        })
      })
    });
  },
  criticalCssFiles: ['src/styles/block-type-1.css']
};

/***/ }),

/***/ "./src/ssr/projects/dynamic.ssr.tsx":
/*!******************************************!*\
  !*** ./src/ssr/projects/dynamic.ssr.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dynamicSSR: () => (/* binding */ dynamicSSR)
/* harmony export */ });
/* harmony import */ var _utils_get_project_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/get-project-data */ "./src/utils/get-project-data.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/ssr/projects/dynamic.ssr.tsx



const dynamicSSR = {
  fetch: async () => {
    const rows = (await (0,_utils_get_project_data__WEBPACK_IMPORTED_MODULE_0__.getProjectData)('dynamic-frame')) ?? [];
    const byTitle = Object.fromEntries(rows.map(r => [String(r.title || '').toLowerCase(), r.file?.asset?.url]));
    return {
      laptop: byTitle['laptop'],
      tablet: byTitle['tablet'],
      phone: byTitle['phone']
    };
  },
  render: svgMap => {
    const laptop = svgMap.laptop ?? undefined;
    const tablet = svgMap.tablet ?? undefined;
    const phone = svgMap.phone ?? undefined;
    const fallback = laptop ?? tablet ?? phone;
    return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("section", {
      className: "block-type-a",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "device-wrapper",
        children: [fallback && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("picture", {
          children: [phone ? (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("source", {
            media: "(max-width: 767.98px)",
            srcSet: phone
          }) : null, tablet ? (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("source", {
            media: "(min-width: 768px) and (max-width: 1025px)",
            srcSet: tablet
          }) : null, (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
            id: "dynamic-device-frame",
            src: fallback,
            alt: "device",
            className: "device-frame",
            decoding: "async",
            loading: "eager",
            draggable: false
          })]
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "screen-overlay"
        })]
      })
    });
  },
  // Tell the server how to build preloads for the first project
  buildPreloads: svgMap => {
    const links = [];
    const push = u => {
      if (u) links.push(`<link rel="preload" as="image" href="${u}">`);
    };
    push(svgMap.phone);
    push(svgMap.tablet);
    push(svgMap.laptop);
    return links;
  },
  criticalCssFiles: ['src/styles/block-type-a.css']
};

/***/ }),

/***/ "./src/ssr/projects/game.ssr.tsx":
/*!***************************************!*\
  !*** ./src/ssr/projects/game.ssr.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameSSR: () => (/* binding */ gameSSR)
/* harmony export */ });
/* harmony import */ var _utils_get_project_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/get-project-data */ "./src/utils/get-project-data.ts");
/* harmony import */ var _utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/media-providers/image-builder */ "./src/utils/media-providers/image-builder.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/ssr/projects/game.ssr.tsx




const gameSSR = {
  fetch: async () => await (0,_utils_get_project_data__WEBPACK_IMPORTED_MODULE_0__.getProjectData)('rock-coin'),
  render: coin => {
    const alt = coin?.alt ?? 'Loading';

    // Build responsive URLs
    const mediumUrl = coin?.image ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getMediumImageUrl)(coin.image) : undefined;
    const highUrl = coin?.image ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getHighQualityImageUrl)(coin.image, 512, 512, 80) // coin doesn’t need 2k res
    : undefined;
    return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("section", {
      tabIndex: -1,
      className: "block-type-g ingame",
      style: {
        position: 'relative'
      },
      "data-ssr-shell": "block-game",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "block-g-onboarding tooltip-block-g",
        "aria-live": "polite",
        style: {
          display: 'flex',
          alignItems: 'center'
        },
        children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "coin",
          style: {
            pointerEvents: 'none'
          },
          children: mediumUrl && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
            src: mediumUrl,
            ...(highUrl ? {
              'data-src-full': highUrl
            } : {}),
            alt: alt,
            decoding: "async",
            loading: "eager",
            draggable: false,
            style: {
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }
          })
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h1", {
          className: "onboarding-text",
          style: {
            pointerEvents: 'none'
          },
          children: "Loading Game\u2026"
        })]
      })
    });
  },
  buildPreloads: coin => coin?.image ? [`<link rel="preload" as="image" href="${(0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getMediumImageUrl)(coin.image)}">`] : [],
  criticalCssFiles: ['src/styles/block-type-g.css']
};

/***/ }),

/***/ "./src/ssr/projects/rotary.ssr.tsx":
/*!*****************************************!*\
  !*** ./src/ssr/projects/rotary.ssr.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rotarySSR: () => (/* binding */ rotarySSR)
/* harmony export */ });
/* harmony import */ var _utils_get_project_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/get-project-data */ "./src/utils/get-project-data.ts");
/* harmony import */ var _utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/media-providers/image-builder */ "./src/utils/media-providers/image-builder.ts");
/* harmony import */ var _utils_split_drag_pannable_object_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/split+drag/pannable-object-position */ "./src/utils/split+drag/pannable-object-position.tsx");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/ssr/projects/rotary.ssr.tsx





const rotarySSR = {
  fetch: () => (0,_utils_get_project_data__WEBPACK_IMPORTED_MODULE_0__.getProjectData)('rotary-lamp'),
  render: data => {
    const m1 = data?.mediaOne || {};
    const m2 = data?.mediaTwo || {};

    // Build medium + high URLs safely
    const m1Medium = m1?.image ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getMediumImageUrl)(m1.image) : m1?.imageUrl;
    const m1High = m1?.image ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getHighQualityImageUrl)(m1.image, 1920, 1080, 90) : m1?.imageUrl;
    const m2Medium = m2?.image ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getMediumImageUrl)(m2.image) : m2?.imageUrl;
    const m2High = m2?.image ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getHighQualityImageUrl)(m2.image, 1920, 1080, 90) : m2?.imageUrl;
    return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("section", {
      id: "rotary-ssr",
      className: "block-type-1 ssr-initial-split",
      style: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden'
      },
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        id: "rotary-media-1-container",
        className: "media-content-1",
        style: {
          position: 'absolute'
        },
        children: m1Medium && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_utils_split_drag_pannable_object_position__WEBPACK_IMPORTED_MODULE_2__["default"], {
          sensitivity: 2,
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
            id: "rotary-media-1",
            className: "media-item-1 tooltip-rotary-lamp",
            src: m1Medium,
            ...(m1High ? {
              'data-src-full': m1High
            } : {}),
            alt: m1?.alt ?? 'Rotary Lamp media',
            draggable: false,
            decoding: "async",
            fetchPriority: "high",
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }
          })
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        id: "rotary-enhancer-mount"
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        id: "rotary-media-2-container",
        className: "media-content-2",
        style: {
          position: 'absolute'
        },
        children: m2Medium && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_utils_split_drag_pannable_object_position__WEBPACK_IMPORTED_MODULE_2__["default"], {
          sensitivity: 2,
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
            id: "rotary-media-2",
            className: "media-item-2 tooltip-rotary-lamp",
            src: m2Medium,
            ...(m2High ? {
              'data-src-full': m2High
            } : {}),
            alt: m2?.alt ?? 'Rotary Lamp media',
            draggable: false,
            decoding: "async",
            fetchPriority: "high",
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }
          })
        })
      })]
    });
  },
  criticalCssFiles: ['src/styles/block-type-1.css']
};

/***/ }),

/***/ "./src/ssr/projects/scoop.ssr.tsx":
/*!****************************************!*\
  !*** ./src/ssr/projects/scoop.ssr.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scoopSSR: () => (/* binding */ scoopSSR)
/* harmony export */ });
/* harmony import */ var _utils_get_project_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/get-project-data */ "./src/utils/get-project-data.ts");
/* harmony import */ var _utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/media-providers/image-builder */ "./src/utils/media-providers/image-builder.ts");
/* harmony import */ var _utils_split_drag_pannable_object_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/split+drag/pannable-object-position */ "./src/utils/split+drag/pannable-object-position.tsx");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/ssr/projects/scoop.ssr.tsx





const scoopSSR = {
  fetch: () => (0,_utils_get_project_data__WEBPACK_IMPORTED_MODULE_0__.getProjectData)('ice-scoop'),
  render: data => {
    const m1 = data?.mediaOne || {};
    const m2 = data?.mediaTwo || {};

    // LEFT / TOP media (image only)
    const m1Medium = m1?.image ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getMediumImageUrl)(m1.image) : m1?.imageUrl;
    const m1High = m1?.image ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getHighQualityImageUrl)(m1.image, 1920, 1080, 90) : m1?.imageUrl;

    // RIGHT / BOTTOM media (video always)
    const m2PosterMedium = m2?.video?.poster ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getMediumImageUrl)(m2.video.poster) : undefined;
    const m2PosterHigh = m2?.video?.poster ? (0,_utils_media_providers_image_builder__WEBPACK_IMPORTED_MODULE_1__.getHighQualityImageUrl)(m2.video.poster, 1920, 1080, 90) : undefined;
    return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("section", {
      id: "scoop-ssr",
      className: "block-type-1 ssr-initial-split",
      style: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden'
      },
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        id: "scoop-media-1-container",
        className: "media-content-1",
        style: {
          position: 'absolute'
        },
        children: m1Medium && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_utils_split_drag_pannable_object_position__WEBPACK_IMPORTED_MODULE_2__["default"], {
          sensitivity: 2,
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
            id: "icecream-media-1",
            className: "media-item-1 tooltip-ice-scoop",
            src: m1Medium,
            ...(m1High ? {
              'data-src-full': m1High
            } : {}),
            alt: m1?.alt ?? 'Ice Cream Scoop media',
            draggable: false,
            decoding: "async",
            fetchPriority: "high",
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }
          })
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        id: "scoop-enhancer-mount"
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        id: "scoop-media-2-container",
        className: "media-content-2",
        style: {
          position: 'absolute'
        },
        children: m2PosterMedium && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_utils_split_drag_pannable_object_position__WEBPACK_IMPORTED_MODULE_2__["default"], {
          sensitivity: 2,
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("video", {
            id: "icecream-media-2",
            className: "media-item-2 tooltip-ice-scoop",
            poster: m2PosterMedium,
            ...(m2PosterHigh ? {
              'data-src-full': m2PosterHigh
            } : {}),
            muted: true,
            playsInline: true,
            loop: true,
            preload: "auto",
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            },
            children: [m2?.video?.webmUrl && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("source", {
              src: m2.video.webmUrl,
              type: "video/webm"
            }), m2?.video?.mp4Url && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("source", {
              src: m2.video.mp4Url,
              type: "video/mp4"
            })]
          })
        })
      })]
    });
  },
  criticalCssFiles: ['src/styles/block-type-1.css']
};

/***/ }),

/***/ "./src/ssr/registry.ts":
/*!*****************************!*\
  !*** ./src/ssr/registry.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ssrRegistry: () => (/* binding */ ssrRegistry)
/* harmony export */ });
/* harmony import */ var _projects_scoop_ssr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects/scoop.ssr */ "./src/ssr/projects/scoop.ssr.tsx");
/* harmony import */ var _projects_rotary_ssr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects/rotary.ssr */ "./src/ssr/projects/rotary.ssr.tsx");
/* harmony import */ var _projects_dataviz_ssr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects/dataviz.ssr */ "./src/ssr/projects/dataviz.ssr.tsx");
/* harmony import */ var _projects_dynamic_ssr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projects/dynamic.ssr */ "./src/ssr/projects/dynamic.ssr.tsx");
/* harmony import */ var _projects_game_ssr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projects/game.ssr */ "./src/ssr/projects/game.ssr.tsx");
// src/ssr/registry.ts






const ssrRegistry = {
  scoop: _projects_scoop_ssr__WEBPACK_IMPORTED_MODULE_0__.scoopSSR,
  rotary: _projects_rotary_ssr__WEBPACK_IMPORTED_MODULE_1__.rotarySSR,
  dataviz: _projects_dataviz_ssr__WEBPACK_IMPORTED_MODULE_2__.datavizSSR,
  dynamic: _projects_dynamic_ssr__WEBPACK_IMPORTED_MODULE_3__.dynamicSSR,
  game: _projects_game_ssr__WEBPACK_IMPORTED_MODULE_4__.gameSSR
  // dynamic: undefined,
};

/***/ }),

/***/ "./src/ssr/route-registry.ts":
/*!***********************************!*\
  !*** ./src/ssr/route-registry.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routeRegistry: () => (/* binding */ routeRegistry)
/* harmony export */ });
/* harmony import */ var _dynamic_app_dynamic_theme_ssr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dynamic-app/dynamic-theme.ssr */ "./src/ssr/dynamic-app/dynamic-theme.ssr.tsx");
// src/ssr/route-registry.ts


const routeRegistry = {
  'dynamic-theme': _dynamic_app_dynamic_theme_ssr__WEBPACK_IMPORTED_MODULE_0__.dynamicThemeSSR
};

/***/ }),

/***/ "./src/utils/content-utility/component-loader.tsx":
/*!********************************************************!*\
  !*** ./src/utils/content-utility/component-loader.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   baseProjects: () => (/* binding */ baseProjects),
/* harmony export */   componentMap: () => (/* binding */ componentMap),
/* harmony export */   dynamicLoaders: () => (/* binding */ dynamicLoaders),
/* harmony export */   gameLoaders: () => (/* binding */ gameLoaders),
/* harmony export */   useProjectLoader: () => (/* binding */ useProjectLoader)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context-providers/ssr-data-context */ "./src/utils/context-providers/ssr-data-context.tsx");
/* harmony import */ var _ssr_registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ssr/registry */ "./src/ssr/registry.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/utils/content-utility/component-loader.tsx




// ----- Async loaders for non-dynamic projects

const componentMap = {
  rotary: () => Promise.all(/*! import() */[__webpack_require__.e("src_utils_loading_loading_tsx"), __webpack_require__.e("src_utils_media-providers_media-loader_tsx"), __webpack_require__.e("src_utils_split_drag_split-controller_tsx-src_utils_tooltip_tooltipInit_ts"), __webpack_require__.e("src_components_block-type-1_rotary-lamp_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../components/block-type-1/rotary-lamp */ "./src/components/block-type-1/rotary-lamp.tsx")),
  scoop: () => Promise.all(/*! import() */[__webpack_require__.e("src_utils_loading_loading_tsx"), __webpack_require__.e("src_utils_media-providers_media-loader_tsx"), __webpack_require__.e("src_utils_split_drag_split-controller_tsx-src_utils_tooltip_tooltipInit_ts"), __webpack_require__.e("src_components_block-type-1_ice-cream-scoop_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../components/block-type-1/ice-cream-scoop */ "./src/components/block-type-1/ice-cream-scoop.tsx")),
  dataviz: () => Promise.all(/*! import() */[__webpack_require__.e("src_utils_loading_loading_tsx"), __webpack_require__.e("src_utils_media-providers_media-loader_tsx"), __webpack_require__.e("src_components_block-type-1_data-visualization_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../components/block-type-1/data-visualization */ "./src/components/block-type-1/data-visualization.tsx"))
};

// ----- Split loaders for dynamic (frame & shadow)
const dynamicLoaders = {
  frame: () => __webpack_require__.e(/*! import() | dynamic-frame */ "dynamic-frame").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/dynamic-app/frame */ "./src/components/dynamic-app/frame.tsx")),
  shadow: () => Promise.all(/*! import() | dynamic-shadow */[__webpack_require__.e("src_utils_loading_loading_tsx"), __webpack_require__.e("src_utils_media-providers_media-loader_tsx"), __webpack_require__.e("src_dynamic-app_components_fireworksDisplay_jsx"), __webpack_require__.e("dynamic-app-components-pauseButton"), __webpack_require__.e("src_dynamic-app_dynamic-app-shadow_jsx"), __webpack_require__.e("dynamic-shadow")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../components/dynamic-app/shadow-entry */ "./src/components/dynamic-app/shadow-entry.tsx"))
};
const gameLoaders = {
  components: () => Promise.all(/*! import() | components */[__webpack_require__.e("src_components_rock-escapade_block-g-coin-counter_tsx-src_components_rock-escapade_block-g-ex-c7f136"), __webpack_require__.e("components")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../components/rock-escapade/block-g-host */ "./src/components/rock-escapade/block-g-host.tsx")),
  game: () => Promise.all(/*! import() | game */[__webpack_require__.e("src_components_rock-escapade_game-canvas_tsx"), __webpack_require__.e("game")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../components/rock-escapade/game-canvas */ "./src/components/rock-escapade/game-canvas.tsx"))
};

// Explicit union preserves "dynamic" as a valid key

const toComponent = p => p;

// Stable base list (default client loaders).
// For "dynamic", point to the lightweight frame by default.
// Shadow chunk is mounted separately by the SSR enhancer (SSR path)
// or by ProjectPane's LazyViewMount (client-only path).
const baseProjects = [{
  key: 'scoop',
  title: 'Ice Cream Scoop',
  lazyImport: () => toComponent(Promise.all(/*! import() */[__webpack_require__.e("src_utils_loading_loading_tsx"), __webpack_require__.e("src_utils_media-providers_media-loader_tsx"), __webpack_require__.e("src_utils_split_drag_split-controller_tsx-src_utils_tooltip_tooltipInit_ts"), __webpack_require__.e("src_components_block-type-1_ice-cream-scoop_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../components/block-type-1/ice-cream-scoop */ "./src/components/block-type-1/ice-cream-scoop.tsx")))
}, {
  key: 'rotary',
  title: 'Rotary Lamp',
  lazyImport: () => toComponent(Promise.all(/*! import() */[__webpack_require__.e("src_utils_loading_loading_tsx"), __webpack_require__.e("src_utils_media-providers_media-loader_tsx"), __webpack_require__.e("src_utils_split_drag_split-controller_tsx-src_utils_tooltip_tooltipInit_ts"), __webpack_require__.e("src_components_block-type-1_rotary-lamp_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../components/block-type-1/rotary-lamp */ "./src/components/block-type-1/rotary-lamp.tsx")))
}, {
  key: 'dataviz',
  title: 'Data Visualization',
  lazyImport: () => toComponent(Promise.all(/*! import() */[__webpack_require__.e("src_utils_loading_loading_tsx"), __webpack_require__.e("src_utils_media-providers_media-loader_tsx"), __webpack_require__.e("src_components_block-type-1_data-visualization_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../components/block-type-1/data-visualization */ "./src/components/block-type-1/data-visualization.tsx")))
}, {
  key: 'game',
  title: 'Evade the Rock',
  lazyImport: () => toComponent(gameLoaders.components())
}, {
  key: 'dynamic',
  title: 'Dynamic App',
  isLink: true,
  lazyImport: () => toComponent(dynamicLoaders.frame())
}];

// Hook that returns a loader respecting SSR (when present) and client lazy loading.
function useProjectLoader(key) {
  const ssr = (0,_context_providers_ssr_data_context__WEBPACK_IMPORTED_MODULE_1__.useSsrData)();
  const project = baseProjects.find(p => p.key === key);
  if (!project) throw new Error(`Unknown project key: ${key}`);
  const payload = ssr?.preloaded?.[key];
  const desc = _ssr_registry__WEBPACK_IMPORTED_MODULE_2__.ssrRegistry[key];

  // --- SSR path: render prebuilt HTML (and attach enhancers) ---
  if (payload && desc?.render) {
    const data = payload.data ?? payload;
    if (key === 'rotary') {
      return async () => {
        const Enhancer = (await Promise.all(/*! import() */[__webpack_require__.e("src_utils_split_drag_split-controller_tsx-src_utils_tooltip_tooltipInit_ts"), __webpack_require__.e("src_ssr_projects_rotary_enhancer_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../ssr/projects/rotary.enhancer */ "./src/ssr/projects/rotary.enhancer.tsx"))).default;
        return {
          default: () => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
            children: [desc.render(data), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Enhancer, {})]
          })
        };
      };
    }
    if (key === 'scoop') {
      return async () => {
        const Enhancer = (await Promise.all(/*! import() */[__webpack_require__.e("src_utils_split_drag_split-controller_tsx-src_utils_tooltip_tooltipInit_ts"), __webpack_require__.e("src_ssr_projects_scoop_enhancer_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../ssr/projects/scoop.enhancer */ "./src/ssr/projects/scoop.enhancer.tsx"))).default;
        return {
          default: () => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
            children: [desc.render(data), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Enhancer, {})]
          })
        };
      };
    }
    if (key === 'dataviz') {
      return async () => {
        const Enhancer = (await __webpack_require__.e(/*! import() */ "src_ssr_projects_dataviz_enhancer_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../ssr/projects/dataviz.enhancer */ "./src/ssr/projects/dataviz.enhancer.tsx"))).default;
        return {
          default: () => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
            children: [desc.render(data), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Enhancer, {})]
          })
        };
      };
    }
    if (key === 'dynamic') {
      // Option A: the dynamic SSR enhancer computes overlay sizing AND mounts shadow app
      return async () => {
        const Enhancer = (await __webpack_require__.e(/*! import() */ "src_ssr_projects_dynamic_enhancer_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../ssr/projects/dynamic.enhancer */ "./src/ssr/projects/dynamic.enhancer.tsx"))).default;
        return {
          default: () => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
            children: [desc.render(data), " ", (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Enhancer, {}), "          "]
          })
        };
      };
    }
    if (key === 'game') {
      return async () => {
        const Enhancer = (await Promise.all(/*! import() */[__webpack_require__.e("src_components_rock-escapade_block-g-coin-counter_tsx-src_components_rock-escapade_block-g-ex-c7f136"), __webpack_require__.e("src_ssr_projects_game_enhancer_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../ssr/projects/game.enhancer */ "./src/ssr/projects/game.enhancer.tsx"))).default;
        return {
          default: () => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
            children: [desc.render(data), " ", (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Enhancer, {}), "         "]
          })
        };
      };
    }

    // Default SSR (no enhancer)
    return async () => ({
      default: () => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
        children: desc.render(data)
      })
    });
  }

  // --- Client lazy path ---
  if (key === 'dynamic') {
    // Ensure the default loader is just the lightweight frame
    return dynamicLoaders.frame;
  }
  if (key === 'game') {
    // Ensure the default loader is just the lightweight frame
    return gameLoaders.components;
  }
  return project.lazyImport;
}

/***/ }),

/***/ "./src/utils/context-providers/ssr-data-context.tsx":
/*!**********************************************************!*\
  !*** ./src/utils/context-providers/ssr-data-context.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SsrDataProvider: () => (/* binding */ SsrDataProvider),
/* harmony export */   useSsrData: () => (/* binding */ useSsrData)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");


// Keep this aligned with what the server injects into window.__SSR_DATA__

const SsrDataContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
const useSsrData = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SsrDataContext);
function SsrDataProvider({
  value,
  children
}) {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SsrDataContext.Provider, {
    value: value,
    children: children
  });
}

/***/ }),

/***/ "./src/utils/get-project-data.ts":
/*!***************************************!*\
  !*** ./src/utils/get-project-data.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getProjectData: () => (/* binding */ getProjectData)
/* harmony export */ });
/* harmony import */ var _sanity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sanity */ "./src/utils/sanity.ts");
// src/utils/get-project-data.ts

const queries = {
  'data-viz': `*[_type=="mediaBlock" && slug.current=="data-viz"][0]{
    mediaOne{ alt,image,video{ "webmUrl": webm.asset->url, "mp4Url": mp4.asset->url, poster } }
  }`,
  'ice-scoop': `*[_type=="mediaBlock" && slug.current=="ice-scoop"][0]{
    mediaOne{ alt,image,video{ "webmUrl": webm.asset->url, "mp4Url": mp4.asset->url, poster } },
    mediaTwo{ alt,image,video{ "webmUrl": webm.asset->url, "mp4Url": mp4.asset->url, poster } }
  }`,
  'rotary-lamp': `*[_type=="mediaBlock" && title match "Rotary Lamp"][0]{
    mediaOne{ alt, image{asset->{url}}, video{ asset->{url} } },
    mediaTwo{ alt, image{asset->{url}}, video{ asset->{url} } }
  }`,
  'dynamic-frame': `*[_type == "svgAsset" && title in ["Laptop","Tablet","Phone"]]{
    title, file{ asset->{ url } }
  }`,
  'rock-coin': `*[_type=="imageDemanded" && title=="coin"][0]{
    alt,
    image{ asset->{ url } } 
  }`
  // add others as I go
};
async function getProjectData(key) {
  const q = queries[key];
  if (!q) return null;
  try {
    return await _sanity__WEBPACK_IMPORTED_MODULE_0__["default"].fetch(q);
  } catch (e) {
    console.error(`[getProjectData] ${key} failed:`, e);
    return null;
  }
}

/***/ }),

/***/ "./src/utils/load-lottie.ts":
/*!**********************************!*\
  !*** ./src/utils/load-lottie.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   destroyLottieAt: () => (/* binding */ destroyLottieAt),
/* harmony export */   loadLottie: () => (/* binding */ loadLottie)
/* harmony export */ });
// utils/load-lottie.ts
let _promise = null;

// Track the animation bound to each container to prevent double-SVG / leaks
const _byContainer = new WeakMap();

/** One-time preload of the SVG-only build */
function loadLottie() {
  if (!_promise) {
    _promise = Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! lottie-web/build/player/lottie_svg */ "lottie-web/build/player/lottie_svg", 23)).then(m => m.default ?? m);
  }
  return _promise;
}
function destroyFor(container) {
  if (!container) return;
  const prev = _byContainer.get(container);
  try {
    prev?.destroy?.();
  } catch {}
  _byContainer.delete(container);
  // belt & suspenders: ensure old SVG is gone
  try {
    container.innerHTML = '';
  } catch {}
}

/** Safer loadAnimation that avoids half renders and duplicate SVGs */
async function loadAnimationSafe(params) {
  const mod = await loadLottie();
  const container = params?.container;
  if (container) destroyFor(container);
  const anim = mod.loadAnimation({
    // Keep your defaults; you can still override in caller
    renderer: 'svg',
    rendererSettings: {
      progressiveLoad: true,
      hideOnTransparent: true,
      viewBoxOnly: true,
      ...(params?.rendererSettings || {})
    },
    ...params
  });
  if (container) _byContainer.set(container, anim);

  // First-frame/layout nudge to avoid “half-rendered until remount”
  const onDOMLoaded = () => {
    try {
      anim.resize?.();
    } catch {}
    anim.removeEventListener?.('DOMLoaded', onDOMLoaded);
  };
  anim.addEventListener?.('DOMLoaded', onDOMLoaded);
  return anim;
}
function destroyLottieAt(container) {
  destroyFor(container);
}

/** Proxy keeps your existing `lottie.method()` calls working */
const lottie = new Proxy({}, {
  get(_t, prop) {
    if (prop === 'loadAnimation') {
      return params => loadAnimationSafe(params);
    }
    if (prop === 'destroyFor' || prop === 'destroyLottieAt') {
      return destroyLottieAt;
    }
    // Pass-through for everything else once loaded
    return (...args) => loadLottie().then(mod => mod[prop](...args));
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lottie);

/***/ }),

/***/ "./src/utils/media-providers/image-builder.ts":
/*!****************************************************!*\
  !*** ./src/utils/media-providers/image-builder.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHighQualityImageUrl: () => (/* binding */ getHighQualityImageUrl),
/* harmony export */   getLowResImageUrl: () => (/* binding */ getLowResImageUrl),
/* harmony export */   getMediumImageUrl: () => (/* binding */ getMediumImageUrl),
/* harmony export */   urlFor: () => (/* binding */ urlFor)
/* harmony export */ });
/* harmony import */ var _sanity_image_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sanity/image-url */ "../../../node_modules/@sanity/image-url/lib/node/index.js");
/* harmony import */ var _sanity_image_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sanity_image_url__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sanity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sanity */ "./src/utils/sanity.ts");
// src/utils/image-builder.ts


const builder = _sanity_image_url__WEBPACK_IMPORTED_MODULE_0___default()(_sanity__WEBPACK_IMPORTED_MODULE_1__["default"]);

// Base builder
const urlFor = source => builder.image(source);

// Ultra-low-res (LQIP)
const getLowResImageUrl = source => urlFor(source).ignoreImageParams().width(128).height(128).quality(30).auto('format').url();

// Medium
const getMediumImageUrl = source => urlFor(source).ignoreImageParams().width(640).height(360).quality(60).auto('format').url();

// High
const getHighQualityImageUrl = (source, width = 1920, height = 1080, quality = 100) => urlFor(source).ignoreImageParams().width(width).height(height).quality(quality).auto('format').url();

/***/ }),

/***/ "./src/utils/sanity.ts":
/*!*****************************!*\
  !*** ./src/utils/sanity.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sanity/client */ "@sanity/client");
/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sanity_client__WEBPACK_IMPORTED_MODULE_0__);
// utils/sanity.ts

const client = (0,_sanity_client__WEBPACK_IMPORTED_MODULE_0__.createClient)({
  projectId: 'uyghamp6',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (client);

/***/ }),

/***/ "./src/utils/seed/index.ts":
/*!*********************************!*\
  !*** ./src/utils/seed/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   seededShuffle: () => (/* binding */ seededShuffle),
/* harmony export */   splitmix32: () => (/* binding */ splitmix32),
/* harmony export */   stringToSeed: () => (/* binding */ stringToSeed)
/* harmony export */ });
// src/utils/seed/index.ts

// --- PRNG (splitmix32) ---
function splitmix32(seed) {
  let a = seed >>> 0;
  return function () {
    a = a + 0x9e3779b9 >>> 0;
    let t = a ^ a >>> 16;
    t = Math.imul(t, 0x85ebca6b) >>> 0;
    t ^= t >>> 13;
    t = Math.imul(t, 0xc2b2ae35) >>> 0;
    t ^= t >>> 16;
    return (t >>> 0) / 4294967296;
  };
}

// --- seed from string (FNV-1a-ish) ---
function stringToSeed(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// --- deterministic Fisher–Yates ---
function seededShuffle(arr, seed) {
  const rand = splitmix32(seed);
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/***/ }),

/***/ "./src/utils/split+drag/pannable-object-position.tsx":
/*!***********************************************************!*\
  !*** ./src/utils/split+drag/pannable-object-position.tsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PannableViewport)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");


/**
 * Wraps a single <img> or <video>.
 * - Pan by dragging (via CSS object-position)
 * - Zoom inside the component only (pinch on touch devices, Ctrl+wheel on desktop)
 * - Double-click resets both pan and zoom
 * - Marks itself with data-allow-zoom="1" so the page-level blocker skips it
 */
function PannableViewport({
  className,
  style,
  children,
  sensitivity = 1.75,
  minScale = 1,
  maxScale = 3
}) {
  const hostRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const draggingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const scaleRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(1);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const host = hostRef.current;
    if (!host) return;
    const media = host.querySelector('img, video');
    if (!media) return;
    const styleMedia = media.style;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    // Object-fit defaults and object-position baseline
    if (!styleMedia.objectFit) styleMedia.objectFit = 'cover';
    const computed = window.getComputedStyle(media);
    if (!computed.objectPosition || computed.objectPosition === 'initial') {
      styleMedia.objectPosition = '50% 50%';
    }
    media.draggable = false;

    // Element-scoped zoom via transform scale
    styleMedia.transformOrigin = '50% 50%';
    const applyScale = s => {
      scaleRef.current = clamp(s, minScale, maxScale);
      styleMedia.transform = scaleRef.current === 1 ? '' : `scale(${scaleRef.current})`;
    };
    const sensX = typeof sensitivity === 'number' ? sensitivity : clamp(sensitivity?.x ?? 1, 0.1, 10);
    const sensY = typeof sensitivity === 'number' ? sensitivity : clamp(sensitivity?.y ?? 1, 0.1, 10);
    let cw = 0,
      ch = 0; // container
    let mw = 0,
      mh = 0; // intrinsic
    let dispW = 0,
      dispH = 0;
    let canPanX = false,
      canPanY = false;
    let pctPerPxX = 0,
      pctPerPxY = 0;
    const parseOP = () => {
      const op = window.getComputedStyle(media).objectPosition || '50% 50%';
      const [oxRaw, oyRaw] = op.split(/\s+/).map(t => t.trim());
      const toPct = v => {
        if (v.endsWith('%')) return parseFloat(v);
        const n = parseFloat(v);
        return Number.isFinite(n) ? clamp(n, 0, 100) : 50;
      };
      return [toPct(oxRaw), toPct(oyRaw)];
    };
    const setOP = (xPct, yPct) => {
      const x = clamp(xPct, 0, 100);
      const y = clamp(yPct, 0, 100);
      styleMedia.objectPosition = `${x}% ${y}%`;
    };
    const computeCover = () => {
      const rect = host.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      if (media instanceof HTMLImageElement) {
        mw = media.naturalWidth || 0;
        mh = media.naturalHeight || 0;
      } else if (media instanceof HTMLVideoElement) {
        mw = media.videoWidth || 0;
        mh = media.videoHeight || 0;
      }
      if (!mw || !mh || !cw || !ch) {
        dispW = dispH = 0;
        canPanX = canPanY = false;
        pctPerPxX = pctPerPxY = 0;
        return;
      }
      const scale = Math.max(cw / mw, ch / mh); // cover
      dispW = mw * scale;
      dispH = mh * scale;
      const overflowX = dispW - cw;
      const overflowY = dispH - ch;
      canPanX = overflowX > 1;
      canPanY = overflowY > 1;
      pctPerPxX = canPanX ? 100 / overflowX * sensX : 0;
      pctPerPxY = canPanY ? 100 / overflowY * sensY : 0;
    };
    computeCover();

    // Resize observer to keep math fresh
    let ro = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => computeCover());
      ro.observe(host);
    }

    // Videos: wait for metadata for intrinsic sizes
    let onMeta = null;
    if (media instanceof HTMLVideoElement) {
      onMeta = () => computeCover();
      media.addEventListener('loadedmetadata', onMeta);
    }

    // Drag-to-pan
    let startX = 0,
      startY = 0;
    let startOPX = 50,
      startOPY = 50;
    const setGestureLock = on => {
      draggingRef.current = on;
      if (on) {
        host.dataset.gestureLock = '1';
        host.style.touchAction = 'none';
        host.style.cursor = 'grabbing';
      } else {
        delete host.dataset.gestureLock;
        host.style.touchAction = '';
        host.style.cursor = '';
      }
    };
    const onPointerDown = e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target?.closest('a,button,[role="button"]')) return;
      const [ox, oy] = parseOP();
      startOPX = ox;
      startOPY = oy;
      startX = e.clientX;
      startY = e.clientY;
      e.currentTarget.setPointerCapture?.(e.pointerId);
      setGestureLock(true);
    };
    const onPointerMove = e => {
      if (!draggingRef.current) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      let nextX = startOPX,
        nextY = startOPY;
      if (canPanX) nextX = startOPX + dx * pctPerPxX;
      if (canPanY) nextY = startOPY + dy * pctPerPxY;
      setOP(nextX, nextY);
    };
    const endDrag = e => {
      if (!draggingRef.current) return;
      if (e) e.currentTarget.releasePointerCapture?.(e.pointerId);
      setGestureLock(false);
    };

    // Double-click to reset both pan and zoom
    const onDblClick = () => {
      setOP(50, 50);
      applyScale(1);
    };

    // Element-scoped zoom
    // Desktop/trackpad: Ctrl + wheel is treated as pinch by browsers
    const onWheel = e => {
      if (!e.ctrlKey) return; // only consume pinch-zoom wheels
      e.preventDefault(); // keep zoom local to this element
      const delta = -e.deltaY; // wheel up -> zoom in
      const next = scaleRef.current * (1 + delta * 0.0015);
      applyScale(next);
    };

    // iOS Safari: gesture events
    let startScale = 1;
    const onGestureStart = () => {
      startScale = scaleRef.current;
    };
    const onGestureChange = e => {
      const rel = typeof e?.scale === 'number' ? e.scale : 1;
      applyScale(startScale * rel);
    };
    const onGestureEnd = () => {};

    // Listeners
    if ('PointerEvent' in window) {
      host.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove, {
        passive: true
      });
      window.addEventListener('pointerup', endDrag, {
        passive: true
      });
    }
    host.addEventListener('dblclick', onDblClick);
    host.addEventListener('wheel', onWheel, {
      passive: false
    });
    host.addEventListener('gesturestart', onGestureStart);
    host.addEventListener('gesturechange', onGestureChange);
    host.addEventListener('gestureend', onGestureEnd);
    return () => {
      ro?.disconnect();
      if (media instanceof HTMLVideoElement && onMeta) {
        media.removeEventListener('loadedmetadata', onMeta);
      }
      if ('PointerEvent' in window) {
        host.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', endDrag);
      }
      host.removeEventListener('dblclick', onDblClick);
      host.removeEventListener('wheel', onWheel);
      host.removeEventListener('gesturestart', onGestureStart);
      host.removeEventListener('gesturechange', onGestureChange);
      host.removeEventListener('gestureend', onGestureEnd);
      setGestureLock(false);
      applyScale(1);
    };
  }, [sensitivity, minScale, maxScale]);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ref: hostRef,
    className: ['pannable-viewport', className].filter(Boolean).join(' '),
    "data-gesture-lock": draggingRef.current ? '1' : undefined,
    "data-allow-zoom": "1" // opt-in so FrontPage allows pinch here
    ,
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      cursor: 'grab',
      ...style
    },
    children: children
  });
}

/***/ }),

/***/ "@babel/runtime/helpers/assertThisInitialized":
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/assertThisInitialized" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@babel/runtime/helpers/assertThisInitialized");

/***/ }),

/***/ "@babel/runtime/helpers/extends":
/*!*************************************************!*\
  !*** external "@babel/runtime/helpers/extends" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@babel/runtime/helpers/extends");

/***/ }),

/***/ "@babel/runtime/helpers/inheritsLoose":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/inheritsLoose" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@babel/runtime/helpers/inheritsLoose");

/***/ }),

/***/ "@babel/runtime/helpers/objectWithoutPropertiesLoose":
/*!**********************************************************************!*\
  !*** external "@babel/runtime/helpers/objectWithoutPropertiesLoose" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@babel/runtime/helpers/objectWithoutPropertiesLoose");

/***/ }),

/***/ "@sanity/client":
/*!*********************************!*\
  !*** external "@sanity/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@sanity/client");

/***/ }),

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("cookie");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv/config");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "hoist-non-react-statics":
/*!******************************************!*\
  !*** external "hoist-non-react-statics" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("hoist-non-react-statics");

/***/ }),

/***/ "html-tokenize":
/*!********************************!*\
  !*** external "html-tokenize" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("html-tokenize");

/***/ }),

/***/ "http-proxy-middleware":
/*!****************************************!*\
  !*** external "http-proxy-middleware" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("http-proxy-middleware");

/***/ }),

/***/ "lodash/flatMap.js":
/*!************************************!*\
  !*** external "lodash/flatMap.js" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/flatMap.js");

/***/ }),

/***/ "lodash/uniq.js":
/*!*********************************!*\
  !*** external "lodash/uniq.js" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/uniq.js");

/***/ }),

/***/ "lodash/uniqBy.js":
/*!***********************************!*\
  !*** external "lodash/uniqBy.js" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/uniqBy.js");

/***/ }),

/***/ "lottie-web":
/*!*****************************!*\
  !*** external "lottie-web" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("lottie-web");

/***/ }),

/***/ "lottie-web/build/player/lottie_svg":
/*!*****************************************************!*\
  !*** external "lottie-web/build/player/lottie_svg" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("lottie-web/build/player/lottie_svg");

/***/ }),

/***/ "multipipe":
/*!****************************!*\
  !*** external "multipipe" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("multipipe");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "postcss":
/*!**************************!*\
  !*** external "postcss" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("postcss");

/***/ }),

/***/ "postcss-prefix-selector":
/*!******************************************!*\
  !*** external "postcss-prefix-selector" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("postcss-prefix-selector");

/***/ }),

/***/ "q5":
/*!*********************!*\
  !*** external "q5" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("q5");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom/server");

/***/ }),

/***/ "react-router/dom":
/*!***********************************!*\
  !*** external "react-router/dom" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-router/dom");

/***/ }),

/***/ "react-shadow":
/*!*******************************!*\
  !*** external "react-shadow" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-shadow");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "set-cookie-parser":
/*!************************************!*\
  !*** external "set-cookie-parser" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("set-cookie-parser");

/***/ }),

/***/ "stylis":
/*!*************************!*\
  !*** external "stylis" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stylis");

/***/ }),

/***/ "through":
/*!**************************!*\
  !*** external "through" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("through");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".server.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			"main": 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module factories are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.jsx");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=server.js.map