/* Content Observer 1 */
import { useEffect } from 'react';

const GlobalObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;

        if (ratio >= 0.75) {
          target.style.opacity = '1';
        } else {
          const mappedOpacity = 0.4 + (ratio / 0.75) * (1 - 0.4);
          target.style.opacity = mappedOpacity.toString();
        }
      });
    }, {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    });

    // Delay observation to ensure DOM content is fully loaded
    const timeout = setTimeout(() => {
      const ids = [
        '#icecream-media-1',
        '#icecream-media-2',
        '#rotary-media-1',
        '#rotary-media-2',
      ];

      const targets = ids
        .map(id => document.querySelector(id))
        .filter((el): el is HTMLElement => el !== null);

      targets.forEach(el => observer.observe(el));
    }, 100); // adjust delay if needed to guarantee rendering

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return null; // This is just a behavior-only component
};

export default GlobalObserver;
