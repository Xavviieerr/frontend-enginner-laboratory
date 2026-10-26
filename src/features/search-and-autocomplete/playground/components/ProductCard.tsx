import Image from "next/image";
import type { Product } from "../types/search";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={300}
        height={300}
        loading="eager"
        style={{ width: "auto", height: "auto" }}
      />

      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <p>${product.price}</p>
    </article>
  );
}
