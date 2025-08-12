// src/server/index.jsx
// SSR server: works in both dev and prod. Streams HTML + JS, supports @loadable + Emotion.

import path from 'path';
import fs from 'fs';
import React from 'react';
import { StaticRouter } from 'react-router';   
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import App from '../App';
import { ChunkExtractor } from '@loadable/server';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';

const express = require('express');
const app = express();
const IS_DEV = process.env.NODE_ENV !== 'production';
const DEV_ASSETS_ORIGIN = 'http://localhost:3000/';

// Paths for prod build
const BUILD_DIR = path.resolve(process.cwd(), 'build');
const PROD_STATS_FILE = path.resolve(BUILD_DIR, 'loadable-stats.json');
const DEV_STATS_FILE = path.resolve(process.cwd(), 'loadable-stats.json');
const STATS_FILE = fs.existsSync(PROD_STATS_FILE) ? PROD_STATS_FILE : DEV_STATS_FILE;
const ASSET_MANIFEST = path.resolve(BUILD_DIR, 'asset-manifest.json');

// Static asset serving (prod only)
if (!IS_DEV) {
  app.use('/static', express.static(path.join(BUILD_DIR, 'static'), { maxAge: '1y', index: false }));
  app.use(express.static(BUILD_DIR, { index: false }));
}

function createEmotion() {
  const cache = createCache({ key: 'css', prepend: true });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  return { cache, extractCriticalToChunks, constructStyleTagsFromChunks };
}

app.get('/*', (req, res) => {
  if (!fs.existsSync(STATS_FILE)) {
    res.status(500).send(
      '<pre>Missing build artifacts. Run `npm run build` (prod) or `npm run dev:ssr` (dev) to generate loadable-stats.json.</pre>'
    );
    return;
  }

  const extractor = new ChunkExtractor({
    statsFile: STATS_FILE,
    publicPath: IS_DEV ? DEV_ASSETS_ORIGIN : '/', // use CRA dev server for assets in dev
  });

  const { cache, extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotion();

  const jsx = extractor.collectChunks(
    <CacheProvider value={cache}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </CacheProvider>
  );

  // Emotion critical CSS prepass
  const prerender = renderToString(jsx);
  const emotionChunks = extractCriticalToChunks(prerender);
  const emotionStyleTags = constructStyleTagsFromChunks(emotionChunks);

  // Optional favicon (only in prod build)
  let manifest;
  if (!IS_DEV) {
    try {
      manifest = JSON.parse(fs.readFileSync(ASSET_MANIFEST, 'utf8'));
    } catch {
      manifest = null;
    }
  }

  const htmlOpen = `<!doctype html>
<html lang="en">
<head>
<meta charSet="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
${!IS_DEV && manifest?.files?.['favicon.ico'] ? `<link rel="icon" href="${manifest.files['favicon.ico']}" />` : ''}

${extractor.getLinkTags()}
${extractor.getStyleTags()}
${emotionStyleTags}
<!-- React 19 hoists <title>/<meta>/<link> rendered in components into <head> during streaming. -->
</head>
<body id="efe-portfolio">
<div id="root">`;

  const htmlClose = `</div>
${extractor.getScriptTags()}
</body></html>`;

  let didError = false;
  const ABORT_MS = 10000;

  const stream = renderToPipeableStream(jsx, {
    onShellReady() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.write(htmlOpen);
      stream.pipe(res);
    },
    onAllReady() {
      res.write(htmlClose);
      res.end();
    },
    onError(err) {
      didError = true;
      console.error('[SSR] Error:', err);
    },
  });

  setTimeout(() => {
    console.warn('[SSR] Aborting stream after timeout');
    stream.abort();
  }, ABORT_MS);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SSR server running at http://localhost:${PORT} (${IS_DEV ? 'development' : 'production'})`);
});
