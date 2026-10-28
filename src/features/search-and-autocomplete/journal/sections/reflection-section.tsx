import Link from "next/link";

import {
	Copy,
	PullQuote,
	Section,
	Subsection,
	focusRing,
	smallLabel,
} from "../components/journal-primitives";

const nextSteps = [
	"Move search and category filtering behind a server endpoint that supports query, category, pagination, and a stable total in one contract.",
	"Replace the local category fetch with server-side faceting and cursor pagination, so the page does not download the whole category.",
	"Add a dedicated suggestion endpoint with its own ranking, debounce budget, and empty state; do not derive the index from one page of results.",
	"Use an established query client or a small in-flight request map for deduplication, cancellation, retries, and cache invalidation.",
	"Put the public API behind a server route for credentials, rate limiting, response validation, and error diagnostics.",
	"Add component, hook, cache, and end-to-end tests, plus an accessibility and performance check in CI.",
	"Represent the open product in the URL so a detail view can be shared and restored.",
];

export default function ReflectionSection() {
	return (
		<Section
			id="reflection"
			number="07"
			label="Reflection"
			title={
				<>
					What the work
					<span className="italic"> changed.</span>
				</>
			}
			intro="The most useful lesson was not a pattern or an API. It was that visual judgment and technical correctness meet in the same place: the moment the interface has to tell the truth."
		>
			<Copy>
				<p>
					I came into this project thinking about the interface as a composition.
					I left thinking about it as a set of promises. The spacing, type, and
					image rhythm make the archive feel considered, but the experience only
					earns that feeling if the search answers, the empty state explains, the
					error state recovers, and Back returns the shopper to the same place.
				</p>

				<p>
					The visual work taught me that hierarchy is mostly restraint. The search
					line is large because search is the task; the burgundy is small because
					emphasis loses meaning when everything is emphasized; the product grid
					is short because a page of five objects can be read as an edit rather
					than a feed. Those are design decisions with costs — more pagination,
					more whitespace, less inventory per screen — and the costs are part of
					the argument.
				</p>

				<p>
					The engineering work taught me that asynchronous UI is mostly about what
					not to show. A stale response is worse than a slow one. A blank skeleton
					can erase context. A URL that says one thing while the grid says another
					breaks trust. Debouncing, aborting, deriving states, and synchronizing
					history are not implementation trivia; they are the interaction.
				</p>
			</Copy>

			<div className="mt-8 grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
				<div className="bg-[var(--color-background)] p-5">
					<p className={smallLabel}>What broke, and why</p>
					<p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
						The category endpoint&apos;s ignored query parameter forced the local
						filtering path. The first overlapping-request test made the need for
						cancellation visible. The Suspense requirement surfaced the
						difference between a page that builds and a page that paints well.
					</p>
				</div>

				<div className="bg-[var(--color-background)] p-5">
					<p className={smallLabel}>What I would carry forward</p>
					<p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
						Treat URL state and request state as separate contracts. Design the
						failure and recovery states at the same time as the success state.
						Make the smallest cache that solves the observed problem, then name
						its limits.
					</p>
				</div>
			</div>

			<Subsection title="If the catalogue grew">
				<ul className="space-y-3">
					{nextSteps.map((item) => (
						<li key={item} className="flex gap-3">
							<span
								aria-hidden="true"
								className="mt-2 h-1 w-1 shrink-0 bg-[var(--color-accent)]"
							/>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</Subsection>

			<PullQuote attribution="The lesson I want to keep">
				A polished interface is not the absence of loading. It is the presence of
				a clear answer at every moment, including the ones that are not the answer
				the shopper wanted.
			</PullQuote>

			<div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--color-border)] pt-6">
				<Link
					href="/search-and-autocomplete/playground"
					className={`group inline-flex items-center gap-2 border-b border-[var(--color-text-primary)] pb-1 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] ${focusRing}`}
				>
					Enter the archive
					<span
						aria-hidden="true"
						className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
					>
						↗
					</span>
				</Link>

				<Link
					href="/search-and-autocomplete"
					className={`inline-flex items-center gap-2 border-b border-[var(--color-border-strong)] pb-1 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] ${focusRing}`}
				>
					Back to the cover
				</Link>
			</div>
		</Section>
	);
}
