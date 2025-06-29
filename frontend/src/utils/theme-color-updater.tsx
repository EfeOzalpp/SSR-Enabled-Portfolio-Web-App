// src/components/ThemeColorUpdater.tsx

import { useEffect } from 'react';
import { useProjectVisibility } from './project-visibility.tsx';

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
    }

    // ✅ Update meta theme-color
    metaThemeColor.setAttribute('content', topColor);

    // ✅ Update .nav-menu background gradient
    // Convert "rgb(x, x, x)" to rgba components
    const rgbValues = topColor.match(/\d+/g);
    if (rgbValues) {
      const [r, g, b] = rgbValues;
      navMenu.style.background = `
        linear-gradient(
          to bottom,
          rgb(${r}, ${g}, ${b}, 0.5) 0%,
          rgba(${r}, ${g}, ${b}, 0.4) 25%,
          rgba(${r}, ${g}, ${b}, 0.3) 50%,
          rgba(${r}, ${g}, ${b}, 0.2) 75%,
          transparent 100%
        )
      `;
    }
  }, [activeProject]);

  return null;
};

export default ThemeColorUpdater;
