// /schemas/mediaBlock.ts
import { defineType, defineField } from 'sanity';
import videoSet from './objects/videoSet.ts';

export default defineType({
  name: 'mediaBlock',
  title: 'Media Block',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title (H1)', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle (H2)', type: 'string' }),

    defineField({
      name: 'mediaOne',
      title: 'Media One',
      type: 'object',
      fields: [
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'video', title: 'Video', type: 'videoSet' }),
        defineField({ name: 'alt', title: 'Alt Text (SEO)', type: 'string', validation: Rule => Rule.required() }),
      ],
    }),

    defineField({
      name: 'mediaTwo',
      title: 'Media Two',
      type: 'object',
      fields: [
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'video', title: 'Video', type: 'videoSet' }),
        defineField({ name: 'alt', title: 'Alt Text (SEO)', type: 'string', validation: Rule => Rule.required() }),
      ],
    }),

    defineField({
      name: 'slug',
      title: 'Key for tooltip',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
