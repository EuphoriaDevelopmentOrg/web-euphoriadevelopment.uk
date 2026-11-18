import { fetchJson } from "./http";
import { isRecord } from "./validation";

type Offer = { url?: unknown; price?: unknown; currency?: unknown };
export type RawProduct = {
  id?: unknown;
  name?: unknown;
  identifier?: unknown;
  summary?: unknown;
  type?: unknown;
  banner?: unknown;
  platforms?: Record<string, Offer>;
  stats?: { panels?: unknown };
  versions?: { name?: unknown; created?: unknown }[];
};
export type SiteData = {
  totalApiCalls?: unknown;
  totalInstalls?: unknown;
  blueprintExtensions?: RawProduct[];
};

export async function fetchSiteData(refresh = false): Promise<SiteData> {
  const data = await fetchJson("https://api.euphoriadevelopment.uk/stats/", {
    refresh,
  });
  if (!isRecord(data)) throw new Error("Invalid site data");
  return data as SiteData;
}
