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
    const img1El = document.querySelector('#scoop-ssr #icecream-media-1') as HTMLImageElement | null;
    const vid2El = document.querySelector('#scoop-ssr #icecream-media-2') as HTMLVideoElement | null;

    const full1 = img1El?.dataset?.srcFull;
    const full2 = vid2El?.dataset?.srcFull;

    // Upgrade LEFT media (image)
    if (img1El && full1 && img1El.src !== full1) {
      img1El.src = full1;
    }

    // Upgrade RIGHT media (video)
    if (vid2El) {
      // If high-quality poster exists, upgrade it before load
      if (full2 && vid2El.poster !== full2) {
        vid2El.poster = full2;
      }

      // When video has enough data to play, remove poster & play
      const handleLoaded = () => {
        vid2El.removeAttribute('poster');
        setTimeout(() => {
          vid2El.play().catch((err) => {
            console.warn('Autoplay failed:', err);
          });
        }, 150); // delay for smoother visual transition
      };
      vid2El.addEventListener('loadeddata', handleLoaded, { once: true });

      // Trigger video fetching only if not already loaded/playing
      if (vid2El.readyState === 0) {
        vid2El.preload = 'auto';
        try {
          vid2El.load();
        } catch {
          /* ignore */
        }
      } else {
        vid2El.preload = 'auto';
      }
    }

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
