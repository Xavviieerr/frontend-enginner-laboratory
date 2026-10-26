"use client";

import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import SearchSuggestions from "./components/SearchSuggestions";
import { useAutocomplete } from "./hooks/useAutocomplete";
import { useProductCategories } from "./hooks/useProductCategories";
import { useProductSearch } from "./hooks/useProductSearch";
import { useSearchState } from "./hooks/useSearchState";

export default function PlaygroundPage() {
  const { query, page, category, setQuery, setCategory, setPage } =
    useSearchState();
  const {
    categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useProductCategories();
  const { products, status, error, pagination } = useProductSearch(
    query,
    page,
    category,
  );
  const suggestions = products.map((product) => product.title);
  const autocomplete = useAutocomplete({
    suggestions,
    onQueryChange: setQuery,
  });

  return (
    <div className="">
      <h1>welcome to the search and autocomplete playground</h1>
      <div>
        <label htmlFor="product-category">Category</label>

        {categoriesStatus === "loading" && <p>Loading categories...</p>}

        {categoriesStatus === "error" && <p role="alert">{categoriesError}</p>}

        <select
          id="product-category"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
          disabled={categoriesStatus !== "success"}
        >
          <option value="">All categories</option>

          {categories.map((categoryOption) => (
            <option key={categoryOption} value={categoryOption}>
              {categoryOption}
            </option>
          ))}
        </select>
      </div>

      <SearchInput
        query={query}
        onQueryChange={autocomplete.handleQueryChange}
        onKeyDown={autocomplete.handleKeyDown}
        onFocus={autocomplete.handleFocus}
        onBlur={autocomplete.handleBlur}
        highlightedIndex={autocomplete.highlightedIndex}
        isSuggestionsOpen={autocomplete.isOpen}
      />
      <SearchSuggestions
        suggestions={suggestions}
        onSelect={autocomplete.handleSelectSuggestion}
        highlightedIndex={autocomplete.highlightedIndex}
        isOpen={autocomplete.isOpen}
      />
      <SearchResults
        products={products}
        status={status}
        error={error}
        pagination={pagination}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
}
