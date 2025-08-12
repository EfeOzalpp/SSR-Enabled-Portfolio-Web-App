// src/index.jsx
import './set-public-path';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { loadableReady } from '@loadable/component';
import App from './App';

const container = document.getElementById('root');
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if (container && container.hasChildNodes()) {
  loadableReady(() => {
    hydrateRoot(container, app);
  });
} else {
  createRoot(container).render(app);
}
