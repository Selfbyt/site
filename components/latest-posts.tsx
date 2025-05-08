import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getBlogPosts } from "@/lib/sanity"

export async function LatestPosts() {
  // Fetch the latest 3 blog posts
  const allPosts = await getBlogPosts()
  const latestPosts = allPosts.slice(0, 3)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest from Our Blog</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Insights, updates, and thoughts from our research team
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {latestPosts.map((post: any) => {
            // Format the date
            const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })

            return (
              <Card key={post._id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
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
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/blog" passHref>
            <Button variant="outline">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
