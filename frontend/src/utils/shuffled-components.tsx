// Shuffling the Projects for randomization
import { ReactElement } from 'react';
import RotaryLamp from '../components/rotary-lamp.tsx';
import EnhancedScoop from '../components/ice-cream-scoop.tsx';
import DataVisualization from '../components/data-visualization.tsx';
import ProcessingGame from '../components/rock-escapade/evade-the-rock.jsx';

interface ProjectComponent {
  key: string;
  title: string;
  component: ReactElement;
}

export const getShuffledComponents = (): ProjectComponent[] => {
  const components: ProjectComponent[] = [
    { key: 'rotary', title: 'Rotary Lamp', component: <RotaryLamp key="rotary" /> },
    { key: 'scoop', title: 'Ice Scoop', component: <EnhancedScoop key="scoop" /> },
    { key: 'dataviz', title: 'Data Visualization', component: <DataVisualization key="dataviz" /> },
    { key: 'game', title: 'Evade the Rock', component: <ProcessingGame key="game" /> },
  ];
  return components.sort(() => Math.random() - 0.5);
};

export default getShuffledComponents;
