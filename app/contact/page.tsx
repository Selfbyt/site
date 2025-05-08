"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MessageSquare, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

    // This would typically connect to your email service or API
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#2D1D5A] to-[#1804FF] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
              <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get in touch with our research team
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 p-2">
                <MessageSquare className="h-6 w-6 text-[#1804FF]" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
              <p className="text-gray-500 md:text-xl/relaxed">
                We welcome inquiries from researchers, developers, and organizations interested in our work. Whether
                you're looking to collaborate on a project, learn more about our research, or explore potential
                applications of our technology, we'd love to hear from you.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <Mail className="h-5 w-5 text-[#1804FF]" />
                <a href="mailto:selfbytdevelopmentlabs@gmail.com" className="text-[#1804FF] hover:underline">
                  selfbytdevelopmentlabs@gmail.com
                </a>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Subject of your message"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[150px]"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" onClick={handleSubmit} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
