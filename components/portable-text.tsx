"use client"

import { PortableText as PortableTextComponent } from "@portabletext/react"
import type { PortableTextBlock } from "@portabletext/types"
import Image from "next/image"
import Link from "next/link"

import { urlFor } from "@/lib/sanity"

// Define custom components for the PortableText renderer
const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 relative w-full h-96">
          <Image
            src={urlFor(value).width(800).height(600).url() || "/placeholder.svg"}
            alt={value.alt || "Image"}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )
    },
    callout: ({ value }: any) => {
      return (
        <div className="bg-gray-50 border-l-4 border-[#1804FF] p-4 my-6 rounded-r-lg">
          <p className="text-gray-700">{value.text}</p>
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
      return (
        <Link href={value.href} rel={rel} className="text-[#1804FF] hover:underline">
          {children}
        </Link>
      )
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 italic my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
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
