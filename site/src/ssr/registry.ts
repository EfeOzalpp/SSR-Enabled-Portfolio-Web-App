// src/ssr/registry.ts
import type { SsrRegistry } from './types';
import { scoopSSR }   from './projects/scoop.ssr';
import { rotarySSR }  from './projects/rotary.ssr';
import { datavizSSR } from './projects/dataviz.ssr';

export const ssrRegistry: SsrRegistry = {
  scoop:   scoopSSR,
  rotary:  rotarySSR,
  dataviz: datavizSSR,
  // game: undefined,
  // dynamic: undefined,
};
