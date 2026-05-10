"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSignup({
  sectionLabel = "Subscribe",
}: {
  sectionLabel?: string
} = {}) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Subscribed.",
          description: result.message,
        })
        setEmail("")
      } else {
        toast({
          title: "Couldn't subscribe",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <div className="container py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <p className="label-mono">{sectionLabel}</p>
          </div>
          <div className="md:col-span-10 lg:col-span-9">
            <h2 className="max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
              Occasional notes when we publish.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              No drip campaigns, no roundups, no marketing. Just an email when
              there's something new on the site.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex w-full max-w-lg flex-col gap-2 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="you@somewhere.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
                className="flex-1 rounded-none border-foreground/20 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-foreground"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="rounded-none bg-foreground text-background hover:bg-foreground/90"
              >
                {isLoading ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              Unsubscribe any time. We never share your address.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
