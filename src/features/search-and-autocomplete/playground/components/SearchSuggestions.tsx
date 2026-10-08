import { useState } from "react";

type searchsuggestionProps = {
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
}: searchsuggestionProps) {
	if (!isOpen || suggestions.length === 0) {
		return null;
	}
	return (
		<ul id="search-suggestions" role="listbox">
			{suggestions.map((suggestion, index) => (
				<li
					id={`search-suggestion-${index}`}
					role="option"
					aria-selected={index === highlightedIndex}
					onMouseDown={(event) => {
						event.preventDefault();
						onSelect(suggestion);
					}}
					className={index === highlightedIndex ? "bg-amber-300" : ""}
				>
					{suggestion}
				</li>
			))}
		</ul>
	);
}
