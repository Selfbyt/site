import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getRecentBlogPosts } from "@/lib/sanity"

export async function LatestPosts() {
  const latestPosts = await getRecentBlogPosts(3)

  return (
    <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
      <div className="container py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <p className="label-mono">04 / Writing</p>
          </div>
          <div className="md:col-span-10 lg:col-span-9">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Recent notes
              </h2>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                All writing →
              </Link>
            </div>

            {latestPosts?.length ? (
              <ul className="mt-12">
                {latestPosts.map((post: any) => {
                  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })

                  return (
                    <li
                      key={post._id}
                      className="border-t py-8 first:border-t-0 first:pt-0"
                      style={{ borderColor: "hsl(var(--rule))" }}
                    >
                      <Link href={`/blog/${post.slug.current}`} className="group block">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <time className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                            {formattedDate}
                          </time>
                          {post.author ? (
                            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
                              {post.author}
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-muted-foreground md:text-xl">
                          {post.title}
                        </h3>
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
            ) : (
              <p className="mt-12 text-sm text-muted-foreground">
                No posts yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
