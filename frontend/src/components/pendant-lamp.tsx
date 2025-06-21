// frontend/src/components/pendant-lamp.tsx
import { useEffect, useState } from 'react'
import client from '../utils/sanity'

interface MediaAsset {
  alt: string
  asset: {
    url: string
    _type: string
  }
}

interface MediaBlock {
  title: string
  subtitle?: string
  mediaOne?: MediaAsset
  mediaTwo?: MediaAsset
  tags?: string[]
}

const PendantLamp = () => {
  const [data, setData] = useState<MediaBlock | null>(null)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "mediaBlock" && title match "Rotary Lamp"][0]{
          title,
          subtitle,
          mediaOne { alt, asset->{url, _type} },
          mediaTwo { alt, asset->{url, _type} },
          tags
        }`
      )
      .then(setData)
  }, [])

  if (!data) return <p className="pendant-loading">Loading...</p>

const renderMedia = (media: MediaAsset | undefined, className: string) => {
  if (!media || !media.asset?.url) return null

  const isVideo =
    media.asset._type === 'sanity.fileAsset' &&
    media.asset.url.match(/\.(mp4|webm|ogg)$/)

  return isVideo ? (
    <video
      src={media.asset.url}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      style={{ pointerEvents: 'none' }}
    />
  ) : (
    <img src={media.asset.url} alt={media.alt} className={className} />
  )
}

  return (
    <section className="block-type-1">
     <div className="media-content-1">
        {renderMedia(data.mediaOne, 'media-item-1')}
      <div className="header-1">
        <h2 className="title-1">{data.title}</h2>
      </div>
      </div>
      <div className="media-content-2">
        {renderMedia(data.mediaTwo, 'media-item-2')}
      <div className="subheader-1">
        {data.tags?.length > 0 && (<div className="tags-1">
          {data.tags.map((tag, i) => (
            <span key={i} className="tag-1">
              {tag}
            </span>
          ))}
        </div>
      )}
      {data.subtitle && <h3 className="subtitle-1">{data.subtitle}</h3>}
      </div>
    </div>
    </section>
  )
}

export default PendantLamp
