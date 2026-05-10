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
      description: 'Long-form description used on the product detail page.',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short summary used on the homepage and product list.',
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'Lifecycle stage of the product. Used as a small label on cards.',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'Private alpha', value: 'alpha'},
          {title: 'Private beta', value: 'beta'},
          {title: 'Public', value: 'public'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'cta',
      title: 'Call to action',
      type: 'object',
      description: 'Override the default CTA button on the product card.',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({
          name: 'href',
          title: 'Href',
          type: 'string',
          description: 'Internal path (e.g. /contact) or external URL.',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        'Lower numbers appear first on the homepage. Defaults to 100 if unset.',
      initialValue: 100,
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
