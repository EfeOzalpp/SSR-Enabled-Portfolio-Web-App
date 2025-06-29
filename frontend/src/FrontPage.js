// src/FrontPage.js
import NavMenu from './components/nav-menu.tsx';
import Loading from './components/loading.tsx'; 

import ScrollController from './utils/scroll-controller.tsx'; 
import OpacityObserver from './utils/opacity-observer.tsx';
import TitleObserver from './utils/title-observer.tsx';
import ThemeColorUpdater from './utils/theme-color-updater.tsx';

import { ProjectVisibilityProvider } from './utils/project-visibility.tsx';
import './styles/block-type-1.css';
import './styles/general-block.css';

function Frontpage() {
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
