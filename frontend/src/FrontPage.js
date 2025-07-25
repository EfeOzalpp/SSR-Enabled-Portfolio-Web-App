// src/FrontPage.js
import { useEffect, useState } from 'react';
import NavMenu from './components/nav-menu.tsx';
import Loading from './components/loading.tsx'; 
import ScrollController from './utils/scroll-controller.tsx'; 
import OpacityObserver from './utils/opacity-observer.tsx';
import TitleObserver from './utils/title-observer.tsx';
import ThemeColorUpdater from './utils/theme-color-updater.tsx';  
import { GlobalTooltip } from './utils/global-tooltip.tsx';
import { ProjectVisibilityProvider } from './utils/project-context.tsx';

import './styles/block-type-1.css';
import './styles/block-type-g.css';
import './styles/general-block.css';

function Frontpage() {
  const [mouseIdle, setMouseIdle] = useState(false);

  useEffect(() => {
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
      document.removeEventListener('touchmove', preventPinchZoom);
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
    };
  }, []);

  return (
    <ProjectVisibilityProvider setMouseIdle={setMouseIdle}>
      <ThemeColorUpdater />
      <Loading />
      <div className="HereGoesNothing">
        <NavMenu />
        <ScrollController />
        <OpacityObserver />
        <TitleObserver />
        <GlobalTooltip mouseIdle={mouseIdle} />
      </div>
    </ProjectVisibilityProvider>
  );
}

export default Frontpage;