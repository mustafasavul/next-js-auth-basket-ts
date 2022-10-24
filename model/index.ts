export interface Rating {
  rate?: number;
  count?: number;
}

export interface Product {
  forEach(arg0: (product: any) => void): unknown;
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: Rating;
}

export type ProductCardProps = {
  product?: Product;
}

export type CartOrderSummaryProps = {
  products?: Product;
}
