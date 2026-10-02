import type React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Selfbyt | Foundations for intelligent systems",
    template: "%s | Selfbyt",
  },
  description:
    "Selfbyt builds AI infrastructure and explores new ways to represent and run models. Infrastructure today. A foundation for future intelligence.",
  metadataBase: new URL("https://selfbyt.com"),
  openGraph: {
    title: "Selfbyt",
    description:
      "AI infrastructure and experimental research. Building the foundations for intelligent systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { ClientLayoutWrapper } from "./client-layout-wrapper";
