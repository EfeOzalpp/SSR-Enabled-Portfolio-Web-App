// utils/component-loader.ts
import { ComponentType } from 'react';

// Optional mapping if you use it elsewhere
export const componentMap = {
  rotary: () => import('../../components/rotary-lamp.tsx'),
  scoop: () => import('../../components/ice-cream-scoop.tsx'),
  dataviz: () => import('../../components/data-visualization.tsx'),
  game: () => import('../../components/rock-escapade/evade-the-rock.jsx'),
  dynamic: () => import('../../components/dynamic-app.tsx'),
};

export type ProjectKey = keyof typeof componentMap;

export interface ProjectMeta {
  key: ProjectKey;
  title: string;
  isLink?: boolean;
}

export interface Project extends ProjectMeta {
  lazyImport: () => Promise<{ default: ComponentType<any> }>;
}

export const projects: Project[] = [
  {
    key: 'scoop',
    title: 'Ice Cream Scoop',
    lazyImport: () =>
      import(
        /* webpackChunkName: "scoop" */
        '../../components/ice-cream-scoop.tsx'
      ),
  },
  {
    key: 'rotary',
    title: 'Rotary Lamp',
    lazyImport: () =>
      import(
        /* webpackChunkName: "rotary" */
        '../../components/rotary-lamp.tsx'
      ),
  },
  {
    key: 'dataviz',
    title: 'Data Visualization',
    lazyImport: () =>
      import(
        /* webpackChunkName: "dataviz" */
        '../../components/data-visualization.tsx'
      ),
  },
  {
    key: 'game',
    title: 'Evade the Rock',
    lazyImport: () =>
      import(
        /* webpackChunkName: "game" */
        '../../components/rock-escapade/evade-the-rock.jsx'
      ),
  },
  {
    key: 'dynamic',
    title: 'Dynamic App',
    isLink: true,
    lazyImport: () =>
      import(
        /* webpackChunkName: "dynamic" */
        '../../components/dynamic-app.tsx'
      ),
  },
].sort(() => Math.random() - 0.5);
