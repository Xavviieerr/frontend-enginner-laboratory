import { ProductSearchResponse } from "../types/search";

const PRODUCTS_API_URL = "https://dummyjson.com/products/search";

export async function searchProducts(
	query: string,
	signal?: AbortSignal,
): Promise<ProductSearchResponse> {
	const url = new URL(PRODUCTS_API_URL);

	url.searchParams.set("q", query);

	const response = await fetch(url, {
		signal,
	});

	if (!response.ok) {
		throw new Error("Failed to search products");
	}

	return response.json();
}
