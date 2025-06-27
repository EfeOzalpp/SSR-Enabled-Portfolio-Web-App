// Ice Cream Scoop Project
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

const IceCreamScoop = () => {
  const [data, setData] = useState<MediaBlock | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "mediaBlock" && title match "Enhanced Scoop"][0]{
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
  }, [data])

  if (!data) return null;

  const isVideo =
    data.mediaTwo?.asset._type === 'sanity.fileAsset' &&
    data.mediaTwo?.asset.url.match(/\.(mp4|webm|ogg)$/)

  return (
    <section className="block-type-1" id="block-i">
      <div className="media-content-1">
        <img
          id="icecream-media-1"
          src={data.mediaOne?.asset.url}
          alt={data.mediaOne?.alt}
          className="media-item-1"
        />
      </div>

      <div className="media-content-2">
        {isVideo ? (
          <video
            id="icecream-media-2"
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
            id="icecream-media-2"
            src={data.mediaTwo?.asset.url}
            alt={data.mediaTwo?.alt}
            className="media-item media-item-2"
          />
        )}
       {/*
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
        */}
      </div>
    </section>
  )
}

export default IceCreamScoop
