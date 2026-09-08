import { fetchSiteData } from "./site-data";

export type SiteStats = {
  totalApiCalls: number | null;
  totalInstalls: number | null;
};

function safeNumber(value: unknown): number | null {
  if (
    (typeof value !== "number" && typeof value !== "string") ||
    (typeof value === "string" && !value.trim())
  )
    return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? Math.floor(number) : null;
}

export async function fetchSiteStats(): Promise<SiteStats> {
  const data = await fetchSiteData();
  return {
    totalApiCalls: safeNumber(data.totalApiCalls),
    totalInstalls: safeNumber(data.totalInstalls),
  };
}
