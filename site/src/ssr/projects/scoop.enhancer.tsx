// src/ssr/projects/scoop.enhancer.tsx
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
    // Collect all cleanups here so we can add to it anywhere below
    const cleanup: Array<() => void> = [];

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

      // Wait for the FIRST painted frame before removing poster (no black flash)
      const removePoster = () => {
        vid2El.removeAttribute('poster');
      };

      const onPlay = () => {
        const anyV = vid2El as any;
        if (typeof anyV.requestVideoFrameCallback === 'function') {
          anyV.requestVideoFrameCallback(() => removePoster());
        } else {
          const onTime = () => {
            if (vid2El.currentTime > 0 && vid2El.readyState >= 2) {
              vid2El.removeEventListener('timeupdate', onTime);
              removePoster();
            }
          };
          vid2El.addEventListener('timeupdate', onTime, { once: true });
          cleanup.push(() => vid2El.removeEventListener('timeupdate', onTime));

          // Safety backstop
          const timer = setTimeout(() => {
            vid2El.removeEventListener('timeupdate', onTime);
            removePoster();
          }, 1200);
          cleanup.push(() => clearTimeout(timer));
        }
      };

      vid2El.addEventListener('play', onPlay, { once: true });
      cleanup.push(() => vid2El.removeEventListener('play', onPlay));

      // Trigger fetch (eager or metadata is fine here)
      if (vid2El.readyState === 0) {
        vid2El.preload = 'auto';
        try { vid2El.load(); } catch {}
      } else {
        vid2El.preload = 'auto';
      }

      // Try to play (muted/inline should allow autoplay)
      vid2El.play().catch(() => { /* ignored; poster remains until user interacts */ });
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
    cleanup.push(() => window.removeEventListener('resize', onResize));

    return () => {
      for (const fn of cleanup) {
        try { fn(); } catch {}
      }
    };
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
