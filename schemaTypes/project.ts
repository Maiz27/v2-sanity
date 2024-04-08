import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          {title: 'Completed', value: 'completed'},
          {title: 'Ongoing', value: 'ongoing'},
          {title: 'Paused', value: 'paused'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'description',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'href',
      title: 'Preview URL',
      type: 'url',
    }),
    defineField({
      name: 'source',
      title: 'Source Code URL',
      type: 'url',
    }),
    defineField({
      name: 'tech',
      title: 'Tech Stack',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tool'}}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'projectImage'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.[0].image',
      featured: 'featured',
    },
    prepare(selection) {
      const {title, media, featured} = selection
      return {
        title: `${title}${featured ? ' (Featured)' : ''}`,
        media: media,
      }
    },
  },
})
