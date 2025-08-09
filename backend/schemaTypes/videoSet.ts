// /schemas/objects/videoSet.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'videoSet',
  title: 'Video (with fallbacks)',
  type: 'object',
  fields: [
    defineField({
      name: 'webm',
      title: 'WebM',
      type: 'file',
      options: { accept: 'video/webm' },
    }),
    defineField({
      name: 'mp4',
      title: 'MP4 (fallback for Safari/iOS)',
      type: 'file',
      options: { accept: 'video/mp4' },
    }),
    defineField({
      name: 'poster',
      title: 'Poster image (optional)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  validation: Rule =>
    Rule.custom((val) => {
      if (!val) return true;
      if (!val.webm && !val.mp4) return 'Provide at least a WebM or an MP4';
      return true;
    }),
});
