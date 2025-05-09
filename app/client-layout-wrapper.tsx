'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudioRoute = pathname?.startsWith('/studio')

  return (
    <>
      {/* Only show header and footer on non-studio routes */}
      {!isStudioRoute && <SiteHeader />}
      <main className="flex-1 w-full">{children}</main>
      {!isStudioRoute && <SiteFooter />}
    </>
  )
}
