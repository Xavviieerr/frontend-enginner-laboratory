"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  buildSearchUrl,
  parseSearchState,
  serializeSearchState,
  type SearchState,
} from "../utils/searchParams";

type HistoryMode = "push" | "replace";

export function useSearchState() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<SearchState>(() =>
    parseSearchState(searchParams),
  );
  const stateRef = useRef(state);

  useEffect(() => {
    function handlePopState() {
      const nextState = parseSearchState(
        new URLSearchParams(window.location.search),
      );

      stateRef.current = nextState;
      setState(nextState);
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const updateSearchState = useCallback(
    (nextState: SearchState, historyMode: HistoryMode) => {
      stateRef.current = nextState;
      setState(nextState);

      if (typeof window === "undefined") {
        return;
      }

      const params = serializeSearchState(
        nextState,
        new URLSearchParams(window.location.search),
      );
      const url = buildSearchUrl(window.location.pathname, params);

      if (historyMode === "push") {
        window.history.pushState(null, "", url);
      } else {
        window.history.replaceState(null, "", url);
      }
    },
    [],
  );

  const setQuery = useCallback(
    (query: string) => {
      // Avoid one history entry per keystroke.
      updateSearchState({ ...stateRef.current, query, page: 1 }, "replace");
    },
    [updateSearchState],
  );

  const setCategory = useCallback(
    (category: string) => {
      updateSearchState(
        { ...stateRef.current, category, page: 1 },
        "push",
      );
    },
    [updateSearchState],
  );

  const setPage = useCallback(
    (page: number) => {
      const nextPage = Number.isInteger(page) && page > 0 ? page : 1;

      updateSearchState({ ...stateRef.current, page: nextPage }, "push");
    },
    [updateSearchState],
  );

  const clearSearch = useCallback(() => {
    if (!stateRef.current.query && !stateRef.current.category) {
      return;
    }

    updateSearchState({ query: "", page: 1, category: "" }, "push");
  }, [updateSearchState]);

  return {
    ...state,
    setQuery,
    setCategory,
    setPage,
    clearSearch,
  };
}
