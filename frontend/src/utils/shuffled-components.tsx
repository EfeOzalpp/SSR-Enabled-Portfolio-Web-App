import { useEffect, useState, ReactElement } from 'react';
import RotaryLamp from '../components/rotary-lamp.tsx';
import EnhancedScoop from '../components/ice-cream-scoop.tsx';

export const getShuffledComponents = () => {
  return [
    <RotaryLamp key="rotary" />,
    <EnhancedScoop key="scoop" />
  ].sort(() => Math.random() - 0.5);
};

const ShuffledComponents = () => {
  const components = getShuffledComponents();
  return <>{components}</>;
};

export default ShuffledComponents;
