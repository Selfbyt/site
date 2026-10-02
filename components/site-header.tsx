"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { MainNav, NAV_ITEMS } from "@/components/main-nav";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node))
        setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setMenuOpen(false);
      }}
      onClick={(event) => {
        if ((event.target as Element).closest("a")) setMenuOpen(false);
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:p-3"
      >
        Skip to content
      </a>
      <div className="container flex h-20 items-center justify-between gap-4">
        <MainNav />
        <Link
          href="/contact"
          className="hidden border border-foreground/25 px-4 py-2 text-xs transition-colors hover:border-primary hover:text-primary md:inline-block"
        >
          Contact
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex min-h-11 items-center gap-2 px-2 text-sm md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <div className="h-px w-full bg-[hsl(var(--rule))]" aria-hidden="true" />
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full border-b border-border bg-background shadow-[0_12px_20px_-16px_rgba(19,24,32,0.25)] md:hidden"
      >
        <div className="container py-3">
          {[...NAV_ITEMS, { label: "Contact", href: "/contact" }].map(
            (item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-12 items-center justify-between border-b border-border/60 py-3 text-sm transition-colors last:border-0 hover:text-primary"
              >
                {item.label}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </Link>
            ),
          )}
        </div>
      </nav>
    </header>
  );
}
