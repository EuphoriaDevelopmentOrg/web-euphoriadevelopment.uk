import { fetchJson } from "./http";
import { isRecord, safeUrl } from "./validation";

export type Contributor = {
  name: string;
  contribution: string;
  link: string | null;
  image: string | null;
};

export async function fetchContributors(): Promise<Contributor[]> {
  const data = await fetchJson(
    "https://api.euphoriadevelopment.uk/contributors",
  );
  if (!Array.isArray(data)) return [];
  return data
    .filter(isRecord)
    .slice(0, 500)
    .map((item) => {
      const person = item as Record<string, unknown>;
      return {
        name:
          typeof person.Name === "string" && person.Name
            ? person.Name
            : "Unknown",
        contribution:
          typeof person.Contribution === "string" ? person.Contribution : "",
        link: safeUrl(person.Link),
        image: safeUrl(person.Image),
      };
    });
}
