import { useEffect, useRef, useState } from 'react'
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

  const videoRef = useRef<HTMLVideoElement>(null)

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [data]) // rerun when data is ready

  if (!data) return <p className="pendant-loading">Loading...</p>

  const isVideo =
    data.mediaTwo?.asset._type === 'sanity.fileAsset' &&
    data.mediaTwo?.asset.url.match(/\.(mp4|webm|ogg)$/)

  return (
    <section className="block-type-1">
      <div className="media-content-1">
        <img
          src={data.mediaOne?.asset.url}
          alt={data.mediaOne?.alt}
          className="media-item-1"
        />
        <div className="header-1">
          <h2 className="title-1">{data.title}</h2>
        </div>
      </div>

      <div className="media-content-2">
        {isVideo ? (
        <video
          ref={videoRef}
          src={data.mediaTwo.asset.url}
          className="media-item-2"
          loop
          autoPlay
          playsInline
          muted
          preload="auto"
          style={{ pointerEvents: 'all' }}
        />
        ) : (
          <img
            src={data.mediaTwo?.asset.url}
            alt={data.mediaTwo?.alt}
            className="media-item-2"
          />
        )}

        <div className="subheader-1">
          {data.tags?.length > 0 && (
            <div className="tags-1">
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
