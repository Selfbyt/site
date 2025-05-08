import Link from "next/link"
import { ArrowLeft, Brain, Check, Cpu, Database, Download, ExternalLink, Layers, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProductBySlug } from "@/lib/sanity"
import { PortableText } from "@/components/portable-text"

// Map of icon names to components
const iconMap: Record<string, any> = {
  brain: Brain,
  cpu: Cpu,
  database: Database,
  layers: Layers,
}

export const revalidate = 3600 // Revalidate this page every hour

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // Await the params object before using its properties to comply with Next.js 15
  const validParams = await Promise.resolve(params)
  const product = await getProductBySlug(validParams.slug)

  if (!product) {
    notFound()
  }

  // Get the icon component based on the icon name from Sanity
  const ProductIcon = iconMap[product.icon] || Brain

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#2D1D5A] to-[#1804FF] text-white">
        <div className="container px-4 md:px-6">
          <Link href="/products" passHref>
            <Button variant="ghost" className="mb-8 pl-0 text-white hover:bg-white/10 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
              <ProductIcon className="h-10 w-10 text-white" />
            </div>
            <div>
              <p className="text-lg font-medium text-white/80">{product.category}</p>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{product.title}</h1>
              <p className="mt-2 max-w-[700px] text-white/80 md:text-xl">{product.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b pb-px">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
              <TabsTrigger value="specs">Technical Specs</TabsTrigger>
              <TabsTrigger value="docs">Documentation</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="py-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter">Overview</h2>
                  {typeof product.overview === "string" ? (
                    <p className="text-gray-500 md:text-lg">{product.overview}</p>
                  ) : (
                    <div className="text-gray-500 md:text-lg">
                      <PortableText content={product.overview} />
                    </div>
                  )}
                  <div className="flex flex-col gap-2 pt-4 sm:flex-row">
                    <Link href="/contact" passHref>
                      <Button className="bg-[#1804FF] hover:bg-[#1804FF]/90">
                        Request Demo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="#" passHref>
                      <Button variant="outline">
                        Download Whitepaper
                        <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="aspect-video overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
                  <ProductIcon className="h-24 w-24 text-[#1804FF]/30" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="py-6">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Key Features</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {product.features &&
                  product.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 rounded-lg border p-4">
                      <Check className="mt-0.5 h-5 w-5 text-[#1804FF]" />
                      <div>{feature}</div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="use-cases" className="py-6">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Use Cases</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {product.useCases &&
                  product.useCases.map((useCase: any, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{useCase.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{useCase.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="specs" className="py-6">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Technical Specifications</h2>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full">
                  <tbody>
                    {product.technicalSpecs &&
                      product.technicalSpecs.map((spec: any, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                          <td className="px-4 py-3 font-medium">{spec.name}</td>
                          <td className="px-4 py-3 text-gray-500">{spec.value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="docs" className="py-6">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Documentation & Resources</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {product.documentation &&
                  product.documentation.map((doc: any, index: number) => (
                    <Link key={index} href={doc.url} passHref>
                      <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center hover:bg-gray-50 transition-colors">
                        <ExternalLink className="h-8 w-8 text-[#1804FF]" />
                        <div className="font-medium">{doc.title}</div>
                      </div>
                    </Link>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Ready to get started?</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed">
                Contact our team to learn more about {product.title} and how it can benefit your organization.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/contact" passHref>
                <Button className="bg-[#1804FF] hover:bg-[#1804FF]/90">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#" passHref>
                <Button variant="outline">
                  Schedule Demo
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
