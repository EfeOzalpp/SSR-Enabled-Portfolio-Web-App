import 'dotenv/config'
import path from 'path'
import fs from 'fs'
import React from 'react'
import express from 'express'
import { StaticRouter } from 'react-router'
import { renderToPipeableStream, renderToString } from 'react-dom/server'
import App from '../App'
import { ChunkExtractor } from '@loadable/server'
import { CacheProvider } from '@emotion/react'
import { createEmotion } from './emotion'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { SsrDataProvider } from '../utils/context-providers/ssr-data-context'
import { prepareSsrData } from './prepareSsrData'
import { ssrRegistry } from '../ssr/registry'
import { buildHtmlOpen, buildHtmlClose } from './html'
import { buildCriticalCss } from './cssPipeline'

import highScoreRoute from './highScoreRoute'
import { getEphemeralSeed } from './seed'
import {
  resolveStatsFile,
  loadManifestIfAny,
  readFontCss,
  buildPreloadLinks,
} from './assets'

const app = express()
app.use(express.json())

const IS_DEV = process.env.NODE_ENV !== 'production'
const HOST = '192.168.1.104'
const DEV_HOST_FOR_ASSETS = '192.168.1.104'
const DEV_ASSETS_ORIGIN = `http://${DEV_HOST_FOR_ASSETS}:3000/`

const { BUILD_DIR, STATS_FILE, ASSET_MANIFEST } = resolveStatsFile()

/** API routes */
app.use('/api', highScoreRoute)

/** Static assets */
app.use(express.static(path.join(process.cwd(), 'public'), { maxAge: '1y', index: false }))

if (IS_DEV) {
  app.use('/static', createProxyMiddleware({ target: DEV_ASSETS_ORIGIN, changeOrigin: true, ws: true }))
  app.use('/sockjs-node', createProxyMiddleware({ target: DEV_ASSETS_ORIGIN, changeOrigin: true, ws: true }))
} else {
  app.use('/static', express.static(path.join(BUILD_DIR, 'static'), { maxAge: '1y', index: false }))
  app.use(express.static(BUILD_DIR, { index: false }))
}

/** SSR catch-all */
app.get('/*', async (req, res) => {
  const isDynamicTheme = req.path.startsWith('/dynamic-theme')

  if (!fs.existsSync(STATS_FILE)) {
    res.status(500).send('<pre>Missing build artifacts. Run `npm run build` or `npm run dev:ssr`.</pre>')
    return
  }

  // Seed + preload data: only for NON-dynamic routes
  let ssrPayload = { seed: null, preloaded: {}, preloadLinks: [] }
  if (!isDynamicTheme) {
    const { seed } = getEphemeralSeed()
    ssrPayload = await prepareSsrData(seed)
  }

  const extractor = new ChunkExtractor({
    statsFile: STATS_FILE,
    publicPath: IS_DEV ? DEV_ASSETS_ORIGIN : '/',
  })

  const { cache, extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotion()

  const jsx = extractor.collectChunks(
    <CacheProvider value={cache}>
      <SsrDataProvider value={ssrPayload}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </SsrDataProvider>
    </CacheProvider>
  )

  const prerender = renderToString(jsx)
  const emotionChunks = extractCriticalToChunks(prerender)
  const emotionStyleTags = constructStyleTagsFromChunks(emotionChunks)

  const manifest = loadManifestIfAny(IS_DEV, ASSET_MANIFEST)

  // Icons (html builder chooses which to emit)
  const iconSvg = '/freshmedia-icon.svg'
  const iconIco = !IS_DEV && manifest?.files?.['favicon.ico'] ? manifest.files['favicon.ico'] : '/favicon.ico'

  // Fonts: build once, then keep only Rubik + Orbitron on /dynamic-theme
  const allFonts = readFontCss()
  const fontsCss = isDynamicTheme
    ? { rubikCss: allFonts.rubikCss, orbitronCss: allFonts.orbitronCss, poppinsCss: '', epilogueCss: '' }
    : allFonts

  // Preloads: only for NON-dynamic routes
  let preloadLinks = []
  if (!isDynamicTheme) {
    const firstKey = Object.keys(ssrPayload.preloaded || {})[0]
    const firstData = firstKey ? ssrPayload.preloaded[firstKey] : null
    preloadLinks = buildPreloadLinks(firstData)
  }

  // Project critical CSS: only for NON-dynamic routes
  let extraCriticalCss = ''
  if (!isDynamicTheme) {
    const firstKey = Object.keys(ssrPayload.preloaded || {})[0]
    if (firstKey) {
      const desc = ssrRegistry[firstKey]
      const files = desc?.criticalCssFiles || []
      if (files.length > 0) {
        try {
          extraCriticalCss = await buildCriticalCss(files)
        } catch (err) {
          console.error('[SSR] buildCriticalCss failed:', err)
          extraCriticalCss = ''
        }
      }
    }
  }

  // Filter CRA/Loadable CSS on /dynamic-theme
  const rawLinkTags = extractor.getLinkTags()
  const extractorLinkTags = isDynamicTheme
    ? rawLinkTags.replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/g, '')
    : rawLinkTags
  const extractorStyleTags = isDynamicTheme ? '' : extractor.getStyleTags()

  const htmlOpen = buildHtmlOpen({
    IS_DEV,
    routePath: req.path,
    iconSvg,
    iconIco,
    preloadLinks,
    fontsCss,
    extractorLinkTags,
    extractorStyleTags,
    emotionStyleTags,
    extraCriticalCss,
  })

  const htmlClose = buildHtmlClose(ssrPayload, extractor.getScriptTags())

  let didError = false
  const ABORT_MS = IS_DEV ? 30000 : 10000

  const stream = renderToPipeableStream(jsx, {
    onShellReady() {
      res.statusCode = didError ? 500 : 200
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.write(htmlOpen)
      stream.pipe(res, { end: false })
    },
    onAllReady() {
      clearTimeout(abortTimer)
      res.write(htmlClose)
      res.end()
    },
    onShellError(err) {
      clearTimeout(abortTimer)
      console.error('[SSR] Shell error:', err)
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end('An error occurred while loading the app.')
    },
    onError(err) {
      didError = true
      console.error('[SSR] Error:', err)
    },
  })

  const abortTimer = setTimeout(() => {
    if (!res.writableEnded) {
      console.warn('[SSR] Aborting stream after timeout')
      stream.abort()
    }
  }, ABORT_MS)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, HOST, () => {
  console.log(`SSR server running at http://${HOST}:${PORT} (${IS_DEV ? 'development' : 'production'})`)
})
