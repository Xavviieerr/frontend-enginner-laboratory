import { Product } from "../types/search";

type productResultProp = {
	product: Product;
};

export default function SearchResult({ product }: productResultProp) {
	return (
		<article>
			<img src={product.thumbnail} alt={product.title} />

			<h2>{product.title}</h2>

			<p>{product.description}</p>

			<p>${product.price}</p>
		</article>
	);
}
