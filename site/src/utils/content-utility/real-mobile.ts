// utils/useRealMobileViewport.ts
import { useEffect, useState } from 'react';

export function useRealMobileViewport() {
  const [isRealMobile, setIsRealMobile] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    const touch = (navigator as any).maxTouchPoints > 0;

    // detect address-bar/viewport shrink behavior
    const vv = (window as any).visualViewport;
    let shrinks = false;

    const check = () => {
      if (!vv) return;
      // if visual viewport is meaningfully smaller than layout viewport, assume mobile browser chrome
      const gap = window.innerHeight - vv.height;
      if (gap > 48) shrinks = true; // ~top/bottom bars size
      setIsRealMobile(coarse && touch && (shrinks || gap > 48));
    };

    check();
    vv?.addEventListener?.('resize', check);
    window.addEventListener('orientationchange', check);
    return () => {
      vv?.removeEventListener?.('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  return isRealMobile;
}
