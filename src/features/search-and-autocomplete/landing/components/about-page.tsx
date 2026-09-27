export default function aboutPage() {
	return (
		<section className="grid grid-cols-1 border-t border-(--color-border) md:grid-cols-4">
			{/* Core Features */}
			<div className="border-b border-(--color-border) px-5 py-10 md:col-span-3 md:px-8 md:py-16">
				<h2 className="font-display text-5xl font-medium tracking-[-0.04em] md:text-8xl">
					Core Features
				</h2>
			</div>

			<div className="hidden border-b border-(--color-border) md:block" />

			{/* Feature 01 */}
			<div className="grid grid-cols-1 border-b border-(--color-border) md:col-span-4 md:grid-cols-3">
				<div className="px-5 py-8 md:border-r md:px-8 md:py-12">
					<div className="mb-4 flex gap-1">
						<span className="h-2 w-2 rounded-full bg-(--color-accent)" />
						<span className="h-2 w-2 rounded-full bg-(--color-accent)" />
						<span className="h-2 w-2 rounded-full bg-(--color-accent)" />
					</div>

					<h3 className="font-display text-3xl tracking-[-0.03em] md:text-4xl">
						Instant autocomplete
					</h3>
				</div>

				<div className="px-5 pb-8 md:border-r md:px-8 md:py-12">
					<p className="max-w-sm text-sm leading-6 text-(--color-text-secondary)">
						Get relevant suggestions as you type, creating a search experience
						that feels immediate and effortless.
					</p>
				</div>

				<div className="px-5 pb-8 md:flex md:items-center md:justify-end md:px-8 md:py-12">
					<span className="font-display text-4xl text-(--color-text-secondary)">
						01
					</span>
				</div>
			</div>

			{/* Feature 02 */}
			<div className="grid grid-cols-1 border-b border-(--color-border) md:col-span-4 md:grid-cols-3">
				<div className="px-5 py-8 md:border-r md:px-8 md:py-12">
					<div className="mb-4 flex gap-1">
						<span className="h-2 w-2 rounded-full bg-(--color-accent)" />
						<span className="h-2 w-2 rounded-full bg-(--color-accent)" />
						<span className="h-2 w-2 rounded-full bg-(--color-accent)" />
					</div>

					<h3 className="font-display text-3xl tracking-[-0.03em] md:text-4xl">
						Smart networking
					</h3>
				</div>

				<div className="px-5 pb-8 md:border-r md:px-8 md:py-12">
					<p className="max-w-sm text-sm leading-6 text-(--color-text-secondary)">
						Debounced queries and controlled requests keep the interface
						responsive without unnecessary network activity.
					</p>
				</div>

				<div className="px-5 pb-8 md:flex md:items-center md:justify-end md:px-8 md:py-12">
					<span className="font-display text-4xl text-(--color-text-secondary)">
						02
					</span>
				</div>
			</div>

			{/* Feature 03 */}
			<div className="grid grid-cols-1 md:col-span-4 md:grid-cols-3">
				<div className="px-5 py-8 md:border-r md:px-8 md:py-12">
					<div className="mb-4 flex gap-1">
						<span className="h-2 w-2 rounded-full bg-(--color-accent)" />
						<span className="h-2 w-2 rounded-full bg-(--color-accent)" />
						<span className="h-2 w-2 rounded-full bg-(--color-accent)" />
					</div>

					<h3 className="font-display text-3xl tracking-[-0.03em] md:text-4xl">
						Keyboard-first
					</h3>
				</div>

				<div className="px-5 pb-8 md:border-r md:px-8 md:py-12">
					<p className="max-w-sm text-sm leading-6 text-(--color-text-secondary)">
						Navigate suggestions, select results, and dismiss the search
						experience without leaving the keyboard.
					</p>
				</div>

				<div className="px-5 pb-8 md:flex md:items-center md:justify-end md:px-8 md:py-12">
					<span className="font-display text-4xl text-(--color-text-secondary)">
						03
					</span>
				</div>
			</div>
		</section>
	);
}
