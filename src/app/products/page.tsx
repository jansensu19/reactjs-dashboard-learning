import ProductsList from "../../components/dashboard/ProductsList";
import { fetchProductsData } from "../../services/productApi";

export default async function ProductsPage() {
  const { products } = await fetchProductsData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Inventory Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage inventory, stock levels, and product catalog.
        </p>
      </div>

      <ProductsList products={products} />
    </div>
  );
}