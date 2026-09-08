import axios from "axios";

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

let pending: Promise<SiteData> | undefined;

// Share concurrent catalogue/statistics requests, without caching failures.
export function fetchSiteData(): Promise<SiteData> {
  pending ??= axios
    .get<SiteData>("https://api.euphoriadevelopment.uk/stats/", {
      timeout: 8000,
    })
    .then(({ data }) => {
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        throw new Error("Invalid site data");
      }
      return data;
    })
    .finally(() => {
      pending = undefined;
    });
  return pending;
}
