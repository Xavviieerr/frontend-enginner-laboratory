"use client";

import { useEffect, useReducer } from "react";
import { getProductsByCategory } from "../api/getProductsByCategory";
import { searchProducts } from "../api/searchProducts";
import type { Pagination, Product, SearchStatus } from "../types/search";
import {
  SEARCH_PAGE_LIMIT,
  selectProducts,
  type ProductPage,
} from "../utils/selectProducts";
import { searchQuerySchema } from "../validation/search";

type SearchResultState = {
  products: Product[];
  pagination: Pagination;
  status: SearchStatus;
  error: string | null;
};

type SearchResultAction =
  | { type: "reset" }
  | { type: "loading" }
  | { type: "success"; products: Product[]; pagination: Pagination }
  | { type: "error" };

const EMPTY_PAGINATION: Pagination = {
  total: 0,
  limit: SEARCH_PAGE_LIMIT,
};

const INITIAL_STATE: SearchResultState = {
  products: [],
  pagination: EMPTY_PAGINATION,
  status: "idle",
  error: null,
};

function searchResultReducer(
  state: SearchResultState,
  action: SearchResultAction,
): SearchResultState {
  switch (action.type) {
    case "reset":
      if (
        state.status === "idle" &&
        state.products.length === 0 &&
        state.error === null
      ) {
        return state;
      }

      return INITIAL_STATE;

    case "loading":
      return {
        ...state,
        status: "loading",
        error: null,
      };

    case "success":
      return {
        products: action.products,
        pagination: action.pagination,
        status: "success",
        error: null,
      };

    case "error":
      return {
        products: [],
        pagination: EMPTY_PAGINATION,
        status: "error",
        error: "Unable to load products. Please try again.",
      };
  }
}

export function useProductSearch(query: string, page: number, category = "") {
  const [result, dispatch] = useReducer(searchResultReducer, INITIAL_STATE);

  const normalizedQuery = query.trim();
  const hasCategory = category !== "";
  const validation = normalizedQuery
    ? searchQuerySchema.safeParse(normalizedQuery)
    : null;
  const validQuery = validation?.success ? validation.data : "";
  const isIdle =
    (!normalizedQuery && !hasCategory) ||
    (validation !== null && !validation.success);

  useEffect(() => {
    if (isIdle) {
      dispatch({ type: "reset" });
      return;
    }

    const skip = (page - 1) * SEARCH_PAGE_LIMIT;
    const controller = new AbortController();
    let isActive = true;

    async function loadPage(): Promise<ProductPage> {
      if (hasCategory) {
        // DummyJSON's category endpoint ignores q, so filter the category locally.
        const data = await getProductsByCategory(category, controller.signal);

        return selectProducts(data.products, page, {
          category,
          query: validQuery,
        });
      }

      const data = await searchProducts({
        query: validQuery,
        skip,
        limit: SEARCH_PAGE_LIMIT,
        signal: controller.signal,
      });

      return {
        products: data.products,
        pagination: {
          total: data.total,
          limit: SEARCH_PAGE_LIMIT,
        },
      };
    }

    const timer = window.setTimeout(() => {
      dispatch({ type: "loading" });

      void loadPage()
        .then((pageResult) => {
          if (!isActive) {
            return;
          }

          dispatch({
            type: "success",
            products: pageResult.products,
            pagination: pageResult.pagination,
          });
        })
        .catch((error: unknown) => {
          if (!isActive) {
            return;
          }

          if (error instanceof Error && error.name === "AbortError") {
            return;
          }

          dispatch({ type: "error" });
        });
    }, 500);

    return () => {
      isActive = false;
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [category, hasCategory, isIdle, page, query, validQuery]);

  return result;
}
