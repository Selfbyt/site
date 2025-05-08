import { Brain, Cpu, Database, Layers, Microscope } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#2D1D5A] to-[#1804FF] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Selfbyt</h1>
              <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A research-driven organization dedicated to advancing the intersection of neuroscience, artificial
                intelligence, and human-computer interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 p-2">
                <Brain className="h-6 w-6 text-[#1804FF]" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Who We Are</h2>
              <p className="text-gray-500 md:text-xl/relaxed">
                Selfbyt is a research-driven organization dedicated to advancing the intersection of neuroscience,
                artificial intelligence, and human-computer interaction. We build software systems that emulate human
                cognitive capabilities, aiming to revolutionize how computers understand, learn, and interact with
                humans.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 p-2">
                <Microscope className="h-6 w-6 text-[#1804FF]" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Research Philosophy</h2>
              <p className="text-gray-500 md:text-xl/relaxed">
                Our approach combines rigorous scientific methodology with practical applications. We believe in
                innovating at the hardware and software interface, rethinking fundamental computing paradigms, creating
                more efficient and human-like data processing systems, responsible AI development with a focus on safety
                and ethics, and bridging theoretical research with practical applications.
              </p>
            </div>
          </div>
        </div>
      </section>

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
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Brain className="h-12 w-12 text-[#1804FF]" />
              <h3 className="text-xl font-bold">Neuroscience</h3>
              <p className="text-center text-gray-500">
                Studying brain functions and neural networks to develop computational models that mirror human cognitive
                processes.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Layers className="h-12 w-12 text-[#1804FF]" />
              <h3 className="text-xl font-bold">Human-Computer Interaction</h3>
              <p className="text-center text-gray-500">
                Creating intuitive interfaces and interaction patterns that bridge the gap between human cognition and
                computer systems.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Cpu className="h-12 w-12 text-[#1804FF]" />
              <h3 className="text-xl font-bold">Cognitive Computing</h3>
              <p className="text-center text-gray-500">
                Developing intelligent systems that can reason, learn, and process information in ways similar to the
                human brain.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Database className="h-12 w-12 text-[#1804FF]" />
              <h3 className="text-xl font-bold">Fundamental Data Architecture</h3>
              <p className="text-center text-gray-500">
                Revolutionizing how computers handle and process data at the lowest level with universal data type
                systems and optimized storage.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Microscope className="h-12 w-12 text-[#1804FF]" />
              <h3 className="text-xl font-bold">Applied AI Research</h3>
              <p className="text-center text-gray-500">
                Conducting research in artificial intelligence with a focus on cognitive modeling and neural
                architectures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Technical Innovation</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We work at multiple levels of the computing stack
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Hardware Optimization</h3>
              <p className="mt-2 text-gray-500">
                Developing specialized hardware architectures optimized for cognitive computing workloads.
              </p>
            </div>
            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Novel Data Types</h3>
              <p className="mt-2 text-gray-500">
                Creating new data type implementations that better represent complex information structures.
              </p>
            </div>
            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Memory Architecture</h3>
              <p className="mt-2 text-gray-500">
                Reimagining memory management and storage architectures for cognitive computing systems.
              </p>
            </div>
            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">System Optimization</h3>
              <p className="mt-2 text-gray-500">
                Developing low-level system optimizations to enhance performance and efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
