import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../styles/loading-hub.css';

type LoadingHubProps = {
  keyword?: string;
  lines?: string[];
  /** Fixed height so layout doesn’t jump */
  minHeight?: number | string;
  /** Extra className to theme per block */
  className?: string;
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** Optional % if you fake/stream progress */
  progress?: number | null;
  /** Full cycle time per line (ms) */
  cycleMs?: number;
  /** Animation length inside that cycle (ms) */
  animMs?: number;
};

export default function LoadingHub({
  keyword,
  lines = ['Loading…'],
  minHeight = 160,
  className = '',
  ariaLabel = 'Loading',
  progress = null,
  cycleMs = 1400,
  animMs = 900,
}: LoadingHubProps) {
  const [lineIndex, setLineIndex] = useState(0);

  // rotate through provided lines (no-op if only one)
  const hasMultiple = lines.length > 1;
  useEffect(() => {
    if (!hasMultiple) return;
    const t = setInterval(() => {
      setLineIndex((i) => (i + 1) % lines.length);
    }, cycleMs);
    return () => clearInterval(t);
  }, [hasMultiple, lines.length, cycleMs]);

  // Avoid reflow: lock container height
  const style = useMemo<React.CSSProperties>(() => {
    const h = typeof minHeight === 'number' ? `${minHeight}px` : (minHeight ?? 'auto');
    return { minHeight: h };
  }, [minHeight]);

  // SR-only progressive percent
  const srRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (progress == null || !srRef.current) return;
    srRef.current.textContent = `${Math.round(progress)}%`;
  }, [progress]);

  return (
    <div
      className={`loading-hub loading-hub--text ${className || ''}`}
      style={style}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      data-keyword={keyword || undefined}
      // expose anim timing to CSS
      data-anim-ms={animMs}
    >
      <div className="loading-hub__copy" aria-hidden={false}>
        {/* key forces re-mount so the animation restarts */}
        <h2 key={lineIndex} className="loading-hub__line">
          {lines[lineIndex]}
        </h2>

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
