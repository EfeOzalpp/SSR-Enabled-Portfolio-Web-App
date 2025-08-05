import { useEffect } from 'react';

export const useVideoVisibility = (
  videoRef: React.RefObject<HTMLVideoElement> | null,
  containerRef: React.RefObject<HTMLElement> | null,
  threshold = 0.4
) => {
  useEffect(() => {
    // Safeguard early if no refs
    if (!videoRef?.current || !containerRef?.current) return;

    let observer: IntersectionObserver;
    let rafId: number;
    let retryCount = 0;
    const MAX_RETRIES = 30;

    const trySetup = () => {
      const video = videoRef.current;
      const container = containerRef.current;

      if (!video || !container) {
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          rafId = requestAnimationFrame(trySetup);
        }
        return;
      }

      if (!video.src) return;

      video.load();
      video.muted = true;

      observer = new IntersectionObserver(
        ([entry]) => {
          const isVisible = entry.isIntersecting;

          if (isVisible) {
            video.play().catch((err) => {
              console.warn('Autoplay blocked, retrying in 500ms', err);
              setTimeout(() => video.play().catch(() => {}), 500);
            });
          } else {
            video.pause();
          }
        },
        { threshold }
      );

      observer.observe(container);

      const rect = container.getBoundingClientRect();
      const ratio = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);

      if (ratio >= threshold) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    rafId = requestAnimationFrame(trySetup);

    return () => {
      if (observer) observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [videoRef, containerRef, threshold]);
};
