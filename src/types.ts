export type Product = {
  name: string;
  gtin: string;
  recommendedRetailPrice: number;
  recommendedRetailPriceCurrency: string;
  imageUrl?: string;
  brandName?: string;
  categoryName?: string;
};

export type Cart = {
  [s: string]: Product & {
    quantity: number;
    subtotal: number;
  };
};

export type CartItem = Product & {
  quantity?: string;
};

export type RemoveCartItem = {
  gtin: string;
};

export type AddQuantityItem = {
  gtin: string;
  newQuantity?: string;
};

/**
 * The response type of errors from /api/*.
 */
export type ErrorResponse = string;

/**
 * The response type of /api/products
 */
export type ProductsResponse = {
  count: number;
  page: number;
  results: Product[];
};

/**
 * The response type of /api/products/[gtin].
 */
export type ProductResponse = Product;
