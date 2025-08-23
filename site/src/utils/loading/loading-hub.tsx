// src/utils/content-utility/loading-hub.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';

import '../../styles/loading-hub.css';

type LoadingHubProps = {
  /** Optional semantic key for data-attrs / A/B testing */
  keyword?: string;
  /** Inline copy you control per block */
  lines?: string[];
  /** Optional fixed min-height so layout doesn’t jump */
  minHeight?: number | string;
  /** Optional compact size token */
  size?: 'sm' | 'md' | 'lg';
  /** Extra className (e.g. "--rotary" to theme per block) */
  className?: string;
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** If you want to show a % as you fake/stream progress */
  progress?: number | null;
};

const SIZES: Record<NonNullable<LoadingHubProps['size']>, number> = {
  sm: 28,
  md: 42,
  lg: 64,
};

export default function LoadingHub({
  keyword,
  lines = ['Loading…'],
  minHeight = 280,
  size = 'md',
  className = '',
  ariaLabel = 'Loading',
  progress = null,
}: LoadingHubProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const spinSize = SIZES[size];

  // rotate through provided lines every ~1.4s (no-op if only one line)
  const hasMultiple = lines.length > 1;
  useEffect(() => {
    if (!hasMultiple) return;
    const t = setInterval(() => {
      setLineIndex((i) => (i + 1) % lines.length);
    }, 1400);
    return () => clearInterval(t);
  }, [hasMultiple, lines.length]);

  // Avoid reflow: lock container height
  const style = useMemo<React.CSSProperties>(() => {
    const h =
      typeof minHeight === 'number' ? `${minHeight}px` : (minHeight ?? 'auto');
    return { minHeight: h };
  }, [minHeight]);

  // Progressive percent label for SR
  const srRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (progress == null || !srRef.current) return;
    srRef.current.textContent = `${Math.round(progress)}%`;
  }, [progress]);

  return (
    <div
      className={`loading-hub ${className || ''}`}
      style={style}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      data-keyword={keyword || undefined}
    >
      <div className="loading-hub__spinner" style={{ width: spinSize, height: spinSize }} />
      <div className="loading-hub__copy">
        <p className="loading-hub__line">{lines[lineIndex]}</p>
        {progress != null && (
          <div className="loading-hub__progress" aria-hidden="true">
            {Math.round(progress)}%
          </div>
        )}
        {/* SR-only percent, updates without layout */}
        <span className="sr-only" ref={srRef} />
      </div>
    </div>
  );
}
