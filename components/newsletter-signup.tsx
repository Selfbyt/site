"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Subscription successful!",
          description: result.message,
        })
        setEmail("")
      } else {
        toast({
          title: "Subscription failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Stay Updated</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Subscribe to our newsletter to receive updates on our latest research and blog posts.
            </p>
          </div>
          <div className="w-full max-w-md space-y-2">
            <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="animate-pulse">Subscribing...</span>
                ) : (
                  <>
                    Subscribe
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
