import type { Pagination, Product } from "../types/search";

export const SEARCH_PAGE_LIMIT = 5;

export type ProductPage = {
  products: Product[];
  pagination: Pagination;
};

export function filterProductsByQuery(
  products: Product[],
  query: string,
): Product[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return products;
  }

  return products.filter((product) => {
    const searchableText = [
      product.title,
      product.description,
      product.brand ?? "",
      ...(product.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

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

export type SelectProductsOptions = {
  category?: string;
  query?: string;
};

export function selectProducts(
  products: Product[],
  page: number,
  { category = "", query = "" }: SelectProductsOptions = {},
): ProductPage {
  const matchingProducts = filterProductsByQuery(
    filterProductsByCategory(products, category),
    query,
  );

  return paginateProducts(matchingProducts, page);
}

export function getTotalPages(total: number, limit: number): number {
  return limit > 0 ? Math.ceil(total / limit) : 0;
}
