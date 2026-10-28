type SearchSuggestionsProps = {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  highlightedIndex: number | null;
  isOpen: boolean;
};

export default function SearchSuggestions({
  suggestions,
  onSelect,
  highlightedIndex,
  isOpen,
}: SearchSuggestionsProps) {
  if (!isOpen || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-x-0 bottom-full z-40 mb-3 overflow-hidden border border-[var(--color-border)] bg-[var(--color-background)] shadow-[0_24px_70px_rgba(23,22,21,0.14)] md:bottom-auto md:top-full md:mb-0 md:mt-3">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] px-4 py-3">
        <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
          Suggested objects
        </p>
        <p className="hidden text-[9px] uppercase tracking-[0.16em] text-[var(--color-text-secondary)] sm:block">
          ↑ ↓ to navigate
        </p>
      </div>

      <ul
        id="search-suggestions"
        role="listbox"
        aria-label="Search suggestions"
        className="max-h-[min(22rem,60vh)] overflow-y-auto"
      >
        {suggestions.map((suggestion, index) => {
          const isHighlighted = index === highlightedIndex;

          return (
            <li
              key={`${suggestion}-${index}`}
              id={`search-suggestion-${index}`}
              role="option"
              aria-selected={isHighlighted}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              onClick={() => {
                onSelect(suggestion);
              }}
              className={`flex cursor-pointer items-center justify-between gap-4 border-b border-[var(--color-border)] px-4 py-3.5 text-left transition-colors duration-200 last:border-b-0 motion-reduce:transition-none ${
                isHighlighted
                  ? "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
                  : "text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
              }`}
            >
              <span className="min-w-0 truncate text-[13px]">
                {suggestion}
              </span>
              <span
                aria-hidden="true"
                className={`shrink-0 text-[9px] uppercase tracking-[0.16em] ${
                  isHighlighted
                    ? "text-white/60"
                    : "text-[var(--color-text-secondary)]"
                }`}
              >
                {String(index + 1).padStart(2, "0")} ↗
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
