# Selfbyt Website with Sanity CMS Integration

This project is a Next.js website for Selfbyt, integrated with Sanity CMS for content management.

## Getting Started

### Setting Up Sanity

1. Install the Sanity CLI:
   \`\`\`bash
   npm install -g @sanity/cli
   \`\`\`

2. Create a new Sanity project:
   \`\`\`bash
   sanity init
   \`\`\`

3. Follow the prompts to set up your project. When asked about the schema, choose "Create a new schema".

4. Copy the schema definitions from `sanity-schema.ts` into your Sanity Studio project's schema files.

5. Deploy your Sanity Studio:
   \`\`\`bash
   sanity deploy
   \`\`\`

### Environment Variables

Create a `.env.local` file in the root of your Next.js project with the following variables:

\`\`\`
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
SANITY_WEBHOOK_SECRET=your_webhook_secret
\`\`\`

Replace `your_project_id` with your Sanity project ID and `your_webhook_secret` with a secure random string.

### Setting Up Webhooks

1. In your Sanity project dashboard, go to API > Webhooks.
2. Create a new webhook with the following settings:
   - Name: Next.js Revalidation
   - URL: `https://your-website.com/api/revalidate`
   - HTTP method: POST
   - Secret: The same value as `SANITY_WEBHOOK_SECRET`
   - Dataset: production
   - Filter: Leave empty to trigger on all document changes

### Running the Website

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

### Creating Content

1. Access your Sanity Studio at `https://your-project-name.sanity.studio/`
2. Create authors and categories first, as they are referenced by other content types
3. Create blog posts, research papers, case studies, and products

### Featured Content

To feature content on the homepage:
1. Edit the content item in Sanity Studio
2. Toggle the "Featured" field to true
3. Save the document

## Deployment

Deploy your Next.js website to Vercel:

1. Push your code to a Git repository
2. Import the repository in Vercel
3. Add the environment variables
4. Deploy

After deployment, update your webhook URL in Sanity to point to your production domain.
