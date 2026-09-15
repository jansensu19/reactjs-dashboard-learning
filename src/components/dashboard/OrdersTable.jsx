import { useState, useMemo } from 'react'

export default function OrdersTable({ orders }) {
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [sortOrder, setSortOrder] = useState("desc"); // "asc" | "desc"

    const processedOrders = useMemo(() => {
        const filtered = orders.filter((order) => {
            const matchesSearch = order.customer
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesStatus =
                selectedStatus === "All" || order.status === selectedStatus;
            return matchesSearch && matchesStatus;
        });

        return filtered.sort((a, b) => {
            const amountA = parseFloat(a.amount.replace(/[^0-9.-]+/g, ""));
            const amountB = parseFloat(b.amount.replace(/[^0-9.-]+/g, ""));
            return sortOrder === "asc" ? amountA - amountB : amountB - amountA;
        });
    }, [orders, search, selectedStatus, sortOrder]);

    const getStatusBadge = (status) => {
        switch (status) {
            case "Completed":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "Pending":
                return "bg-amber-500/10 text-amber-400 border-amber-500/20";
            case "Cancelled":
                return "bg-rose-500/10 text-rose-400 border-rose-500/20";
            default:
                return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white">Recent Transactions</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Showing {processedOrders.length} filtered transactions
                    </p>                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <input type="text" placeholder="Search customer..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    />

                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors">
                        <option value="All">All Statuses</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>

                    {/* Sort */}
                    <button
                        onClick={() =>
                            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                        }
                        className="bg-slate-900 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 px-3 py-2 rounded-lg transition-colors"
                    >
                        Amount: {sortOrder === "asc" ? "Low → High ↑" : "High → Low ↓"}
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-700 text-xs font-semibold uppercase text-slate-400">
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50 text-sm">
                        {processedOrders.length > 0 ? (
                            processedOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-700/30 transition-colors">
                                    <td className="py-3.5 px-4 font-mono text-xs text-slate-400">{order.id}</td>
                                    <td className="py-3.5 px-4 text-white">{order.customer}</td>
                                    <td className="py-3.5 px-4 text-slate-400">{order.date}</td>
                                    <td className="py-3.5 px-4 font-semibold text-slate-200">{order.amount}</td>
                                    <td className="py-3.5 px-4 text-right">
                                        <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(order.status)}`}>{order.status}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">
                                    No orders found matching your criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
