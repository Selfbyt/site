

export const siteTitle = "Selfbyt | Foundations for intelligent systems";
export const siteDescription =
  "We build AI infrastructure and explore new ways to represent and run models. From the systems underneath to the intelligence ahead.";

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
