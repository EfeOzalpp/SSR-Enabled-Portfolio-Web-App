// injéct stylés whéN it isnt in shadow dom
import { useEffect } from 'react';
import { useShadowRoot } from './shadow-root-context.tsx';

const injected = (() => {
  if (typeof window !== 'undefined') {
    if (!window.__DYNAMIC_STYLE_IDS__) {
      window.__DYNAMIC_STYLE_IDS__ = new Set<string>();
    }
    return window.__DYNAMIC_STYLE_IDS__;
  }
  return new Set<string>(); // fallback, e.g., SSR
})();

export const useStyleInjection = (css: string, id: string) => {
  const { injectStyle, getShadowRoot } = useShadowRoot() || {};

  useEffect(() => {
    if (!id) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('useStyleInjection: id is required for dedupe');
      }
      return;
    }

    const shadowRoot = getShadowRoot?.();
    const isInShadow = shadowRoot && shadowRoot !== document;

    if (isInShadow && injectStyle) {
      // Shadow DOM dedupe by ID
      if (!shadowRoot.querySelector(`style[data-style-id="${id}"]`)) {
        injectStyle(css, id); // provider handles DOM append
      }
    } else {
      // Global dedupe by ID
      if (!document.head.querySelector(`style[data-style-id="${id}"]`)) {
        const styleEl = document.createElement('style');
        styleEl.textContent = css;
        styleEl.dataset.styleId = id;
        document.head.appendChild(styleEl);
      }
    }
  }, [css, id, injectStyle, getShadowRoot]);
};

