import React, { useEffect, useState, useRef } from 'react';
import client from '../utils/sanity';
import DynamicAppInbound from '../dynamic-app/dynamic-app-shadow.jsx';
import { useDynamicOverlay } from '../utils/content-utility/dynamic-overlay.ts';
import { useRealMobileViewport } from '../utils/content-utility/real-mobile.ts';

import '../styles/block-type-a.css';

const getDeviceType = (w: number): 'phone' | 'tablet' | 'laptop' =>
  w < 768 ? 'phone' : w < 1025 ? 'tablet' : 'laptop';

// 1x1 transparent PNG (keeps <img> real but invisible, no broken icon)
const BLANK_IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMB9qzG3iAAAAAASUVORK5CYII=';

const DEBOUNCE_MS = 150;

const DynamicApp = () => {
  const [svgMap, setSvgMap] = useState<Record<string, string>>({});
  const [device, setDevice] = useState<'phone' | 'tablet' | 'laptop'>(getDeviceType(window.innerWidth));
  const [imgLoaded, setImgLoaded] = useState(false);

  const frameRef = useRef<HTMLImageElement>(null);
  const resizeTimer = useRef<number | null>(null);

  // measure overlay against the <img>
  const overlaySize = useDynamicOverlay(frameRef);
  const isRealMobile = useRealMobileViewport();

  // fetch SVG urls
  useEffect(() => {
    client
      .fetch(`*[_type == "svgAsset" && title in ["Laptop", "Tablet", "Phone"]]{
        title,
        file { asset->{url} }
      }`)
      .then((results: any[]) => {
        const map: Record<string, string> = {};
        results.forEach((item: any) => {
          map[item.title.toLowerCase()] = item.file?.asset?.url;
        });
        setSvgMap(map);
      });
  }, []);

  // responsive device — ONLY clear loaded if the device bucket changes (debounced)
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimer.current) window.clearTimeout(resizeTimer.current);
      resizeTimer.current = window.setTimeout(() => {
        const next = getDeviceType(window.innerWidth);
        setDevice(prev => {
          if (prev !== next) {
            setImgLoaded(false); // src will change; safe to wait for onLoad
            return next;
          }
          return prev; // do NOT touch imgLoaded
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

  // when URL changes, mark not loaded so onLoad will reflow; handle cached images
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
        {/* Always render the img so measurements work; swap src when ready */}
        <img
          ref={frameRef}
          src={svgUrl || BLANK_IMG}
          alt={device}
          className={`device-frame ${device}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)} // don't stay hidden on error
          draggable={false}
          // Keep it in the flow; fade it instead of hiding visibility.
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
                  height: isRealMobile ? `${overlaySize.heightSet1}svh` : `${overlaySize.heightSet2}px`,
                }
              : {}
          }
        >
          <DynamicAppInbound />
        </div>
      </div>
    </section>
  );
};

export default DynamicApp;
