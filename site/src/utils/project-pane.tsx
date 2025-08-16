// src/components/ProjectPane.tsx (or wherever yours lives)
import React, { useEffect, useState } from 'react';
import LazyInView from './content-utility/lazy-in-view';
import LazyViewMount from './content-utility/lazy-view-mount';
import LoadingScreen from './content-utility/loading';
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
  // Only used for non-dynamic or no-SSR path
  const serverRender = payload && desc?.render ? desc.render(payload.data ?? payload) : null;

  const isDynamic = item.key === 'dynamic';
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
            {/* Frame: SSR-aware hydrator */}
            <LazyInView
              load={load}
              fallback={fallbackNode}
              serverRender={hasSSR ? null : serverRender} // avoid duplicate SSR HTML when load already renders it
              eager={isFirst}
              allowIdle={true}
            />

            {/* Shadow app: only when NO SSR (client-only path). If SSR exists, enhancer attaches it. */}
            {!hasSSR && (
              <LazyViewMount
                load={() => import('../components/dynamic-app/shadow-entry')}
                fallback={null}
                eager={false}
                eagerThreshold={0.2}
                mountThreshold={0.3}
                allowIdle={true}
                observeTargetId={blockId}
                rootMargin="0px 0px -15% 0px"
                componentProps={{ blockId }}
              />
            )}
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
