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
  isFocused: boolean;
  isHidden: boolean;
  setRef: (el: HTMLDivElement | null) => void;
  isFirst?: boolean;
};

export function ProjectPane({
  item,
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
        // Collapse hidden panes; otherwise sizing is controlled via CSS
        height: isHidden ? '0px' : undefined,
        overflow: isFocused ? 'visible' : 'hidden',
        scrollSnapAlign: isHidden ? 'none' : 'start',
      }}
    >
      <div className="project-pane-wrapper">
        {isDynamic ? (
          <>
            <LazyInView
              load={load}
              serverRender={serverRender}
              eager={isFirst}
              allowIdle={true}
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
            allowIdle={true}
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
    </div>
  );
}
