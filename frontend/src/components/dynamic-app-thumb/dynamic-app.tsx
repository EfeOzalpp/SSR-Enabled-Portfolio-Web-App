import React, { useEffect, useState } from 'react';
import client from '../../utils/sanity';

const getDeviceType = (width: number): 'phone' | 'tablet' | 'laptop' => {
  if (width < 768) return 'phone';
  if (width < 1025) return 'tablet';
  return 'laptop';
};

const MinimalBlock = () => {
  const [svgMap, setSvgMap] = useState<Record<string, string>>({});
  const [device, setDevice] = useState<'phone' | 'tablet' | 'laptop'>(getDeviceType(window.innerWidth));

  // Fetch SVGs once
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

  // Handle resize & update device
  useEffect(() => {
    const handleResize = () => {
      const newDevice = getDeviceType(window.innerWidth);
      setDevice((prev) => (prev !== newDevice ? newDevice : prev));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const deviceClass = `block-a-${device}`;
  const svgUrl = svgMap[device];

  return (
    <section className="block-type-a" id="block-a">
      <div className="block-a-content">
        <section className="svg-wrapper">
          {svgUrl ? (
            <img
              src={`${svgUrl}?cb=${device}`} // optional cache-busting by device
              alt={device}
              className={deviceClass}
            />
          ) : (
            <div className="svg-placeholder" />
          )}
        </section>
      </div>
    </section>
  );
};

export default MinimalBlock;
