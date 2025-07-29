// ./schemas/svgAsset.ts
import { defineType } from 'sanity';

export default defineType({
  name: 'svgAsset',
  title: 'SVG Asset',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'file',
      title: 'SVG File',
      type: 'file',
      options: {
        accept: '.svg',
      },
      validation: (Rule) =>
        Rule.required().custom((file) => {
          if (!file || !file.asset?._ref) return 'File is required';
          // Since this is a static check, we trust the `.svg` accept filter
          return true;
        }),
    },
  ],
});
