import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Frontpage from './FrontPage';
import DynamicTheme from './DynamicTheme';

const path = window.location.pathname;

if (path === '/' || path === '/home') {
  ReactDOM.createRoot(document.getElementById('Efe Ozalps Portfolio lol')).render(
    <React.StrictMode>
      <BrowserRouter>
        <Frontpage />
      </BrowserRouter>
    </React.StrictMode>
  );
} else if (path === '/dynamic-theme') {
  ReactDOM.createRoot(document.getElementById('dynamic-theme')).render(
    <React.StrictMode>
      <BrowserRouter>
        <DynamicTheme />
      </BrowserRouter>
    </React.StrictMode>
  );
}
