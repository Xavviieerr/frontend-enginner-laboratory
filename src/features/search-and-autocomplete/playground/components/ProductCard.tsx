import type { Product } from "../types/search";
import { formatCategoryLabel, formatPrice } from "../utils/formatProduct";
import ProductImage from "./ProductImage";

type ProductCardProps = {
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
};

export default function ProductCard({
  product,
  index,
  onSelect,
}: ProductCardProps) {
  const categoryLabel = formatCategoryLabel(product.category);

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface)] transition-colors duration-500 group-hover:bg-[var(--color-surface-strong)] group-focus-within:bg-[var(--color-surface-strong)]">
        <ProductImage
          src={product.thumbnail}
          alt={product.title}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          loading={index < 4 ? "eager" : "lazy"}
          className="object-contain p-6 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.035] group-focus-within:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none sm:p-8 lg:p-10"
        />

        <span
          aria-hidden="true"
          className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)] sm:left-4 sm:top-4"
        >
          No. {String(product.id).padStart(3, "0")}
        </span>

        <span
          aria-hidden="true"
          className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
        >
          <span>View object</span>
          <span>↗</span>
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-4">
        <p className="min-w-0 truncate text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
          {product.brand ?? categoryLabel}
        </p>
        <p className="shrink-0 text-[11px] tabular-nums text-[var(--color-text-secondary)]">
          {formatPrice(product.price)}
        </p>
      </div>

      <h3 className="mt-2 line-clamp-2 min-h-[2.6em] font-display text-[1.35rem] leading-[1.15] tracking-[-0.02em] text-[var(--color-text-primary)]">
        {product.title}
      </h3>

      <button
        type="button"
        onClick={(event) => {
          // Keep focus restoration reliable in browsers that don't focus buttons on click.
          event.currentTarget.focus();
          onSelect(product);
        }}
        aria-label={`View ${product.title}`}
        className="absolute inset-0 z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]"
      />
    </article>
  );
}
