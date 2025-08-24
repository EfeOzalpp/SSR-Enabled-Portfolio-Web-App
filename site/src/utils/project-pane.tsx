// src/utils/project-pane.tsx
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
  item,
  viewportHeight,
  isFocused,
  isHidden,
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

  // Generic loader for non-custom blocks
  const fallbackNode =
    !payload && isHydrated && !usesCustomLoader ? (
      <LoadingScreen isFullScreen={false} />
    ) : null;

  const blockId = `block-${item.key}`;

  return (
    <div
      id={blockId}
      ref={setRef}
      style={{
        height: isHidden ? '0px' : (isFocused ? 'auto' : viewportHeight),
        overflow: isFocused ? 'visible' : 'hidden',
        scrollSnapAlign: isHidden ? 'none' : 'start',
      }}
    >
      <div style={{ minHeight: viewportHeight }}>
        {isDynamic ? (
          <>
            {/* 1) Frame (SSR path returns Frame+Enhancer; client-only returns Frame) */}
            <LazyInView
              load={load}
              serverRender={serverRender}
              eager={isFirst}
              allowIdle={true}
            />

            {/* 2) Client-only: mount Shadow app (SSR already has the enhancer) */}
            {!hasSSR && (
              <LazyViewMount
                load={() => import('../components/dynamic-app/shadow-entry')}
                mountMode="idle"
                preloadOnIdle
                preloadIdleTimeout={2000}
                preloadOnFirstIO
                observeTargetId={blockId}
                rootMargin="0px"
                placeholderMinHeight={360}
                componentProps={{ blockId }}
              />
            )}
          </>
        ) : isGame ? (
          <LazyInView
            load={load}
            serverRender={serverRender}
            eager={isFirst}
            allowIdle={true}
            observeTargetId={blockId}
            placeholderMinHeight={360}
          />
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
