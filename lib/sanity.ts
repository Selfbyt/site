import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
})

// Helper function for generating image URLs with the Sanity Image Pipeline
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Fetch all blog posts
export async function getBlogPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      "category": category->title,
      publishedAt,
      "author": author->name,
      "authorImage": author->image,
      mainImage
    }`,
  )
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      body,
      "category": category->title,
      publishedAt,
      "author": author->name,
      "authorImage": author->image,
      mainImage
    }`,
    { slug },
  )
}

// Fetch all research papers
export async function getResearchPapers() {
  return client.fetch(
    `*[_type == "researchPaper"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      abstract,
      "category": category->title,
      publishedAt,
      "authors": authors[]->name,
      pdfUrl
    }`,
  )
}

// Fetch a single research paper by slug
export async function getResearchPaperBySlug(slug: string) {
  return client.fetch(
    `*[_type == "researchPaper" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      abstract,
      body,
      "category": category->title,
      publishedAt,
      "authors": authors[]->name,
      pdfUrl
    }`,
    { slug },
  )
}

// Fetch all case studies
export async function getCaseStudies() {
  return client.fetch(
    `*[_type == "caseStudy"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      "category": category->title,
      publishedAt,
      client,
      "authors": authors[]->name
    }`,
  )
}

// Fetch a single case study by slug
export async function getCaseStudyBySlug(slug: string) {
  return client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      summary,
      body,
      "category": category->title,
      publishedAt,
      client,
      "authors": authors[]->name
    }`,
    { slug },
  )
}

// Fetch all products
export async function getProducts() {
  return client.fetch(
    `*[_type == "product"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      "category": category->title,
      icon
    }`,
  )
}

// Fetch a single product by slug
export async function getProductBySlug(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      overview,
      "category": category->title,
      icon,
      features,
      useCases,
      technicalSpecs,
      documentation
    }`,
    { slug },
  )
}

// Fetch featured content
export async function getFeaturedContent() {
  return client.fetch(`{
    "featuredResearch": *[_type == "researchPaper" && featured == true] | order(publishedAt desc)[0..2] {
      _id,
      title,
      slug,
      abstract,
      "category": category->title,
      publishedAt
    },
    "featuredPosts": *[_type == "post" && featured == true] | order(publishedAt desc)[0..2] {
      _id,
      title,
      slug,
      excerpt,
      "category": category->title,
      publishedAt,
      "author": author->name
    },
    "featuredProducts": *[_type == "product" && featured == true] | order(title asc)[0..1] {
      _id,
      title,
      slug,
      description,
      "category": category->title,
      icon
    }
  }`)
}
