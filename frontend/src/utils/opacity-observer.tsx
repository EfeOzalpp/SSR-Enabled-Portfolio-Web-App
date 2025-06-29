/* Opacity Observer */
import { useEffect } from 'react';

const OpacityObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;

        if (ratio >= 0.75) {
          target.style.opacity = '1';
        } else {
          const mappedOpacity = 0.1 + (ratio / 0.75) * (1 - 0.1);
          target.style.opacity = mappedOpacity.toString();
        }
      });
    }, {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    });

    const ids = [
      '#icecream-media-1',
      '#icecream-media-2',
      '#rotary-media-1',
      '#rotary-media-2',
    ];

    const checkAndObserve = () => {
      const targets = ids
        .map(id => document.querySelector(id))
        .filter((el): el is HTMLElement => el !== null);

      if (targets.length < ids.length) {
        // Not all targets exist yet, retry
        requestAnimationFrame(checkAndObserve);
        return;
      }

      targets.forEach(el => {
        observer.observe(el);

        // ✅ Force initial opacity application
        const rect = el.getBoundingClientRect();
        const ratio = Math.min(Math.max(
          (window.innerHeight - rect.top) / window.innerHeight,
          0
        ), 1);

        if (ratio >= 0.75) {
          el.style.opacity = '1';
        } else {
          const mappedOpacity = 0.1 + (ratio / 0.75) * (1 - 0.1);
          el.style.opacity = mappedOpacity.toString();
        }
      });
    };

    checkAndObserve(); // start initial check

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default OpacityObserver;



