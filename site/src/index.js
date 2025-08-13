// src/index.jsx
import './set-public-path'; // keep if you need it for asset origin
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { loadableReady } from '@loadable/component';
import App from './App';
import { SsrDataProvider } from './utils/context-providers/ssr-data-context';

// SSR payload from server
// (server writes: <script>window.__SSR_DATA__ = {...}</script>)
const ssrData = window.__SSR_DATA__ ?? null;

const container = document.getElementById('root');
const app = (
  <SsrDataProvider value={ssrData}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SsrDataProvider>
);

// If SSR markup exists, hydrate with @loadable ready.
// Otherwise, pure client render.
if (container && container.hasChildNodes()) {
  loadableReady(() => {
    hydrateRoot(container, app);
  });
} else {
  createRoot(container).render(app);
}
