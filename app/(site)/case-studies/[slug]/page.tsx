import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getCaseStudyBySlug } from "@/lib/sanity"
import { PortableText } from "@/components/portable-text"

export const revalidate = 3600 // Revalidate this page every hour

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  // Await the params object before using its properties to comply with Next.js 15
  const validParams = await Promise.resolve(params)
  const caseStudy = await getCaseStudyBySlug(validParams.slug)

  if (!caseStudy) {
    notFound()
  }

  // Format the date
  const formattedDate = new Date(caseStudy.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col min-h-screen">
      <article className="container max-w-4xl px-4 py-12 md:py-20">
        <Link href="/case-studies" passHref>
          <Button variant="ghost" className="mb-8 pl-0 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case Studies
          </Button>
        </Link>

        <div className="text-sm text-[#1804FF] font-medium mb-2">{caseStudy.category}</div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{caseStudy.title}</h1>

        <div className="flex items-center gap-4 mt-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          {caseStudy.authors && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{caseStudy.authors.join(", ")}</span>
            </div>
          )}
        </div>

        <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
          <h2 className="text-lg font-semibold mb-2">Client</h2>
          <p>{caseStudy.client}</p>
          {caseStudy.summary && (
            <>
              <h2 className="text-lg font-semibold mt-4 mb-2">Summary</h2>
              <p>{caseStudy.summary}</p>
            </>
          )}
        </div>

        <Separator className="my-8" />

        <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight">
          <PortableText content={caseStudy.body} />
        </div>
      </article>
    </div>
  )
}
