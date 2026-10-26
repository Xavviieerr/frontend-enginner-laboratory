import assert from "node:assert/strict";
import { test } from "node:test";

import {
  filterProductsByCategory,
  filterProductsByQuery,
  getTotalPages,
  paginateProducts,
  selectProducts,
} from "./selectProducts.ts";

const products = [
  {
    id: 1,
    title: "Nike Air Jordan",
    description: "A leather basketball sneaker in red and black.",
    category: "mens-shoes",
    brand: "Nike",
    tags: ["footwear", "basketball"],
  },
  {
    id: 2,
    title: "Calvin Klein Heel",
    description: "A sculptural evening shoe in black leather.",
    category: "womens-shoes",
    brand: "Calvin Klein",
    tags: ["footwear", "evening"],
  },
  {
    id: 3,
    title: "Puma Future Rider",
    description: "A retro trainer for everyday wear.",
    category: "mens-shoes",
    brand: "Puma",
    tags: ["footwear", "trainers"],
  },
  {
    id: 4,
    title: "Red Shoes",
    description: "A simple red pump with a low heel.",
    category: "womens-shoes",
    brand: "Fashion Express",
    tags: ["footwear", "red"],
  },
  {
    id: 5,
    title: "Black Slipper",
    description: "A soft padded slipper for the home.",
    category: "womens-shoes",
    brand: "Comfort Trends",
    tags: ["footwear", "home"],
  },
];

test("filterProductsByCategory keeps only matching products", () => {
  const matching = filterProductsByCategory(products, "mens-shoes");

  assert.deepEqual(
    matching.map((product) => product.id),
    [1, 3],
  );
});

test("filterProductsByCategory returns all products without a category", () => {
  assert.deepEqual(filterProductsByCategory(products, ""), products);
});

test("filterProductsByQuery matches title, description, brand, and tags", () => {
  assert.deepEqual(
    filterProductsByQuery(products, "jordan").map((product) => product.id),
    [1],
  );
  assert.deepEqual(
    filterProductsByQuery(products, "evening").map((product) => product.id),
    [2],
  );
  assert.deepEqual(
    filterProductsByQuery(products, "calvin klein").map((product) => product.id),
    [2],
  );
  assert.deepEqual(
    filterProductsByQuery(products, "basketball").map((product) => product.id),
    [1],
  );
});

test("filterProductsByQuery is case-insensitive and ignores blank queries", () => {
  assert.deepEqual(
    filterProductsByQuery(products, "  LEATHER ").map((product) => product.id),
    [1, 2],
  );
  assert.deepEqual(filterProductsByQuery(products, "   "), products);
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
  const page = selectProducts(products, 1, { category: "womens-shoes" });

  assert.deepEqual(
    page.products.map((product) => product.id),
    [2, 4, 5],
  );
  assert.deepEqual(page.pagination, { total: 3, limit: 5 });
});

test("selectProducts filters by category and query before paginating", () => {
  const page = selectProducts(products, 1, {
    category: "womens-shoes",
    query: "red",
  });

  assert.deepEqual(
    page.products.map((product) => product.id),
    [4],
  );
  assert.deepEqual(page.pagination, { total: 1, limit: 5 });
});

test("getTotalPages returns zero for a non-positive limit", () => {
  assert.equal(getTotalPages(5, 5), 1);
  assert.equal(getTotalPages(6, 5), 2);
  assert.equal(getTotalPages(0, 5), 0);
  assert.equal(getTotalPages(5, 0), 0);
});
