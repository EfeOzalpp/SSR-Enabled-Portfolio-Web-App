// src/ssr/blocks/SsrMediaBlock.tsx
export function SsrMediaBlock({ data }: { data: any }) {
  const toItems = (d: any) => {
    if (!d) return [];
    if (d.media) return Array.isArray(d.media) ? d.media : [d.media];
    const arr: any[] = [];
    if (d.mediaOne) arr.push(d.mediaOne);
    if (d.mediaTwo) arr.push(d.mediaTwo);
    return arr;
  };

  const items = toItems(data);
  if (!items.length) return null;

  return (
    <div className="ssr-media" style={{ width: '100%', height: '100%' }}>
      {items.map((m: any, i: number) => {
        const img    = m?.image?.asset?.url || m?.imageUrl;
        const poster = m?.video?.poster?.asset?.url || m?.video?.posterUrl;
        const asset  = m?.video?.asset?.url || m?.video?.assetUrl; // 👈 generic

        const webm = m?.video?.webmUrl || (asset?.endsWith?.('.webm') ? asset : null);
        const mp4  = m?.video?.mp4Url  || (asset?.endsWith?.('.mp4')  ? asset : null);

        if (webm || mp4) {
          return (
            <video key={i} autoPlay muted loop playsInline preload="metadata" poster={poster || undefined}
                   style={{ width: '100%', height: '100%', display: 'block' }}>
              {webm && <source src={webm} type="video/webm" />}
              {mp4  && <source src={mp4}  type="video/mp4"  />}
            </video>
          );
        }

        // fallback: asset url with unknown extension — let browser figure it out
        if (asset) {
          return (
            <video key={i} autoPlay muted loop playsInline preload="metadata" poster={poster || undefined}
                   style={{ width: '100%', height: '100%', display: 'block' }}
                   src={asset}/>
          );
        }

        if (img) {
          return (
            <img key={i} src={img} alt={m?.alt ?? ''} loading="eager" decoding="sync"
                 style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          );
        }
        return null;
      })}
    </div>
  );
}
