// src/utils/content-utility/lazy-view.tsx
import { useEffect, useRef, useState, Suspense, type ComponentType } from 'react';

type Props = {
  load?: () => Promise<{ default: ComponentType<any> }>; // <- optional now
  fallback?: React.ReactNode;
  serverRender?: React.ReactNode;
  eager?: boolean;
  allowIdle?: boolean;
};

const hasWindow = typeof window !== 'undefined';
const hasRIC = hasWindow && 'requestIdleCallback' in (window as any);
const hasCIC = hasWindow && 'cancelIdleCallback' in (window as any);

const ric = (cb: any, opts?: any) =>
  hasRIC ? (window as any).requestIdleCallback(cb, opts) : setTimeout(cb, opts?.timeout ?? 0);
const cic = (id: any) =>
  hasCIC ? (window as any).cancelIdleCallback(id) : clearTimeout(id);

const LazyInView = ({
  load,
  fallback = null,
  serverRender,
  eager = false,
  allowIdle = false,
}: Props) => {
  const isServer = !hasWindow;

  const [isVisible, setIsVisible] = useState<boolean>(isServer || eager);
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const idleId = useRef<any>(null);

  // IO
  useEffect(() => {
    if (isServer || eager) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        io.disconnect();
        if (idleId.current) {
          cic(idleId.current);
          idleId.current = null;
        }
      }
    }, { threshold: 0.05 });

    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [isServer, eager]);

  // Idle preloading
  useEffect(() => {
    if (isServer || eager || isVisible || !allowIdle) return;
    idleId.current = ric(() => setIsVisible(true), { timeout: 2000 });
    return () => {
      if (idleId.current) {
        cic(idleId.current);
        idleId.current = null;
      }
    };
  }, [isServer, eager, isVisible, allowIdle]);

  // only call load if provided
  useEffect(() => {
    if (isServer) return;
    if (!isVisible || Component || !load) return;

    let cancelled = false;
    load().then((mod) => {
      if (!cancelled) setComponent(() => mod.default);
    });

    return () => { cancelled = true; };
  }, [isServer, isVisible, Component, load]);

  const content = Component
    ? <Suspense fallback={fallback}><Component /></Suspense>
    : (serverRender ?? fallback);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {content}
    </div>
  );
};

export default LazyInView;
