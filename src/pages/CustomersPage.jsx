export default function CustomersPage() {
  const customers = [
    { id: 1, name: "Sophia Martinez", email: "sophia@example.com", spent: "$1,450.00", orders: 6 },
    { id: 2, name: "Liam Johnson", email: "liam@example.com", spent: "$890.50", orders: 3 },
    { id: 3, name: "Emma Watson", email: "emma@example.com", spent: "$2,340.00", orders: 12 },
    { id: 4, name: "Noah Davis", email: "noah@example.com", spent: "$320.00", orders: 1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Customer Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage and view registered customer accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {customers.map((c) => (
          <div key={c.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center">
              {c.name[0]}
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">{c.name}</h3>
              <p className="text-xs text-slate-400">{c.email}</p>
            </div>
            <div className="pt-3 border-t border-slate-700 flex justify-between text-xs">
              <span className="text-slate-400">Total Spent:</span>
              <span className="font-semibold text-emerald-400">{c.spent}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
