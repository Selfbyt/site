import {defineField, defineType} from 'sanity'

export const researchPaperType = defineType({
  name: 'researchPaper',
  title: 'Research Paper',
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
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{type: 'reference', to: {type: 'author'}}],
      // Sanity will automatically generate keys for new array items
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
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'pdfUrl',
      title: 'PDF URL',
      type: 'url',
      description: 'URL to the research paper PDF',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Mark this research paper as featured',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'authors.0.name',
      date: 'publishedAt',
    },
    prepare(selection) {
      const {author, date} = selection
      return {...selection, subtitle: author && date ? `by ${author} on ${date}` : ''}
    },
  },
})
