"use client";

import { useRef, type KeyboardEvent } from "react";

type SearchInputProps = {
  id: string;
  query: string;
  onQueryChange: (query: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onFocus: () => void;
  onBlur: () => void;
  highlightedIndex: number | null;
  suggestionsCount: number;
  isSuggestionsOpen: boolean;
  isLoading: boolean;
};

export default function SearchInput({
  id,
  query,
  onQueryChange,
  onKeyDown,
  onClear,
  onFocus,
  onBlur,
  highlightedIndex,
  suggestionsCount,
  isSuggestionsOpen,
  isLoading,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const activeDescendant =
    isSuggestionsOpen &&
    highlightedIndex !== null &&
    highlightedIndex >= 0 &&
    highlightedIndex < suggestionsCount
      ? `search-suggestion-${highlightedIndex}`
      : undefined;

  return (
    <div className="relative flex items-end gap-3 border-b border-[var(--color-border-strong)] pb-4 transition-colors duration-300 focus-within:border-[var(--color-accent)]">
      <input
        ref={inputRef}
        id={id}
        type="search"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isSuggestionsOpen}
        aria-controls={isSuggestionsOpen ? "search-suggestions" : undefined}
        aria-activedescendant={activeDescendant}
        aria-haspopup="listbox"
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        placeholder="Search by name or description"
        value={query}
        onChange={(event) => {
          onQueryChange(event.target.value);
        }}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        className="min-w-0 flex-1 appearance-none bg-transparent font-display text-[clamp(1.55rem,3.4vw,3.2rem)] leading-[1.1] tracking-[-0.03em] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
      />

      <div className="flex shrink-0 items-center gap-3 pb-1">
        <span
          aria-hidden="true"
          className="hidden items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)] sm:flex"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] ${
              isLoading ? "animate-pulse motion-reduce:animate-none" : ""
            }`}
          />
          {isLoading ? "Searching" : "Live index"}
        </span>

        {query && (
          <button
            type="button"
            onClick={() => {
              onClear();
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="flex h-8 items-center gap-2 rounded-full border border-[var(--color-border)] px-3 text-[9px] uppercase tracking-[0.16em] text-[var(--color-text-secondary)] transition-colors duration-300 hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] motion-reduce:transition-none"
          >
            <span className="hidden sm:inline">Clear</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              className="h-3.5 w-3.5"
            >
              <path d="m4 4 8 8M12 4l-8 8" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
