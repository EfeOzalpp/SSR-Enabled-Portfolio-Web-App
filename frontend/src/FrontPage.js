// src/FrontPage.js
import NavMenu from './components/nav-menu.tsx';
import Loading from './components/loading.tsx'; 

import ScrollController from './utils/scroll-controller.tsx'; 
import OpacityObserver from './utils/opacity-observer.tsx';
import TitleObserver from './utils/title-observer.tsx';
import ThemeColorUpdater from './utils/theme-color-updater.tsx';  

import { ProjectVisibilityProvider } from './utils/project-visibility.tsx';

import './styles/block-type-1.css'; // Type 1 Project Block
import './styles/block-type-g.css'; // Evade the Rock
import './styles/general-block.css'; // Fonts, Colors, etc. 

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
