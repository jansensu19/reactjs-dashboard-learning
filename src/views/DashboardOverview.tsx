import MetricCard from "../components/ui/MetricCard";
import SkeletonCard from "../components/ui/SkeletonCard";
import SkeletonRevenueChart from "../components/ui/SkeletonRevenueChart";
import RevenueChart from "../components/dashboard/RevenueChart";
import OrdersTable from "../components/dashboard/OrdersTable";
import { useDashboardData } from "../hooks/useDashboardData";
import { useProducts } from "../hooks/useProducts";
import { monthlyRevenue } from "../data/mockData";
import ProductsList from "../components/dashboard/ProductsList";

export default function DashboardOverview() {
  const { stats, orders, loading: dashboardLoading, error: dashboardError, refetch: refetchDashboard } = useDashboardData();

  const { products, loading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();

  const handleRetry = () => { 
    refetchDashboard(); 
    refetchProducts();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Store performance and high-level activity metrics.
        </p>
      </div>

      {(dashboardError || productsError) && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl flex items-center justify-between">
          <span className="text-sm">{dashboardError || productsError}</span>
          <button onClick={handleRetry}
            className="text-xs bg-rose-500/20 hover:bg-rose-500/30 px-3 py-1 rounded-md text-rose-300 font-semibold"
          >
            Retry
          </button>
        </div>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : stats.map((stat) => (
            <MetricCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              isPositive={stat.isPositive}
            />
          ))}
      </section>

      <section>
        {dashboardLoading ? (
          <SkeletonRevenueChart />
        ) : (
          <RevenueChart data={monthlyRevenue} />
        )}
      </section>

      <section>
        {dashboardLoading ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center text-slate-400 animate-pulse">
            Loading transactions...
          </div>
        ) : (
          <OrdersTable orders={orders} />
        )}
      </section>

      <section>
        {productsLoading ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center text-slate-400 animate-pulse">
            Loading products...
          </div>
        ) : (
          <ProductsList products={products} />
        )}
      </section>
    </div>
  );
}
