export const featureStructureCode = `src/app/search-and-autocomplete/
├─ layout.tsx          fonts + feature styles
├─ page.tsx            editorial cover
├─ playground/page.tsx interactive archive
└─ journal/page.tsx    this case study

src/features/search-and-autocomplete/
├─ landing/            cover composition
├─ playground/
│  ├─ api/             endpoints, request, cache
│  ├─ components/      input, results, cards, dialog
│  ├─ hooks/           URL, search, categories, autocomplete
│  ├─ types/           product + response contracts
│  ├─ utils/           filtering, paging, URL parsing
│  └─ validation/      query schema
├─ journal/            content + editorial shell
└─ styles/             tokens, type, motion, scrollbar`;

export const categoryStrategyCode = `if (hasCategory) {
  const data = await getProductsByCategory(category, signal);

  return selectProducts(data.products, page, {
    category,
    query: validQuery,
  });
}

if (validQuery) {
  return searchProducts({ query: validQuery, skip, limit });
}

return getProducts({ skip, limit });`;

export const raceCode = `const timer = window.setTimeout(() => {
  loadPage().then((pageResult) => {
    if (!isActive) return;

    dispatch({ type: "success", ...pageResult });
  });
}, 500);

return () => {
  isActive = false;
  window.clearTimeout(timer);
  controller.abort();
};`;

export const cacheCode = `const CACHE_TTL_MS = 30_000;
const MAX_CACHE_ENTRIES = 50;
const cache = new Map<string, CacheEntry>();

const cacheKey = url.toString();
const cachedData = getCachedSearch(cacheKey);

if (cachedData) return cachedData;`;

export const urlCode = `setQuery(query)      → history.replaceState()
setCategory(category) → history.pushState()
setPage(page)         → history.pushState()

window.addEventListener("popstate", () => {
  const next = parseSearchState(new URLSearchParams(location.search));
  setState(next);
});`;
