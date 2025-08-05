// src/components/MediaLoader.tsx
import { useRef, useState } from 'react';
import { useVideoVisibility } from './video-observer.tsx'; 
import LoadingScreen from './loading.tsx';

type MediaLoaderProps = {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  objectPosition?: string;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  enableVisibilityControl?: boolean; // Optional toggle
};

const MediaLoader = ({
  type,
  src,
  alt = '',
  id,
  className = '',
  style = {},
  objectPosition = 'center center',
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'metadata',
  enableVisibilityControl = true,
}: MediaLoaderProps) => {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMediaLoaded = () => {
    setLoaded(true);

    if (id) {
      const event = new CustomEvent('mediaReady', { detail: { id } });
      window.dispatchEvent(event);
    }
  };

    // Automatically handle visibility for videos
    useVideoVisibility(
    type === 'video' && enableVisibilityControl ? videoRef : null,
    type === 'video' && enableVisibilityControl ? containerRef : null
    );

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
          <LoadingScreen isFullScreen={false} />
        </div>
      )}

      {type === 'image' ? (
        <img
          id={id}
          src={src}
          alt={alt}
          onLoad={onMediaLoaded}
          className={className}
          style={{
            ...style,
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      ) : (
        <video
          id={id}
          ref={videoRef}
          src={src}
          onLoadedData={onMediaLoaded}
          className={className}
          style={{
            ...style,
            objectFit: 'cover',
            objectPosition,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'all',
          }}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
        />
      )}
    </div>
  );
};

export default MediaLoader;
