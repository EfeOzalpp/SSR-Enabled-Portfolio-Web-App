import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Frontpage from './FrontPage.jsx';
import DynamicTheme from './DynamicTheme.jsx';

const path = window.location.pathname;

const injectFonts = () => {
  const fontUrls = [
    '/dynamic-app/fonts/rubik.css',
    '/dynamic-app/fonts/orbitron.css'
  ];

  fontUrls.forEach((href) => {
    if (![...document.styleSheets].some(s => s.href?.includes(href))) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  });
};

// Inject fonts once on load
injectFonts();

if (path === '/' || path === '/home') {
  ReactDOM.createRoot(document.getElementById('efe-portfolio')).render(
     // <React.StrictMode>
      <BrowserRouter>
        <Frontpage />
      </BrowserRouter>
    // </React.StrictMode>
  );
} else if (path === '/dynamic-theme') {
  ReactDOM.createRoot(document.getElementById('dynamic-theme')).render(
    // <React.StrictMode>
      <BrowserRouter>
        <DynamicTheme />
      </BrowserRouter>
    // </React.StrictMode>
  );
}
