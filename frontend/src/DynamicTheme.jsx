// DynamicTheme.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navigation from './dynamic-app/components/navigation';
import TitleDivider from './dynamic-app/components/title';
import UIcards from './dynamic-app/components/homepage-UIcards';
import SortBy from './dynamic-app/components/sortBy';
import LoadingScreen from './utils/content-utility/loading.tsx';
import FireworksDisplay from './dynamic-app/components/fireworksDisplay';
import PauseButton from './dynamic-app/components/pauseButton';
import Footer from './dynamic-app/components/footer';
import fetchSVGIcons from './dynamic-app/lib/fetchSVGIcons';
import setupIntersectionObserver from './dynamic-app/lib/documentObserver.ts';
import setupAltObserver from './dynamic-app/lib/setupAltObserver';
import IntroOverlay from './dynamic-app/components/IntroOverlay';
import { colorMapping } from './dynamic-app/lib/colorString.ts';
import { Helmet } from 'react-helmet';
import miscCss from './styles/dynamic-app/misc.css?raw';
import indexCss from './styles/dynamic-app/index.css?raw';
import overlayCss from './styles/loading-overlay.css?raw';

import { useStyleInjection } from './utils/context-providers/style-injector.ts';

function DynamicTheme() {
  const [sortedImages, setSortedImages] = useState([]);
  const [svgIcons, setSvgIcons] = useState({});
  const [activeColor, setActiveColor] = useState('#FFFFFF');
  const [movingTextColors, setMovingTextColors] = useState(['#FFFFFF', '#FFFFFF', '#FFFFFF']);
  const [lastKnownColor, setLastKnownColor] = useState('#FFFFFF');
  const [isLoading, setIsLoading] = useState(true);
  const [pauseAnimation, setPauseAnimation] = useState(false);
  const toggleFireworksRef = useRef(null);
  const dynamicAppRef = useRef(null);
  const [showFireworks, setShowFireworks] = useState(true);

  useStyleInjection(miscCss, 'dynamic-app-style-misc');
  useStyleInjection(indexCss, 'dynamic-app-style-index');
  useStyleInjection(overlayCss, 'dynamic-app-style-overlay');

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
      setupIntersectionObserver(pauseAnimation, document);
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
  
  const observer = new ResizeObserver(() => {
    requestAnimationFrame(() => {
      const rect = dynamicAppRef.current?.getBoundingClientRect();
    });
  });

  useEffect(() => {
  const fireworkContainer = document.querySelector('.firework-divider');

  if (!fireworkContainer) {
    console.warn('[FireworkObserver] Firework container not found');
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      const isVisible = entry.isIntersecting;
      setShowFireworks((prev) => {
        if (prev !== isVisible) {
          console.log('[FireworkObserver] State changed:', isVisible);
          return isVisible;
        }
        return prev;
      });
    },
    {
      threshold: 0.1,
      root: null, // Not shadow, so default root
    }
  );

  observer.observe(fireworkContainer);

  return () => {
    observer.disconnect();
  };
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
    
    <div className="dynamic-app" ref={dynamicAppRef}>
        {isLoading ? (
          <LoadingScreen isFullScreen={true} />
        ) : (
        <div className="homePage-container">
          <IntroOverlay />
          <div className="navigation-wrapper">
              <Navigation
                customArrowIcon2={svgIcons['arrow1']}
                customArrowIcon={svgIcons['arrow2']}
                items={sortedImages}
                activeColor={activeColor}
              />
          </div>
          <div className="firework-divider">
            <div className="section-divider"></div>
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
