// Re-export the homepage component from (site)
// This is a common pattern in Next.js App Router when using route groups

// The studio route will still work separately because it has its own module
// (/studio/[[...tool]]/page.tsx) that handles that specific route pattern

import type { Metadata } from 'next'

// Share the same metadata as the site page
export const metadata: Metadata = {
  title: "Selfbyt - Research-Driven Organization",
  description:
    "Selfbyt is a research-driven organization dedicated to advancing the intersection of neuroscience, artificial intelligence, and human-computer interaction.",
}

// Export the (site) page content for the root URL
// Since the layout.tsx handles wrapping everything, this will inherit
// the root layout with body and html tags
// The (site) route will render page with the (site)/layout.tsx
// This is a clean way to handle the conflict without redirect loops
export { default } from './(site)/page';
