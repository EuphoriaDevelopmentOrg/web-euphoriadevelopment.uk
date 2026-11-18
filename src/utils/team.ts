import { fetchJson } from "./http";
import { isRecord, safeUrl } from "./validation";

export type TeamMember = {
  name: string;
  image: string | null;
  link: string | null;
  role: string;
};

export async function fetchTeam(): Promise<TeamMember[]> {
  const data = await fetchJson("https://api.euphoriadevelopment.uk/team");
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
        image: safeUrl(person.Image),
        link: safeUrl(person.Link),
        role: typeof person.Role === "string" ? person.Role : "",
      };
    });
}
