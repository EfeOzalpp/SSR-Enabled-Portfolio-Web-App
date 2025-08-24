import React from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import scopedShell from './ScopedShell';

const Frontpage = loadable(() => import('./FrontPage.jsx'));
const DynamicThemeRoute = loadable(() => import('./dynamic-app/ssr-app/dynamic-theme.route.jsx'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={React.createElement(scopedShell, null, <Frontpage />)} />
      <Route path="/home" element={React.createElement(scopedShell, null, <Frontpage />)} />
      <Route
        path="/dynamic-theme"
        element={React.createElement(scopedShell, null, <DynamicThemeRoute />)}
      />
    </Routes>
  );
}
