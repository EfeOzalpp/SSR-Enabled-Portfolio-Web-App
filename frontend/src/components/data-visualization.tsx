// Data Visualization Project Hero Section
import { useEffect, useState, useRef } from 'react';
import client from '../utils/sanity';
import { useVideoVisibility } from '../utils/video-observer.tsx';
import ToolBar from '../utils/toolbar.tsx';
import { Tooltip } from 'react-tooltip';

const DataVisualizationBlock = () => {
  const [data, setData] = useState(null);
  const [mouseIdle, setMouseIdle] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useVideoVisibility(videoRef, containerRef);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "mediaBlock" && title match "Data Visualization"][0]{
          mediaOne { alt, asset->{url, _type} },
          tags
        }`
      )
      .then(setData);
  }, []);

  if (!data) return null;

  const isVideo =
    data.mediaOne?.asset._type === 'sanity.fileAsset' &&
    data.mediaOne?.asset.url.match(/\.(mp4|webm|ogg)$/);

  const altText = data.mediaOne?.alt || 'Data Visualization';

  const tooltipRGB = '10, 146, 205';
  const backgroundColor = `rgba(${tooltipRGB}, 0.6)`;

  return (
    <section ref={containerRef} className="block-type-1" id="block-d" style={{ position: 'relative' }}>
      <ToolBar onIdleChange={setMouseIdle} />

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
            data-tooltip-id="dv-tooltip"
            data-tooltip-content=" "
            style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'all' }}
          />
        ) : (
          <img
            src={data.mediaOne?.asset.url}
            alt={altText}
            className="media-item"
            id="data-visualization-media"
            data-tooltip-id="dv-tooltip"
            data-tooltip-content=" "
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      <Tooltip
        id="dv-tooltip"
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

export default DataVisualizationBlock;
