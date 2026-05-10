import Link from "next/link"
import { ArrowRight } from "lucide-react"

import {
  getRecentResearchPapers,
  getRecentBlogPosts,
  getFeaturedProducts,
} from "@/lib/sanity"
import { NewsletterSignup } from "@/components/newsletter-signup"

// 6 hours. Sanity webhook (/api/revalidate) handles immediate updates.
export const revalidate = 21600

const FOCUS_AREAS = [
  {
    no: "a.",
    title: "Computing systems",
    body: "Inference paths, memory behavior, and runtime measurements on real hardware.",
    tags: ["Inference", "Compression", "Profiling"],
  },
  {
    no: "b.",
    title: "Learning methods",
    body: "Models and representations where the structure is explicit and the evaluation is honest.",
    tags: ["Sparse structure", "Architecture", "Evaluation"],
  },
  {
    no: "c.",
    title: "Practice",
    body: "Method notes, shared artifacts, and writing — described well enough to build on.",
    tags: ["Notes", "Code", "Papers"],
  },
]

type Paper = {
  _id: string
  title: string
  slug: { current: string }
  abstract: string
  category: string
  publishedAt: string
}

type Post = {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  author?: string
}

type Product = {
  _id: string
  title: string
  slug?: string
  summary?: string
  description?: string
  status?: "internal" | "alpha" | "beta" | "public" | "archived"
  category?: string
  cta?: { label?: string; href?: string }
}

const STATUS_LABEL: Record<NonNullable<Product["status"]>, string> = {
  internal: "Internal · early access",
  alpha: "Private alpha",
  beta: "Private beta",
  public: "Public",
  archived: "Archived",
}

async function safe<T>(fn: () => Promise<unknown>): Promise<T[] | null> {
  try {
    const result = (await fn()) as T[] | null | undefined
    return result ?? null
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[home] sanity fetch failed:", err)
    }
    return null
  }
}

export default async function Home() {
  const [papers, posts, products] = await Promise.all([
    safe<Paper[]>(() => getRecentResearchPapers(3)),
    safe<Post[]>(() => getRecentBlogPosts(3)),
    safe<Product[]>(() => getFeaturedProducts(2)),
  ])

  const blocks: { key: string; render: (no: string) => React.ReactNode }[] = []

  blocks.push({
    key: "lab",
    render: (no) => <Hero no={no} key="lab" />,
  })

  blocks.push({
    key: "focus",
    render: (no) => <Focus no={no} key="focus" />,
  })

  if (papers && papers.length > 0) {
    blocks.push({
      key: "research",
      render: (no) => <ResearchBlock no={no} key="research" papers={papers} />,
    })
  }

  if (posts && posts.length > 0) {
    blocks.push({
      key: "writing",
      render: (no) => <WritingBlock no={no} key="writing" posts={posts} />,
    })
  }

  if (products && products.length > 0) {
    blocks.push({
      key: "software",
      render: (no) => (
        <SoftwareBlock no={no} key="software" products={products} />
      ),
    })
  }

  blocks.push({
    key: "subscribe",
    render: (no) => (
      <NewsletterSignup
        key="subscribe"
        sectionLabel={`${no} / Subscribe`}
      />
    ),
  })

  return (
    <>
      {blocks.map((b, i) => b.render(formatNo(i + 1)))}
    </>
  )
}

function formatNo(n: number) {
  return String(n).padStart(2, "0")
}

function SectionHeader({ no, label }: { no: string; label: string }) {
  return (
    <p className="label-mono">
      {no} / {label}
    </p>
  )
}

function Hero({ no }: { no: string }) {
  return (
    <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
      <div className="container py-20 md:py-28 lg:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionHeader no={no} label="Lab" />
          </div>
          <div className="md:col-span-10 lg:col-span-9">
            <h1 className="text-balance text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              Building research and software for{" "}
              <span className="text-muted-foreground">intelligent systems</span>.
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Papers, notes, and the tools behind them.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
              <Link
                href="/research"
                className="group inline-flex items-center gap-2 font-medium text-foreground"
              >
                <span className="border-b border-foreground/40 pb-0.5 transition-colors group-hover:border-foreground">
                  Read research
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-foreground"
              >
                Browse writing
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Focus({ no }: { no: string }) {
  return (
    <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
      <div className="container py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionHeader no={no} label="Focus" />
          </div>
          <div className="md:col-span-10 lg:col-span-9">
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl md:text-[1.875rem]">
              Three overlapping tracks: how things run, how they learn, and how
              we describe what we did.
            </h2>
            <ul className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
              {FOCUS_AREAS.map((area) => (
                <li
                  key={area.title}
                  className="border-t pt-5"
                  style={{ borderColor: "hsl(var(--rule))" }}
                >
                  <p className="font-mono text-xs text-muted-foreground">{area.no}</p>
                  <h3 className="mt-2 text-base font-semibold tracking-tight">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {area.body}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">
                    {area.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResearchBlock({ no, papers }: { no: string; papers: Paper[] }) {
  return (
    <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
      <div className="container py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionHeader no={no} label="Research" />
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
            <ul className="mt-12">
              {papers.map((paper) => {
                const date = new Date(paper.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                return (
                  <li
                    key={paper._id}
                    className="border-t py-8 first:border-t-0 first:pt-0"
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
                          {date}
                        </time>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-muted-foreground md:text-xl">
                        {paper.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                        {paper.abstract}
                      </p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function WritingBlock({ no, posts }: { no: string; posts: Post[] }) {
  return (
    <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
      <div className="container py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionHeader no={no} label="Writing" />
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
            <ul className="mt-12">
              {posts.map((post) => {
                const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
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
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="group block"
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <time className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                          {date}
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
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function SoftwareBlock({ no, products }: { no: string; products: Product[] }) {
  return (
    <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
      <div className="container py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionHeader no={no} label="Software" />
          </div>
          <div className="md:col-span-10 lg:col-span-9">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                What we ship
              </h2>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {products.length} {products.length === 1 ? "product" : "products"}
              </p>
            </div>
            <ul className="mt-12">
              {products.map((p) => (
                <ProductRow key={p._id} product={p} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductRow({ product }: { product: Product }) {
  const status = product.status ?? "internal"
  const statusLabel = STATUS_LABEL[status] ?? "Internal"
  const ctaLabel = product.cta?.label ?? "Ask about access"
  const ctaHref = product.cta?.href ?? "/contact"
  const summary = product.summary ?? product.description

  return (
    <li
      className="grid grid-cols-12 gap-6 border-t py-8 first:border-t-0 first:pt-0"
      style={{ borderColor: "hsl(var(--rule))" }}
    >
      <div className="col-span-12 sm:col-span-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {statusLabel}
        </p>
      </div>
      <div className="col-span-12 sm:col-span-9">
        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
          {product.title}
        </h3>
        {summary ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-[17px]">
            {summary}
          </p>
        ) : null}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <CtaLink href={ctaHref} label={ctaLabel} />
        </div>
      </div>
    </li>
  )
}

function CtaLink({ href, label }: { href: string; label: string }) {
  const isExternal = /^https?:/i.test(href)
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 font-medium text-foreground"
      >
        <span className="border-b border-foreground/40 pb-0.5 transition-colors group-hover:border-foreground">
          {label}
        </span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    )
  }
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 font-medium text-foreground"
    >
      <span className="border-b border-foreground/40 pb-0.5 transition-colors group-hover:border-foreground">
        {label}
      </span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}

