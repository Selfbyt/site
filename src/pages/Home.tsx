import { useContent, usePageLocation } from "@/src/content";
import { pageMetadata } from "@/lib/metadata";
import Link from "@/components/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { DISCORD_INVITE_URL } from "@/lib/community";

export const metadata = pageMetadata({ path: "/" });

export default function Home() {
  const content = useContent();
  const papers = content.papers.slice(0, 2);
  const posts = content.posts.slice(0, 2);
  const articles = [
    ...papers.map((p) => ({
      ...p,
      kind: "Research",
      href: `/research/${p.slug.current}`,
    })),
    ...posts.map((p) => ({
      ...p,
      kind: "Writing",
      href: `/blog/${p.slug.current}`,
    })),
  ];
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <h1>
              Intelligence.
              <br />
              Built from
              <br />
              <span>the foundations.</span>
            </h1>
            <p className="hero-description">
              We build AI infrastructure and explore new ways to represent and
              run models. From the systems underneath to the intelligence ahead.
            </p>
            <div className="hero-actions">
              <Link href="#work" className="brand-button">
                Explore our work <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/about" className="text-link">
                Meet Selfbyt <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="hero-figure" aria-hidden="true">
            <div className="figure-top">
              <span>SELFBYT / FIELD 001</span>
              <span>○ → ●</span>
            </div>
            <svg viewBox="0 0 500 450" className="foundation-art">
              <defs>
                <pattern
                  id="field-grid"
                  width="22"
                  height="22"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="1" fill="#365cf5" opacity=".22" />
                </pattern>
                <pattern
                  id="field-lines"
                  width="5"
                  height="5"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 0V5"
                    stroke="#365cf5"
                    strokeWidth="1"
                    opacity=".23"
                  />
                </pattern>
                <clipPath id="field-disc">
                  <circle cx="325" cy="245" r="126" />
                </clipPath>
              </defs>
              <rect width="500" height="450" fill="url(#field-grid)" />
              <path
                d="M0 245H500M175 0V450M325 0V450"
                stroke="#365cf5"
                opacity=".17"
                strokeDasharray="3 6"
              />
              <circle
                cx="175"
                cy="205"
                r="126"
                fill="url(#field-lines)"
                stroke="#365cf5"
                strokeWidth="1"
              />
              <circle
                cx="175"
                cy="205"
                r="104"
                fill="#f4f2ec"
                stroke="#365cf5"
                strokeWidth="1"
              />
              <circle
                cx="175"
                cy="205"
                r="82"
                fill="none"
                stroke="#365cf5"
                strokeWidth="1"
              />
              <circle cx="325" cy="245" r="126" fill="#365cf5" />
              <g
                clipPath="url(#field-disc)"
                stroke="#f4f2ec"
                opacity=".25"
                fill="none"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <ellipse
                    key={i}
                    cx="325"
                    cy="245"
                    rx={12 + i * 10}
                    ry="126"
                  />
                ))}
                {Array.from({ length: 9 }, (_, i) => (
                  <path key={i} d={`M195 ${149 + i * 24}H455`} />
                ))}
              </g>
              <circle cx="175" cy="205" r="4" fill="#365cf5" />
              <path
                d="M175 205H325V245"
                fill="none"
                stroke="#131820"
                strokeWidth="1"
              />
              <circle cx="325" cy="245" r="4" fill="#f4f2ec" />
              <path d="M37 70h14m-7-7v14M450 375h14m-7-7v14" stroke="#365cf5" />
            </svg>
            <div className="figure-bottom">
              <span>From possibility</span>
              <span>to working systems ↗</span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="hero-index">
            <span className="eyebrow">Our field of work</span>
            <div>
              <span>AI infrastructure</span>
              <span>Experimental research</span>
              <span>
                Future models <ArrowUpRight size={13} />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="work" className="inquiry-section">
        <div className="container inquiry-layout">
          <div>
            <p className="eyebrow">01 / What we’re exploring</p>
            <h2>
              What if intelligence
              <br />
              could work
              <br />
              <span>with less?</span>
            </h2>
            <p className="inquiry-intro">
              Less memory. Less unnecessary computation. More room to explore
              what’s possible.
            </p>
            <Link href="/research" className="text-link">
              Explore our research <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="inquiry-list">
            {[
              [
                "01",
                "Rethink the representation.",
                "How can we represent what a model knows in a more useful form? We investigate the structure inside model weights and explore alternative representations.",
                "Representations / Model structure",
              ],
              [
                "02",
                "Reconsider the computation.",
                "What needs to happen for a model to produce an answer? We build and measure alternative execution paths, with memory and hardware in view.",
                "Inference / Systems",
              ],
              [
                "03",
                "Build toward what’s next.",
                "Infrastructure is our starting point. What we learn will inform our future work on model architectures and learning methods.",
                "Models / Future direction",
              ],
            ].map(([no, title, body, tags]) => (
              <article key={no}>
                <span className="inquiry-no">{no}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <span className="eyebrow">{tags}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="method-section container">
        <p className="eyebrow">02 / How we work</p>
        <div className="method-statement">
          <h2>
            Curiosity starts it.
            <br />
            <span>Evidence moves it forward.</span>
          </h2>
          <div>
            <p>
              We follow an idea into code, put it against a baseline, and look
              closely at what happens. The useful findings become tools. The
              open questions become the next experiment.
            </p>
            <Link href="/about" className="text-link">
              More about our approach{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="method-steps">
          {["Question", "Build", "Measure", "Learn"].map((s, i) => (
            <div key={s}>
              <span>0{i + 1}</span>
              {s}
              <ArrowRight size={17} aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>
      {articles.length > 0 && (
        <section className="notes-section container">
          <div className="notes-heading">
            <div>
              <p className="eyebrow">From the lab</p>
              <h2>Work, in words.</h2>
            </div>
            <Link href="/blog" className="text-link">
              All writing <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="notes-grid">
            {articles.map((a) => (
              <Link
                key={`${a.kind}-${a._id}`}
                href={a.href}
                className="note-card"
              >
                <div className="eyebrow">
                  {a.kind}
                  <ArrowUpRight size={16} />
                </div>
                <h3>{a.title}</h3>
                <p>{a.abstract ?? a.excerpt}</p>
                <time dateTime={a.publishedAt}>
                  {new Date(a.publishedAt).toLocaleDateString("en-GB", {
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              </Link>
            ))}
          </div>
        </section>
      )}
      <div className="home-newsletter">
        <section className="container py-16">
          <p className="eyebrow">Community</p>
          <div className="method-statement">
            <h2>Build with us.</h2>
            <div>
              <p>
                Join developers exploring how to run AI with less compute.
                Share your setup, discuss benchmarks, and help shape what we build.
              </p>
              <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer" className="brand-button">
                Join us on Discord <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <NewsletterSignup sectionLabel="Stay curious" />
      </div>
    </div>
  );
}
