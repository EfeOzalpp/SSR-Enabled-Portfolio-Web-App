// utils/LazyInView.tsx
import { useEffect, useRef, useState, Suspense, ComponentType } from 'react';

type LazyInViewProps = {
  load: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
};

const LazyInView = ({ load, fallback = null }: LazyInViewProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only observe once
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !Component) {
      load().then((mod) => setComponent(() => mod.default));
    }
  }, [isVisible, Component, load]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {Component ? <Suspense fallback={fallback}><Component /></Suspense> : fallback}
    </div>
  );
};

export default LazyInView;
