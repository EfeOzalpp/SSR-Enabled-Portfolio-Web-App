// src/utils/project-pane.tsx
import React, { useEffect, useState } from 'react';
import LazyInView from './content-utility/lazy-view';
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

  // ✅ Delay showing any client-only fallback until after hydration
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => { setIsHydrated(true); }, []);

  // Only show a loader (fallback) on the client AFTER hydration and only if we have no SSR payload
  const fallbackNode = !payload && isHydrated ? <LoadingScreen isFullScreen={false} /> : null;

  // If SSR provided payload, render its DOM (same markup server & client)
  const serverRender = payload && desc?.render
    ? desc.render(payload.data ?? payload)
    : null;

  return (
    <div
      id={`block-${item.key}`}
      ref={setRef}
      style={{
        height: isHidden ? '0px' : isFocused ? 'auto' : viewportHeight,
        overflow: isFocused ? 'visible' : 'hidden',
        scrollSnapAlign: isHidden ? 'none' : 'start',
        opacity: isHidden ? 0 : 1,
        visibility: isHidden ? 'hidden' : 'visible',
        pointerEvents: isHidden ? 'none' : 'auto',
        transition: 'opacity .4s ease, visibility .4s ease',
      }}
    >
      <div style={{ minHeight: viewportHeight }}>
        <LazyInView
          load={load}
          fallback={fallbackNode}
          serverRender={serverRender}
          eager={isFirst}
        />
      </div>
    </div>
  );
}
