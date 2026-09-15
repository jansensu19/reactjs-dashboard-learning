import { useState, useEffect, useCallback } from "react";
import { fetchProductsData } from "../services/productApi";

export function useProducts() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [simulateError, setSimulateError] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductsData(simulateError);
      setProduct(data.products);
    } catch (err) {
      setError(err.message || "Failed to fetch dashboard metrics");
      setProduct([]);
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
          setProduct(data.products);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load initial data");
          setProduct([]);
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

  const deleteProduct = useCallback((productId) => {
    setProduct((prev) => prev.filter((product) => product.id !== productId));
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
