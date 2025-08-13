// src/utils/content-utility/component-loader.tsx
import React, { type ComponentType } from 'react';
import { useSsrData } from '../context-providers/ssr-data-context';
import { ssrRegistry } from '../../ssr/registry';

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

// stable base list
export const baseProjects: Project[] = [
  { key: 'scoop',   title: 'Ice Cream Scoop',   lazyImport: () => toComponent(import('../../components/ice-cream-scoop')) },
  { key: 'rotary',  title: 'Rotary Lamp',       lazyImport: () => toComponent(import('../../components/rotary-lamp')) },
  { key: 'dataviz', title: 'Data Visualization',lazyImport: () => toComponent(import('../../components/data-visualization')) },
  { key: 'game',    title: 'Evade the Rock',    lazyImport: () => toComponent(import('../../components/rock-escapade/evade-the-rock.jsx')) },
  { key: 'dynamic', title: 'Dynamic App', isLink: true, lazyImport: () => toComponent(import('../../components/dynamic-app')) },
];

export function useProjectLoader(key: ProjectKey) {
  const ssr = useSsrData();
  const project = baseProjects.find(p => p.key === key);
  if (!project) throw new Error(`Unknown project key: ${key}`);

  const payload = ssr?.preloaded?.[key];
  const desc = ssrRegistry[key];

  // inside useProjectLoader
  if (payload && desc?.render) {
    const data = payload.data ?? payload;

    // rotary gets the enhancer
    if (key === 'rotary') {
      return async () => {
        const Enhancer = (await import('../../ssr/projects/rotary.enhancer')).default;
        return {
          default: () => (
            <>
              {/* SSR markup already contains #rotary-enhancer-mount */}
              {desc.render!(data)}
              <Enhancer />
            </>
          ),
        };
      };
    }

    // all other SSR components render normally
    return async () => ({
      default: () => <>{desc.render!(data)}</>,
    });
  }

  // Fallback: lazy load real component on the client
  return project.lazyImport;
}
