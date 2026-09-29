import { initialProducts } from "../data/mockData";
import { ProductsDataResponse } from "../types";

export const fetchProductsData = (errorTest = false): Promise<ProductsDataResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const simulateError = errorTest;

      if (simulateError) {
        reject(new Error("Failed to connect to the inventory server."));
      } else {
        resolve({
          products: [...initialProducts],
        });
      }
    }, 1000);
  });
};