"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

const NAV_ITEMS = [
  { label: "Research", href: "/research" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
]

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname() || "/"

  return (
    <div className="flex items-center gap-8 md:gap-12">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-tight">Selfbyt</span>
      </Link>
      <nav className={cn("hidden items-center gap-6 md:flex", className)} {...props}>
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export { NAV_ITEMS }
