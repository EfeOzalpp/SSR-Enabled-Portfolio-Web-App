// src/server/prepareSsrData.ts
import { baseProjects } from '../utils/content-utility/component-loader';
import { seededShuffle } from '../utils/seed';
import { ssrRegistry } from '../ssr/registry';

export async function prepareSsrData(seed: number, count = 3) {
  const order = seededShuffle(baseProjects, seed);
  const preloaded: Record<string, any> = {};
  let preloadLinks: string[] = [];

  const top = order.slice(0, count); // take first N
  for (const proj of top) {
    const desc = ssrRegistry[proj.key];
    if (!desc?.fetch) continue;

    const data = await desc.fetch();
    preloaded[proj.key] = { kind: proj.key, data };
    // skip desc.buildPreloads() since you don’t want any <link rel="preload">
  }

  return { seed, preloaded, preloadLinks }; // preloadLinks stays empty
}
