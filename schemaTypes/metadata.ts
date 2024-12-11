import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'metadata',
  title: 'Page Metadata',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(170),
    }),
  ],
})
