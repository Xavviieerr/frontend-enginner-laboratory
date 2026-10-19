import { ProductSearchResponse } from "../types/search";

const PRODUCTS_API_URL = "https://dummyjson.com/products";

type SearchProductsOptions = {
  query: string;
  skip: number;
  limit: number;
  signal?: AbortSignal;
  category: string;
};

export async function searchProducts({
  query,
  signal,
  skip,
  category,
  limit,
}: SearchProductsOptions): Promise<ProductSearchResponse> {
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

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  return response.json();
}
