import Link from "next/link"
import { Calendar, Tag } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getBlogPosts } from "@/lib/sanity"

export const revalidate = 3600 // Revalidate this page every hour

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  if (!blogPosts) {
    notFound()
  }

  // Extract unique categories from blog posts
  const categories = ["All", ...new Set(blogPosts.map((post: any) => post.category))]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#2D1D5A] to-[#1804FF] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Selfbyt Blog</h1>
              <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Insights, updates, and thoughts from our research team on neuroscience, AI, and human-computer
                interaction.
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts
                    .filter((post: any) => category === "All" || post.category === category)
                    .map((post: any) => {
                      // Format the date
                      const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })

                      return (
                        <Card key={post._id} className="flex flex-col">
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-[#1804FF]" />
                              <span className="text-sm text-[#1804FF]">{post.category}</span>
                            </div>
                            <CardTitle className="mt-2">{post.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3" />
                              {formattedDate} • {post.author}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <p className="text-gray-500">{post.excerpt}</p>
                          </CardContent>
                          <CardFooter>
                            <Link href={`/blog/${post.slug.current}`} passHref>
                              <Button variant="outline" className="w-full">
                                Read Post
                              </Button>
                            </Link>
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
