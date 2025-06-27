/* Project Title Switch Observer */
import { useEffect } from 'react';
import { useProjectVisibility } from './project-visibility.tsx';

const ProjectSwitchObserver = () => {
  const { setActiveProject } = useProjectVisibility();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;

        if (ratio > 0.55) {
          if (target.id.includes('block-i')) {
            setActiveProject('Enhanced Scoop');
          } else if (target.id.includes('block-r')) {
            setActiveProject('Rotary Lamp');
          }
        }
      });
    }, {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    });

    const timeout = setTimeout(() => {
      const ids = [
        '#block-i',
        '#block-r',
      ];

      const targets = ids
        .map(id => document.querySelector(id))
        .filter((el): el is HTMLElement => el !== null);

      // console.log(`ProjectSwitchObserver: Observing ${targets.length} project blocks`);
      targets.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [setActiveProject]);

  return null;
};

export default ProjectSwitchObserver;
