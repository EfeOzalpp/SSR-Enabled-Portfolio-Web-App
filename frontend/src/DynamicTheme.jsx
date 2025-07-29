// DynamicTheme.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navigation from './dynamic-app/components/navigation';
import TitleDivider from './dynamic-app/components/title';
import UIcards from './dynamic-app/components/homepage-UIcards';
import SortBy from './dynamic-app/components/sortBy';
import LoadingScreen from './dynamic-app/components/loadingPage';
import FireworksDisplay from './dynamic-app/components/fireworksDisplay';
import PauseButton from './dynamic-app/components/pauseButton';
import Footer from './dynamic-app/components/footer';
import fetchSVGIcons from './dynamic-app/lib/fetchSVGIcons';
import setupIntersectionObserver from './dynamic-app/lib/intersectionObserver';
import setupAltObserver from './dynamic-app/lib/setupAltObserver';
import IntroOverlay from './dynamic-app/components/IntroOverlay';
import { Helmet } from 'react-helmet';

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

function DynamicTheme() {
  const [sortedImages, setSortedImages] = useState([]);
  const [svgIcons, setSvgIcons] = useState({});
  const [activeColor, setActiveColor] = useState('#FFFFFF');
  const [movingTextColors, setMovingTextColors] = useState(['#FFFFFF', '#FFFFFF', '#FFFFFF']);
  const [lastKnownColor, setLastKnownColor] = useState('#FFFFFF');
  const [isLoading, setIsLoading] = useState(true);
  const [pauseAnimation, setPauseAnimation] = useState(false);
  const [cssReady, setCssReady] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const toggleFireworksRef = useRef(null);

  useEffect(() => {
    const cssFiles = [
      '/dynamic-app/styles/misc.css',
      '/dynamic-app/styles/index.css',
      '/dynamic-app/styles/navigation.css',
      '/dynamic-app/styles/sortByStyles.css',
      '/dynamic-app/styles/title.css',
      '/dynamic-app/styles/UIcards.css',
      '/dynamic-app/fonts/rubik.css',
      '/dynamic-app/fonts/orbitron.css',
    ];

    let loaded = 0;
    const links = cssFiles.map((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => {
        loaded += 1;
        if (loaded === cssFiles.length) {
          setCssReady(true);
          setTimeout(() => setShowNavigation(true), 50);
        }
      };
      document.head.appendChild(link);
      return link;
    });

    return () => {
      links.forEach((link) => {
        if (link && link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
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

  useEffect(() => {
    if (!isLoading) {
      setupIntersectionObserver(pauseAnimation);
      setupAltObserver(handleActivate, handleDeactivate);
    }
  }, [isLoading, sortedImages, pauseAnimation]);

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
     console.log('[👁️ Alt Activated]', alt1); // ✅ log the alt1 being detected
      console.log('[🎨 Mapped Colors]', colors); // ✅ log associated colors

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
    <Helmet>
      <title>DMI - Dynamic Theme</title>
      <meta name="description" content="Fresh Media is a Dynamic Media Institute at MassArt tradition! Students exhibit their projects. This is the 2025 curation." />
      <meta name="keywords" content="Innovation, Art, Technology, Science, Culture, Exhibition, Installation, Display, Projects" />
      <meta name="theme-color" content="#1e1e1f" />
      <link rel="icon" href="/freshmedia-icon.svg" type="image/svg+xml" />
      <link rel="shortcut icon" type="image/svg+xml" href="/freshmedia-icon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/freshmedia-icon.svg" />
      <meta property="og:title" content="DMI MassArt - Fresh Media 2025" />
      <meta property="og:description" content="Fresh Media is a Dynamic Media Institute at MassArt tradition! This is the 2025 curation." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.example.com/image-path/og-image.jpg" />
      <meta property="og:url" content="https://www.example.com/page-url/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="DMI MassArt - Fresh Media 2025" />
      <meta name="twitter:description" content="Fresh Media is a Dynamic Media Institute at MassArt tradition! This is the 2025 curation." />
      <meta name="twitter:image" content="https://www.example.com/image-path/twitter-image.jpg" />
    </Helmet>
    <div className="dynamic-app">
      {!cssReady ? (
        <div className="loading-screen" />
      ) : isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="homePage-container">
          <IntroOverlay />
          <div className="navigation-wrapper">
            {showNavigation && (
              <Navigation
                customArrowIcon2={svgIcons['arrow1']}
                customArrowIcon={svgIcons['arrow2']}
                items={sortedImages}
                activeColor={activeColor}
              />
            )}
          </div>
          <div className="firework-divider">
            <div className="section-divider"></div>
            <FireworksDisplay
              colorMapping={colorMapping}
              items={sortedImages}
              activeColor={activeColor}
              lastKnownColor={lastKnownColor}
              onToggleFireworks={handleSetToggleFireworks}
            />
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
    </div>
  </>
  );
}

export default DynamicTheme;
