import Link from "next/link"
import { ArrowRight, Brain, Cpu, Database, Layers } from "lucide-react"

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

export async function FeaturedProducts() {
  // Fetch all products and take the first 2
  const allProducts = await getProducts()
  const featuredProducts = allProducts.slice(0, 2)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Products</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Cutting-edge tools and platforms built on our research
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:gap-10">
          {featuredProducts.map((product: any) => {
            // Get the icon component based on the icon name from Sanity
            const IconComponent = iconMap[product.icon] || Brain

            return (
              <Card key={product._id} className="flex flex-col overflow-hidden border-2 transition-all hover:shadow-lg">
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
                  <p className="text-gray-500">{product.description}</p>
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
        <div className="flex justify-center mt-8">
          <Link href="/products" passHref>
            <Button variant="outline">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
