import Link from "next/link";

export default function EditorialHeader() {
  return (
    <header>
      <div className="flex items-center justify-between gap-6 border-b border-[var(--color-border)] py-4">
        <Link
          href="/search-and-autocomplete"
          className="font-display text-[1.05rem] font-medium tracking-[0.22em] text-[var(--color-text-primary)] transition-opacity hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]"
        >
          NORTHSTAR
        </Link>

        <p className="hidden text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)] sm:block">
          The search archive
        </p>

        <p className="text-right text-[9px] uppercase leading-5 tracking-[0.2em] text-[var(--color-text-secondary)]">
          Edition 01
          <span className="mx-2 text-[var(--color-border-strong)]">/</span>
          A/W 2026
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 border-b border-[var(--color-border)] pb-10 pt-10 md:grid-cols-12 md:items-end md:gap-8 md:pb-12 md:pt-14">
        <div className="md:col-span-8">
          <p className="editorial-rise flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 bg-[var(--color-accent)]"
            />
            A private index of form and function
          </p>

          <h1 className="editorial-rise editorial-delay-1 mt-6 font-display text-[clamp(2.6rem,9vw,8.75rem)] leading-[0.82] tracking-[-0.055em] text-[var(--color-text-primary)]">
            <span className="block">Discover</span>
            <span className="block italic text-[var(--color-accent)]">
              the considered.
            </span>
          </h1>
        </div>

        <aside className="editorial-fade editorial-delay-2 mt-2 border-t border-[var(--color-border)] pt-5 md:col-span-4 md:mt-0 md:flex md:flex-col md:justify-end md:border-l md:border-t-0 md:pl-6 md:pt-0 lg:pl-10">
          <div className="md:max-w-[22rem]">
            <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
              An editorial archive
            </p>

            <p className="mt-4 max-w-[30ch] text-[13px] leading-6 text-[var(--color-text-secondary)]">
              Objects selected for their form, material and quiet utility.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--color-border)] pt-4 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              <span>Edition No. 01</span>
              <span>A/W 2026</span>
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-[var(--color-accent)]"
                />
                Live archive
              </span>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
