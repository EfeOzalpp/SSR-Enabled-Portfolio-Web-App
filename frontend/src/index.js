import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Frontpage from './FrontPage.jsx';

// Fonts (always loaded)
import './styles/dynamic-app/fonts/rubik.css';
import './styles/dynamic-app/fonts/orbitron.css';

const path = window.location.pathname;

if (path === '/' || path === '/home') {
  // Theme+font CSS for homepage only
  import('./styles/font+theme.css').then(() => {
    ReactDOM.createRoot(document.getElementById('efe-portfolio')).render(
      <BrowserRouter>
        <Frontpage />
      </BrowserRouter>
    );
  });
} else if (path === '/dynamic-theme') {
  import('./DynamicTheme.jsx').then(({ default: DynamicTheme }) => {
    ReactDOM.createRoot(document.getElementById('dynamic-theme')).render(
      <BrowserRouter>
        <DynamicTheme />
      </BrowserRouter>
    );
  });
}
