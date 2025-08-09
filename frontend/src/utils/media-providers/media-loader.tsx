import { useRef, useState, useEffect } from 'react';
import { useVideoVisibility } from './video-observer.tsx';
import LoadingScreen from '../content-utility/loading.tsx';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import {
  getLowResImageUrl,
  getMediumImageUrl,
  getHighQualityImageUrl,
  urlFor,
} from './image-builder.js';

import {
  registerImage,
  notifyLowResLoaded,
  onAllLowResLoaded,
} from './image-upgrade-manager.ts';

type VideoSetSrc = {
  webmUrl?: string;
  mp4Url?: string;
  poster?: SanityImageSource | string;
};

type MediaLoaderProps = {
  type: 'image' | 'video';
  // image: Sanity image or URL string
  // video: URL string (legacy) OR {webmUrl, mp4Url, poster}
  src: string | SanityImageSource | VideoSetSrc;
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
  controls?: boolean; // handy for debugging
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
  controls = false,
}: MediaLoaderProps) => {
  const [loaded, setLoaded] = useState(false);      // first frame/LQIP loaded
  const [showMedium, setShowMedium] = useState(false);
  const [showHigh, setShowHigh] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // -------- IMAGE upgrade flow --------
  useEffect(() => {
    if (type === 'image') {
      registerImage(); // track this image as soon as it mounts
    }

    if (loaded && type === 'image') {
      const mediumTimer = setTimeout(() => setShowMedium(true), 200);
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
        setTimeout(() => setShowHigh(true), 300);
      });
    }

    if (id) {
      const event = new CustomEvent('mediaReady', { detail: { id } });
      window.dispatchEvent(event);
    }
  };

  // -------- VIDEO visibility/autoplay control --------
  useVideoVisibility(
    videoRef,
    containerRef,
    type === 'video' && enableVisibilityControl ? 0.4 : undefined
  );

  // no src? bail
  if (!src) return null;

  // ================= IMAGE =================
  if (type === 'image') {
    const ultraLowSrc = typeof src === 'string' ? src : getLowResImageUrl(src);
    const mediumSrc   = typeof src === 'string' ? src : getMediumImageUrl(src);
    const highResSrc  = typeof src === 'string' ? src : getHighQualityImageUrl(src);

    const resolvedSrc = showHigh ? highResSrc : showMedium ? mediumSrc : ultraLowSrc;

    return (
      <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
        {!loaded && (
          <div className="absolute inset-0 z-10">
            <LoadingScreen isFullScreen={false} />
          </div>
        )}

        <img
          loading={priority ? 'eager' : 'lazy'}
          id={id}
          src={resolvedSrc}
          alt={alt}
          onLoad={onMediaLoaded}
          onError={(e) =>
            console.warn('Image failed', (e.target as HTMLImageElement).src)
          }
          className={className}
          draggable={false}
          style={{
            ...style,
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'filter 0.5s ease, opacity 0.3s ease',
          }}
        />
      </div>
    );
  }

  // ================= VIDEO =================
  const isVideoSetObj =
    typeof src === 'object' &&
    // if it's a SanityImageSource it will have an asset key; we only treat it as videoSet when it doesn't
    !('asset' in (src as any)) &&
    (('webmUrl' in (src as any)) || ('mp4Url' in (src as any)));

  const vs = (isVideoSetObj ? (src as VideoSetSrc) : undefined);
  const legacyVideoUrl = typeof src === 'string' ? src : undefined;

  const posterUrl =
    vs?.poster
      ? (typeof vs.poster === 'string'
          ? vs.poster
          : urlFor(vs.poster).width(1200).quality(80).auto('format').url())
      : undefined;

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!loaded && (
        <div className="absolute inset-0 z-10">
          <LoadingScreen isFullScreen={false} />
        </div>
      )}

      <video
        id={id}
        ref={videoRef}
        onLoadedData={onMediaLoaded}
        onError={(e) => console.warn('Video failed', e)}
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
        controls={controls}
        // Safari quirks
        // @ts-ignore
        defaultMuted={muted}
        poster={posterUrl}
      >
        {/* Prefer WebM, then MP4, else legacy single URL */}
        {vs?.webmUrl && <source src={vs.webmUrl} type="video/webm" />}
        {vs?.mp4Url  && <source src={vs.mp4Url}  type="video/mp4" />}
        {!vs?.webmUrl && !vs?.mp4Url && legacyVideoUrl && <source src={legacyVideoUrl} />}
      </video>
    </div>
  );
};

export default MediaLoader;
