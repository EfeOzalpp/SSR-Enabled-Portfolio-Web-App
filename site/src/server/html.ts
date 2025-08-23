// src/server/html.ts
import fs from 'node:fs';
import path from 'node:path';

function readTextSafe(p: string) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return '';
  }
}

/**
 * Scopes CSS to a prefix (default: #efe-portfolio).
 * - Recursively prefixes selectors inside @media blocks.
 * - Skips @keyframes and @font-face (they remain global).
 * - Leaves html/body/:root and allowlisted selectors unprefixed.
 * - Preserves comma-separated selectors.
 */
export function prefixCss(css: string, prefix = '#efe-portfolio') {
  // 1) Recursively process @media blocks so their inner selectors get prefixed.
  css = css.replace(/@media[^{]+\{([\s\S]*?)\}/g, (full, inner) => {
    const prefixedInner = prefixCss(inner, prefix);
    return full.replace(inner, prefixedInner);
  });

  // 2) Keep @keyframes and @font-face as-is (global).
  //    We just avoid touching those blocks by targeting only non-at-rule selectors below.

  // 3) Prefix top-level rules (not starting with '@'), preserving comma lists.
  return css.replace(/(^|\})\s*([^{@}][^{]*)\{/g, (m, brace, selector) => {
    const sel = selector.trim();

    // Allowlist selectors that should remain global
    if (
      sel.startsWith('html') ||
      sel.startsWith('body') ||
      sel.startsWith(':root') ||
      sel.includes('#dynamic-theme') ||
      sel.includes('#shadow-dynamic-app') ||
      sel.includes('::slotted')
    ) {
      return `${brace} ${sel}{`;
    }

    // Prefix each comma-separated selector
    const parts = sel.split(',').map(s => s.trim()).filter(Boolean);
    const prefixed = parts.map(s => `${prefix} ${s}`).join(', ');
    return `${brace} ${prefixed}{`;
  });
}

/**
 * Finds WOFF2 URLs in provided font CSS strings and returns <link rel="preload"> tags.
 * This opts to preload a small set (first few, unique) to keep head lightweight.
 */
function buildFontPreloads(fontCssBlocks: string[], limit = 4): string[] {
  const urlRegex = /url\((['"]?)([^)]+?\.woff2)\1\)/g;
  const urls: string[] = [];
  for (const block of fontCssBlocks) {
    let m: RegExpExecArray | null;
    while ((m = urlRegex.exec(block)) !== null) {
      const href = m[2];
      if (!urls.includes(href)) urls.push(href);
      if (urls.length >= limit) break;
    }
    if (urls.length >= limit) break;
  }
  return urls.map(
    (href) =>
      `<link rel="preload" as="font" href="${href}" type="font/woff2" crossorigin>`
  );
}

export function buildHtmlOpen(opts: {
  IS_DEV: boolean;
  routePath: string;
  iconSvg: string;
  iconIco: string;
  preloadLinks: string[];
  fontsCss: {
    rubikCss: string;
    orbitronCss: string;
    poppinsCss: string;
    epilogueCss: string;
  };
  extractorLinkTags: string;
  extractorStyleTags: string;
  emotionStyleTags: string;
  /** any extra critical CSS to inline (already prefixed) */
  extraCriticalCss?: string;
}) {
  const {
    IS_DEV,
    routePath,
    iconSvg,
    iconIco,
    preloadLinks,
    fontsCss,
    extractorLinkTags,
    extractorStyleTags,
    emotionStyleTags,
    extraCriticalCss = '',
  } = opts;

  const ROOT = process.cwd();
  const cssTheme = readTextSafe(
    path.resolve(ROOT, 'src/styles/font+theme.css')
  );
  const cssBlocks = readTextSafe(
    path.resolve(ROOT, 'src/styles/general-block.css')
  );

  // 1) App-level critical CSS only for landing routes (keeps HEAD lean)
  let appCriticalCss = '';
  if (routePath === '/' || routePath === '/home') {
    appCriticalCss =
      prefixCss(cssTheme) +
      '\n/* --- separator --- */\n' +
      prefixCss(cssBlocks);
  }

  // 2) Always inline project critical CSS when provided
  const projectCriticalCss = extraCriticalCss
    ? '\n/* --- project critical --- */\n' + extraCriticalCss
    : '';

  // 3) Decide html class for homepage font sizing
  const htmlClass =
    routePath === '/' || routePath === '/home' ? 'font-small' : '';

  // Build font preloads from inlined font CSS (limit to keep HEAD lean)
  const fontPreloadLinks = buildFontPreloads(
    [
      fontsCss.rubikCss,
      fontsCss.orbitronCss,
      fontsCss.poppinsCss,
      fontsCss.epilogueCss,
    ],
    4
  ).join('\n');

  return `<!doctype html>
<html lang="en" class="${htmlClass}">
<head>
<meta charSet="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Efe Ozalp - Portfolio</title>
<meta name="description" content="web engineering, 3D modeling, visual design portfolio of Efe Ozalp" />
${IS_DEV ? `<script>window.__ASSET_ORIGIN__="http://"+(window.location.hostname)+":3000"</script>` : ''}
<link rel="icon" href="${iconSvg}" type="image/svg+xml" />
<link rel="icon" href="${iconIco}" sizes="any" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<link rel="preconnect" href="https://cdn.sanity.io" crossorigin>
<link rel="dns-prefetch" href="https://cdn.sanity.io">
${(preloadLinks || []).join('\n')}
${fontPreloadLinks}

<style>
${fontsCss.rubikCss}
${fontsCss.orbitronCss}
${fontsCss.poppinsCss}
${fontsCss.epilogueCss}
</style>

${extractorLinkTags}
${extractorStyleTags}
${(appCriticalCss || projectCriticalCss)
  ? `<style id="critical-inline-app-css">${appCriticalCss}${projectCriticalCss}</style>`
  : ''}
${emotionStyleTags}
</head>
<body>
<div id="root">`;
}

export function buildHtmlClose(ssrPayload: any, scriptTags: string) {
  // write the SSR payload safely
  const ssrJson = `<script>window.__SSR_DATA__=${JSON.stringify(
    ssrPayload
  ).replace(/</g, '\\u003c')}</script>`;
  return `</div>${ssrJson}
${scriptTags}
</body></html>`;
}
