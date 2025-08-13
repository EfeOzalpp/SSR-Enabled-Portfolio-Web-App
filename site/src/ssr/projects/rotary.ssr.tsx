// src/ssr/projects/rotary.ssr.tsx
import type { SsrDescriptor } from '../types';
import { getProjectData } from '../../utils/get-project-data';
import { getHighQualityImageUrl } from '../../utils/media-providers/image-builder';
import '../../styles/block-type-1.css';

export const rotarySSR: SsrDescriptor = {
  fetch: () => getProjectData('rotary-lamp'),
  render: (data) => {
    const m1 = data?.mediaOne || {};
    const m2 = data?.mediaTwo || {};

    const img1 = m1?.image ? getHighQualityImageUrl(m1.image, 1920, 1080, 90) : m1?.imageUrl;
    const img2 = m2?.image ? getHighQualityImageUrl(m2.image, 1920, 1080, 90) : m2?.imageUrl;

    // match the SplitDragHandler expectations:
    // - section is relative, children are absolutely positioned containers
    // - default split ~50%
    const initialSplit = 50;

    return (
      <section
        id="rotary-ssr"
        className="block-type-1"
        style={{
          position: 'relative',
          width: '100%',
          // Give the section a height so absolute children can size against it.
          // Your CSS may already set this; if so, you can remove the line below.
          minHeight: '60vh',
          overflow: 'hidden',
        }}
      >
        {/* LEFT / TOP container */}
        <div
          id="rotary-media-1-container"
          className="media-content-1"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${initialSplit}%`,
            height: '100%',
          }}
        >
          {img1 && (
            <img
              id="rotary-media-1"
              className="media-item-1 tooltip-rotary-lamp"
              src={img1}
              alt={m1?.alt ?? 'Rotary Lamp media'}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </div>

        {/* SPLITTER mount point (Enhancer portal attaches here) */}
        <div id="rotary-enhancer-mount" />

        {/* RIGHT / BOTTOM container */}
        <div
          id="rotary-media-2-container"
          className="media-content-2"
          style={{
            position: 'absolute',
            top: 0,
            left: `${initialSplit}%`,
            width: `${100 - initialSplit}%`,
            height: '100%',
          }}
        >
          {img2 && (
            <img
              id="rotary-media-2"
              className="media-item-2 tooltip-rotary-lamp"
              src={img2}
              alt={m2?.alt ?? 'Rotary Lamp media'}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </div>
      </section>
    );
  },
};
