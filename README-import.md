# Importing Data to Sanity CMS

This guide explains how to import your existing data into Sanity CMS.

## Prerequisites

1. A Sanity project set up with the schema from `sanity-schema.ts`
2. A Sanity API token with write permissions
3. Node.js and npm installed

## Setting Up Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

\`\`\`
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
SANITY_API_TOKEN=your_write_token
\`\`\`

Replace `your_project_id` with your Sanity project ID and `your_write_token` with a token that has write permissions.

## Option 1: Import from Your API

If your data is available through an API, you can use the `import-data.ts` script.

1. Install the required dependencies:

\`\`\`bash
npm install @sanity/client node-fetch dotenv ts-node typescript
\`\`\`

2. Update the API endpoints in `scripts/import-data.ts` to point to your actual API:

\`\`\`typescript
const API_ENDPOINTS = {
  blogPosts: 'http://your-api.com/api/blog',
  researchPapers: 'http://your-api.com/api/research',
  caseStudies: 'http://your-api.com/api/case-studies',
  products: 'http://your-api.com/api/products',
}
\`\`\`

3. Run the import script:

\`\`\`bash
npx ts-node scripts/import-data.ts
\`\`\`

## Option 2: Import Static Data

If you want to import the static dummy data that's already in your Next.js files, you can use the `import-static-data.ts` script.

1. Install the required dependencies:

\`\`\`bash
npm install @sanity/client dotenv ts-node typescript
\`\`\`

2. Run the import script:

\`\`\`bash
npx ts-node scripts/import-static-data.ts
\`\`\`

## What the Import Scripts Do

Both scripts perform the following steps:

1. Create categories based on your data
2. Create authors based on your data
3. Import blog posts with references to authors and categories
4. Import research papers with references to authors and categories
5. Import case studies with references to categories
6. Import products with references to categories

The scripts also check if content already exists to avoid duplicates.

## Customizing the Import

You can modify the scripts to match your specific data structure:

- Update the data transformation logic to match your API response format
- Adjust the Portable Text conversion for rich text content
- Modify the featured content selection logic
- Add additional fields or relationships

## Troubleshooting

If you encounter errors during the import:

1. Check that your Sanity API token has write permissions
2. Verify that your schema matches the document structure in the import scripts
3. Look for specific error messages in the console output
4. Try importing a single content type at a time by commenting out the other import functions in the `main()` function
