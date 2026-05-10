"use client"

import { PortableText as PortableTextComponent } from "@portabletext/react"
import type { PortableTextBlock } from "@portabletext/types"
import Image from "next/image"
import Link from "next/link"

import { urlFor } from "@/lib/sanity"

const components = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-10">
        <div className="relative w-full overflow-hidden border" style={{ borderColor: "hsl(var(--rule))" }}>
          <Image
            src={urlFor(value).width(1400).url() || "/placeholder.svg"}
            alt={value.alt || ""}
            width={1400}
            height={900}
            className="h-auto w-full object-cover"
          />
        </div>
        {value.caption ? (
          <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {value.caption}
          </figcaption>
        ) : null}
      </figure>
    ),
    callout: ({ value }: any) => (
      <aside className="my-8 border-l-2 pl-5 text-foreground/90" style={{ borderColor: "hsl(var(--accent))" }}>
        <p>{value.text}</p>
      </aside>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const isExternal = !value.href.startsWith("/")
      const rel = isExternal ? "noreferrer noopener" : undefined
      const target = isExternal ? "_blank" : undefined
      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
        >
          {children}
        </Link>
      )
    },
    code: ({ children }: any) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h2 className="mt-12 mb-3 text-2xl font-semibold tracking-tight">{children}</h2>
    ),
    h2: ({ children }: any) => (
      <h2 className="mt-12 mb-3 text-xl font-semibold tracking-tight">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-8 mb-2 text-base font-semibold tracking-tight">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mt-6 mb-2 text-base font-semibold tracking-tight text-muted-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote
        className="my-6 border-l-2 pl-5 italic text-muted-foreground"
        style={{ borderColor: "hsl(var(--rule))" }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-4 list-disc space-y-1.5 pl-5 marker:text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-4 list-decimal space-y-1.5 pl-5 marker:text-muted-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
}

interface PortableTextProps {
  content: PortableTextBlock[]
}

export function PortableText({ content }: PortableTextProps) {
  return <PortableTextComponent value={content} components={components} />
}
