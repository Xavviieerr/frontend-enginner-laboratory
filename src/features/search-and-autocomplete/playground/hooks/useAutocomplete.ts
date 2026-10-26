"use client";

import { useCallback, useState, type KeyboardEvent } from "react";

type UseAutocompleteOptions = {
  suggestions: string[];
  onQueryChange: (query: string) => void;
};

export function useAutocomplete({
  suggestions,
  onQueryChange,
}: UseAutocompleteOptions) {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleQueryChange = useCallback(
    (value: string) => {
      onQueryChange(value);
      setIsOpen(true);
      setHighlightedIndex(null);
    },
    [onQueryChange],
  );

  const handleFocus = useCallback(() => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  }, [suggestions.length]);

  const handleBlur = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(null);
  }, []);

  const handleSelectSuggestion = useCallback(
    (suggestion: string) => {
      onQueryChange(suggestion);
      setIsOpen(false);
      setHighlightedIndex(null);
    },
    [onQueryChange],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
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

        return;
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
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(null);
      }
    },
    [handleSelectSuggestion, highlightedIndex, suggestions],
  );

  return {
    highlightedIndex,
    isOpen,
    handleBlur,
    handleFocus,
    handleKeyDown,
    handleQueryChange,
    handleSelectSuggestion,
  };
}
