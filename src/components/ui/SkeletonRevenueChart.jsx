export default function SkeletonRevenueChart() {
  // Varied heights to make the loading chart look natural and realistic
  const skeletonBarHeights = [
    "40%", "65%", "45%", "80%", "55%", "70%", 
    "60%", "90%", "75%", "85%", "65%", "95%"
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="h-5 bg-slate-700 rounded w-44 mb-2" />
          <div className="h-3 bg-slate-700/60 rounded w-60" />
        </div>

        <div className="h-7 bg-slate-700/50 rounded-lg w-44 self-start sm:self-auto" />
      </div>

      <div className="relative pt-6">
        <div className="flex items-end justify-between gap-2 h-52 pt-6 pb-2 border-b border-slate-700">
          {skeletonBarHeights.map((height, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center h-full justify-end"
            >
              <div className="w-full max-w-9 bg-slate-700/30 rounded-t-md relative flex items-end justify-center h-full">
                <div
                  style={{ height }}
                  className="w-full bg-slate-700/70 rounded-t-md"
                />
              </div>

              <div className="h-2.5 w-6 bg-slate-700/60 rounded mt-2.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}