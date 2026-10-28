import Link from "next/link";

const focusRing =
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]";

const navigationLinkClassName = `inline-flex items-center py-1.5 text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)] sm:text-[10px] ${focusRing}`;

export default function JournalMasthead() {
	return (
		<header className="border-b border-[var(--color-border)]">
			<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
				<Link
					href="/search-and-autocomplete"
					aria-label="Northstar home"
					className={`inline-flex font-display text-[1.05rem] font-medium tracking-[0.22em] text-[var(--color-text-primary)] transition-opacity hover:opacity-65 ${focusRing}`}
				>
					NORTHSTAR
				</Link>

				<p className="hidden text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)] md:block md:flex-1 md:text-center">
					Engineering journal
				</p>

				<nav
					aria-label="Journal"
					className="flex w-full items-center justify-between gap-3 min-[480px]:w-auto min-[480px]:justify-end min-[480px]:gap-6"
				>
					<Link
						href="/search-and-autocomplete"
						className={navigationLinkClassName}
					>
						The cover
					</Link>
					<Link
						href="/search-and-autocomplete/playground"
						className={navigationLinkClassName}
					>
						The archive
					</Link>
					<span
						aria-current="page"
						className="inline-flex items-center py-1.5 text-[9px] uppercase tracking-[0.14em] text-[var(--color-accent)] sm:text-[10px]"
					>
						Journal
					</span>
				</nav>
			</div>

			<div className="grid grid-cols-1 gap-10 py-10 md:gap-12 md:py-14 lg:grid-cols-12 lg:gap-8 lg:py-20">
				<div className="lg:col-span-8">
					<p className="editorial-rise flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
						<span
							aria-hidden="true"
							className="h-1.5 w-1.5 bg-[var(--color-accent)]"
						/>
						Case study / No. 01
					</p>

					<h1
						id="journal-title"
						className="editorial-rise editorial-delay-1 mt-6 max-w-[11ch] font-display text-[clamp(3.6rem,8.2vw,9rem)] leading-[0.86] tracking-[-0.055em] text-[var(--color-text-primary)]"
					>
						The search,
						<span className="block italic">considered.</span>
					</h1>

					<p className="editorial-fade editorial-delay-2 mt-8 max-w-[52ch] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.6] text-[var(--color-text-secondary)]">
						A case study in making product discovery feel as considered as the
						objects it surfaces — through editorial composition, honest states,
						and careful asynchronous behaviour.
					</p>

					<div className="editorial-fade editorial-delay-3 mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--color-border)] pt-5 text-[9px] uppercase leading-5 tracking-[0.18em] text-[var(--color-text-secondary)]">
						<p>Product design</p>
						<p>Frontend engineering</p>
						<p>Next.js 16 / React 19</p>
						<p>Northstar / Edition 01</p>
					</div>
				</div>

				<aside
					aria-label="Project details"
					className="lg:col-span-4 lg:border-l lg:border-[var(--color-border)] lg:pl-8"
				>
					<p className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
						At a glance
					</p>

					<dl className="mt-5 border-t border-[var(--color-border)]">
						<div className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-[var(--color-border)] py-3.5">
							<dt className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
								Project
							</dt>
							<dd className="text-sm leading-5 text-[var(--color-text-primary)]">
								Search &amp; Autocomplete
							</dd>
						</div>

						<div className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-[var(--color-border)] py-3.5">
							<dt className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
								Role
							</dt>
							<dd className="text-sm leading-5 text-[var(--color-text-primary)]">
								Product direction, interface design, frontend
							</dd>
						</div>

						<div className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-[var(--color-border)] py-3.5">
							<dt className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
								Build
							</dt>
							<dd className="text-sm leading-5 text-[var(--color-text-primary)]">
								Next.js App Router, React, TypeScript, Tailwind CSS, Zod
							</dd>
						</div>

						<div className="grid grid-cols-[5.5rem_1fr] gap-4 py-3.5">
							<dt className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
								Data
							</dt>
							<dd className="text-sm leading-5 text-[var(--color-text-primary)]">
								DummyJSON — an external product API, not a Northstar backend
							</dd>
						</div>
					</dl>

					<div className="mt-7 flex flex-col items-start gap-4">
						<Link
							href="/search-and-autocomplete/playground"
							className={`group inline-flex items-center gap-2 border-b border-[var(--color-text-primary)] pb-1 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] ${focusRing}`}
						>
							Open the archive
							<span
								aria-hidden="true"
								className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
							>
								↗
							</span>
						</Link>

						<Link
							href="/search-and-autocomplete"
							className={`group inline-flex items-center gap-2 border-b border-[var(--color-border-strong)] pb-1 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] ${focusRing}`}
						>
							Back to the cover
							<span
								aria-hidden="true"
								className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
							>
								↗
							</span>
						</Link>
					</div>
				</aside>
			</div>
		</header>
	);
}
