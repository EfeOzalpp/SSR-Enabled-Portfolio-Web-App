// src/FrontPage.js
import { useEffect, useState } from 'react';
import NavMenu from './components/nav-menu.tsx';
import ViewProject from './utils/title/view-project.tsx';
import { TitleProvider } from './utils/title/title-context.tsx';
import Loading from './utils/content-utility/loading.tsx'; 
import ScrollController from './utils/scroll-controller.tsx'; 
import ThemeColorUpdater from './utils/theme-color-updater.tsx';  
import { ProjectVisibilityProvider } from './utils/project-context.tsx';

import { Helmet } from 'react-helmet';

// Import your CSS directly
import './styles/block-type-1.css';
import './styles/block-type-g.css';
import './styles/block-type-a.css';
import './styles/general-block.css';
import './styles/font+theme.css';
import './styles/loading-overlay.css';

// If fonts were converted to CSS @font-face rules, import here too
import './styles/fonts/fonts1.css';
import './styles/fonts/epilogue.css';

function Frontpage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasFadedIn, setHasFadedIn] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('font-small');

    const timeout = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setHasFadedIn(true), 50);
    }, 200);

    const preventPinchZoom = (event) => {
      if (event.target.tagName.toLowerCase() === 'video') return;
      if (event.touches && event.touches.length > 1) {
        event.preventDefault();
      }
    };

    const preventGesture = (e) => {
      if (e.target.tagName.toLowerCase() === 'video') return;
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventPinchZoom, { passive: false });
    document.addEventListener('gesturestart', preventGesture);
    document.addEventListener('gesturechange', preventGesture);
    document.addEventListener('gestureend', preventGesture);

    return () => {
      document.documentElement.classList.remove('font-small');
      clearTimeout(timeout);
      document.removeEventListener('touchmove', preventPinchZoom);
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Efe Ozalp</title>
        <meta name="description" content="Efe Ozalp | WebApp Development, Visual Design, 3D Modeling" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#1e1e1f" />
      </Helmet>

      <ProjectVisibilityProvider>
        <div
          className={`transition-wrapper ${
            isLoading ? 'loading-active' : hasFadedIn ? 'app-visible' : 'app-hidden'
          }`}
          style={{ position: 'relative' }}
        >
          {isLoading ? (
            <Loading isFullScreen={true} />
          ) : (
            <div className="HereGoesNothing" id="landing">
              <ThemeColorUpdater />
              <NavMenu />
              <TitleProvider>
                <ViewProject />
              </TitleProvider>
              <ScrollController />
            </div>
          )}
        </div>
      </ProjectVisibilityProvider>
    </>
  );
}

export default Frontpage;
