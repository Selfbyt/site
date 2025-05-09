// This must remain a server component to support metadata
import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

// Define metadata according to Next.js requirements
export const metadata: Metadata = {
  title: "Selfbyt - Research-Driven Organization",
  description: "Selfbyt is a research-driven organization dedicated to advancing the intersection of neuroscience, artificial intelligence, and human-computer interaction.",
}

// This approach preserves the ability to use metadata without client components in the layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // In the server component, we can't use usePathname, so we'll insert a client component
  // that will handle the conditional rendering of header/footer
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* ClientPathCheck will be imported by the client layout wrapper */}
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

// Import the client component at the end to keep the main layout a server component
import { ClientLayoutWrapper } from "./client-layout-wrapper"
