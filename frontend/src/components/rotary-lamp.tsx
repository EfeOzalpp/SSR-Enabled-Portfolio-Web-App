// src/sections/RotaryLamp.tsx
import { useEffect, useRef, useState } from 'react';
import client from '../utils/sanity';
import SplitDragHandler from '../utils/split-controller.tsx';
import { useVideoVisibility } from '../utils/video-observer.tsx';

const RotaryLamp = () => {
  const [data, setData] = useState(null);
  const [split, setSplit] = useState(() => (window.innerWidth < 768 ? 55 : 50));
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useVideoVisibility(videoRef, containerRef);

  useEffect(() => {
    const fetchData = async () => {
      const res = await client.fetch(
        `*[_type == "mediaBlock" && title match "Rotary Lamp"][0]{
          mediaOne { alt, tags, asset->{url, _type} },
          mediaTwo { alt, tags, asset->{url, _type} }
        }`
      );
      setData(res);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!data) return null;

  const media1 = isPortrait ? data.mediaOne : data.mediaTwo;
  const media2 = isPortrait ? data.mediaTwo : data.mediaOne;

  const isMedia2Video =
    media2?.asset._type === 'sanity.fileAsset' &&
    media2?.asset.url.match(/\.(mp4|webm|ogg)$/);

  const alt1 = media1?.alt || 'Rotary Lamp media';
  const alt2 = media2?.alt || 'Rotary Lamp media';

  return (
    <section
      ref={containerRef}
      className="block-type-1"
      id="block-r"
      style={{ position: 'relative' }}
    >
      <div
        className="media-content-1"
        style={
          isPortrait
            ? {
                height: split <= 15 ? '0%' : `${split}%`,
                width: '100%',
                position: 'absolute',
                top: 0,
                transition: split <= 15 ? 'height 0.1s ease' : 'none',
              }
            : {
                width: `${split}%`,
                height: '100%',
                position: 'absolute',
                left: 0,
              }
        }
      >
        <img
          src={media1?.asset.url}
          alt={alt1}
          className="media-item-1"
          id="rotary-media-1"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <SplitDragHandler split={split} setSplit={setSplit} />

      <div
        className="media-content-2"
        style={
          isPortrait
            ? {
                height: split <= 25 ? '100%' : `${100 - split}%`,
                width: '100%',
                position: 'absolute',
                top: split <= 25 ? '0%' : `${split}%`,
                transition: split <= 25 ? 'height 0.1s ease, top 0.1s ease' : 'none',
              }
            : {
                width: `${100 - split}%`,
                height: '100%',
                position: 'absolute',
                left: `${split}%`,
              }
        }
      >
        {isMedia2Video ? (
          <video
            ref={videoRef}
            src={media2.asset.url}
            className="media-item-2"
            id="rotary-media-2"
            loop
            playsInline
            muted
            preload="metadata"
            aria-label={alt2}
            style={{
              pointerEvents: 'all',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <img
            src={media2?.asset.url}
            alt={alt2}
            className="media-item-2"
            id="rotary-media-2"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </section>
  );
};

export default RotaryLamp;
