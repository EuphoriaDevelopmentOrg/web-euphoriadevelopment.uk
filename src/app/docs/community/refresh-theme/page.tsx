import type { Metadata } from "next";
import { getPageMetadata } from "@/utils/metadata";
import { CommunityRefreshTheme } from "./CommunityRefreshThemeClient";

export const metadata: Metadata = getPageMetadata(
  "/docs/community/refresh-theme",
);

export default function Page() {
  return <CommunityRefreshTheme />;
}
