// src/ssr/projects/scoop.ssr.tsx
import React from 'react';
import { SsrMediaBlock } from '../blocks/type-1';
import { getProjectData } from '../../utils/get-project-data';
import type { SsrDescriptor } from '../types';

export const scoopSSR: SsrDescriptor = {
  fetch: () => getProjectData('ice-scoop'),
  render: (data) => <SsrMediaBlock data={data} />,
  // buildPreloads: (data) => [...optional <link> tags from data],
};
