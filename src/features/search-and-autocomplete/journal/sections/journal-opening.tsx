import { bodyCopy, smallLabel } from "../components/journal-primitives";

const briefCards = [
	{
		label: "The user",
		body: "Knows roughly what they want. May search “ankle b” before they can name the boot.",
	},
	{
		label: "The goal",
		body: "Make description a viable route through the archive, without losing the shopper in state or noise.",
	},
	{
		label: "The constraint",
		body: "A public demo API, five results per page, and no new dependencies or production backend.",
	},
];

export default function JournalOpening() {
	return (
		<div className="max-w-[68ch]">
			<p className="font-display text-[clamp(1.65rem,3.1vw,2.7rem)] leading-[1.15] tracking-[-0.025em] text-[var(--color-text-primary)]">
				A shopper can describe a thing long before they know its name.
			</p>

			<div className={`${bodyCopy} mt-7 max-w-[64ch] space-y-5`}>
				<p>
					Northstar is a luxury footwear concept: an editorial archive rather
					than an endless product feed. The search exercise began with a simple
					observation. People arrive with fragments — a silhouette, a material,
					an occasion, a colour — not necessarily a product title.
				</p>

				<p>
					The work was to make the archive answer those fragments quickly and
					legibly, while keeping the composure of the brand. The API behind this
					version is DummyJSON, an external data source. It is not Northstar’s
					production catalogue, and the interface is honest about that boundary.
				</p>
			</div>

			<div className="mt-8 grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-3">
				{briefCards.map((card) => (
					<div
						key={card.label}
						className="bg-[var(--color-background)] p-5"
					>
						<p className={smallLabel}>{card.label}</p>
						<p className="mt-3 text-sm leading-6 text-[var(--color-text-primary)]">
							{card.body}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
