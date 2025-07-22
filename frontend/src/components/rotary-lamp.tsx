import { useEffect, useRef, useState } from 'react';
import client from '../utils/sanity';
import SplitDragHandler from '../utils/split-controller.tsx';

const RotaryLamp = () => {
  const [data, setData] = useState(null);
  const videoRef = useRef(null);
  const [split, setSplit] = useState(() => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? 60 : 50;
  });

  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "mediaBlock" && title match "Rotary Lamp"][0]{
          mediaOne { alt, asset->{url, _type} },
          mediaTwo { alt, asset->{url, _type} },
          tags
        }`
      )
      .then(setData);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!data) return null;

  // Swap media based on orientation
  const media1 = isPortrait ? data.mediaOne : data.mediaTwo;
  const media2 = isPortrait ? data.mediaTwo : data.mediaOne;

  const isMedia1Video =
    media1?.asset._type === 'sanity.fileAsset' &&
    media1?.asset.url.match(/\.(mp4|webm|ogg)$/);

  const isMedia2Video =
    media2?.asset._type === 'sanity.fileAsset' &&
    media2?.asset.url.match(/\.(mp4|webm|ogg)$/);

  return (
    <section className="block-type-1" id="block-r" style={{ position: 'relative' }}>
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
            : { width: `${split}%`, height: '100%', position: 'absolute', left: 0 }
        }
      >
        {isMedia1Video ? (
          <video
            ref={videoRef}
            src={media1.asset.url}
            className="media-item-1"
            id="rotary-media-1"
            loop
            autoPlay
            playsInline
            muted
            preload="auto"
            style={{ pointerEvents: 'all', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            src={media1?.asset.url}
            alt={media1?.alt}
            className="media-item-1"
            id="rotary-media-1"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
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
            autoPlay
            playsInline
            muted
            preload="auto"
            style={{ pointerEvents: 'all', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            src={media2?.asset.url}
            alt={media2?.alt}
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
