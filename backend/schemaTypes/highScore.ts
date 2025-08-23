import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'highScore',
  title: 'High Score',
  type: 'document',
  fields: [
    defineField({
      name: 'score',
      title: 'Score',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
