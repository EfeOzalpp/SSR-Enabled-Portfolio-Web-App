// Ice Cream Scoop Project Hero Section
import { useEffect, useRef, useState } from 'react';
import client from '../utils/sanity';
import SplitDragHandler from '../utils/split-controller.tsx';
import { useVideoVisibility } from '../utils/video-observer.tsx';
import ToolBar from '../utils/toolbar.tsx';
import { setTooltipInfo } from '../utils/global-tooltip.tsx';

const IceCreamScoop = ({ onIdleChange }) => {
  const [data, setData] = useState(null);
  const [split, setSplit] = useState(() => (window.innerWidth < 768 ? 45 : 50));
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useVideoVisibility(videoRef, containerRef);

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    client
      .fetch(`*[_type == "mediaBlock" && title match "Ice Scoop"][0]{
        mediaOne { alt, asset->{url, _type} },
        mediaTwo { alt, asset->{url, _type} },
        tags
      }`)
      .then((res) => {
        setData(res);
        if (res?.tags?.length) {
          setTooltipInfo({
            tags: res.tags,
            backgroundColor: 'rgba(147, 149, 146, 0.6)',
          });
        }
      });
  }, []);

  if (!data) return null;

  const isVideo =
    data.mediaTwo?.asset._type === 'sanity.fileAsset' &&
    data.mediaTwo?.asset.url.match(/\.(mp4|webm|ogg)$/);

  return (
    <section ref={containerRef} className="block-type-1" id="block-i" style={{ position: 'relative' }}>

      <ToolBar onIdleChange={onIdleChange} />

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
          src={data.mediaOne?.asset.url}
          alt={data.mediaOne?.alt || 'Visual content'}
          data-tooltip-id="global-tooltip"
          data-tooltip-key="ice-scoop"
          className="media-item-1"
          id="icecream-media-1"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <SplitDragHandler split={split} setSplit={setSplit} isPortrait={isPortrait} />

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
        {isVideo ? (
          <video
            ref={videoRef}
            src={data.mediaTwo.asset.url}
            className="media-item-2"
            id="icecream-media-2"
            loop
            playsInline
            muted
            preload="metadata"
            aria-label={data.mediaTwo?.alt || 'Video content'}
            data-tooltip-id="global-tooltip"
            data-tooltip-key="ice-scoop"
            style={{ pointerEvents: 'all', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            src={data.mediaTwo?.asset.url}
            alt={data.mediaTwo?.alt || 'Visual content'}
            data-tooltip-id="global-tooltip"
            data-tooltip-key="ice-scoop"
            className="media-item-2"
            id="icecream-media-2"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </section>
  );
};

export default IceCreamScoop;
