/* Opacity Observer */
import { useEffect } from 'react';

const OpacityObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;

        console.log(`[OpacityObserver] ${target.id} ratio: ${ratio}`);

        if (ratio >= 0.75) {
          console.log(`[OpacityObserver] ${target.id} fully visible, setting opacity to 1`);
          target.style.opacity = '1';
        } else {
          const mappedOpacity = 0.4 + (ratio / 0.75) * (1 - 0.4);
          console.log(`[OpacityObserver] ${target.id} partial visibility, setting opacity to ${mappedOpacity.toFixed(2)}`);
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
      '#block-g'
    ];

    const checkAndObserve = () => {
      const targets = ids
        .map(id => document.querySelector(id))
        .filter((el): el is HTMLElement => el !== null);

      if (targets.length < ids.length) {
        console.log('[OpacityObserver] Not all targets found, retrying...');
        requestAnimationFrame(checkAndObserve);
        return;
      }

      targets.forEach(el => {
        observer.observe(el);
        console.log(`[OpacityObserver] Observing ${el.id}`);

        const rect = el.getBoundingClientRect();
        const ratio = Math.min(Math.max(
          (window.innerHeight - rect.top) / window.innerHeight,
          0
        ), 1);

        console.log(`[OpacityObserver] Initial check for ${el.id}, ratio: ${ratio}`);

        if (ratio >= 0.75) {
          console.log(`[OpacityObserver] Initial set ${el.id} opacity to 1`);
          el.style.opacity = '1';
        } else {
          const mappedOpacity = 0.4 + (ratio / 0.75) * (1 - 0.4);
          console.log(`[OpacityObserver] Initial set ${el.id} opacity to ${mappedOpacity.toFixed(2)}`);
          el.style.opacity = mappedOpacity.toString();
        }
      });
    };

    checkAndObserve(); // start initial check

    return () => {
      observer.disconnect();
      console.log('[OpacityObserver] Disconnected observer');
    };
  }, []);

  return null;
};

export default OpacityObserver;
