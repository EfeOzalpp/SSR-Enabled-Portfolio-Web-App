// src/FrontPage.js
import { useEffect, useState } from 'react';
import NavMenu from './components/nav-menu.tsx';
import ViewProject from './utils/title/view-project.tsx';
import { TitleProvider } from './utils/title/title-context.tsx';
import Loading from './utils/content-utility/loading.tsx';
import ScrollController from './utils/scroll-controller.tsx';
import { ProjectVisibilityProvider } from './utils/context-providers/project-context.tsx';

import './styles/font+theme.css';
import './styles/general-block.css';

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
      {/* React 19 automatically hoists these into <head> during SSR/CSR */}
      <meta
        name="description"
        content="Efe Ozalp | WebApp Development, Visual Design, 3D Modeling"
      />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      {/* add OG/Twitter tags here too if you want */}
      {/* <meta property="og:title" content="Efe Ozalp" /> */}
      {/* <meta property="og:description" content="..." /> */}
      {/* <meta property="og:image" content="https://yourdomain.com/og-image.jpg" /> */}
      {/* <meta name="twitter:card" content="summary_large_image" /> */}

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
