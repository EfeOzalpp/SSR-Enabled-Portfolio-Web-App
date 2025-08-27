import { useEffect, useState } from 'react';
import { getProjectData } from '../../utils/get-project-data';
import SplitDragHandler from '../../utils/split+drag/split-controller';
import PannableViewport from '../../utils/split+drag/pannable-object-position';
import MediaLoader from '../../utils/media-providers/media-loader';
import { useTooltipInit } from '../../utils/tooltip/tooltipInit';
import '../../styles/block-type-1.css';

type VideoSet = { webmUrl?: string; mp4Url?: string; poster?: any };
type MediaSlot = { alt?: string; image?: any; video?: VideoSet };
type IceData = { mediaOne: MediaSlot; mediaTwo: MediaSlot };

const MIN_PORTRAIT_SPLIT = 16;
const EPS = 0.25;

export default function IceCreamScoop() {
  const [data, setData] = useState<IceData | null>(null);
  const [split, setSplit] = useState(() => (window.innerWidth < 1024 ? 45 : 50));
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useTooltipInit();

  useEffect(() => {
    getProjectData<IceData>('ice-scoop').then((d) => setData(d));
  }, []);

  useEffect(() => {
    const onResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!data) return null;

  const media2IsVideo = Boolean(data.mediaTwo?.video?.webmUrl || data.mediaTwo?.video?.mp4Url);

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
            src={data.mediaOne.image}
            alt={data.mediaOne.alt || 'Ice Cream Scoop media'}
            id="icecream-media-1"
            className="media-item-1 tooltip-ice-scoop"
            objectPosition="left center"
            style={{ width: '100%', height: '100%' }}
          />
        </PannableViewport>
      </div>

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
        <PannableViewport>
          <MediaLoader
            type={media2IsVideo ? 'video' : 'image'}
            src={media2IsVideo ? (data.mediaTwo.video as VideoSet) : (data.mediaTwo.image as any)}
            alt={data.mediaTwo.alt || 'Ice Cream Scoop media'}
            id="icecream-media-2"
            className="media-item-2 tooltip-ice-scoop"
            objectPosition="center bottom"
            style={{ width: '100%', height: '100%' }}
          />
        </PannableViewport>
      </div>
    </section>
  );
}
