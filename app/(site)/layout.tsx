import type React from "react"

// The site layout no longer needs to include header and footer
// as they are conditionally rendered in the root layout
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {children}
    </div>
  )
}
