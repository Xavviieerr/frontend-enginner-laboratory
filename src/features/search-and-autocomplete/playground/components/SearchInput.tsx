type SearchInputProps = {
	query: string;
	onQueryChange: (query: string) => void;
	onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	highlightedIndex: number | null;
	isSuggestionsOpen: boolean;
	onFocus: () => void;
	onBlur: () => void;
};

export default function SearchInput({
	query,
	onQueryChange,
	onKeyDown,
	highlightedIndex,
	isSuggestionsOpen,
	onFocus,
	onBlur,
}: SearchInputProps) {
	return (
		<input
			type="search"
			role="combobox"
			aria-autocomplete="list"
			aria-expanded={isSuggestionsOpen}
			aria-controls="search-suggestions"
			aria-activedescendant={
				highlightedIndex !== null
					? `search-suggestion-${highlightedIndex}`
					: undefined
			}
			placeholder="find a shoe..."
			value={query}
			onFocus={onFocus}
			onBlur={onBlur}
			onChange={(e) => onQueryChange(e.target.value)}
			onKeyDown={onKeyDown}
			className="ring"
		/>
	);
}
