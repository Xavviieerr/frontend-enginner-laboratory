import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildSearchUrl,
  parsePage,
  parseSearchState,
  serializeSearchState,
} from "./searchParams.ts";

test("parseSearchState reads query, page, and category", () => {
  const state = parseSearchState(
    new URLSearchParams("q=shoe&page=2&category=mens-shoes"),
  );

  assert.deepEqual(state, {
    query: "shoe",
    page: 2,
    category: "mens-shoes",
  });
});

test("parseSearchState falls back to an empty first page", () => {
  const state = parseSearchState(new URLSearchParams());

  assert.deepEqual(state, {
    query: "",
    page: 1,
    category: "",
  });
});

test("parsePage only accepts positive integers", () => {
  assert.equal(parsePage("2"), 2);
  assert.equal(parsePage(null), 1);
  assert.equal(parsePage("0"), 1);
  assert.equal(parsePage("-2"), 1);
  assert.equal(parsePage("2.5"), 1);
});

test("serializeSearchState writes non-default state and preserves unrelated params", () => {
  const params = serializeSearchState(
    {
      query: " red shoes ",
      page: 3,
      category: "womens-shoes",
    },
    new URLSearchParams("ref=home"),
  );

  assert.equal(
    params.toString(),
    "ref=home&q=+red+shoes+&page=3&category=womens-shoes",
  );
});

test("serializeSearchState removes empty and default values", () => {
  const params = serializeSearchState(
    {
      query: "   ",
      page: 1,
      category: "",
    },
    new URLSearchParams("q=old&page=4&category=old&ref=home"),
  );

  assert.equal(params.toString(), "ref=home");
});

test("buildSearchUrl omits the question mark when there are no params", () => {
  assert.equal(buildSearchUrl("/playground", new URLSearchParams()), "/playground");
  assert.equal(
    buildSearchUrl("/playground", new URLSearchParams("q=shoe")),
    "/playground?q=shoe",
  );
});
