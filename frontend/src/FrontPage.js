// src/FrontPage.js
import NavMenu from './components/nav-menu.tsx'
import ShuffledComponents from './utils/shuffled-components.tsx'
import ViewProject from './components/view-project.tsx'
import './styles/block-type-1.css';
import './styles/general-block.css';

function Frontpage() {
  return (
    <div className="HereGoesNothing">
      <NavMenu />
      <ViewProject />
      <ShuffledComponents />
    </div>
  )
}

export default Frontpage
