import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Selfbyt handles personal information.",
}

const LAST_UPDATED = "May 10, 2026"

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b" style={{ borderColor: "hsl(var(--rule))" }}>
        <div className="container py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="label-mono">Privacy</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-[2.75rem]">
                Privacy policy
              </h1>
              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Last updated · {LAST_UPDATED}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2 hidden md:block">
              <p className="label-mono">Policy</p>
            </div>
            <div className="md:col-span-10 lg:col-span-9">
              <div className="prose-selfbyt max-w-3xl">
                <p>
                  This page explains what Selfbyt collects when you visit this
                  site, why, and what you can do about it. We try to keep it
                  short.
                </p>

                <h2>What we collect</h2>
                <p>
                  Two things, both opt-in. If you submit the contact form, we
                  receive your name, email, subject line, and message. If you
                  subscribe to the newsletter, we receive your email address.
                  Nothing else.
                </p>
                <p>
                  Like most websites, our hosting provider records standard
                  request logs — IP address, user-agent, request path, and
                  timestamps — to keep the site running and detect abuse. We
                  do not run analytics or third-party trackers on this site.
                </p>

                <h2>Why we collect it</h2>
                <ul>
                  <li>To reply to your message, if you contacted us.</li>
                  <li>To send the newsletter, if you subscribed.</li>
                  <li>To keep the site working and secure.</li>
                </ul>

                <h2>Where it goes</h2>
                <p>
                  Contact form submissions are sent over email to our internal
                  address. Newsletter subscriptions are stored with{" "}
                  <a href="https://mailchimp.com" rel="noreferrer noopener" target="_blank">
                    Mailchimp
                  </a>
                  , which acts as our processor. Hosting logs sit with our
                  hosting provider for a short retention window.
                </p>

                <h2>Your rights</h2>
                <p>
                  You can ask us to access, correct, or delete the personal
                  data we hold about you. You can unsubscribe from the
                  newsletter at any time using the link in any email, or by
                  emailing us. To exercise any other right, write to{" "}
                  <a href="mailto:hello@selfbyt.com">hello@selfbyt.com</a>.
                </p>

                <h2>Cookies</h2>
                <p>
                  This site sets a single cookie to remember your light/dark
                  theme preference. It is not used for tracking, advertising,
                  or analytics.
                </p>

                <h2>Changes</h2>
                <p>
                  If we change this policy in any meaningful way, we'll update
                  the date at the top and, where appropriate, mention it in
                  the newsletter.
                </p>

                <h2>Contact</h2>
                <p>
                  Questions about this policy go to{" "}
                  <a href="mailto:hello@selfbyt.com">hello@selfbyt.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
