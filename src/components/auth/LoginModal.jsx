import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [role, setRole] = useState("Admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name, role);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-sky-500 text-slate-950 font-black text-2xl flex items-center justify-center mx-auto">
            R
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Sign in to Dashboard
          </h2>
          <p className="text-xs text-slate-400">
            Enter your name to simulate authenticated access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Assigned Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Analyst">Analyst</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-sky-500/20"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
