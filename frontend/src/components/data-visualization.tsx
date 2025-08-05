// src/components/DataVisualizationBlock.tsx
import { useEffect, useState, useRef } from 'react';
import client from '../utils/sanity';
import MediaLoader from '../utils/media-providers/media-loader.tsx';

const DataVisualizationBlock = () => {
  const [data, setData] = useState<{
    mediaOne?: {
      alt?: string;
      image?: any;
      video?: {
        asset?: {
          url?: string;
        };
      };
    };
  } | null>(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "mediaBlock" && title match "Data Visualization"][0]{
          mediaOne {
            alt,
            image,
            video { asset->{url} }
          }
        }`
      )
      .then(setData);
  }, []);

  if (!data || !data.mediaOne) return null;

  const { alt = 'Data Visualization', image, video } = data.mediaOne;

  const videoUrl = video?.asset?.url;
  const isVideo = Boolean(videoUrl?.match(/\.(mp4|webm|ogg)$/i));

  return (
    <section
      className="block-type-1"
      id="block-d"
      style={{ position: 'relative' }}
    >
      <div
        className="media-content"
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
        }}
      >
        <MediaLoader
          type={isVideo ? 'video' : 'image'}
          src={isVideo ? videoUrl! : image}
          alt={alt}
          id="block-d"
          className="tooltip-data-viz"
          objectPosition="center center"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </section>
  );
};

export default DataVisualizationBlock;
