import { journalSections } from "../journal-content";

const focusRing =
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]";

export default function TableOfContents() {
	return (
		<aside className="lg:col-span-3">
			<nav
				aria-label="Journal contents"
				className="border-y border-[var(--color-border)] py-6 lg:sticky lg:top-8 lg:border-t-0 lg:pt-0"
			>
				<div className="flex items-baseline justify-between gap-4">
					<p className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
						Contents
					</p>
					<p className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
						07 sections
					</p>
				</div>

				<ol className="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-1">
					{journalSections.map((section) => (
						<li key={section.id}>
							<a
								href={`#${section.id}`}
								className={`group flex items-baseline gap-3 border-b border-[var(--color-border)] py-2.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] ${focusRing}`}
							>
								<span className="w-5 shrink-0 text-[9px] tracking-[0.16em] text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-accent)]">
									{section.number}
								</span>
								<span>{section.label}</span>
							</a>
						</li>
					))}
				</ol>

				<p className="mt-6 max-w-[28ch] text-[11px] leading-5 text-[var(--color-text-secondary)]">
					Notes on the product problem, the visual argument, and the browser
					behaviour beneath the archive.
				</p>
			</nav>
		</aside>
	);
}
