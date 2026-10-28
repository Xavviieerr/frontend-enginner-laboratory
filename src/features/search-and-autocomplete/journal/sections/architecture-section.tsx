import {
	CodeBlock,
	InlineCode,
	Section,
	Subsection,
} from "../components/journal-primitives";
import {
	cacheCode,
	featureStructureCode,
	urlCode,
} from "../journal-code";
import { apiRoutes, browserConcepts, stack } from "../journal-content";

const ownership = [
	[
		"useSearchState",
		"Owns query, page, and category; reads initial state from useSearchParams; writes history entries and listens for popstate.",
	],
	[
		"useProductSearch",
		"Owns products, pagination, status, and the generic error. Selects the request path, debounces, aborts, and guards against stale responses.",
	],
	[
		"useProductCategories",
		"Loads the category list once on mount and exposes its own loading/error state. Category failure does not block search.",
	],
	[
		"useAutocomplete",
		"Owns suggestion openness and the highlighted index. It receives a plain string[] and a query callback, so it knows nothing about products or APIs.",
	],
	[
		"PlaygroundPage",
		"Composes the hooks, derives suggestion titles from the loaded products, owns the selected product, and coordinates scrolling.",
	],
	[
		"SearchResults",
		"Derives initial loading, refreshing, empty, error, and out-of-range states from products, pagination, status, and page. No duplicate UI flags.",
	],
];

const lifecycle = [
	["01", "Input", "Controlled value; immediate React state update."],
	["02", "URL", "Query replaces; category/page push a history entry."],
	["03", "Effect", "useProductSearch runs after commit; status becomes loading."],
	["04", "Debounce", "500ms timeout; cleanup cancels the pending work."],
	["05", "Request", "Cache check, then fetch with AbortSignal."],
	["06", "Network", "Browser sends the request; the UI stays responsive."],
	["07", "Validate", "Status and response shape are checked before use."],
	["08", "State", "Reducer success + cache write; stale work is ignored."],
	["09", "Paint", "React renders, commits, and the browser paints the new edit."],
];

export default function ArchitectureSection() {
	return (
		<Section
			id="architecture"
			number="04"
			label="Under the surface"
			title={
				<>
					A small state machine
					<span className="italic"> around a request.</span>
				</>
			}
			intro="The frontend is intentionally narrow: URL state, request state, category state, autocomplete UI state, and one selected product. The interest is in how those responsibilities meet."
		>
			<CodeBlock title="Feature structure" code={featureStructureCode} />

			<Subsection title="Who owns what">
				<dl className="space-y-0 border-y border-[var(--color-border)]">
					{ownership.map(([name, description]) => (
						<div
							key={name}
							className="grid gap-1.5 border-b border-[var(--color-border)] py-4 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-5"
						>
							<dt className="font-mono text-[11px] leading-5 text-[var(--color-text-primary)]">
								{name}
							</dt>
							<dd className="text-sm leading-6 text-[var(--color-text-secondary)]">
								{description}
							</dd>
						</div>
					))}
				</dl>
			</Subsection>

			<Subsection title="The request strategy">
				<p>
					The API boundary drove a split strategy. Without a category, the search
					and browse endpoints paginate on the server. With a category, the
					category endpoint is the reliable scope, but it does not accept a query
					parameter. The full category is therefore filtered and paginated
					locally.
				</p>

				<div className="mt-5 border-y border-[var(--color-border)]">
					{apiRoutes.map((route) => (
						<div
							key={route.name}
							className="border-b border-[var(--color-border)] py-4 last:border-b-0"
						>
							<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
								<p className="text-sm font-medium text-[var(--color-text-primary)]">
									{route.name}
								</p>
								<p className="text-[9px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
									{route.mode}
								</p>
							</div>
							<code className="mt-1 block break-all text-[10px] leading-5 text-[var(--color-text-secondary)]">
								{route.endpoint}
							</code>
							<p className="mt-1.5 text-xs leading-5 text-[var(--color-text-secondary)]">
								{route.note}
							</p>
						</div>
					))}
				</div>
			</Subsection>

			<div className="my-10 bg-[var(--color-text-primary)] px-5 py-7 text-[var(--color-background)] sm:px-7 sm:py-8">
				<p className="text-[9px] uppercase tracking-[0.24em] text-white/55">
					Conceptual request lifecycle
				</p>
				<h3 className="mt-3 max-w-[15ch] font-display text-[clamp(2rem,4vw,3.2rem)] leading-[0.95] tracking-[-0.04em]">
					Input, answer, paint.
				</h3>

				<ol className="mt-6 grid gap-px bg-white/15 sm:grid-cols-3">
					{lifecycle.map(([number, label, description]) => (
						<li key={number} className="bg-[var(--color-text-primary)] p-4">
							<p className="text-[9px] tracking-[0.18em] text-white/45">
								{number}
							</p>
							<p className="mt-2 text-sm font-medium text-white">{label}</p>
							<p className="mt-1 text-[11px] leading-5 text-white/65">
								{description}
							</p>
						</li>
					))}
				</ol>

				<p className="mt-5 max-w-[64ch] text-[11px] leading-5 text-white/55">
					This is a conceptual sequence. The actual ordering depends on promise
					completion, cache hits, React scheduling, and whether the user keeps
					typing before the debounce settles.
				</p>
			</div>

			<Subsection title="Types and validation">
				<p>
					The public types describe the product and response contract (
					<InlineCode>Product</InlineCode>,{" "}
					<InlineCode>ProductSearchResponse</InlineCode>,{" "}
					<InlineCode>Pagination</InlineCode>, and the{" "}
					<InlineCode>SearchStatus</InlineCode> union). The search query is
					validated with a small Zod schema that trims and requires a non-empty
					string. Response validation is hand-written type-guard code: required
					fields are checked, optional fields are checked only when present, and
					arrays are verified element by element.
				</p>

				<p>
					The split is pragmatic rather than dogmatic. Zod is valuable at the
					query boundary because it gives one small source of truth; the response
					guards are explicit because they mirror the API shape and allow the app
					to reject malformed data without trusting{" "}
					<InlineCode>response.json()</InlineCode>. If the contract grew, I would
					consolidate those guards into a schema and derive the type from it.
				</p>
			</Subsection>

			<Subsection title="URL state and browser history">
				<p>
					The URL is the durable state: <InlineCode>?q=</InlineCode>,{" "}
					<InlineCode>?page=</InlineCode>, and <InlineCode>?category=</InlineCode>
					. Defaults are omitted, unrelated parameters are preserved, and page
					values are parsed as positive integers with a safe fallback to page 1.
				</p>

				<p>
					The implementation uses <InlineCode>useSearchParams()</InlineCode> only
					to read the initial state. Updates go directly through{" "}
					<InlineCode>history.replaceState</InlineCode> for query changes and{" "}
					<InlineCode>history.pushState</InlineCode> for category/page changes. A{" "}
					<InlineCode>popstate</InlineCode> listener reparses the URL, so Back and
					Forward work without a full navigation.
				</p>

				<CodeBlock
					title="History modes"
					code={urlCode}
					note="The history choice is deliberate: typing should not create a trail of near-identical entries, but meaningful refinements should."
				/>
			</Subsection>

			<Subsection title="Cache and request lifecycle">
				<p>
					The cache is a module-level <InlineCode>Map</InlineCode> keyed by the
					full request URL. Entries expire after 30 seconds, the map holds at most
					50 entries, and a read refreshes insertion order so eviction favours
					recently used values. Expired entries are removed on read and swept on
					write. Only validated responses are cached.
				</p>

				<CodeBlock
					title="Cache boundary"
					code={cacheCode}
					note="This is a client-session cache, not a CDN or server cache. It resets on reload and is not shared between tabs."
				/>

				<ul className="mt-5 grid gap-2 sm:grid-cols-2">
					{stack.map((item) => (
						<li
							key={item}
							className="border-t border-[var(--color-border)] pt-2 text-[11px] leading-5 text-[var(--color-text-secondary)]"
						>
							{item}
						</li>
					))}
				</ul>
			</Subsection>

			<Subsection title="Browser concepts this exercised">
				<ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
					{browserConcepts.map((concept) => (
						<li
							key={concept}
							className="flex gap-2 text-sm leading-6 text-[var(--color-text-secondary)]"
						>
							<span
								aria-hidden="true"
								className="mt-2.5 h-1 w-1 shrink-0 bg-[var(--color-accent)]"
							/>
							{concept}
						</li>
					))}
				</ul>
			</Subsection>
		</Section>
	);
}
