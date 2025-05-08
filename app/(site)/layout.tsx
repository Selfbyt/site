import type React from "react"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 w-full">{children}</main>
      <SiteFooter />
    </div>
  )
}
