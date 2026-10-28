import Link from "next/link";

export default function Logo() {
	return (
		<Link
			href="/search-and-autocomplete"
			aria-label="Northstar home"
			className="inline-flex font-display text-[1.05rem] font-medium tracking-[0.22em] text-[var(--color-text-primary)] transition-opacity hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]"
		>
			NORTHSTAR
		</Link>
	);
}
