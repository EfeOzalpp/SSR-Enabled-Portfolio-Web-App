// src/FrontPage.js
import PendantLamp from './components/pendant-lamp.tsx'
import NavMenu from './components/nav-menu.tsx'
import './styles/block-type-1.css';

function Frontpage() {
  return (
    <div className="HereGoesNothing">
      <NavMenu />
      <PendantLamp />
    </div>
  )
}

export default Frontpage
