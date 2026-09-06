import axios from "axios";

export type Contributor = {
  name: string;
  contribution: string;
  link: string | null;
  image: string | null;
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

export async function fetchContributors(): Promise<Contributor[]> {
  const { data } = await axios.get<unknown>(
    "https://api.euphoriadevelopment.uk/contributors",
  );
  if (!Array.isArray(data)) return [];
  return data.map((item) => {
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
