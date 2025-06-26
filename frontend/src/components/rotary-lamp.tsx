// Rotary Lamp Project
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

const RotaryLamp = () => {
  const [data, setData] = useState<MediaBlock | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "mediaBlock" && title match "Rotary Lamp"][0]{
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

  if (!data) return null;

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
   {/*
    <div className="project-reveal">
      <h3 className="project-view">Expand Project</h3>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="expand-icon"
      >
        <rect width="24" height="24" fill="#ccc" />
      </svg>
    </div> 
        */}
    </section>
  )
}

export default RotaryLamp
