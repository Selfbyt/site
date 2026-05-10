"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function RouteProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const firstRun = useRef(true)

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    setVisible(false)
    setProgress(0)
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [pathname, searchParams])

  useEffect(() => {
    function start() {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setVisible(true)
        setProgress(15)
        intervalRef.current = setInterval(() => {
          setProgress((p) => (p < 85 ? p + (85 - p) * 0.08 : p))
        }, 200)
      }, 120)
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target) return
      const a = target.closest("a") as HTMLAnchorElement | null
      if (!a) return
      if (a.target === "_blank") return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const href = a.getAttribute("href")
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return
      try {
        const url = new URL(a.href, window.location.href)
        if (url.origin !== window.location.origin) return
        if (url.pathname === window.location.pathname && url.search === window.location.search) return
      } catch {
        return
      }
      start()
    }

    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
      if (timerRef.current) clearTimeout(timerRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
    >
      <div
        className="h-full bg-foreground transition-[width,opacity] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
