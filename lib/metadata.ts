

export const siteTitle = "Selfbyt | Building Foundations for Efficient Intelligence";
export const siteDescription =
  "Selfbyt builds AI infrastructure and explores new ways to represent and run intelligent systems. Experimenting with model compression, inference optimization, and efficient execution to understand how AI can work with fewer resources.";

export function pageMetadata({
  title,
  description = siteDescription,
  path,
  article = false,
  publishedTime,
}: {
  title?: string;
  description?: string;
  path: string;
  article?: boolean;
  publishedTime?: string;
}) {
  const cleanTitle = title?.replace(/\s*—\s*/g, ": ");
  const fullTitle = cleanTitle ? `${cleanTitle} | Selfbyt` : siteTitle;
  const images = [
    {
      url: "/og/selfbyt.png",
      width: 1200,
      height: 630,
      alt: "Selfbyt. Intelligence. Built from the foundations.",
    },
  ];

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      siteName: "Selfbyt",
      url: path,
      locale: "en_US",
      images,
      ...(article
        ? { type: "article" as const, publishedTime }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map(({ url, alt }) => ({ url, alt })),
    },
  };
}
