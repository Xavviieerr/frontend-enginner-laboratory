import { useEffect, useState } from "react";
import { SearchStatus } from "../types/search";
import { Product } from "../types/search";
import { searchQuerySchema } from "../validation/search";
import { searchProducts } from "../api/searchProducts";

type Pagination = {
  total: number;
  skip: number;
  limit: number;
};

export function useProductSearch(query: string, page: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    skip: 0,
    limit: 0,
  });
  const SEARCH_PAGE_LIMIT = 5;

  useEffect(() => {
    const validate = searchQuerySchema.safeParse(query);

    if (!validate.success) {
      setProducts([]);
      setStatus("idle");
      setError(null);
      return;
    }

    const validQuery = validate.data;
    const limit = SEARCH_PAGE_LIMIT;
    const skip = (page - 1) * limit;
    const controller = new AbortController();
    let isActive = true;

    const timer = setTimeout(() => {
      setStatus("loading");
      setError(null);
      searchProducts({
        query: validQuery,
        skip,
        limit,
        signal: controller.signal,
      })
        .then((data) => {
          if (!isActive) return;
          setProducts(data.products);
          setPagination({
            total: data.total,
            skip: data.skip,
            limit: data.limit,
          });
          setStatus("success");
        })
        .catch((error) => {
          if (!isActive) return;
          if (error instanceof DOMException && error.name === "AbortError") {
            return;
          }
          setStatus("error");
          setError(
            error instanceof Error ? error.message : "Something went wrong",
          );
        });
    }, 500);
    return () => {
      isActive = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, page]);

  return {
    products,
    status,
    error,
    pagination,
  };
}
