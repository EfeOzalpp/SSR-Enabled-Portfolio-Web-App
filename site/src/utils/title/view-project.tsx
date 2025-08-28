// src/utils/title/view-project.tsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import lottie from '../../utils/load-lottie';
import arrowData from '../../svg/arrow.json';
import linkData from '../../svg/link.json';

import { useActiveTitle } from './title-context';
import { baseProjects } from '../content-utility/component-loader';
import { projectColors } from '../content-utility/color-map';
import { useSsrData } from '../context-providers/ssr-data-context';
import { seededShuffle } from '../seed';

import TitleObserver from './title-observer';

// Minimal shape for what we use from Lottie
type AnimationItemLike = {
  goToAndStop: (value: number, isFrame?: boolean) => void;
  playSegments: (segments: [number, number] | number[], forceFlag?: boolean) => void;
  addEventListener: (name: string, cb: () => void) => void;
  removeEventListener: (name: string, cb: () => void) => void;
  destroy: () => void;
};

const ViewProject = () => {
  const { activeTitle } = useActiveTitle();
  const { seed = 12345 } = useSsrData() || {};
  const projects = useMemo(() => seededShuffle(baseProjects, seed), [seed]);

  const arrowContainer = useRef<HTMLDivElement>(null);
  const arrowAnimRef = useRef<AnimationItemLike | null>(null);
  const lastTitleRef = useRef(activeTitle);

  const [hovered, setHovered] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentProject = useMemo(
    () => projects.find((p) => p.title === activeTitle),
    [projects, activeTitle]
  );
  const isLink = currentProject?.isLink;

  const getBackgroundColor = () => {
    const colorInfo = projectColors[activeTitle];
    if (!colorInfo) return 'rgba(240, 240, 240, 0.5)';
    const alpha = hovered ? 1 : (colorInfo.defaultAlpha ?? 0.8);
    return `rgba(${colorInfo.rgb}, ${alpha})`;
  };

  const triggerBackgroundFade = () => {
    setShowBackground(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowBackground(false), 1500);
  };

  // (Re)create arrow/link Lottie when title changes
  useEffect(() => {
    const el = arrowContainer.current;
    if (!el) return;

    let anim: AnimationItemLike | null = null;
    let mounted = true;

    (async () => {
      const animationData = activeTitle === 'Dynamic App' ? linkData : arrowData;

      // NOTE: proxy returns a Promise -> await the instance
      anim = await lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData,
      });

      if (!mounted || !anim) return;

      arrowAnimRef.current = anim;
      anim.goToAndStop(40, true);

      const onDomLoaded = () => {
        const svg = el.querySelector('svg');
        if (svg) svg.classList.add('arrow-svg');
      };

      anim.addEventListener('DOMLoaded', onDomLoaded);

      // cleanup listeners if effect re-runs (component unmount cleanup below)
      return () => {
        anim?.removeEventListener('DOMLoaded', onDomLoaded);
      };
    })();

    return () => {
      mounted = false;
      arrowAnimRef.current?.destroy();
      arrowAnimRef.current = null;
    };
  }, [activeTitle]);

  // Play a segment when the title actually changes
  useEffect(() => {
    if (lastTitleRef.current !== activeTitle) {
      arrowAnimRef.current?.playSegments([40, 90], true);
      lastTitleRef.current = activeTitle;
      triggerBackgroundFade();
    }
  }, [activeTitle]);

  // Trigger background fade on user motion (bottom ~35% of viewport) or touch
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      if (e.clientY >= viewportH * 0.65) triggerBackgroundFade();
    };
    const handleTouch = () => triggerBackgroundFade();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
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
