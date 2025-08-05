// src/components/DataVisualizationBlock.tsx
import { useEffect, useState } from 'react';
import client from '../utils/sanity';
import MediaLoader from '../utils/media-loader.tsx';

const DataVisualizationBlock = () => {
  const [data, setData] = useState<{
    mediaOne?: {
      alt?: string;
      asset: { url: string; _type: string };
    };
  } | null>(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "mediaBlock" && title match "Data Visualization"][0]{
          mediaOne { alt, asset->{url, _type} }
        }`
      )
      .then(setData);
  }, []);

  if (!data || !data.mediaOne?.asset?.url) return null;

  const isVideo =
    data.mediaOne.asset._type === 'sanity.fileAsset' &&
    data.mediaOne.asset.url.match(/\.(mp4|webm|ogg)$/i);

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
          src={data.mediaOne.asset.url}
          alt={data.mediaOne.alt || 'Data Visualization'}
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
