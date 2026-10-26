import type { Pagination, Product } from "../types/search";

export const SEARCH_PAGE_LIMIT = 5;

export type ProductPage = {
  products: Product[];
  pagination: Pagination;
};

export function filterProductsByCategory(
  products: Product[],
  category: string,
): Product[] {
  if (!category) {
    return products;
  }

  return products.filter((product) => product.category === category);
}

export function paginateProducts(
  products: Product[],
  page: number,
  limit: number = SEARCH_PAGE_LIMIT,
): ProductPage {
  const skip = (page - 1) * limit;

  return {
    products: products.slice(skip, skip + limit),
    pagination: {
      total: products.length,
      limit,
    },
  };
}

export function selectProducts(
  products: Product[],
  page: number,
  category = "",
): ProductPage {
  return paginateProducts(
    filterProductsByCategory(products, category),
    page,
  );
}

export function getTotalPages(total: number, limit: number): number {
  return limit > 0 ? Math.ceil(total / limit) : 0;
}
