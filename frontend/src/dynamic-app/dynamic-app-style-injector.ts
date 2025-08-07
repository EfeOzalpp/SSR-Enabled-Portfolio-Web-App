// injéct stylés whéN it isnt in shadow dom
import { useEffect } from 'react';
import { useShadowRoot } from './dynamic-app-context.tsx';

const injected = (() => {
  if (typeof window !== 'undefined') {
    if (!window.__DYNAMIC_STYLE_IDS__) {
      window.__DYNAMIC_STYLE_IDS__ = new Set<string>();
    }
    return window.__DYNAMIC_STYLE_IDS__;
  }
  return new Set<string>(); // fallback, e.g., SSR
})();


export const useStyleInjection = (css: string, id?: string) => {
  const { injectStyle, getShadowRoot } = useShadowRoot?.() || {};

  useEffect(() => {
    const shadowRoot = getShadowRoot?.();
    const isInShadow = shadowRoot && shadowRoot !== document;

    if (isInShadow && injectStyle) {
      injectStyle(css);
    } else {
      // Check if we're inside #dynamic-theme (non-shadow)
      const root = document.getElementById('dynamic-theme');
      const shouldInjectGlobally = !!root;

      if (shouldInjectGlobally && id && !injected.has(id)) {
        const styleEl = document.createElement('style');
        styleEl.textContent = css;
        styleEl.dataset.componentStyle = id;
        document.head.appendChild(styleEl);
        injected.add(id);
      }
    }
  }, [css, injectStyle, getShadowRoot, id]);
};
