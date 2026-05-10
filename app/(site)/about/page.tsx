import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description:
    "Selfbyt is a small research lab working on computing systems and machine learning.",
}

const PRINCIPLES = [
  {
    no: "i.",
    title: "Measurements over manifestos",
    body: "Concrete numbers, reproducible setups, and code people can actually run. Claims that aren't measurable get cut.",
  },
  {
    no: "ii.",
    title: "Systems and learning together",
    body: "We work where the algorithms meet the hardware. Inference paths, memory layout, and model structure are studied as one thing, not three.",
  },
  {
    no: "iii.",
    title: "Open notes, when we can",
    body: "We share method notes, scripts, and partial results — not just polished papers. Some work stays internal while it's still rough.",
  },
  {
    no: "iv.",
    title: "Small on purpose",
    body: "We stay small so we can focus. Fewer people, fewer meetings, more time on the actual problem.",
  },
]

const WORK = [
  {
    label: "Research",
    body: "Papers, technical reports, and reproducible experiments on inference, sparsity, and evaluation.",
    href: "/research",
    cta: "Read research",
  },
  {
    label: "Writing",
    body: "Method notes, post-mortems, and shorter pieces about what we're working on right now.",
    href: "/blog",
    cta: "Browse writing",
  },
  {
    label: "Software",
    body: "Internal tools we use day to day. Some get released; some stay in-house while we harden them.",
    href: "/contact",
    cta: "Ask about access",
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
        <div className="container py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">About</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                Selfbyt is a small research group working on computing systems
                and machine learning.
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                We publish papers and notes, share code where we can, and build
                a few internal tools that we use ourselves. The site is the
                archive of that work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
        <div className="container py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">How we work</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <ul className="grid gap-x-12 gap-y-12 md:grid-cols-2">
                {PRINCIPLES.map((p) => (
                  <li key={p.title} className="border-t pt-5" style={{ borderColor: "hsl(var(--rule))" }}>
                    <p className="font-mono text-xs text-muted-foreground">{p.no}</p>
                    <h3 className="mt-2 text-base font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
        <div className="container py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">What we do</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <ul className="divide-y" style={{ borderColor: "hsl(var(--rule))" }}>
                {WORK.map((item) => (
                  <li
                    key={item.label}
                    className="grid grid-cols-12 gap-6 border-t py-8 first:border-t-0 first:pt-0"
                    style={{ borderColor: "hsl(var(--rule))" }}
                  >
                    <p className="col-span-12 font-mono text-xs uppercase tracking-wider text-muted-foreground sm:col-span-3">
                      {item.label}
                    </p>
                    <div className="col-span-12 sm:col-span-9">
                      <p className="max-w-2xl text-base leading-relaxed text-foreground/90 md:text-[17px]">
                        {item.body}
                      </p>
                      <Link
                        href={item.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                      >
                        <span className="border-b border-foreground/40 pb-0.5 transition-colors hover:border-foreground">
                          {item.cta}
                        </span>
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">Get in touch</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <p className="max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">
                We're open to research collaboration, careful conversation about
                a paper, or questions about our software.{" "}
                <a
                  href="mailto:hello@selfbyt.com"
                  className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
                >
                  hello@selfbyt.com
                </a>{" "}
                is the fastest path.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
