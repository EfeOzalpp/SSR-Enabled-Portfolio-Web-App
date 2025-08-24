import React, { useEffect } from 'react';
import loadable from '@loadable/component';
import { useSsrData } from '../../utils/context-providers/ssr-data-context';
import { primeFromSSR } from '..//preload-dynamic-app';

// Load the existing client page (no SSR false flag here)
const DynamicTheme = loadable(() => import('../../DynamicTheme.jsx') , { ssr: false });

export default function DynamicThemeRoute() {
  // If your server provided preloaded data, push it into the shared cache
  const ssr = useSsrData();
  const preload = ssr?.preloaded?.dynamicTheme; // { icons, images } if your server sets it

  useEffect(() => {
    if (preload) primeFromSSR(preload);
  }, [preload]);

  return <DynamicTheme />;
}
