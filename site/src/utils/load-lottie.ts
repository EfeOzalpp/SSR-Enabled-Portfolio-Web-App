// utils/load-lottie.ts
let _promise: Promise<any> | null = null;

// Track the animation bound to each container to prevent double-SVG / leaks
const _byContainer = new WeakMap<Element, any>();

/** One-time preload of the SVG-only build */
export function loadLottie() {
  if (!_promise) {
    _promise = import(
      /* webpackChunkName: "lottie-web" */
      'lottie-web/build/player/lottie_svg' // SVG-only build
    ).then((m) => m.default ?? m);
  }
  return _promise;
}

function destroyFor(container?: Element | null) {
  if (!container) return;
  const prev = _byContainer.get(container);
  try { prev?.destroy?.(); } catch {}
  _byContainer.delete(container);
  // belt & suspenders: ensure old SVG is gone
  try { (container as HTMLElement).innerHTML = ''; } catch {}
}

/** Safer loadAnimation that avoids half renders and duplicate SVGs */
async function loadAnimationSafe(params: any) {
  const mod = await loadLottie();
  const container: Element | undefined = params?.container;

  if (container) destroyFor(container);

  const anim = mod.loadAnimation({
    // Keep your defaults; you can still override in caller
    renderer: 'svg',
    rendererSettings: {
      progressiveLoad: true,
      hideOnTransparent: true,
      viewBoxOnly: true,
      ...(params?.rendererSettings || {}),
    },
    ...params,
  });

  if (container) _byContainer.set(container, anim);

  // First-frame/layout nudge to avoid “half-rendered until remount”
  const onDOMLoaded = () => {
    try { anim.resize?.(); } catch {}
    anim.removeEventListener?.('DOMLoaded', onDOMLoaded as any);
  };
  anim.addEventListener?.('DOMLoaded', onDOMLoaded as any);

  return anim;
}

export function destroyLottieAt(container?: Element | null) {
  destroyFor(container);
}

/** Proxy keeps your existing `lottie.method()` calls working */
const lottie: any = new Proxy(
  {},
  {
    get(_t, prop: string) {
      if (prop === 'loadAnimation') {
        return (params: any) => loadAnimationSafe(params);
      }
      if (prop === 'destroyFor' || prop === 'destroyLottieAt') {
        return destroyLottieAt;
      }
      // Pass-through for everything else once loaded
      return (...args: any[]) =>
        loadLottie().then((mod) => (mod as any)[prop](...args));
    },
  }
);

export default lottie;
