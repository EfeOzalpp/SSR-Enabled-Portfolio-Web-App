// src/FrontPage.js
import { useEffect, useState } from 'react';
import NavMenu from './components/nav-menu.tsx';
import Loading from './components/loading.tsx'; 
import ScrollController from './utils/scroll-controller.tsx'; 
import OpacityObserver from './utils/opacity-observer.tsx';
import TitleObserver from './utils/title-observer.tsx';
import ThemeColorUpdater from './utils/theme-color-updater.tsx';  
import { ProjectVisibilityProvider } from './utils/project-context.tsx';
import { initGlobalTooltip } from './utils/tooltip.ts';
import { Helmet } from 'react-helmet';

function Frontpage() {

useEffect(() => {
  document.documentElement.classList.add('font-small');

  // Dynamically inject CSS
  const cssFiles = [
    '/styles/block-type-1.css',
    '/styles/block-type-g.css',
    '/styles/block-type-a.css',
    '/styles/general-block.css',
    '/styles/font+theme.css',
    '/fonts/fonts1.css',
    '/fonts/epilogue.css',
    '/styles/loading-overlay.css',
    '/styles/tooltip.css'
  ];

  const links = cssFiles.map((href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    return link;
  });

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

    // Remove CSS when component unmounts
    links.forEach((link) => document.head.removeChild(link));

    document.removeEventListener('touchmove', preventPinchZoom);
    document.removeEventListener('gesturestart', preventGesture);
    document.removeEventListener('gesturechange', preventGesture);
    document.removeEventListener('gestureend', preventGesture);
  };
}, []);

useEffect(() => {
  initGlobalTooltip();
}, []);

  return (
    <ProjectVisibilityProvider>
      <Helmet>
        <title>Efe Ozalp</title>
        <meta name="description" content="Efe Ozalp | WebApp Development, Visual Design, 3D Modeling" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#1e1e1f" />
      </Helmet>
      <div className="HereGoesNothing" id="landing">
        <ThemeColorUpdater />
        <Loading />
        <NavMenu />
        <ScrollController />
        <OpacityObserver />
        <TitleObserver />
      </div>
    </ProjectVisibilityProvider>
  );
}

export default Frontpage;