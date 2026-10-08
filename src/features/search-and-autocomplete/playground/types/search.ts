export interface Product {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	brand: string;
	images: string[];
	thumbnail: string;
}

export interface ProductSearchResponse {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
}

export type SearchStatus = "idle" | "loading" | "success" | "error";
