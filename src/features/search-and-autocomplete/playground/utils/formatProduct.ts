const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

export function formatCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((word, index) => {
      if (index === 0 && word === "mens") {
        return "Men's";
      }

      if (index === 0 && word === "womens") {
        return "Women's";
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
