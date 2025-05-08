import Link from "next/link"
import { Calendar, Download, FileText } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getResearchPapers } from "@/lib/sanity"

export const revalidate = 3600 // Revalidate this page every hour

export default async function ResearchPage() {
  const researchPapers = await getResearchPapers()

  if (!researchPapers) {
    notFound()
  }

  // Extract unique categories from research papers
  const categories = ["All", ...new Set(researchPapers.map((paper: any) => paper.category))]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#2D1D5A] to-[#1804FF] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Research Papers</h1>
              <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our published research on neuroscience, AI, and human-computer interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="All" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {researchPapers
                    .filter((paper: any) => category === "All" || paper.category === category)
                    .map((paper: any) => {
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
                            <CardDescription className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3" />
                              {formattedDate} • {paper.authors.join(", ")}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <p className="text-gray-500">{paper.abstract}</p>
                          </CardContent>
                          <CardFooter className="flex flex-col sm:flex-row gap-2">
                            <Link href={`/research/${paper.slug.current}`} passHref>
                              <Button variant="outline" className="w-full sm:w-auto">
                                <FileText className="mr-2 h-4 w-4" />
                                Read Paper
                              </Button>
                            </Link>
                            {paper.pdfUrl && (
                              <Link href={paper.pdfUrl} passHref>
                                <Button variant="outline" className="w-full sm:w-auto">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download PDF
                                </Button>
                              </Link>
                            )}
                          </CardFooter>
                        </Card>
                      )
                    })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  )
}
