import type { Metadata } from "next";
import { getPageMetadata } from "@/utils/metadata";
import { Home } from "./HomeClient";

export const metadata: Metadata = getPageMetadata("/");

export default function HomePage() {
  return (
    <>
      <link rel="canonical" href="https://euphoriadevelopment.uk/" />
      <meta property="og:url" content="https://euphoriadevelopment.uk/" />
      <Home />
    </>
  );
}
