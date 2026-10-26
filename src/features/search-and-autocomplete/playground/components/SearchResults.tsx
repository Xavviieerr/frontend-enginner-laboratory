import type {
  Pagination as PaginationState,
  Product,
  SearchStatus,
} from "../types/search";
import { formatCategoryLabel } from "../utils/formatProduct";
import { getTotalPages } from "../utils/selectProducts";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

type SearchResultsProps = {
  products: Product[];
  status: SearchStatus;
  error: string | null;
  pagination: PaginationState;
  page: number;
  query: string;
  category: string;
  onPageChange: (page: number) => void;
  onSelectProduct: (product: Product) => void;
  onClearSearch: () => void;
  onRetry: () => void;
};

const GRID_CLASS =
  "grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-16";

const ACTION_CLASS =
  "inline-flex items-center gap-2 border-b border-[var(--color-text-primary)] pb-1 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-primary)] transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)] motion-reduce:transition-none";

function formatCount(value: number): string {
  return String(value).padStart(2, "0");
}

function CollectionSkeleton() {
  return (
    <div aria-hidden="true" className={GRID_CLASS}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={`collection-skeleton-${index}`}>
          <div className="aspect-[4/5] animate-pulse bg-[var(--color-surface)] motion-reduce:animate-none" />

          <div className="mt-4 flex items-center justify-between border-b border-[var(--color-border)] pb-4">
            <span className="h-2.5 w-20 animate-pulse rounded-full bg-[var(--color-surface)] motion-reduce:animate-none" />
            <span className="h-2.5 w-12 animate-pulse rounded-full bg-[var(--color-surface)] motion-reduce:animate-none" />
          </div>

          <span className="mt-3 block h-4 w-3/4 animate-pulse rounded-full bg-[var(--color-surface)] motion-reduce:animate-none" />
          <span className="mt-2 block h-4 w-1/2 animate-pulse rounded-full bg-[var(--color-surface)] motion-reduce:animate-none" />
        </div>
      ))}
    </div>
  );
}

type EmptyCollectionProps = {
  query: string;
  category: string;
  onClearSearch: () => void;
};

function EmptyCollection({
  query,
  category,
  onClearSearch,
}: EmptyCollectionProps) {
  const trimmedQuery = query.trim();
  const canClear = Boolean(trimmedQuery || category);
  const clearLabel =
    trimmedQuery && category
      ? "Clear search and filters"
      : trimmedQuery
        ? "Clear the search"
        : "Clear the filter";
  let description = "The archive is currently empty.";

  if (trimmedQuery && category) {
    description = `No objects match “${trimmedQuery}” in ${formatCategoryLabel(category)}.`;
  } else if (trimmedQuery) {
    description = `No objects match “${trimmedQuery}”.`;
  } else if (category) {
    description = `There are no objects in ${formatCategoryLabel(category)}.`;
  }

  return (
    <div
      role="status"
      className="mt-8 flex min-h-[44vh] flex-col items-center justify-center border-y border-[var(--color-border)] py-20 text-center"
    >
      <p
        aria-hidden="true"
        className="font-display text-[7rem] leading-none text-[var(--color-accent)] opacity-[0.16]"
      >
        0
      </p>

      <h3 className="mt-4 font-display text-4xl tracking-[-0.03em] text-[var(--color-text-primary)]">
        Nothing in this edit.
      </h3>

      <p className="mt-4 max-w-md text-sm leading-7 text-[var(--color-text-secondary)]">
        {description} Try a broader term or step back into the full archive.
      </p>

      {canClear && (
        <button
          type="button"
          onClick={onClearSearch}
          className={`${ACTION_CLASS} mt-8`}
        >
          {clearLabel} <span aria-hidden="true">↗</span>
        </button>
      )}
    </div>
  );
}

type OutOfRangeProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function OutOfRange({ page, totalPages, onPageChange }: OutOfRangeProps) {
  return (
    <div
      role="status"
      className="mt-8 flex min-h-[36vh] flex-col items-center justify-center border-y border-[var(--color-border)] py-20 text-center"
    >
      <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
        Beyond the edit
      </p>

      <h3 className="mt-4 font-display text-4xl tracking-[-0.03em] text-[var(--color-text-primary)]">
        Page {formatCount(page)} is out of range.
      </h3>

      <p className="mt-4 max-w-md text-sm leading-7 text-[var(--color-text-secondary)]">
        This edition has {totalPages} {totalPages === 1 ? "page" : "pages"}.
        Return to the beginning of the collection.
      </p>

      <button
        type="button"
        onClick={() => {
          onPageChange(1);
        }}
        className={`${ACTION_CLASS} mt-8`}
      >
        Return to page 01 <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}

type ErrorStateProps = {
  error: string | null;
  canClear: boolean;
  onClearSearch: () => void;
  onRetry: () => void;
};

function ErrorState({
  error,
  canClear,
  onClearSearch,
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="mt-8 flex min-h-[36vh] flex-col items-center justify-center border-y border-[var(--color-border)] py-20 text-center"
    >
      <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
        Request interrupted
      </p>

      <h3 className="mt-4 max-w-xl font-display text-4xl tracking-[-0.03em] text-[var(--color-text-primary)]">
        The archive is momentarily unavailable.
      </h3>

      <p className="mt-4 max-w-md text-sm leading-7 text-[var(--color-text-secondary)]">
        {error ?? "The collection could not be loaded."}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        <button type="button" onClick={onRetry} className={ACTION_CLASS}>
          Try again <span aria-hidden="true">↗</span>
        </button>

        {canClear && (
          <button type="button" onClick={onClearSearch} className={ACTION_CLASS}>
            Clear search and filters
          </button>
        )}
      </div>
    </div>
  );
}

export default function SearchResults({
  products,
  status,
  error,
  pagination,
  page,
  query,
  category,
  onPageChange,
  onSelectProduct,
  onClearSearch,
  onRetry,
}: SearchResultsProps) {
  const totalPages = getTotalPages(pagination.total, pagination.limit);
  const isInitialLoading =
    (status === "idle" || status === "loading") && products.length === 0;
  const isRefreshing = status === "loading" && products.length > 0;
  const isOutOfRange =
    status === "success" && pagination.total > 0 && page > totalPages;
  const isEmpty =
    status === "success" && pagination.total === 0 && !isOutOfRange;
  const canClear = Boolean(query.trim() || category);
  const rangeStart =
    pagination.total > 0 && !isOutOfRange
      ? (page - 1) * pagination.limit + 1
      : 0;
  const rangeEnd = Math.min(page * pagination.limit, pagination.total);
  const trimmedQuery = query.trim();
  let contextLabel = "The complete archive, in catalogue order.";

  if (trimmedQuery && category) {
    contextLabel = `Results for “${trimmedQuery}” in ${formatCategoryLabel(category)}.`;
  } else if (trimmedQuery) {
    contextLabel = `Results for “${trimmedQuery}”.`;
  } else if (category) {
    contextLabel = `${formatCategoryLabel(category)} — the complete category.`;
  }

  let countLabel = "Loading the archive";

  if (status === "error") {
    countLabel = "Unavailable";
  } else if (isOutOfRange) {
    countLabel = `Beyond page ${formatCount(totalPages)}`;
  } else if (isEmpty) {
    countLabel = "No objects";
  } else if (status === "success" && pagination.total > 0) {
    countLabel = `${formatCount(rangeStart)}—${formatCount(rangeEnd)} / ${pagination.total}`;
  } else if (isRefreshing) {
    countLabel = "Updating the archive";
  } else if (status === "loading" || status === "idle") {
    countLabel = "Searching the archive";
  }

  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      aria-busy={status === "loading"}
      className="scroll-mt-6 pt-10 md:pt-12"
    >
      <div className="flex flex-col gap-5 border-b border-[var(--color-border)] pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
            The collection
          </p>

          <h2
            id="collection-heading"
            className="mt-2 font-display text-3xl tracking-[-0.03em] text-[var(--color-text-primary)] md:text-4xl"
          >
            A considered edit.
          </h2>

          <p className="mt-2 max-w-[55ch] text-xs leading-6 text-[var(--color-text-secondary)]">
            {contextLabel}
          </p>
        </div>

        <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)] md:justify-end">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)] ${
              status === "loading" || status === "idle"
                ? "animate-pulse motion-reduce:animate-none"
                : ""
            }`}
          />
          <p aria-live="polite" className="tabular-nums">
            {countLabel}
          </p>
        </div>
      </div>

      {isRefreshing && (
        <div
          aria-hidden="true"
          className="h-px w-full animate-pulse bg-[var(--color-accent)] opacity-40 motion-reduce:animate-none"
        />
      )}

      {isInitialLoading && (
        <div className="mt-6">
          <CollectionSkeleton />
        </div>
      )}

      {status === "error" && (
        <ErrorState
          error={error}
          canClear={canClear}
          onClearSearch={onClearSearch}
          onRetry={onRetry}
        />
      )}

      {isOutOfRange && (
        <OutOfRange
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {isEmpty && (
        <EmptyCollection
          query={query}
          category={category}
          onClearSearch={onClearSearch}
        />
      )}

      {!isInitialLoading &&
        status !== "error" &&
        !isOutOfRange &&
        !isEmpty &&
        products.length > 0 && (
          <div className={`${GRID_CLASS} mt-6`}>
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        )}

      {!isInitialLoading &&
        status !== "error" &&
        !isOutOfRange &&
        !isEmpty &&
        totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            disabled={status === "loading"}
            onPageChange={onPageChange}
          />
        )}
    </section>
  );
}
