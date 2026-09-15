import { statsData, recentOrders } from '../data/mockData'

export const fetchDashboardData = (errorTest = false) => {
  return new Promise ((resolve, reject) =>{
    setTimeout(() => {
        const simulateError = errorTest;

        if (simulateError){
            reject(new Error("Failed to connect to the analytics server."));
        } else {
            resolve({
                stats: statsData,
                orders: recentOrders,
            });
        }
    }, 1200);
  })
}
