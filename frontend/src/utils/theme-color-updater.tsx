// src/components/ThemeColorUpdater.tsx
import { useEffect } from 'react';
import { useProjectVisibility } from './project-context.tsx';

const ThemeColorUpdater = () => {
  const { activeProject } = useProjectVisibility();

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const navMenu = document.querySelector('.nav-menu') as HTMLElement;

    if (!metaThemeColor || !navMenu) return;

    let topColor = 'rgb(24, 24, 26)';

    if (activeProject === 'Rotary Lamp') {
      topColor = 'rgb(18, 19, 19)';
    } else if (activeProject === 'Enhanced Scoop') {
      topColor = 'rgb(18, 17, 17)';
    } else if (activeProject === 'Evade the Rock') {
      topColor = 'rgb(25, 25, 25)';
    }

    metaThemeColor.setAttribute('content', topColor);

    const rgbValues = topColor.match(/\d+/g);
    if (rgbValues) {
      const [r, g, b] = rgbValues;

      const viewportWidth = window.innerWidth;
      let gradient;

      if (viewportWidth >= 1025) {
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
      } else if (viewportWidth >= 768 && viewportWidth <= 1024) {
        gradient = `
          linear-gradient(
            to bottom,
            rgba(${r}, ${g}, ${b}, 0.4) 0%,
            rgba(${r}, ${g}, ${b}, 0.35) 25%,
            rgba(${r}, ${g}, ${b}, 0.3) 50%,
            rgba(${r}, ${g}, ${b}, 0.2) 75%,
            transparent 100%
          )
        `;
      } else {
        gradient = `
          linear-gradient(
            to bottom,
            rgba(${r}, ${g}, ${b}, 0.5) 0%,
            rgba(${r}, ${g}, ${b}, 0.4) 25%,
            rgba(${r}, ${g}, ${b}, 0.3) 50%,
            rgba(${r}, ${g}, ${b}, 0.2) 75%,
            transparent 100%
          )
        `;
      }

      navMenu.style.background = gradient;
    }
  }, [activeProject]);

  return null;
};

export default ThemeColorUpdater;
