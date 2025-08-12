import React, { useEffect, useState, useRef } from 'react';
import client from '../utils/sanity';
import DynamicAppInbound from '../dynamic-app/dynamic-app-shadow.jsx';
import { useDynamicOverlay } from '../utils/content-utility/dynamic-overlay';
import { useSsrData } from '../utils/context-providers/ssr-data-context';
import { useRealMobileViewport } from '../utils/content-utility/real-mobile';

import '../styles/block-type-a.css';

const getDeviceType = (w: number): 'phone' | 'tablet' | 'laptop' =>
  w < 768 ? 'phone' : w < 1025 ? 'tablet' : 'laptop';

// 1x1 transparent PNG (keeps <img> real but invisible, no broken icon)
const BLANK_IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMB9qzG3iAAAAAASUVORK5CYII=';

const DEBOUNCE_MS = 150;

const DynamicApp = () => {
  const ssrData = useSsrData();
  const preloadedMap = ssrData?.preloaded?.dynamic || {}; // Preloaded SVG URLs map

  const [svgMap, setSvgMap] = useState<Record<string, string>>(preloadedMap);
  const [device, setDevice] = useState<'phone' | 'tablet' | 'laptop'>(getDeviceType(window.innerWidth));
  const [imgLoaded, setImgLoaded] = useState(false);

  const frameRef = useRef<HTMLImageElement>(null);
  const resizeTimer = useRef<number | null>(null);

  const overlaySize = useDynamicOverlay(frameRef);
  const isRealMobile = useRealMobileViewport();

  // Fetch SVG URLs only if no SSR data
  useEffect(() => {
    if (Object.keys(svgMap).length > 0) return; // already have SSR map
    client
      .fetch(
        `*[_type == "svgAsset" && title in ["Laptop", "Tablet", "Phone"]]{
          title,
          file { asset->{url} }
        }`
      )
      .then((results: any[]) => {
        const map: Record<string, string> = {};
        results.forEach((item: any) => {
          map[item.title.toLowerCase()] = item.file?.asset?.url;
        });
        setSvgMap(map);
      })
      .catch((err) => {
        console.warn('[DynamicApp] Failed to fetch SVG assets:', err);
      });
  }, [svgMap]);

  // Debounced device type change
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimer.current) window.clearTimeout(resizeTimer.current);
      resizeTimer.current = window.setTimeout(() => {
        const next = getDeviceType(window.innerWidth);
        setDevice((prev) => {
          if (prev !== next) {
            setImgLoaded(false);
            return next;
          }
          return prev;
        });
      }, DEBOUNCE_MS);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      if (resizeTimer.current) window.clearTimeout(resizeTimer.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const svgUrl = svgMap[device];

  // Handle cached image load state
  useEffect(() => {
    if (svgUrl) {
      const img = frameRef.current;
      if (img && img.complete) {
        setImgLoaded(true);
      } else {
        setImgLoaded(false);
      }
    } else {
      setImgLoaded(false);
    }
  }, [svgUrl]);

  return (
    <section className="block-type-a">
      <div className="device-wrapper">
        <img
          ref={frameRef}
          src={svgUrl || BLANK_IMG}
          alt={device}
          className={`device-frame ${device}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          draggable={false}
          style={{
            visibility: svgUrl ? 'visible' : 'hidden',
            opacity: imgLoaded && svgUrl ? 1 : 0,
            transition: 'opacity 150ms ease',
          }}
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
              : {}
          }
        >
          <DynamicAppInbound onFocusChange={() => {}} />
        </div>
      </div>
    </section>
  );
};

export default DynamicApp;
