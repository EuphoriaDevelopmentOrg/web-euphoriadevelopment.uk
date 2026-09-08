import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { findPage, pageTitle, siteOrigin } from "../site-pages";

export function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = findPage(pathname);
    const title = pageTitle(page);
    const url = siteOrigin + page.path;
    document.title = title;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    for (const [selector, content] of [
      ['meta[name="description"]', page.description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', page.description],
      ['meta[property="og:url"]', url],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', page.description],
    ])
      document.querySelector(selector)?.setAttribute("content", content);
  }, [pathname]);
  return null;
}
