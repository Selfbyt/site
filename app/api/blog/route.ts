import { NextResponse } from "next/server"

// This would typically connect to a database or CMS
// For demonstration, we're using static data
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
]

export async function GET(request: Request) {
  // You could add filtering, pagination, etc. here
  return NextResponse.json(blogPosts)
}
