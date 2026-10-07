import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import Link from "next/link";
import { source } from "@/lib/source";

export default function RootDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootProvider>
      <DocsLayout
        tree={source.pageTree}
        nav={{
          title: (
            <div className="flex items-center gap-2">
              <img
                src="/images/euphoria.png"
                alt="Euphoria Development"
                className="h-6 w-6 rounded-full"
              />
              <span className="text-fd-foreground font-semibold">
                Euphoria Development Docs
              </span>
            </div>
          ),
          url: "/docs",
        }}
        links={[
          { text: "Home", url: "/docs", active: "url" },
          { text: "Main Site", url: "/" },
          {
            text: "Original GitBook",
            url: "https://euphoria-development.gitbook.io/euphoria-development",
            external: true,
          },
          {
            text: "Support Discord",
            url: "https://discord.euphoriadevelopment.uk",
            external: true,
          },
        ]}
      >
        {children}
      </DocsLayout>
      <footer className="docs-footer border-fd-border/50 bg-fd-background/80 text-fd-muted-foreground border-t px-6 py-4 text-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <span>© Euphoria Development</span>
          <nav
            aria-label="Documentation footer"
            className="flex flex-wrap gap-4"
          >
            <Link href="/docs" className="hover:text-fd-foreground">
              Docs Home
            </Link>
            <Link
              href="/legal/privacy-policy"
              className="hover:text-fd-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/refund-policy"
              className="hover:text-fd-foreground"
            >
              Refund Policy
            </Link>
            <Link
              href="/legal/terms-and-conditions"
              className="hover:text-fd-foreground"
            >
              Terms & Conditions
            </Link>
          </nav>
        </div>
      </footer>
    </RootProvider>
  );
}
