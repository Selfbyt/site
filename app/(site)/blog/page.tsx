import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

import { getBlogPosts } from "@/lib/sanity"

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Method notes, post-mortems, and short pieces from the Selfbyt lab.",
}

// 24h. Sanity webhook (/api/revalidate) handles immediate updates.
export const revalidate = 86400

type Post = {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  category: string
  publishedAt: string
  author: string
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>
}) {
  const posts = (await getBlogPosts()) as Post[] | null
  const sp = (await searchParams) || {}

  if (!posts) notFound()

  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean)),
  )
  const active = sp.category && categories.includes(sp.category) ? sp.category : "All"

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active)

  return (
    <>
      <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
        <div className="container py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">Writing</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                Notes, post-mortems, and shorter pieces.
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Less formal than papers, more concrete than blog posts usually
                get. Mostly about what we tried, what worked, and what didn't.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">All posts</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              {categories.length > 0 && (
                <nav
                  aria-label="Filter by category"
                  className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b pb-5 font-mono text-[11px] uppercase tracking-wider"
                  style={{ borderColor: "hsl(var(--rule))" }}
                >
                  <FilterLink label="All" active={active === "All"} href="/blog" />
                  {categories.map((c) => (
                    <FilterLink
                      key={c}
                      label={c}
                      active={active === c}
                      href={`/blog?category=${encodeURIComponent(c)}`}
                    />
                  ))}
                </nav>
              )}

              {filtered.length === 0 ? (
                <p className="mt-12 text-sm text-muted-foreground">
                  No posts in this category yet.
                </p>
              ) : (
                <ul>
                  {filtered.map((post) => {
                    const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    return (
                      <li
                        key={post._id}
                        className="border-b py-8 first:pt-10"
                        style={{ borderColor: "hsl(var(--rule))" }}
                      >
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="group block"
                        >
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                              {post.category}
                            </p>
                            <time className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
                              {formattedDate}
                              {post.author ? ` · ${post.author}` : ""}
                            </time>
                          </div>
                          <h2 className="mt-3 max-w-3xl text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-muted-foreground md:text-xl">
                            {post.title}
                          </h2>
                          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                            {post.excerpt}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground">
                            <span className="border-b border-foreground/40 pb-0.5 transition-colors group-hover:border-foreground">
                              Read post
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
