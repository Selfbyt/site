import type React from "react";
import { cn } from "@/lib/utils";
export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 74 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-14 text-[#365cf5]", className)}
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="16"
        cy="16"
        r="12.32"
        stroke="currentColor"
        strokeWidth="3.36"
      />
      <circle cx="54" cy="16" r="14" fill="currentColor" />
    </svg>
  );
}
