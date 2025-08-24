// src/utils/media-providers/media-loader.tsx
import { useRef, useState, useEffect } from 'react';
import { useVideoVisibility } from './video-observer';
import LoadingScreen from '../loading/loading';
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
  src: string | SanityImageSource | VideoSetSrc | null | undefined;
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
  const isSSR = typeof window === 'undefined';

  // Start as loaded in SSR to avoid fade-in on hydration
  const [loaded, setLoaded] = useState(isSSR);
  const [showMedium, setShowMedium] = useState(false);
  const [showHigh, setShowHigh] = useState(false);

  // Native poster control (no overlay)
  const [posterRemoved, setPosterRemoved] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isNear = useNearViewport(containerRef);
  const shouldStart = priority || isNear;

  // If already cached, skip fade-in
  useEffect(() => {
    if (type === 'image' && imgRef.current?.complete) {
      setLoaded(true);
    }
    if (type === 'video' && videoRef.current?.readyState >= 2) {
      setLoaded(true);
    }
  }, [type]);

  // IMAGE progressive upgrade
  useEffect(() => {
    if (type !== 'image') return;
    registerImage();

    const t1 = setTimeout(() => setShowMedium(true), shouldStart ? 0 : 2000);
    if (shouldStart) setShowMedium(true);

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

  // VIDEO visibility/autoplay
  useVideoVisibility(
    videoRef,
    containerRef,
    type === 'video' && enableVisibilityControl ? 0.4 : (undefined as unknown as number)
  );

  // Preload video metadata only when near (avoid overfetch)
  useEffect(() => {
    if (type !== 'video' || !videoRef.current) return;
    const v = videoRef.current;
    let loadedOnce = false;

    const start = () => {
      if (loadedOnce) return;
      loadedOnce = true;
      v.preload = shouldStart ? (preload ?? 'metadata') : (preload ?? 'none');
      try { if (shouldStart && v.preload !== 'none') v.load(); } catch {}
    };

    if (shouldStart) {
      start();
    } else {
      const t = setTimeout(start, 2000);
      return () => clearTimeout(t);
    }
  }, [type, shouldStart, preload]);

  // ----- Video source parsing + poster URL (for native poster prop) -----
  const isVideoSetObj =
    typeof src === 'object' && src !== null && !('asset' in (src as any)) &&
    (('webmUrl' in (src as any)) || ('mp4Url' in (src as any)));

  const vs = (isVideoSetObj ? (src as VideoSetSrc) : undefined);
  const legacyVideoUrl = typeof src === 'string' ? src : undefined;

  const posterUrl =
    vs?.poster
      ? (typeof vs.poster === 'string'
          ? vs.poster
          : urlFor(vs.poster).width(1200).quality(80).auto('format').url())
      : undefined;

  // ✅ Keep native poster visible until the first **painted** frame, then remove it.
  useEffect(() => {
    if (type !== 'video' || !videoRef.current) return;
    const v = videoRef.current;

    const hidePoster = () => {
      setPosterRemoved(true);
      v.removeAttribute('poster');
    };

    const onPlay = () => {
      const anyV = v as any;
      if (typeof anyV.requestVideoFrameCallback === 'function') {
        anyV.requestVideoFrameCallback(() => hidePoster());
      } else {
        // Fallback: wait until time has advanced and at least a frame is decoded
        const onTime = () => {
          if (v.currentTime > 0 && v.readyState >= 2) {
            v.removeEventListener('timeupdate', onTime);
            hidePoster();
          }
        };
        v.addEventListener('timeupdate', onTime);
        // Safety: also hide after ~1.2s if no update (rare)
        const timer = setTimeout(() => {
          v.removeEventListener('timeupdate', onTime);
          hidePoster();
        }, 1200);
        return () => clearTimeout(timer);
      }
    };

    v.addEventListener('play', onPlay, { once: true });
    return () => v.removeEventListener('play', onPlay);
  }, [type]);

  const hasVideoSource = Boolean(vs?.webmUrl || vs?.mp4Url || legacyVideoUrl);
  if (!src || (type === 'video' && !hasVideoSource)) return null;

  // ====== IMAGE ======
  if (type === 'image') {
    const ultraLowSrc = typeof src === 'string' ? src : getLowResImageUrl(src);
    const mediumSrc   = typeof src === 'string' ? src : getMediumImageUrl(src);
    const highResSrc  = typeof src === 'string' ? src : getHighQualityImageUrl(src);

    const resolvedSrc = showHigh ? highResSrc : showMedium ? mediumSrc : ultraLowSrc;
    if (!resolvedSrc) return null;

    return (
      <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
        {!loaded && (
          <div className="absolute inset-0 z-10">
            <LoadingScreen isFullScreen={false} />
          </div>
        )}
        <img
          ref={imgRef}
          loading={priority ? 'eager' : undefined}
          fetchPriority={showHigh || priority ? 'high' : showMedium ? 'auto' : 'low'}
          id={id}
          src={resolvedSrc || undefined}
          alt={alt}
          onLoad={onMediaLoaded}
          onError={(e) => console.warn('Image failed', (e.target as HTMLImageElement).src)}
          className={className}
          draggable={false}
          style={{
            ...style,
            objectFit: 'cover',
            objectPosition,
            opacity: loaded ? 1 : 0,
            transition: isSSR ? 'none' : 'filter 0.5s ease, opacity 0.3s ease',
          }}
        />
      </div>
    );
  }

  // ====== VIDEO ======
  // Spinner only if NO poster to show and video isn't ready yet
  const showSpinner = !loaded && !posterUrl;

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {showSpinner && (
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
          transition: isSSR ? 'none' : 'opacity 0.3s ease',
          pointerEvents: 'all',
          zIndex: 1, // keep video above underlying backgrounds; poster is drawn by the video itself
        }}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload={preload ?? 'metadata'}
        controls={controls}
        poster={posterRemoved ? undefined : posterUrl}
      >
        {vs?.webmUrl && <source src={vs.webmUrl || undefined} type="video/webm" />}
        {vs?.mp4Url  && <source src={vs.mp4Url  || undefined} type="video/mp4"  />}
        {!vs?.webmUrl && !vs?.mp4Url && legacyVideoUrl && (
          <source src={legacyVideoUrl || undefined} />
        )}
      </video>
    </div>
  );
};

export default MediaLoader;
