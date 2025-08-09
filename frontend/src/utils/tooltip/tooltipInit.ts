// utils/tooltip/tooltipInit.ts
import { useEffect } from 'react';
import { initGlobalTooltip } from './tooltip.ts';
import { useRealMobileViewport } from '../content-utility/real-mobile.ts';

export const useTooltipInit = () => {
  const isRealMobile = useRealMobileViewport();

  useEffect(() => {
    const dispose = initGlobalTooltip(isRealMobile);
    return () => dispose?.();
  }, [isRealMobile]);
};
