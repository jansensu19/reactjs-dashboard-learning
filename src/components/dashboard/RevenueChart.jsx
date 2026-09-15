import { useState } from 'react'

export default function RevenueChart({ data, error, retryError }) {
  const [timeframe, setTimeframe] = useState("12m");
  const [hoveredBar, setHoveredBar] = useState(null);

  const displayData = timeframe === "6m" ? data.slice(6) : data;

  const maxRevenue = Math.max(...displayData.map((d) => d.revenue));

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Revenue Performance</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Gross revenue vs net profit overview
          </p>
        </div>

        <div className="flex bg-slate-900 border border-slate-700 rounded-lg p-1 self-start sm:self-auto">
          <button
            onClick={() => setTimeframe("6m")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${timeframe === "6m"
                ? "bg-sky-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
              }`}
          >
            Last 6 Months
          </button>
          <button
            onClick={() => setTimeframe("12m")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${timeframe === "12m"
                ? "bg-sky-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
              }`}
          >
            Full Year
          </button>
        </div>
      </div>

      {!error ? (
        <div className="relative pt-6">
          {hoveredBar && (
            <div className="absolute top-0 right-0 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs shadow-lg animate-fade-in flex items-center gap-3">
              <span className="font-semibold text-white">{hoveredBar.month}:</span>
              <span className="text-sky-400">
                Rev: ${hoveredBar.revenue.toLocaleString()}
              </span>
              <span className="text-emerald-400">
                Profit: ${hoveredBar.profit.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex items-end justify-between gap-2 h-52 pt-6 pb-2 border-b border-slate-700">
            {displayData.map((item) => {
              const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
              const isHovered = hoveredBar?.month === item.month;

              return (
                <div
                  key={item.month}
                  onMouseEnter={() => setHoveredBar(item)}
                  onMouseLeave={() => setHoveredBar(null)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                >
                  <div className="w-full max-w-9 bg-slate-700/50 rounded-t-md relative flex items-end justify-center overflow-hidden h-full">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-md transition-all duration-300 ${isHovered
                          ? "bg-sky-400 shadow-lg shadow-sky-500/20"
                          : "bg-sky-500/80 group-hover:bg-sky-400"
                        }`}
                    />
                  </div>
                  <span
                    className={`text-[11px] mt-2 transition-colors ${isHovered
                        ? "text-sky-400 font-bold"
                        : "text-slate-400 group-hover:text-slate-200"
                      }`}
                  >
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>) :
        (<div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl flex items-center justify-between">
          <span className="text-sm">{error}</span>
          <button
            onClick={retryError}
            className="text-xs bg-rose-500/20 hover:bg-rose-500/30 px-3 py-1 rounded-md text-rose-300 font-semibold"
          >
            Retry
          </button>
        </div>
        )}
    </div>
  );
}
