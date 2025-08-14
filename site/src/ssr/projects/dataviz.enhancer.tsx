// DataVizEnhancer.tsx
import { useEffect } from 'react';
import { useTooltipInit } from '../../utils/tooltip/tooltipInit';

export default function DataVizEnhancer() {
  useTooltipInit();

  useEffect(() => {
    // Grab video element
    const vidEl = document.getElementById('dataviz-media-video') as HTMLVideoElement | null;
    const fullSrc = vidEl?.dataset?.srcFull;

    if (vidEl) {
      // Upgrade poster if high quality exists
      if (fullSrc && vidEl.poster !== fullSrc) {
        vidEl.poster = fullSrc;
      }

      // Autoplay once loaded
      const handleLoaded = () => {
        vidEl.removeAttribute('poster');
        setTimeout(() => {
          vidEl.play().catch((err) => {
            console.warn('[DataVizEnhancer] Autoplay failed:', err);
          });
        }, 150);
      };

      vidEl.addEventListener('loadeddata', handleLoaded, { once: true });

      // Preload and trigger fetch
      if (vidEl.readyState === 0) {
        vidEl.preload = 'auto';
        try {
          vidEl.load();
        } catch {
          /* ignore */
        }
      } else {
        vidEl.preload = 'auto';
      }

      return () => {
        vidEl.removeEventListener('loadeddata', handleLoaded);
      };
    }
  }, []);

  return null; // purely functional enhancer
}
