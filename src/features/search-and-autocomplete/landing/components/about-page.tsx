import Link from "next/link";

const features = [
	{
		number: "01",
		title: "Instant autocomplete",
		description:
			"Relevant suggestions surface as you type, making search feel immediate and effortless.",
	},
	{
		number: "02",
		title: "Debounced requests",
		description:
			"Controlled, cancellable queries keep the interface responsive without unnecessary network activity.",
	},
	{
		number: "03",
		title: "Keyboard-first",
		description:
			"Move through suggestions, open results, and dismiss the experience without leaving the keyboard.",
	},
];

export default function AboutPage() {
	return (
		<section
			id="about"
			aria-labelledby="about-title"
			className="border-t border-[var(--color-border)] py-12 md:py-16"
		>
			<div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
				<header className="md:col-span-4">
					<p className="flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
						<span
							aria-hidden="true"
							className="h-1.5 w-1.5 bg-[var(--color-accent)]"
						/>
						Inside the archive
					</p>

					<h2
						id="about-title"
						className="mt-6 font-display text-[clamp(2.5rem,4.4vw,4.5rem)] leading-[0.88] tracking-[-0.045em]"
					>
						Search,
						<span className="block italic text-[var(--color-accent)]">
							considered.
						</span>
					</h2>

					<p className="mt-5 max-w-[30ch] text-[13px] leading-6 text-[var(--color-text-secondary)]">
						Three quiet mechanics shape the archive: immediate suggestions,
						deliberate requests, and a path that never leaves the keyboard.
					</p>

					<Link
						href="/search-and-autocomplete/playground"
						className="mt-7 inline-flex min-h-6 items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-primary)] underline decoration-[var(--color-border-strong)] underline-offset-4 transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]"
					>
						Try the search
						<span aria-hidden="true">→</span>
					</Link>
				</header>

				<div className="md:col-span-8 md:border-l md:border-[var(--color-border)] md:pl-8 lg:pl-10">
					<div className="border-y border-[var(--color-border)]">
						{features.map((feature) => (
							<article
								key={feature.number}
								className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-b border-[var(--color-border)] py-6 last:border-b-0 md:py-8 lg:grid-cols-[3rem_minmax(0,1fr)_1.15fr] lg:gap-x-6 lg:py-10"
							>
								<span className="font-display text-2xl leading-none text-[var(--color-text-secondary)] lg:text-3xl">
									{feature.number}
								</span>

								<h3 className="font-display text-[clamp(1.7rem,2.4vw,2.4rem)] leading-[1] tracking-[-0.03em]">
									{feature.title}
								</h3>

								<p className="col-start-2 row-start-2 max-w-[34ch] text-[13px] leading-6 text-[var(--color-text-secondary)] lg:col-start-3 lg:row-start-1">
									{feature.description}
								</p>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
