/* Opacity Observer */
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useProjectVisibility } from './project-context.tsx';

const OpacityObserver = () => {
  const { focusedProjectKey } = useProjectVisibility();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;

        if (focusedProjectKey) return;

        const baseMin = isMobile ? 0.1 : 0.3; // stronger fade on mobile
        if (ratio >= 0.75) {
          target.style.opacity = '1';
        } else {
          const mappedOpacity = baseMin + (ratio / 0.75) * (1 - baseMin);
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
      '#data-visualization-media'
    ];

    const applyFinalOpacity = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const ratio = Math.min(Math.max(
        (window.innerHeight - rect.top) / window.innerHeight,
        0
      ), 1);

      const baseMin = isMobile ? 0.1 : 0.4;
      if (ratio >= 0.75) {
        el.style.opacity = '1';
      } else {
        const mappedOpacity = baseMin + (ratio / 0.75) * (1 - baseMin);
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
        el.style.transition = 'opacity 0.3s ease 0.1s';
        observer.observe(el);
        applyFinalOpacity(el);
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
