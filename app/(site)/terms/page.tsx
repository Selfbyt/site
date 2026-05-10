import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Selfbyt website and services.",
}

const LAST_UPDATED = "May 10, 2026"

export default function TermsPage() {
  return (
    <>
      <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
        <div className="container py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">Terms</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-[2.75rem]">
                Terms of use
              </h1>
              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Last updated · {LAST_UPDATED}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2 hidden md:block">
              <p className="label-mono">Terms</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <div className="prose-selfbyt max-w-3xl">
                <p>
                  By using selfbyt.com you agree to the points below. If any of
                  this is unworkable for your use case, write to{" "}
                  <a href="mailto:hello@selfbyt.com">hello@selfbyt.com</a> and
                  we'll figure it out.
                </p>

                <h2>Use of the site</h2>
                <p>
                  You can read, link to, and quote material on this site for
                  personal, academic, or journalistic use. Don't reproduce
                  whole pieces of writing without permission, and don't try to
                  break, abuse, or scrape the site at a rate that hurts other
                  visitors.
                </p>

                <h2>Research and writing</h2>
                <p>
                  Papers, posts, and code on this site are provided as-is for
                  informational purposes. Findings can be revised; treat the
                  most recent version as authoritative. Where we publish code
                  with an open-source license, that license governs that code.
                </p>

                <h2>Software</h2>
                <p>
                  Our internal software (including cortexSDR) is not currently
                  released to the public. Any access we grant is on a
                  case-by-case basis and may come with its own terms.
                </p>

                <h2>Trademarks</h2>
                <p>
                  "Selfbyt" and the Selfbyt mark are ours. Don't use them in a
                  way that suggests endorsement of work that isn't ours.
                </p>

                <h2>Liability</h2>
                <p>
                  We provide this site and its content without warranty. We
                  aren't liable for losses arising from use of the site beyond
                  what the law requires of us.
                </p>

                <h2>Changes</h2>
                <p>
                  We may update these terms occasionally. The date at the top
                  reflects the most recent change.
                </p>

                <h2>Contact</h2>
                <p>
                  Questions about these terms go to{" "}
                  <a href="mailto:hello@selfbyt.com">hello@selfbyt.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
