import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import ScopedShell from './ScopedShell';
import { loadLottie } from './utils/load-lottie'; 

const Frontpage = loadable(() => import('./FrontPage.jsx'));
const DynamicThemeRoute = loadable(() => import('./dynamic-app/ssr-app/dynamic-theme.route.tsx'));

export default function App() {
  useEffect(() => {
    // Eagerly load Lottie right after hydration; stays in its own async chunk.
    loadLottie();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ScopedShell><Frontpage /></ScopedShell>} />
      <Route path="/home" element={<ScopedShell><Frontpage /></ScopedShell>} />
      {/* No ScopedShell here to avoid #efe-portfolio wrapper */}
      <Route path="/dynamic-theme/*" element={<DynamicThemeRoute />} />
    </Routes>
  );
}
