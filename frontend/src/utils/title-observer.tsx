/* Project Title Switch Observer */
import { useEffect } from 'react';
import { useProjectVisibility } from './project-context.tsx';

const ProjectSwitchObserver = () => {
  const { setActiveProject, focusedProjectKey } = useProjectVisibility();

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
          } else if (target.id.includes('block-g')) {
            setActiveProject('Evade the Rock');
          }
        }
      });
    }, {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    });

    const ids = ['#block-i', '#block-r', '#block-g'];

    const checkAndObserve = () => {
      const targets = ids
        .map(id => document.querySelector(id))
        .filter((el): el is HTMLElement => el !== null);

      if (targets.length < ids.length) {
        requestAnimationFrame(checkAndObserve);
        return;
      }

      targets.forEach(el => observer.observe(el));

      // Force initial title state check
      targets.forEach(el => {
        const rect = el.getBoundingClientRect();
        const ratio = Math.min(Math.max(
          (window.innerHeight - rect.top) / window.innerHeight,
          0
        ), 1);

        if (ratio > 0.55) {
          if (el.id.includes('block-i')) {
            setActiveProject('Enhanced Scoop');
          } else if (el.id.includes('block-r')) {
            setActiveProject('Rotary Lamp');
          } else if (el.id.includes('block-g')) {
            setActiveProject('Evade the Rock');
          }
        }
      });
    };

    checkAndObserve();

    return () => {
      observer.disconnect();
    };
  }, [setActiveProject, focusedProjectKey]); // <-- Add focusedProjectKey here to re-run useEffect
  //       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  return null;
};

export default ProjectSwitchObserver;
