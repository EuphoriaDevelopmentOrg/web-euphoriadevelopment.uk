import { fetchSiteData } from "./site-data";
import { safeNumber } from "./validation";

export type SiteStats = {
  totalApiCalls: number | null;
  totalInstalls: number | null;
};

export async function fetchSiteStats(refresh = false): Promise<SiteStats> {
  const data = await fetchSiteData(refresh);
  return {
    totalApiCalls: safeNumber(data.totalApiCalls),
    totalInstalls: safeNumber(data.totalInstalls),
  };
}
