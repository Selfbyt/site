import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: false,
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

/** First N posts only — faster for home page “latest” section */
export async function getRecentBlogPosts(limit: number) {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit] {
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
    { limit },
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

/** First N papers only — faster for home page featured section */
export async function getRecentResearchPapers(limit: number) {
  return client.fetch(
    `*[_type == "researchPaper"] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      abstract,
      "category": category->title,
      publishedAt,
      "authors": authors[]->name,
      pdfUrl
    }`,
    { limit },
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

// Fetch products for the homepage software section.
// Returns featured products first, ordered by `order`, then by title.
export async function getFeaturedProducts(limit = 3) {
  return client.fetch(
    `*[_type == "product" && (featured == true || coalesce(status, "internal") != "archived")]
      | order(coalesce(order, 100) asc, title asc)[0...$limit] {
        _id,
        title,
        "slug": slug.current,
        summary,
        description,
        status,
        cta,
        "category": category->title
      }`,
    { limit },
  )
}

// Fetch all products for the (future) /products index
export async function getProducts() {
  return client.fetch(
    `*[_type == "product" && coalesce(status, "internal") != "archived"]
      | order(coalesce(order, 100) asc, title asc) {
        _id,
        title,
        "slug": slug.current,
        summary,
        status,
        "category": category->title
      }`,
  )
}
