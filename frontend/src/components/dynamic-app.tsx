import React, { useEffect, useState } from 'react';
import client from '../utils/sanity';
import DynamicAppInbound from '../dynamic-app/dynamic-app-shadow.jsx';

const getDeviceType = (width: number): 'phone' | 'tablet' | 'laptop' => {
  if (width < 768) return 'phone';
  if (width < 1025) return 'tablet';
  return 'laptop';
};

const DynamicApp = () => {
  const [svgMap, setSvgMap] = useState<Record<string, string>>({});
  const [device, setDevice] = useState<'phone' | 'tablet' | 'laptop'>(getDeviceType(window.innerWidth));

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
        <img src={svgUrl} alt={device} className={`device-frame ${device}`} />

        <div className="screen-overlay">
          <DynamicAppInbound />
        </div>
      </div>
    </section>
  );
};

export default DynamicApp;
