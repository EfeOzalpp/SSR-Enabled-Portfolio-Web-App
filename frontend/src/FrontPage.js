// src/FrontPage.js
import NavMenu from './components/nav-menu.tsx';
import ScrollController from './utils/scroll-controller.tsx'; // <-- use ScrollController
import OpacityObserver from './utils/opacity-observer.tsx';
import TitleObserver from './utils/title-observer.tsx';
import { ProjectVisibilityProvider } from './utils/project-visibility.tsx';
import './styles/block-type-1.css';
import './styles/general-block.css';

function Frontpage() {
  return (
  <ProjectVisibilityProvider>
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
