import MetricCard from "../components/ui/MetricCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import OrdersTable from "../components/dashboard/OrdersTable";
import ProductsList from "../components/dashboard/ProductsList";
import { fetchDashboardData } from "../services/api";
import { fetchProductsData } from "../services/productApi";
import { monthlyRevenue } from "../data/mockData";

export default async function DashboardPage() {
    const [{stats, orders}, {products}] = await Promise.all([
        fetchDashboardData(),
        fetchProductsData()
    ]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Overview
          </h1>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Server Component (RSC)
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Store performance and high-level activity metrics.
        </p>
      </div>
      {/* Metric Cards (Pure Server Components) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <MetricCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={stat.isPositive}
          />
        ))}
      </section>
      {/* Interactive Charts & Tables (Client Islands) */}
      <section>
        <RevenueChart data={monthlyRevenue} />
      </section>
      <section>
        <OrdersTable orders={orders} />
      </section>
      <section>
        <ProductsList products={products} />
      </section>
    </div>
  );
}