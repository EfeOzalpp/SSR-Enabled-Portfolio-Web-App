// RotaryEnhancer.tsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SplitDragHandler from '../../utils/split-controller';
import { useTooltipInit } from '../../utils/tooltip/tooltipInit';
import { applySplitStyle } from '../logic/apply-split-style';

export default function RotaryEnhancer() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [split, setSplit] = useState(() => (window.innerWidth < 768 ? 55 : 50));
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useTooltipInit();

  useEffect(() => {
    // Remove SSR preset so JS can control layout without specificity fights
    document.getElementById('rotary-ssr')?.classList.remove('ssr-initial-split');

    // Upgrade images from SSR medium-quality to high-quality (if provided)
    // Upgrade images/videos from SSR medium-quality to high-quality (if provided)
    const img1El = document.querySelector('#rotary-ssr #rotary-media-1') as HTMLImageElement | null;
    const img2El = document.querySelector('#rotary-ssr #rotary-media-2') as HTMLVideoElement | null;

    const full1 = img1El?.dataset?.srcFull;
    const full2 = img2El?.dataset?.srcFull;

    if (img1El && full1 && img1El.src !== full1) img1El.src = full1;
    if (img2El && full2 && img2El.src !== full2) img2El.src = full2;

    // Set mount host
    setHost(document.getElementById('rotary-enhancer-mount'));

    // Initial apply to exactly mirror non-SSR logic on hydration
    applySplitStyle(split, isPortrait, {
      m1: 'rotary-media-1-container',
      m2: 'rotary-media-2-container',
    });

    // Orientation listener
    const onResize = () => {
      const p = window.innerHeight > window.innerWidth;
      setIsPortrait(p);
      // Re-apply immediately on orientation change
      applySplitStyle(split, p, {
        m1: 'rotary-media-1-container',
        m2: 'rotary-media-2-container',
      });
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []); // run once

  // Keep DOM in sync when split OR orientation changes
  useEffect(() => {
    applySplitStyle(split, isPortrait, {
      m1: 'rotary-media-1-container',
      m2: 'rotary-media-2-container',
    });
  }, [split, isPortrait]);

  if (!host) return null;
    return createPortal(
      <SplitDragHandler
        split={split}
        setSplit={setSplit}
        ids={{ m1: 'rotary-media-1-container', m2: 'rotary-media-2-container' }}
      />,
      host
  );
}
