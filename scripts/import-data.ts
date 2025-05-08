/**
 * This script imports dummy data from your API into Sanity CMS
 *
 * Usage:
 * 1. Make sure you have the required environment variables set
 * 2. Run with: npx ts-node scripts/import-data.ts
 */

import { createClient } from "@sanity/client"
import fetch from "node-fetch"
import dotenv from "dotenv"

// Load environment variables
dotenv.config({ path: ".env.local" })

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03",
  token: process.env.SANITY_API_TOKEN, // You need a write token
  useCdn: false,
})

// API endpoints for your dummy data
const API_ENDPOINTS = {
  blogPosts: "http://your-api.com/api/blog",
  researchPapers: "http://your-api.com/api/research",
  caseStudies: "http://your-api.com/api/case-studies",
  products: "http://your-api.com/api/products",
}

// Helper function to fetch data from API
async function fetchData(url: string) {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error)
    return []
  }
}

// Create categories in Sanity
async function createCategories(categories: string[]) {
  console.log("Creating categories...")
  const categoryMap: Record<string, string> = {}

  for (const category of categories) {
    try {
      const existingCategory = await client.fetch(`*[_type == "category" && title == $title][0]`, { title: category })

      if (existingCategory) {
        categoryMap[category] = existingCategory._id
        console.log(`Category already exists: ${category}`)
      } else {
        const newCategory = await client.create({
          _type: "category",
          title: category,
        })
        categoryMap[category] = newCategory._id
        console.log(`Created category: ${category}`)
      }
    } catch (error) {
      console.error(`Error creating category ${category}:`, error)
    }
  }

  return categoryMap
}

// Create authors in Sanity
async function createAuthors(authors: string[]) {
  console.log("Creating authors...")
  const authorMap: Record<string, string> = {}

  for (const author of authors) {
    try {
      const existingAuthor = await client.fetch(`*[_type == "author" && name == $name][0]`, { name: author })

      if (existingAuthor) {
        authorMap[author] = existingAuthor._id
        console.log(`Author already exists: ${author}`)
      } else {
        const newAuthor = await client.create({
          _type: "author",
          name: author,
        })
        authorMap[author] = newAuthor._id
        console.log(`Created author: ${author}`)
      }
    } catch (error) {
      console.error(`Error creating author ${author}:`, error)
    }
  }

  return authorMap
}

// Import blog posts
async function importBlogPosts(categoryMap: Record<string, string>, authorMap: Record<string, string>) {
  console.log("Importing blog posts...")
  const posts = await fetchData(API_ENDPOINTS.blogPosts)

  for (const post of posts) {
    try {
      // Check if post already exists
      const existingPost = await client.fetch(`*[_type == "post" && title == $title][0]`, { title: post.title })

      if (existingPost) {
        console.log(`Blog post already exists: ${post.title}`)
        continue
      }

      // Create the post
      const newPost = await client.create({
        _type: "post",
        title: post.title,
        slug: {
          _type: "slug",
          current: post.slug || post.title.toLowerCase().replace(/\s+/g, "-"),
        },
        excerpt: post.excerpt,
        publishedAt: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
        author: {
          _type: "reference",
          _ref: authorMap[post.author] || Object.values(authorMap)[0],
        },
        category: {
          _type: "reference",
          _ref: categoryMap[post.category] || Object.values(categoryMap)[0],
        },
        // Convert HTML content to Portable Text (simplified)
        body: [
          {
            _type: "block",
            style: "normal",
            _key: "intro",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: "intro_span",
                text: post.content || post.excerpt,
                marks: [],
              },
            ],
          },
        ],
        featured: false,
      })

      console.log(`Created blog post: ${post.title}`)
    } catch (error) {
      console.error(`Error creating blog post ${post.title}:`, error)
    }
  }
}

// Import research papers
async function importResearchPapers(categoryMap: Record<string, string>, authorMap: Record<string, string>) {
  console.log("Importing research papers...")
  const papers = await fetchData(API_ENDPOINTS.researchPapers)

  for (const paper of papers) {
    try {
      // Check if paper already exists
      const existingPaper = await client.fetch(`*[_type == "researchPaper" && title == $title][0]`, {
        title: paper.title,
      })

      if (existingPaper) {
        console.log(`Research paper already exists: ${paper.title}`)
        continue
      }

      // Create author references
      const authorRefs = paper.authors
        ? paper.authors.map((author: string) => ({
            _type: "reference",
            _ref: authorMap[author] || Object.values(authorMap)[0],
          }))
        : [{ _type: "reference", _ref: Object.values(authorMap)[0] }]

      // Create the paper
      const newPaper = await client.create({
        _type: "researchPaper",
        title: paper.title,
        slug: {
          _type: "slug",
          current: paper.slug || paper.title.toLowerCase().replace(/\s+/g, "-"),
        },
        abstract: paper.abstract,
        publishedAt: paper.date ? new Date(paper.date).toISOString() : new Date().toISOString(),
        authors: authorRefs,
        category: {
          _type: "reference",
          _ref: categoryMap[paper.category] || Object.values(categoryMap)[0],
        },
        // Convert HTML content to Portable Text (simplified)
        body: [
          {
            _type: "block",
            style: "normal",
            _key: "intro",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: "intro_span",
                text: paper.content || paper.abstract,
                marks: [],
              },
            ],
          },
        ],
        pdfUrl: paper.pdfUrl || "",
        featured: false,
      })

      console.log(`Created research paper: ${paper.title}`)
    } catch (error) {
      console.error(`Error creating research paper ${paper.title}:`, error)
    }
  }
}

// Import case studies
async function importCaseStudies(categoryMap: Record<string, string>, authorMap: Record<string, string>) {
  console.log("Importing case studies...")
  const studies = await fetchData(API_ENDPOINTS.caseStudies)

  for (const study of studies) {
    try {
      // Check if case study already exists
      const existingStudy = await client.fetch(`*[_type == "caseStudy" && title == $title][0]`, { title: study.title })

      if (existingStudy) {
        console.log(`Case study already exists: ${study.title}`)
        continue
      }

      // Create the case study
      const newStudy = await client.create({
        _type: "caseStudy",
        title: study.title,
        slug: {
          _type: "slug",
          current: study.slug || study.title.toLowerCase().replace(/\s+/g, "-"),
        },
        excerpt: study.excerpt,
        summary: study.summary || study.excerpt,
        client: study.client,
        publishedAt: study.date ? new Date(study.date).toISOString() : new Date().toISOString(),
        category: {
          _type: "reference",
          _ref: categoryMap[study.category] || Object.values(categoryMap)[0],
        },
        // Convert HTML content to Portable Text (simplified)
        body: [
          {
            _type: "block",
            style: "normal",
            _key: "intro",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: "intro_span",
                text: study.content || study.excerpt,
                marks: [],
              },
            ],
          },
        ],
        featured: false,
      })

      console.log(`Created case study: ${study.title}`)
    } catch (error) {
      console.error(`Error creating case study ${study.title}:`, error)
    }
  }
}

// Import products
async function importProducts(categoryMap: Record<string, string>) {
  console.log("Importing products...")
  const products = await fetchData(API_ENDPOINTS.products)

  for (const product of products) {
    try {
      // Check if product already exists
      const existingProduct = await client.fetch(`*[_type == "product" && title == $title][0]`, {
        title: product.title,
      })

      if (existingProduct) {
        console.log(`Product already exists: ${product.title}`)
        continue
      }

      // Map icon name
      const iconMap: Record<string, string> = {
        Brain: "brain",
        Cpu: "cpu",
        Database: "database",
        Layers: "layers",
      }

      // Create the product
      const newProduct = await client.create({
        _type: "product",
        title: product.title,
        slug: {
          _type: "slug",
          current: product.slug || product.title.toLowerCase().replace(/\s+/g, "-"),
        },
        description: product.description,
        category: {
          _type: "reference",
          _ref: categoryMap[product.category] || Object.values(categoryMap)[0],
        },
        icon: iconMap[product.icon] || "brain",
        // Convert overview to Portable Text
        overview: [
          {
            _type: "block",
            style: "normal",
            _key: "overview",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: "overview_span",
                text: product.overview || product.description,
                marks: [],
              },
            ],
          },
        ],
        features: product.features || [],
        useCases: product.useCases || [],
        technicalSpecs: product.technicalSpecs || [],
        documentation: product.documentation || [],
        featured: false,
      })

      console.log(`Created product: ${product.title}`)
    } catch (error) {
      console.error(`Error creating product ${product.title}:`, error)
    }
  }
}

// Main function to run the import
async function main() {
  try {
    console.log("Starting import process...")

    // Fetch all data to extract categories and authors
    const [posts, papers, studies, products] = await Promise.all([
      fetchData(API_ENDPOINTS.blogPosts),
      fetchData(API_ENDPOINTS.researchPapers),
      fetchData(API_ENDPOINTS.caseStudies),
      fetchData(API_ENDPOINTS.products),
    ])

    // Extract unique categories
    const categories = new Set<string>()
    posts.forEach((post: any) => post.category && categories.add(post.category))
    papers.forEach((paper: any) => paper.category && categories.add(paper.category))
    studies.forEach((study: any) => study.category && categories.add(study.category))
    products.forEach((product: any) => product.category && categories.add(product.category))

    // Extract unique authors
    const authors = new Set<string>()
    posts.forEach((post: any) => post.author && authors.add(post.author))
    papers.forEach((paper: any) => {
      if (paper.authors && Array.isArray(paper.authors)) {
        paper.authors.forEach((author: string) => authors.add(author))
      }
    })
    studies.forEach((study: any) => {
      if (study.authors && Array.isArray(study.authors)) {
        study.authors.forEach((author: string) => authors.add(author))
      }
    })

    // Create categories and authors first
    const categoryMap = await createCategories(Array.from(categories))
    const authorMap = await createAuthors(Array.from(authors))

    // Import content
    await importBlogPosts(categoryMap, authorMap)
    await importResearchPapers(categoryMap, authorMap)
    await importCaseStudies(categoryMap, authorMap)
    await importProducts(categoryMap)

    console.log("Import completed successfully!")
  } catch (error) {
    console.error("Import failed:", error)
  }
}

// Run the import
main()
