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

  const [hasLoaded, setHasLoaded] = useState(false);
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const [visibility, setVisibility] = useState(0);
  const delayTimer = useRef<NodeJS.Timeout | null>(null);

  // Observe element and track intersection ratio
  useEffect(() => {
    if (isServer || eager) {
      setVisibility(1);
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      setVisibility(entry.intersectionRatio);
    }, { threshold: Array.from({ length: 11 }, (_, i) => i / 10) });

    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [isServer, eager]);

  // Logic for two-phase loading
  useEffect(() => {
    if (isServer || hasLoaded) return;

    // Phase 2 immediate load if visibility >= 0.3
    if (visibility >= 0.3) {
      load().then((mod) => setComponent(() => mod.default));
      setHasLoaded(true);
      if (delayTimer.current) clearTimeout(delayTimer.current);
      return;
    }

    // Phase 1 → preload after 3s if visibility >= 0.1
    if (visibility >= 0.1 && !delayTimer.current) {
      delayTimer.current = setTimeout(() => {
        if (!hasLoaded && visibility >= 0.1) {
          load().then((mod) => setComponent(() => mod.default));
          setHasLoaded(true);
        }
      }, 3000);
    }

    // Reset if element leaves viewport
    if (visibility < 0.1 && delayTimer.current) {
      clearTimeout(delayTimer.current);
      delayTimer.current = null;
    }

  }, [visibility, hasLoaded, isServer, load]);

  // Render rule
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
