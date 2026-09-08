import type { Plugin } from "vite";
import {
  findPage,
  pageTitle,
  siteOrigin,
  sitePages,
  type SitePage,
} from "../src/site-pages.ts";

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
  );

function withMetadata(html: string, page: SitePage) {
  const title = escape(pageTitle(page));
  const description = escape(page.description);
  const url = escape(siteOrigin + page.path);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<link\s+rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${url}" />`,
    )
    .replace(
      /<meta\s+(name|property)="(description|og:title|og:description|og:url|twitter:title|twitter:description)"[^>]*>/g,
      (_tag, attribute: string, name: string) => {
        const content = name.endsWith("title")
          ? title
          : name === "og:url"
            ? url
            : description;
        return `<meta ${attribute}="${name}" content="${content}" />`;
      },
    );
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitePages.map((page) => `  <url><loc>${escape(siteOrigin + page.path)}</loc></url>`).join("\n")}\n</urlset>\n`;

// Each direct URL gets its own metadata, including before JavaScript runs.
export function sitePageAssets(): Plugin {
  return {
    name: "euphoria-site-pages",
    enforce: "post",
    transformIndexHtml(html, context) {
      return withMetadata(html, findPage(context.path));
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (request.url?.split("?")[0] !== "/sitemap.xml") return next();
        response.setHeader("Content-Type", "application/xml");
        response.end(sitemap);
      });
    },
    generateBundle(_options, bundle) {
      const index = bundle["index.html"];
      if (
        !index ||
        index.type !== "asset" ||
        typeof index.source !== "string"
      ) {
        this.error("Expected a generated index.html for page metadata.");
      }
      const template = index.source;
      index.source = withMetadata(template, sitePages[0]);
      for (const page of sitePages.filter((page) => page.path !== "/")) {
        // Support static hosts that resolve clean URLs via .html or /index.html.
        const source = withMetadata(template, page);
        this.emitFile({
          type: "asset",
          fileName: `${page.path.slice(1)}.html`,
          source,
        });
        this.emitFile({
          type: "asset",
          fileName: `${page.path.slice(1)}/index.html`,
          source,
        });
      }
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: sitemap,
      });
    },
  };
}
