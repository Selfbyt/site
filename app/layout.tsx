import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"

import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: "Selfbyt — Research and software for intelligent systems",
    template: "%s — Selfbyt",
  },
  description:
    "Building research and software for intelligent systems. Papers, notes, and the tools behind them.",
  metadataBase: new URL("https://selfbyt.com"),
  openGraph: {
    title: "Selfbyt",
    description:
      "Research and software for intelligent systems.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

import { ClientLayoutWrapper } from "./client-layout-wrapper"
