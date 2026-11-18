import { fetchJson } from "./http";
import { isRecord, safeUrl } from "./validation";

export type Donator = {
  name: string;
  donation: string;
  link: string | null;
  image: string | null;
};

export async function fetchDonators(): Promise<Donator[]> {
  const data = await fetchJson("https://api.euphoriadevelopment.uk/donators");
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
        donation: typeof person.Donation === "string" ? person.Donation : "",
        link: safeUrl(person.Link),
        image: safeUrl(person.Image),
      };
    });
}
