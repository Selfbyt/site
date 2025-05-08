// Fix research paper schema issues - run with: node scripts/fix-research-papers.cjs
const { createClient } = require('@sanity/client');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  token: process.env.SANITY_API_TOKEN, // Need a token with write access
  useCdn: false,
});

async function fixResearchPapers() {
  console.log('Fetching research papers...');
  const papers = await client.fetch('*[_type == "researchPaper"]');
  console.log(`Found ${papers.length} research papers to process`);
  
  for (const paper of papers) {
    console.log(`Processing paper: ${paper.title}`);
    let shouldUpdate = false;
    const updates = {};
    
    // Fix authors array - ensure all items have _key
    if (paper.authors && Array.isArray(paper.authors)) {
      const fixedAuthors = paper.authors.map(item => {
        if (!item._key) {
          shouldUpdate = true;
          return { ...item, _key: uuidv4() };
        }
        return item;
      });
      
      if (shouldUpdate) {
        updates.authors = fixedAuthors;
      }
    }
    
    // Update the paper if needed
    if (shouldUpdate) {
      console.log(`Updating paper: ${paper.title}`);
      try {
        await client.patch(paper._id).set(updates).commit();
        console.log(`Successfully updated paper: ${paper.title}`);
      } catch (error) {
        console.error(`Error updating paper ${paper.title}:`, error.message);
      }
    } else {
      console.log(`No updates needed for paper: ${paper.title}`);
    }
  }
  
  console.log('Finished fixing research papers');
}

fixResearchPapers().catch(console.error);
