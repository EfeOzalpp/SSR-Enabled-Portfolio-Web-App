// src/sections/ScoopEnhancer.tsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SplitDragHandler from '../../utils/split-controller';
import { useTooltipInit } from '../../utils/tooltip/tooltipInit';
import { applySplitStyle } from '../logic/apply-split-style';

export default function ScoopEnhancer() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [split, setSplit] = useState(() => (window.innerWidth < 768 ? 55 : 50));
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useTooltipInit();

  useEffect(() => {
    // Remove SSR preset so JS can control layout without specificity fights
    document.getElementById('scoop-ssr')?.classList.remove('ssr-initial-split');

    // Upgrade images/videos from SSR medium-quality to high-quality (if provided)
    const img1El = document.getElementById('scoop-media-1') as HTMLImageElement | null;
    const img2ImgEl = document.getElementById('scoop-media-2') as HTMLImageElement | null;
    const img2VidEl = document.getElementById('scoop-media-2-video') as HTMLVideoElement | null;

    const full1 = img1El?.dataset?.srcFull;
    const full2 = img2ImgEl?.dataset?.srcFull || img2VidEl?.dataset?.srcFull;

    if (img1El && full1 && img1El.src !== full1) img1El.src = full1;
    if (img2ImgEl && full2 && img2ImgEl.src !== full2) img2ImgEl.src = full2;
    if (img2VidEl && full2 && img2VidEl.poster !== full2) img2VidEl.poster = full2;

    // Set mount host
    setHost(document.getElementById('scoop-enhancer-mount'));

    // Initial apply
    applySplitStyle(split, isPortrait, {
      m1: 'scoop-media-1-container',
      m2: 'scoop-media-2-container',
    });

    // Orientation listener
    const onResize = () => {
      const p = window.innerHeight > window.innerWidth;
      setIsPortrait(p);
      applySplitStyle(split, p, {
        m1: 'scoop-media-1-container',
        m2: 'scoop-media-2-container',
      });
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []); // run once

  // Keep DOM in sync when split OR orientation changes
  useEffect(() => {
    applySplitStyle(split, isPortrait, {
      m1: 'scoop-media-1-container',
      m2: 'scoop-media-2-container',
    });
  }, [split, isPortrait]);

  if (!host) return null;
    return createPortal(
      <SplitDragHandler
        split={split}
        setSplit={setSplit}
        ids={{ m1: 'scoop-media-1-container', m2: 'scoop-media-2-container' }}
      />,
      host
  );
}
