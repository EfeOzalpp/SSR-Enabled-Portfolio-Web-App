// utils/global-tooltip.ts
import { isMobile, isTablet } from 'react-device-detect';

type TooltipInfo = {
  tags: string[];
  backgroundColor: string;
};

const tooltipDataCache: Record<string, TooltipInfo> = {};

const backgroundColorMap: Record<string, string> = {
  'rotary-lamp': 'rgba(204, 85, 41, 0.6)',
  'ice-scoop': 'rgba(234, 103, 97, 0.6)',
  'data-viz': 'rgba(153, 199, 7, 0.8)',
  'block-g': 'rgba(101, 86, 175, 0.6)',
  'Dynamic App': 'rgba(120, 211, 255, 0.6)',
};

const createTooltipDOM = () => {
  const el = document.createElement('div');
  el.id = 'custom-global-tooltip';
  el.style.position = 'fixed';
  el.style.pointerEvents = 'none';
  el.style.zIndex = '9999';
  el.style.opacity = '0';
  el.style.visibility = 'hidden';
  el.style.backdropFilter = 'blur(8px)';
  el.style.color = '#fff';
  el.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
  el.className = 'custom-tooltip-blur';
  document.body.appendChild(el);
  return el;
};


let tooltipEl: HTMLDivElement | null = null;
let currentKey = '';

export const fetchTooltipDataForKey = async (key: string): Promise<TooltipInfo> => {
  if (tooltipDataCache[key]) return tooltipDataCache[key];

  const bg = backgroundColorMap[key] || 'rgba(85, 95, 90, 0.6)';
  let tags: string[] = [];

  try {
    const client = (await import('./sanity')).default;

    if (key === 'rotary-lamp') {
      const res = await client.fetch(`*[_type == "mediaBlock" && title match "Rotary Lamp"][0]{ tags }`);
      tags = res?.tags || [];
    } else if (key === 'ice-scoop') {
      const res = await client.fetch(`*[_type == "mediaBlock" && title match "Ice Scoop"][0]{ tags }`);
      tags = res?.tags || [];
    } else if (key === 'data-viz') {
      const res = await client.fetch(`*[_type == "mediaBlock" && title match "Data Visualization"][0]{ tags }`);
      tags = res?.tags || [];
    } else if (key === 'block-g') {
      tags = ['#q5.js Canvas', '#Gamification', '#Lottie Animation'];
    }
  } catch (err) {
    console.warn(`[GlobalTooltip] Failed to fetch tags for ${key}:`, err);
  }

  const info = { tags, backgroundColor: bg };
  tooltipDataCache[key] = info;
  return info;
};

export const initGlobalTooltip = () => {
  if (tooltipEl) return;
  tooltipEl = createTooltipDOM();

  let hideTimeout: ReturnType<typeof setTimeout> | null = null;

  const showTooltip = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    tooltipEl!.style.opacity = '1';
    tooltipEl!.style.visibility = 'visible';

    hideTimeout = setTimeout(() => {
      tooltipEl!.style.opacity = '0';
      tooltipEl!.style.visibility = 'hidden';
      currentKey = '';
    }, 2000);
  };

  const hideTooltip = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    tooltipEl!.style.opacity = '0';
    tooltipEl!.style.visibility = 'hidden';
    currentKey = '';
  };

  let lastMouseX = -1;
  let lastMouseY = -1;

  let lastHoveredKey = '';
  let ticking = false;
  let isScrolling = false;
  let scrollCheckTimeout: ReturnType<typeof setTimeout> | null = null;

  const checkHoveredElementOnScroll = async () => {
    const el = document.elementFromPoint(lastMouseX, lastMouseY) as HTMLElement | null;
    if (!el) {
      hideTooltip();
      lastHoveredKey = '';
      return;
    }

    const tooltipClass = [...el.classList].find((cls) => cls.startsWith('tooltip-'));
    if (!tooltipClass) {
      hideTooltip();
      lastHoveredKey = '';
      return;
    }

    const key = tooltipClass.replace('tooltip-', '');

    if (key !== currentKey) {
      currentKey = key;
      const info = await fetchTooltipDataForKey(key);
      tooltipEl!.innerHTML = info.tags.map((tag) => `<p class="tooltip-tag">${tag}</p>`).join('');
      tooltipEl!.style.backgroundColor = info.backgroundColor;
      showTooltip();
    } else {
      if (tooltipEl!.style.opacity === '0' || tooltipEl!.style.visibility === 'hidden') {
        showTooltip();
      }
    }

    // Update position manually since there's no mousemove
    requestAnimationFrame(() => {
      const rect = tooltipEl!.getBoundingClientRect();
      const padding = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = lastMouseX;
      const cy = lastMouseY;

      let left: number;
      let top: number;

      const nearTop = cy < rect.height + padding + 20;
      const nearBottom = cy + rect.height + padding > vh - 20;
      const nearRight = cx + rect.width + padding > vw - 20;
      const nearLeft = cx < rect.width + padding + 20;

      if (nearBottom) {
        top = cy - rect.height - padding - 12;
        left = cx - rect.width * 0.15;
      } else if (nearTop) {
        top = cy + padding + 6;
        left = cx - rect.width * 0.15;
      } else if (nearRight) {
        top = cy - rect.height / 2;
        left = cx - rect.width - padding - 18;
      } else if (nearLeft) {
        top = cy - rect.height / 2;
        left = cx + padding;
      } else {
        top = cy - rect.height / 2;
        left = cx + padding;
      }

      left = Math.max(padding, Math.min(left, vw - rect.width - padding));
      top = Math.max(padding, Math.min(top, vh - rect.height - padding));

      tooltipEl!.style.left = `${left}px`;
      tooltipEl!.style.top = `${top}px`;
    });
  };

  const onScroll = () => {
    isScrolling = true;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkHoveredElementOnScroll();
        ticking = false;
      });
      ticking = true;
    }

    if (scrollCheckTimeout) clearTimeout(scrollCheckTimeout);
    scrollCheckTimeout = setTimeout(() => {
      isScrolling = false;
    }, 150); // stop checking after 150ms of no scroll
  };

if (!isMobile && !isTablet) {
  window.addEventListener("scroll", onScroll, true);
}

  document.addEventListener('mousemove', async (e) => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const classList = [...target.classList];
    const tooltipClass = classList.find((cls) => cls.startsWith('tooltip-'));

    if (!tooltipClass) {
      currentKey = '';
      tooltipEl!.style.opacity = '0';
      tooltipEl!.style.visibility = 'hidden';
      return;
    }

    const key = tooltipClass.replace('tooltip-', '');

    // Always update position
    requestAnimationFrame(() => {
      const rect = tooltipEl!.getBoundingClientRect();
      const padding = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = e.clientX;
      const cy = e.clientY;

      let left: number;
      let top: number;

      const nearTop = cy < rect.height + padding + 20;
      const nearBottom = cy + rect.height + padding > vh - 20;
      const nearRight = cx + rect.width + padding > vw - 20;
      const nearLeft = cx < rect.width + padding + 20;

      if (nearBottom) {
        top = cy - rect.height - padding - 12;
        left = cx - rect.width * 0.15;
      } else if (nearTop) {
        top = cy + padding + 6;
        left = cx - rect.width * 0.15;
      } else if (nearRight) {
        top = cy - rect.height / 2;
        left = cx - rect.width - padding - 18;
      } else if (nearLeft) {
        top = cy - rect.height / 2;
        left = cx + padding;
      } else {
        top = cy - rect.height / 2;
        left = cx + padding;
      }

      left = Math.max(padding, Math.min(left, vw - rect.width - padding));
      top = Math.max(padding, Math.min(top, vh - rect.height - padding));

      tooltipEl!.style.left = `${left}px`;
      tooltipEl!.style.top = `${top}px`;
    });

    // If new key, update content
    if (key !== currentKey) {
      currentKey = key;
      const info = await fetchTooltipDataForKey(key);
      tooltipEl!.innerHTML = info.tags.map((tag) => `<p class="tooltip-tag">${tag}</p>`).join('');
      tooltipEl!.style.backgroundColor = info.backgroundColor;
      showTooltip();
    } else {
      if (tooltipEl!.style.opacity === '0' || tooltipEl!.style.visibility === 'hidden') {
        showTooltip();
      }
    }
  });

  document.addEventListener('mouseout', hideTooltip);
};