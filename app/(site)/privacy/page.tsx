import { Shield, Eye, Lock, Mail } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#2D1D5A] to-[#1804FF] text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-white/10 p-3">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Privacy Policy</h1>
              <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                How we collect, use, and protect your information at Selfbyt
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
                  At Selfbyt, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or interact with our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Eye className="h-6 w-6 text-[#1804FF]" />
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
                    <p className="text-gray-600">
                      When you use our contact form or newsletter signup, we collect:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Subject and message content (contact form only)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Website Usage Data</h3>
                    <p className="text-gray-600">
                      We may collect anonymous information about how you use our website, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Pages visited</li>
                      <li>Time spent on pages</li>
                      <li>Browser type and version</li>
                      <li>IP address (anonymized)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Mail className="h-6 w-6 text-[#1804FF]" />
                  How We Use Your Information
                </h2>
                <p className="text-gray-600">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Respond to your inquiries and messages</li>
                  <li>Send you updates about our research and publications (if you subscribe)</li>
                  <li>Improve our website and services</li>
                  <li>Analyze website usage patterns</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Lock className="h-6 w-6 text-[#1804FF]" />
                  Data Security
                </h2>
                <p className="text-gray-600">
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Encrypted data transmission (HTTPS)</li>
                  <li>Secure email handling</li>
                  <li>Regular security updates</li>
                  <li>Limited access to personal data</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information Sharing</h2>
                <p className="text-gray-600">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                  except in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>When required by law</li>
                  <li>To protect our rights and safety</li>
                  <li>With trusted service providers who assist in website operations (under strict confidentiality agreements)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cookies and Tracking</h2>
                <p className="text-gray-600">
                  Our website may use cookies and similar technologies to enhance your browsing experience and analyze website traffic. 
                  You can control cookie settings through your browser preferences.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
                <p className="text-gray-600">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of communications</li>
                  <li>Data portability</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  To exercise these rights, please contact us at{" "}
                  <a href="mailto:hello@selfbyt.com" className="text-[#1804FF] hover:underline">
                    hello@selfbyt.com
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Research Data</h2>
                <p className="text-gray-600">
                  As a research organization, we may collect and analyze anonymized data for research purposes. 
                  This data is used to advance our understanding of cognitive computing and human-computer interaction. 
                  All research data is anonymized and cannot be traced back to individual users.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Changes to This Policy</h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
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
