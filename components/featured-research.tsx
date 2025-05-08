import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getResearchPapers } from "@/lib/sanity"

export async function FeaturedResearch() {
  // Fetch the latest 3 research papers
  const allPapers = await getResearchPapers()
  const featuredResearch = allPapers.slice(0, 3)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Research</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our latest research papers and findings
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {featuredResearch.map((paper: any) => {
            // Format the date
            const formattedDate = new Date(paper.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })

            return (
              <Card key={paper._id} className="flex flex-col">
                <CardHeader>
                  <div className="text-sm text-[#1804FF] font-medium">{paper.category}</div>
                  <CardTitle className="mt-2">{paper.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{formattedDate}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-500">{paper.abstract}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/research/${paper.slug.current}`} passHref>
                    <Button variant="outline" className="w-full">
                      Read Paper
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/research" passHref>
            <Button variant="outline">
              View All Research
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
