import { NextResponse } from "next/server"

// This would typically connect to a database or CMS
// For demonstration, we're using static data
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
]

export async function GET(request: Request) {
  // You could add filtering, pagination, etc. here
  return NextResponse.json(caseStudies)
}
