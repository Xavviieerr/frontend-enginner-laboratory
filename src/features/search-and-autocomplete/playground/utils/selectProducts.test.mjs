import assert from "node:assert/strict";
import { test } from "node:test";

import {
  filterProductsByCategory,
  getTotalPages,
  paginateProducts,
  selectProducts,
} from "./selectProducts.ts";

const products = [
  { id: 1, title: "One", category: "mens-shoes" },
  { id: 2, title: "Two", category: "womens-shoes" },
  { id: 3, title: "Three", category: "mens-shoes" },
  { id: 4, title: "Four", category: "mens-shoes" },
  { id: 5, title: "Five", category: "womens-shoes" },
];

test("filterProductsByCategory keeps only matching products", () => {
  const matching = filterProductsByCategory(products, "mens-shoes");

  assert.deepEqual(
    matching.map((product) => product.id),
    [1, 3, 4],
  );
});

test("filterProductsByCategory returns all products without a category", () => {
  assert.deepEqual(filterProductsByCategory(products, ""), products);
});

test("paginateProducts slices results and reports the total", () => {
  const page = paginateProducts(products, 2, 2);

  assert.deepEqual(
    page.products.map((product) => product.id),
    [3, 4],
  );
  assert.deepEqual(page.pagination, { total: 5, limit: 2 });
});

test("selectProducts filters by category before paginating", () => {
  const page = selectProducts(products, 1, "mens-shoes");

  assert.deepEqual(
    page.products.map((product) => product.id),
    [1, 3, 4],
  );
  assert.deepEqual(page.pagination, { total: 3, limit: 5 });
});

test("getTotalPages returns zero for a non-positive limit", () => {
  assert.equal(getTotalPages(5, 5), 1);
  assert.equal(getTotalPages(6, 5), 2);
  assert.equal(getTotalPages(0, 5), 0);
  assert.equal(getTotalPages(5, 0), 0);
});
