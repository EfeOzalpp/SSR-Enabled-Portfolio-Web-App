// src/utils/project-pane.tsx
import React from 'react';
import LazyInView from './content-utility/lazy-view';
import LoadingScreen from './content-utility/loading';
import { useProjectLoader } from './content-utility/component-loader';
import type { Project } from './content-utility/component-loader';

type Props = {
  item: Project;
  viewportHeight: string;
  isFocused: boolean;
  isHidden: boolean;
  setRef: (el: HTMLDivElement | null) => void;
};

export function ProjectPane({
  item,
  viewportHeight,
  isFocused,
  isHidden,
  setRef,
}: Props) {
  const load = useProjectLoader(item.key);

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
        transition: 'opacity 0.4s ease, visibility 0.4s ease',
      }}
    >
      <div style={{ minHeight: viewportHeight }}>
        <LazyInView load={load} fallback={<LoadingScreen isFullScreen={false} />} />
        {isFocused && item.title === 'Evade the Rock' && null}
      </div>
    </div>
  );
}
