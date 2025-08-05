import React, { useRef, useEffect, useState } from 'react';
import createShadowRoot from 'react-shadow';
import DynamicTheme from './dynamic-app-outgoing.jsx';
import { initGlobalTooltip } from '../utils/tooltip.ts';

const DynamicAppInbound = ({ onFocusChange }) => {
  const shadowRef = useRef(null);
  const [shadowRoot, setShadowRoot] = useState(null);
  const ShadowRoot = createShadowRoot.div;

  useEffect(() => {
    // Wait for next tick so shadowRoot is mounted
    setTimeout(() => {
      const root = shadowRef.current?.getRootNode?.();
      if (root?.host) {
        setShadowRoot(root);
      } else {
        console.warn('[⚠️ ShadowRoot not found]');
      }
    }, 0);
  }, []);

  useEffect(() => {
    if (shadowRoot) {
      initGlobalTooltip(shadowRoot); // Initialize once root is known
    }
  }, [shadowRoot]);

  useEffect(() => {
    const el = shadowRef.current;
    if (!el) return;

    let startY = 0;
    let focusTriggered = false;

    const triggerSyntheticClick = () => {
      const down = new PointerEvent('pointerdown', {
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerType: 'touch',
      });
      el.dispatchEvent(down);

      onFocusChange?.(true); // Notify parent controller
      console.log('[📌 Focus triggered in embedded app]');
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      startY = e.touches[0].clientY;
      focusTriggered = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (focusTriggered || e.touches.length === 0) return;

      const deltaY = e.touches[0].clientY - startY;

      if (Math.abs(deltaY) > 1) {
        // Small threshold to detect intention to drag
        el.scrollTop += 1; // Nudge the scroll context to wake up scrollability
        triggerSyntheticClick();
        focusTriggered = true;
      }
    };

    if ('ontouchstart' in window) {
      el.addEventListener('touchstart', handleTouchStart, { passive: true });
      el.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onFocusChange]);
  
  return (
     <div className="embedded-app">
      <ShadowRoot>
        <>
          <link rel="stylesheet" href="/dynamic-app/styles/index.css" />
          <link rel="stylesheet" href="/dynamic-app/styles/misc.css" />
          <link rel="stylesheet" href="/dynamic-app/styles/navigation.css" />
          <link rel="stylesheet" href="/dynamic-app/styles/sortByStyles.css" />
          <link rel="stylesheet" href="/dynamic-app/styles/title.css" />
          <link rel="stylesheet" href="/dynamic-app/styles/UIcards.css" />
          <link rel="stylesheet" href="/dynamic-app/fonts/rubik.css" />
          <link rel="stylesheet" href="/dynamic-app/fonts/orbitron.css" />
          <link rel="stylesheet" href="/styles/loading-overlay.css" />
        </>
        <div
          ref={shadowRef}
          className="dynamic-app"
          id='shadow-dynamic-app'>
          <DynamicTheme getShadowRoot={() => shadowRoot} />
        </div>
      </ShadowRoot>
    </div>
  );
};

export default DynamicAppInbound;
