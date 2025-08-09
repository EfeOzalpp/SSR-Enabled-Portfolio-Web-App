import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import arrowData from '../../svg/arrow.json';
import linkData from '../../svg/link.json';

import { useActiveTitle } from './title-context.tsx';

import { projects } from '../content-utility/component-loader.tsx';
import { projectColors } from '../content-utility/color-map.ts'; 

import TitleObserver from './title-observer.tsx';

const ViewProject = () => {
  const { activeTitle } = useActiveTitle();

  const arrowContainer = useRef<HTMLDivElement>(null);
  const arrowAnimRef = useRef<lottie.AnimationItem | null>(null);
  const lastTitleRef = useRef(activeTitle);

  const [hovered, setHovered] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentProject = projects.find(p => p.title === activeTitle);
  const isLink = currentProject?.isLink;

  // Return computed background RGBA string
  const getBackgroundColor = () => {
    const colorInfo = projectColors[activeTitle];
    if (!colorInfo) return 'rgba(240, 240, 240, 0.7)';
    
    const alpha = hovered ? 1 : (colorInfo.defaultAlpha ?? 0.6);
    return `rgba(${colorInfo.rgb}, ${alpha})`;
  };

  // Fade logic — show background and hide after 2s
  const triggerBackgroundFade = () => {
    setShowBackground(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setShowBackground(false);
    }, 2000);
  };

  // Setup Lottie animation when title changes
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
    anim.goToAndStop(40, true); // Hold at frame 40

    anim.addEventListener('DOMLoaded', () => {
      const svg = arrowContainer.current?.querySelector('svg');
      if (svg) svg.classList.add('arrow-svg');
    });

    return () => anim.destroy();
  }, [activeTitle]);

  // Play wiggle when project changes + trigger background fade
  useEffect(() => {
    if (lastTitleRef.current !== activeTitle) {
      arrowAnimRef.current?.playSegments([40, 90], true);
      lastTitleRef.current = activeTitle;
      triggerBackgroundFade();
    }
  }, [activeTitle]);

  // Detect mouse move near bottom → trigger background + idle fade
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY > window.innerHeight * 0.66) {
        setShowBackground(true);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => {
          setShowBackground(false);
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Dynamic component (link or button)
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
