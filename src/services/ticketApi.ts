import { initialTickets } from "../data/mockData";
import { TicketsDataResponse } from "../types";

export const fetchTicketsData = (errorTest = false): Promise<TicketsDataResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const simulateError = errorTest;

      if (simulateError) {
        reject(new Error("Failed to connect to the ticket server."));
      } else {
        resolve({
          tickets: [...initialTickets],
        });
      }
    }, 1000);
  });
};