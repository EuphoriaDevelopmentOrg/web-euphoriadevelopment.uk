import axios from "axios";
import { fetchSiteData, type RawProduct } from "./site-data";

type GithubRepository = {
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  fork: boolean;
};

export type BlueprintProduct = {
  id: string;
  identifier: string;
  name: string;
  summary: string;
  type: "addon" | "theme";
  banner: string | null;
  blueprintUrl: string | null;
  builtByBitUrl: string | null;
  sourceXchangeUrl: string | null;
  githubUrl: string | null;
  githubStars: number | null;
  githubForks: number | null;
  panels: number;
  priceLabel: string;
  latestVersion: string | null;
  latestUpdated: string | null;
};

function safeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}
function bannerUrl(value: unknown): string | null {
  if (typeof value === "string") return safeUrl(value);
  if (!value || typeof value !== "object") return null;
  const banner = value as { lowres?: unknown; fullres?: unknown };
  return safeUrl(banner.lowres) ?? safeUrl(banner.fullres);
}
function key(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
function price(platforms: RawProduct["platforms"]): string {
  const offers = Object.values(platforms ?? {})
    .map((offer) => ({
      price: Number(offer.price),
      currency: typeof offer.currency === "string" ? offer.currency : null,
    }))
    .filter((offer) => Number.isFinite(offer.price) && offer.price > 0);
  if (!offers.length) return "FREE";
  const offer = offers[0];
  try {
    return offer.currency
      ? new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: offer.currency,
        }).format(offer.price)
      : offer.price.toFixed(2);
  } catch {
    return offer.price.toFixed(2);
  }
}
function formatDate(value: unknown): string | null {
  const date = new Date(typeof value === "string" ? value : "");
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(date);
}

export async function fetchBlueprintProducts(): Promise<BlueprintProduct[]> {
  const stats = await fetchSiteData();
  if (!Array.isArray(stats.blueprintExtensions)) {
    throw new Error("Blueprint catalogue unavailable");
  }
  return stats.blueprintExtensions
    .map((product, index) => {
      const platforms = product.platforms ?? {};
      const explicitGithub = safeUrl(platforms.GITHUB?.url);
      const latest = [...(product.versions ?? [])].sort(
        (a, b) =>
          Date.parse(String(b.created ?? "")) -
          Date.parse(String(a.created ?? "")),
      )[0];
      return {
        id: String(product.id ?? product.identifier ?? index),
        identifier: String(product.identifier ?? product.name ?? ""),
        name:
          typeof product.name === "string" && product.name
            ? product.name
            : "Untitled",
        summary:
          typeof product.summary === "string"
            ? product.summary
            : "No summary provided.",
        type: (String(product.type).toLowerCase() === "theme"
          ? "theme"
          : "addon") as "addon" | "theme",
        banner: bannerUrl(product.banner),
        blueprintUrl: safeUrl(platforms.BLUEPRINT?.url),
        builtByBitUrl: safeUrl(platforms.BUILTBYBIT?.url),
        sourceXchangeUrl: safeUrl(platforms.SOURCEXCHANGE?.url),
        githubUrl: explicitGithub,
        githubStars: null,
        githubForks: null,
        panels: Math.max(0, Number(product.stats?.panels) || 0),
        priceLabel: price(platforms),
        latestVersion:
          typeof latest?.name === "string" ? `v${latest.name}` : null,
        latestUpdated: formatDate(latest?.created),
      };
    })
    .sort(
      (a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name),
    );
}

export async function enrichBlueprintProducts(
  products: BlueprintProduct[],
): Promise<BlueprintProduct[]> {
  try {
    const { data: repositories } = await axios.get<GithubRepository[]>(
      "https://api.github.com/orgs/EuphoriaTheme/repos?per_page=100&sort=updated",
      { timeout: 5000, headers: { Accept: "application/vnd.github+json" } },
    );
    const repoIndex = new Map(
      repositories
        .filter((repo) => !repo.archived && !repo.fork)
        .map((repo) => [key(repo.name), repo]),
    );
    return products.map((product) => {
      const repository =
        repoIndex.get(key(product.identifier)) ??
        repoIndex.get(key(product.name));
      return {
        ...product,
        githubUrl: product.githubUrl ?? safeUrl(repository?.html_url),
        githubStars: repository?.stargazers_count ?? null,
        githubForks: repository?.forks_count ?? null,
      };
    });
  } catch {
    return products;
  }
}
