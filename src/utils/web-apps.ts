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
  links: { label: string; href: string }[];
  paid: boolean;
  status?: "moved";
  meta: {
    stars: number;
    forks: number;
    language: string | null;
    updated: string | null;
  } | null;
};

export const freePaste = {
  name: "Euphoria Paste (Free)",
  description: "Free, open-source paste platform.",
  repository: "EuphoriaDevelopmentOrg/Euphoria-Paste",
  links: [
    {
      label: "Live Demo",
      href: "https://paste.euphoriadevelopment.uk/",
    },
    {
      label: "BuiltByBit",
      href: "https://builtbybit.com/resources/euphoria-paste.57494/?ref=discover",
    },
    {
      label: "SourceXchange",
      href: "https://www.sourcexchange.net/products/euphoria-paste",
    },
  ],
  paid: false,
} satisfies Omit<WebApp, "meta">;

export const paidPaste = {
  name: "Euphoria Paste (Paid)",
  description: "Paid paste platform.",
  repository: null,
  links: [
    {
      label: "Live Demo",
      href: "https://paste-v2.euphoriadevelopment.uk/",
    },
    {
      label: "BuiltByBit",
      href: "https://builtbybit.com/resources/euphoria-paste.57974/?ref=discover",
    },
  ],
  paid: true,
} satisfies Omit<WebApp, "meta">;

export const euphoriaLicensing = {
  name: "Euphoria Licensing",
  description: "License operations, product validation, and admin management.",
  repository: null,
  links: [
    {
      label: "Live Demo",
      href: "https://l-demo.euphoriadevelopment.uk/",
    },
    {
      label: "SourceXchange",
      href: "https://www.sourcexchange.net/products/euphoria-licensing",
    },
    {
      label: "BuiltByBit",
      href: "https://builtbybit.com/resources/euphoria-licensing.98263/",
    },
  ],
  paid: true,
} satisfies Omit<WebApp, "meta">;

const apps: Omit<WebApp, "meta">[] = [
  freePaste,
  paidPaste,
  euphoriaLicensing,
  {
    name: "Crafatar",
    status: "moved",
    description:
      "Crafatar has moved to NitroCraft. Visit NitroCraft for Minecraft profile assets and renders.",
    repository: null,
    links: [{ label: "Open NitroCraft", href: "https://nitrocraft.uk" }],
    paid: false,
  },
  {
    name: "NitroCraft",
    description: "High-performance avatar and render delivery.",
    repository: "EuphoriaDevelopmentOrg/NitroCraft",
    links: [{ label: "Open App", href: "https://nitrocraft.uk" }],
    paid: false,
  },
];

export const initialWebApps: WebApp[] = apps.map((app) => ({
  ...app,
  meta: null,
}));
// Count the listed editions, excluding the legacy Crafatar migration card.
export const webAppProjectCount = apps.filter(
  (app) => app.status !== "moved",
).length;

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
          { timeout: 5000, headers: { Accept: "application/vnd.github+json" } },
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
