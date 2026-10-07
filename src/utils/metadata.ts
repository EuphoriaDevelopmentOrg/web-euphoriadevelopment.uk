import type { Metadata } from "next";
import { findPage, pageTitle, siteOrigin, type SitePage } from "@/site-pages";

export function getPageMetadata(pathOrPage: string | SitePage): Metadata {
  const page =
    typeof pathOrPage === "string" ? findPage(pathOrPage) : pathOrPage;
  const title = pageTitle(page);
  const description = page.description;
  const url = `${siteOrigin}${page.path}`;
  const image = `${siteOrigin}/web-app-manifest-512x512.png`;

  return {
    title,
    description,
    alternates:
      page.path === "/"
        ? undefined
        : {
            canonical: url,
          },
    openGraph: {
      type: "website",
      siteName: "Euphoria Development",
      title,
      description,
      ...(page.path === "/" ? {} : { url }),
      images: [
        {
          url: image,
          alt: "Euphoria Development logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
