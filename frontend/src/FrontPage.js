// src/FrontPage.js
import NavMenu from './components/nav-menu.tsx';
import ScrollController from './utils/scroll-controller.tsx'; // <-- use ScrollController
import ViewProject from './components/view-project.tsx';
import './styles/block-type-1.css';
import './styles/general-block.css';

function Frontpage() {
  return (
    <div className="HereGoesNothing">
      <NavMenu />
      <ViewProject />
      <ScrollController /> {/* replace ShuffledComponents with ScrollController */}
    </div>
  );
}

export default Frontpage;
