// src/server/seed.ts
import * as crypto from 'node:crypto';
import { stringToSeed } from '../utils/seed';

// New seed each request; no cookies, nothing persisted.
export function getEphemeralSeed() {
  const seedStr = crypto.randomUUID();
  const seed = stringToSeed(seedStr);
  return { seed, seedStr };
}
