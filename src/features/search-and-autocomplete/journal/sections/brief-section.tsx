import {
	Copy,
	InlineCode,
	PullQuote,
	Section,
	Subsection,
} from "../components/journal-primitives";

const journey = [
	["01", "Arrive"],
	["02", "Describe"],
	["03", "Refine"],
	["04", "Inspect"],
	["05", "Return"],
];

const requirements = [
	"Partial language should produce useful results, not an exact-match dead end.",
	"The collection should be browsable before a query, with a clear route back.",
	"Suggestions and keyboard selection should make the field feel fast without hiding the result set.",
	"Query, category, and page should survive a refresh, a shared link, and browser Back.",
	"Loading, empty, error, and out-of-range states should preserve context instead of erasing it.",
	"Product details should feel like part of the archive, not a modal bolted onto it.",
];

export default function BriefSection() {
	return (
		<Section
			id="brief"
			number="01"
			label="The brief"
			title={
				<>
					A shopper with an
					<span className="italic"> incomplete name.</span>
				</>
			}
			intro="The requirement was not “add autocomplete.” It was to make the archive answer a half-formed question without asking the shopper to translate it into catalogue language."
		>
			<Copy>
				<p>
					The target user is browsing, not searching for a known SKU. They might
					type <InlineCode>loafer</InlineCode>,{" "}
					<InlineCode>black heels</InlineCode>,{" "}
					<InlineCode>leather boot</InlineCode>, or simply{" "}
					<InlineCode>ankle b</InlineCode>. The interaction has to survive
					spelling, ambiguity, and the moment before the right word arrives.
				</p>

				<p>
					That makes the search field more than an input. It is the point where an
					editorial brand either feels attentive or feels like a generic
					storefront. A slow or opaque response does not just cost a click. It
					breaks the promise that the archive is considered.
				</p>
			</Copy>

			<Subsection title="The journey I designed for">
				<p>
					Arrive at the archive, describe an object, scan a small edit, narrow it
					if necessary, open one object, and return without losing the thread. A
					shopper can also skip the query entirely: the collection is a complete
					archive in catalogue order before any search happens.
				</p>

				<ol className="mt-5 grid gap-3 sm:grid-cols-5">
					{journey.map(([number, label]) => (
						<li
							key={number}
							className="border-t border-[var(--color-border-strong)] pt-3"
						>
							<p className="text-[9px] tracking-[0.16em] text-[var(--color-accent)]">
								{number}
							</p>
							<p className="mt-1 text-sm text-[var(--color-text-primary)]">
								{label}
							</p>
						</li>
					))}
				</ol>
			</Subsection>

			<Subsection title="What had to be true">
				<ul className="space-y-3">
					{requirements.map((item) => (
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

			<Subsection title="What this exercise is not">
				<p>
					I did not run usability research, measure conversion, or test with a
					recruitment panel. The design decisions that follow are design
					arguments, not validated findings. The API is public demo data, not a
					Northstar backend. Those limits are part of the case study, not
					something the interface should pretend away.
				</p>
			</Subsection>

			<PullQuote attribution="The product problem, in one line">
				The archive should feel edited; the search should feel immediate; the
				state should never leave the shopper guessing.
			</PullQuote>
		</Section>
	);
}
