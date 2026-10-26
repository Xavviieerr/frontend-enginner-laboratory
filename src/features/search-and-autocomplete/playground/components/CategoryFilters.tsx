import { useEffect, useRef } from "react";
import type { CategoriesStatus } from "../hooks/useProductCategories";
import { formatCategoryLabel } from "../utils/formatProduct";

type CategoryFiltersProps = {
  categories: string[];
  status: CategoriesStatus;
  error: string | null;
  selected: string;
  onChange: (category: string) => void;
};

const CATEGORY_PRIORITY = ["mens-shoes", "womens-shoes"];
const SKELETON_WIDTHS = ["w-16", "w-24", "w-20", "w-28", "w-24", "w-20"];

function sortCategories(categories: string[]): string[] {
  return [...categories].sort((first, second) => {
    const firstPriority = CATEGORY_PRIORITY.indexOf(first);
    const secondPriority = CATEGORY_PRIORITY.indexOf(second);

    if (firstPriority !== -1 || secondPriority !== -1) {
      const firstRank =
        firstPriority === -1 ? CATEGORY_PRIORITY.length + 1 : firstPriority;
      const secondRank =
        secondPriority === -1 ? CATEGORY_PRIORITY.length + 1 : secondPriority;

      return firstRank - secondRank;
    }

    return first.localeCompare(second);
  });
}

function pillClassName(isSelected: boolean): string {
  const baseClassName =
    "shrink-0 rounded-full border px-4 py-2 text-[9px] font-medium uppercase tracking-[0.16em] transition-[color,background-color,border-color,transform] duration-300 hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";

  return isSelected
    ? `${baseClassName} border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-foreground)]`
    : `${baseClassName} border-[var(--color-border)] bg-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]`;
}

export default function CategoryFilters({
  categories,
  status,
  error,
  selected,
  onChange,
}: CategoryFiltersProps) {
  const selectedRef = useRef<HTMLButtonElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const orderedCategories = sortCategories(categories);
  const visibleCategories =
    selected && !orderedCategories.includes(selected)
      ? [selected, ...orderedCategories]
      : orderedCategories;

  useEffect(() => {
    const group = groupRef.current;
    const selectedButton = selectedRef.current;

    if (!group || !selectedButton) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const groupRect = group.getBoundingClientRect();
    const buttonRect = selectedButton.getBoundingClientRect();
    const centeredLeft =
      group.scrollLeft +
      (buttonRect.left - groupRect.left) -
      (group.clientWidth - buttonRect.width) / 2;

    group.scrollTo({
      left: selected ? Math.max(centeredLeft, 0) : 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [selected, categories.length]);

  return (
    <div className="mt-7 border-t border-[var(--color-border)] pt-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
          Filter the index
        </p>

        {selected ? (
          <button
            type="button"
            onClick={() => {
              onChange("");
            }}
            className="flex min-h-6 items-center rounded-sm text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)] underline decoration-[var(--color-border-strong)] underline-offset-4 transition-colors duration-300 hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] motion-reduce:transition-none"
          >
            Clear filter
          </button>
        ) : (
          <p className="hidden text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)] md:block">
            Scroll to explore
          </p>
        )}
      </div>

      {status === "error" && (
        <p
          role="alert"
          title={error ?? undefined}
          className="mb-4 max-w-xl text-xs leading-5 text-[var(--color-accent)]"
        >
          Category filters are unavailable right now. Search across the archive
          is still available.
        </p>
      )}

      <div className="relative -mx-4 md:mx-0">
        <div
          ref={groupRef}
          role="group"
          aria-label="Filter by category"
          aria-busy={status === "loading"}
          className="flex gap-2 overflow-x-auto pl-4 pr-14 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:pl-0"
        >
          <button
            type="button"
            onClick={() => {
              onChange("");
            }}
            aria-pressed={selected === ""}
            ref={selected === "" ? selectedRef : undefined}
            className={pillClassName(selected === "")}
          >
            All objects
          </button>

          {status === "loading" &&
            SKELETON_WIDTHS.map((width, index) => (
              <span
                key={`category-skeleton-${index}`}
                aria-hidden="true"
                className={`h-8 shrink-0 animate-pulse rounded-full bg-[var(--color-surface)] motion-reduce:animate-none ${width}`}
              />
            ))}

          {visibleCategories.map((categoryOption) => {
            const isSelected = categoryOption === selected;

            return (
              <button
                key={categoryOption}
                type="button"
                onClick={() => {
                  onChange(categoryOption);
                }}
                aria-pressed={isSelected}
                ref={isSelected ? selectedRef : undefined}
                className={pillClassName(isSelected)}
              >
                {formatCategoryLabel(categoryOption)}
              </button>
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-[var(--color-background)] to-transparent"
        />
      </div>
    </div>
  );
}
