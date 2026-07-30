import { logoutAction } from "./actions";
import { AdminNav } from "./AdminNav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#050b1d] px-4 py-5 text-slate-100 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-cyan-200">DJAI Academy</div>
            <h1 className="mt-1 text-2xl font-semibold text-white">Voice Sales Agent</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <AdminNav />
            <form action={logoutAction}>
              <button className="rounded-md border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm text-red-100">
                Logout
              </button>
            </form>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
