import { FileText, Scale, Shield, AlertTriangle } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#2D1D5A] to-[#1804FF] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-white/10 p-3">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Terms of Service</h1>
              <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Terms and conditions for using Selfbyt's website and services
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <div className="space-y-8">
              <div>
                <p className="text-gray-600">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Welcome to Selfbyt. These Terms of Service ("Terms") govern your use of our website and services. 
                  By accessing or using our website, you agree to be bound by these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Scale className="h-6 w-6 text-[#1804FF]" />
                  Acceptance of Terms
                </h2>
                <p className="text-gray-600">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About Selfbyt</h2>
                <p className="text-gray-600">
                  Selfbyt is a research-driven organization dedicated to advancing the intersection of neuroscience, 
                  artificial intelligence, and human-computer interaction. We conduct research, publish findings, 
                  and develop innovative technologies in cognitive computing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Use of Website</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Permitted Use</h3>
                    <p className="text-gray-600">You may use our website to:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Learn about our research and publications</li>
                      <li>Contact us for collaboration or inquiries</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Access publicly available research content</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Prohibited Use</h3>
                    <p className="text-gray-600">You may not:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Use the website for any unlawful purpose</li>
                      <li>Attempt to gain unauthorized access to our systems</li>
                      <li>Interfere with the proper functioning of the website</li>
                      <li>Reproduce, distribute, or modify our content without permission</li>
                      <li>Use automated systems to access the website</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Shield className="h-6 w-6 text-[#1804FF]" />
                  Intellectual Property
                </h2>
                <p className="text-gray-600">
                  All content on this website, including but not limited to text, graphics, logos, images, and software, 
                  is the property of Selfbyt or its content suppliers and is protected by copyright and other intellectual property laws.
                </p>
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Research Publications</h3>
                    <p className="text-gray-600">
                      Our research papers and publications are protected by copyright. You may cite our work in accordance 
                      with academic standards, but reproduction or distribution requires permission.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trademarks</h3>
                    <p className="text-gray-600">
                      The Selfbyt name and logo are trademarks of our organization. You may not use these without our written permission.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Research Content</h2>
                <p className="text-gray-600">
                  The research content on our website is provided for informational purposes. While we strive for accuracy, 
                  research findings are subject to ongoing investigation and may be updated or revised.
                </p>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Research Disclaimer</h4>
                      <p className="text-yellow-700 text-sm">
                        Our research is ongoing and findings may change as new data becomes available. 
                        Please cite the most recent version of our publications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Limitation of Liability</h2>
                <p className="text-gray-600">
                  Selfbyt shall not be liable for any direct, indirect, incidental, special, or consequential damages 
                  resulting from the use or inability to use our website or services, even if we have been advised 
                  of the possibility of such damages.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy</h2>
                <p className="text-gray-600">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, 
                  to understand our practices.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Collaboration and Partnerships</h2>
                <p className="text-gray-600">
                  We welcome collaboration with researchers, developers, and organizations. However, any formal partnerships 
                  or collaborations must be established through proper channels and documented agreements.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Termination</h2>
                <p className="text-gray-600">
                  We reserve the right to terminate or suspend your access to our website at any time, without notice, 
                  for any reason, including breach of these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Changes to Terms</h2>
                <p className="text-gray-600">
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes 
                  by posting the new Terms on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Governing Law</h2>
                <p className="text-gray-600">
                  These Terms shall be governed by and construed in accordance with applicable laws, without regard to 
                  conflict of law principles.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
                <p className="text-gray-600">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:hello@selfbyt.com" className="text-[#1804FF] hover:underline">
                      hello@selfbyt.com
                    </a>
                  </p>
                  <p className="text-gray-600">
                    <strong>Organization:</strong> Selfbyt Research Labs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
