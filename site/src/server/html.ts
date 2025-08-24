import fs from 'node:fs';
import path from 'node:path';

function readTextSafe(p: string) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return ''; }
}

function readFirst(paths: string[]): string {
  for (const p of paths) {
    const txt = readTextSafe(p);
    if (txt) return txt;
  }
  return '';
}

/** Prefix helper (unchanged) */
export function prefixCss(css: string, prefix = '#efe-portfolio') {
  css = css.replace(/@media[^{]+\{([\s\S]*?)\}/g, (full, inner) => {
    const prefixedInner = prefixCss(inner, prefix);
    return full.replace(inner, prefixedInner);
  });

  return css.replace(/(^|\})\s*([^{@}][^{]*)\{/g, (m, brace, selector) => {
    const sel = selector.trim();
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
    const parts = sel.split(',').map(s => s.trim()).filter(Boolean);
    const prefixed = parts.map(s => `${prefix} ${s}`).join(', ');
    return `${brace} ${prefixed}{`;
  });
}

/** Build limited font preloads from the blocks actually emitted */
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
  return urls.map(href => `<link rel="preload" as="font" href="${href}" type="font/woff2" crossorigin>`);
}

/* Per-route head */
export function buildRouteHead(routePath: string) {
  if (routePath.startsWith('/dynamic-theme')) {
    return `
      <title>DMI - Dynamic Theme</title>
      <meta name="description" content="Fresh Media is a Dynamic Media Institute at MassArt tradition! Students exhibit their projects. This is the 2024 curation.">
      <meta name="keywords" content="Innovation, Art, Technology, Science, Culture, Exhibition, Installation, Display, Projects">
      <meta name="theme-color" content="#1e1e1f">
      <meta property="og:title" content="DMI MassArt - Fresh Media 2025">
      <meta property="og:description" content="Fresh Media is a Dynamic Media Institute at MassArt tradition! Students exhibit their projects. This is the 2024 curation.">
      <meta property="og:type" content="website">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="DMI MassArt - Fresh Media 2024">
      <meta name="twitter:description" content="Fresh Media is a Dynamic Media Institute at MassArt tradition! Students exhibit their projects. This is the 2024 curation.">
    `;
  }
  return '';
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
  extraCriticalCss?: string;
}) {
  const {
    IS_DEV, routePath, iconSvg, iconIco, preloadLinks,
    fontsCss, extractorLinkTags, extractorStyleTags,
    emotionStyleTags, extraCriticalCss = '',
  } = opts;

  const ROOT = process.cwd();
  const cssTheme  = readTextSafe(path.resolve(ROOT, 'src/styles/font+theme.css'));
  const cssBlocks = readTextSafe(path.resolve(ROOT, 'src/styles/general-block.css'));

  // App-level critical CSS only for landing routes
  let appCriticalCss = '';
  if (routePath === '/' || routePath === '/home') {
    appCriticalCss = prefixCss(cssTheme) + '\n' + prefixCss(cssBlocks);
  }

  const projectCriticalCss = extraCriticalCss ? '\n' + extraCriticalCss : '';

  const htmlClass =
    routePath.startsWith('/dynamic-theme') ? 'route-dynamic' :
    (routePath === '/' || routePath === '/home') ? 'font-small' :
    '';

  const routeHead = buildRouteHead(routePath);
  const injectDefaultSiteHead = routeHead === '';
  const defaultTitle = `<title>Efe Ozalp - Portfolio</title>`;
  const defaultDesc  = `<meta name="description" content="web engineering, 3D modeling, visual design portfolio of Efe Ozalp" />`;

  const isDynamicTheme = routePath.startsWith('/dynamic-theme');
  const v = IS_DEV ? `?v=${Date.now()}` : '';
  const iconLinks = isDynamicTheme
    ? `<link rel="icon" href="${iconSvg}${v}" type="image/svg+xml" sizes="any">`
    : `<link rel="icon" href="${iconIco}${v}" sizes="any">`;
  const appleTouch = isDynamicTheme
    ? `<link rel="apple-touch-icon" sizes="180x180" href="/freshmedia-icon.png${v}">`
    : `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png${v}">`;

  // Inline Dynamic Theme UIcards.css only on /dynamic-theme (no prefix)
  let dynamicThemeInlineCss = '';
  if (isDynamicTheme) {
    const uiCardsCss = readFirst([
      path.resolve(ROOT, 'src/dynamic-app/styles/UIcards.css'),
      path.resolve(ROOT, 'src/styles/dynamic-app/UIcards.css'),
    ]);
    if (uiCardsCss) {
      dynamicThemeInlineCss = `<style id="critical-dynamic-ui-cards">${uiCardsCss}</style>`;
    }
  }

  // FONTS: use whatever was passed (index.jsx trims Poppins/Epilogue for dynamic)
  const fontBlocks = [
    fontsCss.rubikCss,
    fontsCss.orbitronCss,
    fontsCss.poppinsCss,
    fontsCss.epilogueCss,
  ].filter(Boolean);

  const fontPreloadLinks = buildFontPreloads(fontBlocks, 4).join('\n');

  return `<!doctype html>
<html lang="en" class="${htmlClass}">
<head>
<meta charSet="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
${injectDefaultSiteHead ? defaultTitle : ''}
${injectDefaultSiteHead ? defaultDesc  : ''}
${IS_DEV ? `<script>window.__ASSET_ORIGIN__="http://"+(window.location.hostname)+":3000"</script>` : ''}

${iconLinks}
${appleTouch}

<link rel="manifest" href="/site.webmanifest" />
<link rel="preconnect" href="https://cdn.sanity.io" crossorigin>
<link rel="dns-prefetch" href="https://cdn.sanity.io">
${(preloadLinks || []).join('\n')}
${fontPreloadLinks}

<style>
${fontBlocks.join('\n')}
</style>

${extractorLinkTags}
${extractorStyleTags}
${(appCriticalCss || projectCriticalCss)
  ? `<style id="critical-inline-app-css">${appCriticalCss}${projectCriticalCss}</style>`
  : ''}
${emotionStyleTags}

${dynamicThemeInlineCss}
${routeHead}
</head>
<body>
<div id="root">`;
}

export function buildHtmlClose(ssrPayload: any, scriptTags: string) {
  const ssrJson = `<script>window.__SSR_DATA__=${JSON.stringify(ssrPayload).replace(/</g, '\\u003c')}</script>`;
  return `</div>${ssrJson}
${scriptTags}
</body></html>`;
}
