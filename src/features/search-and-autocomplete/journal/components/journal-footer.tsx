import Link from "next/link";

const focusRing =
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-background)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-text-primary)]";

const footerLinkClassName = `inline-flex py-0.5 text-sm text-[var(--color-background)] transition-colors hover:text-white ${focusRing}`;

export default function JournalFooter() {
	return (
		<footer
			aria-labelledby="journal-footer-title"
			className="bg-[var(--color-text-primary)] text-[var(--color-background)]"
		>
			<div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
				<div className="grid grid-cols-1 border-b border-white/15 md:grid-cols-12">
					<div className="py-12 md:col-span-7 md:py-16 lg:py-20">
						<p className="flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-white/60">
							<span
								aria-hidden="true"
								className="h-1.5 w-1.5 bg-[var(--color-accent)]"
							/>
							End note
						</p>

						<h2
							id="journal-footer-title"
							className="mt-6 max-w-[10ch] font-display text-[clamp(3rem,6.4vw,6.5rem)] leading-[0.88] tracking-[-0.045em]"
						>
							The archive is
							<span className="block italic">open.</span>
						</h2>

						<p className="mt-7 max-w-[46ch] text-sm leading-6 text-white/70">
							Search by name or description, filter the index, and open an
							object. The journal is the story behind the interface; the archive
							is the interface itself.
						</p>

						<div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
							<Link
								href="/search-and-autocomplete/playground"
								className="group inline-flex items-center gap-2 border-b border-white/50 pb-1 text-[9px] uppercase tracking-[0.18em] text-[var(--color-background)] transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-background)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-text-primary)]"
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
								className="inline-flex items-center gap-2 border-b border-white/20 pb-1 text-[9px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-background)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-text-primary)]"
							>
								Back to the cover
							</Link>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-6 border-t border-white/15 py-8 md:col-span-5 md:border-l md:border-t-0 md:px-8 md:py-16 lg:px-10">
						<div>
							<p className="text-[9px] uppercase tracking-[0.2em] text-white/60">
								Read
							</p>

							<div className="mt-4 flex flex-col items-start gap-2">
								<Link
									href="/search-and-autocomplete"
									className={footerLinkClassName}
								>
									The cover
								</Link>
								<Link
									href="/search-and-autocomplete/playground"
									className={footerLinkClassName}
								>
									The archive
								</Link>
								<a
									href="#journal-title"
									className={footerLinkClassName}
								>
									Top of journal
								</a>
							</div>
						</div>

						<div>
							<p className="text-[9px] uppercase tracking-[0.2em] text-white/60">
								Connect
							</p>

							<div className="mt-4 flex flex-col items-start gap-2">
								<a
									href="mailto:ogbupaul545@gmail.com"
									className={footerLinkClassName}
								>
									Email
								</a>
								<a
									href="https://github.com/Xavviieerr"
									target="_blank"
									rel="noopener noreferrer"
									className={footerLinkClassName}
								>
									GitHub
								</a>
								<a
									href="https://www.linkedin.com/in/chidera-paul-ogbu"
									target="_blank"
									rel="noopener noreferrer"
									className={footerLinkClassName}
								>
									LinkedIn
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2 border-b border-white/15 py-5 text-[9px] uppercase tracking-[0.16em] text-white/60 md:flex-row md:items-center md:justify-between">
					<p>Engineering journal / Edition 01</p>
					<p>
						Written and built by{" "}
						<span className="text-[var(--color-background)]">C. P. Ogbu</span>
					</p>
					<p>© 2026 Northstar</p>
				</div>

				<div className="py-10 md:py-14">
					<p className="sr-only">Northstar</p>
					<p
						aria-hidden="true"
						className="overflow-hidden text-center font-display text-[clamp(3.2rem,14vw,14rem)] font-medium leading-[0.75] tracking-[-0.07em] whitespace-nowrap"
					>
						NORTHSTAR
					</p>
				</div>
			</div>
		</footer>
	);
}
