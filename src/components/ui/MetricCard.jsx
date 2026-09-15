export default function MetricCard({ title, value, change, isPositive }) {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm hover:border-slate-600 transition-colors">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">
                    {value}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full 
                    ${isPositive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                    "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
                    {change}
                </span>
            </div>
        </div>
    );
}
