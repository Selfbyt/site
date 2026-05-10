import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

import { getResearchPapers } from "@/lib/sanity"

export const metadata: Metadata = {
  title: "Research",
  description:
    "Selfbyt research papers, technical reports, and reproducible experiments.",
}

// 24h. Sanity webhook (/api/revalidate) handles immediate updates.
export const revalidate = 86400

type Paper = {
  _id: string
  title: string
  slug: { current: string }
  abstract: string
  category: string
  publishedAt: string
  authors: string[]
  pdfUrl?: string
}

export default async function ResearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>
}) {
  const papers = (await getResearchPapers()) as Paper[] | null
  const sp = (await searchParams) || {}

  if (!papers) notFound()

  const categories = Array.from(
    new Set(papers.map((p) => p.category).filter(Boolean)),
  )
  const active = sp.category && categories.includes(sp.category) ? sp.category : "All"

  const filtered =
    active === "All" ? papers : papers.filter((p) => p.category === active)

  return (
    <>
      <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
        <div className="container py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">Research</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                Papers, technical reports, and reproducible experiments.
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                The full archive in reverse chronological order. Filter by area
                if you have a specific question in mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">Archive</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              {categories.length > 0 && (
                <nav
                  aria-label="Filter by category"
                  className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b pb-5 font-mono text-[11px] uppercase tracking-wider"
                  style={{ borderColor: "hsl(var(--rule))" }}
                >
                  <FilterLink label="All" active={active === "All"} href="/research" />
                  {categories.map((c) => (
                    <FilterLink
                      key={c}
                      label={c}
                      active={active === c}
                      href={`/research?category=${encodeURIComponent(c)}`}
                    />
                  ))}
                </nav>
              )}

              {filtered.length === 0 ? (
                <p className="mt-12 text-sm text-muted-foreground">
                  No papers in this category yet.
                </p>
              ) : (
                <ul className="mt-2">
                  {filtered.map((paper) => {
                    const formattedDate = new Date(paper.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    return (
                      <li
                        key={paper._id}
                        className="border-b py-8 first:pt-10"
                        style={{ borderColor: "hsl(var(--rule))" }}
                      >
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
                          <h2 className="mt-3 max-w-3xl text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-muted-foreground md:text-xl">
                            {paper.title}
                          </h2>
                          {paper.authors?.length ? (
                            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">
                              {paper.authors.join(" · ")}
                            </p>
                          ) : null}
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
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function FilterLink({
  label,
  active,
  href,
}: {
  label: string
  active: boolean
  href: string
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  )
}
