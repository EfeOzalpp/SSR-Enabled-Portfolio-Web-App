// src/server/prepareSsrData.ts
import { projects as originalProjects } from '../utils/content-utility/component-loader';
import { getProjectData } from '../utils/get-project-data';

export async function prepareSsrData() {
  // (A) Decide order on the server
  const projects = [...originalProjects].sort(() => Math.random() - 0.5);

  // (B) Prefetch ONLY what you need for first paint
  const firstKey = projects[0].key;
  const firstData = await getProjectData(firstKey);

  return {
    projects,                    // send order to client to avoid mismatch
    preloaded: { [firstKey]: firstData ?? null },
  };
}
