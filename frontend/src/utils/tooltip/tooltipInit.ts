// src/hooks/useTooltipInit.ts
import { useEffect } from 'react';

export const useTooltipInit = () => {
  useEffect(() => {
    import('./tooltip.ts').then(({ initGlobalTooltip }) => {
      initGlobalTooltip();
    });
  }, []);
};
