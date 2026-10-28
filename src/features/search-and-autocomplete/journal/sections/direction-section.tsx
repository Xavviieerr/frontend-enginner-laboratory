import {
	Copy,
	InlineCode,
	Section,
	Subsection,
} from "../components/journal-primitives";
import { comparisonRows, designTokens } from "../journal-content";

export default function DirectionSection() {
	return (
		<Section
			id="direction"
			number="02"
			label="The direction"
			title={
				<>
					An archive,
					<span className="italic"> not a dashboard.</span>
				</>
			}
			intro="The visual direction is fashion editorial: warm paper, near-black type, generous margins, and one restrained burgundy signal. The goal was to frame many different objects without competing with them."
		>
			<Copy>
				<p>
					A conventional marketplace would put a compact search bar above a
					four-column grid and pack the page with badges. That can be efficient,
					but it works against the brand character here. Northstar should feel
					like a place with a point of view — a small, deliberate edit rather than
					an inventory dump.
				</p>

				<p>
					The composition uses a twelve-column grid, a maximum width of 1600px,
					and a small number of strong rules. The rule lines do the structural
					work that cards and shadows usually do. The result is dense enough to
					scan, but quiet enough for photography to lead.
				</p>
			</Copy>

			<Subsection title="Type: contrast without noise">
				<p>
					Bodoni Moda carries the display voice: high contrast, fashion-house
					associations, and enough personality to make a heading feel like a
					cover. Inter carries the functional voice: labels, product metadata,
					counts, and longer copy. The split is intentional. Expressive type is
					reserved for expression; the interface does not make the shopper read a
					serif paragraph to find a price.
				</p>

				<div className="mt-6 grid gap-px border-y border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-[1.2fr_1fr]">
					<div className="bg-[var(--color-background)] py-6 pr-6">
						<p className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
							Display / Bodoni Moda
						</p>
						<p className="mt-4 font-display text-[clamp(2.8rem,5.3vw,4.8rem)] leading-[0.88] tracking-[-0.045em]">
							Considered.
						</p>
						<p className="mt-4 text-xs leading-5 text-[var(--color-text-secondary)]">
							Used for the page title, section headings, the search line, and
							product names. It gives the archive its editorial register.
						</p>
					</div>

					<div className="bg-[var(--color-background)] p-6">
						<p className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
							Body / Inter
						</p>
						<p className="mt-4 text-sm leading-7 text-[var(--color-text-primary)]">
							A short description reads at 15–16px with generous line height.
							Small labels are tracked and uppercase so they act as index marks,
							not as competing headlines.
						</p>
						<p className="mt-4 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
							The archive / Edition 01
						</p>
					</div>
				</div>
			</Subsection>

			<Subsection title="Palette: a frame for the objects">
				<p>
					The palette is deliberately narrow. A warm off-white reduces the
					clinical feel of pure white and gives product photography a paper-like
					field. Near-black carries authority without the harshness of{" "}
					<InlineCode>#000</InlineCode>. The muted secondary grey is for
					annotation, and the burgundy is saved for a small number of active
					signals: the selected filter, focus, a live dot, and the final call to
					action.
				</p>

				<div className="mt-6 border border-[var(--color-border)]">
					<div className="grid grid-cols-1 sm:grid-cols-2">
						{designTokens.map((token) => (
							<div
								key={token.name}
								className="border-b border-[var(--color-border)] p-4 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0"
							>
								<div
									aria-hidden="true"
									className="h-12 w-full border border-black/5"
									style={{ backgroundColor: token.value }}
								/>
								<div className="mt-3 flex items-baseline justify-between gap-3">
									<p className="text-xs font-medium text-[var(--color-text-primary)]">
										{token.name}
									</p>
									<code className="text-[10px] text-[var(--color-text-secondary)]">
										{token.value}
									</code>
								</div>
								<p className="mt-1.5 text-[11px] leading-5 text-[var(--color-text-secondary)]">
									{token.role}
								</p>
							</div>
						))}
					</div>
				</div>
			</Subsection>

			<Subsection title="The search line as a masthead">
				<p>
					The search input is set in Bodoni at up to{" "}
					<InlineCode>3.2rem</InlineCode> and sits directly on a thin baseline
					rather than inside a boxed field. That gives it the visual weight of a
					masthead and makes the act of describing an object feel like part of the
					editorial experience. A tiny live-index dot and a clear action provide
					the functional cues without turning the line into a toolbar.
				</p>

				<p>
					The suggestion panel follows the same logic. It is an index of possible
					objects, not a browser-native dropdown: a small header, a numbered
					list, and a burgundy highlight. On small screens it opens above the
					field so the keyboard and viewport do not cover it; from the medium
					breakpoint upward it opens below.
				</p>
			</Subsection>

			<Subsection title="The edit, the filter, the object">
				<p>
					Results are composed as a small editorial grid: one column on mobile,
					two on tablet, four on desktop, with five objects per page. Each card
					uses a 4:5 image bed, a numbered eyebrow, a category label, a price, and
					a title. The card itself has no heavy chrome. Hover and focus change
					the image bed and reveal a quiet action, so the grid stays calm until
					the shopper engages with it.
				</p>

				<p>
					The category rail sits above the collection as a horizontally
					scrollable index, not a sidebar. This keeps the page focused on the
					objects and lets the filter behave like part of the archive header. The
					selected category is scrolled into view after a change, with
					reduced-motion respected.
				</p>
			</Subsection>

			<Subsection title="The product dialog">
				<p>
					The detail view is a native <InlineCode>&lt;dialog&gt;</InlineCode>{" "}
					with a split composition: image on the left, object information on the
					right. The browser supplies modal semantics, focus containment, Escape
					handling, and an inert background. The implementation adds the
					editorial layout, the thumbnail gallery, the focus restoration, and the
					scroll lock. On mobile the same dialog becomes a full-height sheet.
				</p>

				<p>
					I chose a dialog over a dedicated route because the task is comparison:
					the shopper should be able to inspect an object and return to the same
					edit without losing filters or page context. The trade-off is real —
					product state is not linkable — and I would revisit that if shareable
					product URLs became a requirement.
				</p>
			</Subsection>

			<Subsection title="What I rejected">
				<div className="border-y border-[var(--color-border)]">
					{comparisonRows.map((row) => (
						<div
							key={row.choice}
							className="grid gap-2 border-b border-[var(--color-border)] py-4 last:border-b-0 sm:grid-cols-[0.95fr_0.95fr_1.4fr] sm:gap-5"
						>
							<div>
								<p className="text-[8px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
									Chosen
								</p>
								<p className="mt-1 text-sm leading-6 text-[var(--color-text-primary)]">
									{row.choice}
								</p>
							</div>
							<div>
								<p className="text-[8px] uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
									Instead of
								</p>
								<p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
									{row.rejected}
								</p>
							</div>
							<div>
								<p className="text-[8px] uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
									Because
								</p>
								<p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
									{row.reason}
								</p>
							</div>
						</div>
					))}
				</div>
			</Subsection>
		</Section>
	);
}
