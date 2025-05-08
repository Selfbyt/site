import Link from "next/link"
import { ArrowLeft, Calendar, Download, User } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getResearchPaperBySlug } from "@/lib/sanity"
import { PortableText } from "@/components/portable-text"

export const revalidate = 3600 // Revalidate this page every hour

export default async function ResearchPaperPage({ params }: { params: { slug: string } }) {
  // Await the params object before using its properties to comply with Next.js 15
  const validParams = await Promise.resolve(params)
  const paper = await getResearchPaperBySlug(validParams.slug)

  if (!paper) {
    notFound()
  }

  // Format the date
  const formattedDate = new Date(paper.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col min-h-screen">
      <article className="container max-w-4xl px-4 py-12 md:py-20">
        <Link href="/research" passHref>
          <Button variant="ghost" className="mb-8 pl-0 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Research
          </Button>
        </Link>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{paper.title}</h1>

        <div className="flex items-center gap-4 mt-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{paper.authors.join(", ")}</span>
          </div>
        </div>

        <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
          <h2 className="text-lg font-semibold mb-2">Abstract</h2>
          <p>{paper.abstract}</p>
        </div>

        {paper.pdfUrl && (
          <div className="mt-4 flex justify-end">
            <Link href={paper.pdfUrl} passHref>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </Link>
          </div>
        )}

        <Separator className="my-8" />

        <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight">
          <PortableText content={paper.body} />
        </div>
      </article>
    </div>
  )
}
