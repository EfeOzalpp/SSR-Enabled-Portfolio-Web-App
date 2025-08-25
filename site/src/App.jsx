// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import ScopedShell from './ScopedShell'; // use PascalCase for components

const Frontpage = loadable(() => import('./FrontPage.jsx'));
const DynamicThemeRoute = loadable(() => import('./dynamic-app/ssr-app/dynamic-theme.route.tsx'));

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ScopedShell>
            <Frontpage />
          </ScopedShell>
        }
      />
      <Route
        path="/home"
        element={
          <ScopedShell>
            <Frontpage />
          </ScopedShell>
        }
      />
      {/* No ScopedShell here to avoid #efe-portfolio wrapper */}
      <Route path="/dynamic-theme/*" element={<DynamicThemeRoute />} />
    </Routes>
  );
}
