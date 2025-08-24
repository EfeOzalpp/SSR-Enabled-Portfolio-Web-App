// shadowRootContext.tsx
import {
  createContext,
  useContext,
  useRef,
  ReactNode,
} from 'react';

type ShadowRootFn = () => ShadowRoot | null;
type StyleSheetRaw = string;

const supportsConstructed =
  'adoptedStyleSheets' in Document.prototype &&
  'replaceSync' in CSSStyleSheet.prototype;

const ShadowRootContext = createContext<{
  getShadowRoot: ShadowRootFn;
  injectStyle: (css: StyleSheetRaw, id: string) => void;
  injectLink: (href: string, id?: string) => void;
  removeStyle?: (id: string) => void;
} | null>(null);

export const useShadowRoot = () => {
  const ctx = useContext(ShadowRootContext);
  if (!ctx) {
    console.warn('useShadowRoot called outside provider');
    return {
      getShadowRoot: () => null,
      injectStyle: () => {},
      injectLink: () => {},
      removeStyle: () => {},
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
  // Cache Constructed Stylesheets by ID per shadow root provider
  const sheetCacheRef = useRef<Map<string, CSSStyleSheet>>(new Map());

  const injectStyle = (css: string, id: string) => {
    const root = getShadowRoot();
    if (!(root instanceof ShadowRoot)) return;

    if (supportsConstructed) {
      let sheet = sheetCacheRef.current.get(id);
      if (!sheet) {
        sheet = new CSSStyleSheet();
        sheet.replaceSync(css);
        sheetCacheRef.current.set(id, sheet);
      }
      if (!root.adoptedStyleSheets.includes(sheet)) {
        root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
      }
      return;
    }

    // Fallback: DOM-based <style> with ID dedupe
    if (root.querySelector(`style[data-style-id="${id}"]`)) return;
    const style = document.createElement('style');
    style.textContent = css;
    style.dataset.styleId = id;
    root.appendChild(style);
  };

  const injectLink = (href: string, id?: string) => {
    const root = getShadowRoot();
    if (!(root instanceof ShadowRoot)) return;

    // Note: adoptedStyleSheets can't attach external CSS; keep <link> for that.
    if (id && root.querySelector(`link[data-style-id="${id}"]`)) return;
    if (
      !id &&
      Array.from(root.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
        .some(l => l.href === href)
    ) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    if (id) link.dataset.styleId = id;
    root.appendChild(link);
  };

  const removeStyle = (id: string) => {
    const root = getShadowRoot();
    if (!(root instanceof ShadowRoot)) return;

    if (supportsConstructed) {
      const sheet = sheetCacheRef.current.get(id);
      if (sheet) {
        root.adoptedStyleSheets = root.adoptedStyleSheets.filter(s => s !== sheet);
      }
      return;
    }

    root.querySelector(`style[data-style-id="${id}"]`)?.remove();
  };

  return (
    <ShadowRootContext.Provider value={{ getShadowRoot, injectStyle, injectLink, removeStyle }}>
      {children}
    </ShadowRootContext.Provider>
  );
}
