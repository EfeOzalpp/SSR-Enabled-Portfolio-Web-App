// src/ssr/projects/dataviz.ssr.tsx
import React from 'react';
import { SsrMediaBlock } from '../blocks/type-1';
import { getProjectData } from '../../utils/get-project-data';
import type { SsrDescriptor } from '../types';

export const datavizSSR: SsrDescriptor = {
  fetch: () => getProjectData('data-viz'),
  render: (data) => <SsrMediaBlock data={data} />,
};
