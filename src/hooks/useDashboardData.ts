import { useState, useEffect, useCallback } from "react";
import { fetchDashboardData } from "../services/api";
import { DashboardStat, Order } from "../types";

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState<boolean>(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDashboardData(simulateError);
      setStats(data.stats);
      setOrders(data.orders);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch dashboard metrics";
      setError(message);
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
          const message = err instanceof Error ? err.message : "Failed to load initial data";
          setError(message);
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