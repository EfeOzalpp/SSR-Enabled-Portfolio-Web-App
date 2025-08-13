// src/ssr/types.ts
import type { ReactNode } from 'react';
import type { ProjectKey } from '../utils/content-utility/component-loader';

export type SsrDescriptor = {
  /** server-only fetch that returns JSON needed to render */
  fetch: () => Promise<any>;
  /** render function that turns fetched JSON into DOM (runs SSR + CSR) */
  render: (data: any) => ReactNode;
  /** optional: build <link rel="preload"> tags for the head */
  buildPreloads?: (data: any) => string[];
};

export type SsrRegistry = Partial<Record<ProjectKey, SsrDescriptor>>;
