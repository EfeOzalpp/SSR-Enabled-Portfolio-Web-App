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

  const fallbackNode = !payload && isHydrated ? <LoadingScreen isFullScreen={false} /> : null;
  const serverRender = payload && desc?.render ? desc.render(payload.data ?? payload) : null;

  const isDynamic = item.key === 'dynamic';
  const isGame = item.key === 'game';
  const blockId = `block-${item.key}`;

  return (
    <div
      id={blockId}
      ref={setRef}
      style={{
        height: isHidden ? '0px' : isFocused ? 'auto' : viewportHeight,
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
            {/* Frame */}
            <LazyInView
              load={load}
              fallback={fallbackNode}
              serverRender={hasSSR ? null : serverRender}
              eager={isFirst}
              allowIdle={true}
            />

            {/* Shadow only on client path */}
            {!hasSSR && (
              <LazyViewMount
                load={() => import('../components/dynamic-app/shadow-entry')}
                fallback={null}
                mountMode="idle" // no IO mount - unmount
                
                /* Mount/Unmount hysteresis */
                enterThreshold={0.2}
                exitThreshold={0.05}
                unmountDelayMs={150}

                /* Preload chunk early so re-mounts are instant (but don't render yet) */
                preloadOnIdle
                preloadIdleTimeout={2000}
                preloadOnFirstIO

                /* IO config */
                observeTargetId={blockId}   // or remove to observe the placeholder itself
                rootMargin="0px"
                placeholderMinHeight={360}

                componentProps={{ blockId }}
              />
            )}
          </>
        ) : isGame ? (
          <>
            {/* Stage 1: Host shell (BlockGHost) */}
            <LazyInView
              load={load} // BlockGHost
              fallback={fallbackNode}
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
