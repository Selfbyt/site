import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MainNav } from "@/components/main-nav"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <MobileNav />
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/contact" passHref>
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <div className="flex flex-col space-y-3 px-2 py-4">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        <Logo className="h-6 w-6" />
        <span>Selfbyt</span>
      </Link>
      <div className="flex flex-col space-y-2">
        <Link href="/" className="py-2 text-lg">
          Home
        </Link>
        <Link href="/about" className="py-2 text-lg">
          About
        </Link>
        <Link href="/research" className="py-2 text-lg">
          Research
        </Link>
        <Link href="/products" className="py-2 text-lg">
          Products
        </Link>
        <Link href="/blog" className="py-2 text-lg">
          Blog
        </Link>
        <Link href="/case-studies" className="py-2 text-lg">
          Case Studies
        </Link>
        <Link href="/contact" className="py-2 text-lg">
          Contact
        </Link>
      </div>
    </div>
  )
}
