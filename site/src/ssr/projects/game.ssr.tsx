import type { SsrDescriptor } from '../types';
import { getProjectData } from '../../utils/get-project-data';
import React from 'react';

type CoinDoc = { alt?: string; image?: { asset?: { url?: string } } };

export const gameSSR: SsrDescriptor = {
  // Server fetch: just the coin doc for SSR onboarding
  fetch: async (): Promise<CoinDoc | null> =>
    await getProjectData<CoinDoc>('rock-coin'),

  // Server render: mirror the lazy onboarding DOM/classes exactly
    render: (coin: CoinDoc | null) => {
    const coinUrl = coin?.image?.asset?.url;
    const alt = coin?.alt ?? 'Loading';

// src/ssr/projects/game.ssr.tsx (render)
return (
  <section tabIndex={-1} className="block-type-g ingame" style={{ position: 'relative' }} data-ssr-shell="block-game">
    {/* REQUIRED wrapper – enhancer portals into this and animates it away */}
    <div
      className="block-g-onboarding tooltip-block-g"
      aria-live="polite"
      style={{ display: 'flex', alignItems: 'center'}}
    >
      <div className="coin" style={{ pointerEvents: 'none' }}>
        {coinUrl ? (
          <img
            src={coinUrl}
            alt={alt}
            decoding="async"
            loading="eager"
            draggable={false}
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : null}
      </div>

      <h1 className="onboarding-text" style={{ pointerEvents: 'none' }}>Loading…</h1>
    </div>

    {/* REQUIRED: the enhancer will mount the stage/canvas here */}
  </section>
);

    },

  // Preload the coin so it’s painted ASAP
  buildPreloads: (coin: CoinDoc | null) =>
    coin?.image?.asset?.url
      ? [`<link rel="preload" as="image" href="${coin.image.asset.url}">`]
      : [],

  // Inline critical CSS file for the first fold
  criticalCssFiles: ['src/styles/block-type-g.css'],
};
