// opacity observer
export const attachOpacityObserver = (
  ids: string[],
  focusedProjectKey: string | null
) => {
  const isRealMobile = (() => {
    const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    const touch = (navigator as any).maxTouchPoints > 0;
    const vv = (window as any).visualViewport;
    let shrinks = false;

    if (vv) {
      const gap = window.innerHeight - vv.height;
      if (gap > 48) shrinks = true;
      return coarse && touch && (shrinks || gap > 48);
    }
    return coarse && touch;
  })();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;

        if (focusedProjectKey) return;

        const baseMin = isRealMobile ? 0.1 : 0.3;
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

  let observedCount = 0;

  const observeTargets = () => {
    ids.forEach((id) => {
      const el = document.querySelector(id) as HTMLElement | null;
      if (el && !el.dataset._opacity_observed) {
        el.dataset._opacity_observed = 'true';
        observer.observe(el);
        observedCount++;
      }
    });

    if (observedCount >= ids.length) {
      mutationObserver.disconnect();
    }
  };

  const mutationObserver = new MutationObserver(() => observeTargets());

  observeTargets();

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    observer.disconnect();
    mutationObserver.disconnect();
  };
};
