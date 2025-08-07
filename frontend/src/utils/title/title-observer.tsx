import { useEffect } from 'react';
import { projects } from '../content-utility/component-loader.tsx';
import { useActiveTitle } from './title-context.tsx';

const TitleObserver = () => {
  const { setActiveTitle } = useActiveTitle();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.intersectionRatio > 0.55) {
          const match = projects.find(p => target.id.includes(p.key));
          if (match) {
            setActiveTitle(match.title);
          }
        }
      });
    }, {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    });

    projects.forEach(p => {
      const el = document.querySelector(`#block-${p.key}`);
      if (el) {
        observer.observe(el);
      } else {
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default TitleObserver;
