type PaginationProps = {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
};

function formatPageNumber(page: number): string {
  return String(page).padStart(2, "0");
}

export default function Pagination({
  page,
  totalPages,
  disabled = false,
  onPageChange,
}: PaginationProps) {
  const progress =
    totalPages > 0
      ? (Math.min(Math.max(page, 1), totalPages) / totalPages) * 100
      : 0;

  return (
    <nav aria-label="Collection pages" className="mt-16">
      <div aria-hidden="true" className="h-px w-full bg-[var(--color-border)]">
        <div
          className="h-px bg-[var(--color-accent)] transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-4 pt-5">
        <button
          type="button"
          onClick={() => {
            onPageChange(Math.max(page - 1, 1));
          }}
          disabled={disabled || page <= 1}
          aria-label="Previous page"
          className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-primary)] transition-opacity disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-sm transition-colors duration-300 group-hover:border-[var(--color-text-primary)] group-hover:bg-[var(--color-text-primary)] group-hover:text-[var(--color-background)] motion-reduce:transition-none">
            <span aria-hidden="true">←</span>
          </span>
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div
          aria-live="polite"
          className="flex items-baseline gap-2 text-[var(--color-text-primary)]"
        >
          <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
            Page
          </span>
          <span className="font-display text-3xl leading-none">
            {formatPageNumber(page)}
          </span>
          <span className="text-[10px] tabular-nums tracking-[0.08em] text-[var(--color-text-secondary)]">
            / {formatPageNumber(totalPages)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            onPageChange(Math.min(page + 1, totalPages));
          }}
          disabled={disabled || page >= totalPages}
          aria-label="Next page"
          className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-primary)] transition-opacity disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-sm transition-colors duration-300 group-hover:border-[var(--color-text-primary)] group-hover:bg-[var(--color-text-primary)] group-hover:text-[var(--color-background)] motion-reduce:transition-none">
            <span aria-hidden="true">→</span>
          </span>
        </button>
      </div>
    </nav>
  );
}
