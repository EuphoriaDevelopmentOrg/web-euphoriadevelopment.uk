import { fetchSiteData, type RawProduct } from "./site-data";
import { fetchThemeRepositories } from "./github";
import { isRecord, safeUrl, safeNumber, textOrNull } from "./validation";

const marketplaceHosts: Record<string, string> = {
  GITHUB: "github.com",
  BLUEPRINT: "blueprint.zip",
  BUILTBYBIT: "builtbybit.com",
  SOURCEXCHANGE: "sourcexchange.net",
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
    .filter(isRecord)
    .map((offer) => ({
      price:
        typeof offer.price === "number" || typeof offer.price === "string"
          ? Number(offer.price)
          : NaN,
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

export async function fetchBlueprintProducts(
  refresh = false,
): Promise<BlueprintProduct[]> {
  const stats = await fetchSiteData(refresh);
  if (!Array.isArray(stats.blueprintExtensions)) {
    throw new Error("Blueprint catalogue unavailable");
  }
  return stats.blueprintExtensions
    .filter(isRecord)
    .slice(0, 500)
    .map((product, index) => {
      const platforms = isRecord(product.platforms) ? product.platforms : {};
      const offerUrl = (platform: string) => {
        const url = isRecord(platforms[platform])
          ? safeUrl(platforms[platform].url)
          : null;
        return url &&
          new URL(url).hostname.replace(/^www\./, "") ===
            marketplaceHosts[platform]
          ? url
          : null;
      };
      const explicitGithub = offerUrl("GITHUB");
      const latest = (
        Array.isArray(product.versions)
          ? product.versions.filter(isRecord).slice(0, 100)
          : []
      ).sort(
        (a, b) =>
          Date.parse(textOrNull(b.created) ?? "") -
          Date.parse(textOrNull(a.created) ?? ""),
      )[0];
      return {
        id:
          textOrNull(product.id) ??
          textOrNull(product.identifier) ??
          String(index),
        identifier:
          textOrNull(product.identifier) ?? textOrNull(product.name) ?? "",
        name:
          typeof product.name === "string" && product.name
            ? product.name
            : "Untitled",
        summary:
          typeof product.summary === "string"
            ? product.summary
            : "No summary provided.",
        type: (textOrNull(product.type)?.toLowerCase() === "theme"
          ? "theme"
          : "addon") as "addon" | "theme",
        banner: bannerUrl(product.banner),
        blueprintUrl: offerUrl("BLUEPRINT"),
        builtByBitUrl: offerUrl("BUILTBYBIT"),
        sourceXchangeUrl: offerUrl("SOURCEXCHANGE"),
        githubUrl: explicitGithub,
        githubStars: null,
        githubForks: null,
        panels:
          safeNumber(isRecord(product.stats) ? product.stats.panels : null) ??
          0,
        priceLabel: price(platforms as RawProduct["platforms"]),
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
    const repositories = await fetchThemeRepositories();
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
