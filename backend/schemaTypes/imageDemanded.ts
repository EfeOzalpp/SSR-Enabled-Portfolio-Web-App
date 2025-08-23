export default {
  name: 'imageDemanded',
  title: 'Image Demanded',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the image (e.g. "coin", "logo", "background")',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // allows cropping and focal point
      },
    },
    {
      name: 'alt',
      title: 'Alt text (SEO)',
      type: 'string',
      description: 'Important for SEO and accessibility',
    },
  ],
};
