// src/sections/RotaryLamp.tsx
import { useEffect, useRef, useState } from 'react';
import client from '../utils/sanity';
import SplitDragHandler from '../utils/split-controller';
import MediaLoader from '../utils/media-providers/media-loader';
import { useTooltipInit } from '../utils/tooltip/tooltipInit';
import '../styles/block-type-1.css';

const RotaryLamp = () => {
  const [data, setData] = useState(null);
  const [split, setSplit] = useState(() => (window.innerWidth < 768 ? 55 : 50));
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  useTooltipInit();
  // Fetch media block from Sanity
  useEffect(() => {
    const fetchData = async () => {
      const res = await client.fetch(`
        *[_type == "mediaBlock" && title match "Rotary Lamp"][0]{
          mediaOne {
            alt,
            image,
            video { asset->{url} }
          },
          mediaTwo {
            alt,
            image,
            video { asset->{url} }
          }
        }
      `);
      setData(res);
    };

    fetchData();
  }, []);

  // Handle orientation switch
  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!data) return null;

  const media1 = isPortrait ? data.mediaOne : data.mediaTwo;
  const media2 = isPortrait ? data.mediaTwo : data.mediaOne;

  const alt1 = media1?.alt || 'Rotary Lamp media';
  const alt2 = media2?.alt || 'Rotary Lamp media';

  return (
    <section className="block-type-1"
      style={{ position: 'relative' }}>
      {/* LEFT / TOP media */}
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
          id="rotary-media-1"
          className="media-item-1 tooltip-rotary-lamp"
        />
      </div>

      {/* SPLITTER */}
      <SplitDragHandler split={split} setSplit={setSplit} />

      {/* RIGHT / BOTTOM media */}
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
          type={media2?.video?.asset?.url ? 'video' : 'image'}
          src={media2?.video?.asset?.url || media2?.image}
          alt={alt2}
          id="rotary-media-2"
          className="media-item-2 tooltip-rotary-lamp"
        />
      </div>
    </section>
  );
};

export default RotaryLamp;
