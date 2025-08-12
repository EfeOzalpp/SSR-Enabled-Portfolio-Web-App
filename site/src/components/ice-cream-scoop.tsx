import { useEffect, useState } from 'react';
import client from '../utils/sanity';
import SplitDragHandler from '../utils/split-controller';
import MediaLoader from '../utils/media-providers/media-loader';
import { useTooltipInit } from '../utils/tooltip/tooltipInit';
import '../styles/block-type-1.css';

type VideoSet = {
  webmUrl?: string;
  mp4Url?: string;
  poster?: any; // Sanity image
};

type MediaSlot = {
  alt?: string;
  image?: any;
  video?: VideoSet;
};

type IceData = {
  mediaOne: MediaSlot;
  mediaTwo: MediaSlot;
};

const IceCreamScoop = () => {
  const [data, setData] = useState<IceData | null>(null);
  const [split, setSplit] = useState(() => (window.innerWidth < 1024 ? 45 : 50));
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useTooltipInit();

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch by slug; adjust slug string to match your Studio document
  useEffect(() => {
    client
      .fetch<any>(
        `*[_type == "mediaBlock" && slug.current == $slug][0]{
          mediaOne{
            alt,
            image,
            video{
              "webmUrl": webm.asset->url,
              "mp4Url": mp4.asset->url,
              poster
            }
          },
          mediaTwo{
            alt,
            image,
            video{
              "webmUrl": webm.asset->url,
              "mp4Url": mp4.asset->url,
              poster
            }
          }
        }`,
        { slug: 'ice-scoop' }
      )
      .then(setData)
      .catch((err: any) => {
        console.warn('[IceCreamScoop] GROQ fetch failed:', err);
        setData(null);
      });
  }, []);

  if (!data) return null;

  const media1 = data.mediaOne;
  const media2 = data.mediaTwo;

  const alt1 = media1?.alt || 'Ice Cream Scoop media';
  const alt2 = media2?.alt || 'Ice Cream Scoop media';

  const media2IsVideo = Boolean(media2?.video?.webmUrl || media2?.video?.mp4Url);

  return (
    <section className="block-type-1" style={{ position: 'relative' }}>
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
            : {
                width: `${split}%`,
                height: '100%',
                position: 'absolute',
                left: 0,
              }
        }
      >
        <MediaLoader
          type="image"
          src={media1?.image}
          alt={alt1}
          id="icecream-media-1"
          className="media-item-1 tooltip-ice-scoop"
          objectPosition="left center"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* SPLITTER */}
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
          src={media2IsVideo ? media2.video! : media2.image!} // pass videoSet object
          alt={alt2}
          id="icecream-media-2"
          className="media-item-2 tooltip-ice-scoop"
          objectPosition="center bottom"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </section>
  );
};

export default IceCreamScoop;
