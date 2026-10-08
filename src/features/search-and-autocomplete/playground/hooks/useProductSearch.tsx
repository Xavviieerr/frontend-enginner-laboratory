import { useEffect, useState } from "react";
import { SearchStatus } from "../types/search";
import { Product } from "../types/search";
import { searchQuerySchema } from "../validation/search";
import { searchProducts } from "../api/searchProducts";

export function useProductSearch(query: string) {
	const [products, setProducts] = useState<Product[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [status, setStatus] = useState<SearchStatus>("idle");

	useEffect(() => {
		const validate = searchQuerySchema.safeParse(query);

		if (!validate.success) {
			setProducts([]);
			setStatus("idle");
			setError(null);
			return;
		}

		const validQuery = validate.data;
		const controller = new AbortController();
		let isActive = true;

		const timer = setTimeout(() => {
			setStatus("loading");
			setError(null);

			searchProducts(validQuery, controller.signal)
				.then((data) => {
					if (!isActive) return;
					setProducts(data.products);
					setStatus("success");
				})
				.catch((error) => {
					if (!isActive) return;
					if (error instanceof DOMException && error.name === "AbortError") {
						return;
					}
					setStatus("error");
					setError(
						error instanceof Error ? error.message : "Something went wrong",
					);
				});
		}, 500);
		return () => {
			isActive = false;
			clearTimeout(timer);
			controller.abort();
		};
	}, [query]);

	return {
		products,
		status,
		error,
	};
}
