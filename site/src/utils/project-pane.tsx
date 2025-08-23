// src/components/ProjectPane.tsx
import React, { useEffect, useState } from 'react';
import LazyInView from './content-utility/lazy-in-view';
import LazyViewMount from './content-utility/lazy-view-mount';
import LoadingScreen from './loading/loading';
import { useProjectLoader } from './content-utility/component-loader';
import { useSsrData } from './context-providers/ssr-data-context';
import { ssrRegistry } from '../ssr/registry';

type Props = {
  item: any;
  viewportHeight: string;
  isFocused: boolean;
  isHidden: boolean;
  setRef: (el: HTMLDivElement | null) => void;
  isFirst?: boolean;
};

export function ProjectPane({
  item, viewportHeight, isFocused, isHidden, setRef, isFirst = false,
}: Props) {
  const load = useProjectLoader(item.key);
  const ssr = useSsrData();
  const payload = ssr?.preloaded?.[item.key];
  const desc = ssrRegistry[item.key];
  const hasSSR = Boolean(payload && desc?.render);

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => { setIsHydrated(true); }, []);

  const serverRender = payload && desc?.render ? desc.render((payload as any).data ?? payload) : null;

  const isDynamic = item.key === 'dynamic';
  const isGame = item.key === 'game';
  const usesCustomLoader = isDynamic || isGame;

  // Generic loader only for non-custom blocks (dynamic/game have their own UX)
  const fallbackNode = (!payload && isHydrated && !usesCustomLoader)
    ? <LoadingScreen isFullScreen={false} />
    : null;

  const blockId = `block-${item.key}`;

  return (
    <div
      id={blockId}
      ref={setRef}
      style={{
        height: isHidden ? '0px' : (isFocused ? 'auto' : viewportHeight),
        overflow: isFocused ? 'visible' : 'hidden',
        scrollSnapAlign: isHidden ? 'none' : 'start',
        opacity: isHidden ? 0 : 1,
        visibility: isHidden ? 'hidden' : 'visible',
        pointerEvents: isHidden ? 'none' : 'auto',
      }}
    >
      <div style={{ minHeight: viewportHeight }}>
        {isDynamic ? (
          <>
            {/* SSR path: useProjectLoader returns Frame + <DynamicEnhancer/>.
                Client-only path: returns just the Frame. */}
            <LazyInView
              load={load}
              // no generic fallback; SSR frame is already visible
              serverRender={serverRender}
              eager={isFirst}
              allowIdle={true}
            />

            {/* If there was no SSR, we must mount the Shadow app ourselves */}
            {!hasSSR && (
              <LazyViewMount
                load={() => import('../components/dynamic-app/shadow-entry')}
                mountMode="idle"
                /* Preload so re-mounts are instant */
                preloadOnIdle
                preloadIdleTimeout={2000}
                preloadOnFirstIO
                /* IO config */
                observeTargetId={blockId}
                rootMargin="0px"
                placeholderMinHeight={360}
                /* No props required; the shadow app finds its overlay */
              />
            )}
          </>
        ) : isGame ? (
          <>
            {/* Game: loader provides SSR shell + GameEnhancer. No generic fallback. */}
            <LazyInView
              load={load}
              serverRender={serverRender}
              eager={isFirst}
              allowIdle={true}
            />
          </>
        ) : (
          <LazyInView
            load={load}
            fallback={fallbackNode}
            serverRender={serverRender}
            eager={isFirst}
            allowIdle={false}
          />
        )}
      </div>
    </div>
  );
}
