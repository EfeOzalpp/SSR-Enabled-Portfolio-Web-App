// src/components/dynamic-app/frame.tsx
import React, { useEffect, useRef, useState } from 'react';
import client from '../../utils/sanity';
import { useDynamicOverlay } from '../../utils/content-utility/dynamic-overlay';
import { useSsrData } from '../../utils/context-providers/ssr-data-context';
import { useRealMobileViewport } from '../../utils/content-utility/real-mobile';
import '../../styles/block-type-a.css';

const getDeviceType = (w: number): 'phone' | 'tablet' | 'laptop' =>
  w < 768 ? 'phone' : w < 1025 ? 'tablet' : 'laptop';

const Frame: React.FC = () => {
  const ssrData = useSsrData();
  const preloadedMap = (ssrData?.preloaded?.dynamic as Record<string, string>) || {};
  const [svgMap, setSvgMap] = useState<Record<string, string>>(preloadedMap);
  const [device, setDevice] = useState<'phone' | 'tablet' | 'laptop'>(getDeviceType(typeof window !== 'undefined' ? window.innerWidth : 1200));
  const [imgLoaded, setImgLoaded] = useState(false);
  const [fetchErr, setFetchErr] = useState<string | null>(null);

  const frameRef = useRef<HTMLImageElement>(null);
  const overlaySize = useDynamicOverlay(frameRef);
  const isRealMobile = useRealMobileViewport();

  useEffect(() => {
    const onResize = () => setDevice(getDeviceType(window.innerWidth));
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  useEffect(() => {
    if (Object.keys(svgMap).length > 0) return;
    client.fetch(
      `*[_type == "svgAsset" && title in ["Laptop", "Tablet", "Phone"]]{
        title, file { asset->{url} }
      }`
    )
    .then((results: any[]) => {
      const map: Record<string, string> = {};
      results.forEach((r: any) => { map[r.title.toLowerCase()] = r.file?.asset?.url; });
      setSvgMap(map);
    })
    .catch((err) => {
      setFetchErr('assets-unavailable');
      console.warn('[Frame] fetch SVG failed:', err);
    });
  }, [svgMap]);

  const svgUrl = svgMap[device];

  useEffect(() => {
    const img = frameRef.current;
    setImgLoaded(Boolean(img && img.complete && svgUrl));
  }, [svgUrl]);

  return (
    <section className="block-type-a">
      <div className="device-wrapper">
        <img
          ref={frameRef}
          id="dynamic-device-frame"
          src={svgUrl || ''}
          alt={device}
          className={`device-frame ${device}`}
          decoding="async"
          loading="eager"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          draggable={false}
          style={{
            visibility: svgUrl ? 'visible' : 'hidden',
            opacity: imgLoaded && svgUrl ? 1 : 0,
            transition: 'opacity 150ms ease',
          }}
          data-src-laptop={svgMap['laptop'] || ''}
          data-src-tablet={svgMap['tablet'] || ''}
          data-src-phone={svgMap['phone'] || ''}
          data-device={device}
        />

        <div
          className="screen-overlay"
          style={
            device === 'phone'
              ? {
                  width: `${overlaySize.width}px`,
                  height: isRealMobile
                    ? `${overlaySize.heightSet1}svh`
                    : `${overlaySize.heightSet2}px`,
                }
              : undefined
          }
        />

        {fetchErr && <div className="soft-warning">media frame unavailable</div>}
      </div>
    </section>
  );
};

export default Frame;
