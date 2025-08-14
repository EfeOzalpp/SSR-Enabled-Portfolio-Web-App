// src/utils/title/view-project.tsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import lottie, { type AnimationItem } from 'lottie-web';
import arrowData from '../../svg/arrow.json';
import linkData from '../../svg/link.json';

import { useActiveTitle } from './title-context';
import { baseProjects } from '../content-utility/component-loader';
import { projectColors } from '../content-utility/color-map';
import { useSsrData } from '../context-providers/ssr-data-context';
import { seededShuffle } from '../seed';

import TitleObserver from './title-observer';

const ViewProject = () => {
  const { activeTitle } = useActiveTitle();
  const { seed = 12345 } = useSsrData() || {};
  const projects = useMemo(() => seededShuffle(baseProjects, seed), [seed]);

  const arrowContainer = useRef<HTMLDivElement>(null);
  const arrowAnimRef = useRef<AnimationItem | null>(null);
  const lastTitleRef = useRef(activeTitle);

  const [hovered, setHovered] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentProject = useMemo(
    () => projects.find((p) => p.title === activeTitle),
    [projects, activeTitle]
  );
  const isLink = currentProject?.isLink;

  const getBackgroundColor = () => {
    const colorInfo = projectColors[activeTitle];
    if (!colorInfo) return 'rgba(240, 240, 240, 0.7)';
    const alpha = hovered ? 1 : (colorInfo.defaultAlpha ?? 0.6);
    return `rgba(${colorInfo.rgb}, ${alpha})`;
  };

  const triggerBackgroundFade = () => {
    setShowBackground(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowBackground(false), 2000);
  };

  useEffect(() => {
    const animationData = activeTitle === 'Dynamic App' ? linkData : arrowData;
    const anim = lottie.loadAnimation({
      container: arrowContainer.current!,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData,
    });
    arrowAnimRef.current = anim;
    anim.goToAndStop(40, true);

    const onDomLoaded = () => {
      const svg = arrowContainer.current?.querySelector('svg');
      if (svg) svg.classList.add('arrow-svg');
    };
    anim.addEventListener('DOMLoaded', onDomLoaded);

    return () => {
      anim.removeEventListener('DOMLoaded', onDomLoaded);
      anim.destroy();
    };
  }, [activeTitle]);

  useEffect(() => {
    if (lastTitleRef.current !== activeTitle) {
      arrowAnimRef.current?.playSegments([40, 90], true);
      lastTitleRef.current = activeTitle;
      triggerBackgroundFade();
    }
  }, [activeTitle]);

  useEffect(() => {
    const handleInteraction = () => {
      triggerBackgroundFade();
    };

    // Any mouse move or touch triggers background
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('touchmove', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const Element: any = isLink ? 'a' : 'button';
  const sharedProps = {
    className: `view-project-btn ${!showBackground ? 'no-bg' : ''}`,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    ...(isLink
      ? { href: '/dynamic-theme', target: '_blank', rel: 'noopener noreferrer' }
      : {}),
  };

  return (
    <div className="view-project-wrapper">
      <TitleObserver />

      <Element {...sharedProps}>
        <div
          className={`view-project-background ${!showBackground ? 'no-bg' : ''}`}
          style={{
            backgroundColor: getBackgroundColor(),
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            zIndex: 0,
          }}
        />
        <h2 className="project-view" style={{ position: 'relative', zIndex: 1 }}>
          {activeTitle}
        </h2>
        <div
          ref={arrowContainer}
          className="view-project-arrow"
          style={{ position: 'relative', zIndex: 1 }}
        />
      </Element>
    </div>
  );
};

export default ViewProject;
