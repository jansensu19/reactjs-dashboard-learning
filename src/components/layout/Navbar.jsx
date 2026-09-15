import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onMenuClick, onRefresh, loading }) {
    const { user } = useAuth();
    
    return (
        <header className="h-16 bg-slate-800 border-b border-slate-700 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
            {/* Left */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-lg bg-slate-700 text-slate-300 hover:text-white"
                >
                    ☰
                </button>
                <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    v1.0.0 Production
                </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                {user && (
                    <span className="hidden md:inline-block text-xs font-medium text-slate-300">
                        Hi, <strong className="text-white">{user.name.split(" ")[0]}</strong>
                    </span>
                )}


                <button
                    onClick={onRefresh || (() => window.location.reload())}
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 px-3.5 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                    {loading ? "Refreshing..." : "↻ Refresh"}
                </button>

                <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs text-slate-300">
                    🔔
                </div>
            </div>
        </header>
    );
}
