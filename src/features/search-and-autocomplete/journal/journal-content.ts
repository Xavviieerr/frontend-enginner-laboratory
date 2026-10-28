export type JournalSection = {
	id: string;
	number: string;
	label: string;
};

export const journalSections: JournalSection[] = [
	{ id: "brief", number: "01", label: "The brief" },
	{ id: "direction", number: "02", label: "The direction" },
	{ id: "interaction", number: "03", label: "The interaction" },
	{ id: "architecture", number: "04", label: "Under the surface" },
	{ id: "hard-parts", number: "05", label: "The hard parts" },
	{ id: "quality", number: "06", label: "Testing & quality" },
	{ id: "reflection", number: "07", label: "Reflection" },
];

export const stack = [
	"Next.js 16 · App Router",
	"React 19 · TypeScript",
	"Tailwind CSS 4",
	"Zod · native fetch",
];

export const designTokens = [
	{
		name: "Background",
		value: "#faf9f7",
		role: "The warm page field. It keeps photography from feeling clinical.",
	},
	{
		name: "Surface",
		value: "#f1ece5",
		role: "Image beds and quiet panels that sit just below the page.",
	},
	{
		name: "Primary",
		value: "#171615",
		role: "Near-black type and the dark editorial footer.",
	},
	{
		name: "Secondary",
		value: "#6d6965",
		role: "Annotations, counts, labels, and supporting copy.",
	},
	{
		name: "Border",
		value: "#eae7e3",
		role: "Rules that structure the page without turning it into cards.",
	},
	{
		name: "Accent",
		value: "#701f2b",
		role: "The burgundy signal: active filters, focus, and small actions.",
	},
];

export const apiRoutes = [
	{
		name: "Browse the archive",
		endpoint: "/products?skip={skip}&limit=5",
		mode: "Server pagination",
		note: "The default, query-free path. The API owns the page window and total.",
	},
	{
		name: "Search",
		endpoint: "/products/search?q={query}&skip={skip}&limit=5",
		mode: "Server pagination",
		note: "Used when there is a query but no category. The API owns relevance and total.",
	},
	{
		name: "Category",
		endpoint: "/products/category/{slug}?limit=0",
		mode: "Local pagination",
		note: "The category endpoint does not accept q, so the full category is filtered and paginated on the client.",
	},
	{
		name: "Categories",
		endpoint: "/products/category-list",
		mode: "One request",
		note: "Loads the filter rail. This is separate from the search cache.",
	},
];

export const testFiles = [
	{
		file: "searchParams.test.mjs",
		cases: 6,
		coverage:
			"Query, page, and category parsing; invalid page fallback; URL serialization; unrelated parameter preservation; clean URLs.",
	},
	{
		file: "selectProducts.test.mjs",
		cases: 8,
		coverage:
			"Category and query filtering, case normalization, pagination, combined filters, and total-page maths.",
	},
	{
		file: "formatProduct.test.mjs",
		cases: 2,
		coverage: "Category label formatting and USD price formatting.",
	},
];

export type ManualCheck = {
	scenario: string;
	method: string;
	observed: string;
};

export const manualChecks: ManualCheck[] = [
	{
		scenario: "Browse without a query",
		method: "Opened /playground with no parameters.",
		observed:
			"The complete archive loaded: 194 objects, five per page, 39 pages, and no search or category state in the URL.",
	},
	{
		scenario: "Normal search",
		method: "Typed “red” into the search input and waited for the request.",
		observed:
			"18 results appeared in four pages. The URL became ?q=red and the suggestion panel listed three matching titles from the current result page.",
	},
	{
		scenario: "Empty result",
		method: "Searched for “zzzz-no-match”.",
		observed:
			"The empty state appeared with the query echoed back, a zero count, and a clear-search action.",
	},
	{
		scenario: "Category plus query",
		method: "Searched “red”, then selected Women’s Shoes.",
		observed:
			"One result remained. The URL was ?q=red&category=womens-shoes and the context line named both the query and the category.",
	},
	{
		scenario: "Pagination and browser history",
		method: "Moved to page 2, then used browser Back.",
		observed:
			"The URL changed to ?q=red&page=2; Back restored page 1 and the typed query without a reload.",
	},
	{
		scenario: "Out-of-range page",
		method: "Opened ?q=red&page=99 directly.",
		observed:
			"The out-of-range state explained that the edition had four pages and offered a return to page 01.",
	},
	{
		scenario: "Keyboard suggestions",
		method: "Focused the input with “red” loaded, pressed ArrowDown, then Enter.",
		observed:
			"“Red Lipstick” became the active option, Enter selected it, the panel closed, and the URL changed to ?q=Red+Lipstick.",
	},
	{
		scenario: "Product dialog",
		method: "Opened a product, inspected focus, then pressed Escape.",
		observed:
			"The native dialog opened with the close button focused; Escape closed it and focus returned to the card that launched it.",
	},
	{
		scenario: "Rapid typing and cancellation",
		method: "Started a “shirt” request, then typed “black” before it resolved.",
		observed:
			"The “shirt” request was reported as net::ERR_ABORTED. The final results, URL, and input all matched “black”.",
	},
	{
		scenario: "In-memory cache",
		method: "Revisited a previously loaded query within 30 seconds.",
		observed:
			"No second network request was made for that URL; the cached response populated the same result set.",
	},
	{
		scenario: "Slow request",
		method: "Delayed the product-search fetch by 1.4 seconds in the browser.",
		observed:
			"The collection stayed aria-busy with the updating state, retained the existing cards, then replaced them with the new results.",
	},
	{
		scenario: "Failed request and retry",
		method: "Rejected the product-search fetch in the browser, then restored fetch and used Try again.",
		observed:
			"The error state appeared with Try again and Clear search and filters. Retry returned the 18 “red” results without a reload.",
	},
];

export const limitations = [
	"The catalogue is DummyJSON, not a Northstar backend. It spans beauty, groceries, furniture, and other categories, so the editorial footwear framing is a design exercise rather than a claim about the data.",
	"Suggestions are derived from titles already present in the current result page. They are not a separate, catalogue-wide typeahead index.",
	"Combined category and query matching happens locally over a full category response. That is acceptable for this catalogue size but would not scale to a large production catalogue.",
	"Product-detail state is not represented in the URL. A product can be inspected, but not linked to directly.",
	"The client calls the public API directly. A production integration would need a server boundary for credentials, rate limits, validation, and observability.",
	"The route wraps the entire playground in a Suspense boundary with a null fallback. The production build passes, but the static shell is blank until the client component is ready.",
	"Automated coverage is limited to pure utility functions. There are no hook, component, cache, network, or end-to-end tests in the repository.",
	"No production performance metrics, error telemetry, or conversion data exist for this exercise.",
];

export const browserConcepts = [
	"Controlled inputs and derived state",
	"React effects, cleanup, and reducer state",
	"Debouncing and AbortController",
	"fetch, promises, and stale-response guards",
	"URLSearchParams, pushState, and popstate",
	"Next.js App Router, Suspense, and useSearchParams",
	"next/image remote images and responsive sizes",
	"Native <dialog>, focus restoration, and inert background",
	"prefers-reduced-motion and CSS motion",
];

export const comparisonRows = [
	{
		choice: "Editorial cover and archive",
		rejected: "A dense marketplace grid",
		reason:
			"Image scale, fewer products per page, and generous negative space make the catalogue feel edited rather than endless.",
	},
	{
		choice: "A large search line in the page",
		rejected: "A small search field in a utility bar",
		reason:
			"Search is the primary task here, so it earns the visual weight of a masthead instead of reading as a secondary control.",
	},
	{
		choice: "Five results per page",
		rejected: "Twenty-four results per page",
		reason:
			"A short page protects the image rhythm and makes each object legible; the cost is more pagination interactions.",
	},
	{
		choice: "Category fetch plus local filtering",
		rejected: "Sending q and category to one endpoint",
		reason:
			"The category endpoint ignores q. Filtering the category response locally is the honest way to keep the filter real.",
	},
	{
		choice: "Native dialog",
		rejected: "A custom modal layer",
		reason:
			"The browser supplies focus containment, Escape handling, and modal semantics; the implementation adds presentation and focus restoration.",
	},
];
