import Link from "@/components/link"

import { Logo } from "@/components/logo"
import { DISCORD_INVITE_URL } from "@/lib/community"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t" style={{ borderColor: "hsl(var(--rule))" }}>
      <div className="container py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-6 w-14" />
              <span className="text-xl font-semibold tracking-tight">Selfbyt</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building the foundations for intelligent systems. AI infrastructure,
              experiments, and the questions that come next.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="label-mono">Site</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/research" className="text-foreground/80 hover:text-foreground">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground/80 hover:text-foreground">
                  Writing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/80 hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-foreground/80 hover:text-foreground">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="label-mono">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@selfbyt.com"
                  className="text-foreground/80 hover:text-foreground"
                >
                  hello@selfbyt.com
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/80 hover:text-foreground">
                  Send a message
                </Link>
              </li>
              <li>
                <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground">
                  Join us on Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between" style={{ borderColor: "hsl(var(--rule))" }}>
          <p>© {year} Selfbyt. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
