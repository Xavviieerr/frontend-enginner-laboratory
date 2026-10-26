type PaginationProps = {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  disabled = false,
  onPageChange,
}: PaginationProps) {
  return (
    <nav aria-label="Product result pages">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={disabled || page <= 1}
      >
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={disabled || page >= totalPages}
      >
        Next
      </button>
    </nav>
  );
}
