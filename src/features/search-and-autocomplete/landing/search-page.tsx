import HeroPage from "./components/hero-page";

export default function SearchPage() {
	return (
		<main className="min-h-screen bg-(--color-background) text-(--color-text-primary) px-2 md:px-4 lg:px-10">
			<HeroPage />{" "}
			<section className="feature mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-8 py-20">
				{" "}
				<p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-(--color-accent)">
					{" "}
					Luxury Footwear{" "}
				</p>{" "}
				<h1 className="font-display max-w-4xl text-7xl leading-[0.9] tracking-[-0.04em] md:text-9xl">
					{" "}
					Step into luxury.{" "}
				</h1>{" "}
				<p className="mt-8 max-w-xl text-lg leading-8 text-(--color-text-secondary)">
					{" "}
					An editorial destination for exceptional footwear, from contemporary
					silhouettes to timeless craftsmanship.{" "}
				</p>{" "}
				<div className="mt-10 flex items-center gap-6">
					{" "}
					<button className="bg-(--color-accent) px-7 py-4 text-sm font-medium text-(--color-accent-foreground) transition-opacity hover:opacity-90">
						{" "}
						Explore collection{" "}
					</button>{" "}
					<a
						href="#"
						className="text-sm font-medium text-(--color-text-primary) underline decoration-(--color-border) underline-offset-8 transition-colors hover:text-(--color-accent)"
					>
						{" "}
						Discover the story{" "}
					</a>{" "}
				</div>{" "}
				<div className="mt-20 grid grid-cols-2 border-t border-(--color-border) pt-8 md:grid-cols-4">
					{" "}
					<div>
						{" "}
						<p className="text-xs uppercase tracking-[0.15em] text-(--color-text-secondary)">
							{" "}
							Collection{" "}
						</p>{" "}
						<p className="mt-2 text-sm">Women</p>{" "}
					</div>{" "}
					<div>
						{" "}
						<p className="text-xs uppercase tracking-[0.15em] text-(--color-text-secondary)">
							{" "}
							Collection{" "}
						</p>{" "}
						<p className="mt-2 text-sm">Men</p>{" "}
					</div>{" "}
					<div>
						{" "}
						<p className="text-xs uppercase tracking-[0.15em] text-(--color-text-secondary)">
							{" "}
							Edition{" "}
						</p>{" "}
						<p className="mt-2 text-sm">Autumn / Winter</p>{" "}
					</div>{" "}
					<div>
						{" "}
						<p className="text-xs uppercase tracking-[0.15em] text-(--color-text-secondary)">
							{" "}
							Explore{" "}
						</p>{" "}
						<p className="mt-2 text-sm">New arrivals</p>{" "}
					</div>{" "}
				</div>{" "}
			</section>{" "}
			<section className="feature mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-8 py-20">
				{" "}
				<p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-(--color-accent)">
					{" "}
					Luxury Footwear{" "}
				</p>{" "}
				<h1 className="font-display max-w-4xl text-7xl leading-[0.9] tracking-[-0.04em] md:text-9xl">
					{" "}
					Step into luxury.{" "}
				</h1>{" "}
				<p className="mt-8 max-w-xl text-lg leading-8 text-(--color-text-secondary)">
					{" "}
					An editorial destination for exceptional footwear, from contemporary
					silhouettes to timeless craftsmanship.{" "}
				</p>{" "}
				<div className="mt-10 flex items-center gap-6">
					{" "}
					<button className="bg-(--color-accent) px-7 py-4 text-sm font-medium text-(--color-accent-foreground) transition-opacity hover:opacity-90">
						{" "}
						Explore collection{" "}
					</button>{" "}
					<a
						href="#"
						className="text-sm font-medium text-(--color-text-primary) underline decoration-(--color-border) underline-offset-8 transition-colors hover:text-(--color-accent)"
					>
						{" "}
						Discover the story{" "}
					</a>{" "}
				</div>{" "}
				<div className="mt-20 grid grid-cols-2 border-t border-(--color-border) pt-8 md:grid-cols-4">
					{" "}
					<div>
						{" "}
						<p className="text-xs uppercase tracking-[0.15em] text-(--color-text-secondary)">
							{" "}
							Collection{" "}
						</p>{" "}
						<p className="mt-2 text-sm">Women</p>{" "}
					</div>{" "}
					<div>
						{" "}
						<p className="text-xs uppercase tracking-[0.15em] text-(--color-text-secondary)">
							{" "}
							Collection{" "}
						</p>{" "}
						<p className="mt-2 text-sm">Men</p>{" "}
					</div>{" "}
					<div>
						{" "}
						<p className="text-xs uppercase tracking-[0.15em] text-(--color-text-secondary)">
							{" "}
							Edition{" "}
						</p>{" "}
						<p className="mt-2 text-sm">Autumn / Winter</p>{" "}
					</div>{" "}
					<div>
						{" "}
						<p className="text-xs uppercase tracking-[0.15em] text-(--color-text-secondary)">
							{" "}
							Explore{" "}
						</p>{" "}
						<p className="mt-2 text-sm">New arrivals</p>{" "}
					</div>{" "}
				</div>{" "}
			</section>{" "}
		</main>
	);
}
