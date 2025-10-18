/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://selfbyt.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/studio/*', '/api/*'],
  additionalPaths: async (config) => {
    const { createClient } = require('next-sanity')
    
    // Initialize Sanity client
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
      useCdn: false, // Don't use CDN for build-time generation
    })

    const additionalPaths = []

    try {
      // Fetch all blog posts
      const blogPosts = await client.fetch(
        `*[_type == "post"] | order(publishedAt desc) {
          slug
        }`
      )
      
      // Fetch all case studies
      const caseStudies = await client.fetch(
        `*[_type == "caseStudy"] | order(publishedAt desc) {
          slug
        }`
      )
      
      // Fetch all products
      const products = await client.fetch(
        `*[_type == "product"] | order(title asc) {
          slug
        }`
      )
      
      // Fetch all research papers
      const researchPapers = await client.fetch(
        `*[_type == "researchPaper"] | order(publishedAt desc) {
          slug
        }`
      )

      // Add blog post paths
      blogPosts.forEach((post) => {
        if (post.slug?.current) {
          additionalPaths.push({
            loc: `/blog/${post.slug.current}`,
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date().toISOString(),
          })
        }
      })

      // Add case study paths
      caseStudies.forEach((caseStudy) => {
        if (caseStudy.slug?.current) {
          additionalPaths.push({
            loc: `/case-studies/${caseStudy.slug.current}`,
            changefreq: 'monthly',
            priority: 0.8,
            lastmod: new Date().toISOString(),
          })
        }
      })

      // Add product paths
      products.forEach((product) => {
        if (product.slug?.current) {
          additionalPaths.push({
            loc: `/products/${product.slug.current}`,
            changefreq: 'monthly',
            priority: 0.9,
            lastmod: new Date().toISOString(),
          })
        }
      })

      // Add research paper paths
      researchPapers.forEach((paper) => {
        if (paper.slug?.current) {
          additionalPaths.push({
            loc: `/research/${paper.slug.current}`,
            changefreq: 'monthly',
            priority: 0.8,
            lastmod: new Date().toISOString(),
          })
        }
      })
    } catch (error) {
      console.warn('Failed to fetch dynamic routes for sitemap:', error)
    }

    return additionalPaths
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://selfbyt.com/sitemap.xml',
    ],
  },
}

