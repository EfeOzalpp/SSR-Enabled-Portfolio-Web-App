// utils/tooltip/tooltipInit.ts
import { useEffect } from 'react';
import { initGlobalTooltip } from './tooltip';
import { useRealMobileViewport } from '../content-utility/real-mobile';

export const useTooltipInit = () => {
  const isRealMobile = useRealMobileViewport();

  useEffect(() => {
    const dispose = initGlobalTooltip(isRealMobile);
    return () => dispose?.();
  }, [isRealMobile]);
};
