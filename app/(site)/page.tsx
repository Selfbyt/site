import Link from "next/link"
import { ArrowRight, Brain, Cpu, Database, Layers, Microscope } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FeaturedResearch } from "@/components/featured-research"
import { LatestPosts } from "@/components/latest-posts"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { FeaturedProducts } from "@/components/featured-products"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#2D1D5A] to-[#1804FF] text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Computing from the Ground Up
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl">
                  Selfbyt is a research-driven organization dedicated to advancing the intersection of neuroscience,
                  artificial intelligence, and human-computer interaction.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/research" passHref>
                  <Button variant="secondary" className="px-8">
                    Our Research
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/blog" passHref>
                  <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 px-8">
                    Read Our Blog
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                <div
                  className="absolute inset-0 bg-white/10 rounded-full animate-pulse"
                  style={{ animationDuration: "4s" }}
                ></div>
                <div
                  className="absolute inset-4 bg-white/20 rounded-full animate-pulse"
                  style={{ animationDuration: "3s" }}
                ></div>
                <div
                  className="absolute inset-8 bg-white/30 rounded-full animate-pulse"
                  style={{ animationDuration: "2s" }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="h-32 w-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Focus Areas</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Selfbyt works at the intersection of multiple disciplines to revolutionize computing
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <Brain className="h-8 w-8 text-[#1804FF]" />
                <CardTitle className="mt-4">Neuroscience</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Studying brain functions and neural networks to develop computational models that mirror human
                  cognitive processes.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Layers className="h-8 w-8 text-[#1804FF]" />
                <CardTitle className="mt-4">Human-Computer Interaction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Creating intuitive interfaces and interaction patterns that bridge the gap between human cognition and
                  computer systems.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Cpu className="h-8 w-8 text-[#1804FF]" />
                <CardTitle className="mt-4">Cognitive Computing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Developing intelligent systems that can reason, learn, and process information in ways similar to the
                  human brain.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Database className="h-8 w-8 text-[#1804FF]" />
                <CardTitle className="mt-4">Fundamental Data Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Revolutionizing how computers handle and process data at the lowest level with universal data type
                  systems and optimized storage.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Microscope className="h-8 w-8 text-[#1804FF]" />
                <CardTitle className="mt-4">Applied AI Research</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conducting research in artificial intelligence with a focus on cognitive modeling and neural
                  architectures.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Research */}
      <FeaturedResearch />

      {/* Latest Blog Posts */}
      <LatestPosts />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  )
}
