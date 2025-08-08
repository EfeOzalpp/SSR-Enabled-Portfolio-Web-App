// src/components/MediaLoader.tsx
import { useRef, useState, useEffect } from 'react';
import { useVideoVisibility } from './video-observer.tsx';
import LoadingScreen from '../content-utility/loading.tsx';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import {
  getOptimizedImageUrl,
  getLowResImageUrl,
  getMediumImageUrl,
  getHighQualityImageUrl
} from './image-builder.js';

import {
  registerImage,
  notifyLowResLoaded,
  onAllLowResLoaded
} from './image-upgrade-manager.ts';

type MediaLoaderProps = {
  type: 'image' | 'video';
  src: string | SanityImageSource;
  alt?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  objectPosition?: string;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  enableVisibilityControl?: boolean;
  priority?: boolean;
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
  priority = false,
}: MediaLoaderProps) => {
  const [loaded, setLoaded] = useState(false); // LQIP loaded
  const [showMedium, setShowMedium] = useState(false); // show medium
  const [showHigh, setShowHigh] = useState(false); // finally upgrade
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Register image immediately + upgrade logic
  useEffect(() => {
    if (type === 'image') {
      registerImage(); // track this image as soon as it mounts
    }

    if (loaded && type === 'image') {
      // Upgrade to medium first
      const mediumTimer = setTimeout(() => setShowMedium(true), 200);

      // Then high-res later (after all low-res images load)
      onAllLowResLoaded(() => {
        setTimeout(() => setShowHigh(true), 500);
      });

      return () => clearTimeout(mediumTimer);
    }
  }, [loaded, type]);


  const onMediaLoaded = () => {
    setLoaded(true);

    if (type === 'image') {
      notifyLowResLoaded();
      onAllLowResLoaded(() => {
        setTimeout(() => setShowHigh(true), 300); // Slight delay
      });
    }

    if (id) {
      const event = new CustomEvent('mediaReady', { detail: { id } });
      window.dispatchEvent(event);
    }
  };

  // Auto handle visibility for videos
  useVideoVisibility(videoRef, containerRef, type === 'video' && enableVisibilityControl);
  
  // Early exit if there's no valid src
  if (!src) return null;

    // Resolve image sources
  const ultraLowSrc = typeof src === 'string' ? src : getLowResImageUrl(src);
  const mediumSrc = typeof src === 'string' ? src : getMediumImageUrl(src);
  const highResSrc = typeof src === 'string' ? src : getHighQualityImageUrl(src);

  // Priority: high > medium > ultra-low
  const resolvedSrc = type === 'image'
    ? showHigh ? highResSrc : showMedium ? mediumSrc : ultraLowSrc
    : highResSrc;

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {!loaded && (
        <div className="absolute inset-0 z-10">
          <LoadingScreen isFullScreen={false} />
        </div>
      )}
      
      {type === 'image' ? (
        <img
        loading={priority ? 'eager' : 'lazy'}
        id={id}
        src={resolvedSrc}
        alt={alt}
        onLoad={onMediaLoaded}
        className={className}
        draggable={false}
      style={{
        ...style,
        objectFit: 'cover',
        opacity: loaded ? 1 : 0,
        transition: 'filter 0.5s ease, opacity 0.3s ease',
          }}
        />
      ) : (
        <video
          id={id}
          ref={videoRef}
          src={resolvedSrc}
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
