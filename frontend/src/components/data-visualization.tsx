// Data Visualization Project Hero Section
import { useEffect, useState, useRef } from 'react';
import client from '../utils/sanity';
import { useVideoVisibility } from '../utils/video-observer.tsx';
import ToolBar from '../utils/toolbar.tsx';

const DataVisualizationBlock = ({ onIdleChange }) => {
  const [data, setData] = useState(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useVideoVisibility(videoRef, containerRef);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "mediaBlock" && title match "Data Visualization"][0]{
          mediaOne { alt, asset->{url, _type} }
        }`
      )
      .then(setData);
  }, []);

  if (!data) return null;

  const isVideo =
    data.mediaOne?.asset._type === 'sanity.fileAsset' &&
    data.mediaOne?.asset.url.match(/\.(mp4|webm|ogg)$/);

  const altText = data.mediaOne?.alt || 'Data Visualization';

  return (
    <section ref={containerRef} className="block-type-1" id="block-d" style={{ position: 'relative' }}>
      <ToolBar onIdleChange={onIdleChange} />

      <div
        className="media-content"
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
        }}
      >
        {isVideo ? (
          <video
            ref={videoRef}
            src={data.mediaOne.asset.url}
            loop
            playsInline
            muted
            preload="metadata"
            id="data-visualization-media"
            aria-label={altText}
            data-tooltip-id="global-tooltip"
            data-tooltip-key="data-viz"
            data-tooltip-content=" "
            style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'all' }}
          />
        ) : (
          <img
            src={data.mediaOne?.asset.url}
            alt={altText}
            className="media-item"
            id="data-visualization-media"
            data-tooltip-id="global-tooltip"
            data-tooltip-key="data-viz"
            data-tooltip-content=" "
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </section>
  );
};

export default DataVisualizationBlock;
