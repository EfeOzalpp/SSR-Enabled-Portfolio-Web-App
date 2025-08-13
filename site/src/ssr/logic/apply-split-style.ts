// src/utils/apply-split-style.ts
export const MIN_PORTRAIT_SPLIT = 20;

export function applySplitStyle(
  split: number,
  isPortrait: boolean,
  ids: { m1: string; m2: string }
) {
  const media1 = document.getElementById(ids.m1) as HTMLElement | null;
  const media2 = document.getElementById(ids.m2) as HTMLElement | null;
  if (!media1 || !media2) return;

  const s = Math.max(0, Math.min(100, split));

  media1.style.position = 'absolute';
  media2.style.position = 'absolute';

  if (isPortrait) {
    media1.style.left = '0';
    media1.style.width = '100%';
    media2.style.left = '0';
    media2.style.width = '100%';
    media1.style.top = '0';

    if (s <= MIN_PORTRAIT_SPLIT) {
      media1.style.height = '0%';
      media1.style.transition = 'height 0.1s ease';

      media2.style.top = '0%';
      media2.style.height = '100%';
      media2.style.transition = 'height 0.1s ease, top 0.1s ease';
    } else {
      media1.style.height = `${s}%`;
      media1.style.transition = 'none';

      media2.style.top = `${s}%`;
      media2.style.height = `${100 - s}%`;
      media2.style.transition = 'none';
    }
  } else {
    media1.style.top = '0';
    media1.style.height = '100%';
    media2.style.top = '0';
    media2.style.height = '100%';

    media1.style.left = '0';
    media1.style.width = `${s}%`;

    media2.style.left = `${s}%`;
    media2.style.width = `${100 - s}%`;
  }
}
