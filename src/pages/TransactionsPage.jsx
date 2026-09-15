import OrdersTable from "../components/dashboard/OrdersTable";
import { useDashboardData } from "../hooks/useDashboardData";

export default function TransactionsPage() {
  const { orders, loading } = useDashboardData();

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

      {loading ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center text-slate-400 animate-pulse">
          Loading transactions...
        </div>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </div>
  );
}
