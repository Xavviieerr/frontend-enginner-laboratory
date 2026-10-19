import type { ProductSearchResponse } from "../types/search";

const CACHE_TTL_MS = 30_000;
const MAX_CACHE_ENTRIES = 50;

type CacheEntry = {
  data: ProductSearchResponse;
  timestamp: number;
};

const cache = new Map<string, CacheEntry>();

export function getCachedSearch(
  key: string,
): ProductSearchResponse | undefined {
  const entry = cache.get(key);

  if (!entry) {
    return undefined;
  }

  const isExpired = Date.now() - entry.timestamp >= CACHE_TTL_MS;

  if (isExpired) {
    cache.delete(key);
    return undefined;
  }

  // Refresh insertion order so eviction favours recently used entries.
  cache.delete(key);
  cache.set(key, entry);

  return entry.data;
}

export function setCachedSearch(
  key: string,
  data: ProductSearchResponse,
): void {
  const now = Date.now();

  for (const [existingKey, entry] of cache) {
    if (now - entry.timestamp >= CACHE_TTL_MS) {
      cache.delete(existingKey);
    }
  }

  // Replacing an entry should refresh its position in the Map.
  cache.delete(key);

  if (cache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = cache.keys().next().value;

    if (oldestKey !== undefined) {
      cache.delete(oldestKey);
    }
  }

  cache.set(key, { data, timestamp: now });
}
