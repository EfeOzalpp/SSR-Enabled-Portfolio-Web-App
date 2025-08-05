// src/components/IceCreamScoop.tsx
import { useEffect, useState } from 'react';
import client from '../utils/sanity';
import SplitDragHandler from '../utils/split-controller.tsx';
import MediaLoader from '../utils/media-loader.tsx'; 

const IceCreamScoop = () => {
  const [data, setData] = useState(null);
  const [split, setSplit] = useState(() => (window.innerWidth < 1024 ? 45 : 50));
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    client
      .fetch(`*[_type == "mediaBlock" && title match "Ice Scoop"][0]{
        mediaOne { alt, asset->{url, _type} },
        mediaTwo { alt, asset->{url, _type} }
      }`)
      .then(setData);
  }, []);

  if (!data) return null;

  const isVideo =
    data.mediaTwo?.asset._type === 'sanity.fileAsset' &&
    data.mediaTwo?.asset.url.match(/\.(mp4|webm|ogg)$/);

  return (
    <section
      className="block-type-1"
      id="block-i"
      style={{ position: 'relative' }}
    >
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
          src={data.mediaOne?.asset.url}
          alt={data.mediaOne?.alt}
          id="icecream-media-1"
          className="media-item-1 tooltip-ice-scoop"
          objectPosition="left center"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <SplitDragHandler split={split} setSplit={setSplit} isPortrait={isPortrait} />

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
          type={isVideo ? 'video' : 'image'}
          src={data.mediaTwo?.asset.url}
          alt={data.mediaTwo?.alt}
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
