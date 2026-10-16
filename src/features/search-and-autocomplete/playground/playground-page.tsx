"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SearchInput from "./components/SearchInput";
import { useProductSearch } from "./hooks/useProductSearch";
import SearchSuggestions from "./components/SearchSuggestions";
import SearchResult from "./components/SearchResult";

export default function SearchPlayground() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialQuery = searchParams.get("q") ?? "";
  const parsedPage = Number(searchParams.get("page"));
  const initialPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const { products, status, error, pagination } = useProductSearch(query, page);
  const suggestions = products.map((product) => product.title);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const totalPages =
    pagination.limit > 0 ? Math.ceil(pagination.total / pagination.limit) : 0;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setHighlightedIndex((currentIndex) => {
        if (suggestions.length === 0) {
          return null;
        }

        if (currentIndex === null) {
          return 0;
        }

        return Math.min(currentIndex + 1, suggestions.length - 1);
      });

      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();

      setHighlightedIndex((currentIndex) => {
        if (currentIndex === null) {
          return suggestions.length - 1;
        }

        return Math.max(currentIndex - 1, 0);
      });
    }
    if (event.key === "Enter") {
      if (highlightedIndex === null) {
        return;
      }

      const selectedSuggestion = suggestions[highlightedIndex];

      if (!selectedSuggestion) {
        return;
      }

      event.preventDefault();
      handleSelectSuggestion(selectedSuggestion);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setIsSuggestionsOpen(false);
      setHighlightedIndex(null);
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
    updateUrl(value, 1);
    setIsSuggestionsOpen(true);
    setHighlightedIndex(null);
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setIsSuggestionsOpen(true);
    }
  };

  const handleBlur = () => {
    setIsSuggestionsOpen(false);
    setHighlightedIndex(null);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setPage(1);
    updateUrl(suggestion, 1);
    setIsSuggestionsOpen(false);
    setHighlightedIndex(null);
  };

  const handlePreviousPage = () => {
    const nextPage = Math.max(page - 1, 1);

    setPage(nextPage);
    updateUrl(query, nextPage);
  };

  const handleNextPage = () => {
    const nextPage = Math.min(page + 1, totalPages);

    setPage(nextPage);
    updateUrl(query, nextPage);
  };

  //helper
  const updateUrl = (nextQuery: string, nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextQuery.trim()) {
      params.set("q", nextQuery);
    } else {
      params.delete("q");
    }

    if (nextPage > 1) {
      params.set("page", String(nextPage));
    } else {
      params.delete("page");
    }

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(url, { scroll: false });
  };

  return (
    <div className="">
      <h1>welcome to the search and autocomplete playground</h1>
      <SearchInput
        query={query}
        onQueryChange={handleQueryChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        highlightedIndex={highlightedIndex}
        isSuggestionsOpen={isSuggestionsOpen}
      />
      <SearchSuggestions
        suggestions={suggestions}
        onSelect={handleSelectSuggestion}
        highlightedIndex={highlightedIndex}
        isOpen={isSuggestionsOpen}
      />

      {status === "loading" && products.length === 0 && <p>Searching...</p>}

      {status === "error" && <p>{error}</p>}

      {status === "success" && products.length === 0 && (
        <p>No results found.</p>
      )}

      {status === "success" && products.length > 0 && (
        <div>
          {products.length > 0 && (
            <div>
              {products.map((product) => (
                <SearchResult key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
      {totalPages > 1 && (
        <nav aria-label="Product result pages">
          <button
            type="button"
            onClick={handlePreviousPage}
            disabled={page <= 1 || status === "loading"}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={page >= totalPages || status === "loading"}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
