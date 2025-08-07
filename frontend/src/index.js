import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Frontpage from './FrontPage.jsx';

const path = window.location.pathname;

if (path === '/' || path === '/home') {
  ReactDOM.createRoot(document.getElementById('efe-portfolio')).render(
    <BrowserRouter>
      <Frontpage />
    </BrowserRouter>
  );
} else if (path === '/dynamic-theme') {
  import('./DynamicTheme.jsx').then(({ default: DynamicTheme }) => {
    ReactDOM.createRoot(document.getElementById('dynamic-theme')).render(
      <BrowserRouter>
        <DynamicTheme />
      </BrowserRouter>
    );
  });
}
