// src/components/dataviz/DataVizEnhancer.tsx
import { useEffect } from 'react';
import { useTooltipInit } from '../../utils/tooltip/tooltipInit';

export default function DataVizEnhancer() {
  useTooltipInit();

  useEffect(() => {
    const vid = document.getElementById('dataviz-media-video') as HTMLVideoElement | null;
    if (!vid) return;

    const cleanupFns: Array<() => void> = [];

    // 1) Upgrade poster to high-res if provided by SSR
    const fullPoster = vid.dataset?.srcFull;
    if (fullPoster && vid.poster !== fullPoster) {
      vid.poster = fullPoster;
    }

    // 2) Load eagerly if needed
    if (vid.readyState === 0) {
      vid.preload = 'auto'; // can also use 'metadata' if lighter load desired
      try { vid.load(); } catch {}
    }

    // 3) Hide poster after first painted frame
    const hidePoster = () => {
      vid.removeAttribute('poster');
    };

    const onPlay = () => {
      const anyV = vid as any;
      if (typeof anyV.requestVideoFrameCallback === 'function') {
        anyV.requestVideoFrameCallback(() => hidePoster());
      } else {
        const onTime = () => {
          if (vid.currentTime > 0 && vid.readyState >= 2) {
            vid.removeEventListener('timeupdate', onTime);
            hidePoster();
          }
        };
        vid.addEventListener('timeupdate', onTime, { once: true });
        cleanupFns.push(() => vid.removeEventListener('timeupdate', onTime));

        // Safety backstop
        const timer = setTimeout(() => {
          vid.removeEventListener('timeupdate', onTime);
          hidePoster();
        }, 1200);
        cleanupFns.push(() => clearTimeout(timer));
      }
    };

    vid.addEventListener('play', onPlay, { once: true });
    cleanupFns.push(() => vid.removeEventListener('play', onPlay));

    // 4) Try autoplay (muted/inline usually works)
    vid.play().catch(() => {
      // If blocked, poster will remain until user interacts
    });

    // 5) Optional: pause when tab hidden
    const onVis = () => { if (document.hidden) vid.pause(); };
    document.addEventListener('visibilitychange', onVis);
    cleanupFns.push(() => document.removeEventListener('visibilitychange', onVis));

    return () => cleanupFns.forEach(fn => fn());
  }, []);

  return null;
}
