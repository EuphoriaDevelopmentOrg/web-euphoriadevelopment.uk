import axios from "axios";

type GithubRepository = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
};
export type EndstonePlugin = {
  name: string;
  description: string;
  repository: string;
  language: string | null;
  stars: number;
  forks: number;
  updated: string | null;
};

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

export async function fetchEndstonePlugins(): Promise<EndstonePlugin[]> {
  const { data } = await axios.get<GithubRepository[]>(
    "https://api.github.com/orgs/EuphoriaDevelopmentOrg/repos?per_page=100&sort=updated",
    { headers: { Accept: "application/vnd.github+json" } },
  );
  return data
    .filter(
      (repository) =>
        !repository.archived &&
        !repository.fork &&
        /-endstone$/i.test(repository.name),
    )
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
    .map((repository) => ({
      name: repository.name.replace(/-endstone$/i, ""),
      description: repository.description ?? "No description provided.",
      repository: repository.html_url,
      language: repository.language ?? null,
      stars: repository.stargazers_count ?? 0,
      forks: repository.forks_count ?? 0,
      updated: formatDate(repository.pushed_at),
    }));
}
