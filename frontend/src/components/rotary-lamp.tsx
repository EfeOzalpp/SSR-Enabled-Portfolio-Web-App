// Rotary lamp hero section
import { useEffect, useRef, useState } from 'react';
import client from '../utils/sanity';
import SplitDragHandler from '../utils/split-controller.tsx';
import ToolBar from '../utils/toolbar.tsx';
import { useVideoVisibility } from '../utils/video-observer.tsx';
import { Tooltip } from 'react-tooltip';

const RotaryLamp = () => {
  const [data, setData] = useState(null);
  const [split, setSplit] = useState(() => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? 55 : 50;
  });
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const [mouseIdle, setMouseIdle] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useVideoVisibility(videoRef, containerRef);

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

  const tooltipRGB = '85, 95, 90';
  const backgroundColor = `rgba(${tooltipRGB}, 0.6)`;

  return (
    <section ref={containerRef} className="block-type-1" id="block-r" style={{ position: 'relative' }}>
      <ToolBar onIdleChange={setMouseIdle} />

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
        <img
          src={media1?.asset.url}
          alt={alt1}
          className="media-item-1"
          id="rotary-media-1"
          data-tooltip-id="rotary-tooltip"
          data-tooltip-content=" "
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
            data-tooltip-id="rotary-tooltip"
            data-tooltip-content=" "
            style={{ pointerEvents: 'all', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            src={media2?.asset.url}
            alt={alt2}
            className="media-item-2"
            id="rotary-media-2"
            data-tooltip-id="rotary-tooltip"
            data-tooltip-content=" "
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      <Tooltip
        id="rotary-tooltip"
        place="top"
        float
        positionStrategy="absolute"
        unstyled
        noArrow
        className={mouseIdle ? 'tooltip-hidden' : ''}
        style={{
          backgroundColor,
        }}
        render={() => (
          <div className="custom-tooltip-blur">
            {data.tags && data.tags.length > 0 ? (
              data.tags.map((tag, i) => (
                <span key={i} className="tooltip-tag">{tag}</span>
              ))
            ) : (
              <p className="tooltip-tag">No tags</p>
            )}
          </div>
        )}
      />
    </section>
  );
};

export default RotaryLamp;
