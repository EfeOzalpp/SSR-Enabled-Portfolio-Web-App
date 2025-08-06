import { useEffect } from 'react';
import { projects } from '../content-utility/component-loader.tsx';
import { useActiveTitle } from './title-context.tsx';

const TitleObserver = () => {
  const { setActiveTitle } = useActiveTitle();
console.log('All projects:', projects.map(p => `#block-${p.key}`));
console.log('document.body.innerHTML:', document.body.innerHTML);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.intersectionRatio > 0.55) {
          const match = projects.find(p => target.id.includes(p.key));
          if (match) {
            console.log('🟢 TitleObserver matched:', match.title);
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
        console.log('📌 Observing:', `#block-${p.key}`);
        observer.observe(el);
      } else {
        console.warn('⚠️ Missing DOM element for:', `#block-${p.key}`);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default TitleObserver;
