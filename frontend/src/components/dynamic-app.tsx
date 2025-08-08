import React, { useEffect, useState, useRef } from 'react';
import client from '../utils/sanity';
import DynamicAppInbound from '../dynamic-app/dynamic-app-shadow.jsx';
import { useDynamicOverlay } from '../utils/content-utility/dynamic-overlay.ts';
import { useRealMobileViewport } from '../utils/content-utility/real-mobile.ts';

const getDeviceType = (width: number): 'phone' | 'tablet' | 'laptop' => {
  if (width < 768) return 'phone';
  if (width < 1025) return 'tablet';
  return 'laptop';
};

const DynamicApp = () => {
  const [svgMap, setSvgMap] = useState<Record<string, string>>({});
  const [device, setDevice] = useState<'phone' | 'tablet' | 'laptop'>(
    getDeviceType(window.innerWidth)
  );

  const frameRef = useRef<HTMLImageElement>(null);

  // Get overlay sizes
  const overlaySize = useDynamicOverlay(frameRef);

  // Detect real mobile viewport (vs devtools)
  const isRealMobile = useRealMobileViewport();

  useEffect(() => {
    client
      .fetch(`*[_type == "svgAsset" && title in ["Laptop", "Tablet", "Phone"]]{
        title,
        file { asset->{url} }
      }`)
      .then((results) => {
        const map: Record<string, string> = {};
        results.forEach((item: any) => {
          map[item.title.toLowerCase()] = item.file?.asset?.url;
        });
        setSvgMap(map);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newDevice = getDeviceType(window.innerWidth);
      setDevice((prev) => (prev !== newDevice ? newDevice : prev));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const svgUrl = svgMap[device];

  return (
    <section className="block-type-a">
      <div className="device-wrapper">
        <img
          ref={frameRef}
          src={svgUrl}
          alt={device}
          className={`device-frame ${device}`}
        />

        <div
          className="screen-overlay"
          style={
            window.innerWidth < 768
              ? {
                  width: `${overlaySize.width}px`,
                  height: isRealMobile
                    ? `${overlaySize.heightSet1}svh` // mobile svh + 60→92 range
                    : `${overlaySize.heightSet2}px`  // desktop/devtools px + 250→650 range
                }
              : {} // no inline styles for >= 768px
          }
        >
          <DynamicAppInbound />
        </div>
      </div>
    </section>
  );
};

export default DynamicApp;
