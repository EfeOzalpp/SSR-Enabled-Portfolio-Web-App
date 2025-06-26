import { useEffect, useState, ReactElement } from 'react';
import RotaryLamp from '../components/rotary-lamp.tsx';
import EnhancedScoop from '../components/ice-cream-scoop.tsx';

const ShuffledProjects = (): ReactElement | null => {
  const [ordered, setOrdered] = useState<ReactElement[]>([]);

  useEffect(() => {
    const shuffled: ReactElement[] = [
      <RotaryLamp key="rotary" />,
      <EnhancedScoop key="scoop" />
    ].sort(() => Math.random() - 0.5);

    setOrdered(shuffled);
  }, []);

  return <>{ordered}</>;
};

export default ShuffledProjects;
