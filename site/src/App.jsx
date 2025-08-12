// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import scopedShell from './ScopedShell'; 

// Pages
const Frontpage = loadable(() => import('./FrontPage.jsx'));                 
// If you want CSR-only for now, keep { ssr: false }:
const DynamicTheme = loadable(() => import('./DynamicTheme.jsx'), { ssr: false }); 

export default function App() {
  return (
    <>
      {/* Hoisted into <head> in SSR */}
      <title>Efe Ozalp</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Preconnect to Sanity CDN */}
      <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
      <link rel="dns-prefetch" href="https://cdn.sanity.io" />

      {/* Fonts */}
      <link rel="preload" href="/fonts/rubik.css" as="style" />
      <link rel="stylesheet" href="/fonts/rubik.css" />

      <link rel="preload" href="/fonts/orbitron.css" as="style" />
      <link rel="stylesheet" href="/fonts/orbitron.css" />

      <link rel="preload" href="/fonts2/poppins.css" as="style" />
      <link rel="stylesheet" href="/fonts2/poppins.css" />

      <link rel="preload" href="/fonts2/epilogue.css" as="style" />
      <link rel="stylesheet" href="/fonts2/epilogue.css" />

      <Routes>
        {/* Only Frontpage routes are inside the scoped wrapper */}
        <Route path="/" element={React.createElement(scopedShell, null, <Frontpage />)} />
        <Route path="/home" element={React.createElement(scopedShell, null, <Frontpage />)} />

        {/* DynamicTheme is OUTSIDE the scope */}
        <Route path="/dynamic-theme" element={<DynamicTheme />} />
      </Routes>
    </>
  );
}
