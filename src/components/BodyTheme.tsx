"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { findPage, normalizePath, pageTitle, siteOrigin } from "@/site-pages";

export function BodyTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const path = normalizePath(pathname || "/");
    const page = findPage(path);
    const title = pageTitle(page);
    const url = siteOrigin + page.path;

    document.title = title;
    const canonicals = document.querySelectorAll('link[rel="canonical"]');
    if (canonicals.length > 1) {
      for (let i = 1; i < canonicals.length; i++) {
        canonicals[i].remove();
      }
    }
    if (canonicals[0]) {
      canonicals[0].setAttribute("href", url);
    }

    for (const [selector, content] of [
      ['meta[name="description"]', page.description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', page.description],
      ['meta[property="og:url"]', url],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', page.description],
    ]) {
      const meta = document.querySelector(selector);
      if (meta) {
        meta.setAttribute("content", content);
      }
    }

    if (path === "/") {
      document.body.className = "min-h-screen bg-neutral-950 text-neutral-100";
    } else if (path.startsWith("/docs")) {
      document.body.className = "docs-page";
    } else if (path === "/legal/privacy-policy") {
      document.body.className = "legal-page legal-privacy";
    } else if (path === "/legal/refund-policy") {
      document.body.className = "legal-page legal-refund";
    } else if (path === "/legal/terms-and-conditions") {
      document.body.className = "legal-page legal-terms";
    }
  }, [pathname]);

  return null;
}
