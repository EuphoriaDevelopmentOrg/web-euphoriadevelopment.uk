import type { Metadata } from "next";
import { getPageMetadata } from "@/utils/metadata";
import { WebApps } from "./WebAppsClient";

export const metadata: Metadata = getPageMetadata("/docs/community/web-apps");

export default function Page() {
  return <WebApps />;
}
