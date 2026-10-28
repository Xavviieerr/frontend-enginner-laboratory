export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock?: number;
  brand?: string;
  sku?: string;
  tags?: string[];
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  minimumOrderQuantity?: number;
  images: string[];
  thumbnail: string;
}

export interface ProductSearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type Pagination = {
  total: number;
  limit: number;
};

export type SearchStatus = "idle" | "loading" | "success" | "error";
