import type {
  Pagination as PaginationState,
  Product,
  SearchStatus,
} from "../types/search";
import { getTotalPages } from "../utils/selectProducts";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

type SearchResultsProps = {
  products: Product[];
  status: SearchStatus;
  error: string | null;
  pagination: PaginationState;
  page: number;
  onPageChange: (page: number) => void;
};

export default function SearchResults({
  products,
  status,
  error,
  pagination,
  page,
  onPageChange,
}: SearchResultsProps) {
  const totalPages = getTotalPages(pagination.total, pagination.limit);

  return (
    <>
      {status === "loading" && products.length === 0 && <p>Searching...</p>}

      {status === "error" && <p>{error}</p>}

      {status === "success" && products.length === 0 && (
        <p>No results found.</p>
      )}

      {status === "success" && products.length > 0 && (
        <div>
          <div>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          disabled={status === "loading"}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
