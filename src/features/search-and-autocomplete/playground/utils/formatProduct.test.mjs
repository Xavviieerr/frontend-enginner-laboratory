import assert from "node:assert/strict";
import { test } from "node:test";

import { formatCategoryLabel, formatPrice } from "./formatProduct.ts";

test("formatCategoryLabel expands API category slugs", () => {
  assert.equal(formatCategoryLabel("mens-shoes"), "Men's Shoes");
  assert.equal(formatCategoryLabel("womens-watches"), "Women's Watches");
  assert.equal(formatCategoryLabel("home-decoration"), "Home Decoration");
  assert.equal(formatCategoryLabel(""), "");
});

test("formatPrice formats USD values consistently", () => {
  assert.equal(formatPrice(149.99), "$149.99");
  assert.equal(formatPrice(80), "$80.00");
});
