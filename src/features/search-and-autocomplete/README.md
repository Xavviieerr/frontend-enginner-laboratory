# Northstar — Search & Autocomplete

> **Scope.** This README documents only the Search & Autocomplete feature and its routes under `src/features/search-and-autocomplete` and `src/app/search-and-autocomplete`. Run the commands below from the repository root.

An editorial product-discovery experiment built with Next.js, React, TypeScript, Tailwind CSS, and Zod. Northstar treats a search result as a small edit rather than an endless feed: search by name or description, narrow by category, move through five objects at a time, and inspect a product without losing the collection.

The feature uses [DummyJSON](https://dummyjson.com/docs/products) for product data. It is a self-contained frontend exercise, not a Northstar production catalogue.

## Overview

Northstar began as a landing-page and archive concept for a fictional luxury footwear label. The search work extends that concept into a real interaction: a large search line, a compact category rail, an editorial result grid, a native product dialog, and URL-backed state.

The visual case study is at `/search-and-autocomplete/journal`. This README is the engineering overview.

## The problem, user, and goal

**User.** A shopper who knows the shape of a thing before they know its name. They may type `loafer`, `black heels`, `leather boot`, or `ankle b`. They are browsing, not looking up a known SKU.

**Problem.** A catalogue search that requires exact product language makes the archive feel smaller than it is. A search that flashes, loses filter state, or hides the result count makes it feel unreliable.

**Goal.** Make partial language useful, keep every result state legible, and preserve the shopper's place across filtering, pagination, refresh, and browser history — without introducing a backend or a dependency-heavy data layer.

## What it does

- Browses the complete archive in catalogue order with no query.
- Searches product name and description through the DummyJSON search endpoint.
- Filters by category from a horizontally scrollable category rail.
- Combines category and query results, filtering and paginating the category response locally.
- Shows up to six title suggestions from the current result page.
- Supports `ArrowDown`, `ArrowUp`, `Enter`, `Escape`, click selection, and focus/blur handling in the combobox.
- Stores `q`, `page`, and `category` in the URL.
- Replaces history for typing and pushes history for category and page changes.
- Handles initial loading, refreshing, empty, error, and out-of-range states separately.
- Opens product details in a native `<dialog>` with focus restoration and scroll locking.
- Respects `prefers-reduced-motion` and provides visible keyboard focus styles.

## Visual direction

The interface is fashion editorial rather than marketplace utilitarian:

- **Type.** Bodoni Moda carries display headings, the search line, and product names; Inter carries labels, metadata, counts, and longer copy.
- **Palette.** Warm off-white (`#faf9f7`), warm surface (`#f1ece5`), near-black (`#171615`), muted secondary (`#6d6965`), border (`#eae7e3`), and restrained burgundy (`#701f2b`) for active filters, focus, and small actions.
- **Structure.** A twelve-column composition at desktop, a 1600px maximum width, and rule lines instead of card chrome.
- **Density.** One column on mobile, two on tablet, four on desktop, five objects per page.
- **Detail.** 4:5 image beds, numbered eyebrows, a large in-page search line, and a split product dialog.

The journal route documents the visual and interaction decisions in more depth.

## Demo and screenshots

There is no hosted demo configured in this repository. To run it locally, see [Commands](#commands). No screenshots are checked in; the journal route is the visual walkthrough, and every claim in it is based on the implementation or a browser check.

## Architecture

```text
src/app/search-and-autocomplete/
├─ layout.tsx              feature fonts and styles
├─ page.tsx                editorial cover
├─ playground/page.tsx     interactive archive
└─ journal/page.tsx        engineering journal

src/features/search-and-autocomplete/
├─ landing/                cover composition
├─ playground/
│  ├─ api/                 endpoints, request boundary, cache
│  ├─ components/          search input, suggestions, results, cards, dialog
│  ├─ hooks/               URL state, search, categories, autocomplete
│  ├─ types/               product and response contracts
│  ├─ utils/               URL parsing, filtering, pagination, formatting
│  └─ validation/          query schema
├─ journal/                editorial content and page shell
└─ styles/                 tokens, type, motion, scrollbar styling
```

The route files compose feature components. The playground is a client surface; the landing and journal are primarily server-rendered composition. `useSearchParams()` in the playground requires a Suspense boundary, so `/search-and-autocomplete/playground` wraps `PlaygroundPage` in `<Suspense fallback={null}>`.

## State and data flow

```text
URL (?q=&page=&category=)
        │
        ▼
useSearchState ──► query, page, category
        │                 │
        │                 ├─ setQuery    → replaceState
        │                 ├─ setCategory → pushState
        │                 └─ setPage     → pushState
        │
        ▼
useProductSearch
        │
        ├─ no category, no query → /products
        ├─ no category, query    → /products/search
        └─ category             → category endpoint + local selection
        │
        ▼
requestProductSearch ──► 30s in-memory cache check ──► fetch + validation
        │
        ▼
SearchResults ──► ProductCard ──► native product dialog
```

`useSearchState` reads the initial URL state, writes history entries without Next router navigation, and listens for `popstate` to reparse the URL. `useProductSearch` owns the product list, pagination, status, and generic error. `useAutocomplete` owns only suggestion-panel interaction state; it receives suggested titles and a query callback, so it has no knowledge of products or APIs.

The product dialog is component state (`selectedProduct`) rather than a route. That preserves the collection underneath, but it also means an open product is not directly linkable.

## API contract and request strategy

DummyJSON is called directly from the client:

| Request | Endpoint | Pagination | Used when |
| --- | --- | --- | --- |
| Browse | `/products?skip={skip}&limit=5` | Server | No query, no category |
| Search | `/products/search?q={query}&skip={skip}&limit=5` | Server | Query, no category |
| Category | `/products/category/{slug}?limit=0` | Local | Category selected |
| Categories | `/products/category-list` | — | Rail on first mount |

The category endpoint ignores `q`. Combined category + query therefore fetches the category once and uses `selectProducts()` to filter by category, then by title, description, brand, and tags, and finally paginate. The trade-off is a larger payload and local filtering; it is correct for this catalogue but would need server-side faceting and cursor pagination at production scale.

Every product response goes through a hand-written type guard before it enters state. Non-2xx responses and malformed payloads throw; the hook converts those failures into a generic user-facing error.

## Validation, caching, errors

- **Query validation.** `searchQuerySchema` trims the value and requires a non-empty string. The hook treats an invalid query as a reset rather than issuing a request.
- **URL validation.** Page values are accepted only as positive integers; anything else falls back to page 1. Empty/default values are omitted when serializing.
- **Response validation.** Required product fields are checked, optional fields are checked when present, image arrays are verified element by element, and category names must be a string array.
- **Cache.** A module-level `Map` keyed by the full request URL. Entries expire after 30 seconds; the map holds at most 50 entries; recent reads refresh insertion order; expired entries are removed. Only validated responses are cached.
- **Scope.** The cache is per tab, resets on reload, and does not deduplicate in-flight requests. It is a small session cache, not a CDN, server cache, or replacement for a query library.
- **Errors.** Search failures render one generic message with Try again and Clear search and filters. Category loading failure is isolated to the rail so search over the rest of the archive remains usable. No technical status or API detail is shown to the user.
- **Empty and range states.** Empty results explain the echoed query/category and offer a clear action. An out-of-range page reports the actual page count and offers a return to page 1 instead of rendering an empty grid.

## Decisions and trade-offs

- **Large in-page search line instead of a utility bar.** Search is the primary task; the trade-off is a taller first section and less room above the collection.
- **Five results per page instead of a dense grid.** The short edit protects image scale and legibility; the cost is more pagination interactions.
- **Category endpoint plus local filtering instead of sending both values.** The API cannot honor both, so the implementation keeps the category real and accepts local filtering. A production API should return a combined contract.
- **Replace history for typing, push history for refinements.** A sentence does not produce a history entry per keystroke; category and page changes remain navigable with Back.
- **Small custom cache instead of TanStack Query or SWR.** The observed repeat-request problem was narrow. The cost is no in-flight deduplication, retries, or cache invalidation beyond the TTL.
- **Native dialog instead of a custom modal.** The browser supplies focus containment, Escape handling, and modal semantics. Product URLs are not shareable.
- **Suspense with a null fallback.** The route builds as a static page, but the first static shell is blank until the client component is ready. A production refinement would keep a static header/search frame outside the boundary.
- **No new runtime dependencies.** The search, history, cache, dialog, and motion behavior use React, the browser platform, and the existing stack.

## Accessibility and responsiveness

The playground includes a skip link, a labelled search input with combobox semantics, `aria-expanded`, `aria-controls`, `aria-activedescendant`, a listbox of options, a polite result-count live region, and role-based empty/error/out-of-range messages. Suggestions are not separate tab stops; focus stays in the field while the active descendant moves.

The product dialog uses `showModal()`, moves focus to the close button, restores the previous trigger on close, and falls back to the search input if the trigger is gone. `Escape` is handled through the native `cancel` event. Body and document overflow are locked while open.

Interactive elements use a visible focus ring. Motion is limited to short entrances, hover transitions, a loading pulse, and the dialog entrance; `prefers-reduced-motion` removes those animations and disables smooth scrolling.

The layout moves from one column to two at `sm` and four at `lg`. The suggestion panel opens above the field below `md` and below it from `md` upward. The category rail scrolls horizontally, and the dialog becomes a full-height sheet on small screens.

## Performance and security

Performance measures are implementation-level: 500ms debounce, `AbortController` cancellation, stale-response guards, the 30-second cache, five-image pages, `next/image` with responsive `sizes`, and eager loading only for the first cards. No benchmark or field metric is claimed here, and the Lighthouse run above did not cover performance.

Search results are rendered through React's escaping path; the codebase does not use `dangerouslySetInnerHTML`. Remote images are allowlisted in `next.config.ts` for `https://cdn.dummyjson.com/product-images/**`. The public API is called without credentials.

A production integration would need a server boundary for API credentials, rate limiting, validation, logging, error diagnostics, and observability. None of those exist in this exercise.

## Testing

The repository uses Node's built-in test runner for pure utilities:

| File | Cases | Coverage |
| --- | --- | --- |
| `searchParams.test.mjs` | 6 | Query/page/category parsing, invalid page fallback, serialization, unrelated params, clean URLs |
| `selectProducts.test.mjs` | 8 | Category and query filtering, case normalization, pagination, combined filters, total-page maths |
| `formatProduct.test.mjs` | 2 | Category labels and USD formatting |

Current result: **16 passing tests**. TypeScript, ESLint, and the production build also complete successfully, and Next prerenders the landing, archive, journal, and not-found routes as static pages. A Lighthouse run against the production journal route reported **100 for Accessibility, Best Practices, and SEO**; the performance category was not audited.

These tests do not render components, exercise hooks, mock the network, test the cache, or cover end-to-end browser behavior. Browser checks of search, filtering, pagination, history, keyboard selection, dialog focus, cancellation, cache hits, slow responses, and failure/retry are documented in the journal.

## Browser concepts exercised

- Controlled inputs and derived state
- React effects, cleanup, reducers, and refs
- Debouncing and `AbortController`
- `fetch`, promises, response validation, and stale-response guards
- `URLSearchParams`, `history.pushState`, `history.replaceState`, and `popstate`
- Next.js App Router, Suspense, and `useSearchParams`
- `next/image` remote images and responsive sizes
- Native `<dialog>`, focus restoration, and modal semantics
- `prefers-reduced-motion` and CSS motion

## Known limitations

- DummyJSON is not a footwear catalogue. It includes beauty, groceries, furniture, and other categories, so the Northstar framing is a design exercise rather than a claim about the data.
- Suggestions come only from titles on the current result page. They are not a catalogue-wide typeahead index.
- Category + query filtering is local and downloads the full category. It does not scale to a large production catalogue.
- Product detail state is not represented in the URL.
- The client calls the public API directly. There is no server boundary, rate limiting, telemetry, or production error reporting.
- The playground's Suspense fallback is `null`, so the static shell is blank until hydration.
- Automated coverage is limited to utility functions; there are no hook, component, cache, network, or end-to-end tests.
- No production performance metrics, conversion data, or user research exist for this exercise.

## Commands

Requires Node.js and pnpm.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000/search-and-autocomplete` for the cover, `http://localhost:3000/search-and-autocomplete/playground` for the archive, and `http://localhost:3000/search-and-autocomplete/journal` for the case study.

```bash
pnpm lint
pnpm test
pnpm exec tsc --noEmit
pnpm build
pnpm start
```

`pnpm build` produces a static build of the current routes. `pnpm start` serves that build.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Zod
- Native `fetch`, `URLSearchParams`, History API, `<dialog>`, and CSS
- DummyJSON public product API

## Journal

The engineering journal lives at:

```text
/search-and-autocomplete/journal
```

Source: `src/features/search-and-autocomplete/journal/`. It covers the product brief, visual direction, interaction states, request architecture, the hard boundary cases, testing evidence, and the limitations above.
