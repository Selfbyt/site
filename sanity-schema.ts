// This file is for reference only - it should be implemented in your Sanity Studio project

export const schemaTypes = [
  // Document types
  {
    name: "post",
    title: "Blog Posts",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "author",
        title: "Author",
        type: "reference",
        to: { type: "author" },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "mainImage",
        title: "Main image",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "category",
        title: "Category",
        type: "reference",
        to: { type: "category" },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "publishedAt",
        title: "Published at",
        type: "datetime",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "excerpt",
        title: "Excerpt",
        type: "text",
        validation: (Rule: any) => Rule.required().max(200),
      },
      {
        name: "body",
        title: "Body",
        type: "blockContent",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "featured",
        title: "Featured",
        type: "boolean",
        description: "Mark this post as featured",
        initialValue: false,
      },
    ],
    preview: {
      select: {
        title: "title",
        author: "author.name",
        media: "mainImage",
      },
      prepare(selection: any) {
        const { author } = selection
        return { ...selection, subtitle: author && `by ${author}` }
      },
    },
  },
  {
    name: "researchPaper",
    title: "Research Papers",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "authors",
        title: "Authors",
        type: "array",
        of: [{ type: "reference", to: { type: "author" } }],
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "category",
        title: "Category",
        type: "reference",
        to: { type: "category" },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "publishedAt",
        title: "Published at",
        type: "datetime",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "abstract",
        title: "Abstract",
        type: "text",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "body",
        title: "Body",
        type: "blockContent",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "pdfUrl",
        title: "PDF URL",
        type: "url",
        description: "URL to the PDF version of the paper",
      },
      {
        name: "featured",
        title: "Featured",
        type: "boolean",
        description: "Mark this paper as featured",
        initialValue: false,
      },
    ],
  },
  {
    name: "caseStudy",
    title: "Case Studies",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "client",
        title: "Client",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "authors",
        title: "Authors",
        type: "array",
        of: [{ type: "reference", to: { type: "author" } }],
      },
      {
        name: "category",
        title: "Category",
        type: "reference",
        to: { type: "category" },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "publishedAt",
        title: "Published at",
        type: "datetime",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "excerpt",
        title: "Excerpt",
        type: "text",
        validation: (Rule: any) => Rule.required().max(200),
      },
      {
        name: "summary",
        title: "Summary",
        type: "text",
        description: "A brief summary of the case study",
      },
      {
        name: "body",
        title: "Body",
        type: "blockContent",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "featured",
        title: "Featured",
        type: "boolean",
        description: "Mark this case study as featured",
        initialValue: false,
      },
    ],
  },
  {
    name: "product",
    title: "Products",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "description",
        title: "Description",
        type: "text",
        validation: (Rule: any) => Rule.required().max(200),
      },
      {
        name: "category",
        title: "Category",
        type: "reference",
        to: { type: "category" },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "icon",
        title: "Icon",
        type: "string",
        options: {
          list: [
            { title: "Brain", value: "brain" },
            { title: "CPU", value: "cpu" },
            { title: "Database", value: "database" },
            { title: "Layers", value: "layers" },
          ],
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "overview",
        title: "Overview",
        type: "blockContent",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "features",
        title: "Features",
        type: "array",
        of: [{ type: "string" }],
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "useCases",
        title: "Use Cases",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "title", title: "Title", type: "string" },
              { name: "description", title: "Description", type: "text" },
            ],
          },
        ],
      },
      {
        name: "technicalSpecs",
        title: "Technical Specifications",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "name", title: "Name", type: "string" },
              { name: "value", title: "Value", type: "string" },
            ],
          },
        ],
      },
      {
        name: "documentation",
        title: "Documentation",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "title", title: "Title", type: "string" },
              { name: "url", title: "URL", type: "url" },
            ],
          },
        ],
      },
      {
        name: "featured",
        title: "Featured",
        type: "boolean",
        description: "Mark this product as featured",
        initialValue: false,
      },
    ],
  },
  {
    name: "author",
    title: "Authors",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "bio",
        title: "Bio",
        type: "text",
      },
    ],
  },
  {
    name: "category",
    title: "Categories",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "description",
        title: "Description",
        type: "text",
      },
    ],
  },
  // Object types
  {
    name: "blockContent",
    title: "Block Content",
    type: "array",
    of: [
      {
        title: "Block",
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "H1", value: "h1" },
          { title: "H2", value: "h2" },
          { title: "H3", value: "h3" },
          { title: "H4", value: "h4" },
          { title: "Quote", value: "blockquote" },
        ],
        lists: [
          { title: "Bullet", value: "bullet" },
          { title: "Number", value: "number" },
        ],
        marks: {
          decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" },
            { title: "Code", value: "code" },
          ],
          annotations: [
            {
              title: "URL",
              name: "link",
              type: "object",
              fields: [
                {
                  title: "URL",
                  name: "href",
                  type: "url",
                },
              ],
            },
          ],
        },
      },
      {
        type: "image",
        options: { hotspot: true },
        fields: [
          {
            name: "alt",
            type: "string",
            title: "Alternative text",
            description: "Important for SEO and accessibility",
          },
        ],
      },
      {
        type: "object",
        name: "callout",
        title: "Callout",
        fields: [
          {
            name: "text",
            type: "text",
            title: "Text",
          },
        ],
      },
    ],
  },
]
