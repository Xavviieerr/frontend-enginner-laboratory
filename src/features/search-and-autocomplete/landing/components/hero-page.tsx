import Logo from "./logo";
import HeroImage from "./hero-image";
import Brooks from "@/features/search-and-autocomplete/assets/image/brooks.jpg";
import WhiteHeels from "@/features/search-and-autocomplete/assets/image/white-heels.jpg";
import SaintLauret from "@/features/search-and-autocomplete/assets/image/saint-lauret.jpg";
import BrownHeels from "@/features/search-and-autocomplete/assets/image/brown-heels.jpg";

export default function Heropage() {
	return (
		<div id="home" className=" h-auto flex flex-col py-5 gap-3">
			{/* hero top row */}
			<div className="grid grid-cols-4">
				<Logo />
				<div className="col-start-3 flex items-end">
					<p className="hidden md:block border-l-2 border-(--color-accent) pl-2 w-30 rotate-90 md:text-[10px] lg:text-sm text-(--color-text-secondary)">
						Explore our amazing and carefully crafted collection to find your
						next statement piece.
					</p>
				</div>
				<div className="flex flex-col items-end gap-4">
					<a
						href="#home"
						className="text-sm font-medium text-(--color-text-primary) underline decoration-(--color-border) underline-offset-8 transition-colors hover:text-(--color-accent)"
					>
						Home
					</a>

					<a
						href="#about"
						className="text-sm font-medium text-(--color-text-primary) underline decoration-(--color-border) underline-offset-8 transition-colors hover:text-(--color-accent)"
					>
						About
					</a>

					<a
						href="#contact"
						className="text-sm font-medium text-(--color-text-primary) underline decoration-(--color-border) underline-offset-8 transition-colors hover:text-(--color-accent)"
					>
						Contact
					</a>
				</div>
			</div>

			<div className="flex justify-between h-auto md:h-1/3 mt-5 md:mt-10 lg:h-1/3">
				<div className="flex flex-col gap-13">
					<h1 className="font-display max-w-7xl text-6xl leading-[0.9] tracking-[-0.04em] md:text-8xl lg:text-9xl">
						Step into prestige.
					</h1>
					<a href="/search-and-autocomplete/playground">
						<button className="max-w-50 l bg-(--color-accent) px-7 py-4 text-sm font-medium text-(--color-accent-foreground) transition-opacity hover:opacity-90">
							Explore collection
						</button>
					</a>
				</div>

				<div className="flex flex-col justify-center">
					<p className="max-w-65 text-right text-sm md:text-md text-(--color-text-secondary)">
						An editorial destination for exceptional footwear, from contemporary
						silhouettes to timeless craftsmanship.
					</p>
				</div>
			</div>

			{/* horizontal line */}
			<div className="mt-5 md:mt-10 lg:mt-0 grid grid-cols-2 border-t border-(--color-border) pt-2 md:grid-cols-4"></div>

			{/* hero bottom images */}
			<div className="grid grid-cols-2 gap-2 md:flex md:h-[57vh] lg:h-[72vh] md:items-end md:gap-4 md:overflow-hidden mt-6 md:mt-10 lg:mt-0">
				<HeroImage
					src={Brooks}
					alt="Black leather shoe"
					className="aspect-1/2 md:h-[70vh] lg:h-[75vh] md:flex-1"
				/>

				<HeroImage
					src={WhiteHeels}
					alt="White heels"
					className="aspect-1/2 md:h-[70vh] flex-1 lg:h-[75vh]"
				/>

				<HeroImage
					src={SaintLauret}
					alt="saint laurel shoe"
					className="hidden md:block md:h-[70vh] aspect-1/2 lg:h-[75vh] md:flex-1"
				/>

				<HeroImage
					src={BrownHeels}
					alt="Brown leather shoe"
					className="hidden lg:block md:h-[75vh] md:flex-1"
				/>
			</div>
		</div>
	);
}
