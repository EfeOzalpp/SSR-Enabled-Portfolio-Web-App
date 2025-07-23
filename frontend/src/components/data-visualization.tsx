// Data Visualization Project
import { useEffect, useState, useRef } from 'react';
import client from '../utils/sanity';

const DataVisualizationBlock = () => {
  const [data, setData] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "mediaBlock" && title match "Data Visualization"][0]{
          mediaOne { alt, asset->{url, _type} }
        }`
      )
      .then(setData);
  }, []);

    useEffect(() => {
    if (videoRef.current) {
        const video = videoRef.current;
        video.muted = true;
        video.play()
        .then(() => {
            video.playbackRate = 0.8; // Slow down by 20%
        })
        .catch(() => {});
    }
    }, [data]);

  if (!data) return null;

  const isVideo =
    data.mediaOne?.asset._type === 'sanity.fileAsset' &&
    data.mediaOne?.asset.url.match(/\.(mp4|webm|ogg)$/);

  return (
    <section className="block-type-1" id="block-d" style={{ position: 'relative' }}>
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
            autoPlay
            playsInline
            muted
            preload="auto"
            id="data-visualization-media"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            src={data.mediaOne?.asset.url}
            alt={data.mediaOne?.alt || 'Data Visualization'}
            className="media-item"
            id="data-visualization-media"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </section>
  );
};

export default DataVisualizationBlock;
