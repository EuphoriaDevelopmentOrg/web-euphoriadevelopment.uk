import axios from "axios";

export type SiteStats = {
  totalApiCalls: number;
  totalInstalls: number;
  blueprintCount: number;
};

function safeNumber(value: unknown): number {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.floor(number)) : 0;
}

export async function fetchSiteStats(): Promise<SiteStats> {
  const { data } = await axios.get<Record<string, unknown>>(
    "https://api.euphoriadevelopment.uk/stats/",
  );
  return {
    totalApiCalls: safeNumber(data.totalApiCalls),
    totalInstalls: safeNumber(data.totalInstalls),
    blueprintCount: Array.isArray(data.blueprintExtensions)
      ? data.blueprintExtensions.length
      : 0,
  };
}
