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

const DynamicApp = () => {
  const [svgMap, setSvgMap] = useState<Record<string, string>>({});
  const [device, setDevice] = useState<'phone'|'tablet'|'laptop'>(getDeviceType(window.innerWidth));
  const [imgLoaded, setImgLoaded] = useState(false);

  const frameRef = useRef<HTMLImageElement>(null);

  // measure overlay against the <img> (needs the element to exist!)
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
        results.forEach((item) => {
          map[item.title.toLowerCase()] = item.file?.asset?.url;
        });
        setSvgMap(map);
      });
  }, []);

  // responsive device
  useEffect(() => {
    const onResize = () => {
      const next = getDeviceType(window.innerWidth);
      setDevice((prev) => (prev !== next ? next : prev));
      setImgLoaded(false); // force recalculation after frame size change
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const svgUrl = svgMap[device];

  // when URL changes, mark not loaded so onLoad will reflow
  useEffect(() => {
    setImgLoaded(false);
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
          draggable={false}
          // hide the blank or while loading to avoid flicker
          style={{ visibility: imgLoaded && svgUrl ? 'visible' : 'hidden' }}
        />

        <div
          className="screen-overlay"
          style={
            window.innerWidth < 768
              ? {
                  width: `${overlaySize.width}px`,
                  height: isRealMobile
                    ? `${overlaySize.heightSet1}svh`
                    : `${overlaySize.heightSet2}px`,
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
