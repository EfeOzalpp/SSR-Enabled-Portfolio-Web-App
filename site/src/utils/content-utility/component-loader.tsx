// src/utils/content-utility/component-loader.tsx
import React, { type ComponentType } from 'react';
import { useSsrData } from '../context-providers/ssr-data-context';
import { ssrRegistry } from '../../ssr/registry';

export const componentMap = {
  rotary: () => import('../../components/block-type-1/rotary-lamp'),
  scoop: () => import('../../components/block-type-1/ice-cream-scoop'),
  dataviz: () => import('../../components/block-type-1/data-visualization'),
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
  { key: 'scoop',   title: 'Ice Cream Scoop',   lazyImport: () => toComponent(import('../../components/block-type-1/ice-cream-scoop')) },
  { key: 'rotary',  title: 'Rotary Lamp',       lazyImport: () => toComponent(import('../../components/block-type-1/rotary-lamp')) },
  { key: 'dataviz', title: 'Data Visualization',lazyImport: () => toComponent(import('../../components/block-type-1/data-visualization')) },
  { key: 'game',    title: 'Evade the Rock',    lazyImport: () => toComponent(import('../../components/rock-escapade/evade-the-rock.jsx')) },
  { key: 'dynamic', title: 'Dynamic App', isLink: true, lazyImport: () => toComponent(import('../../components/dynamic-app')) },
];

export function useProjectLoader(key: ProjectKey) {
  const ssr = useSsrData();
  const project = baseProjects.find(p => p.key === key);
  if (!project) throw new Error(`Unknown project key: ${key}`);

  const payload = ssr?.preloaded?.[key];
  const desc = ssrRegistry[key];

  // SSR path
  if (payload && desc?.render) {
    const data = payload.data ?? payload;

    // Rotary with enhancer
    if (key === 'rotary') {
      return async () => {
        const Enhancer = (await import('../../ssr/projects/rotary.enhancer')).default;
        return {
          default: () => (
            <>
              {desc.render!(data)}
              <Enhancer />
            </>
          ),
        };
      };
    }

    // Scoop with enhancer
    if (key === 'scoop') {
      return async () => {
        const Enhancer = (await import('../../ssr/projects/scoop.enhancer')).default;
        return {
          default: () => (
            <>
              {desc.render!(data)}
              <Enhancer />
            </>
          ),
        };
      };
    }

    // All other SSR components
    return async () => ({
      default: () => <>{desc.render!(data)}</>,
    });
  }

  // Fallback: client lazy load
  return project.lazyImport;
}
