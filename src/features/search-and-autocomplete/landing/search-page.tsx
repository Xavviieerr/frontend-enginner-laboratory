export default function SearchPage() {
	return (
		<main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
			{" "}
			<section className="feature mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-8 py-20">
				{" "}
				<p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
					{" "}
					Luxury Footwear{" "}
				</p>{" "}
				<h1 className="font-display max-w-4xl text-7xl leading-[0.9] tracking-[-0.04em] md:text-9xl">
					{" "}
					Step into luxury.{" "}
				</h1>{" "}
				<p className="mt-8 max-w-xl text-lg leading-8 text-[var(--color-text-secondary)]">
					{" "}
					An editorial destination for exceptional footwear, from contemporary
					silhouettes to timeless craftsmanship.{" "}
				</p>{" "}
				<div className="mt-10 flex items-center gap-6">
					{" "}
					<button className="bg-[var(--color-accent)] px-7 py-4 text-sm font-medium text-[var(--color-accent-foreground)] transition-opacity hover:opacity-90">
						{" "}
						Explore collection{" "}
					</button>{" "}
					<a
						href="#"
						className="text-sm font-medium text-[var(--color-text-primary)] underline decoration-[var(--color-border)] underline-offset-8 transition-colors hover:text-[var(--color-accent)]"
					>
						{" "}
						Discover the story{" "}
					</a>{" "}
				</div>{" "}
				<div className="mt-20 grid grid-cols-2 border-t border-[var(--color-border)] pt-8 md:grid-cols-4">
					{" "}
					<div>
						{" "}
						<p className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
							{" "}
							Collection{" "}
						</p>{" "}
						<p className="mt-2 text-sm">Women</p>{" "}
					</div>{" "}
					<div>
						{" "}
						<p className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
							{" "}
							Collection{" "}
						</p>{" "}
						<p className="mt-2 text-sm">Men</p>{" "}
					</div>{" "}
					<div>
						{" "}
						<p className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
							{" "}
							Edition{" "}
						</p>{" "}
						<p className="mt-2 text-sm">Autumn / Winter</p>{" "}
					</div>{" "}
					<div>
						{" "}
						<p className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
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
