import React, { useRef, useEffect, useState } from 'react';
import createShadowRoot from 'react-shadow';
import DynamicTheme from './dynamic-app-outgoing.jsx';

const DynamicAppInbound = ({ onFocusChange }) => {
  const shadowRef = useRef(null);
  const [shadowRoot, setShadowRoot] = useState(null);
  const ShadowRoot = createShadowRoot.div;

  useEffect(() => {
    // Wait for next tick so shadowRoot is mounted
    setTimeout(() => {
      const root = shadowRef.current?.getRootNode?.();
      if (root?.host) {
        console.log('[🧩 ShadowRoot mounted]', root);
        setShadowRoot(root);
      } else {
        console.warn('[⚠️ ShadowRoot not found]');
      }
    }, 0);
  }, []);

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
        </>
        <div
          ref={shadowRef}
          className="dynamic-app"
          id='shadow-dynamic-app'
          onPointerEnter={() => onFocusChange?.(true)}
          onPointerLeave={() => onFocusChange?.(false)}
        >
          <DynamicTheme getShadowRoot={() => shadowRoot} />
        </div>
      </ShadowRoot>
    </div>
  );
};

export default DynamicAppInbound;
