// src/server/prepareSsrData.ts
import { baseProjects } from '../utils/content-utility/component-loader';
import { seededShuffle } from '../utils/seed';
import { ssrRegistry } from '../ssr/registry';

export async function prepareSsrData(seed: number) {
  const order = seededShuffle(baseProjects, seed);
  const first = order[0];

  const preloaded: Record<string, any> = {};
  let preloadLinks: string[] = [];

  const desc = first ? ssrRegistry[first.key] : undefined;
  if (desc?.fetch) {
    const data = await desc.fetch(); // 👈 server fetch
    preloaded[first.key] = { kind: first.key, data }; // tiny discriminator is handy
    if (desc.buildPreloads) preloadLinks = desc.buildPreloads(data);
  }

  return { seed, preloaded, preloadLinks };
}
