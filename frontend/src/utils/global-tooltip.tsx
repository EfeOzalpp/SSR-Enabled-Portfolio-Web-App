// src/utils/global-tooltip.tsx
import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import client from './sanity';

export type TooltipInfo = {
  tags: string[];
  backgroundColor: string;
};

let currentTooltip: TooltipInfo | null = null;
let listeners: ((info: TooltipInfo | null) => void)[] = [];

export const setTooltipInfo = (info: TooltipInfo | null) => {
  currentTooltip = info;
  listeners.forEach((cb) => cb(info));
};

const tooltipDataCache: Record<string, TooltipInfo> = {};

const backgroundColorMap: Record<string, string> = {
  'rotary-lamp': 'rgba(148, 72, 53, 0.6)',
  'ice-scoop': 'rgba(147, 149, 146, 0.6)',
  'data-viz': 'rgba(10, 146, 205, 0.6)',
  'block-g': 'rgba(140, 110, 160, 0.6)'
};

export const fetchTooltipDataForKey = async (key: string): Promise<TooltipInfo> => {
  if (tooltipDataCache[key]) {
    console.log(`[GlobalTooltip] Cache hit for key: ${key}`, tooltipDataCache[key]);
    return tooltipDataCache[key];
  }

  let tags: string[] = [];
  const bg = backgroundColorMap[key] || 'rgba(85, 95, 90, 0.6)';

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


  console.log(`[GlobalTooltip] Final tag list for ${key}:`, tags);

  tooltipDataCache[key] = { tags, backgroundColor: bg };
  return tooltipDataCache[key];
};


export const GlobalTooltip = ({ mouseIdle }: { mouseIdle: boolean }) => {
  const [info, setInfo] = useState<TooltipInfo | null>(currentTooltip);

  useEffect(() => {
    const cb = (i: TooltipInfo | null) => setInfo(i);
    listeners.push(cb);
    return () => {
      listeners = listeners.filter((l) => l !== cb);
    };
  }, []);

  return (
    <Tooltip
      id="global-tooltip"
      positionStrategy="fixed"
      anchorSelect={false}
      float
      followCursor
      noArrow
      className={mouseIdle ? 'tooltip-hidden' : ''}
      style={{ backgroundColor: info?.backgroundColor || 'rgba(85, 95, 90, 0.6)' }}
      render={() => (
        <div className="custom-tooltip-blur">
          {info?.tags?.length ? (
            info.tags.map((tag, i) => (
              <span key={i} className="tooltip-tag">{tag}</span>
            ))
          ) : (
            <p className="tooltip-tag">No tags</p>
          )}
        </div>
      )}
    />
  );
};
