import { useEffect, useState } from "react";
import type { SearchStatus, Product } from "../types/search";
import { searchQuerySchema } from "../validation/search";
import { searchProducts } from "../api/searchProducts";

type Pagination = {
  total: number;
  skip: number;
  limit: number;
};

const SEARCH_PAGE_LIMIT = 5;

export function useProductSearch(query: string, page: number, category = "") {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    skip: 0,
    limit: 0,
  });

  useEffect(() => {
    const normalizedQuery = query.trim();
    const hasCategory = category !== "";

    if (!normalizedQuery && !hasCategory) {
      setProducts([]);
      setPagination({
        total: 0,
        skip: 0,
        limit: SEARCH_PAGE_LIMIT,
      });
      setStatus("idle");
      setError(null);
      return;
    }

    const validation = normalizedQuery
      ? searchQuerySchema.safeParse(normalizedQuery)
      : null;

    if (validation && !validation.success) {
      setProducts([]);
      setPagination({
        total: 0,
        skip: 0,
        limit: SEARCH_PAGE_LIMIT,
      });
      setStatus("idle");
      setError(null);
      return;
    }

    const validQuery = validation?.success ? validation.data : "";
    const skip = (page - 1) * SEARCH_PAGE_LIMIT;
    const controller = new AbortController();
    let isActive = true;

    const timer = setTimeout(() => {
      setStatus("loading");
      setError(null);

      searchProducts({
        query: validQuery,
        category: hasCategory ? category : "",
        skip: hasCategory ? 0 : skip,
        limit: hasCategory ? 0 : SEARCH_PAGE_LIMIT,
        signal: controller.signal,
      })
        .then((data) => {
          if (!isActive) return;

          let matchingProducts = data.products;

          if (hasCategory && validQuery) {
            matchingProducts = matchingProducts.filter(
              (product) => product.category === category,
            );
          }

          const total = hasCategory ? matchingProducts.length : data.total;

          const pageProducts = hasCategory
            ? matchingProducts.slice(skip, skip + SEARCH_PAGE_LIMIT)
            : matchingProducts;

          setProducts(pageProducts);
          setPagination({
            total,
            skip,
            limit: SEARCH_PAGE_LIMIT,
          });
          setStatus("success");
        })
        .catch((error: unknown) => {
          if (!isActive) return;

          if (error instanceof Error && error.name === "AbortError") {
            return;
          }
          setProducts([]);
          setPagination({
            total: 0,
            skip: 0,
            limit: SEARCH_PAGE_LIMIT,
          });

          setStatus("error");
          setError("Unable to load products. Please try again.");
        });
    }, 500);
    return () => {
      isActive = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, page, category]);

  return {
    products,
    status,
    error,
    pagination,
  };
}
