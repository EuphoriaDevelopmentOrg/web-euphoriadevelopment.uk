import type { Metadata, Viewport } from "next";
import { BodyTheme } from "@/components/BodyTheme";
import { siteOrigin, sitePages } from "@/site-pages";
import "@/styles.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: sitePages[0].title,
  description: sitePages[0].description,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Euphoria",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Euphoria Development",
      url: "https://euphoriadevelopment.uk/",
      logo: "https://euphoriadevelopment.uk/apple-touch-icon.png",
    },
    {
      "@type": "WebSite",
      name: "Euphoria Development",
      url: "https://euphoriadevelopment.uk/",
    },
  ],
};

const inlineThemeScript = `(function(){
  try {
    var p = window.location.pathname.replace(/\\/+$/, '') || '/';
    if (p === '/') {
      document.body.className = 'min-h-screen bg-neutral-950 text-neutral-100';
    } else if (p.indexOf('/docs') === 0) {
      document.body.className = 'docs-page';
    } else if (p === '/legal/privacy-policy') {
      document.body.className = 'legal-page legal-privacy';
    } else if (p === '/legal/refund-policy') {
      document.body.className = 'legal-page legal-refund';
    } else if (p === '/legal/terms-and-conditions') {
      document.body.className = 'legal-page legal-terms';
    }
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Space+Grotesk:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: inlineThemeScript }} />
        <BodyTheme />
        {children}
      </body>
    </html>
  );
}
