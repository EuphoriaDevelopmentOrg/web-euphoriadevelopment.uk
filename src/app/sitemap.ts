import type { MetadataRoute } from "next";
import { siteOrigin, sitePages } from "@/site-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map((page) => ({
    url: `${siteOrigin}${page.path}`,
  }));
}
