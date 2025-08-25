exports.id = "src_dynamic-app_dynamic-app-shadow_jsx";
exports.ids = ["src_dynamic-app_dynamic-app-shadow_jsx"];
exports.modules = {

/***/ "./src/dynamic-app/components/IntroOverlay.jsx":
/*!*****************************************************!*\
  !*** ./src/dynamic-app/components/IntroOverlay.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");


const RedIntroOverlay = () => {
  const [visible, setVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const timer = setTimeout(() => setVisible(false), 500);
    return () => clearTimeout(timer);
  }, []);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#1e1e1f',
      opacity: visible ? 1 : 0,
      pointerEvents: 'none',
      transition: 'opacity 0.4s ease',
      zIndex: 9999
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RedIntroOverlay);

/***/ }),

/***/ "./src/dynamic-app/components/footer.jsx":
/*!***********************************************!*\
  !*** ./src/dynamic-app/components/footer.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");


const Footer = ({
  customArrowIcon2,
  linkArrowIcon
}) => {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("footer", {
    className: "footer",
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "footer-links",
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "nav-item",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "nav-link-2",
          role: "button",
          tabIndex: 0,
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "name",
            children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
              children: "What is DMI?"
            })
          }), customArrowIcon2 && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "arrow3",
            dangerouslySetInnerHTML: {
              __html: customArrowIcon2
            }
          })]
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "nav-item",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "nav-link-2",
          role: "button",
          tabIndex: 0,
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
            children: "Case Studies"
          }), customArrowIcon2 && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "arrow3",
            dangerouslySetInnerHTML: {
              __html: customArrowIcon2
            }
          })]
        })
      })]
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "footer-info",
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "nav-item",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
          href: "https://www.linkedin.com/in/efe-ozalp/" // Replace with your portfolio link
          ,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "nav-link-2",
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
            children: "UI/UX & Development by Efe Ozalp"
          }), linkArrowIcon && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            id: "link-arrow",
            className: "arrow3",
            dangerouslySetInnerHTML: {
              __html: linkArrowIcon
            }
          })]
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "nav-item",
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
          href: "https://www.instagram.com/yxuart/" // Replace with the illustrator's profile link
          ,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "nav-link-2",
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
            children: "Illustrations by Yiner Xu @yxuart"
          }), linkArrowIcon && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            id: "link-arrow",
            className: "arrow3",
            dangerouslySetInnerHTML: {
              __html: linkArrowIcon
            }
          })]
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./src/dynamic-app/components/homepage-UIcards.jsx":
/*!*********************************************************!*\
  !*** ./src/dynamic-app/components/homepage-UIcards.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/media-providers/media-loader */ "./src/utils/media-providers/media-loader.tsx");
/* harmony import */ var _utils_context_providers_style_injector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/context-providers/style-injector */ "./src/utils/context-providers/style-injector.ts");
/* harmony import */ var _styles_dynamic_app_UIcards_css_raw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/dynamic-app/UIcards.css?raw */ "./src/styles/dynamic-app/UIcards.css?raw");
/* harmony import */ var _styles_dynamic_app_UIcards_css_raw__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_UIcards_css_raw__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/dynamic-app/components/homepage-UIcards.jsx





const UIcards = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().forwardRef(function UIcards({
  title,
  image1,
  image2,
  alt1,
  alt2,
  url1,
  className = '',
  customArrowIcon2
}, ref) {
  (0,_utils_context_providers_style_injector__WEBPACK_IMPORTED_MODULE_2__.useStyleInjection)((_styles_dynamic_app_UIcards_css_raw__WEBPACK_IMPORTED_MODULE_3___default()), 'dynamic-ui-card-style');
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    ref: ref,
    className: `card-container ${className}`,
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: `image-container ${className}`,
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
        href: url1,
        className: `ui-link ${className}`,
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_1__["default"], {
          type: "image",
          src: image2,
          alt: alt1,
          className: `ui-image1 ${className}`,
          priority: true
        })
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: `image-container2 ${className}-2`,
      children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
        href: url1,
        className: `ui-link-3 ${className}`,
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_utils_media_providers_media_loader__WEBPACK_IMPORTED_MODULE_1__["default"], {
          type: "image",
          src: image1,
          alt: alt2,
          className: `ui-image2 ${className}-2`,
          priority: true
        })
      }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h-name", {
        className: `image-title ${className}`,
        children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("a", {
          href: url1,
          className: `ui-link-2 ${className}`,
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            className: "title-text",
            children: title
          }), customArrowIcon2 && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "svg-icon",
            dangerouslySetInnerHTML: {
              __html: customArrowIcon2
            }
          })]
        })
      })]
    })]
  });
});
UIcards.displayName = 'UIcards';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UIcards);

/***/ }),

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

/***/ "./src/dynamic-app/components/sortBy.jsx":
/*!***********************************************!*\
  !*** ./src/dynamic-app/components/sortBy.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preload_dynamic_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../preload-dynamic-app */ "./src/dynamic-app/preload-dynamic-app.ts");
/* harmony import */ var _utils_context_providers_style_injector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/context-providers/style-injector */ "./src/utils/context-providers/style-injector.ts");
/* harmony import */ var _styles_dynamic_app_sortByStyles_css_raw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/dynamic-app/sortByStyles.css?raw */ "./src/styles/dynamic-app/sortByStyles.css?raw");
/* harmony import */ var _styles_dynamic_app_sortByStyles_css_raw__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_sortByStyles_css_raw__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");

// pull from preloader (images only)




const options = [{
  value: 'random',
  label: 'Randomized'
}, {
  value: 'titleAsc',
  label: 'A to Z'
}, {
  value: 'titleDesc',
  label: 'Z to A'
}];
const shuffleArray = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
function localSort(data, mode) {
  if (!Array.isArray(data)) return [];
  switch (mode) {
    case 'titleAsc':
      return [...data].sort((a, b) => (a?.title || '').localeCompare(b?.title || ''));
    case 'titleDesc':
      return [...data].sort((a, b) => (b?.title || '').localeCompare(a?.title || ''));
    case 'random':
    default:
      return shuffleArray(data);
  }
}
function SortBy({
  onFetchItems,
  customArrowIcon,
  colorMapping,
  getRoot = () => document
}) {
  const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [selectedValue, setSelectedValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('random');

  // Base dataset from preload
  const [baseItems, setBaseItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  // Derived list shown in UI
  const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // inject CSS into shadow root (or document)
  (0,_utils_context_providers_style_injector__WEBPACK_IMPORTED_MODULE_2__.useStyleInjection)((_styles_dynamic_app_sortByStyles_css_raw__WEBPACK_IMPORTED_MODULE_3___default()), 'dynamic-app-style-sortby');
  const handleOptionClick = value => {
    setSelectedValue(value);
    setIsOpen(false);
  };
  const handleClickOutside = e => {
    const root = typeof getRoot === 'function' ? getRoot() : document;
    const pauseButton = root.querySelector?.('.lottie-container');
    const target = e.target;
    if (dropdownRef.current && target && !dropdownRef.current.contains(target) && (!pauseButton || !pauseButton.contains(target))) {
      setIsOpen(false);
    }
  };

  // click-outside listener bound to the same root as the UI
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const root = typeof getRoot === 'function' ? getRoot() : document;
    root.addEventListener?.('mousedown', handleClickOutside);
    return () => root.removeEventListener?.('mousedown', handleClickOutside);
  }, [getRoot]);

  // 1) Get images from preload cache (or ensure preload if empty)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let cancelled = false;
    const cached = (0,_preload_dynamic_app__WEBPACK_IMPORTED_MODULE_1__.getPreloadedDynamicApp)();
    if (cached.images?.length) {
      if (!cancelled) setBaseItems(cached.images);
    } else {
      (0,_preload_dynamic_app__WEBPACK_IMPORTED_MODULE_1__.ensureImagesPreload)().then(images => {
        if (!cancelled) setBaseItems(images || []);
      }).catch(() => {
        if (!cancelled) setBaseItems([]);
      });
    }
    return () => {
      cancelled = true;
    };
  }, []);

  // 2) Derive items whenever base or sort option changes (no network here)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const derived = localSort(baseItems, selectedValue);
    setItems(derived);
    onFetchItems?.(derived);
  }, [baseItems, selectedValue, onFetchItems]);

  // Responsive index logic for color sampling
  const [screenWidth, setScreenWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(typeof window !== 'undefined' ? window.innerWidth : 1200);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const itemIndex = screenWidth >= 1025 ? 2 : screenWidth >= 768 ? 1 : 0;
  const convertHexToRGBA = (hex, alpha) => {
    const h = (hex || '#ffffff').replace('#', '');
    const r = parseInt(h.slice(0, 2) || 'ff', 16);
    const g = parseInt(h.slice(2, 4) || 'ff', 16);
    const b = parseInt(h.slice(4, 6) || 'ff', 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const borderItemColor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const alt = items[itemIndex]?.alt1;
    const color = Array.isArray(colorMapping?.[alt]) ? colorMapping[alt][2] : '#ffffff';
    return convertHexToRGBA(color, 0.8);
  }, [items, colorMapping, itemIndex]);
  const boxShadowItemColor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const alt = items[itemIndex]?.alt1;
    return Array.isArray(colorMapping?.[alt]) ? colorMapping[alt][3] : '#ffffff';
  }, [items, colorMapping, itemIndex]);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "sort-by-container",
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "sort-container",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
        children: "Sort by:"
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "sort-container2",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "custom-dropdown",
        ref: dropdownRef,
        style: {
          border: `solid 1.6px ${borderItemColor}`,
          boxShadow: `0 1px 8px rgba(0,0,0,0.1), 0 22px 8px rgba(0,0,0,0.08), 12px 12px ${boxShadowItemColor}`
        },
        children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "custom-select",
          onClick: () => setIsOpen(!isOpen),
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "selected-value",
            children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h5", {
              children: options.find(opt => opt.value === selectedValue)?.label
            })
          }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            className: `custom-arrow ${isOpen ? 'open' : ''}`,
            children: customArrowIcon && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              dangerouslySetInnerHTML: {
                __html: customArrowIcon
              }
            })
          })]
        }), isOpen && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "options-container",
          style: {
            border: `solid 1.6px ${borderItemColor}`,
            borderTop: 'none'
          },
          children: options.map(option => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: `option ${option.value === selectedValue ? 'selected' : ''}`,
            onClick: () => handleOptionClick(option.value),
            children: option.label
          }, option.value))
        })]
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SortBy);

/***/ }),

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
      transition: 'color 180ms linear'
    },
    children: [segment.text, (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "logo-container",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "svg-icon"
        // If your injected SVG respects currentColor, you could instead set color here.
        ,
        style: {
          fill: colors[i],
          transition: 'fill 180ms linear'
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

/***/ "./src/dynamic-app/dynamic-app-outgoing.jsx":
/*!**************************************************!*\
  !*** ./src/dynamic-app/dynamic-app-outgoing.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/navigation */ "./src/dynamic-app/components/navigation.jsx");
/* harmony import */ var _components_title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/title */ "./src/dynamic-app/components/title.jsx");
/* harmony import */ var _components_sortBy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/sortBy */ "./src/dynamic-app/components/sortBy.jsx");
/* harmony import */ var _components_fireworksDisplay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/fireworksDisplay */ "./src/dynamic-app/components/fireworksDisplay.jsx");
/* harmony import */ var _components_pauseButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/pauseButton */ "./src/dynamic-app/components/pauseButton.jsx");
/* harmony import */ var _components_footer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/footer */ "./src/dynamic-app/components/footer.jsx");
/* harmony import */ var _lib_observedCard_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/observedCard.jsx */ "./src/dynamic-app/lib/observedCard.jsx");
/* harmony import */ var _lib_setupAltObserver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/setupAltObserver */ "./src/dynamic-app/lib/setupAltObserver.js");
/* harmony import */ var _components_IntroOverlay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/IntroOverlay */ "./src/dynamic-app/components/IntroOverlay.jsx");
/* harmony import */ var _lib_colorString__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/colorString */ "./src/dynamic-app/lib/colorString.ts");
/* harmony import */ var _utils_context_providers_shadow_root_context__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/context-providers/shadow-root-context */ "./src/utils/context-providers/shadow-root-context.tsx");
/* harmony import */ var _styles_dynamic_app_index_css_raw__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../styles/dynamic-app/index.css?raw */ "./src/styles/dynamic-app/index.css?raw");
/* harmony import */ var _styles_dynamic_app_index_css_raw__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_index_css_raw__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../styles/dynamic-app/misc.css?raw */ "./src/styles/dynamic-app/misc.css?raw");
/* harmony import */ var _styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _styles_loading_overlay_css_raw__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../styles/loading-overlay.css?raw */ "./src/styles/loading-overlay.css?raw");
/* harmony import */ var _styles_loading_overlay_css_raw__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_styles_loading_overlay_css_raw__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _preload_dynamic_app__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./preload-dynamic-app */ "./src/dynamic-app/preload-dynamic-app.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
















// shared preloader (no TS types in this file)


function DynamicTheme({
  onReady
}) {
  const [sortedImages, setSortedImages] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [svgIcons, setSvgIcons] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [activeColor, setActiveColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('#FFFFFF');
  const [movingTextColors, setMovingTextColors] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(['#FFFFFF', '#FFFFFF', '#FFFFFF']);
  const [lastKnownColor, setLastKnownColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('#FFFFFF');
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [pauseAnimation, setPauseAnimation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showNavigation, setShowNavigation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const toggleFireworksRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const scrollContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const shadowRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [showFireworks, setShowFireworks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [isHostVisible, setIsHostVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const hostVisibleRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const {
    getShadowRoot,
    injectStyle
  } = (0,_utils_context_providers_shadow_root_context__WEBPACK_IMPORTED_MODULE_11__.useShadowRoot)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    [(_styles_dynamic_app_index_css_raw__WEBPACK_IMPORTED_MODULE_12___default()), (_styles_dynamic_app_misc_css_raw__WEBPACK_IMPORTED_MODULE_13___default()), (_styles_loading_overlay_css_raw__WEBPACK_IMPORTED_MODULE_14___default())].forEach(injectStyle);
  }, [injectStyle]);

  // signal ready on first paint (wrapper de-dupes)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const id = requestAnimationFrame(() => {
      try {
        onReady?.();
      } catch {}
    });
    return () => cancelAnimationFrame(id);
  }, [onReady]);

  // Prime from cache, then wait for preload (deduped)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const snap = (0,_preload_dynamic_app__WEBPACK_IMPORTED_MODULE_15__.getPreloadedDynamicApp)();
    if (snap.icons) setSvgIcons(snap.icons);
    if (Array.isArray(snap.images)) setSortedImages(snap.images);
    let cancelled = false;
    (0,_preload_dynamic_app__WEBPACK_IMPORTED_MODULE_15__.ensureDynamicPreload)().catch(() => (0,_preload_dynamic_app__WEBPACK_IMPORTED_MODULE_15__.whenDynamicPreloadReady)()).then(cache => {
      if (cancelled || !cache) return;
      if (cache.icons) setSvgIcons(cache.icons);
      if (Array.isArray(cache.images)) setSortedImages(cache.images);
      setIsLoading(false);
      setShowNavigation(true);
    }).catch(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const observerRoot = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const root = typeof getShadowRoot === 'function' ? getShadowRoot() : document;
    observerRoot.current = root;
  }, [getShadowRoot]);
  const handleActivate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(alt1 => {
    const colors = _lib_colorString__WEBPACK_IMPORTED_MODULE_10__.colorMapping?.[alt1];
    if (colors && colors[0] !== activeColor) {
      setActiveColor(colors[2]);
      setMovingTextColors([colors[0], colors[1], colors[3]]);
      setLastKnownColor(colors[2]);
    }
  }, [activeColor]);
  const handleDeactivate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (activeColor !== lastKnownColor) setActiveColor(lastKnownColor);
  }, [activeColor, lastKnownColor]);
  const currentAltRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isLoading || sortedImages.length === 0) return;
    const root = observerRoot.current;
    if (!root) return;
    const guardedActivate = alt1 => {
      if (!hostVisibleRef.current) return;
      if (currentAltRef.current === alt1) return;
      currentAltRef.current = alt1;
      handleActivate(alt1);
    };
    const guardedDeactivate = alt1 => {
      if (!hostVisibleRef.current) return;
      if (currentAltRef.current !== alt1) return;
      handleDeactivate(alt1);
    };
    const cleanup = (0,_lib_setupAltObserver__WEBPACK_IMPORTED_MODULE_8__["default"])(guardedActivate, guardedDeactivate, root);
    return typeof cleanup === 'function' ? cleanup : undefined;
  }, [isLoading, sortedImages, handleActivate, handleDeactivate]);
  const handleSetToggleFireworks = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(fn => {
    toggleFireworksRef.current = fn;
  }, []);
  const handlePauseToggle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(isEnabled => {
    if (toggleFireworksRef.current) toggleFireworksRef.current(isEnabled);
    setPauseAnimation(!isEnabled);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!shadowRef.current) return;
    const ro = new ResizeObserver(() => {
      console.log('[Resize observed]', shadowRef.current?.getBoundingClientRect());
    });
    ro.observe(shadowRef.current);
    return () => ro.disconnect();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const container = document.querySelector('#block-dynamic');
    if (!container) {
      console.warn('[FireworkObserver] #block-dynamic not found in DOM');
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      const visible = !!entry.isIntersecting;
      hostVisibleRef.current = visible;
      setIsHostVisible(visible);
      const desired = visible && !pauseAnimation;
      setShowFireworks(prev => prev !== desired ? desired : prev);
      if (toggleFireworksRef.current) toggleFireworksRef.current(desired);
    }, {
      threshold: 0.3
    });
    io.observe(container);

    // prime immediately
    const rect = container.getBoundingClientRect();
    const visibleNow = rect.top < window.innerHeight && rect.bottom > 0;
    hostVisibleRef.current = visibleNow;
    setIsHostVisible(visibleNow);
    const initialDesired = visibleNow && !pauseAnimation;
    setShowFireworks(prev => prev !== initialDesired ? initialDesired : prev);
    if (toggleFireworksRef.current) toggleFireworksRef.current(initialDesired);
    return () => io.disconnect();
  }, [pauseAnimation]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (toggleFireworksRef.current) {
      toggleFireworksRef.current(!pauseAnimation && isHostVisible);
    }
  }, [pauseAnimation, isHostVisible]);
  const cardRefs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  cardRefs.current = sortedImages.map((_, i) => cardRefs.current[i] ?? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createRef());
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
    className: "homePage-container",
    ref: scrollContainerRef,
    "aria-busy": isLoading ? 'true' : 'false',
    children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_components_IntroOverlay__WEBPACK_IMPORTED_MODULE_9__["default"], {}), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
      className: "navigation-wrapper",
      children: showNavigation && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_components_navigation__WEBPACK_IMPORTED_MODULE_1__["default"], {
        customArrowIcon2: svgIcons['arrow1'],
        customArrowIcon: svgIcons['arrow2'],
        items: sortedImages,
        activeColor: activeColor,
        isInShadow: typeof getShadowRoot === 'function' && getShadowRoot() !== document,
        scrollLockContainer: scrollContainerRef.current
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
      className: "firework-wrapper",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
        className: "firework-divider",
        children: showFireworks && (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_components_fireworksDisplay__WEBPACK_IMPORTED_MODULE_4__["default"], {
          colorMapping: _lib_colorString__WEBPACK_IMPORTED_MODULE_10__.colorMapping,
          items: sortedImages,
          activeColor: activeColor,
          lastKnownColor: lastKnownColor,
          onToggleFireworks: handleSetToggleFireworks
        })
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
      className: "section-divider"
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
      className: "title-divider",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_components_title__WEBPACK_IMPORTED_MODULE_2__["default"], {
        svgIcon: svgIcons['logo-small-1'],
        movingTextColors: movingTextColors,
        pauseAnimation: pauseAnimation
      })
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
      id: "homePage",
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
        className: "no-overflow",
        children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
          className: "pause-button-wrapper",
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_components_pauseButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
            toggleP5Animation: handlePauseToggle
          })
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
          className: "sort-by-divider",
          children: [(0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("h3", {
            className: "students-heading",
            children: "Students"
          }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_components_sortBy__WEBPACK_IMPORTED_MODULE_3__["default"], {
            setSortOption: () => {},
            onFetchItems: setSortedImages,
            customArrowIcon: svgIcons['arrow2'],
            colorMapping: _lib_colorString__WEBPACK_IMPORTED_MODULE_10__.colorMapping,
            getRoot: getShadowRoot
          })]
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
          className: "section-divider2"
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
          className: "UI-card-divider",
          children: sortedImages.map((data, index) => (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_lib_observedCard_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], {
            data: data,
            index: index,
            getShadowRoot: getShadowRoot,
            pauseAnimation: pauseAnimation,
            customArrowIcon2: svgIcons['arrow1']
          }, index))
        }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_components_footer__WEBPACK_IMPORTED_MODULE_6__["default"], {
          customArrowIcon2: svgIcons['arrow1'],
          linkArrowIcon: svgIcons['link-icon']
        })]
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicTheme);

/***/ }),

/***/ "./src/dynamic-app/dynamic-app-shadow.jsx":
/*!************************************************!*\
  !*** ./src/dynamic-app/dynamic-app-shadow.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_shadow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-shadow */ "react-shadow");
/* harmony import */ var react_shadow__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_shadow__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dynamic_app_outgoing_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dynamic-app-outgoing.jsx */ "./src/dynamic-app/dynamic-app-outgoing.jsx");
/* harmony import */ var _utils_context_providers_shadow_root_context_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/context-providers/shadow-root-context.tsx */ "./src/utils/context-providers/shadow-root-context.tsx");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// dynamic app shadow DOM wrapper





const DynamicAppInbound = ({
  onFocusChange,
  onReady
}) => {
  const shadowRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [shadowRoot, setShadowRoot] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const ShadowRoot = (react_shadow__WEBPACK_IMPORTED_MODULE_1___default().div);

  // ensure we only ever signal ready once
  const readySentRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const sendReady = () => {
    if (readySentRef.current) return;
    readySentRef.current = true;
    try {
      onReady?.();
    } catch {}
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const t = setTimeout(() => {
      const root = shadowRef.current?.getRootNode?.();
      if (root && root.host) {
        setShadowRoot(root);
        // first visual frame -> tell enhancer we’re ready
        requestAnimationFrame(sendReady);
      } else {
        console.warn('[Not a ShadowRoot]', root);
      }
    }, 0);
    return () => clearTimeout(t);
  }, [onReady]); // safe for HMR

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const el = shadowRef.current;
    if (!el) return;
    let startY = 0;
    let focusTriggered = false;
    const triggerSyntheticClick = () => {
      const down = new PointerEvent('pointerdown', {
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerType: 'touch'
      });
      el.dispatchEvent(down);
      onFocusChange?.(true);
      console.log('[Focus triggered in embedded app]');
    };
    const handleTouchStart = e => {
      if (e.touches.length === 0) return;
      startY = e.touches[0].clientY;
      focusTriggered = false;
    };
    const handleTouchMove = e => {
      if (focusTriggered || e.touches.length === 0) return;
      const deltaY = e.touches[0].clientY - startY;
      if (Math.abs(deltaY) > 1) {
        el.scrollTop += 1;
        triggerSyntheticClick();
        focusTriggered = true;
      }
    };
    if ('ontouchstart' in window) {
      el.addEventListener('touchstart', handleTouchStart, {
        passive: true
      });
      el.addEventListener('touchmove', handleTouchMove, {
        passive: true
      });
    }
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onFocusChange]);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    className: "embedded-app",
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ShadowRoot, {
      children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        ref: shadowRef,
        className: "dynamic-app",
        id: "shadow-dynamic-app",
        children: shadowRoot ? (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_utils_context_providers_shadow_root_context_tsx__WEBPACK_IMPORTED_MODULE_3__.ShadowRootProvider, {
          getShadowRoot: () => shadowRoot,
          children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_dynamic_app_outgoing_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onReady: sendReady
          })
        }) : null
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicAppInbound);

/***/ }),

/***/ "./src/dynamic-app/lib/colorString.ts":
/*!********************************************!*\
  !*** ./src/dynamic-app/lib/colorString.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorMapping: () => (/* binding */ colorMapping),
/* harmony export */   colorMapping2: () => (/* binding */ colorMapping2)
/* harmony export */ });
// Student → color set mapping
const colorMapping = {
  'Yiner Xu ': ['#e9b2c2', '#ffc3d4', '#5f4f53', '#ffc9d8'],
  'Simone Schwartz': ['#d2b098', '#f0be9b', '#5b4e44', '#f2c5a5'],
  'Seth Abrahamson ': ['#a9a9a9', '#b9b9b9', '#292929', '#c0c0c0'],
  'Sanna Anwar': ['#e9d0a0', '#ffe4af', '#2f2d28', '#ffe7b7'],
  'Javi Ortiz': ['#e9afbd', '#ffbfcf', '#2f2a2b', '#ffc5d4'],
  'Janhvi Gokalgandhi': ['#a0e1e9', '#aff7ff', '#282e2f', '#b7f8ff'],
  'Andrew Adamides': ['#bef9da', '#7ca08d', '#262a28', '#9dccb4'],
  'Shozab Raza': ['#e9e0a7', '#fff6b6', '#2f2e29', '#fff7bd'],
  'Baopu Wang': ['#b3c2e9', '#c4d4ff', '#4f535f', '#cad8ff'],
  'Efe Ozalp': ['#6fc1e9', '#78d3ff', '#242b2f', '#85d7ff'],
  'Harry Liao ': ['#abcdb2', '#b5e7be', '#292d2a', '#bceac5'],
  'Jawad Naik': ['#97cfac', '#9bedb9', '#272d29', '#a5efc0']
};
const colorMapping2 = {
  'Yiner Xu': ['#e9b2c2', '#ffc3d4', '#5f4f53', '#ffc9d8'],
  'Simone Schwartz': ['#d2b098', '#f0be9b', '#5b4e44', '#f2c5a5'],
  'Seth Abrahamson': ['#a9a9a9', '#b9b9b9', '#292929', '#c0c0c0'],
  'Sanna Anwar': ['#e9d0a0', '#ffe4af', '#2f2d28', '#ffe7b7'],
  'Javi Ortiz': ['#e9afbd', '#ffbfcf', '#2f2a2b', '#ffc5d4'],
  'Janhvi Gokalgandhi': ['#a0e1e9', '#aff7ff', '#282e2f', '#b7f8ff'],
  'Andrew Adamides': ['#bef9da', '#7ca08d', '#262a28', '#9dccb4'],
  'Shozab Raza': ['#e9e0a7', '#fff6b6', '#2f2e29', '#fff7bd'],
  'Baopu Wang': ['#b3c2e9', '#c4d4ff', '#4f535f', '#cad8ff'],
  'Efe Ozalp': ['#6fc1e9', '#78d3ff', '#242b2f', '#85d7ff'],
  'Harry Liao': ['#abcdb2', '#b5e7be', '#292d2a', '#bceac5'],
  'Jawad Naik': ['#97cfac', '#9bedb9', '#272d29', '#a5efc0']
};

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

/***/ "./src/dynamic-app/lib/observedCard.jsx":
/*!**********************************************!*\
  !*** ./src/dynamic-app/lib/observedCard.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_homepage_UIcards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/homepage-UIcards */ "./src/dynamic-app/components/homepage-UIcards.jsx");
/* harmony import */ var _shadowObserver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shadowObserver */ "./src/dynamic-app/lib/shadowObserver.ts");
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/dynamic-app/lib/observedCard.jsx




function ObservedCard({
  data,
  index,
  getShadowRoot,
  pauseAnimation,
  customArrowIcon2
}) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // The hook will accept whatever you pass — no TS constraint here
  (0,_shadowObserver__WEBPACK_IMPORTED_MODULE_2__["default"])(ref, getShadowRoot, pauseAnimation);
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    ref: ref,
    className: `custom-card-${index}`,
    children: (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_homepage_UIcards__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: data.title,
      backgroundColor: data.backgroundColor,
      image1: data.image1,
      image2: data.image2,
      alt1: data.alt1,
      alt2: data.alt2,
      url1: data.url1,
      className: `custom-card-${index}`,
      customArrowIcon2: customArrowIcon2
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ObservedCard);

/***/ }),

/***/ "./src/dynamic-app/lib/setupAltObserver.js":
/*!*************************************************!*\
  !*** ./src/dynamic-app/lib/setupAltObserver.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let currentlyActiveAlt1 = null;
let highestVisibility = 0;
let debounceTimeout = null;
const setupAltObserver = (onActivate, onDeactivate, rootElement = document) => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: Array.from(Array(101).keys(), x => x / 100)
  };
  const observerCallback = entries => {
    entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    entries.forEach(entry => {
      const element = entry.target;
      const imageElement = element.querySelector('.ui-image1');
      if (imageElement) {
        const alt1Value = imageElement.getAttribute('alt');
        const visibility = entry.intersectionRatio;
        if (visibility > 0.1 && visibility > highestVisibility) {
          if (currentlyActiveAlt1 !== alt1Value) {
            if (currentlyActiveAlt1) {
              onDeactivate(currentlyActiveAlt1);
            }
            onActivate(alt1Value);
            currentlyActiveAlt1 = alt1Value;
            highestVisibility = visibility;
          }
        } else if (visibility <= 0.1 && currentlyActiveAlt1 === alt1Value) {
          onDeactivate(alt1Value);
          currentlyActiveAlt1 = null;
          highestVisibility = 0;
        }
      }
    });
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  const triggerInitialActivation = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const cards = Array.from(rootElement.querySelectorAll('.card-container'));
      const entries = cards.map(card => {
        const boundingRect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const visibility = Math.max(0, Math.min(boundingRect.height, viewportHeight - boundingRect.top) / boundingRect.height);
        return {
          target: card,
          intersectionRatio: visibility
        };
      });
      observerCallback(entries);
    }, 50);
  };
  rootElement.querySelectorAll('.card-container').forEach(card => observer.observe(card));
  triggerInitialActivation();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setupAltObserver);

/***/ }),

/***/ "./src/dynamic-app/lib/shadowObserver.ts":
/*!***********************************************!*\
  !*** ./src/dynamic-app/lib/shadowObserver.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useIntersectionTransform)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// useIntersectionTransform.ts

function useIntersectionTransform(ref, getShadowRoot, pauseAnimation, getScrollRoot) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!ref.current || pauseAnimation) return;

    // Figure out where we live (shadow/dom) and what to use as IO root.
    const shadow = getShadowRoot?.() ?? null;
    const isInShadow = !!shadow;
    const containerEl = typeof getScrollRoot === 'function' && getScrollRoot() || (
    // prefer your inner scroller if we can find it:
    isInShadow ? shadow.querySelector('.embedded-app') : null) || null; // fallback = viewport

    // (optional) gate transforms to when pointer is inside shadow host
    let mouseInside = false;
    const hostEl = isInShadow ? shadow.host : null;
    const onEnter = () => mouseInside = true;
    const onLeave = () => mouseInside = false;
    if (hostEl) {
      hostEl.addEventListener('pointerenter', onEnter);
      hostEl.addEventListener('pointerleave', onLeave);
    }
    const cardEl = ref.current;
    const imageContainer = cardEl.querySelector('.image-container');
    const imageContainer2 = cardEl.querySelector('.image-container2');
    if (!imageContainer || !imageContainer2) return;
    const applyTransform = percentage => {
      const width = containerEl instanceof Element ? containerEl.clientWidth : window.innerWidth;
      let imageContainerTransform = 'translate(0em, 0em)';
      let imageContainer2Transform = 'translate(1em, -28em)';
      let imageContainerZIndex = '5';
      let imageContainer2ZIndex = '1';
      if (width <= 767) {
        if (percentage > 0.35 && percentage <= 1) {
          imageContainerTransform = 'translate(0.5em, 1em)';
          imageContainer2Transform = 'translate(0.5em, -32.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.15 && percentage <= 0.35) {
          imageContainerTransform = 'translate(1.5em, 0.5em)';
          imageContainer2Transform = 'translate(-0.25em, -34.5em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else if (percentage >= 0 && percentage <= 0.15) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(0em, -33.5em)';
        }
      } else if (width <= 1024) {
        if (percentage >= 0.3) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(0em, -23.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage < 0.3) {
          imageContainerTransform = 'translate(-0.5em, 0em)';
          imageContainer2Transform = 'translate(1em, -23.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage < 0.1) {
          imageContainerTransform = 'translate(-0.5em, 0em)';
          imageContainer2Transform = 'translate(1em, -23.5em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
      } else if (width > 1025) {
        if (percentage > 0.6 && percentage <= 1) {
          imageContainerTransform = 'translate(1em, 1em)';
          imageContainer2Transform = 'translate(0em, -28.8em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.3 && percentage <= 0.6) {
          imageContainerTransform = 'translate(1.2em, -0.8em)';
          imageContainer2Transform = 'translate(0em, -28em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else if (percentage >= 0 && percentage <= 0.3) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -27.4em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
      } else {
        if (percentage > 0.3 && percentage <= 1) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -43em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage >= 0 && percentage <= 0.3) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -43em)';
        }
      }
      imageContainer.style.transform = imageContainerTransform;
      imageContainer.style.zIndex = imageContainerZIndex;
      imageContainer2.style.transform = imageContainer2Transform;
      imageContainer2.style.zIndex = imageContainer2ZIndex;
    };

    // IO now uses the scroll container as root (if available)
    const observer = new IntersectionObserver(([entry]) => {
      if (isInShadow && !mouseInside) return;
      const rect = entry.boundingClientRect;

      // use the container’s rect/height instead of window
      const rootRect = containerEl ? containerEl.getBoundingClientRect() : document.documentElement.getBoundingClientRect();
      const rootHeight = containerEl instanceof Element ? containerEl.clientHeight : window.innerHeight;
      const rootCenter = rootRect.top + rootHeight;

      // replicate your old math but relative to the container center
      const percentage = Math.max(0, Math.min(rect.height, rootCenter - rect.top)) / rect.height;
      applyTransform(percentage);
    }, {
      root: containerEl || null,
      // ← critical change
      threshold: Array.from({
        length: 101
      }, (_, i) => i / 100)
    });

    // initial position apply (also relative to container)
    const rect = cardEl.getBoundingClientRect();
    const rootRect = containerEl ? containerEl.getBoundingClientRect() : document.documentElement.getBoundingClientRect();
    const rootHeight = containerEl instanceof Element ? containerEl.clientHeight : window.innerHeight;
    const rootCenter = rootRect.top + rootHeight / 1.5;
    const initialPct = Math.max(0, Math.min(rect.height, rootCenter - rect.top)) / rect.height;
    applyTransform(initialPct);
    observer.observe(cardEl);
    return () => {
      observer.disconnect();
      if (hostEl) {
        hostEl.removeEventListener('pointerenter', onEnter);
        hostEl.removeEventListener('pointerleave', onLeave);
      }
    };
  }, [ref, pauseAnimation, getShadowRoot, getScrollRoot]);
}

/***/ }),

/***/ "./src/styles/dynamic-app/UIcards.css?raw":
/*!************************************************!*\
  !*** ./src/styles/dynamic-app/UIcards.css?raw ***!
  \************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/dynamic-app/index.css?raw":
/*!**********************************************!*\
  !*** ./src/styles/dynamic-app/index.css?raw ***!
  \**********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/dynamic-app/misc.css?raw":
/*!*********************************************!*\
  !*** ./src/styles/dynamic-app/misc.css?raw ***!
  \*********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/dynamic-app/navigation.css?raw":
/*!***************************************************!*\
  !*** ./src/styles/dynamic-app/navigation.css?raw ***!
  \***************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/dynamic-app/sortByStyles.css?raw":
/*!*****************************************************!*\
  !*** ./src/styles/dynamic-app/sortByStyles.css?raw ***!
  \*****************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/dynamic-app/title.css?raw":
/*!**********************************************!*\
  !*** ./src/styles/dynamic-app/title.css?raw ***!
  \**********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/loading-overlay.css?raw":
/*!********************************************!*\
  !*** ./src/styles/loading-overlay.css?raw ***!
  \********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/utils/context-providers/shadow-root-context.tsx":
/*!*************************************************************!*\
  !*** ./src/utils/context-providers/shadow-root-context.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShadowRootProvider: () => (/* binding */ ShadowRootProvider),
/* harmony export */   useShadowRoot: () => (/* binding */ useShadowRoot)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react/jsx-runtime */ "./node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js");
// src/utils/context-providers/shadow-root-context.tsx


const hasDOM = typeof document !== 'undefined';
const hasConstructedSheets = hasDOM && typeof globalThis.Document !== 'undefined' && 'adoptedStyleSheets' in Document.prototype && typeof globalThis.CSSStyleSheet !== 'undefined' && 'replaceSync' in CSSStyleSheet.prototype;
const isShadowRoot = node => typeof globalThis.ShadowRoot !== 'undefined' && node instanceof globalThis.ShadowRoot;
const ShadowRootContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
let warnedOnce = false;
const useShadowRoot = () => {
  const ctx = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ShadowRootContext);
  if (!ctx) {
    if (!warnedOnce) {
      // Dev-friendly, harmless in prod too; only once.
      console.warn('useShadowRoot called outside provider; falling back to document.');
      warnedOnce = true;
    }
    const injectStyle = (css, id) => {
      if (!hasDOM) return;
      const existing = document.head.querySelector(`style[data-style-id="${id}"]`);
      if (existing) return;
      const style = document.createElement('style');
      style.dataset.styleId = id;
      style.textContent = css;
      document.head.appendChild(style);
    };
    const injectLink = (href, id) => {
      if (!hasDOM) return;
      const selector = id ? `link[data-style-id="${id}"]` : `link[rel="stylesheet"][href="${href}"]`;
      if (document.head.querySelector(selector)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      if (id) link.dataset.styleId = id;
      document.head.appendChild(link);
    };
    const removeStyle = id => {
      if (!hasDOM) return;
      document.head.querySelector(`style[data-style-id="${id}"]`)?.remove();
    };
    return {
      getShadowRoot: () => null,
      injectStyle,
      injectLink,
      removeStyle
    };
  }
  return ctx;
};
function ShadowRootProvider({
  getShadowRoot,
  children
}) {
  // Cache constructed sheets per ID (per provider)
  const sheetCacheRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Map());
  const injectStyle = (css, id) => {
    const root = getShadowRoot();

    // If no shadow root, gracefully inject into document.head
    if (!isShadowRoot(root)) {
      if (!hasDOM) return;
      const existing = document.head.querySelector(`style[data-style-id="${id}"]`);
      if (existing) return;
      const style = document.createElement('style');
      style.dataset.styleId = id;
      style.textContent = css;
      document.head.appendChild(style);
      return;
    }

    // Shadow root path
    if (hasConstructedSheets) {
      let sheet = sheetCacheRef.current.get(id);
      if (!sheet) {
        sheet = new CSSStyleSheet();
        sheet.replaceSync(css);
        sheetCacheRef.current.set(id, sheet);
      }
      if (!root.adoptedStyleSheets.includes(sheet)) {
        root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
      }
      return;
    }

    // Fallback <style> in shadow root
    if (root.querySelector(`style[data-style-id="${id}"]`)) return;
    const style = document.createElement('style');
    style.textContent = css;
    style.dataset.styleId = id;
    root.appendChild(style);
  };
  const injectLink = (href, id) => {
    const root = getShadowRoot();

    // If no shadow root, use document.head
    if (!isShadowRoot(root)) {
      if (!hasDOM) return;
      const selector = id ? `link[data-style-id="${id}"]` : `link[rel="stylesheet"][href="${href}"]`;
      if (document.head.querySelector(selector)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      if (id) link.dataset.styleId = id;
      document.head.appendChild(link);
      return;
    }

    // Shadow root link injection
    const selector = id ? `link[data-style-id="${id}"]` : `link[rel="stylesheet"][href="${href}"]`;
    if (root.querySelector(selector)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    if (id) link.dataset.styleId = id;
    root.appendChild(link);
  };
  const removeStyle = id => {
    const root = getShadowRoot();

    // Remove from doc head if no shadow root
    if (!isShadowRoot(root)) {
      if (!hasDOM) return;
      document.head.querySelector(`style[data-style-id="${id}"]`)?.remove();
      return;
    }
    if (hasConstructedSheets) {
      const sheet = sheetCacheRef.current.get(id);
      if (sheet) {
        root.adoptedStyleSheets = root.adoptedStyleSheets.filter(s => s !== sheet);
      }
      return;
    }
    root.querySelector(`style[data-style-id="${id}"]`)?.remove();
  };
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ShadowRootContext.Provider, {
    value: {
      getShadowRoot,
      injectStyle,
      injectLink,
      removeStyle
    },
    children: children
  });
}

/***/ }),

/***/ "./src/utils/context-providers/style-injector.ts":
/*!*******************************************************!*\
  !*** ./src/utils/context-providers/style-injector.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useStyleInjection: () => (/* binding */ useStyleInjection)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shadow_root_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shadow-root-context */ "./src/utils/context-providers/shadow-root-context.tsx");
// src/utils/context-providers/style-injector.ts



// Augment Window locally so TS always sees the field here

// Safe handle to window (SSR-friendly)
const win = typeof window !== 'undefined' ? window : undefined;

// Global dedupe set (persisted on window between renders)
const globalStyleIds = (() => {
  if (!win) return new Set();
  if (!win.__DYNAMIC_STYLE_IDS__) win.__DYNAMIC_STYLE_IDS__ = new Set();
  return win.__DYNAMIC_STYLE_IDS__;
})();
const useStyleInjection = (css, id) => {
  const {
    injectStyle,
    getShadowRoot
  } = (0,_shadow_root_context__WEBPACK_IMPORTED_MODULE_1__.useShadowRoot)() || {};
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!id) {
      if (true) {
        console.warn('useStyleInjection: id is required for dedupe');
      }
      return;
    }
    const shadowRoot = getShadowRoot?.();
    const isInShadow = shadowRoot && shadowRoot !== document;
    if (isInShadow && injectStyle) {
      // Shadow DOM dedupe by ID
      if (!shadowRoot.querySelector(`style[data-style-id="${id}"]`)) {
        injectStyle(css, id); // provider handles DOM append
      }
      return;
    }

    // Global dedupe (memo + DOM check as a safety)
    if (!globalStyleIds.has(id)) {
      const existing = document.head.querySelector(`style[data-style-id="${id}"]`);
      if (!existing) {
        const styleEl = document.createElement('style');
        styleEl.textContent = css;
        styleEl.dataset.styleId = id;
        document.head.appendChild(styleEl);
      }
      globalStyleIds.add(id);
    }
  }, [css, id, injectStyle, getShadowRoot]);
};

/***/ })

};
;
//# sourceMappingURL=src_dynamic-app_dynamic-app-shadow_jsx.server.js.map