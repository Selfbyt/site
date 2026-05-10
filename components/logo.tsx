import type React from "react"
import { cn } from "@/lib/utils"

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
      {...props}
    >
      <rect width="60" height="60" rx="12" fill="#0F1115" />
      {/* 0 — open ring */}
      <circle
        cx="22"
        cy="30"
        r="8.5"
        fill="none"
        stroke="#E8FF47"
        strokeWidth="3"
      />
      {/* 1 — filled disc */}
      <circle cx="40" cy="30" r="10" fill="#47FFD4" />
    </svg>
  )
}
