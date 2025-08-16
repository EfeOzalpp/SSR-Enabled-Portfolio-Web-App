// src/components/dynamic-app/shadow-entry.tsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import DynamicAppInbound from '../../dynamic-app/dynamic-app-shadow.jsx';

type Props = {
  /** The outer block element id, e.g. "block-dynamic" */
  blockId: string;
};

const ShadowEntry: React.FC<Props> = ({ blockId }) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const container = document.getElementById(blockId);
    if (!container) return;

    const tryFind = () => {
      const overlay = container.querySelector<HTMLElement>('.screen-overlay') || null;
      if (overlay) {
        setTarget(overlay);
        return true;
      }
      return false;
    };

    // First try immediately
    if (tryFind()) return;

    // Watch for it
    const observer = new MutationObserver(() => {
      if (tryFind()) {
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [blockId]);

  if (!target) return null;
  return ReactDOM.createPortal(
    <DynamicAppInbound onFocusChange={() => {}} />,
    target
  );
};

export default ShadowEntry;
