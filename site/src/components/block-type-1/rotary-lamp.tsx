// RotaryLamp.tsx
import { useEffect, useState } from 'react';
import { getProjectData } from '../../utils/get-project-data';
import SplitDragHandler from '../../utils/split-controller';
import MediaLoader from '../../utils/media-providers/media-loader';
import { useTooltipInit } from '../../utils/tooltip/tooltipInit';
import '../../styles/block-type-1.css';

type MediaSlot = { alt?: string; image?: any; video?: { asset?: { url?: string } } };
type RotaryData = { mediaOne: MediaSlot; mediaTwo: MediaSlot };

export default function RotaryLamp() {
  const [data, setData] = useState<RotaryData | null>(null);
  const [split, setSplit] = useState(() => (window.innerWidth < 768 ? 55 : 50));
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useTooltipInit();

  useEffect(() => {
    getProjectData<RotaryData>('rotary-lamp').then((d) => setData(d));
  }, []);

  useEffect(() => {
    const onResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!data) return null;

  const media1 = isPortrait ? data.mediaOne : data.mediaTwo;
  const media2 = isPortrait ? data.mediaTwo : data.mediaOne;

  return (
    <section className="block-type-1" id="no-ssr" style={{ position: 'relative' }}>
      {/* LEFT / TOP */}
      <div
        className="media-content-1"
        style={
          isPortrait
            ? { height: split <= 20 ? '0%' : `${split}%`, width: '100%', position: 'absolute', top: 0,
                transition: split <= 20 ? 'height 0.1s ease' : 'none' }
            : { width: `${split}%`, height: '100%', position: 'absolute', left: 0 }
        }
      >
        <MediaLoader
          type="image"
          src={media1.image}
          alt={media1.alt || 'Rotary Lamp media'}
          id="rotary-media-1"
          className="media-item-1 tooltip-rotary-lamp"
        />
      </div>

      <SplitDragHandler split={split} setSplit={setSplit} />

      {/* RIGHT / BOTTOM */}
      <div
        className="media-content-2"
        style={
          isPortrait
            ? { height: split <= 20 ? '100%' : `${100 - split}%`, width: '100%', position: 'absolute',
                top: split <= 20 ? '0%' : `${split}%`,
                transition: split <= 20 ? 'height 0.1s ease, top 0.1s ease' : 'none' }
            : { width: `${100 - split}%`, height: '100%', position: 'absolute', left: `${split}%` }
        }
      >
        <MediaLoader
          type={media2?.video?.asset?.url ? 'video' : 'image'}
          src={media2?.video?.asset?.url || media2.image}
          alt={media2.alt || 'Rotary Lamp media'}
          id="rotary-media-2"
          className="media-item-2 tooltip-rotary-lamp"
        />
      </div>
    </section>
  );
}
