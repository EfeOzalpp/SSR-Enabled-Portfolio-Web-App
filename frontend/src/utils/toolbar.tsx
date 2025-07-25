import { useEffect, useRef } from 'react';
import { setTooltipInfo, fetchTooltipDataForKey } from './global-tooltip.tsx';

type ToolBarProps = {
  onIdleChange: (idle: boolean) => void;
};

const ToolBar = ({ onIdleChange }: ToolBarProps) => {
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastKeyRef = useRef<string | null>(null);

  // trigger the update on mouse observed items
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const tooltipId = el?.dataset?.tooltipId;
      const tooltipKey = el?.dataset?.tooltipKey;

      if (tooltipId === 'global-tooltip' && tooltipKey) {
        fetchTooltipDataForKey(tooltipKey)
          .then(setTooltipInfo)
          .catch(() => setTooltipInfo(null));
      }
    };

    const ids = [
      '#icecream-media-1',
      '#icecream-media-2',
      '#rotary-media-1',
      '#rotary-media-2',
      '#data-visualization-media'
    ];

    const targets: HTMLElement[] = [];

    const attach = () => {
      ids.forEach((id) => {
        const el = document.querySelector(id);
        if (el) {
          el.addEventListener('mouseenter', handleMouseEnter);
          targets.push(el as HTMLElement);
        }
      });
    };

    requestAnimationFrame(attach);

    return () => {
      targets.forEach((el) => el.removeEventListener('mouseenter', handleMouseEnter));
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const key = el?.dataset?.tooltipKey;

      if (key && key !== lastKeyRef.current) {
        lastKeyRef.current = key;
        fetchTooltipDataForKey(key)
          .then(setTooltipInfo)
          .catch(() => setTooltipInfo({ tags: [], backgroundColor: 'rgba(85,95,90,0.6)' }));
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      onIdleChange(false);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        onIdleChange(true);
      }, 1000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [onIdleChange]);

  return null;
};

export default ToolBar;
