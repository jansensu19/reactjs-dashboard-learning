import { useState, useEffect, useCallback } from "react";
import { fetchProductsData } from "../services/productApi";
import { Product } from "../types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState<boolean>(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductsData(simulateError);
      setProducts(data.products);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch products";
      setError(message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [simulateError]);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const data = await fetchProductsData(false);
        if (isMounted) {
          setProducts(data.products);
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : "Failed to load initial products";
          setError(message);
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  }, []);

  return {
    products,
    loading,
    error,
    simulateError,
    setSimulateError,
    refetch,
    deleteProduct,
  };
}