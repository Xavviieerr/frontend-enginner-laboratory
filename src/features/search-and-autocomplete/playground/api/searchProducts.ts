import type { ProductSearchResponse } from "../types/search";
import { requestProductSearch } from "./requestProductSearch";

type SearchProductsOptions = {
  query: string;
  skip: number;
  limit: number;
  signal?: AbortSignal;
};

const PRODUCT_SEARCH_URL = "https://dummyjson.com/products/search";

export async function searchProducts({
  query,
  skip,
  limit,
  signal,
}: SearchProductsOptions): Promise<ProductSearchResponse> {
  const url = new URL(PRODUCT_SEARCH_URL);

  url.searchParams.set("q", query.trim());
  url.searchParams.set("skip", String(skip));
  url.searchParams.set("limit", String(limit));

  return requestProductSearch(url, signal);
}
