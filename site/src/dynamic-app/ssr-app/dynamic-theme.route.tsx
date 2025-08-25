import React, { useEffect, useMemo, useRef, useState } from 'react';
import loadable from '@loadable/component';
import { createPortal } from 'react-dom';
import { useSsrData } from '../../utils/context-providers/ssr-data-context';
import { useStyleInjection } from '../../utils/context-providers/style-injector';

import {
  primeDynamicThemeFromSSR as primeFromSSR,
  ensureDynamicThemePreload as ensureDynamicPreload,
} from '../preload-dynamic-app-route';
import { enhanceDynamicThemeSSR } from '../../ssr/dynamic-app/UIcards+sort';
import { colorMapping } from '../../dynamic-app/lib/colorString';
import fetchSVGIcons from '../../dynamic-app/lib/fetchSVGIcons';
import miscCss from '../../styles/dynamic-app/misc.css?raw';

import {
  normalizeIconMap,
  toClientIconMap,
} from '../../dynamic-app/lib/svg-icon-map';
import type { IconLike } from '../../dynamic-app/lib/svg-icon-map';

// client-only chunks
const Navigation = loadable(() => import('../../dynamic-app/components/navigation'), { ssr: false });
const FireworksDisplay = loadable(() => import('../../dynamic-app/components/fireworksDisplay'), { ssr: false });
const Footer = loadable(() => import('../../dynamic-app/components/footer'), { ssr: false });
const TitleDivider = loadable(() => import('../../dynamic-app/components/title'), { ssr: false });
const PauseButton = loadable(() => import('../../dynamic-app/components/pauseButton'), { ssr: false });

// SSR shell (UI cards + sort stub)
const DynamicTheme = loadable(() => import('../../DynamicTheme.jsx'), { ssr: true });

/* ---------- portals ---------- */
function NavigationPortal(props: {
  items: any[];
  arrow1?: string; // customArrowIcon2
  arrow2?: string; // customArrowIcon
  activeColor?: string;
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useStyleInjection(miscCss, 'dynamic-app-style-misc');
  useEffect(() => { setTarget(document.getElementById('dynamic-nav-mount')); }, []);
  if (!target) return null;
  return createPortal(
    <Navigation
      items={props.items}
      customArrowIcon2={props.arrow1}
      customArrowIcon={props.arrow2}
      activeColor={props.activeColor ?? '#FFFFFF'}
      isInShadow={false}
      scrollLockContainer={undefined}
    />,
    target
  );
}

function FireworksPortal(props: {
  items: any[];
  onToggleFireworks?: (fn: (enabled: boolean) => void) => void;
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useEffect(() => { setTarget(document.getElementById('dynamic-fireworks-mount')); }, []);
  if (!target) return null;
  return createPortal(
    <FireworksDisplay
      colorMapping={colorMapping}
      items={props.items}
      activeColor="#FFFFFF"
      lastKnownColor="#FFFFFF"
      onToggleFireworks={props.onToggleFireworks || (() => {})}
    />,
    target
  );
}

function TitlePortal(props: {
  logoSvg?: string;
  movingTextColors?: [string, string, string];
  pauseAnimation?: boolean;
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useEffect(() => { setTarget(document.getElementById('dynamic-title-mount')); }, []);
  if (!target) return null;
  return createPortal(
    <TitleDivider
      svgIcon={props.logoSvg || ''}
      movingTextColors={props.movingTextColors || ['#FFFFFF', '#FFFFFF', '#FFFFFF']}
      pauseAnimation={!!props.pauseAnimation}
    />,
    target
  );
}

function PausePortal(props: { onToggle: (isEnabled: boolean) => void }) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useEffect(() => { setTarget(document.getElementById('dynamic-pause-mount')); }, []);
  if (!target) return null;
  return createPortal(
    <div className="pause-button-wrapper">
      <PauseButton toggleP5Animation={props.onToggle} />
    </div>,
    target
  );
}

function FooterPortal(props: {
  arrow1?: string;         // customArrowIcon2
  linkArrowIcon?: string;  // inline <svg> or <img>
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useEffect(() => { setTarget(document.getElementById('dynamic-footer-mount')); }, []);
  if (!target) return null;
  return createPortal(
    <Footer
      customArrowIcon2={props.arrow1}
      linkArrowIcon={props.linkArrowIcon}
    />,
    target
  );
}

/* ---------- route ---------- */
export default function DynamicThemeRoute() {
  const ssr = useSsrData();
  const preload = ssr?.preloaded?.dynamicTheme;

  // state
  const [items, setItems] = useState<any[]>(Array.isArray(preload?.images) ? preload!.images : []);
  const [icons, setIcons] = useState<Record<string, string>>(normalizeIconMap(preload?.icons || {}));
  const [pauseAnimation, setPauseAnimation] = useState(false);
  const [activeColor, setActiveColor] = useState('#FFFFFF');

  // wire PauseButton ↔ FireworksDisplay
  const fwToggleRef = useRef<((enabled: boolean) => void) | null>(null);
  const handleSetToggleFireworks = (fn: (enabled: boolean) => void) => { fwToggleRef.current = fn; };
  const handlePauseToggle = (isEnabled: boolean) => {
    // isEnabled=true means animations ON → pauseAnimation false
    setPauseAnimation(!isEnabled);
    try { fwToggleRef.current?.(isEnabled); } catch {}
  };

  // hydrate from SSR payload
  useEffect(() => { if (preload) primeFromSSR(preload); }, [preload]);

  // prime from window bootstrap if present
  useEffect(() => {
    const w = typeof window !== 'undefined' ? (window as any) : null;
    const boot = w?.__DYNAMIC_THEME_PRELOAD__;
    if (boot) {
      if (Array.isArray(boot.images)) setItems(boot.images);
      if (boot.icons) setIcons(normalizeIconMap(boot.icons));
      primeFromSSR(boot);
    }
  }, []);

  // client-only ensure (no reseed)
  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const cache = await ensureDynamicPreload();
        if (!dead && cache) {
          if (!items.length && Array.isArray(cache.images)) setItems(cache.images);
          if (!Object.keys(icons).length && cache.icons) setIcons(normalizeIconMap(cache.icons));
        }
      } catch {}
    })();
    return () => { dead = true; };
  }, []); // once

  // FINAL FALLBACK: fetch icons on client if still missing
  useEffect(() => {
    let dead = false;
    (async () => {
      if (icons && (icons['arrow1'] || icons['arrow2'] || icons['link-icon'] || icons['logo-small-1'])) return;
      try {
        const raw = (await fetchSVGIcons().catch(() => [])) as IconLike[];
        if (!dead && Array.isArray(raw)) {
          const map = toClientIconMap(raw);
          if (Object.keys(map).length) setIcons(prev => ({ ...map, ...prev }));
        }
      } catch {}
    })();
    return () => { dead = true; };
  }, [icons]);

  // enhance SSR snapshot (HQ image upgrade + DOM-driven SortBy + color from order)
  useEffect(() => {
    if (typeof window !== 'undefined')
      enhanceDynamicThemeSSR({
        onColorChange: (alt, colors) => {
          if (Array.isArray(colors) && colors[2]) setActiveColor(colors[2]);
        },
      });
  }, []);

  // props for portals
  const propsMemo = useMemo(() => ({
    items,
    arrow1: icons['arrow1'] || '',            // Navigation.customArrowIcon2 + Footer.customArrowIcon2
    arrow2: icons['arrow2'] || '',            // Navigation.customArrowIcon
    linkArrowIcon: icons['link-icon'] || '',  // Footer.linkArrowIcon
    logoSmall: icons['logo-small-1'] || '',   // TitleDivider.svgIcon
  }), [items, icons]);

  return (
    <>
      <DynamicTheme />

      <NavigationPortal
        items={propsMemo.items}
        arrow1={propsMemo.arrow1}
        arrow2={propsMemo.arrow2}
        activeColor={activeColor}
      />

      <FireworksPortal
        items={propsMemo.items}
        onToggleFireworks={handleSetToggleFireworks}
      />

      <TitlePortal
        logoSvg={propsMemo.logoSmall}
        movingTextColors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
        pauseAnimation={pauseAnimation}
      />

      <PausePortal onToggle={handlePauseToggle} />

      <FooterPortal
        arrow1={propsMemo.arrow1}
        linkArrowIcon={propsMemo.linkArrowIcon}
      />
    </>
  );
}
