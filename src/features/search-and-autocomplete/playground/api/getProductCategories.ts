const PRODUCT_CATEGORIES_URL = "https://dummyjson.com/products/category-list";

export async function getProductCategories(
  signal?: AbortSignal,
): Promise<string[]> {
  const response = await fetch(PRODUCT_CATEGORIES_URL, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product categories");
  }

  return response.json();
}
