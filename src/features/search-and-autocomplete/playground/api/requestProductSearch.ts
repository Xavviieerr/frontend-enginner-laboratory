import type { Product, ProductSearchResponse } from "../types/search";
import { getCachedSearch, setCachedSearch } from "./searchCache";

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
    (product.stock === undefined || typeof product.stock === "number") &&
    (product.brand === undefined || typeof product.brand === "string") &&
    (product.sku === undefined || typeof product.sku === "string") &&
    (product.tags === undefined ||
      (Array.isArray(product.tags) &&
        product.tags.every((tag) => typeof tag === "string"))) &&
    (product.warrantyInformation === undefined ||
      typeof product.warrantyInformation === "string") &&
    (product.shippingInformation === undefined ||
      typeof product.shippingInformation === "string") &&
    (product.availabilityStatus === undefined ||
      typeof product.availabilityStatus === "string") &&
    (product.minimumOrderQuantity === undefined ||
      typeof product.minimumOrderQuantity === "number") &&
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

export async function requestProductSearch(
  url: URL,
  signal?: AbortSignal,
): Promise<ProductSearchResponse> {
  const cacheKey = url.toString();
  const cachedData = getCachedSearch(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Product search failed: ${response.status} ${response.statusText}`,
    );
  }

  const data: unknown = await response.json();

  if (!isProductSearchResponse(data)) {
    throw new Error("Invalid product search response");
  }

  setCachedSearch(cacheKey, data);

  return data;
}
