import {
	Copy,
	InlineCode,
	Section,
	Subsection,
} from "../components/journal-primitives";

const journey = [
	{
		step: "01",
		title: "Arrive",
		body: "The complete archive loads in catalogue order. No query is required; the shopper can browse immediately.",
	},
	{
		step: "02",
		title: "Describe",
		body: "The query is controlled by the page state. The URL is replaced rather than pushed, so a sentence does not create one history entry per keystroke. The live dot changes to Searching while the request is pending.",
	},
	{
		step: "03",
		title: "Choose",
		body: "Suggestions are derived from matching titles on the current result page. Arrow keys move the active descendant; Enter selects; Escape closes. There is no hidden exact-match requirement for the main search.",
	},
	{
		step: "04",
		title: "Refine",
		body: "Category and page changes push a history entry. Filters reset the page to 01. The category rail, context line, and count keep the shopper oriented.",
	},
	{
		step: "05",
		title: "Inspect",
		body: "A product opens in a native dialog. Focus moves to Close; Escape or the backdrop dismisses; focus returns to the launching card. The grid, filters, and page stay underneath.",
	},
];

const states = [
	{
		state: "Initial loading",
		ui: "Five skeleton cards; “Searching the archive”; aria-busy on the collection.",
	},
	{
		state: "Refreshing",
		ui: "Existing cards remain; a thin burgundy line and “Updating the archive”; pagination disabled.",
	},
	{
		state: "No suggestions",
		ui: "The panel is absent. The input and live result set remain; there is no separate empty-suggestions message.",
	},
	{
		state: "No results",
		ui: "“Nothing in this edit”, with the query and/or category echoed back and a clear action.",
	},
	{
		state: "Request error",
		ui: "“The archive is momentarily unavailable”, Try again, and Clear search and filters.",
	},
	{
		state: "Out-of-range page",
		ui: "The actual page count and a Return to page 01 action, rather than an empty grid.",
	},
	{
		state: "Category failure",
		ui: "The rail explains that filters are unavailable; search over the archive still works.",
	},
];

const focusNotes = [
	"The input exposes combobox semantics: aria-expanded, aria-controls, aria-activedescendant, and a listbox of options. Options are not separate tab stops; focus stays in the field.",
	"The dialog uses showModal(), moves focus to Close, restores the previous trigger on close, and falls back to the search input if that trigger is gone.",
	"All interactive elements use a visible focus ring against the off-white field. The skip link moves directly to the collection.",
	"Motion is limited to short editorial entrances, hover transitions, the loading pulse, and the dialog entrance. The reduced-motion media query removes those animations and disables smooth scrolling.",
];

export default function InteractionSection() {
	return (
		<Section
			id="interaction"
			number="03"
			label="The interaction"
			title={
				<>
					The state is
					<span className="italic"> the interface.</span>
				</>
			}
			intro="A search experience is not a result list with a spinner attached. Every state — waiting, empty, stale, out of range — is a moment where the interface either keeps its promise or loses the shopper."
		>
			<Copy>
				<p>
					The interaction is deliberately live. There is no separate submit
					button. Typing updates the controlled input immediately, the URL
					settles with the query, and the request waits for a{" "}
					<InlineCode>500ms</InlineCode> pause. Suggestions can then be selected
					with a click, or with ArrowDown/ArrowUp and Enter. Escape closes the
					suggestion panel.
				</p>
			</Copy>

			<div className="mt-8 border-y border-[var(--color-border)]">
				{journey.map((item) => (
					<div
						key={item.step}
						className="grid gap-2 border-b border-[var(--color-border)] py-5 last:border-b-0 sm:grid-cols-[3.5rem_1fr] sm:gap-5"
					>
						<p className="text-[9px] tracking-[0.18em] text-[var(--color-accent)]">
							{item.step}
						</p>
						<div>
							<p className="font-display text-xl tracking-[-0.02em] text-[var(--color-text-primary)]">
								{item.title}
							</p>
							<p className="mt-1.5 max-w-[62ch] text-sm leading-6 text-[var(--color-text-secondary)]">
								{item.body}
							</p>
						</div>
					</div>
				))}
			</div>

			<Subsection title="The suggestion panel is intentionally bounded">
				<p>
					Autocomplete here is not a separate catalogue-wide index. The panel
					derives up to six unique titles from the products already loaded for
					the current query and page, then filters those titles against the
					normalized query. That keeps the suggestions honest to the visible
					result set, but it means a query can return useful products without
					producing any suggestions. If the current page has no matching title,
					the panel simply does not open.
				</p>

				<p>
					I kept this behaviour rather than inventing a suggestion service or a
					hard-coded term list. It is the real shape of the implementation, and
					the limitation belongs in the case study. A production catalogue would
					want a dedicated suggestion index with its own ranking and latency
					budget.
				</p>
			</Subsection>

			<Subsection title="States, not fallbacks">
				<div className="space-y-0 border-y border-[var(--color-border)]">
					{states.map((row) => (
						<div
							key={row.state}
							className="grid gap-1.5 border-b border-[var(--color-border)] py-4 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-5"
						>
							<p className="text-[9px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
								{row.state}
							</p>
							<p className="text-sm leading-6 text-[var(--color-text-secondary)]">
								{row.ui}
							</p>
						</div>
					))}
				</div>
			</Subsection>

			<Subsection title="Focus, keyboard, and dismissal">
				<ul className="space-y-3">
					{focusNotes.map((item) => (
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

			<Subsection title="Responsive behaviour">
				<p>
					The collection moves from one column to two at{" "}
					<InlineCode>sm</InlineCode> and four at <InlineCode>lg</InlineCode>. The
					search line stays large but not fixed; the category rail becomes a
					horizontal scroll with a soft edge; the suggestion panel flips above
					the field below <InlineCode>md</InlineCode>; the dialog becomes a
					full-height sheet on small screens and a two-column composition on
					desktop. The typography and rules carry the hierarchy at every width,
					so nothing depends on a hover state to be usable.
				</p>
			</Subsection>
		</Section>
	);
}
