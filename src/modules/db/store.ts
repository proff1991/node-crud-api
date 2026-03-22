import { Product } from "../models/product.model";

const products = new Map<string, Product>();

export const productStore = {
  getAll: (): Product[] => {
    return Array.from(products.values());
  },

  getById: (id: string): Product | undefined => {
    return products.get(id);
  },

  create: (product: Product): void => {
    products.set(product.id, product);
  },

  update: (id: string, product: Product): void => {
    products.set(id, product);
  },

  delete: (id: string): boolean => {
    return products.delete(id);
  },
};