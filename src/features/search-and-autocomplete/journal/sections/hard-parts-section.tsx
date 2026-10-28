import {
	CodeBlock,
	Decision,
	InlineCode,
	Section,
	Subsection,
} from "../components/journal-primitives";
import { categoryStrategyCode, raceCode } from "../journal-code";

const correctnessNotes = [
	"An out-of-range page is detected after a successful response and replaced with a recovery state; it is not rendered as an empty grid.",
	"A refreshing request keeps the old cards visible and marks the collection busy, rather than flashing back to a blank skeleton.",
	"Category failure is isolated: the rail reports the problem, while search over the rest of the archive remains usable.",
	"Page, query, and category are parsed defensively; malformed pages fall back to 1 instead of producing a negative skip.",
];

export default function HardPartsSection() {
	return (
		<Section
			id="hard-parts"
			number="05"
			label="The hard parts"
			title={
				<>
					The work at the
					<span className="italic"> boundaries.</span>
				</>
			}
			intro="The visible interface is calm; the interesting engineering sits where the API's model, the browser's history, and React's async lifecycle refuse to line up neatly."
		>
			<Decision
				number="01"
				title="Category and query could not be one request."
				tension="The interface needed a category-scoped search: “red” inside Women’s Shoes. The obvious request shape is one endpoint that accepts both q and category."
				choice="Use the category endpoint as the scope, fetch the complete category, then filter and paginate locally with selectProducts()."
				tradeoff="The local path moves filtering and pagination into the client and downloads the full category. It is correct for this catalogue and would need a different strategy at production scale."
			>
				<p>
					DummyJSON&apos;s category endpoint ignores the query parameter. That is
					the constraint the strategy had to respect. Sending both values and
					treating the response as a scoped search would have produced a filter
					that looked correct in the URL and was not correct in the results.
				</p>

				<p>
					I considered searching globally and filtering the response by
					category, but that makes the category an afterthought to a relevance
					ranking. Fetching the category first makes the category the source of
					truth. The cost is a larger payload and local paging on this path.
				</p>

				<CodeBlock
					title="Request selection"
					code={categoryStrategyCode}
					note="The comment in the hook names the API limitation directly: the category endpoint ignores q, so filtering happens locally."
				/>
			</Decision>

			<Decision
				number="02"
				title="Typing creates races, not just requests."
				tension="A shopper can type faster than the network can answer. Without protection, an older response can overwrite a newer state and make the URL and the visible results disagree."
				choice="Debounce for 500ms, abort the previous controller on cleanup, and check an isActive flag before dispatching."
				tradeoff="The 500ms pause is perceptible. It trades a small amount of immediacy for fewer wasted requests and a more stable reading experience."
			>
				<p>
					The debounce reduces noise while the shopper is still composing a
					thought. The abort cancels work that is already in flight. The stale
					guard covers the narrow window where a response resolves after the
					effect has been cleaned up. These are three different protections, and
					they matter for different timings.
				</p>

				<p>
					I verified the overlapping case in the browser: a “shirt” request was
					started, “black” was typed before it resolved, and the browser reported
					the older request as <InlineCode>net::ERR_ABORTED</InlineCode>. The final
					URL, input, and result titles all matched “black.”
				</p>

				<CodeBlock
					title="Cancellation and stale-response guard"
					code={raceCode}
				/>
			</Decision>

			<Decision
				number="03"
				title="The URL needed to be state, not a side effect."
				tension="Search state should survive refresh and sharing, but a per-keystroke history entry would make Back almost useless."
				choice="Replace history for query changes; push history for category and page changes; listen to popstate and reparse the URL."
				tradeoff="The page owns the history behaviour itself. It does not use Next router navigation for these updates, so the route stays a client-side control surface rather than a server navigation."
			>
				<p>
					This was also a lesson in the difference between URL state and component
					state. The URL is the source for a fresh load and for Back/Forward; the
					component keeps a synchronous copy for fast input. Parsing and
					serializing live in pure utilities, which are the best-covered part of
					the test suite.
				</p>

				<p>
					The current design resets the page whenever the query or category
					changes. That is the right default for this product: a new search
					should begin at the first page, not silently keep a page number that
					may no longer exist.
				</p>
			</Decision>

			<Decision
				number="04"
				title="A small cache made revisiting feel instant."
				tension="Searching, paging back, and trying a related query can repeat the same request within a short browsing session."
				choice="A 30-second, 50-entry in-memory cache keyed by the request URL, with recent-read refresh and expired-entry eviction."
				tradeoff="The cache is per tab, disappears on reload, can serve stale data inside its TTL, and does not deduplicate two identical requests that are already in flight."
			>
				<p>
					The cache sits inside the shared request function, so browse, search,
					and category requests all benefit from it. The category path uses a URL
					without the query in the key, which is correct: the full category
					response is reused and the local filter changes without a new network
					request.
				</p>

				<p>
					I checked the hit case by revisiting a query within the TTL and
					confirming that no second network request appeared. I did not add an
					in-flight request map or a library such as TanStack Query. For this
					exercise, the dependency would have been more architecture than the
					problem required.
				</p>
			</Decision>

			<Decision
				number="05"
				title="The Next.js build boundary is part of the UI."
				tension="useSearchParams() is a client hook, and the playground is inside a statically rendered route."
				choice="Wrap the playground in a Suspense boundary in the route file. The production build then completes."
				tradeoff="The current wrapper uses a null fallback around the whole playground, so the initial static shell is blank until the client component is ready. A production version should hoist a static header or search shell outside the boundary."
			>
				<p>
					This is a build constraint, not an interaction design choice, but it
					affects the first paint. The route builds today. The cleaner version
					would keep the page&apos;s editorial frame in a server component and
					isolate only the part that reads search parameters.
				</p>
			</Decision>

			<Subsection title="Small correctness details">
				<ul className="space-y-3">
					{correctnessNotes.map((item) => (
						<li key={item} className="flex gap-3">
							<span
								aria-hidden="true"
								className="mt-2 h-1 w-1 shrink-0 bg-[var(--color-accent)]"
							/>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</Subsection>
		</Section>
	);
}
