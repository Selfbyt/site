import {defineField, defineType} from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary that appears in case study listings',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'A detailed summary that appears at the top of the case study',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{type: 'reference', to: {type: 'author'}}],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'mainImage',
    },
    prepare(selection) {
      const {client} = selection
      return {...selection, subtitle: client ? `Client: ${client}` : ''}
    },
  },
})
