import {
	displayFont,
	bodyFont,
} from "@/features/search-and-autocomplete/styles/fonts";

import "@/features/search-and-autocomplete/styles/index.css";

export default function SearchAndAutocompleteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={`${displayFont.variable} ${bodyFont.variable} feature`}>
			{children}
		</div>
	);
}
