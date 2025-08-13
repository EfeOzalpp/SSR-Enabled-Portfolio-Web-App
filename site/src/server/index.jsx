// src/server/index.jsx
import path from 'path';
import fs from 'fs';
import React from 'react';
import express from 'express';
import { StaticRouter } from 'react-router';
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import App from '../App';
import { ChunkExtractor } from '@loadable/server';
import { CacheProvider } from '@emotion/react';
import { createEmotion } from './emotion';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { SsrDataProvider } from '../utils/context-providers/ssr-data-context';
import { prepareSsrData } from './prepareSsrData';

// helpers
import { getEphemeralSeed } from './seed'; // fresh seed per request
import {
  resolveStatsFile,
  loadManifestIfAny,
  readFontCss,
  buildPreloadLinks,
} from './assets';
import { buildHtmlOpen, buildHtmlClose } from './html';

const app = express();

const IS_DEV = process.env.NODE_ENV !== 'production';
const HOST = '172.20.10.13';
const DEV_HOST_FOR_ASSETS = '172.20.10.13';
const DEV_ASSETS_ORIGIN = `http://${DEV_HOST_FOR_ASSETS}:3000/`;

const { BUILD_DIR, STATS_FILE, ASSET_MANIFEST } = resolveStatsFile();

/** -----------------------------
 * Static assets (dev & prod)
 * Serve the entire public/ directory BEFORE SSR catch-all.
 * ----------------------------- */
app.use(
  express.static(path.join(process.cwd(), 'public'), {
    maxAge: '1y',
    index: false, // never serve a public/index.html; SSR handles HTML
  })
);

// (Optional) keep these if you want stricter headers, but public/ already covers them
// app.use('/fonts', express.static(path.join(process.cwd(), 'public', 'fonts'), { maxAge: '1y' }));
// app.use('/fonts2', express.static(path.join(process.cwd(), 'public', 'fonts2'), { maxAge: '1y' }));

/** Dev asset proxy for CRA */
if (IS_DEV) {
  app.use('/static', createProxyMiddleware({ target: DEV_ASSETS_ORIGIN, changeOrigin: true, ws: true }));
  app.use('/sockjs-node', createProxyMiddleware({ target: DEV_ASSETS_ORIGIN, changeOrigin: true, ws: true }));
}

/** Prod build file serving */
if (!IS_DEV) {
  app.use('/static', express.static(path.join(BUILD_DIR, 'static'), { maxAge: '1y', index: false }));
  app.use(express.static(BUILD_DIR, { index: false }));
}

/** -----------------------------
 * SSR catch-all
 * ----------------------------- */
app.get('/*', async (req, res) => {
  // 0) seed for deterministic randomness (fresh every request)
  const { seed } = getEphemeralSeed();

  // 1) Prepare SSR payload (seed + preloaded first project data)
  const ssrPayload = await prepareSsrData(seed);

  if (!fs.existsSync(STATS_FILE)) {
    res
      .status(500)
      .send('<pre>Missing build artifacts. Run `npm run build` (prod) or `npm run dev:ssr` (dev) to generate loadable-stats.json.</pre>');
    return;
  }

  // 2) Setup loadable extractor
  const extractor = new ChunkExtractor({
    statsFile: STATS_FILE,
    publicPath: IS_DEV ? DEV_ASSETS_ORIGIN : '/',
  });

  // 3) Emotion setup
  const { cache, extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotion();

  // 4) Wrap in providers
  const jsx = extractor.collectChunks(
    <CacheProvider value={cache}>
      <SsrDataProvider value={ssrPayload}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </SsrDataProvider>
    </CacheProvider>
  );

  // 5) Pre-render for Emotion critical CSS
  const prerender = renderToString(jsx);
  const emotionChunks = extractCriticalToChunks(prerender);
  const emotionStyleTags = constructStyleTagsFromChunks(emotionChunks);

  // 6) Manifest (prod only) + icons
  const manifest = loadManifestIfAny(IS_DEV, ASSET_MANIFEST);
  const iconIco = !IS_DEV && manifest?.files?.['favicon.ico'] ? manifest.files['favicon.ico'] : '/favicon.ico';
  const iconSvg = '/favicon.svg';

  // 7) Fonts
  const fontsCss = readFontCss();

  // 8) Preload first media (optional)
  const firstKey = Object.keys(ssrPayload.preloaded || {})[0];
  const firstData = firstKey ? ssrPayload.preloaded[firstKey] : null;
  const preloadLinks = buildPreloadLinks(firstData);

  // 9) Build HTML parts
  const htmlOpen = buildHtmlOpen({
    IS_DEV,
    routePath: req.path,
    iconSvg,
    iconIco,
    preloadLinks,
    fontsCss,
    extractorLinkTags: extractor.getLinkTags(),
    extractorStyleTags: extractor.getStyleTags(),
    emotionStyleTags,
  });

  const htmlClose = buildHtmlClose(ssrPayload, extractor.getScriptTags());

  // 10) Stream the app (with proper lifecycle)
  let didError = false;
  const ABORT_MS = IS_DEV ? 30000 : 10000;

  const stream = renderToPipeableStream(jsx, {
    onShellReady() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.write(htmlOpen);
      // IMPORTANT: don't auto-end; we'll write htmlClose ourselves
      stream.pipe(res, { end: false });
    },
    onAllReady() {
      clearTimeout(abortTimer);
      res.write(htmlClose);
      res.end();
    },
    onShellError(err) {
      clearTimeout(abortTimer);
      console.error('[SSR] Shell error:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('An error occurred while loading the app.');
    },
    onError(err) {
      didError = true;
      console.error('[SSR] Error:', err);
    },
  });

  const abortTimer = setTimeout(() => {
    if (!res.writableEnded) {
      console.warn('[SSR] Aborting stream after timeout');
      stream.abort();
    }
  }, ABORT_MS);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, HOST, () => {
  console.log(`SSR server running at http://${HOST}:${PORT} (${IS_DEV ? 'development' : 'production'})`);
});
