"use client";

import { useEffect, useState } from "react";
import { getProductCategories } from "../api/getProductCategories";

export type CategoriesStatus = "loading" | "success" | "error";

type CategoriesState = {
  categories: string[];
  status: CategoriesStatus;
  error: string | null;
};

const INITIAL_STATE: CategoriesState = {
  categories: [],
  status: "loading",
  error: null,
};

export function useProductCategories() {
  const [state, setState] = useState<CategoriesState>(INITIAL_STATE);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      try {
        const categories = await getProductCategories(controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        setState({
          categories,
          status: "success",
          error: null,
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          categories: [],
          status: "error",
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch product categories",
        });
      }
    }

    void loadCategories();

    return () => {
      controller.abort();
    };
  }, []);

  return state;
}
