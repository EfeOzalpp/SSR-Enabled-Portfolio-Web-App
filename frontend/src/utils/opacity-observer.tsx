/* Opacity Observer */
import { useEffect } from 'react';
import { useProjectVisibility } from './project-context.tsx';

const OpacityObserver = () => {
  const { focusedProjectKey } = useProjectVisibility();

  useEffect(() => {
    const elements: HTMLElement[] = [];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;
        const key = getKeyFromId(el.id);

        // Only run this if not excluded due to focus mode
        if (!focusedProjectKey || key === focusedProjectKey) {
          const visibilityOpacity = ratio >= 0.75
            ? 1
            : 0.3 + (ratio / 0.75) * (1 - 0.3);
          el.dataset.visibilityOpacity = visibilityOpacity.toString();
          applyFinalOpacity(el);
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
        requestAnimationFrame(checkAndObserve);
        return;
      }

      targets.forEach(el => {
        elements.push(el);
        el.style.transition = 'opacity 0.5s ease';
        el.dataset.visibilityOpacity = '1';
        el.dataset.focusOpacity = '1';
        observer.observe(el);
        applyFinalOpacity(el); // apply initial
      });
    };

    checkAndObserve();

    const applyFocusMode = () => {
      elements.forEach(el => {
        const key = getKeyFromId(el.id);
        const isHidden = focusedProjectKey && key !== focusedProjectKey;

        el.dataset.focusOpacity = isHidden ? '0' : '1';
        applyFinalOpacity(el);
      });
    };

    const applyFinalOpacity = (el: HTMLElement) => {
      const v = parseFloat(el.dataset.visibilityOpacity || '1');
      const f = parseFloat(el.dataset.focusOpacity || '1');
      el.style.opacity = (v * f).toString();
    };

    applyFocusMode();

    return () => {
      observer.disconnect();
    };
  }, [focusedProjectKey]);

  const getKeyFromId = (id: string): string | null => {
    if (id.includes('icecream')) return 'scoop';
    if (id.includes('rotary')) return 'rotary';
    if (id.includes('block-g')) return 'game';
    return null;
  };

  return null;
};

export default OpacityObserver;
