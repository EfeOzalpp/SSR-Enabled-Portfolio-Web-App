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
import { ssrRegistry } from '../ssr/registry';
import { prefixCss, buildHtmlOpen, buildHtmlClose } from './html';

// helpers
import { getEphemeralSeed } from './seed';
import {
  resolveStatsFile,
  loadManifestIfAny,
  readFontCss,
  buildPreloadLinks,
} from './assets';

const app = express();

const IS_DEV = process.env.NODE_ENV !== 'production';
const HOST = '172.20.10.13';
const DEV_HOST_FOR_ASSETS = '172.20.10.13';
const DEV_ASSETS_ORIGIN = `http://${DEV_HOST_FOR_ASSETS}:3000/`;

const { BUILD_DIR, STATS_FILE, ASSET_MANIFEST } = resolveStatsFile();

/** -----------------------------
 * Static assets
 * ----------------------------- */
app.use(
  express.static(path.join(process.cwd(), 'public'), {
    maxAge: '1y',
    index: false,
  })
);

if (IS_DEV) {
  app.use('/static', createProxyMiddleware({ target: DEV_ASSETS_ORIGIN, changeOrigin: true, ws: true }));
  app.use('/sockjs-node', createProxyMiddleware({ target: DEV_ASSETS_ORIGIN, changeOrigin: true, ws: true }));
}

if (!IS_DEV) {
  app.use('/static', express.static(path.join(BUILD_DIR, 'static'), { maxAge: '1y', index: false }));
  app.use(express.static(BUILD_DIR, { index: false }));
}

/** -----------------------------
 * SSR catch-all
 * ----------------------------- */
app.get('/*', async (req, res) => {
  // 0) seed per request
  const { seed } = getEphemeralSeed();

  // 1) SSR payload
  const ssrPayload = await prepareSsrData(seed);

  if (!fs.existsSync(STATS_FILE)) {
    res
      .status(500)
      .send('<pre>Missing build artifacts. Run `npm run build` (prod) or `npm run dev:ssr` (dev) to generate loadable-stats.json.</pre>');
    return;
  }

  // 2) loadable
  const extractor = new ChunkExtractor({
    statsFile: STATS_FILE,
    publicPath: IS_DEV ? DEV_ASSETS_ORIGIN : '/',
  });

  // 3) emotion
  const { cache, extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotion();

  // 4) providers
  const jsx = extractor.collectChunks(
    <CacheProvider value={cache}>
      <SsrDataProvider value={ssrPayload}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </SsrDataProvider>
    </CacheProvider>
  );

  // 5) emotion critical CSS
  const prerender = renderToString(jsx);
  const emotionChunks = extractCriticalToChunks(prerender);
  const emotionStyleTags = constructStyleTagsFromChunks(emotionChunks);

  // 6) manifest/icons
  const manifest = loadManifestIfAny(IS_DEV, ASSET_MANIFEST);
  const iconIco = !IS_DEV && manifest?.files?.['favicon.ico'] ? manifest.files['favicon.ico'] : '/favicon.ico';
  const iconSvg = '/favicon.svg';

  // 7) fonts
  const fontsCss = readFontCss();

  // 8) preload first media (depends on ssrPayload)
  const firstKey = Object.keys(ssrPayload.preloaded || {})[0];
  const firstData = firstKey ? ssrPayload.preloaded[firstKey] : null;
  const preloadLinks = buildPreloadLinks(firstData);

  // 8.5) per-first-project critical CSS (compute here)
  let extraCriticalCss = '';
  if (firstKey) {
    const desc = ssrRegistry[firstKey];
    const files = desc?.criticalCssFiles || [];
    if (files.length > 0) {
      const ROOT = process.cwd();
      const readSafe = (p) => {
        try { return fs.readFileSync(path.resolve(ROOT, p), 'utf8'); } catch { return ''; }
      };
      extraCriticalCss = files
        .map((relPath) => prefixCss(readSafe(relPath)))
        .filter(Boolean)
        .join('\n/* --- separator --- */\n');
    }
  }

  // 9) HTML
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
    extraCriticalCss,
  });

  const htmlClose = buildHtmlClose(ssrPayload, extractor.getScriptTags());

  // 10) stream
  let didError = false;
  const ABORT_MS = IS_DEV ? 30000 : 10000;

  const stream = renderToPipeableStream(jsx, {
    onShellReady() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.write(htmlOpen);
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
