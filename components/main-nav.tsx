import type React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">Selfbyt</span>
      </Link>
      <nav className={cn("hidden gap-6 md:flex", className)} {...props}>
        <Link
          href="/"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          About
        </Link>
        <Link
          href="/research"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Research
        </Link>
        <Link
          href="/products"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Products
        </Link>
        <Link
          href="/blog"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Blog
        </Link>
        <Link
          href="/case-studies"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Case Studies
        </Link>
      </nav>
    </div>
  )
}
