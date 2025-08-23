// src/utils/content-utility/lazy-view-mount.tsx
import { useEffect, useRef, useState, Suspense, type ComponentType, lazy } from 'react';

type MountMode = 'io' | 'idle' | 'immediate';

type Props = {
  load: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;

  /** Mount strategy: via IntersectionObserver ('io'), after idle ('idle'), or immediately ('immediate') */
  mountMode?: MountMode;            // default 'io'

  /** IO (only used when mountMode === 'io') */
  enterThreshold?: number;          // default 0.2
  exitThreshold?: number;           // default 0.05
  unmountDelayMs?: number;          // default 150
  root?: Element | null;            // default null (viewport)
  rootMargin?: string;              // default '0px'
  observeTargetId?: string;         // default: observe our own placeholder

  /** Preloading */
  preloadOnIdle?: boolean;          // default true (safe even when mountMode!=='io')
  preloadIdleTimeout?: number;      // default 2000
  preloadOnFirstIO?: boolean;       // default true (only matters in 'io' mode)

  /** Layout/UX */
  placeholderMinHeight?: number;    // default 360
  fadeMs?: number;                  // default 600
  fadeEasing?: string;              // default 'ease'

  /** Forwarded props to the lazy component */
  componentProps?: Record<string, any>;
};

const hasWindow = typeof window !== 'undefined';
const hasRIC = hasWindow && 'requestIdleCallback' in (window as any);
const hasCIC = hasWindow && 'cancelIdleCallback' in (window as any);
const ric = (cb: any, opts?: any) =>
  hasRIC ? (window as any).requestIdleCallback(cb, opts) : setTimeout(cb, opts?.timeout ?? 0);
const cic = (id: any) =>
  hasCIC ? (window as any).cancelIdleCallback(id) : clearTimeout(id);

export default function LazyViewMount({
  load,
  fallback = null,

  // strategy
  mountMode = 'io',

  // IO-only
  enterThreshold = 0.2,
  exitThreshold = 0.05,
  unmountDelayMs = 150,
  root = null,
  rootMargin = '0px',
  observeTargetId,

  // preload
  preloadOnIdle = true,
  preloadIdleTimeout = 2000,
  preloadOnFirstIO = true,

  // layout/UX
  placeholderMinHeight = 360,
  fadeMs = 300,
  fadeEasing = 'ease',

  componentProps,
}: Props) {
  const isServer = !hasWindow;

  const selfRef = useRef<HTMLDivElement | null>(null);
  const [Comp, setComp] = useState<ComponentType | null>(null);

  // mounted vs visible (for fade)
  const mountedRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const unmountDebounceRef = useRef<number | null>(null);
  const fadeOutTimerRef = useRef<number | null>(null);
  const firstIOSeen = useRef(false);

  // preload cache
  const preloadPromiseRef = useRef<Promise<{ default: ComponentType<any> }> | null>(null);
  const idleId = useRef<any>(null);

  const ensurePreloaded = () => {
    if (!preloadPromiseRef.current) {
      preloadPromiseRef.current = load();
    }
    return preloadPromiseRef.current;
  };

  const clearUnmountTimers = () => {
    if (unmountDebounceRef.current != null) {
      window.clearTimeout(unmountDebounceRef.current);
      unmountDebounceRef.current = null;
    }
    if (fadeOutTimerRef.current != null) {
      window.clearTimeout(fadeOutTimerRef.current);
      fadeOutTimerRef.current = null;
    }
  };

  const mountNow = () => {
    if (mountedRef.current) {
      if (!isVisible) setIsVisible(true);
      return;
    }
    mountedRef.current = true;
    const promise = ensurePreloaded();
    setComp(prev => prev ?? (lazy(() => promise) as unknown as ComponentType));
    setIsMounted(true);
    requestAnimationFrame(() => setIsVisible(true));
  };

  const scheduleUnmount = () => {
    if (!mountedRef.current) return;
    clearUnmountTimers();
    unmountDebounceRef.current = window.setTimeout(() => {
      setIsVisible(false);
      fadeOutTimerRef.current = window.setTimeout(() => {
        setIsMounted(false);
        mountedRef.current = false;
      }, fadeMs);
    }, unmountDelayMs);
  };

  /* Preload on idle (works for all modes) */
  useEffect(() => {
    if (isServer || !preloadOnIdle) return;
    if (idleId.current) cic(idleId.current);
    idleId.current = ric(() => ensurePreloaded(), { timeout: preloadIdleTimeout });
    return () => { if (idleId.current) { cic(idleId.current); idleId.current = null; } };
  }, [isServer, preloadOnIdle, preloadIdleTimeout, load]);

  /* Mount behavior per mode */
  useEffect(() => {
    if (isServer) return;

    if (mountMode === 'immediate') {
      // mount as soon as possible
      mountNow();
      return;
    }

    if (mountMode === 'idle') {
      // after idle (or immediately if idle already passed)
      let cancel = ric(() => mountNow(), { timeout: preloadIdleTimeout });
      return () => { if (cancel) cic(cancel); };
    }

    // mountMode === 'io'
    const el =
      (observeTargetId ? document.getElementById(observeTargetId) : null) ||
      selfRef.current;

    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      mountNow();
      return;
    }

  // --- replace the IntersectionObserver callback in lazy-view-mount.tsx ---
  const thresholds = Array.from(new Set([0, exitThreshold, enterThreshold])).sort((a, b) => a - b);

  const io = new IntersectionObserver(
    ([entry]) => {
      const ratio = entry.intersectionRatio || 0;
      const visible = !!entry.isIntersecting;

      // First IO seen → optional preload
      if (!firstIOSeen.current) {
        firstIOSeen.current = true;
        if (preloadOnFirstIO) ensurePreloaded();
      }

      // Fast-path: on any (re)intersection, mount immediately if not mounted
      if (visible && !mountedRef.current) {
        clearUnmountTimers();
        mountNow();
        return;
      }

      // Normal hysteresis:
      // - If we've reached the "enter" threshold, keep/make visible
      if (ratio >= enterThreshold) {
        clearUnmountTimers();
        if (!mountedRef.current) mountNow();
        return;
      }

      // - If we've dropped below exit threshold OR not intersecting at all, schedule unmount
      if (!visible || ratio <= exitThreshold) {
        scheduleUnmount();
      }
    },
    { root, rootMargin, threshold: thresholds }
  );

    io.observe(el);
    return () => { io.disconnect(); clearUnmountTimers(); };
  }, [
    isServer,
    mountMode,
    root,
    rootMargin,
    enterThreshold,
    exitThreshold,
    observeTargetId,
    load,
    fadeMs,
    unmountDelayMs,
    preloadIdleTimeout,
    preloadOnFirstIO,
  ]);

  const CompAny = Comp as any;

  return (
    <div
      ref={selfRef}
      style={{ width: '100%', minHeight: placeholderMinHeight, position: 'relative' }}
    >
      {isMounted && CompAny ? (
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity ${fadeMs}ms ${fadeEasing}`,
            willChange: 'opacity',
          }}
        >
          <Suspense fallback={fallback}>
            <CompAny {...(componentProps || {})} />
          </Suspense>
        </div>
      ) : (
        fallback
      )}
    </div>
  );
}
