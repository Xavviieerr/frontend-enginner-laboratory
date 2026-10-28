import type { ProductSearchResponse } from "../types/search";
import { requestProductSearch } from "./requestProductSearch";

const PRODUCTS_BY_CATEGORY_URL = "https://dummyjson.com/products/category";

export async function getProductsByCategory(
  category: string,
  signal?: AbortSignal,
): Promise<ProductSearchResponse> {
  const url = new URL(
    `${PRODUCTS_BY_CATEGORY_URL}/${encodeURIComponent(category)}`,
  );

  url.searchParams.set("limit", "0");

  return requestProductSearch(url, signal);
}
