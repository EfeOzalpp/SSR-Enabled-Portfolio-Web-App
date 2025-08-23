"use strict";
exports.id = "DynamicTheme-jsx";
exports.ids = ["DynamicTheme-jsx"];
exports.modules = {

/***/ "./src/DynamicTheme.jsx":
/*!******************************!*\
  !*** ./src/DynamicTheme.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dynamic_app_components_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dynamic-app/components/navigation */ "./src/dynamic-app/components/navigation.jsx");
/* harmony import */ var _dynamic_app_components_title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dynamic-app/components/title */ "./src/dynamic-app/components/title.jsx");
/* harmony import */ var _dynamic_app_components_homepage_UIcards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dynamic-app/components/homepage-UIcards */ "./src/dynamic-app/components/homepage-UIcards.jsx");
/* harmony import */ var _dynamic_app_components_sortBy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dynamic-app/components/sortBy */ "./src/dynamic-app/components/sortBy.jsx");
/* harmony import */ var _utils_loading_loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/loading/loading */ "./src/utils/loading/loading.tsx");
/* harmony import */ var _dynamic_app_components_fireworksDisplay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dynamic-app/components/fireworksDisplay */ "./src/dynamic-app/components/fireworksDisplay.jsx");
/* harmony import */ var _dynamic_app_components_pauseButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dynamic-app/components/pauseButton */ "./src/dynamic-app/components/pauseButton.jsx");
/* harmony import */ var _dynamic_app_components_footer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dynamic-app/components/footer */ "./src/dynamic-app/components/footer.jsx");
/* harmony import */ var _dynamic_app_lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dynamic-app/lib/fetchSVGIcons */ "./src/dynamic-app/lib/fetchSVGIcons.js");
/* harmony import */ var _dynamic_app_lib_documentObserver_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dynamic-app/lib/documentObserver.ts */ "./src/dynamic-app/lib/documentObserver.ts");
/* harmony import */ var _dynamic_app_lib_setupAltObserver__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dynamic-app/lib/setupAltObserver */ "./src/dynamic-app/lib/setupAltObserver.js");
/* harmony import */ var _dynamic_app_components_IntroOverlay__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dynamic-app/components/IntroOverlay */ "./src/dynamic-app/components/IntroOverlay.jsx");
/* harmony import */ var _dynamic_app_lib_colorString_ts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dynamic-app/lib/colorString.ts */ "./src/dynamic-app/lib/colorString.ts");
/* harmony import */ var _styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./styles/dynamic-app/misc.css?raw */ "./src/styles/dynamic-app/misc.css?raw");
/* harmony import */ var _styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _styles_dynamic_app_index_css_raw__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./styles/dynamic-app/index.css?raw */ "./src/styles/dynamic-app/index.css?raw");
/* harmony import */ var _styles_dynamic_app_index_css_raw__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_index_css_raw__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _styles_loading_overlay_css_raw__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./styles/loading-overlay.css?raw */ "./src/styles/loading-overlay.css?raw");
/* harmony import */ var _styles_loading_overlay_css_raw__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_styles_loading_overlay_css_raw__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _utils_context_providers_style_injector_ts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./utils/context-providers/style-injector.ts */ "./src/utils/context-providers/style-injector.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// DynamicTheme.jsx



















function DynamicTheme() {
  const [sortedImages, setSortedImages] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [svgIcons, setSvgIcons] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [activeColor, setActiveColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('#FFFFFF');
  const [movingTextColors, setMovingTextColors] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(['#FFFFFF', '#FFFFFF', '#FFFFFF']);
  const [lastKnownColor, setLastKnownColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('#FFFFFF');
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [pauseAnimation, setPauseAnimation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const toggleFireworksRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const dynamicAppRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [showFireworks, setShowFireworks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,_utils_context_providers_style_injector_ts__WEBPACK_IMPORTED_MODULE_17__.useStyleInjection)((_styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_14___default()), 'dynamic-app-style-misc');
  (0,_utils_context_providers_style_injector_ts__WEBPACK_IMPORTED_MODULE_17__.useStyleInjection)((_styles_dynamic_app_index_css_raw__WEBPACK_IMPORTED_MODULE_15___default()), 'dynamic-app-style-index');
  (0,_utils_context_providers_style_injector_ts__WEBPACK_IMPORTED_MODULE_17__.useStyleInjection)((_styles_loading_overlay_css_raw__WEBPACK_IMPORTED_MODULE_16___default()), 'dynamic-app-style-overlay');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setTimeout(() => {
      (0,_dynamic_app_lib_fetchSVGIcons__WEBPACK_IMPORTED_MODULE_9__["default"])().then(icons => {
        const iconMapping = icons.reduce((acc, icon) => {
          acc[icon.title] = icon.icon;
          return acc;
        }, {});
        setSvgIcons(iconMapping);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      });
    }, 400);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isLoading) {
      (0,_dynamic_app_lib_documentObserver_ts__WEBPACK_IMPORTED_MODULE_10__["default"])(pauseAnimation, document);
      (0,_dynamic_app_lib_setupAltObserver__WEBPACK_IMPORTED_MODULE_11__["default"])(handleActivate, handleDeactivate);
    }
  }, [isLoading, sortedImages, pauseAnimation]);
  const handleSetToggleFireworks = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(toggleFunction => {
    toggleFireworksRef.current = toggleFunction;
  }, []);
  const handlePauseToggle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(isEnabled => {
    if (toggleFireworksRef.current) {
      toggleFireworksRef.current(isEnabled);
    }
    setPauseAnimation(!isEnabled);
  }, []);
  const handleActivate = alt1 => {
    const colors = _dynamic_app_lib_colorString_ts__WEBPACK_IMPORTED_MODULE_13__.colorMapping[alt1];
    if (colors && colors[0] !== activeColor) {
      setActiveColor(colors[2]);
      setMovingTextColors([colors[0], colors[1], colors[3]]);
      setLastKnownColor(colors[2]);
    }
  };
  const handleDeactivate = alt1 => {
    if (activeColor !== lastKnownColor) {
      setActiveColor(lastKnownColor);
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fireworkContainer = document.querySelector('.firework-divider');
    if (!fireworkContainer) {
      console.warn('[FireworkObserver] Firework container not found');
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      const isVisible = entry.isIntersecting;
      setShowFireworks(prev => {
        if (prev !== isVisible) {
          console.log('[FireworkObserver] State changed:', isVisible);
          return isVisible;
        }
        return prev;
      });
    }, {
      threshold: 0.1
    });
    observer.observe(fireworkContainer);
    return () => observer.disconnect();
  }, []);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("title", {
      children: "DMI - Dynamic Theme"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("meta", {
      name: "description",
      content: "Fresh Media is a Dynamic Media Institute at MassArt tradition! Students exhibit their projects. This is the 2025 curation."
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("meta", {
      name: "keywords",
      content: "Innovation, Art, Technology, Science, Culture, Exhibition, Installation, Display, Projects"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("meta", {
      name: "theme-color",
      content: "#1e1e1f"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("link", {
      rel: "icon",
      href: "/freshmedia-icon.svg",
      type: "image/svg+xml"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("link", {
      rel: "shortcut icon",
      type: "image/svg+xml",
      href: "/freshmedia-icon.svg"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("link", {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/freshmedia-icon.svg"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("meta", {
      property: "og:title",
      content: "DMI MassArt - Fresh Media 2025"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("meta", {
      property: "og:description",
      content: "Fresh Media is a Dynamic Media Institute at MassArt tradition! This is the 2025 curation."
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("meta", {
      property: "og:type",
      content: "website"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("meta", {
      property: "og:image",
      content: "https://www.example.com/image-path/og-image.jpg"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("meta", {
      property: "og:url",
      content: "https://www.example.com/page-url/"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("meta", {
      name: "twitter:card",
      content: "summary_large_image"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("meta", {
      name: "twitter:title",
      content: "DMI MassArt - Fresh Media 2025"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("meta", {
      name: "twitter:description",
      content: "Fresh Media is a Dynamic Media Institute at MassArt tradition! This is the 2025 curation."
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("meta", {
      name: "twitter:image",
      content: "https://www.example.com/image-path/twitter-image.jpg"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
      className: "dynamic-app",
      ref: dynamicAppRef,
      children: isLoading ? (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_utils_loading_loading__WEBPACK_IMPORTED_MODULE_5__["default"], {
        isFullScreen: true
      }) : (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
        className: "homePage-container",
        children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_dynamic_app_components_IntroOverlay__WEBPACK_IMPORTED_MODULE_12__["default"], {}), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
          className: "navigation-wrapper",
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_dynamic_app_components_navigation__WEBPACK_IMPORTED_MODULE_1__["default"], {
            customArrowIcon2: svgIcons['arrow1'],
            customArrowIcon: svgIcons['arrow2'],
            items: sortedImages,
            activeColor: activeColor
          })
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
          className: "firework-divider",
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "section-divider"
          }), showFireworks && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_dynamic_app_components_fireworksDisplay__WEBPACK_IMPORTED_MODULE_6__["default"], {
            colorMapping: _dynamic_app_lib_colorString_ts__WEBPACK_IMPORTED_MODULE_13__.colorMapping,
            items: sortedImages,
            activeColor: activeColor,
            lastKnownColor: lastKnownColor,
            onToggleFireworks: handleSetToggleFireworks
          })]
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
          className: "section-divider"
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
          className: "title-divider",
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_dynamic_app_components_title__WEBPACK_IMPORTED_MODULE_2__["default"], {
            svgIcon: svgIcons['logo-small-1'],
            movingTextColors: movingTextColors,
            pauseAnimation: pauseAnimation
          })
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
          id: "homePage",
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
            className: "no-overflow",
            children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
              className: "pause-button-wrapper",
              children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_dynamic_app_components_pauseButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
                toggleP5Animation: handlePauseToggle
              })
            }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
              className: "sort-by-divider",
              children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("h3", {
                className: "students-heading",
                children: "Students"
              }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_dynamic_app_components_sortBy__WEBPACK_IMPORTED_MODULE_4__["default"], {
                setSortOption: () => {},
                onFetchItems: setSortedImages,
                customArrowIcon: svgIcons['arrow2'],
                colorMapping: _dynamic_app_lib_colorString_ts__WEBPACK_IMPORTED_MODULE_13__.colorMapping
              })]
            }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
              className: "section-divider2"
            }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
              className: "UI-card-divider",
              children: sortedImages.map((imageData, index) => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_dynamic_app_components_homepage_UIcards__WEBPACK_IMPORTED_MODULE_3__["default"], {
                title: imageData.title,
                backgroundColor: imageData.backgroundColor,
                image1: imageData.image1,
                image2: imageData.image2,
                alt1: imageData.alt1,
                alt2: imageData.alt2,
                url1: imageData.url1,
                className: `custom-card-${index}`,
                customArrowIcon2: svgIcons['arrow1']
              }, index))
            }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_dynamic_app_components_footer__WEBPACK_IMPORTED_MODULE_8__["default"], {
              customArrowIcon2: svgIcons['arrow1'],
              linkArrowIcon: svgIcons['link-icon']
            })]
          })
        })]
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicTheme);

/***/ }),

/***/ "./src/dynamic-app/lib/documentObserver.ts":
/*!*************************************************!*\
  !*** ./src/dynamic-app/lib/documentObserver.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/utils/content-utility/real-mobile.ts":
/*!**************************************************!*\
  !*** ./src/utils/content-utility/real-mobile.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ })

};
;
//# sourceMappingURL=DynamicTheme-jsx.server.js.map