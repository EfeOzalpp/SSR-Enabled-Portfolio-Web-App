// DynamicTheme émbéd.jsx (with guarded alt observer)
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navigation from './components/navigation';
import TitleDivider from './components/title';
import SortBy from './components/sortBy';
import LoadingScreen from '../utils/loading/loading';
import FireworksDisplay from './components/fireworksDisplay';
import PauseButton from './components/pauseButton';
import Footer from './components/footer';
import fetchSVGIcons from './lib/fetchSVGIcons';
import ObservedCard from './lib/observedCard.jsx';
import setupAltObserver from './lib/setupAltObserver';
import IntroOverlay from './components/IntroOverlay';
import { colorMapping } from './lib/colorString.ts';
import { useShadowRoot } from '../utils/context-providers/shadow-root-context.tsx';
import indexCss from '../styles/dynamic-app/index.css?raw';
import miscCss from '../styles/dynamic-app/misc.css?raw';
import overlayCss from '../styles/loading-overlay.css?raw';

function DynamicTheme() {
  const [sortedImages, setSortedImages] = useState([]);
  const [svgIcons, setSvgIcons] = useState({});
  const [activeColor, setActiveColor] = useState('#FFFFFF');
  const [movingTextColors, setMovingTextColors] = useState(['#FFFFFF', '#FFFFFF', '#FFFFFF']);
  const [lastKnownColor, setLastKnownColor] = useState('#FFFFFF');
  const [isLoading, setIsLoading] = useState(true);
  const [pauseAnimation, setPauseAnimation] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);

  /** @type {React.MutableRefObject<((enabled:boolean)=>void)|null>} */
  const toggleFireworksRef = useRef(null);
  /** @type {React.MutableRefObject<HTMLElement|null>} */
  const scrollContainerRef = useRef(null);
  /** @type {React.MutableRefObject<HTMLElement|null>} */
  const shadowRef = useRef(null);

  // Derived fireworks mount flag (visibility && !paused)
  const [showFireworks, setShowFireworks] = useState(true);

  // Track host visibility for guarding alt updates
  const [isHostVisible, setIsHostVisible] = useState(false);
  const hostVisibleRef = useRef(false);

  const { getShadowRoot, injectStyle } = useShadowRoot();

  useEffect(() => {
    [indexCss, miscCss, overlayCss].forEach(injectStyle);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setShowNavigation(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchSVGIcons().then((icons) => {
        const iconMapping = icons.reduce((acc, icon) => {
          acc[icon.title] = icon.icon;
          return acc;
        }, /** @type {Record<string,string>} */ ({}));
        setSvgIcons(iconMapping);
        setTimeout(() => setIsLoading(false), 200);
      });
    }, 400);
  }, []);

  /** @type {React.MutableRefObject<Document|ShadowRoot|null>} */
  const observerRoot = useRef(null);

  useEffect(() => {
    const root = typeof getShadowRoot === 'function' ? getShadowRoot() : document;
    observerRoot.current = root;
  }, [getShadowRoot]);

  // ------ ALT color logic (unchanged helpers) ------
  const handleActivate = useCallback((alt1) => {
    const colors = colorMapping[alt1];
    if (colors && colors[0] !== activeColor) {
      setActiveColor(colors[2]);
      setMovingTextColors([colors[0], colors[1], colors[3]]);
      setLastKnownColor(colors[2]);
    }
  }, [activeColor]);

  const handleDeactivate = useCallback(() => {
    if (activeColor !== lastKnownColor) {
      setActiveColor(lastKnownColor);
    }
  }, [activeColor, lastKnownColor]);

  // ------ Guarded alt observer: only while host is visible; dedup events; cleanup properly ------
  const currentAltRef = useRef(null);

  useEffect(() => {
    if (isLoading || sortedImages.length === 0) return;
    const root = observerRoot.current;
    if (!root) return;

    const guardedActivate = (alt1) => {
      if (!hostVisibleRef.current) return;           // ignore when section not visible
      if (currentAltRef.current === alt1) return;    // ignore duplicate activate
      currentAltRef.current = alt1;
      handleActivate(alt1);
    };

    const guardedDeactivate = (alt1) => {
      if (!hostVisibleRef.current) return;           // ignore when section not visible
      if (currentAltRef.current !== alt1) return;    // only deactivate if it was the active one
      handleDeactivate(alt1);
    };

    const cleanup = setupAltObserver(guardedActivate, guardedDeactivate, root);
    return typeof cleanup === 'function' ? cleanup : undefined;
    // NOTE: don't include pauseAnimation here; pausing shouldn't rebuild the observer
  }, [isLoading, sortedImages, handleActivate, handleDeactivate]);

  // ------ Pause button bridge ------
  const handleSetToggleFireworks = useCallback((toggleFunction) => {
    toggleFireworksRef.current = toggleFunction;
  }, []);

  const handlePauseToggle = useCallback((isEnabled) => {
    // sync internal engine immediately, if mounted
    if (toggleFireworksRef.current) toggleFireworksRef.current(isEnabled);
    setPauseAnimation(!isEnabled);
  }, []);

  // ------ Resize (as you had) ------
  useEffect(() => {
    if (!shadowRef.current) return;
    const observer = new ResizeObserver(() => {
      console.log('[🔁 Resize observed]', shadowRef.current?.getBoundingClientRect());
    });
    observer.observe(shadowRef.current);
    return () => observer.disconnect();
  }, []);

  // ------ Host visibility controls fireworks AND gates alt updates ------
  useEffect(() => {
    const container = document.querySelector('#block-dynamic');
    if (!container) {
      console.warn('[FireworkObserver] #block-dynamic not found in DOM');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = !!entry.isIntersecting;
        hostVisibleRef.current = visible;
        setIsHostVisible(visible);

        const desired = visible && !pauseAnimation; // respect Pause
        setShowFireworks((prev) => (prev !== desired ? desired : prev));
        if (toggleFireworksRef.current) toggleFireworksRef.current(desired);
      },
      { threshold: 0.3, root: null }
    );

    io.observe(container);

    // Run once immediately
    const rect = container.getBoundingClientRect();
    const visibleNow = rect.top < window.innerHeight && rect.bottom > 0;
    hostVisibleRef.current = visibleNow;
    setIsHostVisible(visibleNow);

    const initialDesired = visibleNow && !pauseAnimation;
    setShowFireworks((prev) => (prev !== initialDesired ? initialDesired : prev));
    if (toggleFireworksRef.current) toggleFireworksRef.current(initialDesired);

    return () => io.disconnect();
  }, [pauseAnimation]);

  // Keep internal engine synced when pause toggles
  useEffect(() => {
    if (toggleFireworksRef.current) toggleFireworksRef.current(!pauseAnimation && isHostVisible);
  }, [pauseAnimation, isHostVisible]);

  const cardRefs = useRef([]);
  cardRefs.current = sortedImages.map((_, i) => cardRefs.current[i] ?? React.createRef());

  return (
    <>
      {isLoading ? (
        <LoadingScreen isFullScreen={false} />
      ) : (
        <div className="homePage-container" ref={scrollContainerRef}>
          <IntroOverlay />

          <div className="navigation-wrapper">
            {showNavigation && (
              <Navigation
                customArrowIcon2={svgIcons['arrow1']}
                customArrowIcon={svgIcons['arrow2']}
                items={sortedImages}
                activeColor={activeColor}
                isInShadow={typeof getShadowRoot === 'function' && getShadowRoot() !== document}
                scrollLockContainer={scrollContainerRef.current}
              />
            )}
          </div>

          <div className="firework-wrapper">
            <div className="firework-divider">
              {showFireworks && (
                <FireworksDisplay
                  colorMapping={colorMapping}
                  items={sortedImages}
                  activeColor={activeColor}
                  lastKnownColor={lastKnownColor}
                  onToggleFireworks={handleSetToggleFireworks}
                />
              )}
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="title-divider">
            <TitleDivider
              svgIcon={svgIcons['logo-small-1']}
              movingTextColors={movingTextColors}
              pauseAnimation={pauseAnimation}
            />
          </div>

          <div id="homePage">
            <div className="no-overflow">
              <div className="pause-button-wrapper">
                <PauseButton toggleP5Animation={handlePauseToggle} />
              </div>

              <div className="sort-by-divider">
                <h3 className="students-heading">Students</h3>
                <SortBy
                  setSortOption={() => {}}
                  onFetchItems={setSortedImages}
                  customArrowIcon={svgIcons['arrow2']}
                  colorMapping={colorMapping}
                  getRoot={getShadowRoot}
                />
              </div>

              <div className="section-divider2"></div>

              <div className="UI-card-divider">
                {sortedImages.map((data, index) => (
                  <ObservedCard
                    key={index}
                    data={data}
                    index={index}
                    getShadowRoot={getShadowRoot}
                    pauseAnimation={pauseAnimation}
                    customArrowIcon2={svgIcons['arrow1']}
                  />
                ))}
              </div>

              <Footer
                customArrowIcon2={svgIcons['arrow1']}
                linkArrowIcon={svgIcons['link-icon']}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DynamicTheme;
