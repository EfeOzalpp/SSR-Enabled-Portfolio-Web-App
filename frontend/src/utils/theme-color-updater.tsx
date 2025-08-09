import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useProjectVisibility } from './context-providers/project-context.tsx';
import { projectColors } from './content-utility/color-map.ts';

function parseToRGB(c?: string): { r: number; g: number; b: number } | null {
  if (!c) return null;
  const m = c.match(/\d+(\.\d+)?/g);
  if (m && (m.length === 3 || m.length === 4)) {
    const [r, g, b] = m.map(Number);
    return { r, g, b };
  }
  if (c.startsWith('#')) {
    const hex = c.slice(1);
    const norm = hex.length === 3 ? hex.split('').map(x => x + x).join('') : hex;
    const int = parseInt(norm, 16);
    return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
  }
  return null;
}

function toOpaqueHex(c?: string, fallback = '#18181a') {
  const rgb = parseToRGB(c);
  if (!rgb) return c?.startsWith('#') ? c : fallback;
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

const ThemeColorUpdater = () => {
  const { activeProject, focusedProjectKey } = useProjectVisibility();

  const cfg = projectColors[activeProject];
  const topColor = cfg?.darkThemeTop || (cfg?.rgb ? `rgb(${cfg.rgb})` : '#18181a');
  const themeHex = toOpaqueHex(topColor);

  // 💡 iOS/Safari nudge: replace the meta element so the tint actually updates
  useEffect(() => {
    const head = document.head;
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', themeHex);

    // remove any existing theme-color metas first (avoid duplicates)
    document.querySelectorAll('meta[name="theme-color"]').forEach(n => n.remove());
    head.appendChild(meta);

    // one more tick for some builds
    requestAnimationFrame(() => meta.setAttribute('content', themeHex));
  }, [themeHex]);

  // keep your nav gradient behavior (unchanged) ...
  useEffect(() => {
    const apply = () => {
      const navMenu = (document.querySelector('.nav-menu, [data-nav-menu]') as HTMLElement) || null;
      if (!navMenu) return false;
      const rgb = parseToRGB(topColor) || { r: 24, g: 24, b: 26 };
      const { r, g, b } = rgb;
      const isPortrait = window.innerHeight >= window.innerWidth;

      navMenu.style.background = isPortrait
        ? `linear-gradient(to bottom, rgba(${r},${g},${b},.5) 0%, rgba(${r},${g},${b},.3) 20%,
            rgba(${r},${g},${b},.2) 30%, rgba(${r},${g},${b},.1) 60%, transparent 100%)`
        : `linear-gradient(to bottom, rgba(${r},${g},${b},.3) 0%, rgba(${r},${g},${b},.25) 20%,
            rgba(${r},${g},${b},.2) 40%, rgba(${r},${g},${b},.1) 70%, transparent 100%)`;
      return true;
    };

    const ok = apply();
    if (!ok) {
      const id = requestAnimationFrame(apply);
      return () => cancelAnimationFrame(id);
    }
    const onResize = () => apply();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [activeProject, focusedProjectKey, topColor]);

  // Helmet is still fine to keep; it helps Android/Chrome and SSR
  return (
    <Helmet>
      <meta key="theme-color" name="theme-color" content={themeHex} />
    </Helmet>
  );
};

export default ThemeColorUpdater;
