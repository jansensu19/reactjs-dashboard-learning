import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      <span className="text-6xl font-black text-sky-500 mb-2">404</span>
      <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-sm mb-6">
        The route you are trying to access does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}