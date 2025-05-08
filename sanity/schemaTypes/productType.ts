import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
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
      name: 'description',
      title: 'Description',
      type: 'text',
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
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Brain', value: 'brain'},
          {title: 'CPU', value: 'cpu'},
          {title: 'Database', value: 'database'},
          {title: 'Layers', value: 'layers'},
        ],
      },
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          title: 'Feature',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
          ],
          preview: {
            select: {
              title: 'title'
            }
          }
        },
      ],
      // Sanity will automatically generate keys for new array items
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'useCase',
          title: 'Use Case',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
          ],
          preview: {
            select: {
              title: 'title'
            }
          }
        },
      ],
      // Sanity will automatically generate keys for new array items
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Mark this product as featured',
      type: 'boolean',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'documentation',
      title: 'Documentation',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'documentLink',
          title: 'Document Link',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
          preview: {
            select: {
              title: 'title'
            }
          }
        },
      ],
      // Sanity will automatically generate keys for new array items
    }),
    defineField({
      name: 'technicalSpecs',
      title: 'Technical Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'specification',
          title: 'Specification',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({name: 'value', title: 'Value', type: 'string'}),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'value'
            }
          }
        },
      ],
      // Sanity will automatically generate keys for new array items
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
      media: 'mainImage',
    },
  },
})
