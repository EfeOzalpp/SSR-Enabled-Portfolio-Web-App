// src/utils/ssr-data-context.tsx
import React, { createContext, useContext } from 'react';

export type SsrPayload = {
  projects: any[];
  preloaded: Record<string, any>;
};

const SsrDataContext = createContext<SsrPayload | null>(null);
export const useSsrData = () => useContext(SsrDataContext);

export function SsrDataProvider({ value, children }:{
  value: SsrPayload | null; children: React.ReactNode
}) {
  return <SsrDataContext.Provider value={value}>{children}</SsrDataContext.Provider>;
}
