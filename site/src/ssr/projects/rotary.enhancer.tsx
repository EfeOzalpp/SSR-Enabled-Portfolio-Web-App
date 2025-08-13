// src/sections/RotaryEnhancer.tsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SplitDragHandler from '../../utils/split-controller';
import { useTooltipInit } from '../../utils/tooltip/tooltipInit';

export default function RotaryEnhancer() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [split, setSplit] = useState(() => (window.innerWidth < 768 ? 55 : 50));

  useTooltipInit();

  useEffect(() => { setHost(document.getElementById('rotary-enhancer-mount')); }, []);
  if (!host) return null;

  return createPortal(<SplitDragHandler split={split} setSplit={setSplit} />, host);
}
