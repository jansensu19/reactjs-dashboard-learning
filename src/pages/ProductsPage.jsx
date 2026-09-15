import ProductsList from "../components/dashboard/ProductsList";
import { useProducts } from "../hooks/useProducts";

export default function ProductsPage() {
  const { products, loading, refetch, deleteProduct } = useProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Products List
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage inventory, stock levels, and product catalog.
          </p>
        </div>

        <button
          onClick={refetch}
          disabled={loading}
          className="self-start sm:self-auto inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-medium text-slate-200 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "↻ Refresh Data"}
        </button>
      </div>

      {loading ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center text-slate-400 animate-pulse">
          Loading products...
        </div>
      ) : (
        <ProductsList products={products} deleteProduct={deleteProduct} />
      )}
    </div>
  );
}
