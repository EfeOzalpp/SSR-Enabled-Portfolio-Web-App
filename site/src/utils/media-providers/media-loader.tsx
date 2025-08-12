// MediaLoader
import { useRef, useState, useEffect } from 'react';
import { useVideoVisibility } from './video-observer';
import LoadingScreen from '../content-utility/loading';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import {
  getLowResImageUrl,
  getMediumImageUrl,
  getHighQualityImageUrl,
  urlFor,
} from './image-builder';
import {
  registerImage,
  notifyLowResLoaded,
  onAllLowResLoaded,
} from './image-upgrade-manager';

function useNearViewport<T extends Element>(
  ref: React.RefObject<T>,
  { rootMargin = '900px 0px', threshold = 0, once = true } = {}
) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    if (!ref.current || near) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          if (once) io.disconnect();
        }
      },
      { rootMargin, threshold }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, near, rootMargin, threshold, once]);
  return near;
}

type VideoSetSrc = {
  webmUrl?: string;
  mp4Url?: string;
  poster?: SanityImageSource | string;
};

type MediaLoaderProps = {
  type: 'image' | 'video';
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
  controls?: boolean;
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

  const isNear = useNearViewport(containerRef);
  const shouldStart = priority || isNear;

  // IMAGE upgrade flow
  useEffect(() => {
    if (type !== 'image') return;
    registerImage();

    // start medium once near (or after 2s as a safety)
    const t1 = setTimeout(() => setShowMedium(true), shouldStart ? 0 : 2000);
    if (shouldStart) setShowMedium(true);

    // upgrade to high when all low-res are in OR 5s safety
    const off = () => setTimeout(() => setShowHigh(true), 300);
    onAllLowResLoaded(off);
    const t2 = setTimeout(() => setShowHigh(true), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [type, shouldStart]);

  const onMediaLoaded = () => {
    setLoaded(true);
    if (type === 'image') notifyLowResLoaded();

    if (id) {
      const event = new CustomEvent('mediaReady', { detail: { id } });
      window.dispatchEvent(event);
    }
  };

  // VIDEO visibility/autoplay + fetch control
  useVideoVisibility(
    videoRef,
    containerRef,
    type === 'video' && enableVisibilityControl ? 0.4 : undefined
  );

  // kick off video fetching when near (or fallback after 2s)
  useEffect(() => {
    if (type !== 'video' || !videoRef.current) return;
    const v = videoRef.current;
    const start = () => {
      // switch to metadata so the browser actually fetches
      if (v.preload !== 'metadata') v.preload = 'metadata';
      // if sources are present, ensure load is called
      try { v.load(); } catch {}
    };
    if (shouldStart) start();
    const t = setTimeout(start, 2000);
    return () => clearTimeout(t);
  }, [type, shouldStart]);

  if (!src) return null;

  // ============== IMAGE ==============
  if (type === 'image') {
    // Always render LQIP immediately; upgrade sources via state
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
            loading={priority ? 'eager' : undefined} // undefined → default
            fetchPriority={showHigh || priority ? 'high' : showMedium ? 'auto' : 'low'}
            id={id}
            src={resolvedSrc}
            alt={alt}
            onLoad={onMediaLoaded}
            onError={(e) => console.warn('Image failed', (e.target as HTMLImageElement).src)}
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

  // ============== VIDEO ==============
  const isVideoSetObj =
    typeof src === 'object' && !('asset' in (src as any)) &&
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
        // start conservative; we'll bump to 'metadata' and call load() when near
        preload="none"
        controls={controls}
        poster={posterUrl}
        {...(muted ? { defaultmuted: true } : {})}
      >
        {vs?.webmUrl && <source src={vs.webmUrl} type="video/webm" />}
        {vs?.mp4Url  && <source src={vs.mp4Url}  type="video/mp4"  />}
        {!vs?.webmUrl && !vs?.mp4Url && legacyVideoUrl && <source src={legacyVideoUrl} />}
      </video>
    </div>
  );
};

export default MediaLoader;
