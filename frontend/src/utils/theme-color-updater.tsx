import { useEffect } from 'react';
import { useProjectVisibility } from './context-providers/project-context.tsx';
import { projectColors } from './content-utility/color-map.ts'; 

const ThemeColorUpdater = () => {
  const { activeProject, focusedProjectKey } = useProjectVisibility();

  const updateTheme = () => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const navMenu = document.querySelector('.nav-menu') as HTMLElement;
    if (!metaThemeColor || !navMenu) return;

    const colorInfo = projectColors[activeProject];
    const topColor = colorInfo?.darkThemeTop || 'rgb(24, 24, 26)';

    metaThemeColor.setAttribute('content', topColor);

    const rgbValues = topColor.match(/\d+/g);
    if (rgbValues) {
      const [r, g, b] = rgbValues;
      const isPortrait = window.innerHeight >= window.innerWidth;

      const gradient = isPortrait
        ? `
          linear-gradient(
            to bottom,
            rgba(${r}, ${g}, ${b}, 0.5) 0%,
            rgba(${r}, ${g}, ${b}, 0.3) 20%,
            rgba(${r}, ${g}, ${b}, 0.2) 30%,
            rgba(${r}, ${g}, ${b}, 0.1) 60%,
            transparent 100%
          )
        `
        : `
          linear-gradient(
            to bottom,
            rgba(${r}, ${g}, ${b}, 0.3) 0%,
            rgba(${r}, ${g}, ${b}, 0.25) 20%,
            rgba(${r}, ${g}, ${b}, 0.2) 40%,
            rgba(${r}, ${g}, ${b}, 0.1) 70%,
            transparent 100%
          )
        `;

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
