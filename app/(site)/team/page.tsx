import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Team",
  description:
    "Selfbyt is a small, distributed group. We're open to collaboration, hiring, and the occasional visiting researcher.",
}

const ROLES = [
  {
    label: "Research",
    body: "If you've shipped work on inference, sparsity, compilers for ML, or honest evaluation methods, we'd like to read it before we talk.",
  },
  {
    label: "Engineering",
    body: "Systems engineers comfortable in C++, CUDA, or low-level Python. Bonus if you have opinions about benchmarks.",
  },
  {
    label: "Collaborators",
    body: "Labs, individual researchers, or companies with a problem we both find interesting. We're cautious with new collaborations and slow to start them.",
  },
]

export default function TeamPage() {
  return (
    <>
      <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
        <div className="container py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">Team</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                Small group. Distributed. We hire rarely and carefully.
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Selfbyt isn't a hiring funnel — it's a research group that
                occasionally has room for one more person. If our work
                resonates and your background overlaps, we'd like to hear from
                you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
        <div className="container py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">Who fits</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <ul className="divide-y" style={{ borderColor: "hsl(var(--rule))" }}>
                {ROLES.map((role) => (
                  <li
                    key={role.label}
                    className="grid grid-cols-12 gap-6 border-t py-8 first:border-t-0 first:pt-0"
                    style={{ borderColor: "hsl(var(--rule))" }}
                  >
                    <p className="col-span-12 font-mono text-xs uppercase tracking-wider text-muted-foreground sm:col-span-3">
                      {role.label}
                    </p>
                    <p className="col-span-12 max-w-2xl text-base leading-relaxed text-foreground/90 sm:col-span-9 md:text-[17px]">
                      {role.body}
                    </p>
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
              <p className="label-mono">Reach out</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <p className="max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">
                A short note about what you've worked on and what you'd want to
                work on with us is the right opening move. No CV needed up
                front. Send it to{" "}
                <a
                  href="mailto:hello@selfbyt.com"
                  className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
                >
                  hello@selfbyt.com
                </a>
                {" "}or use the{" "}
                <Link
                  href="/contact"
                  className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
                >
                  contact form
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
