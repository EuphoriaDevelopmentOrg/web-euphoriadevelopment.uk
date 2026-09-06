import axios from "axios";

export type Donator = {
  name: string;
  donation: string;
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

export async function fetchDonators(): Promise<Donator[]> {
  const { data } = await axios.get<unknown>(
    "https://api.euphoriadevelopment.uk/donators",
  );
  if (!Array.isArray(data)) return [];
  return data.map((item) => {
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
