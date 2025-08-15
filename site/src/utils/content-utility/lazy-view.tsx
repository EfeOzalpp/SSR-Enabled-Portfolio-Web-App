// src/utils/content-utility/lazy-view.tsx
import { useEffect, useRef, useState, Suspense, type ComponentType } from 'react';

type Props = {
  load: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  /** SSR HTML to paint immediately (e.g., img/video). */
  serverRender?: React.ReactNode;
  /** For the first block, start loading immediately on client. */
  eager?: boolean;
};

const LazyInView = ({ load, fallback = null, serverRender, eager = false }: Props) => {
  const isServer = typeof window === 'undefined';

  // Hooks must always run — no early return.
  // Visible on server so SSR HTML shows immediately; on client we can start invisible unless eager.
  const [isVisible, setIsVisible] = useState<boolean>(isServer || eager);
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  // Client-only: observe visibility if not eager
  useEffect(() => {
    if (isServer || eager) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        io.disconnect();
      }
    }, { threshold: 0.05 });

    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [isServer, eager]);

  // Client-only: load component when visible
  useEffect(() => {
    if (isServer) return;
    if (!isVisible || Component) return;

    let cancelled = false;
    load().then((mod) => {
      if (!cancelled) setComponent(() => mod.default);
    });

    return () => { cancelled = true; };
  }, [isServer, isVisible, Component, load]);

  // Render rule:
  // - If component loaded, render it
  // - Else, if SSR provided, keep showing SSR HTML (even after becoming visible) until component replaces it
  // - Else fallback
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