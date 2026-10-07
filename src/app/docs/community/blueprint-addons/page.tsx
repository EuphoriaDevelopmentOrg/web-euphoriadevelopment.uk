import type { Metadata } from "next";
import { getPageMetadata } from "@/utils/metadata";
import { BlueprintAddons } from "./BlueprintAddonsClient";

export const metadata: Metadata = getPageMetadata(
  "/docs/community/blueprint-addons",
);

export default function Page() {
  return <BlueprintAddons />;
}
