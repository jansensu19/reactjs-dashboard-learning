import { initialProducts } from "../data/mockData";
import { Product, ProductsDataResponse } from "../types";

let productsStore: Product[] = [...initialProducts];

export const fetchProductsData = async (errorTest = false): Promise<ProductsDataResponse> => {
  if (errorTest) {
    throw new Error("Failed to connect to the inventory server.");
  }
  return { products: [...productsStore] };
};

export const addProduct = async (product: Product): Promise<Product> => {
  productsStore = [product, ...productsStore];
  return product;
};

export const deleteProduct = async (productId: string): Promise<boolean> => {
  productsStore = productsStore.filter((p) => p.id !== productId);
  return true;
};