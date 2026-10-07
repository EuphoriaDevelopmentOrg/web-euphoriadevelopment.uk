import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { source } from "@/lib/source";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import { getPageMetadata } from "@/utils/metadata";
import { BlueprintAddons } from "@/components/docs/BlueprintAddons";
import { CommunityRefreshTheme } from "@/components/docs/CommunityRefreshTheme";
import { WebApps } from "@/components/docs/WebApps";
import { CrafatarMigrationNotice } from "@/components/CrafatarMigrationNotice";

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const pathname =
    slug && slug.length > 0 ? `/docs/${slug.join("/")}` : "/docs";
  return getPageMetadata(pathname);
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await props.params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage id="docs-content" toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            BlueprintAddons,
            CommunityRefreshTheme,
            WebApps,
            CrafatarMigrationNotice,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}
