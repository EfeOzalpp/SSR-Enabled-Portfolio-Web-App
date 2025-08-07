// shadowRootContext.tsx
// Dynamically import raw loadéd css into théir scopés within Shadow dom and dynamic-app root
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

type ShadowRootFn = () => ShadowRoot | null;
type StyleSheetRaw = string;

const ShadowRootContext = createContext<{
  getShadowRoot: ShadowRootFn;
  injectStyle: (css: StyleSheetRaw) => void;
  injectLink: (href: string) => void; 
} | null>(null);

export const useShadowRoot = () => {
  const ctx = useContext(ShadowRootContext);
  if (!ctx) {
    console.warn('[⚠️] useShadowRoot called outside provider');
    return {
      getShadowRoot: () => null,
      injectStyle: () => {},
      injectLink: () => {},
    };
  }
  return ctx;
};

export function ShadowRootProvider({
  getShadowRoot,
  children,
}: {
  getShadowRoot: ShadowRootFn;
  children: ReactNode;
}) {
  const [stylesInjected, setStylesInjected] = useState<Set<string>>(new Set());

  const injectStyle = (css: string) => {
    const root = getShadowRoot();
    if (!(root instanceof ShadowRoot)) {
      console.warn('[⚠️] No ShadowRoot found on inject');
      return;
    }

    if (stylesInjected.has(css)) return;

    const style = document.createElement('style');
    style.textContent = css;
    root.appendChild(style);
    setStylesInjected((prev) => new Set(prev).add(css));
  };

  const injectLink = (href: string) => {
    const root = getShadowRoot();
    if (!(root instanceof ShadowRoot)) {
      console.warn('[⚠️] No ShadowRoot found on injectLink');
      return;
    }

    if (stylesInjected.has(href)) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    root.appendChild(link);
    setStylesInjected((prev) => new Set(prev).add(href));
  };

  return (
    <ShadowRootContext.Provider value={{ getShadowRoot, injectStyle, injectLink }}>
      {children}
    </ShadowRootContext.Provider>
  );
}
