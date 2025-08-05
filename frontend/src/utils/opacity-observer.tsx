/* Opacity Observer */
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useProjectVisibility } from './project-context.tsx';

const OpacityObserver = () => {
  const { focusedProjectKey } = useProjectVisibility();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const ratio = entry.intersectionRatio;

          if (focusedProjectKey) return;

          const baseMin = isMobile ? 0.1 : 0.3;
          if (ratio >= 0.75) {
            target.style.opacity = '1';
          } else {
            const mappedOpacity = baseMin + (ratio / 0.75) * (1 - baseMin);
            target.style.opacity = mappedOpacity.toString();
          }
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    const ids = [
      '#icecream-media-1',
      '#icecream-media-2',
      '#rotary-media-1',
      '#rotary-media-2',
      '#block-g',
      '#block-d',
      '#block-a',
      '#block-i'
    ];

    let observedCount = 0;

    const observeTargets = () => {
      ids.forEach((id) => {
        const el = document.querySelector(id) as HTMLElement | null;
        if (el && !el.dataset._opacity_observed) {
          el.style.transition = 'opacity 0.3s ease 0.1s';
          el.dataset._opacity_observed = 'true';
          observer.observe(el);
          observedCount++;
        }
      });

      if (observedCount >= ids.length) {
        mutationObserver.disconnect(); // ✅ Safe now
      }
    };

    // ✅ Declare mutationObserver BEFORE usage
    const mutationObserver = new MutationObserver(() => {
      observeTargets();
    });

    // Initial attempt
    observeTargets();

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [focusedProjectKey]);

  return null;
};

export default OpacityObserver;
