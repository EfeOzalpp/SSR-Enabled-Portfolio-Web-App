exports.id = "dynamic-app-components-navigation";
exports.ids = ["dynamic-app-components-navigation"];
exports.modules = {

/***/ "./src/dynamic-app/components/navigation.jsx":
/*!***************************************************!*\
  !*** ./src/dynamic-app/components/navigation.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_fetchGallery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/fetchGallery */ "./src/dynamic-app/lib/fetchGallery.js");
/* harmony import */ var _utils_context_providers_style_injector_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/context-providers/style-injector.ts */ "./src/utils/context-providers/style-injector.ts");
/* harmony import */ var _styles_dynamic_app_navigation_css_raw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/dynamic-app/navigation.css?raw */ "./src/styles/dynamic-app/navigation.css?raw");
/* harmony import */ var _styles_dynamic_app_navigation_css_raw__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_navigation_css_raw__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");





const Navigation = ({
  activeColor,
  customArrowIcon,
  customArrowIcon2,
  isInShadow = false
}) => {
  const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [lastScrollY, setLastScrollY] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [isScrollingUp, setIsScrollingUp] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [isScrolled, setIsScrolled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [galleryImages, setGalleryImages] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [showScrollHint, setShowScrollHint] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [hasShownScrollHint, setHasShownScrollHint] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,_utils_context_providers_style_injector_ts__WEBPACK_IMPORTED_MODULE_2__.useStyleInjection)((_styles_dynamic_app_navigation_css_raw__WEBPACK_IMPORTED_MODULE_3___default()), 'dynamic-app-style-nav');
  const toggleMenu = () => {
    if (isInShadow) return; // no nav in shadow mock
    setIsOpen(prev => !prev);
  };
  const handleCloseMenu = () => setIsOpen(false);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Always visible if near the top
    if (currentScrollY <= 5) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(currentScrollY < lastScrollY);
    }
    setIsScrolled(currentScrollY > window.innerHeight * 0.1);
    setLastScrollY(currentScrollY);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.body.classList.toggle('no-scroll', isOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchImages = async () => {
      try {
        const images = await (0,_lib_fetchGallery__WEBPACK_IMPORTED_MODULE_1__["default"])();
        setGalleryImages(images);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };
    fetchImages();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (window.innerWidth > 1024) {
      const galleryContainer = document.querySelector('.image-container-g');
      const handleHorizontalScroll = e => {
        if (galleryContainer) {
          e.preventDefault();
          galleryContainer.scrollLeft += e.deltaY;
        }
      };
      if (galleryContainer) {
        galleryContainer.addEventListener('wheel', handleHorizontalScroll);
      }
      return () => {
        if (galleryContainer) {
          galleryContainer.removeEventListener('wheel', handleHorizontalScroll);
        }
      };
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const gallery = document.querySelector('.image-container-g');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!gallery || !scrollIndicator) return;
    const updateScrollIndicator = () => {
      if (window.innerWidth > 1024) {
        const scrollWidth = gallery.scrollWidth - gallery.clientWidth;
        const scrollLeft = gallery.scrollLeft;
        const percentage = scrollWidth > 0 ? Math.max(2, scrollLeft / scrollWidth * 100) : 2;
        scrollIndicator.style.setProperty('--progress-dimension', `${percentage}%`);
      } else {
        const scrollHeight = gallery.scrollHeight - gallery.clientHeight;
        const scrollTop = gallery.scrollTop;
        if (scrollHeight > 0) {
          const normalPercentage = 100 - scrollTop / scrollHeight * 100;
          const reversedPercentage = Math.min(100, Math.max(2, 100 - normalPercentage));
          scrollIndicator.style.setProperty('--progress-dimension', `${reversedPercentage}%`);
        } else {
          scrollIndicator.style.setProperty('--progress-dimension', '2%');
        }
      }
    };
    updateScrollIndicator();
    gallery.addEventListener('scroll', updateScrollIndicator);
    return () => {
      gallery.removeEventListener('scroll', updateScrollIndicator);
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isOpen && !hasShownScrollHint) {
      setShowScrollHint(true);
      const fadeOutTimeout = setTimeout(() => {
        const hintElement = document.querySelector('.scroll-hint');
        if (hintElement) hintElement.style.opacity = '0';
      }, 3000);
      const removeTimeout = setTimeout(() => {
        setShowScrollHint(false);
        setHasShownScrollHint(true);
      }, 4000);
      return () => {
        clearTimeout(fadeOutTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [isOpen, hasShownScrollHint]);
  const hexToRgba = (hex, alpha = 0.1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const adjustBrightness = (hex, multiplier) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.min(255, Math.max(0, Math.floor(r * multiplier)));
    g = Math.min(255, Math.max(0, Math.floor(g * multiplier)));
    b = Math.min(255, Math.max(0, Math.floor(b * multiplier)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  const darkenedColor = adjustBrightness(activeColor, 0.55);
  const edgeColor = adjustBrightness(activeColor, 0.8);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("nav", {
    className: `navigation ${isScrollingUp ? 'visible' : 'hidden'} ${isInShadow ? 'navigation--shadow' : ''}`,
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: `top-bar-items ${isOpen ? 'menu-open' : ''}`,
      style: {
        background: isOpen ? 'transparent' : isScrolled ? hexToRgba(activeColor, 0.8) : 'transparent',
        backdropFilter: isScrolled && !isOpen ? 'blur(5px)' : 'none'
      },
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "site-title",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h-title", {
          className: "title",
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
            href: "/",
            className: "homepage-link",
            children: "DMI"
          })
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "menu-icon",
        onClick: toggleMenu,
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: `hamburger ${isOpen ? 'open' : ''}`
        })
      })]
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: `menu-item ${isOpen ? 'open' : ''}`,
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "menu-item-1",
        onClick: handleCloseMenu
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "menu-item-2",
        style: {
          '--darkenedColor': darkenedColor,
          '--darkerColor': edgeColor
        },
        children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "menu-nav",
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "nav-item",
            children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("a", {
              href: "/dynamic-theme",
              className: "nav-link",
              children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "name",
                children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h4", {
                  children: "What is DMI?"
                })
              }), customArrowIcon2 && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "arrow1",
                dangerouslySetInnerHTML: {
                  __html: customArrowIcon2
                }
              })]
            })
          }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "nav-item",
            children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("a", {
              href: "/dynamic-theme",
              className: "nav-link",
              children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h4", {
                children: "Case Studies"
              }), customArrowIcon2 && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "arrow1",
                dangerouslySetInnerHTML: {
                  __html: customArrowIcon2
                }
              })]
            })
          })]
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "gallery-wrapper",
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "scroll-indicator"
          }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "gallery-container",
            children: [showScrollHint && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "scroll-hint",
              children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h5", {
                children: "Scroll to explore"
              }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                className: "arrow2",
                dangerouslySetInnerHTML: {
                  __html: customArrowIcon
                }
              })]
            }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "image-container-g",
              children: galleryImages.map((img, index) => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                src: img.url,
                alt: img.alt,
                draggable: "false",
                className: `gallery-image image-${index}`
              }, index))
            })]
          })]
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navigation);

/***/ }),

/***/ "./src/dynamic-app/lib/fetchGallery.js":
/*!*********************************************!*\
  !*** ./src/dynamic-app/lib/fetchGallery.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_sanity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/sanity */ "./src/utils/sanity.ts");
// Fetch gallery images for the navigation menu

const fetchGallery = async () => {
  const query = `
    *[_type == "gallery"]{
      _id,
      images[] {
        image {
          asset-> {
            url
          }
        },
        altText
      }
    }
  `;
  try {
    const data = await _utils_sanity__WEBPACK_IMPORTED_MODULE_0__["default"].fetch(query);

    // Flatten and randomize images
    const flattenedImages = data.flatMap(gallery => gallery.images.map((img, index) => ({
      url: img.image?.asset?.url || '',
      alt: img.altText || 'Default Alt Text',
      cssClass: `gallery-image-${index}` // Generate unique class names here if needed
    })));
    const shuffledImages = flattenedImages.sort(() => Math.random() - 0.5);
    return shuffledImages;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return [];
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchGallery);

/***/ }),

/***/ "./src/styles/dynamic-app/navigation.css?raw":
/*!***************************************************!*\
  !*** ./src/styles/dynamic-app/navigation.css?raw ***!
  \***************************************************/
/***/ (() => {



/***/ })

};
;
//# sourceMappingURL=dynamic-app-components-navigation.server.js.map