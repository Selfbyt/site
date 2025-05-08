import Link from "next/link"
import { Mail } from "lucide-react"

import { Logo } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-8 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-6 w-6" />
              <span className="font-bold">Selfbyt</span>
            </Link>
            <p className="text-sm text-muted-foreground">Computing from the Ground Up</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Organization</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/team">Team</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Resources</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/research">Research</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/case-studies">Case Studies</Link>
                </li>
                <li>
                  <Link href="/products">Products</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Contact</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:selfbytdevelopmentlabs@gmail.com">selfbytdevelopmentlabs@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Selfbyt. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
