import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BrainCircuit, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in · DecisionPilot AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created. Check your email if confirmation is required.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 grid place-items-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10">
            <BrainCircuit className="h-5 w-5 text-cyan-400" />
          </div>
          <span className="text-lg font-bold">
            DecisionPilot <span className="text-indigo-400">AI</span>
          </span>
        </Link>

        <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 shadow-[0_0_60px_-15px_rgba(99,102,241,0.35)]">
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />
          <div className="relative">
            <h1 className="text-xl font-semibold">
              {mode === "signin" ? "Admin Login" : "Create admin account"}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Secure access to the DecisionPilot AI admin console.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-slate-950/60 border border-white/10 px-3 py-2.5 text-sm outline-none focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
                <input
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-slate-950/60 border border-white/10 px-3 py-2.5 text-sm outline-none focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/30"
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="relative w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_-5px_rgba(34,211,238,0.6)] hover:shadow-[0_0_35px_-5px_rgba(34,211,238,0.85)] transition-shadow disabled:opacity-60"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "signin" ? "Login as Admin" : "Create account"}
              </button>
            </form>

          <div className="mt-4 text-center text-xs text-slate-400">
            {mode === "signin" ? (
              <>
                No account?{" "}
                <button onClick={() => setMode("signup")} className="text-cyan-300 hover:text-cyan-200">
                  Create one
                </button>
              </>
            ) : (
              <>
                Have an account?{" "}
                <button onClick={() => setMode("signin")} className="text-cyan-300 hover:text-cyan-200">
                  Sign in
                </button>
              </>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
