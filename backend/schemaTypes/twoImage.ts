import { defineType, defineField } from 'sanity'

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
    defineField({
      name: 'mediaOne',
      title: 'Media One (Image or Video)',
      type: 'file',
      options: { accept: 'image/*,video/*' },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          validation: Rule => Rule.required()
        })
      ]
    }),
    defineField({
      name: 'mediaTwo',
      title: 'Media Two (Image or Video)',
      type: 'file',
      options: { accept: 'image/*,video/*' },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          validation: Rule => Rule.required()
        })
      ]
    }),
    defineField({
    name: 'tags',
    title: 'Tags',
    type: 'array',
    of: [{ type: 'string' }]
    })
  ]
})
