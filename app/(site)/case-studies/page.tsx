import Link from "next/link"
import { Calendar, FileText } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getCaseStudies } from "@/lib/sanity"

export const revalidate = 3600 // Revalidate this page every hour

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  if (!caseStudies) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#2D1D5A] to-[#1804FF] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Case Studies</h1>
              <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Real-world applications of our research and technology
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study: any) => {
              // Format the date
              const formattedDate = new Date(study.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })

              return (
                <Card key={study._id} className="flex flex-col">
                  <CardHeader>
                    <div className="text-sm text-[#1804FF] font-medium">{study.category}</div>
                    <CardTitle className="mt-2">{study.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {formattedDate} • {study.client}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-500">{study.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/case-studies/${study.slug.current}`} passHref>
                      <Button variant="outline" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Read Case Study
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
