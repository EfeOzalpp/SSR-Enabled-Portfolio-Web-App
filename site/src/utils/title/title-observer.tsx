// src/utils/title/title-observer.tsx
import { useEffect, useMemo } from 'react';
import { baseProjects } from '../content-utility/component-loader';
import { useActiveTitle } from './title-context';
import { useSsrData } from '../context-providers/ssr-data-context';
import { seededShuffle } from '../seed';

const TitleObserver = () => {
  const { setActiveTitle } = useActiveTitle();
  const { seed = 12345 } = useSsrData() || {};
  const projects = useMemo(() => seededShuffle(baseProjects, seed), [seed]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.intersectionRatio > 0.55) {
            const match = projects.find((p) => target.id.includes(p.key));
            if (match) setActiveTitle(match.title);
          }
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    projects.forEach((p) => {
      const el = document.querySelector<HTMLElement>(`#block-${p.key}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projects, setActiveTitle]);

  return null;
};

export default TitleObserver;
