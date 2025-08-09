// src/utils/imageUrlBuilder.ts
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../sanity';

const builder = imageUrlBuilder(sanityClient);

// Base builder
export const urlFor = (source: any) => builder.image(source);

// Ultra-low-res (LQIP)
export const getLowResImageUrl = (source: any) =>
  urlFor(source)
    .ignoreImageParams()
    .width(128)
    .height(128)
    .quality(30)
    .auto('format')        // ← keep ONLY auto('format')
    .url();

export const getMediumImageUrl = (source: any) =>
  urlFor(source)
    .ignoreImageParams()
    .width(640)
    .height(360)
    .quality(60)
    .auto('format')        // ← no .format('webp')
    .url();

export const getHighQualityImageUrl = (source: any, width=1920, height=1080, quality=100) =>
  urlFor(source)
    .ignoreImageParams()
    .width(width)
    .height(height)
    .quality(quality)
    .auto('format')        // ← no .format('webp')
    .url();

