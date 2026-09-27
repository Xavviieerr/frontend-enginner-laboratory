import Image from "next/image";
import BrownHeels from "@/features/search-and-autocomplete/assets/image/brown-heels.jpg";

export default function Footer() {
	return (
		<footer className="bg-(--color-text-primary) text-(--color-background)">
			<div className="grid grid-cols-1 md:grid-cols-4">
				{/* Row 1 — Heading */}
				<div className="border-b border-white/15 px-5 py-10 md:col-span-3 md:px-8 md:py-16">
					<h2 className="font-display text-5xl font-medium tracking-[-0.04em] md:text-8xl">
						Contact us
					</h2>
				</div>

				<div className="hidden border-b border-white/15 md:block" />

				{/* Row 2 — Navigation */}
				<div className="border-b border-white/15 px-5 py-8 md:min-h-45 md:border-r md:px-8 md:py-10">
					<div className="flex flex-col items-start md:items-end">
						<span className="mb-4 text-xs tracking-[0.12em] text-white/45">
							[NAVIGATE]
						</span>

						<nav className="flex flex-col items-start gap-1 md:items-end">
							<a
								href="/search-and-autocomplete"
								className="text-sm transition-opacity hover:opacity-60"
							>
								Home
							</a>
							<a
								href="#"
								className="text-sm transition-opacity hover:opacity-60"
							>
								About
							</a>
							<a
								href="#"
								className="text-sm transition-opacity hover:opacity-60"
							>
								Contact
							</a>
						</nav>
					</div>
				</div>

				<div className="hidden border-b border-white/15 md:block" />

				<div className="border-b border-white/15 px-5 py-8 md:border-r md:px-8 md:py-10">
					<div className="flex flex-col items-start md:items-end">
						<span className="mb-4 text-xs tracking-[0.12em] text-white/45">
							[GET IN TOUCH]
						</span>

						<a
							href="mailto:hello@northstar.com"
							className="text-sm transition-opacity hover:opacity-60"
						>
							hello@northstar.com
						</a>
					</div>
				</div>

				<div className="hidden border-b border-white/15 md:block" />

				{/* Row 3 — Connect */}
				<div className="border-b border-white/15 px-5 py-8 md:col-start-2 md:min-h-45 md:border-r md:px-8 md:py-10">
					<div className="flex flex-col items-start md:items-end">
						<span className="mb-4 text-xs tracking-[0.12em] text-white/45">
							[CONNECT]
						</span>

						<div className="flex flex-col items-start gap-1 md:items-end">
							<a
								href="#"
								className="text-sm transition-opacity hover:opacity-60"
							>
								GitHub
							</a>
							<a
								href="#"
								className="text-sm transition-opacity hover:opacity-60"
							>
								LinkedIn
							</a>
						</div>
					</div>
				</div>

				<div className="hidden border-b border-white/15 md:block" />

				<div className="border-b border-white/15 px-5 py-8 md:min-h-45 md:border-r md:px-8 md:py-10">
					<div className="flex flex-col items-start md:items-end">
						<span className="mb-4 text-xs tracking-[0.12em] text-white/45">
							[CREDIT]
						</span>

						<p className="max-w-48 text-left text-sm leading-6 text-white/70 md:text-right">
							Designed and developed by c.p.ogbu
						</p>
					</div>
				</div>

				<div className="hidden border-b border-white/15 md:block" />

				{/* Row 4 — Wordmark */}
				<div className="col-span-1 overflow-hidden px-5 py-12 md:col-span-4 md:px-8 md:py-16">
					<div className="flex items-center justify-center">
						<h2 className="font-display text-[17vw] font-medium leading-[0.75] tracking-[-0.07em] whitespace-nowrap">
							NORTH
						</h2>

						<div className="relative mx-2 h-[13vw] w-[10vw] shrink-0 overflow-hidden md:mx-4">
							<Image
								src={BrownHeels}
								alt=""
								fill
								className="object-cover"
								sizes="10vw"
							/>
						</div>

						<h2 className="font-display text-[17vw] font-medium leading-[0.75] tracking-[-0.07em] whitespace-nowrap">
							TAR
						</h2>
					</div>
				</div>
			</div>
		</footer>
	);
}
