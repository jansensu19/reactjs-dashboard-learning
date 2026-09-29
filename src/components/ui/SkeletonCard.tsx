export default function SkeletonCard() {
  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 animate-pulse">
      <div className="h-4 bg-slate-700 rounded w-1/2 mb-3"></div>
      <div className="flex justify-between items-baseline">
        <div className="h-7 bg-slate-700 rounded w-1/3"></div>
        <div className="h-5 bg-slate-700 rounded w-1/5"></div>
      </div>
    </div>
  );
}
