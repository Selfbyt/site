import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getRecentResearchPapers } from "@/lib/sanity"

export async function FeaturedResearch() {
  const featuredResearch = await getRecentResearchPapers(3)

  return (
    <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
      <div className="container py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <p className="label-mono">03 / Research</p>
          </div>
          <div className="md:col-span-10 lg:col-span-9">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Recent papers
              </h2>
              <Link
                href="/research"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                All research →
              </Link>
            </div>

            {featuredResearch?.length ? (
              <ul className="mt-12 divide-y" style={{ borderColor: "hsl(var(--rule))" }}>
                {featuredResearch.map((paper: any) => {
                  const formattedDate = new Date(paper.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })

                  return (
                    <li key={paper._id} className="border-t py-8 first:border-t-0 first:pt-0" style={{ borderColor: "hsl(var(--rule))" }}>
                      <Link
                        href={`/research/${paper.slug.current}`}
                        className="group block"
                      >
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                            {paper.category}
                          </p>
                          <time className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
                            {formattedDate}
                          </time>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-muted-foreground md:text-xl">
                          {paper.title}
                        </h3>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                          {paper.abstract}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground">
                          <span className="border-b border-foreground/40 pb-0.5 transition-colors group-hover:border-foreground">
                            Read paper
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="mt-12 text-sm text-muted-foreground">
                Nothing published yet. Check back soon.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
