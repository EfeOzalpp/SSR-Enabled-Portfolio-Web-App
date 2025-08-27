// RotaryLamp.tsx
import { useEffect, useState } from 'react';
import { getProjectData } from '../../utils/get-project-data';
import SplitDragHandler from '../../utils/split+drag/split-controller';
import PannableViewport from '../../utils/split+drag/pannable-object-position';
import MediaLoader from '../../utils/media-providers/media-loader';
import { useTooltipInit } from '../../utils/tooltip/tooltipInit';
import '../../styles/block-type-1.css';

type MediaSlot = { alt?: string; image?: any; video?: { asset?: { url?: string } } };
type RotaryData = { mediaOne: MediaSlot; mediaTwo: MediaSlot };

const MIN_PORTRAIT_SPLIT = 16; // %
const EPS = 0.25; // small hysteresis for the snap zones

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

  // swap media in landscape, keep original order in portrait
  const media1 = isPortrait ? data.mediaOne : data.mediaTwo;
  const media2 = isPortrait ? data.mediaTwo : data.mediaOne;

  const TOP = MIN_PORTRAIT_SPLIT;
  const BOTTOM = 100 - MIN_PORTRAIT_SPLIT;

  const nearTop = isPortrait && split <= TOP + EPS;
  const nearBottom = isPortrait && split >= BOTTOM - EPS;

  return (
    <section className="block-type-1" id="no-ssr" style={{ position: 'relative' }}>
      {/* LEFT / TOP */}
      <div
        className="media-content-1"
        style={
          isPortrait
            ? nearTop
              ? { height: '0%', width: '100%', position: 'absolute', top: 0, transition: 'height 0.1s ease' }
              : nearBottom
              ? { height: '100%', width: '100%', position: 'absolute', top: 0, transition: 'height 0.1s ease' }
              : { height: `${split}%`, width: '100%', position: 'absolute', top: 0 }
            : { width: `${split}%`, height: '100%', position: 'absolute', left: 0 }
        }
      >
        <PannableViewport sensitivity={2}>
          <MediaLoader
            type="image"
            src={media1.image}
            alt={media1.alt || 'Rotary Lamp media'}
            id="rotary-media-1"
            className="media-item-1 tooltip-rotary-lamp"
            style={{ width: '100%', height: '100%' }}
          />
        </PannableViewport>
      </div>

      {/* Split handle — shares the same min so UX/DOM match */}
      <SplitDragHandler split={split} setSplit={setSplit} />

      {/* RIGHT / BOTTOM */}
      <div
        className="media-content-2"
        style={
          isPortrait
            ? nearTop
              ? {
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  top: '0%',
                  transition: 'height 0.1s ease, top 0.1s ease',
                }
              : nearBottom
              ? {
                  height: '0%',
                  width: '100%',
                  position: 'absolute',
                  top: '100%',
                  transition: 'height 0.1s ease, top 0.1s ease',
                }
              : {
                  height: `${100 - split}%`,
                  width: '100%',
                  position: 'absolute',
                  top: `${split}%`,
                }
            : {
                width: `${100 - split}%`,
                height: '100%',
                position: 'absolute',
                left: `${split}%`,
              }
        }
      >
        <PannableViewport sensitivity={2}>
          <MediaLoader
            type={media2?.video?.asset?.url ? 'video' : 'image'}
            src={media2?.video?.asset?.url || media2.image}
            alt={media2.alt || 'Rotary Lamp media'}
            id="rotary-media-2"
            className="media-item-2 tooltip-rotary-lamp"
            style={{ width: '100%', height: '100%' }}
          />
        </PannableViewport>
      </div>
    </section>
  );
}
