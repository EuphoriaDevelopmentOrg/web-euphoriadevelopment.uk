import { fetchJson } from "./http";
import { isRecord, safeNumber, textOrNull } from "./validation";

export type Repository = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number | null;
  forks_count: number | null;
  open_issues_count: number | null;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
};

function normalize(value: unknown, fullName: string): Repository {
  if (!isRecord(value)) throw new Error("Invalid repository metadata");
  const name = fullName.split("/")[1];
  return {
    name,
    html_url: `https://github.com/${fullName}`,
    description: textOrNull(value.description),
    language: textOrNull(value.language),
    stargazers_count: safeNumber(value.stargazers_count),
    forks_count: safeNumber(value.forks_count),
    open_issues_count: safeNumber(value.open_issues_count),
    pushed_at: textOrNull(value.pushed_at) ?? "",
    archived: value.archived === true,
    fork: value.fork === true,
  };
}

export async function fetchRepository(fullName: string): Promise<Repository> {
  if (!/^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/.test(fullName)) {
    throw new Error("Invalid repository identifier");
  }
  return normalize(
    await fetchJson(`https://api.github.com/repos/${fullName}`, {
      timeout: 5000,
    }),
    fullName,
  );
}

export async function fetchThemeRepositories(): Promise<Repository[]> {
  const data = await fetchJson(
    "https://api.github.com/orgs/EuphoriaTheme/repos?per_page=100&sort=updated",
    { timeout: 5000 },
  );
  if (!Array.isArray(data)) throw new Error("Invalid repository list");
  return data.slice(0, 100).flatMap((value) => {
    if (
      !isRecord(value) ||
      typeof value.name !== "string" ||
      !/^[a-zA-Z0-9_.-]+$/.test(value.name)
    )
      return [];
    return [normalize(value, `EuphoriaTheme/${value.name}`)];
  });
}
