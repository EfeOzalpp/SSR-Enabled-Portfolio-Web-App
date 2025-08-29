import React from 'react';

type Props = { title?: string };

export default function FocusedDetails({ title }: Props) {
  return (
    <section
      style={{
        height: '140dvh',
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--focused-bg, #1c1c1c)',
        color: 'white',
      }}
    >
      <div style={{ maxWidth: 900, textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 54px)', margin: 0 }}>
          {title ?? 'Focused Details'}
        </h2>
        <p style={{ opacity: 0.75, marginTop: 12 }}>
          Drop richer content here later; this block is code-split and only mounts when focused.
        </p>
      </div>
    </section>
  );
}
