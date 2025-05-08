import { NextResponse } from "next/server"

// This would typically connect to a database or CMS
// For demonstration, we're using static data
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
]

export async function GET(request: Request) {
  // You could add filtering, pagination, etc. here
  return NextResponse.json(researchPapers)
}
