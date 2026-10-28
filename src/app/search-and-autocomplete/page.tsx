import type { Metadata } from "next";
import SearchPage from "@/features/search-and-autocomplete/landing/search-page";

const pageTitle = "Northstar — An editorial footwear archive";
const pageDescription =
	"An editorial destination for exceptional footwear, from contemporary silhouettes to timeless craftsmanship.";

export const metadata: Metadata = {
	title: pageTitle,
	description: pageDescription,
	openGraph: {
		title: pageTitle,
		description: pageDescription,
		type: "website",
	},
};

export default function SearchAndAutocomplete() {
	return <SearchPage />;
}
