import { useState, useEffect, useCallback } from "react";
import { fetchTicketsData } from "../services/ticketApi";
import { Ticket } from "../types";

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState<boolean>(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTicketsData(simulateError);
      setTickets(data.tickets);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch tickets";
      setError(message);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, [simulateError]);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const data = await fetchTicketsData(false);
        if (isMounted) {
          setTickets(data.tickets);
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : "Failed to load initial tickets";
          setError(message);
          setTickets([]);
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

  const deleteTicket = useCallback((ticketId: string) => {
    setTickets((prev) => prev.filter((tickets) => tickets.id !== ticketId));
  }, []);

  return {
    tickets,
    loading,
    error,
    simulateError,
    setSimulateError,
    refetch,
    deleteTicket,
  };
}