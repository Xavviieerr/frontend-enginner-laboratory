import Link from "next/link";

import Brooks from "@/features/search-and-autocomplete/assets/image/brooks.jpg";
import BrownHeels from "@/features/search-and-autocomplete/assets/image/brown-heels.jpg";
import SaintLauret from "@/features/search-and-autocomplete/assets/image/saint-lauret.jpg";
import WhiteHeels from "@/features/search-and-autocomplete/assets/image/white-heels.jpg";

import HeroImage from "./hero-image";
import Logo from "./logo";

const focusRing =
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]";

const navigationLinkClassName = `inline-flex items-center py-1.5 text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)] sm:text-[10px] ${focusRing}`;

const heroImages = [
	{
		src: Brooks,
		alt: "Brown leather brogues resting on a wooden surface",
		offset: "",
	},
	{
		src: WhiteHeels,
		alt: "White pointed-toe heels worn against a garden backdrop",
		offset: "md:mt-8",
	},
	{
		src: SaintLauret,
		alt: "White Saint Laurent high-top leather sneakers",
		offset: "md:mt-3",
	},
	{
		src: BrownHeels,
		alt: "Black satin heels with crystal detailing on a burgundy carpet",
		offset: "md:mt-12",
	},
];

export default function HeroPage() {
	return (
		<div id="home" className="pb-8 md:pb-12">
			<header className="border-b border-[var(--color-border)]">
				<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
					<Logo />

					<p className="hidden text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)] md:block md:flex-1 md:text-center">
						An editorial archive of footwear
					</p>

					<nav
						aria-label="Primary"
						className="flex w-full items-center justify-between gap-3 min-[480px]:w-auto min-[480px]:justify-end min-[480px]:gap-6"
					>
						<Link
							href="/search-and-autocomplete/playground"
							className={navigationLinkClassName}
						>
							The archive
						</Link>
						<Link
							href="/search-and-autocomplete/journal"
							className={navigationLinkClassName}
						>
							Journal
						</Link>
						<a href="#about" className={navigationLinkClassName}>
							About
						</a>
						<a href="#contact" className={navigationLinkClassName}>
							Contact
						</a>
					</nav>
				</div>
			</header>

			<section aria-labelledby="hero-title" className="pt-10 md:pt-14">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
					<div className="md:col-span-7">
						<p className="editorial-rise flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
							<span
								aria-hidden="true"
								className="h-1.5 w-1.5 bg-[var(--color-accent)]"
							/>
							An index of form
						</p>

						<h1
							id="hero-title"
							className="editorial-rise editorial-delay-1 mt-6 font-display text-[clamp(3.6rem,9.5vw,8.75rem)] leading-[0.82] tracking-[-0.055em]"
						>
							<span className="block">Step into</span>
							<span className="block italic text-[var(--color-accent)]">
								prestige.
							</span>
						</h1>
					</div>

					<aside className="editorial-fade editorial-delay-2 border-t border-[var(--color-border)] pt-6 md:col-span-5 md:flex md:flex-col md:justify-end md:border-l md:border-t-0 md:pl-6 md:pt-0 lg:pl-10">
						<div className="md:max-w-[24rem]">
							<p className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
								The collection
							</p>

							<p className="mt-4 max-w-[32ch] text-[13px] leading-6 text-[var(--color-text-secondary)]">
								An editorial destination for exceptional footwear, from
								contemporary silhouettes to timeless craftsmanship.
							</p>

							<div className="mt-8 flex flex-col items-start gap-4 xl:flex-row xl:items-center">
								<Link
									href="/search-and-autocomplete/playground"
									className={`inline-flex min-h-11 items-center justify-center gap-3 bg-[var(--color-accent)] px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent-foreground)] transition-colors hover:bg-[var(--color-text-primary)] ${focusRing}`}
								>
									Explore the collection
									<span aria-hidden="true">→</span>
								</Link>

								<a
									href="#about"
									className={`inline-flex min-h-6 items-center text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-primary)] underline decoration-[var(--color-border-strong)] underline-offset-4 transition-colors hover:text-[var(--color-accent)] ${focusRing}`}
								>
									The details
								</a>
							</div>

							<dl className="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-4 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
								<div>
									<dt>Edition</dt>
									<dd className="mt-1 text-[var(--color-text-primary)]">
										No. 01
									</dd>
								</div>
								<div>
									<dt>Season</dt>
									<dd className="mt-1 text-[var(--color-text-primary)]">
										A/W 2026
									</dd>
								</div>
							</dl>
						</div>
					</aside>
				</div>

				<div className="mt-10 md:mt-14">
					<div className="flex items-end justify-between gap-4 border-t border-[var(--color-border)] pb-4 pt-4 text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
						<span>Selected studies</span>
						<span className="flex items-center gap-2">
							<span
								aria-hidden="true"
								className="h-1.5 w-1.5 bg-[var(--color-accent)]"
							/>
							01—04
						</span>
					</div>

					<div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:items-start md:gap-3">
						{heroImages.map((image, index) => (
							<HeroImage
								key={image.alt}
								src={image.src}
								alt={image.alt}
								eager={index < 2}
								highPriority={index === 0}
								className={`aspect-[2/3] ${image.offset}`}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
