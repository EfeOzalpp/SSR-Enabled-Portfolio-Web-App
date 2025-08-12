import React from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import scopedShell from './ScopedShell';

// Pages
const Frontpage = loadable(() => import('./FrontPage.jsx'));
const DynamicTheme = loadable(() => import('./DynamicTheme.jsx'), { ssr: false });

export default function App() {
  return (
    <>
      {/* Title & meta will be managed server-side */}
      <Routes>
        <Route path="/" element={React.createElement(scopedShell, null, <Frontpage />)} />
        <Route path="/home" element={React.createElement(scopedShell, null, <Frontpage />)} />
        <Route path="/dynamic-theme" element={<DynamicTheme />} />
      </Routes>
    </>
  );
}
