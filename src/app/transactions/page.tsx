import OrdersTable from "../../components/dashboard/OrdersTable";
import { fetchDashboardData } from "../../services/api";

export default async function TransactionsPage() {
  const { orders } = await fetchDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Transactions & Orders
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Full audit history of customer payments and order statuses.
        </p>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}