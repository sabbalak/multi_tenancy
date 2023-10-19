import { ProductCategory } from "./enum";

export interface Product {
    id: string;
    title: string;
    description: string;
    category: ProductCategory;
  }