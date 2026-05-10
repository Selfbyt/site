import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MainNav, NAV_ITEMS } from "@/components/main-nav"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-14 items-center justify-between gap-4">
        <MainNav />
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-block"
          >
            Contact
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-l">
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="h-px w-full bg-[hsl(var(--rule))]" aria-hidden />
    </header>
  )
}

function MobileNav() {
  return (
    <div className="flex h-full flex-col gap-8 px-1 py-6">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-tight">Selfbyt</span>
      </Link>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="-mx-2 rounded px-2 py-2 text-base text-foreground/90 hover:bg-muted"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="-mx-2 rounded px-2 py-2 text-base text-foreground/90 hover:bg-muted"
        >
          Contact
        </Link>
      </nav>
    </div>
  )
}
