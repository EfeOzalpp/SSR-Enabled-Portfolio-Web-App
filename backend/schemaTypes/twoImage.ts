// /schemas/mediaBlock.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'mediaBlock',
  title: 'Media Block',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (H1)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (H2)',
      type: 'string'
    }),

    // MEDIA ONE - supports both image and video
    defineField({
      name: 'mediaOne',
      title: 'Media One',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'video',
          title: 'Video',
          type: 'file',
          options: { accept: 'video/*' },
        }),
        defineField({
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          validation: Rule => Rule.required()
        })
      ]
    }),

    // MEDIA TWO - same structure
    defineField({
      name: 'mediaTwo',
      title: 'Media Two',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'video',
          title: 'Video',
          type: 'file',
          options: { accept: 'video/*' },
        }),
        defineField({
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          validation: Rule => Rule.required()
        })
      ]
    }),

    // Optional tags
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    })
  ]
});
