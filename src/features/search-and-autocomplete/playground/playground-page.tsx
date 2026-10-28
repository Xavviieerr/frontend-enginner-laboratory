"use client";

import { useCallback, useState } from "react";
import CategoryFilters from "./components/CategoryFilters";
import EditorialHeader from "./components/EditorialHeader";
import ProductDetailModal from "./components/ProductDetailModal";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import SearchSuggestions from "./components/SearchSuggestions";
import { useAutocomplete } from "./hooks/useAutocomplete";
import { useProductCategories } from "./hooks/useProductCategories";
import { useProductSearch } from "./hooks/useProductSearch";
import { useSearchState } from "./hooks/useSearchState";
import type { Product } from "./types/search";

function scrollToCollection() {
  const collection = document.getElementById("collection");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  collection?.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

export default function PlaygroundPage() {
  const { query, page, category, setQuery, setCategory, setPage, clearSearch } =
    useSearchState();
  const {
    categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useProductCategories();
  const { products, status, error, pagination, retry } = useProductSearch(
    query,
    page,
    category,
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const suggestions = normalizedQuery
    ? Array.from(new Set(products.map((product) => product.title)))
        .filter((title) => title.toLowerCase().includes(normalizedQuery))
        .slice(0, 6)
    : [];
  const autocomplete = useAutocomplete({
    suggestions,
    onQueryChange: setQuery,
  });

  const handlePageChange = useCallback(
    (nextPage: number) => {
      setPage(nextPage);
      scrollToCollection();
    },
    [setPage],
  );

  const handleClearSearch = useCallback(() => {
    clearSearch();
    scrollToCollection();
  }, [clearSearch]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] selection:bg-[var(--color-accent)] selection:text-[var(--color-accent-foreground)]">
      <a
        href="#collection"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--color-text-primary)] focus:px-4 focus:py-2 focus:text-[9px] focus:uppercase focus:tracking-[0.18em] focus:text-[var(--color-background)]"
      >
        Skip to collection
      </a>

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <EditorialHeader />

        <main>
          <section
            aria-labelledby="search-heading"
            className="border-b border-[var(--color-border)] py-8"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3 lg:col-span-2">
                <label
                  id="search-heading"
                  htmlFor="collection-search"
                  className="inline-block cursor-pointer text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]"
                >
                  Search the collection
                </label>

                <p className="mt-2 max-w-[18ch] text-[11px] leading-5 text-[var(--color-text-secondary)]">
                  By name or description.
                </p>
              </div>

              <div className="relative md:col-span-9 lg:col-span-10">
                <SearchInput
                  id="collection-search"
                  query={query}
                  onQueryChange={autocomplete.handleQueryChange}
                  onKeyDown={autocomplete.handleKeyDown}
                  onClear={autocomplete.handleClear}
                  onFocus={autocomplete.handleFocus}
                  onBlur={autocomplete.handleBlur}
                  highlightedIndex={autocomplete.highlightedIndex}
                  suggestionsCount={suggestions.length}
                  isSuggestionsOpen={autocomplete.isOpen}
                  isLoading={status === "loading"}
                />

                <SearchSuggestions
                  suggestions={suggestions}
                  onSelect={autocomplete.handleSelectSuggestion}
                  highlightedIndex={autocomplete.highlightedIndex}
                  isOpen={autocomplete.isOpen}
                />
              </div>
            </div>

            <CategoryFilters
              categories={categories}
              status={categoriesStatus}
              error={categoriesError}
              selected={category}
              onChange={setCategory}
            />
          </section>

          <SearchResults
            products={products}
            status={status}
            error={error}
            pagination={pagination}
            page={page}
            query={query}
            category={category}
            onPageChange={handlePageChange}
            onSelectProduct={setSelectedProduct}
            onClearSearch={handleClearSearch}
            onRetry={retry}
          />
        </main>

        <footer className="mt-24 flex flex-col gap-3 border-t border-[var(--color-border)] py-8 text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <p>Northstar — The search archive</p>
          <p>Edition 01 / A/W 2026</p>
        </footer>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
