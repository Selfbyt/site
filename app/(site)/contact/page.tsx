"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Message sent.",
          description: result.message,
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        toast({
          title: "Couldn't send",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again, or email hello@selfbyt.com directly.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass =
    "rounded-none border-foreground/20 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-foreground"

  return (
    <>
      <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
        <div className="container py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">Contact</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
                Send us a note.
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Research questions, software access, hiring, or partnership
                — all the same inbox. We read everything; we reply when there's
                something useful to say.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">Reach us</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <div className="grid gap-12 lg:grid-cols-12">
                <aside className="lg:col-span-4">
                  <dl className="space-y-6 text-sm">
                    <div>
                      <dt className="label-mono">Email</dt>
                      <dd className="mt-2">
                        <a
                          href="mailto:hello@selfbyt.com"
                          className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
                        >
                          hello@selfbyt.com
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="label-mono">Reply time</dt>
                      <dd className="mt-2 text-foreground/80">
                        Usually within a few business days. We err on the slow side; please don't take silence personally.
                      </dd>
                    </div>
                    <div>
                      <dt className="label-mono">Best for</dt>
                      <dd className="mt-2 text-foreground/80">
                        Specific questions about a paper or a piece of software, collaboration ideas, or anything that needs more than a tweet's worth of context.
                      </dd>
                    </div>
                  </dl>
                </aside>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 lg:col-span-8"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="label-mono">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="label-mono">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@somewhere.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="label-mono">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="One short line"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="label-mono">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="What's on your mind?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className={`min-h-[180px] ${inputClass}`}
                    />
                  </div>
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="rounded-none bg-foreground text-background hover:bg-foreground/90"
                    >
                      {isLoading ? "Sending…" : "Send message"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
