// src/components/DataVisualizationBlock.tsx
import { useEffect, useState } from 'react';
import client from '../utils/sanity';
import MediaLoader from '../utils/media-providers/media-loader';
import { useTooltipInit } from '../utils/tooltip/tooltipInit';
import { useSsrData } from '../utils/context-providers/ssr-data-context';
import '../styles/block-type-1.css';

type VideoSet = {
  webmUrl?: string;
  mp4Url?: string;
  poster?: any; 
};

type MediaSlot = {
  alt?: string;
  image?: any;
  video?: VideoSet;
};

type DataVizData = {
  mediaOne: MediaSlot;
};

const DataVisualizationBlock = () => {
  const ssrData = useSsrData(); // <-- read from SSR context
  const [data, setData] = useState<DataVizData | null>(
    (ssrData?.preloaded?.dataviz as DataVizData) || null
  );

  useTooltipInit();

  // Fetch data from Sanity
useEffect(() => {
  if (data) return; // already have SSR data
  client
   .fetch<DataVizData>(
      `*[_type == "mediaBlock" && slug.current == $slug][0]{
        mediaOne{
          alt,
          image,
          video{
            "webmUrl": webm.asset->url,
            "mp4Url": mp4.asset->url,
            poster
          }
        }
      }`,
      { slug: 'data-viz' }
    )
    .then(setData)
    .catch((err: any) => {
      console.warn('[DataVisualizationBlock] GROQ fetch failed:', err);
      setData(null);
    });
}, []);


  if (!data || !data.mediaOne) return null;

  const { alt = 'Data Visualization', image, video } = data.mediaOne;

  const isVideo = Boolean(video?.webmUrl || video?.mp4Url);

  return (
    <section
      className="block-type-1"
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
          src={isVideo ? video! : image}
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
