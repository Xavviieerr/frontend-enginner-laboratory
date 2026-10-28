import type { ReactNode } from "react";

export const focusRing =
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]";

export const smallLabel =
	"text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-secondary)]";

export const bodyCopy =
	"text-[15px] leading-[1.85] text-[var(--color-text-primary)] md:text-base";

type SectionProps = {
	id: string;
	number: string;
	label: string;
	title: ReactNode;
	intro?: ReactNode;
	children: ReactNode;
};

export function Section({
	id,
	number,
	label,
	title,
	intro,
	children,
}: SectionProps) {
	return (
		<section
			id={id}
			aria-labelledby={`${id}-title`}
			className="scroll-mt-8 border-t border-[var(--color-border)] py-14 md:py-20"
		>
			<div className="flex items-baseline gap-4">
				<span className="text-[9px] tracking-[0.18em] text-[var(--color-accent)]">
					{number}
				</span>
				<p className={`${smallLabel} text-[var(--color-text-primary)]`}>
					{label}
				</p>
			</div>

			<h2
				id={`${id}-title`}
				className="mt-5 max-w-[15ch] font-display text-[clamp(2.7rem,5.2vw,4.9rem)] leading-[0.92] tracking-[-0.045em] text-[var(--color-text-primary)]"
			>
				{title}
			</h2>

			{intro && (
				<p className="mt-6 max-w-[60ch] text-[clamp(1.05rem,1.5vw,1.22rem)] leading-[1.65] text-[var(--color-text-secondary)]">
					{intro}
				</p>
			)}

			<div className="mt-8">{children}</div>
		</section>
	);
}

export function Copy({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={`${bodyCopy} max-w-[66ch] space-y-5 ${className}`}>
			{children}
		</div>
	);
}

export function Subsection({
	title,
	children,
	className = "",
}: {
	title: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`mt-10 border-t border-[var(--color-border)] pt-6 ${className}`}
		>
			<h3 className="font-display text-[clamp(1.65rem,2.6vw,2.25rem)] leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)]">
				{title}
			</h3>
			<div className={`${bodyCopy} mt-4 max-w-[66ch] space-y-4`}>
				{children}
			</div>
		</div>
	);
}

export function PullQuote({
	children,
	attribution,
}: {
	children: ReactNode;
	attribution?: string;
}) {
	return (
		<figure className="my-10 border-y border-[var(--color-border)] py-8">
			<blockquote className="max-w-[24ch] font-display text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.02] tracking-[-0.035em] text-[var(--color-text-primary)]">
				{children}
			</blockquote>
			{attribution && (
				<figcaption className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
					{attribution}
				</figcaption>
			)}
		</figure>
	);
}

export function CodeBlock({
	title,
	code,
	note,
}: {
	title: string;
	code: string;
	note?: string;
}) {
	return (
		<figure className="my-6 overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
			<figcaption className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] px-4 py-3 text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
				<span>{title}</span>
				<span className="text-[var(--color-text-secondary)]">Abridged</span>
			</figcaption>
			<pre
				tabIndex={0}
				aria-label={`Code: ${title}`}
				className={`overflow-x-auto p-4 text-[11px] leading-6 text-[var(--color-text-primary)] sm:p-5 ${focusRing}`}
			>
				<code>{code}</code>
			</pre>
			{note && (
				<p className="border-t border-[var(--color-border)] px-4 py-3 text-[11px] leading-5 text-[var(--color-text-secondary)]">
					{note}
				</p>
			)}
		</figure>
	);
}

export function Decision({
	number,
	title,
	tension,
	choice,
	tradeoff,
	children,
}: {
	number: string;
	title: string;
	tension: string;
	choice: string;
	tradeoff: string;
	children: ReactNode;
}) {
	return (
		<article className="mt-10 border-t border-[var(--color-border)] pt-6 first:mt-0 first:border-t-0 first:pt-0">
			<div className="flex items-baseline gap-4">
				<span className="text-[9px] tracking-[0.18em] text-[var(--color-accent)]">
					{number}
				</span>
				<p className={smallLabel}>Decision</p>
			</div>

			<h3 className="mt-3 max-w-[28ch] font-display text-[clamp(1.7rem,2.8vw,2.45rem)] leading-[1.03] tracking-[-0.03em] text-[var(--color-text-primary)]">
				{title}
			</h3>

			<dl className="mt-5 grid gap-px border-y border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
				<div className="bg-[var(--color-background)] py-4 pr-4 sm:pr-6">
					<dt className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
						Tension
					</dt>
					<dd className="mt-2 text-sm leading-6 text-[var(--color-text-primary)]">
						{tension}
					</dd>
				</div>
				<div className="bg-[var(--color-background)] py-4 sm:pl-4">
					<dt className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
						Choice
					</dt>
					<dd className="mt-2 text-sm leading-6 text-[var(--color-text-primary)]">
						{choice}
					</dd>
				</div>
			</dl>

			<div className={`${bodyCopy} mt-5 max-w-[66ch] space-y-4`}>
				{children}
			</div>

			<p className="mt-5 border-l-2 border-[var(--color-accent)] pl-4 text-sm leading-6 text-[var(--color-text-secondary)]">
				<span className="mr-1.5 text-[9px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
					Trade-off
				</span>
				{tradeoff}
			</p>
		</article>
	);
}

export function InlineCode({ children }: { children: ReactNode }) {
	return (
		<code className="rounded-sm bg-[var(--color-surface)] px-1 py-0.5 font-mono text-[0.85em] text-[var(--color-text-primary)]">
			{children}
		</code>
	);
}
