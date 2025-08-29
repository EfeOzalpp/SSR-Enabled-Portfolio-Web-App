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
    if (type === 'image' && imgRef.current?.complete) setLoaded(true);
    if (type === 'video' && videoRef.current?.readyState >= 2) setLoaded(true);
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

  // ----- Video source parsing + poster URL -----
  const isVideoSetObj =
    typeof src === 'object' &&
    src !== null &&
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

  // ✅ Keep native poster visible until the first *painted* frame, then remove it.
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
        const onTime = () => {
          if (v.currentTime > 0 && v.readyState >= 2) {
            v.removeEventListener('timeupdate', onTime);
            hidePoster();
          }
        };
        v.addEventListener('timeupdate', onTime);
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

  // VIDEO visibility/autoplay (your existing hook takes care of play/pause)
  useVideoVisibility(
    videoRef,
    containerRef,
    type === 'video' && enableVisibilityControl ? 0.35 : (undefined as unknown as number)
  );

  // ─────────────────────────────────────────────────────────────
  // VIDEO RELIABILITY PATCHES
  // - Kick load when near
  // - Retry once, then promote preload to 'auto'
  // - Decode nudge for iOS Safari after loadedmetadata
  // - Early "loaded" on loadedmetadata to remove spinner sooner
  // - Gentle play kick when data is ready (muted+inline)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (type !== 'video' || !videoRef.current) return;
    const v = videoRef.current;

    let retryTimer: number | null = null;
    let promoteTimer: number | null = null;

    const clearTimers = () => {
      if (retryTimer) { window.clearTimeout(retryTimer); retryTimer = null; }
      if (promoteTimer) { window.clearTimeout(promoteTimer); promoteTimer = null; }
    };

    // If we’re near (or priority), ensure the browser actually fetches metadata
    const kickLoad = () => {
      try {
        // set the DOM property; the attribute React renders can be different and that's OK
        v.preload = preload ?? 'metadata';
        if (v.preload !== 'none') v.load(); // important: actually trigger the fetch
      } catch {}
    };

    const nudgeDecode = () => {
      // iOS Safari sometimes stalls after metadata; a tiny seek wakes decode
      try {
        if (v.readyState < 2) return;
        const t = v.currentTime;
        v.currentTime = t > 0 ? t : 0.001;
      } catch {}
    };

    const tryPlay = async () => {
      if (!enableVisibilityControl) return;
      try {
        if (v.muted && v.playsInline && v.paused && v.readyState >= 2) {
          await v.play().catch(() => {});
        }
      } catch {}
    };

    const onLoadedMeta = () => {
      // spinner can go away on metadata (poster is still covering until first frame)
      setLoaded(true);
      nudgeDecode();
    };

    const onLoadedData = () => { setLoaded(true); void tryPlay(); };
    const onCanPlay = () => { setLoaded(true); void tryPlay(); };

    if (shouldStart) {
      kickLoad();

      // If nothing after ~2.5s, try load() once more
      retryTimer = window.setTimeout(() => {
        if (v.readyState < 2) kickLoad();
      }, 2500);

      // Still nothing after ~5s? Promote preload to 'auto'
      promoteTimer = window.setTimeout(() => {
        if (v.readyState < 2) {
          try { v.preload = 'auto'; v.load(); } catch {}
        }
      }, 5000);
    }

    v.addEventListener('loadedmetadata', onLoadedMeta);
    v.addEventListener('loadeddata', onLoadedData);
    v.addEventListener('canplay', onCanPlay);

    // Optional: diagnostics for flaky networks
    const onError = (e: Event) => console.warn('Video error', e);
    const onStalled = () => console.warn('Video stalled');
    const onSuspend = () => {/* benign on many browsers */};
    v.addEventListener('error', onError);
    v.addEventListener('stalled', onStalled);
    v.addEventListener('suspend', onSuspend);

    return () => {
      clearTimers();
      v.removeEventListener('loadedmetadata', onLoadedMeta);
      v.removeEventListener('loadeddata', onLoadedData);
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('error', onError);
      v.removeEventListener('stalled', onStalled);
      v.removeEventListener('suspend', onSuspend);
    };
  }, [
    type,
    shouldStart,
    preload,
    enableVisibilityControl,
    // if any URL changes, re-run the loader watchdog
    isVideoSetObj,
    (vs && vs.webmUrl) || '',
    (vs && vs.mp4Url) || '',
    legacyVideoUrl || '',
  ]);

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
          <div className="absolute-inset">
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
  const showSpinner = !loaded;

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {showSpinner && (
        <div className="absolute-inset">
          <LoadingScreen isFullScreen={false} />
        </div>
      )}

      <video
        id={id}
        ref={videoRef}
        // treat loadeddata & metadata as “ready enough” for UI
        onLoadedData={onMediaLoaded}
        onLoadedMetadata={() => setLoaded(true)}
        onError={(e) => console.warn('Video failed', e)}
        className={className}
        style={{
          ...style,
          objectFit: 'cover',
          objectPosition,
          opacity: loaded ? 1 : 0,
          transition: isSSR ? 'none' : 'opacity 0.3s ease',
          pointerEvents: 'all',
          zIndex: 1,
        }}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload={preload ?? 'metadata'}
        controls={controls}
        // If you host poster/video on different origins and ever read pixels to <canvas>,
        // uncomment next line and ensure CORS headers exist:
        // crossOrigin="anonymous"
        poster={posterRemoved ? undefined : posterUrl}
      >
        {/* Order matters: prefer MP4 first for Safari reliability */}
        {vs?.mp4Url  && <source src={vs.mp4Url  || undefined} type="video/mp4"  />}
        {vs?.webmUrl && <source src={vs.webmUrl || undefined} type="video/webm" />}
        {!vs?.webmUrl && !vs?.mp4Url && legacyVideoUrl && (
          <source src={legacyVideoUrl || undefined} />
        )}
      </video>
    </div>
  );
};

export default MediaLoader;
