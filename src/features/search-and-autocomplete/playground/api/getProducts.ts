import type { ProductSearchResponse } from "../types/search";
import { requestProductSearch } from "./requestProductSearch";

type GetProductsOptions = {
  skip: number;
  limit: number;
  signal?: AbortSignal;
};

const PRODUCTS_URL = "https://dummyjson.com/products";

export async function getProducts({
  skip,
  limit,
  signal,
}: GetProductsOptions): Promise<ProductSearchResponse> {
  const url = new URL(PRODUCTS_URL);

  url.searchParams.set("skip", String(skip));
  url.searchParams.set("limit", String(limit));

  return requestProductSearch(url, signal);
}
