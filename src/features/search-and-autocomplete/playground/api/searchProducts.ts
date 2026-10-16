import { ProductSearchResponse } from "../types/search";

const PRODUCTS_API_URL = "https://dummyjson.com/products/search";

type SearchProductsOptions = {
  query: string;
  skip: number;
  limit: number;
  signal?: AbortSignal;
};

export async function searchProducts({
  query,
  signal,
  skip,
  limit,
}: SearchProductsOptions): Promise<ProductSearchResponse> {
  const url = new URL(PRODUCTS_API_URL);

  url.searchParams.set("q", query);
  url.searchParams.set("skip", String(skip));
  url.searchParams.set("limit", String(limit));
  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  return response.json();
}
