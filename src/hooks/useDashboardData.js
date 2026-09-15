import { useState, useEffect, useCallback } from "react";
import { fetchDashboardData } from "../services/api";

export function useDashboardData() {
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [simulateError, setSimulateError] = useState(false);

  // useCallback ensures this function's reference doesn't change on every render
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDashboardData(simulateError);
      setStats(data.stats);
      setOrders(data.orders);
    } catch (err) {
      setError(err.message || "Failed to fetch dashboard metrics");
      setStats([]);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [simulateError]);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const data = await fetchDashboardData(false);
        if (isMounted) {
          setStats(data.stats);
          setOrders(data.orders);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load initial data");
          setStats([]);
          setOrders([]);
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

  return {
    stats,
    orders,
    loading,
    error,
    simulateError,
    setSimulateError,
    refetch,
  };
}
