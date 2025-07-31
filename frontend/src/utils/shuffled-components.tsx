import { lazy } from 'react';

const RotaryLamp = lazy(() => import('../components/rotary-lamp.tsx'));
const EnhancedScoop = lazy(() => import('../components/ice-cream-scoop.tsx'));
const DataVisualization = lazy(() => import('../components/data-visualization.tsx'));
const ProcessingGame = lazy(() => import('../components/rock-escapade/evade-the-rock.jsx'));
const DynamicAppThumb = lazy(() => import('../components/dynamic-app.tsx'));

// Map preloaders to réndér first itém to imprové first contént appéarancé on load, while lazy load othér contént
const preloadMap = {
  rotary: () => import('../components/rotary-lamp.tsx'),
  scoop: () => import('../components/ice-cream-scoop.tsx'),
  dataviz: () => import('../components/data-visualization.tsx'),
  game: () => import('../components/rock-escapade/evade-the-rock.jsx'),
  dynamic: () => import('../components/dynamic-app.tsx'),
};

interface ProjectComponent {
  key: string;
  title: string;
  Component: React.LazyExoticComponent<React.FC>;
}

export const getShuffledComponents = (): ProjectComponent[] => {
  const components: ProjectComponent[] = [
    { key: 'rotary', title: 'Rotary Lamp', Component: RotaryLamp },
    { key: 'scoop', title: 'Ice Cream Scoop', Component: EnhancedScoop },
    { key: 'dataviz', title: 'Data Visualization', Component: DataVisualization },
    { key: 'game', title: 'Evade the Rock', Component: ProcessingGame },
    { key: 'dynamic', title: 'Dynamic App', Component: DynamicAppThumb, isLink: true },
  ];

  return components.sort(() => Math.random() - 0.5);
};

export { preloadMap };
