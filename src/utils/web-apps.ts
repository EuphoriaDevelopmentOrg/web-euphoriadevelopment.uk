import axios from "axios";

type GithubRepository = {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
};
export type WebApp = {
  name: string;
  description: string;
  repository: string | null;
  website: string | null;
  paid: boolean;
  meta: {
    stars: number;
    forks: number;
    language: string | null;
    updated: string | null;
  } | null;
};

const apps = [
  {
    name: "Euphoria Paste",
    description: "Paid paste platform.",
    repository: "EuphoriaTheme/Euphoria-Paste",
    website: "https://builtbybit.com/resources/euphoria-paste.57974/",
    paid: true,
  },
  {
    name: "Euphoria Licensing",
    description:
      "License operations, product validation, and admin management.",
    repository: null,
    website: "https://builtbybit.com/resources/euphoria-licensing.98263/",
    paid: true,
  },
  {
    name: "StreamLink",
    description: "Cross-platform Xbox streaming client scaffold.",
    repository: "EuphoriaDevelopmentOrg/StreamLink",
    website: null,
    paid: false,
  },
  {
    name: "Crafatar",
    description: "Minecraft profile assets and renders.",
    repository: "EuphoriaTheme/crafatar",
    website: "https://crafatar.euphoriadevelopment.uk/",
    paid: false,
  },
  {
    name: "NitroCraft",
    description: "High-performance avatar and render delivery.",
    repository: "EuphoriaDevelopmentOrg/NitroCraft",
    website: "https://nitrocraft.uk",
    paid: false,
  },
  {
    name: "Eventer",
    description: "Making scheduling easy.",
    repository: "RepGraphics/eventer",
    website: null,
    paid: false,
  },
] as const;

function formatDate(value: string): string | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(date);
}

export async function fetchWebApps(): Promise<WebApp[]> {
  const metadata = await Promise.all(
    apps.map(async (app) => {
      if (!app.repository) return null;
      try {
        const { data } = await axios.get<GithubRepository>(
          `https://api.github.com/repos/${app.repository}`,
          { headers: { Accept: "application/vnd.github+json" } },
        );
        return {
          stars: data.stargazers_count ?? 0,
          forks: data.forks_count ?? 0,
          language: data.language ?? null,
          updated: formatDate(data.pushed_at),
        };
      } catch {
        return null;
      }
    }),
  );
  return apps.map((app, index) => ({ ...app, meta: metadata[index] }));
}
