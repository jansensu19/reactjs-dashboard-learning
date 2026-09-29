import { statsData, recentOrders } from "../data/mockData";
import { DashboardDataResponse } from "../types";

export const fetchDashboardData = (errorTest = false): Promise<DashboardDataResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const simulateError = errorTest;

      if (simulateError) {
        reject(new Error("Failed to connect to the analytics server."));
      } else {
        resolve({
          stats: statsData,
          orders: recentOrders,
        });
      }
    }, 1200);
  });
};