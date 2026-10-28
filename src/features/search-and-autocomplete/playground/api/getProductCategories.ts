const PRODUCT_CATEGORIES_URL = "https://dummyjson.com/products/category-list";

function isStringArray(data: unknown): data is string[] {
  return Array.isArray(data) && data.every((item) => typeof item === "string");
}

export async function getProductCategories(
  signal?: AbortSignal,
): Promise<string[]> {
  const response = await fetch(PRODUCT_CATEGORIES_URL, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product categories");
  }

  const data: unknown = await response.json();

  if (!isStringArray(data)) {
    throw new Error("Invalid product categories response");
  }

  return data;
}
