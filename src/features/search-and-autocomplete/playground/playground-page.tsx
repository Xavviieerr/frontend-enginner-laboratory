"use client";

import { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import { useProductSearch } from "./hooks/useProductSearch";
import SearchSuggestions from "./components/SearchSuggestions";
import SearchResult from "./components/SearchResult";

export default function SearchPlayground() {
	const [query, setQuery] = useState("");
	const { products, status, error } = useProductSearch(query);
	const suggestions = products.map((product) => product.title);
	const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
	const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

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
			setQuery(selectedSuggestion);
			setHighlightedIndex(null);
		}
		if (event.key === "Escape") {
			event.preventDefault();
			setIsSuggestionsOpen(false);
			setHighlightedIndex(null);
		}
	};

	const handleQueryChange = (value: string) => {
		setQuery(value);
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
		setIsSuggestionsOpen(false);
		setHighlightedIndex(null);
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
		</div>
	);
}
