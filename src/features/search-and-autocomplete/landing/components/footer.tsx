import Image from "next/image";
import Link from "next/link";

import BrownHeels from "@/features/search-and-autocomplete/assets/image/brown-heels.jpg";

const footerFocusRing =
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-background)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-text-primary)]";

const footerLinkClassName = `inline-flex py-0.5 text-sm text-[var(--color-background)] transition-colors hover:text-white ${footerFocusRing}`;

export default function Footer() {
	return (
		<footer
			id="contact"
			aria-labelledby="contact-title"
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
							Contact
						</p>

						<h2
							id="contact-title"
							className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,6.4vw,6.5rem)] leading-[0.88] tracking-[-0.045em]"
						>
							Let&apos;s make something
							<span className="block italic">considered.</span>
						</h2>

						<a
							href="mailto:ogbupaul545@gmail.com"
							className={`mt-8 inline-block py-1 text-sm underline decoration-white/25 underline-offset-8 transition-colors hover:text-white ${footerFocusRing}`}
						>
							ogbupaul545@gmail.com
						</a>
					</div>

					<div className="grid grid-cols-2 gap-6 border-t border-white/15 py-8 md:col-span-5 md:border-l md:border-t-0 md:px-8 md:py-16 lg:px-10">
						<div>
							<p className="text-[9px] uppercase tracking-[0.2em] text-white/60">
								Navigate
							</p>

							<nav
								aria-label="Footer"
								className="mt-4 flex flex-col items-start gap-2"
							>
								<Link
									href="/search-and-autocomplete/playground"
									className={footerLinkClassName}
								>
									The archive
								</Link>
								<a href="#about" className={footerLinkClassName}>
									About
								</a>
								<a href="#contact" className={footerLinkClassName}>
									Contact
								</a>
							</nav>
						</div>

						<div>
							<p className="text-[9px] uppercase tracking-[0.2em] text-white/60">
								Connect
							</p>

							<div className="mt-4 flex flex-col items-start gap-2">
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
					<p>Edition 01 / A/W 2026</p>
					<p>
						Designed and developed by{" "}
						<span className="text-[var(--color-background)]">c.p.ogbu</span>
					</p>
					<p>© 2026 Northstar</p>
				</div>

				<div className="py-10 md:py-14">
					<p className="sr-only">Northstar</p>

					<div
						aria-hidden="true"
						className="flex items-center justify-center gap-1 overflow-hidden md:gap-4"
					>
						<span className="font-display text-[clamp(2.4rem,13vw,13.5rem)] font-medium leading-[0.75] tracking-[-0.07em] whitespace-nowrap">
							NORTH
						</span>

						<span className="relative h-[clamp(2.5rem,10vw,9rem)] w-[clamp(2rem,8vw,7rem)] shrink-0 overflow-hidden bg-[var(--color-surface)]">
							<Image
								src={BrownHeels}
								alt=""
								fill
								sizes="(min-width: 768px) 8vw, 10vw"
								className="object-cover"
							/>
						</span>

						<span className="font-display text-[clamp(2.4rem,13vw,13.5rem)] font-medium leading-[0.75] tracking-[-0.07em] whitespace-nowrap">
							STAR
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
