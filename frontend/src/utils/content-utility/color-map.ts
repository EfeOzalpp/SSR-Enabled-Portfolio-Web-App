// utils/color-map.ts

type ProjectColorInfo = {
  base: string;       // raw RGB like "234, 103, 97"
  bgOpacity?: number; // default opacity (optional)
  themeColor?: string; // for <meta name="theme-color">
};

export const projectColorMap: Record<string, ProjectColorInfo> = {
  'Ice Cream Scoop': {
    base: '234, 103, 97',
    themeColor: 'rgba(23, 27, 24, 1)',
  },
  'Rotary Lamp': {
    base: '204, 85, 41',
    themeColor: 'rgba(19, 21, 21, 1)',
  },
  'Evade the Rock': {
    base: '101, 86, 175',
    themeColor: 'rgb(25, 25, 25)',
  },
  'Data Visualization': {
    base: '153, 199, 7',
    themeColor: 'rgba(28, 30, 31, 1)',
  },
  'Dynamic App': {
    base: '120, 211, 255',
    themeColor: 'rgba(28, 30, 31, 1)',
  },
};

export const getProjectColor = (title: string, options?: { opacity?: number }) => {
  const info = projectColorMap[title];
  if (!info) return null;

  const opacity = options?.opacity ?? 0.6;
  const rgba = `rgba(${info.base}, ${opacity})`;
  return {
    ...info,
    rgba,
  };
};
