import type { ProductSearchResponse, Product } from "../types/search";
import { getCachedSearch, setCachedSearch } from "./searchCache";

type SearchProductsOptions = {
  query: string;
  skip: number;
  limit: number;
  signal?: AbortSignal;
  category: string;
};

function isProduct(data: unknown): data is Product {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const product = data as Record<string, unknown>;

  return (
    typeof product.id === "number" &&
    typeof product.title === "string" &&
    typeof product.description === "string" &&
    typeof product.category === "string" &&
    typeof product.price === "number" &&
    typeof product.discountPercentage === "number" &&
    typeof product.rating === "number" &&
    (product.brand === undefined || typeof product.brand === "string") &&
    Array.isArray(product.images) &&
    product.images.every((image) => typeof image === "string") &&
    typeof product.thumbnail === "string"
  );
}

function isProductSearchResponse(data: unknown): data is ProductSearchResponse {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const response = data as Record<string, unknown>;

  return (
    Array.isArray(response.products) &&
    response.products.every(isProduct) &&
    typeof response.total === "number" &&
    typeof response.skip === "number" &&
    typeof response.limit === "number"
  );
}

export async function searchProducts({
  query,
  signal,
  skip,
  category,
  limit,
}: SearchProductsOptions): Promise<ProductSearchResponse> {
  //url preparation
  const normalizedQuery = query.trim();
  let url: URL;

  if (category && normalizedQuery) {
    url = new URL("https://dummyjson.com/products/search");
    url.searchParams.set("q", normalizedQuery);
    url.searchParams.set("limit", "0");
  } else if (category) {
    url = new URL(
      `https://dummyjson.com/products/category/${encodeURIComponent(category)}`,
    );
    url.searchParams.set("limit", "0");
  } else {
    url = new URL("https://dummyjson.com/products/search");
    url.searchParams.set("q", normalizedQuery);
    url.searchParams.set("skip", String(skip));
    url.searchParams.set("limit", String(limit));
  }

  //check if it exists in cache
  const cacheKey = url.toString();
  const cachedData = getCachedSearch(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  //fetch request
  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    if (!response.ok) {
      throw new Error(
        `Product search failed: ${response.status} ${response.statusText}`,
      );
    }
  }

  const data: unknown = await response.json();

  if (!isProductSearchResponse(data)) {
    throw new Error("Invalid product search response");
  }

  setCachedSearch(cacheKey, data);

  return data;
}
