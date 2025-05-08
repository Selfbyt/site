import Link from "next/link"
import { ArrowRight, Brain, Cpu, Database, Layers } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getProducts } from "@/lib/sanity"

// Map of icon names to components
const iconMap: Record<string, any> = {
  brain: Brain,
  cpu: Cpu,
  database: Database,
  layers: Layers,
}

export const revalidate = 3600 // Revalidate this page every hour

export default async function ProductsPage() {
  const products = await getProducts()

  if (!products) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#2D1D5A] to-[#1804FF] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Products</h1>
              <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Cutting-edge tools and platforms built on our research in neuroscience, AI, and human-computer
                interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-10">
            {products.map((product: any) => {
              // Get the icon component based on the icon name from Sanity
              const IconComponent = iconMap[product.icon] || Brain

              return (
                <Card
                  key={product._id}
                  className="flex flex-col overflow-hidden border-2 transition-all hover:shadow-lg"
                >
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1804FF]/10">
                      <IconComponent className="h-6 w-6 text-[#1804FF]" />
                    </div>
                    <div>
                      <CardTitle>{product.title}</CardTitle>
                      <CardDescription className="text-sm text-[#1804FF]">{product.category}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="mb-4 text-gray-500">{product.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/products/${product.slug.current}`} passHref>
                      <Button className="w-full bg-[#1804FF] hover:bg-[#1804FF]/90">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Custom Solutions</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Need a tailored solution for your specific requirements? Our team can develop custom implementations of
                our technology.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/contact" passHref>
                <Button className="px-8 bg-[#1804FF] hover:bg-[#1804FF]/90">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
