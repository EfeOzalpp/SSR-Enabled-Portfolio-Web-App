// src/utils/content-utility/component-loader.tsx
import type { ComponentType } from 'react';
import { useSsrData } from '../context-providers/ssr-data-context';

export const componentMap = {
  rotary: () => import('../../components/rotary-lamp'),
  scoop: () => import('../../components/ice-cream-scoop'),
  dataviz: () => import('../../components/data-visualization'),
  game: () => import('../../components/rock-escapade/evade-the-rock.jsx'),
  dynamic: () => import('../../components/dynamic-app'),
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

const toComponent = <T extends ComponentType<any>>(p: Promise<{ default: T }>) =>
  p as unknown as Promise<{ default: ComponentType<any> }>;

export const projects: Project[] = [
  {
    key: 'scoop' as const,
    title: 'Ice Cream Scoop',
    lazyImport: () => toComponent(import('../../components/ice-cream-scoop')),
  },
  {
    key: 'rotary' as const,
    title: 'Rotary Lamp',
    lazyImport: () => toComponent(import('../../components/rotary-lamp')),
  },
  {
    key: 'dataviz' as const,
    title: 'Data Visualization',
    lazyImport: () => toComponent(import('../../components/data-visualization')),
  },
  {
    key: 'game' as const,
    title: 'Evade the Rock',
    lazyImport: () => toComponent(import('../../components/rock-escapade/evade-the-rock.jsx')),
  },
  {
    key: 'dynamic' as const,
    title: 'Dynamic App',
    isLink: true,
    lazyImport: () => toComponent(import('../../components/dynamic-app')),
  },
].sort(() => Math.random() - 0.5);


export function useProjectLoader(key: ProjectKey) {
  const ssrData = useSsrData();
  const project = projects.find(p => p.key === key);
  if (!project) throw new Error(`Unknown project key: ${key}`);

  // If SSR has preloaded content for this project
  if (ssrData?.preloaded?.[key]) {
    return async () => ({
      default: () => {
        // Replace with the actual component renderer
        return <div dangerouslySetInnerHTML={{ __html: ssrData.preloaded[key] }} />;
      }
    });
  }

  // Fallback to lazyImport if no SSR data
  return project.lazyImport;
}
