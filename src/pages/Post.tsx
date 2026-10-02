import { useContent, usePageLocation } from "@/src/content";
import { NotFound } from "@/src/not-found";
import Link from "@/components/link";
import { ArrowLeft } from "lucide-react";

import { PortableText } from "@/components/portable-text";

export default function PostPage() {
  const { pathname } = usePageLocation();
  const post = useContent().posts.find(item => item.slug.current === decodeURIComponent(pathname.split("/").pop() || ""));
  if (!post) return <NotFound />;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
                      timeZone: "UTC",
  });

  return (
    <article>
      <header className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
        <div className="container py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3 w-3" />
                Back
              </Link>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {post.category ? `${post.category} · ` : ""}
                {formattedDate}
                {post.author ? ` · ${post.author}` : ""}
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-[2.75rem]">
                {post.title}
              </h1>
              {post.excerpt ? (
                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  {post.excerpt}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-2 hidden md:block">
            <p className="label-mono">Post</p>
          </div>
          <div className="md:col-span-10 lg:col-span-9">
            <div className="prose-selfbyt max-w-3xl">
              <PortableText content={post.body} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
