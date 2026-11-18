const pending = new Map<string, Promise<unknown>>();
const cached = new Map<string, { expires: number; value: unknown }>();
const maximumBytes = 2 * 1024 * 1024;

/** Only public API metadata belongs in this browser-local cache. */
export function fetchJson(
  url: string,
  { refresh = false, timeout = 8000 } = {},
): Promise<unknown> {
  const target = new URL(url);
  if (
    target.protocol !== "https:" ||
    target.username ||
    target.password ||
    !["api.github.com", "api.euphoriadevelopment.uk"].includes(target.host)
  )
    return Promise.reject(new Error("Unexpected metadata API origin"));
  const active = pending.get(url);
  if (active) return active;
  const previous = cached.get(url);
  if (!refresh && previous && previous.expires > Date.now()) {
    return Promise.resolve(previous.value);
  }
  const request = (async () => {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      credentials: "omit",
      cache: refresh ? "no-store" : "default",
      signal: AbortSignal.timeout(timeout),
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) throw new Error("Metadata service unavailable");
    if (Number(response.headers.get("content-length")) > maximumBytes) {
      await response.body?.cancel();
      throw new Error("Metadata response is too large");
    }
    const reader = response.body?.getReader();
    if (!reader) throw new Error("Missing metadata response");
    const decoder = new TextDecoder();
    let bytes = 0;
    let text = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > maximumBytes) {
          await reader.cancel();
          throw new Error("Metadata response is too large");
        }
        text += decoder.decode(value, { stream: true });
      }
    } finally {
      reader.releaseLock();
    }
    const value: unknown = JSON.parse(text + decoder.decode());
    if (cached.size >= 32) cached.delete(cached.keys().next().value!);
    cached.set(url, { expires: Date.now() + 60_000, value });
    return value;
  })().finally(() => pending.delete(url));
  pending.set(url, request);
  return request;
}
