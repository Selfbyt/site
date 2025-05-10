'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudioRoute = pathname?.startsWith('/studio')

  return (
    <>
      {/* Conditionally render header and footer except for studio routes */}
      {!isStudioRoute && <SiteHeader />}
      <main className="flex-1">{children}</main>
      {!isStudioRoute && <SiteFooter />}
    </>
  )
}
