import axios from "axios";

export type TeamMember = {
  name: string;
  image: string | null;
  link: string | null;
  role: string;
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

export async function fetchTeam(): Promise<TeamMember[]> {
  const { data } = await axios.get<unknown>(
    "https://api.euphoriadevelopment.uk/team",
  );
  if (!Array.isArray(data)) return [];
  return data.map((item) => {
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
