export type SearchState = {
  query: string;
  page: number;
  category: string;
};

export function parsePage(value: string | null): number {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function parseSearchState(params: URLSearchParams): SearchState {
  return {
    query: params.get("q") ?? "",
    page: parsePage(params.get("page")),
    category: params.get("category") ?? "",
  };
}

export function serializeSearchState(
  state: SearchState,
  base: URLSearchParams = new URLSearchParams(),
): URLSearchParams {
  const params = new URLSearchParams(base);

  if (state.query.trim()) {
    params.set("q", state.query);
  } else {
    params.delete("q");
  }

  if (state.page > 1) {
    params.set("page", String(state.page));
  } else {
    params.delete("page");
  }

  if (state.category) {
    params.set("category", state.category);
  } else {
    params.delete("category");
  }

  return params;
}

export function buildSearchUrl(
  pathname: string,
  params: URLSearchParams,
): string {
  const queryString = params.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}
