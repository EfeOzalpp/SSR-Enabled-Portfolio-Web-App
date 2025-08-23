import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import DynamicAppInbound from '../../dynamic-app/dynamic-app-shadow.jsx';

type Props = { blockId: string };

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

    if (tryFind()) return;

    const observer = new MutationObserver(() => {
      if (tryFind()) observer.disconnect();
    });
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [blockId]);

  // NEW: announce mount/unmount of the embedded scroll container to the outer controller
  useEffect(() => {
    if (!target) return;

    const detail = { el: target, blockId };
    const mountedEvt = new CustomEvent('embedded-app:mounted', { detail });
    window.dispatchEvent(mountedEvt);

    return () => {
      const unmountedEvt = new CustomEvent('embedded-app:unmounted', { detail });
      window.dispatchEvent(unmountedEvt);
    };
  }, [target, blockId]);

  if (!target) return null;
  return ReactDOM.createPortal(<DynamicAppInbound onFocusChange={() => {}} />, target);
};

export default ShadowEntry;
