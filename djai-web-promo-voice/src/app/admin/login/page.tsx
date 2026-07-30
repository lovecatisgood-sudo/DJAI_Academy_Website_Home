import { loginAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form
        action={loginAction}
        className="w-full max-w-sm rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl"
      >
        <div className="mb-6">
          <div className="text-sm font-semibold text-cyan-200">DJAI Admin</div>
          <h1 className="mt-2 text-2xl font-semibold text-white">Sign in</h1>
          {params.error ? (
            <p className="mt-3 text-sm text-red-200">
              {params.error === "rate" ? "Too many attempts. Try again shortly." : "Invalid admin credentials."}
            </p>
          ) : null}
        </div>
        <label className="mb-4 block text-sm text-slate-300">
          Username
          <input
            name="username"
            className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white"
            autoComplete="username"
            required
          />
        </label>
        <label className="mb-6 block text-sm text-slate-300">
          Password
          <input
            name="password"
            type="password"
            className="mt-2 w-full rounded-md border border-white/10 bg-[#0a1128] px-3 py-2 text-white"
            autoComplete="current-password"
            required
          />
        </label>
        <button className="w-full rounded-md bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2 font-semibold text-white">
          Sign in
        </button>
      </form>
    </main>
  );
}
