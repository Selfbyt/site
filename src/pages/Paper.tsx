import { useContent, usePageLocation } from "@/src/content";
import { NotFound } from "@/src/not-found";
import Link from "@/components/link";
import { ArrowLeft, Download } from "lucide-react";

import { PortableText } from "@/components/portable-text";

export default function PaperPage() {
  const { pathname } = usePageLocation();
  const paper = useContent().papers.find(item => item.slug.current === decodeURIComponent(pathname.split("/").pop() || ""));
  if (!paper) return <NotFound />;

  const formattedDate = new Date(paper.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
                      timeZone: "UTC",
    },
  );

  return (
    <article>
      <header className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
        <div className="container py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <Link
                href="/research"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3 w-3" />
                Back
              </Link>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {paper.category} · {formattedDate}
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-[2.75rem]">
                {paper.title}
              </h1>
              {paper.authors?.length ? (
                <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {paper.authors.join(" · ")}
                </p>
              ) : null}
              {paper.pdfUrl ? (
                <div className="mt-8">
                  <Link
                    href={paper.pdfUrl}
                    className="inline-flex items-center gap-2 border px-4 py-2 text-sm hover:bg-muted"
                    style={{ borderColor: "hsl(var(--rule))" }}
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <p className="label-mono">Abstract</p>
          </div>
          <div className="md:col-span-10 lg:col-span-9">
            <p className="max-w-3xl text-base leading-relaxed text-foreground/90 md:text-lg">
              {paper.abstract}
            </p>
          </div>
        </div>
      </div>

      {paper.body ? (
        <div className="border-t" style={{ borderColor: "hsl(var(--rule))" }}>
          <div className="container py-12 md:py-16">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-2">
                <p className="label-mono">Paper</p>
              </div>
              <div className="md:col-span-10 lg:col-span-9">
                <div className="prose-selfbyt max-w-3xl">
                  <PortableText content={paper.body} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
