// src/FrontPage.js
import { useEffect } from 'react';
import NavMenu from './components/nav-menu.tsx';
import Loading from './components/loading.tsx'; 

import ScrollController from './utils/scroll-controller.tsx'; 
import OpacityObserver from './utils/opacity-observer.tsx';
import TitleObserver from './utils/title-observer.tsx';
import ThemeColorUpdater from './utils/theme-color-updater.tsx';  

import { ProjectVisibilityProvider } from './utils/project-context.tsx';

import './styles/block-type-1.css'; // Type 1 Project Block
import './styles/block-type-g.css'; // Evade the Rock
import './styles/general-block.css'; // Fonts, Colors, etc. 

function Frontpage() {

  useEffect(() => {
    const preventPinchZoom = (event) => {
      // Allow pinch-zoom on videos
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
      document.removeEventListener('touchmove', preventPinchZoom);
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
    };
  }, []);

  return (
    <ProjectVisibilityProvider>
      <ThemeColorUpdater />
      <Loading />
      <div className="HereGoesNothing">
        <NavMenu />
        <ScrollController />
        <OpacityObserver />
        <TitleObserver />
      </div>
    </ProjectVisibilityProvider>
  );
}

export default Frontpage;
