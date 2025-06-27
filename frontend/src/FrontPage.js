// src/FrontPage.js
import NavMenu from './components/nav-menu.tsx';
import ScrollController from './utils/scroll-controller.tsx'; // <-- use ScrollController
import ContentObserver1 from './utils/content-observer-1.tsx';
import ViewProject from './components/view-project.tsx';
import './styles/block-type-1.css';
import './styles/general-block.css';

function Frontpage() {
  return (
    <div className="HereGoesNothing">
      <NavMenu />
      <ViewProject />
      <ScrollController />
      <ContentObserver1 />
    </div>
  );
}

export default Frontpage;
