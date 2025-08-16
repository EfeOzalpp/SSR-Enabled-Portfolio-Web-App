import { useEffect, useRef, useState, Suspense, type ComponentType, lazy } from 'react';

type Props = {
  load: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;

  /** Conditional eager: only honored if initial visibility >= eagerThreshold. */
  eager?: boolean;
  /** Visibility ratio required for normal (non-eager) mount. */
  mountThreshold?: number; // default 0.3
  /** Also mount when the page goes idle (timeout 2s). */
  allowIdle?: boolean;
  /** Props to forward into the lazily loaded component. */
  componentProps?: Record<string, any>;
  /** If eager is true, minimum intersection ratio to honor it. */
  eagerThreshold?: number; // default 0.2

  /** Observe this element instead of the placeholder div (e.g., "#block-dynamic"). */
  observeTargetId?: string;
  /** IO rootMargin tweak if you want earlier/later triggers (e.g., '0px 0px -20% 0px'). */
  rootMargin?: string;
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
  eager = false,
  mountThreshold = 0.3,
  allowIdle = true,
  componentProps,
  eagerThreshold = 0.2,
  observeTargetId,
  rootMargin,
}: Props) {
  const isServer = !hasWindow;
  const selfRef = useRef<HTMLDivElement | null>(null);
  const [Comp, setComp] = useState<ComponentType | null>(null);
  const mounted = useRef(false);
  const idleId = useRef<any>(null);
  const initialDecisionMade = useRef(false);

  const mountNow = () => {
    if (mounted.current) return;
    mounted.current = true;
    setComp(() => lazy(load));
  };

  useEffect(() => {
    if (isServer || mounted.current) return;

    // Determine which element to observe
    const el =
      (observeTargetId ? document.getElementById(observeTargetId) : null) ||
      selfRef.current;

    // If we can’t observe anything, fall back to idle (if allowed), else mount immediately
    if (!el) {
      if (allowIdle) {
        idleId.current = ric(() => mountNow(), { timeout: 2000 });
      } else {
        mountNow();
      }
      return () => {
        if (idleId.current) { cic(idleId.current); idleId.current = null; }
      };
    }

    // If IO is absent (very old browsers), fall back similarly
    if (typeof IntersectionObserver === 'undefined') {
      if (allowIdle) {
        idleId.current = ric(() => mountNow(), { timeout: 2000 });
      } else {
        mountNow();
      }
      return () => {
        if (idleId.current) { cic(idleId.current); idleId.current = null; }
      };
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;

        // 1) First decision: conditional eager (only on first callback)
        if (!initialDecisionMade.current) {
          initialDecisionMade.current = true;
          if (eager && ratio >= eagerThreshold) {
            mountNow();
            io.disconnect();
            if (idleId.current) { cic(idleId.current); idleId.current = null; }
            return;
          }
          // else, fall through to normal threshold rule
        }

        // 2) Normal lazy rule
        if (ratio >= mountThreshold) {
          mountNow();
          io.disconnect();
          if (idleId.current) { cic(idleId.current); idleId.current = null; }
        }
      },
      {
        threshold: Array.from(new Set([0, eagerThreshold, mountThreshold])).sort(),
        root: null,
        rootMargin, // optional
      }
    );

    io.observe(el);

    if (allowIdle && !mounted.current) {
      // schedule idle fallback; will be canceled if IO mounts earlier
      idleId.current = ric(() => mountNow(), { timeout: 2000 });
    }

    return () => {
      io.disconnect();
      if (idleId.current) { cic(idleId.current); idleId.current = null; }
    };
  }, [
    isServer,
    eager,
    eagerThreshold,
    mountThreshold,
    allowIdle,
    load,
    observeTargetId,
    rootMargin,
  ]);

  return (
    <div ref={selfRef} style={{ width: '100%', height: '100%' }}>
      {Comp ? (
        <Suspense fallback={fallback}>
          <Comp {...(componentProps || {})} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
