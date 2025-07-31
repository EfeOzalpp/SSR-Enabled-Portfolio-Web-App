type TooltipInfo = {
  tags: string[];
  backgroundColor: string;
};

const tooltipDataCache: Record<string, TooltipInfo> = {};

const backgroundColorMap: Record<string, string> = {
  'rotary-lamp': 'rgba(204, 85, 41, 0.6)',
  'ice-scoop': 'rgba(234, 103, 97, 0.6)',
  'data-viz': 'rgba(48, 152, 202, 0.8)',
  'block-g': 'rgba(101, 86, 175, 0.6)',
  'Dynamic App': 'rgba(120, 211, 255, 0.6)',
};

let tooltipEl: HTMLDivElement | null = null;
let currentKey = '';
let lastMouseX = -1;
let lastMouseY = -1;
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

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

export const initGlobalTooltip = (rootElement: Document | ShadowRoot = document) => {
  if (tooltipEl) return; // Prevent multiple initializations

  // Tooltip DOM setup
  const el = document.createElement('div');
  el.id = 'custom-global-tooltip';
  el.className = 'custom-tooltip-blur';
  Object.assign(el.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '9999',
    opacity: '0',
    visibility: 'hidden',
    backdropFilter: 'blur(8px)',
    color: '#fff',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
  });

  (rootElement === document ? document.body : rootElement).appendChild(el);
  tooltipEl = el;

  const showTooltip = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    tooltipEl!.style.opacity = '1';
    tooltipEl!.style.visibility = 'visible';
    hideTimeout = setTimeout(hideTooltip, 2000);
  };

  const hideTooltip = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    tooltipEl!.style.opacity = '0';
    tooltipEl!.style.visibility = 'hidden';
    currentKey = '';
  };

  const handleMouseMove = async (e: MouseEvent) => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    const target = e.target as HTMLElement;
    if (!target || !(target instanceof HTMLElement)) return;

    const tooltipClass = [...target.classList].find(cls => cls.startsWith('tooltip-'));
    if (!tooltipClass) {
      hideTooltip();
      return;
    }

    const key = tooltipClass.replace('tooltip-', '');

    // Tooltip positioning
    requestAnimationFrame(() => {
      const rect = tooltipEl!.getBoundingClientRect();
      const cx = e.clientX;
      const cy = e.clientY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const padding = 0;

      let left = cx + padding;
      let top = cy - rect.height / 2;

      if (cy < rect.height + 20) top = cy + 6;
      if (cy + rect.height > vh - 20) top = cy - rect.height - 12;
      if (cx + rect.width > vw - 20) left = cx - rect.width - 18;

      tooltipEl!.style.left = `${Math.max(padding, Math.min(left, vw - rect.width))}px`;
      tooltipEl!.style.top = `${Math.max(padding, Math.min(top, vh - rect.height))}px`;
    });

    if (key !== currentKey) {
      currentKey = key;
      const info = await fetchTooltipDataForKey(key);
      tooltipEl!.innerHTML = info.tags.map(tag => `<p class="tooltip-tag">${tag}</p>`).join('');
      tooltipEl!.style.backgroundColor = info.backgroundColor;
      showTooltip();
    } else {
      if (tooltipEl!.style.opacity === '0' || tooltipEl!.style.visibility === 'hidden') {
        showTooltip();
      }
    }
  };

  const handleMouseOut = () => hideTooltip();

  // Bind to both main and shadow DOM
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseout', handleMouseOut);
  if (rootElement !== document) {
    rootElement.addEventListener('mousemove', handleMouseMove);
    rootElement.addEventListener('mouseout', handleMouseOut);
  }

  // Polling fallback (elementFromPoint)
  setInterval(() => {
    const el = (rootElement as any).elementFromPoint?.(lastMouseX, lastMouseY)
            || document.elementFromPoint(lastMouseX, lastMouseY);

    if (!el || !(el instanceof HTMLElement)) {
      hideTooltip();
      return;
    }

    const tooltipClass = [...el.classList].find(cls => cls.startsWith('tooltip-'));
    if (!tooltipClass) {
      hideTooltip();
      return;
    }

    const key = tooltipClass.replace('tooltip-', '');
    if (key !== currentKey) {
      const synthetic = new MouseEvent('mousemove', {
        clientX: lastMouseX,
        clientY: lastMouseY,
        bubbles: true,
      });
      el.dispatchEvent(synthetic);
    }
  }, 150);
};
