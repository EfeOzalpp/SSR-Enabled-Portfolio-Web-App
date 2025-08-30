// src/utils/project-pane.tsx
import React, { useEffect, useRef, useState } from 'react';
import LazyInView from './content-utility/lazy-in-view';
import LazyViewMount from './content-utility/lazy-view-mount';
import LoadingScreen from './loading/loading';
import { useProjectLoader } from './content-utility/component-loader';
import { useProjectVisibility } from './context-providers/project-context';
import { useSsrData } from './context-providers/ssr-data-context';
import { ssrRegistry } from '../ssr/registry';

/* event-driven details for case study section */
import EventMount from './content-utility/event-mount';

// Map project keys to their detail component loaders
const caseStudyLoaders: Record<string, () => Promise<any>> = {
  rotary: () => import('../components/case-studies/project-case-studies/rock-escapade'),
  // add more as you go:
  // dynamic: () => import('../components/case-studies/project-case-studies/CaseStudyDynamic'),
};

type Props = {
  item: any;
  isFocused: boolean;
  setRef: (el: HTMLDivElement | null) => void;
  isFirst?: boolean;
};

export function ProjectPane({
  item,
  isFocused,
  setRef,
  isFirst = false,
}: Props) {
  const { scrollContainerRef } = useProjectVisibility();
  const load = useProjectLoader(item.key);
  const ssr = useSsrData();
  const payload = ssr?.preloaded?.[item.key];
  const desc = ssrRegistry[item.key];
  const hasSSR = Boolean(payload && desc?.render);

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => { setIsHydrated(true); }, []);

  const serverRender =
    payload && desc?.render ? desc.render((payload as any).data ?? payload) : null;

  const isDynamic = item.key === 'dynamic';
  const isGame = item.key === 'game';
  const usesCustomLoader = isDynamic || isGame;

  const fallbackNode =
    !payload && isHydrated && !usesCustomLoader ? (
      <LoadingScreen isFullScreen={false} />
    ) : null;

  const blockId = `block-${item.key}`;
  const rootRef = useRef<HTMLDivElement | null>(null);

  // --- Delay unmount on unfocus ---
  const EXIT_DELAY_MS = 0;
  const FADE_MS = 0; // keep in sync with <EventMount fadeMs>
  const [activeDelayed, setActiveDelayed] = useState<boolean>(isFocused);
  const exitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isFocused) {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      setActiveDelayed(true);
    } else {
      exitTimerRef.current = window.setTimeout(() => {
        setActiveDelayed(false);
        exitTimerRef.current = null;
      }, EXIT_DELAY_MS);
    }
    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    };
  }, [isFocused]);

  // --- Height reservation during exit fade to prevent layout jump ---
  const [reserveH, setReserveH] = useState<number | null>(null);
  const detailsHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isFocused) {
      const rafId = requestAnimationFrame(() => {
        const h = detailsHostRef.current?.getBoundingClientRect().height ?? 0;
        if (h > 0) setReserveH(h);

        const release = window.setTimeout(() => {
          setReserveH(null);
        }, EXIT_DELAY_MS + FADE_MS + 50);

        const cleanup = () => clearTimeout(release);
        (detailsHostRef as any)._cleanup = cleanup;
      });

      return () => {
        cancelAnimationFrame(rafId);
        (detailsHostRef as any)._cleanup?.();
        (detailsHostRef as any)._cleanup = undefined;
      };
    } else {
      setReserveH(null);
    }
  }, [isFocused]);

  // --- Local opacity control (per-pane observer) ---
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (isFocused || (!isFocused && activeDelayed)) {
      el.style.opacity = '1';
      return;
    }

    const isRealMobile = (() => {
      const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
      const touch = (navigator as any).maxTouchPoints > 0;
      const vv = (window as any).visualViewport;
      if (vv) {
        const gap = window.innerHeight - vv.height;
        return coarse && touch && (gap > 48);
      }
      return coarse && touch;
    })();

    const baseMin = isRealMobile ? 0.1 : 0.3;
    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const ratio = entry.intersectionRatio ?? 0;
          if (ratio >= 0.75) {
            el.style.opacity = '1';
          } else {
            const mapped = baseMin + (ratio / 0.75) * (1 - baseMin);
            el.style.opacity = String(mapped);
          }
        }
      },
      { threshold: thresholds, root: scrollContainerRef?.current ?? null }
    );

    io.observe(el);
    el.style.opacity = '1';

    return () => io.disconnect();
  }, [isFocused, activeDelayed, scrollContainerRef]);

  return (
    <div
      id={blockId}
      ref={(el) => { setRef(el); rootRef.current = el; }}
      className={`project-pane ${isFocused ? 'is-focused' : ''} ${isGame ? 'is-game' : ''}`}
      data-viewport-lock={isGame ? 'true' : undefined}
      data-project-key={item.key}
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        contentVisibility: 'auto' as any,
        contain: 'layout paint style',
        overflow: isFocused ? 'visible' : 'hidden',
      }}
    >
      <div className="project-pane-wrapper">
        {isDynamic ? (
          <>
            <LazyInView
              load={load}
              serverRender={serverRender}
              eager={isFirst}
              allowIdle
            />
            {!hasSSR && (
              <LazyViewMount
                load={() => import('../components/dynamic-app/shadow-entry')}
                mountMode="idle"
                preloadOnIdle
                preloadIdleTimeout={2000}
                preloadOnFirstIO
                observeTargetId={blockId}
                rootMargin="0px"
                placeholderMinHeight={0}
                componentProps={{ blockId }}
              />
            )}
          </>
        ) : isGame ? (
          <LazyInView
            load={load}
            serverRender={serverRender}
            eager={isFirst}
            allowIdle
            observeTargetId={blockId}
            placeholderMinHeight={0}
          />
        ) : (
          <LazyInView
            load={load}
            fallback={fallbackNode}
            serverRender={serverRender}
            eager={isFirst}
            allowIdle={false}
            placeholderMinHeight={0}
          />
        )}
      </div>

      {/* details host: force visible during fade + freeze height to avoid jank */}
      <div
        ref={detailsHostRef}
        style={{
          height: reserveH != null ? `${reserveH}px` : undefined,
          contentVisibility: activeDelayed ? ('visible' as any) : undefined,
          contain: 'paint',
        }}
      >
        {caseStudyLoaders[item.key] && (
          <EventMount
            load={caseStudyLoaders[item.key]}
            active={activeDelayed}
            fallback={<div style={{ height: '100dvh' }} />}
            componentProps={{ title: item.title ?? item.key }}
            fadeMs={FADE_MS}
          />
        )}
      </div>
    </div>
  );
}
