import type React from "react"
import { cn } from "@/lib/utils"

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 59C46.0163 59 59 46.0163 59 30C59 13.9837 46.0163 1 30 1C13.9837 1 1 13.9837 1 30C1 46.0163 13.9837 59 30 59ZM30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
        fill="#2D1D5A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 39C24.9706 39 29 34.9706 29 30C29 25.0294 24.9706 21 20 21C15.0294 21 11 25.0294 11 30C11 34.9706 15.0294 39 20 39ZM20 40C25.5228 40 30 35.5228 30 30C30 24.4772 25.5228 20 20 20C14.4772 20 10 24.4772 10 30C10 35.5228 14.4772 40 20 40Z"
        fill="#1400FF"
      />
      <path
        d="M55 30C55 35.5228 50.5228 40 45 40C39.4772 40 35 35.5228 35 30C35 24.4772 39.4772 20 45 20C50.5228 20 55 24.4772 55 30Z"
        fill="#1400FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45 39C49.9706 39 54 34.9706 54 30C54 25.0294 49.9706 21 45 21C40.0294 21 36 25.0294 36 30C36 34.9706 40.0294 39 45 39ZM45 40C50.5228 40 55 35.5228 55 30C55 24.4772 50.5228 20 45 20C39.4772 20 35 24.4772 35 30C35 35.5228 39.4772 40 45 40Z"
        fill="#1804FF"
      />
    </svg>
  )
}
