// DynamicTheme.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navigation from './components/navigation';
import TitleDivider from './components/title';
import UIcards from './components/homepage-UIcards';
import SortBy from './components/sortBy';
import LoadingScreen from './components/loadingPage';
import FireworksDisplay from './components/fireworksDisplay';
import PauseButton from './components/pauseButton';
import Footer from './components/footer';
import fetchSVGIcons from './lib/fetchSVGIcons';
import setupIntersectionObserver from './lib/intersectionObserver';
import setupAltObserver from './lib/setupAltObserver';
import IntroOverlay from './components/IntroOverlay';

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

function DynamicTheme({ getShadowRoot }) {
  const [sortedImages, setSortedImages] = useState([]);
  const [svgIcons, setSvgIcons] = useState({});
  const [activeColor, setActiveColor] = useState('#FFFFFF');
  const [movingTextColors, setMovingTextColors] = useState(['#FFFFFF', '#FFFFFF', '#FFFFFF']);
  const [lastKnownColor, setLastKnownColor] = useState('#FFFFFF');
  const [isLoading, setIsLoading] = useState(true);
  const [pauseAnimation, setPauseAnimation] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const toggleFireworksRef = useRef(null);
  const scrollContainerRef = useRef(null);
  
useEffect(() => {
  const timeout = setTimeout(() => {
    setIsLoading(false);
    setShowNavigation(true); // runs when DOM is ready
  }, 200);
  return () => clearTimeout(timeout);
}, []);

  useEffect(() => {
    setTimeout(() => {
      fetchSVGIcons().then((icons) => {
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

const observerRoot = useRef(null);

useEffect(() => {
  const root = typeof getShadowRoot === 'function' ? getShadowRoot() : document;
  observerRoot.current = root;
}, [getShadowRoot]);

useEffect(() => {
  if (!isLoading && sortedImages.length > 0) {
    const root = observerRoot.current;
    console.log('[🔁 Rebinding Observers]', root);

    setupIntersectionObserver(pauseAnimation, root);
    setupAltObserver(handleActivate, handleDeactivate, root);
  }
}, [sortedImages, pauseAnimation, isLoading]);

  const handleSetToggleFireworks = useCallback((toggleFunction) => {
    toggleFireworksRef.current = toggleFunction;
  }, []);

  const handlePauseToggle = useCallback((isEnabled) => {
    if (toggleFireworksRef.current) {
      toggleFireworksRef.current(isEnabled);
    }
    setPauseAnimation(!isEnabled);
  }, []);

  const handleActivate = (alt1) => {
    const colors = colorMapping[alt1];

    if (colors && colors[0] !== activeColor) {
      setActiveColor(colors[2]);
      setMovingTextColors([colors[0], colors[1], colors[3]]);
      setLastKnownColor(colors[2]);
    }
  };

  const handleDeactivate = (alt1) => {
    if (activeColor !== lastKnownColor) {
      setActiveColor(lastKnownColor);
    }
  };

  useEffect(() => {
  console.log('[MOUNTING FireworksDisplay]');
  return () => console.log('[UNMOUNTING FireworksDisplay]');
}, []);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
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
        <div className="firework-wrapper-shadow">
            <div className="firework-divider-shadow">
              <FireworksDisplay
                colorMapping={colorMapping}
                items={sortedImages}
                activeColor={activeColor}
                lastKnownColor={lastKnownColor}
                onToggleFireworks={handleSetToggleFireworks}
              />
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
                {sortedImages.map((imageData, index) => (
                  <UIcards
                    key={index}
                    title={imageData.title}
                    backgroundColor={imageData.backgroundColor}
                    image1={imageData.image1}
                    image2={imageData.image2}
                    alt1={imageData.alt1}
                    alt2={imageData.alt2}
                    url1={imageData.url1}
                    className={`custom-card-${index}`}
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
