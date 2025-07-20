/* Opacity Observer */
import { useEffect } from 'react';
import { useProjectVisibility } from './project-context.tsx';

const OpacityObserver = () => {
  const { focusedProjectKey } = useProjectVisibility();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;

        if (focusedProjectKey) return; // If focused, let another opacity logic handle it

        if (ratio >= 0.75) {
          target.style.opacity = '1';
        } else {
          const mappedOpacity = 0.3 + (ratio / 0.75) * (1 - 0.3);
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
      '#block-g',
    ];

    const applyFinalOpacity = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const ratio = Math.min(Math.max(
        (window.innerHeight - rect.top) / window.innerHeight,
        0
      ), 1);

      if (ratio >= 0.75) {
        el.style.opacity = '1';
      } else {
        const mappedOpacity = 0.4 + (ratio / 0.75) * (1 - 0.4);
        el.style.opacity = mappedOpacity.toString();
      }
    };

    const checkAndObserve = () => {
      const targets = ids
        .map(id => document.querySelector(id))
        .filter((el): el is HTMLElement => el !== null);

      if (targets.length < ids.length) {
        requestAnimationFrame(checkAndObserve);
        return;
      }

      targets.forEach(el => {
        observer.observe(el);
        applyFinalOpacity(el); // ✅ Now safe
      });
    };

    checkAndObserve();

    return () => {
      observer.disconnect();
    };
  }, [focusedProjectKey]);

  return null;
};

export default OpacityObserver;
