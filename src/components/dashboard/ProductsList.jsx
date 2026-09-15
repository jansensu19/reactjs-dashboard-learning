import { useState, useMemo } from 'react'
import { useAuth } from "../../context/AuthContext";
import ProductsEditor from "../ui/ProductsEditor";

export default function ProductsList({ products }) {
    const { user } = useAuth();
    const isAdmin = user?.role === "Admin";
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [sortBy, setSortBy] = useState("price")
    const [sortStock, setSortStock] = useState("desc");
    const [sortPrice, setSortPrice] = useState("desc");
    const categories = [...new Set(products.map((product) => product.category))];
    const [productList, setProductList] = useState(products);
    const [prevProducts, setPrevProducts] = useState(products);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (products !== prevProducts) {
        setPrevProducts(products);
        setProductList(products);
    }

    const deleteProduct = (productId) => {
        setProductList((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    };

    const handleAddProduct = (newProduct) => {
        setProductList((prev) => [newProduct, ...prev]);
    };

    const processedProducts = useMemo(() => {
        const filtered = productList.filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                categoryFilter === "All" ||
                product.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });

        return [...filtered].sort((a, b) => {
            if (sortBy === "price") {
                const priceA = Number(a.price);
                const priceB = Number(b.price);

                return sortPrice === "asc"
                    ? priceA - priceB
                    : priceB - priceA;
            }

            if (sortBy === "stock") {
                const stockA = Number(a.stock);
                const stockB = Number(b.stock);

                return sortStock === "asc"
                    ? stockA - stockB
                    : stockB - stockA;
            }

            return 0;
        });
    }, [
        productList,
        search,
        categoryFilter,
        sortBy,
        sortPrice,
        sortStock,
    ]);

    const getStatusBadge = (status) => {
        switch (status) {
            case "In Stock":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "Low Stock":
                return "bg-amber-500/10 text-amber-400 border-amber-500/20";
            case "Out of Stock":
                return "bg-rose-500/10 text-rose-400 border-rose-500/20";
            default:
                return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }
    };


    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white">Products List</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Showing {processedProducts.length} filtered Products
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <input type="text" placeholder="Search product..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    />

                    {isAdmin &&
                        <button onClick={() => setIsModalOpen(true)} className="bg-slate-900 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 px-3 py-2 rounded-lg transition-colors">Add Product</button>
                    }
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-3">
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors">
                        <option value="All">All Products</option>
                        {categories.map((category) => {
                            return (
                                <option value={category}>{category}</option>
                            )
                        })}
                    </select>

                    <button
                        onClick={() => {
                            setSortBy("price");
                            setSortPrice((prev) => (prev === "asc" ? "desc" : "asc"))
                        }
                        }
                        className="bg-slate-900 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 px-3 py-2 rounded-lg transition-colors"
                    >
                        Price: {sortPrice === "asc" ? "Low → High ↑" : "High → Low ↓"}
                    </button>
                    <button
                        onClick={() => {
                            setSortBy("stock");
                            setSortStock((prev) => (prev === "asc" ? "desc" : "asc"))
                        }
                        }
                        className="bg-slate-900 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 px-3 py-2 rounded-lg transition-colors"
                    >
                        Stock: {sortStock === "asc" ? "Low → High ↑" : "High → Low ↓"}
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-700 text-xs font-semibold uppercase text-slate-400">
                            <th className="py-3 px-4">Product ID</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Stock</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4 text-right">Status</th>
                            {isAdmin &&
                                <th className="py-3 px-4 text-right">Actions</th>
                            }
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50 text-sm">
                        {processedProducts.length > 0 ? (
                            processedProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-700/30 transition-colors">
                                    <td className="py-3.5 px-4 font-mono text-xs text-slate-400">{product.id}</td>
                                    <td className="py-3.5 px-4 text-white">{product.name}</td>
                                    <td className="py-3.5 px-4 text-slate-400">{product.stock}</td>
                                    <td className="py-3.5 px-4 text-green-400">{product.category}</td>
                                    <td className="py-3.5 px-4 font-semibold text-slate-200">{product.price}</td>
                                    <td className="py-3.5 px-4 text-right">
                                        <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(product.status)}`}>{product.status}</span>
                                    </td>
                                    <td className="py-3.5 px-4 text-right">
                                        {isAdmin &&
                                            <button onClick={() => deleteProduct(product.id)} className="bg-red-900 hover:bg-slate-700 border border-red-700 text-xs font-semibold text-red-300 px-3 py-2 rounded-lg transition-colors">Delete</button>
                                        }
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={isAdmin ? 7 : 6} className="py-8 text-center text-slate-500 text-sm">
                                    No product found matching your criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <ProductsEditor
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddProduct}
                categories={categories}
            />
        </div>
    )
}
