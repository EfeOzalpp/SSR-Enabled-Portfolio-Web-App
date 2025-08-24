// src/components/dataviz/DataVizEnhancer.tsx
import { useEffect } from 'react';
import { useTooltipInit } from '../../utils/tooltip/tooltipInit';

export default function DataVizEnhancer() {
  useTooltipInit();

  useEffect(() => {
    const vid = document.getElementById('dataviz-media-video') as HTMLVideoElement | null;
    if (!vid) return;

    // 1) Upgrade poster to high-res if provided by SSR
    const fullPoster = vid.dataset?.srcFull;
    if (fullPoster && vid.poster !== fullPoster) {
      vid.poster = fullPoster;
    }

    // 2) Load only what's needed; let the browser fetch metadata first
    //    (SSR set preload="auto", but we can safely keep it eager here, or use 'metadata')
    if (vid.readyState === 0) {
      vid.preload = 'auto'; // or 'metadata' if you want to be lighter here
      try { vid.load(); } catch {}
    }

    // 3) Keep the poster until the *first painted* frame, not loadeddata.
    const hidePoster = () => {
      // remove poster *after* a real frame is painted to avoid black flash
      vid.removeAttribute('poster');
    };

    const onPlay = () => {
      const anyV = vid as any;
      if (typeof anyV.requestVideoFrameCallback === 'function') {
        anyV.requestVideoFrameCallback(() => hidePoster());
      } else {
        // Fallback: wait until time advances and we have decoded frame(s)
        const onTime = () => {
          if (vid.currentTime > 0 && vid.readyState >= 2) {
            vid.removeEventListener('timeupdate', onTime);
            hidePoster();
          }
        };
        vid.addEventListener('timeupdate', onTime, { once: true });

        // Safety backstop in case timeupdate never fires
        const timer = setTimeout(() => {
          vid.removeEventListener('timeupdate', onTime);
          hidePoster();
        }, 1200);
        // clean backstop on unmount
        cleanupFns.push(() => clearTimeout(timer));
      }
    };

    // 4) Try to autoplay (muted + inline means iOS/Safari will usually allow it)
    const tryPlay = () => {
      vid.play().catch(() => {
        // If browser blocks autoplay, poster will remain until user interacts
        // (which is fine; the first frame hook above will still remove it later)
      });
    };

    // Wire listeners
    vid.addEventListener('play', onPlay, { once: true });

    // Kick playback promptly (you can gate with IO if you want)
    tryPlay();

    // Optional: pause when tab hidden; resume when visible
    const onVis = () => { if (document.hidden) vid.pause(); };
    document.addEventListener('visibilitychange', onVis);

    const cleanupFns: Array<() => void> = [
      () => vid.removeEventListener('play', onPlay),
      () => document.removeEventListener('visibilitychange', onVis),
    ];

    return () => cleanupFns.forEach(fn => fn());
  }, []);

  return null;
}
