import { Brain, Cpu, Database, Layers, Microscope, Users, ArrowRight, Mail, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#2D1D5A] to-[#1804FF] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Team</h1>
              <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Meet the minds behind Selfbyt's innovative research and development
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 p-3">
                <Users className="h-8 w-8 text-[#1804FF]" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Team</h2>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We welcome developers, researchers, and collaborators who share our passion for advancing the frontiers of cognitive computing and human-computer interaction.
              </p>
            </div>
            <div className="space-y-4">
              <p className="max-w-[700px] text-gray-500 md:text-lg/relaxed">
                Whether you're a seasoned researcher, an innovative developer, or a forward-thinking collaborator, 
                we invite you to be part of our mission to revolutionize how computers understand and interact with humans.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Who We Welcome</h2>
              <p className="max-w-[700px] text-gray-500 md:text-lg/relaxed">
                We value diverse perspectives and welcome passionate individuals from various backgrounds
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
              <Card>
                <CardHeader>
                  <div className="inline-block rounded-lg bg-gray-100 p-2 w-fit">
                    <Brain className="h-6 w-6 text-[#1804FF]" />
                  </div>
                  <CardTitle>Researchers</CardTitle>
                  <CardDescription>
                    Neuroscientists, AI researchers, and cognitive scientists passionate about advancing the field
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Whether you're an established researcher or just starting your journey, we welcome your curiosity and dedication to understanding the mind and intelligence.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="inline-block rounded-lg bg-gray-100 p-2 w-fit">
                    <Cpu className="h-6 w-6 text-[#1804FF]" />
                  </div>
                  <CardTitle>Developers</CardTitle>
                  <CardDescription>
                    Software engineers and system architects who love building innovative solutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    From seasoned professionals to emerging talent, we value creativity, problem-solving skills, and a passion for pushing technological boundaries.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="inline-block rounded-lg bg-gray-100 p-2 w-fit">
                    <Layers className="h-6 w-6 text-[#1804FF]" />
                  </div>
                  <CardTitle>Collaborators</CardTitle>
                  <CardDescription>
                    Industry partners, academic institutions, and organizations with shared vision
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    We believe in the power of collaboration and welcome partnerships that can accelerate progress in cognitive computing and human-AI interaction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
              <p className="max-w-[700px] text-gray-500 md:text-lg/relaxed">
                Ready to join our mission? We'd love to hear from you and discuss how you can contribute to our work.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Link href="/contact" passHref>
                <Button size="lg" className="bg-[#1804FF] hover:bg-[#1804FF]/90">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/research" passHref>
                <Button size="lg" variant="outline">
                  Explore Our Research
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <Mail className="h-5 w-5 text-[#1804FF]" />
              <a href="mailto:hello@selfbyt.com" className="text-[#1804FF] hover:underline">
                hello@selfbyt.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
