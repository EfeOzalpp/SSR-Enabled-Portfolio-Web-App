// utils/component-loader.ts
import { lazy } from 'react';

const componentMap = {
  rotary: lazy(() => import('../../components/rotary-lamp.tsx')),
  scoop: lazy(() => import('../../components/ice-cream-scoop.tsx')),
  dataviz: lazy(() => import('../../components/data-visualization.tsx')),
  game: lazy(() => import('../../components/rock-escapade/evade-the-rock.jsx')),
  dynamic: lazy(() => import('../../components/dynamic-app.tsx')),
};

export interface ProjectMeta {
  key: keyof typeof componentMap;
  title: string;
  isLink?: boolean;
}

const baseMetadata: ProjectMeta[] = [
  { key: 'scoop', title: 'Ice Cream Scoop' },
  { key: 'rotary', title: 'Rotary Lamp' },
  { key: 'dataviz', title: 'Data Visualization' },
  { key: 'game', title: 'Evade the Rock' },
  { key: 'dynamic', title: 'Dynamic App', isLink: true },
];

export const projects = baseMetadata
  .sort(() => Math.random() - 0.5)
  .map(meta => ({
    ...meta,
    Component: componentMap[meta.key],
  }));
