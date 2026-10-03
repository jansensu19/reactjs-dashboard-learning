import SkeletonCard from "../components/ui/SkeletonCard";
import SkeletonRevenueChart from "../components/ui/SkeletonRevenueChart";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-48 bg-slate-800 rounded-lg animate-pulse" />
        <div className="h-4 w-72 bg-slate-800/60 rounded mt-2 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      <SkeletonRevenueChart />

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center text-slate-400 animate-pulse">
        Loading dashboard metrics...
      </div>
    </div>
  );
}