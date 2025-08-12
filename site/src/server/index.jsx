// src/server/index.jsx
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
import { createProxyMiddleware } from 'http-proxy-middleware';
import { SsrDataProvider } from '../utils/context-providers/ssr-data-context';
import { prepareSsrData } from './prepareSsrData';

const express = require('express');
const app = express();

const IS_DEV = process.env.NODE_ENV !== 'production';
const HOST = '192.168.1.143';
const DEV_HOST_FOR_ASSETS = '192.168.1.143';
const DEV_ASSETS_ORIGIN = `http://${DEV_HOST_FOR_ASSETS}:3000/`;

// Paths for prod build
const BUILD_DIR = path.resolve(process.cwd(), 'build');
const PROD_STATS_FILE = path.resolve(BUILD_DIR, 'loadable-stats.json');
const DEV_STATS_FILE = path.resolve(process.cwd(), 'loadable-stats.json');
const STATS_FILE = fs.existsSync(PROD_STATS_FILE) ? PROD_STATS_FILE : DEV_STATS_FILE;
const ASSET_MANIFEST = path.resolve(BUILD_DIR, 'asset-manifest.json');

// --- Static assets (available in both dev & prod) ---
app.use('/fonts', express.static(path.join(process.cwd(), 'public', 'fonts'), { maxAge: '1y' }));
app.use('/fonts2', express.static(path.join(process.cwd(), 'public', 'fonts2'), { maxAge: '1y' }));

// Serve icons & PWA files explicitly (both dev & prod)
app.use('/favicon.ico', express.static(path.join(process.cwd(), 'public', 'favicon.ico'), { maxAge: '1y' }));
app.use('/favicon.svg', express.static(path.join(process.cwd(), 'public', 'favicon.svg'), { maxAge: '1y' }));
app.use('/apple-touch-icon.png', express.static(path.join(process.cwd(), 'public', 'apple-touch-icon.png'), { maxAge: '1y' }));
app.use('/site.webmanifest', express.static(path.join(process.cwd(), 'public', 'site.webmanifest'), { maxAge: '1y' }));

// Proxy dev assets from CRA dev server
if (IS_DEV) {
  app.use(
    '/static',
    createProxyMiddleware({
      target: DEV_ASSETS_ORIGIN,
      changeOrigin: true,
      ws: true,
    })
  );
  app.use(
    '/sockjs-node',
    createProxyMiddleware({
      target: DEV_ASSETS_ORIGIN,
      changeOrigin: true,
      ws: true,
    })
  );
}

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

app.get('/*', async (req, res) => {
  // 1. Prepare SSR payload
  const ssrPayload = await prepareSsrData();

  if (!fs.existsSync(STATS_FILE)) {
    res
      .status(500)
      .send('<pre>Missing build artifacts. Run `npm run build` (prod) or `npm run dev:ssr` (dev) to generate loadable-stats.json.</pre>');
    return;
  }

  // 2. Setup loadable extractor
  const extractor = new ChunkExtractor({
    statsFile: STATS_FILE,
    publicPath: IS_DEV ? DEV_ASSETS_ORIGIN : '/',
  });

  // 3. Setup Emotion cache
  const { cache, extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotion();

  // 4. Wrap in providers
  const jsx = extractor.collectChunks(
    <CacheProvider value={cache}>
      <SsrDataProvider value={ssrPayload}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </SsrDataProvider>
    </CacheProvider>
  );

  // 5. Pre-render for Emotion critical CSS
  const prerender = renderToString(jsx);
  const emotionChunks = extractCriticalToChunks(prerender);
  const emotionStyleTags = constructStyleTagsFromChunks(emotionChunks);

  // 6. Manifest (prod only)
  let manifest = null;
  if (!IS_DEV) {
    try {
      manifest = JSON.parse(fs.readFileSync(ASSET_MANIFEST, 'utf8'));
    } catch {
      manifest = null;
    }
  }

  // 7. Icons
  const iconIco = !IS_DEV && manifest?.files?.['favicon.ico'] ? manifest.files['favicon.ico'] : '/favicon.ico';
  const iconSvg = '/favicon.svg';

  // 8. Fonts
  const safeRead = (file) => fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const rubikCss = safeRead(path.resolve(process.cwd(), 'public/fonts/rubik.css'));
  const orbitronCss = safeRead(path.resolve(process.cwd(), 'public/fonts/orbitron.css'));
  const poppinsCss = safeRead(path.resolve(process.cwd(), 'public/fonts2/poppins.css'));
  const epilogueCss = safeRead(path.resolve(process.cwd(), 'public/fonts2/epilogue.css'));

  // 9. HTML open
  const htmlOpen = `<!doctype html>
<html lang="en">
<head>
<meta charSet="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
${IS_DEV ? `<script>window.__ASSET_ORIGIN__="http://"+(window.location.hostname)+":3000"</script>` : ''}
<link rel="icon" href="${iconSvg}" type="image/svg+xml" />
<link rel="icon" href="${iconIco}" sizes="any" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<link rel="preconnect" href="https://cdn.sanity.io" crossorigin>
<link rel="dns-prefetch" href="https://cdn.sanity.io">
<style>
${rubikCss}
${orbitronCss}
${poppinsCss}
${epilogueCss}
</style>
${extractor.getLinkTags()}
${extractor.getStyleTags()}
${emotionStyleTags}
</head>
<body id="efe-portfolio">
<div id="root">`;

  // 10. Serialize SSR payload
  const ssrJson = `<script>window.__SSR_DATA__=${JSON.stringify(ssrPayload).replace(/</g, '\\u003c')}</script>`;

  // 11. HTML close
  const htmlClose = `</div>${ssrJson}
${extractor.getScriptTags()}
</body></html>`;

  // 12. Streaming render
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
app.listen(PORT, HOST, () => {
  console.log(`SSR server running at http://${HOST}:${PORT} (${IS_DEV ? 'development' : 'production'})`);
});
