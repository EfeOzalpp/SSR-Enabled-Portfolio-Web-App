// src/components/ThemeColorUpdater.tsx
import { useEffect } from 'react';
import { useProjectVisibility } from './project-context.tsx';

const ThemeColorUpdater = () => {
  const { activeProject, focusedProjectKey } = useProjectVisibility();

  const updateTheme = () => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const navMenu = document.querySelector('.nav-menu') as HTMLElement;

    if (!metaThemeColor || !navMenu) return;

    let topColor = 'rgb(24, 24, 26)';

    if (activeProject === 'Rotary Lamp') {
      topColor = 'rgba(19, 21, 21, 1)';
    } else if (activeProject === 'Ice Cream Scoop') {
      topColor = 'rgba(23, 27, 24, 1)';
    } else if (activeProject === 'Evade the Rock') {
      topColor = 'rgb(25, 25, 25)';
    } else if (activeProject === 'Data Visualization') {
      topColor = 'rgba(28, 30, 31, 1)';
    }

    metaThemeColor.setAttribute('content', topColor);

    const rgbValues = topColor.match(/\d+/g);
    if (rgbValues) {
      const [r, g, b] = rgbValues;

      const isPortrait = window.innerHeight >= window.innerWidth;
      let gradient;

      if (!isPortrait) {
        gradient = `
          linear-gradient(
            to bottom,
            rgba(${r}, ${g}, ${b}, 0.3) 0%,
            rgba(${r}, ${g}, ${b}, 0.25) 20%,
            rgba(${r}, ${g}, ${b}, 0.2) 40%,
            rgba(${r}, ${g}, ${b}, 0.1) 70%,
            transparent 100%
          )
        `;
      } else {
        gradient = `
          linear-gradient(
            to bottom,
            rgba(${r}, ${g}, ${b}, 0.5) 0%,
            rgba(${r}, ${g}, ${b}, 0.3) 20%,
            rgba(${r}, ${g}, ${b}, 0.2) 30%,
            rgba(${r}, ${g}, ${b}, 0.1) 60%,
            transparent 100%
          )
        `;
      }

      navMenu.style.background = gradient;
    }
  };

  useEffect(() => {
    updateTheme();
    const handleResize = () => updateTheme();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeProject, focusedProjectKey]);

  return null;
};

export default ThemeColorUpdater;
