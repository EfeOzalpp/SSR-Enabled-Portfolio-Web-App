// /IceCreamScoop.tsx
import { useEffect, useState } from 'react';
import { getProjectData } from '../../utils/get-project-data';
import SplitDragHandler from '../../utils/split-controller';
import MediaLoader from '../../utils/media-providers/media-loader';
import { useTooltipInit } from '../../utils/tooltip/tooltipInit';
import '../../styles/block-type-1.css';

type VideoSet = { webmUrl?: string; mp4Url?: string; poster?: any };
type MediaSlot = { alt?: string; image?: any; video?: VideoSet };
type IceData = { mediaOne: MediaSlot; mediaTwo: MediaSlot };

export default function IceCreamScoop() {
  const [data, setData] = useState<IceData | null>(null);
  const [split, setSplit] = useState(() => (window.innerWidth < 1024 ? 45 : 50));
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  // Track poster removal state so React VDOM also removes it
  const [posterRemoved, setPosterRemoved] = useState(false);

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

  // When video first loads, remove poster from React's VDOM state
  const handleVideoLoaded = () => {
    setPosterRemoved(true);
  };

  return (
    <section className="block-type-1" id="no-ssr" style={{ position: 'relative' }}>
      {/* LEFT / TOP */}
      <div
        className="media-content-1"
        style={
          isPortrait
            ? {
                height: split <= 20 ? '0%' : `${split}%`,
                width: '100%',
                position: 'absolute',
                top: 0,
                transition: split <= 20 ? 'height 0.1s ease' : 'none',
              }
            : { width: `${split}%`, height: '100%', position: 'absolute', left: 0 }
        }
      >
        <MediaLoader
          type="image"
          src={data.mediaOne.image}
          alt={data.mediaOne.alt || 'Ice Cream Scoop media'}
          id="icecream-media-1"
          className="media-item-1 tooltip-ice-scoop"
          objectPosition="left center"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <SplitDragHandler split={split} setSplit={setSplit} />

      {/* RIGHT / BOTTOM */}
      <div
        className="media-content-2"
        style={
          isPortrait
            ? {
                height: split <= 20 ? '100%' : `${100 - split}%`,
                width: '100%',
                position: 'absolute',
                top: split <= 20 ? '0%' : `${split}%`,
                transition: split <= 20 ? 'height 0.1s ease, top 0.1s ease' : 'none',
              }
            : {
                width: `${100 - split}%`,
                height: '100%',
                position: 'absolute',
                left: `${split}%`,
              }
        }
      >
        <MediaLoader
          type={media2IsVideo ? 'video' : 'image'}
          src={
            media2IsVideo
              ? {
                  ...data.mediaTwo.video!,
                  // Only pass poster if not removed
                  poster: posterRemoved ? undefined : data.mediaTwo.video?.poster,
                }
              : data.mediaTwo.image!
          }
          alt={data.mediaTwo.alt || 'Ice Cream Scoop media'}
          id="icecream-media-2"
          className="media-item-2 tooltip-ice-scoop"
          objectPosition="center bottom"
          style={{ width: '100%', height: '100%' }}
          // Pass onLoadedData handler only if video
          {...(media2IsVideo && { onLoadedData: handleVideoLoaded })}
        />
      </div>
    </section>
  );
}
