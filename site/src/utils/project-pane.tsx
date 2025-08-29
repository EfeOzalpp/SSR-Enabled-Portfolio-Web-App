import React, { useEffect, useRef, useState } from 'react';
import LazyInView from './content-utility/lazy-in-view';
import LazyViewMount from './content-utility/lazy-view-mount';
import LoadingScreen from './loading/loading';
import { useProjectLoader } from './content-utility/component-loader';
import { useSsrData } from './context-providers/ssr-data-context';
import { ssrRegistry } from '../ssr/registry';

/* event-driven details for case study section */
import EventMount from './content-utility/event-mount';
import { loadFocusedDetails } from '../components/case-studies/load-focused-details';

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

  // --- NEW: delay unmount of focused details on unfocus ---
  const EXIT_DELAY_MS = 500; // tweak as you like
  const [activeDelayed, setActiveDelayed] = useState<boolean>(isFocused);
  const exitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // when focused: cancel any pending turn-off and show immediately
    if (isFocused) {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      setActiveDelayed(true);
    } else {
      // when unfocusing: wait a bit before turning details off
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

  // intrinsic size hint to keep content-visibility stable
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      const h = el.offsetHeight || 0;
      el.style.setProperty('--cis-block', `${Math.max(400, h)}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (isFocused) { loadFocusedDetails(); }
  }, [isFocused]);

  return (
    <div
      id={blockId}
      ref={(el) => { setRef(el); rootRef.current = el; }}
      className={`project-pane ${isFocused ? 'is-focused' : ''}`}
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        contentVisibility: 'auto' as any,
        containIntrinsicSize: 'var(--cis-block, 600px)',
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

      {/* optional: details under focused pane */}
      <EventMount
        load={loadFocusedDetails}
        active={activeDelayed}                 
        fallback={<div style={{ height: '100dvh' }} />}
        componentProps={{ title: item.title ?? item.key }}
        fadeMs={400}
      />
    </div>
  );
}
