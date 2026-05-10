'use client'

import { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import React from 'react'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { RouteProgress } from '@/components/route-progress'

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudioRoute = pathname?.startsWith('/studio')

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={null}>
        <RouteProgress />
      </Suspense>
      {!isStudioRoute && <SiteHeader />}
      <main className="flex-1">{children}</main>
      {!isStudioRoute && <SiteFooter />}
    </div>
  )
}
