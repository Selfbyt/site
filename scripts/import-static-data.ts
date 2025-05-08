/**
 * This script imports the static dummy data from your existing Next.js files into Sanity CMS
 *
 * Usage:
 * 1. Make sure you have the required environment variables set
 * 2. Run with: npx ts-node scripts/import-static-data.ts
 */

import { createClient } from "@sanity/client"
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

// Static data from your existing files
// Blog posts from app/blog/page.tsx
const blogPosts = [
  {
    id: 1,
    title: "Advancements in Neural Interface Technology",
    excerpt:
      "Exploring the latest breakthroughs in brain-computer interfaces and their implications for human-computer interaction.",
    date: "May 2, 2023",
    author: "Dr. Sarah Chen",
    category: "Neuroscience",
    slug: "advancements-neural-interface-technology",
  },
  {
    id: 2,
    title: "The Future of Cognitive Computing",
    excerpt:
      "How cognitive computing is evolving and what we can expect in the next decade of research and development.",
    date: "April 18, 2023",
    author: "Prof. Michael Rodriguez",
    category: "Cognitive Computing",
    slug: "future-cognitive-computing",
  },
  {
    id: 3,
    title: "Reimagining Data Types for Modern Computing",
    excerpt:
      "Why traditional data type systems are limiting our computing potential and how we're working to change that.",
    date: "March 30, 2023",
    author: "Dr. James Wilson",
    category: "Data Architecture",
    slug: "reimagining-data-types-modern-computing",
  },
  {
    id: 4,
    title: "Ethical Considerations in Brain-Computer Interfaces",
    excerpt:
      "Examining the ethical implications of direct neural interfaces and establishing guidelines for responsible development.",
    date: "March 15, 2023",
    author: "Dr. Emily Johnson",
    category: "Ethics",
    slug: "ethical-considerations-brain-computer-interfaces",
  },
  {
    id: 5,
    title: "Hardware Optimization for Cognitive Computing",
    excerpt:
      "How specialized hardware architectures can dramatically improve the performance of cognitive computing systems.",
    date: "February 28, 2023",
    author: "Dr. Robert Chang",
    category: "Hardware",
    slug: "hardware-optimization-cognitive-computing",
  },
  {
    id: 6,
    title: "The Role of Memory in Cognitive Systems",
    excerpt:
      "Understanding how memory systems influence the performance and capabilities of cognitive computing platforms.",
    date: "February 10, 2023",
    author: "Prof. Lisa Martinez",
    category: "Cognitive Computing",
    slug: "role-memory-cognitive-systems",
  },
]

// Research papers from app/research/page.tsx
const researchPapers = [
  {
    id: 1,
    title: "Neural Network Architectures for Cognitive Computing",
    abstract:
      "This paper explores novel neural network architectures designed to emulate human cognitive processes, with a focus on attention mechanisms and hierarchical processing structures.",
    date: "April 15, 2023",
    authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
    category: "Cognitive Computing",
    slug: "neural-network-architectures-cognitive-computing",
    pdfUrl: "#",
  },
  {
    id: 2,
    title: "Universal Data Type System: A New Paradigm",
    abstract:
      "We introduce a revolutionary approach to data typing that enhances storage efficiency and processing capabilities through dynamic type adaptation and contextual interpretation.",
    date: "February 28, 2023",
    authors: ["Dr. James Wilson", "Dr. Emily Johnson"],
    category: "Data Architecture",
    slug: "universal-data-type-system-new-paradigm",
    pdfUrl: "#",
  },
  {
    id: 3,
    title: "Optimizing Memory Management for AI Workloads",
    abstract:
      "This research presents advanced memory management techniques specifically designed for artificial intelligence applications, focusing on predictive caching and hierarchical memory structures.",
    date: "January 10, 2023",
    authors: ["Dr. Robert Chang", "Prof. Lisa Martinez"],
    category: "AI Research",
    slug: "optimizing-memory-management-ai-workloads",
    pdfUrl: "#",
  },
  {
    id: 4,
    title: "Bridging Neuroscience and Computing: A Comprehensive Review",
    abstract:
      "A systematic review of current approaches to integrating neuroscientific principles into computing systems, with an analysis of successes, challenges, and future directions.",
    date: "December 5, 2022",
    authors: ["Prof. Michael Rodriguez", "Dr. Emily Johnson"],
    category: "Neuroscience",
    slug: "bridging-neuroscience-computing-review",
    pdfUrl: "#",
  },
  {
    id: 5,
    title: "Hardware Acceleration for Cognitive Computing Models",
    abstract:
      "This paper examines specialized hardware architectures designed to accelerate cognitive computing workloads, with benchmarks comparing performance across different implementations.",
    date: "November 18, 2022",
    authors: ["Dr. Robert Chang", "Dr. James Wilson"],
    category: "Hardware",
    slug: "hardware-acceleration-cognitive-computing",
    pdfUrl: "#",
  },
  {
    id: 6,
    title: "Ethical Frameworks for Neural Interface Technologies",
    abstract:
      "We propose comprehensive ethical guidelines for the development and deployment of neural interface technologies, addressing privacy, autonomy, and accessibility concerns.",
    date: "October 30, 2022",
    authors: ["Dr. Emily Johnson", "Prof. Lisa Martinez"],
    category: "Ethics",
    slug: "ethical-frameworks-neural-interfaces",
    pdfUrl: "#",
  },
]

// Case studies from app/case-studies/page.tsx
const caseStudies = [
  {
    id: 1,
    title: "Implementing Cognitive Computing in Healthcare Diagnostics",
    excerpt: "How our cognitive computing models improved diagnostic accuracy by 37% at a major healthcare provider.",
    date: "March 20, 2023",
    client: "National Health Research Institute",
    category: "Healthcare",
    slug: "cognitive-computing-healthcare-diagnostics",
  },
  {
    id: 2,
    title: "Optimizing Data Processing for Financial Analysis",
    excerpt:
      "A case study on implementing our universal data type system to enhance financial data processing efficiency.",
    date: "January 15, 2023",
    client: "Global Financial Services",
    category: "Finance",
    slug: "optimizing-data-processing-financial-analysis",
  },
  {
    id: 3,
    title: "Neural Interfaces for Accessibility Applications",
    excerpt:
      "Developing assistive technology using neural interfaces to improve accessibility for individuals with mobility impairments.",
    date: "December 10, 2022",
    client: "Accessibility Innovation Foundation",
    category: "Accessibility",
    slug: "neural-interfaces-accessibility-applications",
  },
  {
    id: 4,
    title: "Memory Optimization in High-Performance Computing",
    excerpt:
      "How our memory management techniques improved computational efficiency in scientific research applications.",
    date: "November 5, 2022",
    client: "National Research Laboratory",
    category: "Scientific Computing",
    slug: "memory-optimization-high-performance-computing",
  },
]

// Products from app/products/page.tsx
const products = [
  {
    id: 1,
    title: "NeuraSense",
    description: "Advanced neural interface platform for research and development",
    icon: "brain",
    features: [
      "High-resolution neural signal processing",
      "Real-time data visualization",
      "Customizable interface protocols",
      "Comprehensive SDK for developers",
    ],
    category: "Neural Interfaces",
    slug: "neurasense",
  },
  {
    id: 2,
    title: "CogniCore",
    description: "Cognitive computing framework for building human-like AI systems",
    icon: "cpu",
    features: [
      "Hierarchical neural architecture",
      "Context-aware processing",
      "Adaptive learning capabilities",
      "Explainable AI components",
    ],
    category: "Cognitive Computing",
    slug: "cognicore",
  },
  {
    id: 3,
    title: "DataNexus",
    description: "Universal data type system for efficient data processing and storage",
    icon: "database",
    features: [
      "Dynamic type adaptation",
      "Optimized memory management",
      "Cross-platform compatibility",
      "Scalable architecture",
    ],
    category: "Data Architecture",
    slug: "datanexus",
  },
  {
    id: 4,
    title: "InterLink",
    description: "Human-computer interaction toolkit for intuitive interface design",
    icon: "layers",
    features: [
      "Cognitive load optimization",
      "Adaptive user interfaces",
      "Multimodal interaction support",
      "Accessibility-first design",
    ],
    category: "HCI",
    slug: "interlink",
  },
]

// Helper function to create a simple block content
function createSimpleBlockContent(text: string) {
  return [
    {
      _type: "block",
      style: "normal",
      _key: `block_${Date.now()}`,
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: `span_${Date.now()}`,
          text: text,
          marks: [],
        },
      ],
    },
  ]
}

// Create categories in Sanity
async function createCategories() {
  console.log("Creating categories...")
  const categorySet = new Set<string>()

  // Collect all categories
  blogPosts.forEach((post) => categorySet.add(post.category))
  researchPapers.forEach((paper) => categorySet.add(paper.category))
  caseStudies.forEach((study) => categorySet.add(study.category))
  products.forEach((product) => categorySet.add(product.category))

  const categories = Array.from(categorySet)
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
async function createAuthors() {
  console.log("Creating authors...")
  const authorSet = new Set<string>()

  // Collect all authors
  blogPosts.forEach((post) => authorSet.add(post.author))
  researchPapers.forEach((paper) => {
    paper.authors.forEach((author) => authorSet.add(author))
  })

  const authors = Array.from(authorSet)
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

  for (const post of blogPosts) {
    try {
      // Check if post already exists
      const existingPost = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug: post.slug })

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
          current: post.slug,
        },
        excerpt: post.excerpt,
        publishedAt: new Date(post.date).toISOString(),
        author: {
          _type: "reference",
          _ref: authorMap[post.author],
        },
        category: {
          _type: "reference",
          _ref: categoryMap[post.category],
        },
        body: createSimpleBlockContent(post.excerpt),
        featured: post.id <= 3, // Feature the first 3 posts
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

  for (const paper of researchPapers) {
    try {
      // Check if paper already exists
      const existingPaper = await client.fetch(`*[_type == "researchPaper" && slug.current == $slug][0]`, {
        slug: paper.slug,
      })

      if (existingPaper) {
        console.log(`Research paper already exists: ${paper.title}`)
        continue
      }

      // Create author references
      const authorRefs = paper.authors.map((author) => ({
        _type: "reference",
        _ref: authorMap[author],
      }))

      // Create the paper
      const newPaper = await client.create({
        _type: "researchPaper",
        title: paper.title,
        slug: {
          _type: "slug",
          current: paper.slug,
        },
        abstract: paper.abstract,
        publishedAt: new Date(paper.date).toISOString(),
        authors: authorRefs,
        category: {
          _type: "reference",
          _ref: categoryMap[paper.category],
        },
        body: createSimpleBlockContent(paper.abstract),
        pdfUrl: paper.pdfUrl,
        featured: paper.id <= 3, // Feature the first 3 papers
      })

      console.log(`Created research paper: ${paper.title}`)
    } catch (error) {
      console.error(`Error creating research paper ${paper.title}:`, error)
    }
  }
}

// Import case studies
async function importCaseStudies(categoryMap: Record<string, string>) {
  console.log("Importing case studies...")

  for (const study of caseStudies) {
    try {
      // Check if case study already exists
      const existingStudy = await client.fetch(`*[_type == "caseStudy" && slug.current == $slug][0]`, {
        slug: study.slug,
      })

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
          current: study.slug,
        },
        excerpt: study.excerpt,
        summary: study.excerpt,
        client: study.client,
        publishedAt: new Date(study.date).toISOString(),
        category: {
          _type: "reference",
          _ref: categoryMap[study.category],
        },
        body: createSimpleBlockContent(study.excerpt),
        featured: study.id <= 2, // Feature the first 2 case studies
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

  for (const product of products) {
    try {
      // Check if product already exists
      const existingProduct = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, {
        slug: product.slug,
      })

      if (existingProduct) {
        console.log(`Product already exists: ${product.title}`)
        continue
      }

      // Create the product
      const newProduct = await client.create({
        _type: "product",
        title: product.title,
        slug: {
          _type: "slug",
          current: product.slug,
        },
        description: product.description,
        category: {
          _type: "reference",
          _ref: categoryMap[product.category],
        },
        icon: product.icon,
        overview: createSimpleBlockContent(product.description),
        features: product.features,
        useCases: [
          {
            title: "Example Use Case",
            description: `Example use case for ${product.title}`,
          },
          {
            title: "Another Example",
            description: `Another example use case for ${product.title}`,
          },
        ],
        technicalSpecs: [
          {
            name: "Architecture",
            value: "Proprietary design",
          },
          {
            name: "Compatibility",
            value: "Cross-platform",
          },
        ],
        documentation: [
          {
            title: "Getting Started Guide",
            url: "#",
          },
          {
            title: "API Documentation",
            url: "#",
          },
        ],
        featured: product.id <= 2, // Feature the first 2 products
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

    // Create categories and authors first
    const categoryMap = await createCategories()
    const authorMap = await createAuthors()

    // Import content
    await importBlogPosts(categoryMap, authorMap)
    await importResearchPapers(categoryMap, authorMap)
    await importCaseStudies(categoryMap)
    await importProducts(categoryMap)

    console.log("Import completed successfully!")
  } catch (error) {
    console.error("Import failed:", error)
  }
}

// Run the import
main()
