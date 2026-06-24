import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BrainCircuit, LayoutDashboard, CalendarCheck2, Settings, Loader2, Mail, Building2, Clock, FileText, Users, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SettingsPanel } from "@/components/admin/SettingsPanel";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin · DecisionPilot AI" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Appointment = {
  id: string;
  created_at: string;
  full_name: string;
  work_email: string;
  company_name: string;
  requirements: string | null;
  status: string;
};

function AdminPage() {
  const [view, setView] = useState<"dashboard" | "appointments" | "settings">("appointments");
  const [rows, setRows] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load appointments");
    setRows((data as Appointment[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const prev = rows;
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    if (error) {
      setRows(prev);
      toast.error("Failed to update status");
    } else {
      toast.success("Status updated");
    }
  };

  const pending = rows.filter((r) => r.status === "Pending").length;
  const contacted = rows.filter((r) => r.status === "Contacted").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-white/5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10">
            <BrainCircuit className="h-5 w-5 text-cyan-400" />
          </div>
          <span className="text-base font-bold">
            DecisionPilot <span className="text-indigo-400">AI</span>
          </span>
        </Link>
        <nav className="p-3 space-y-1 text-sm">
          <SideItem active={view === "dashboard"} onClick={() => setView("dashboard")} icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" />
          <SideItem active={view === "appointments"} onClick={() => setView("appointments")} icon={<CalendarCheck2 className="h-4 w-4" />} label="Appointments" />
          <SideItem active={view === "settings"} onClick={() => setView("settings")} icon={<Settings className="h-4 w-4" />} label="Settings" />
        </nav>
        <div className="mt-auto p-4 text-xs text-slate-500 border-t border-white/5">Admin Console</div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold capitalize">{view}</h1>
          <Link to="/" className="text-xs text-slate-400 hover:text-white">← Back to site</Link>
        </header>

        <div className="p-6">
          {view === "dashboard" && (
            <div className="grid sm:grid-cols-3 gap-4">
              <Stat icon={<Users />} label="Total Leads" value={rows.length} />
              <Stat icon={<Clock />} label="Pending" value={pending} accent="indigo" />
              <Stat icon={<TrendingUp />} label="Contacted" value={contacted} accent="cyan" />
            </div>
          )}

          {view === "settings" && <SettingsPanel />}

          {view === "appointments" && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-20 text-slate-400">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading…
                </div>
              ) : rows.length === 0 ? (
                <div className="py-20 text-center text-slate-400">No appointments yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-400">
                      <tr>
                        <Th>Name</Th>
                        <Th>Company</Th>
                        <Th>Email</Th>
                        <Th>Submitted</Th>
                        <Th>Notes</Th>
                        <Th>Status</Th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {rows.map((r) => (
                        <tr key={r.id} className="hover:bg-white/[0.02] transition">
                          <Td>
                            <div className="font-medium text-slate-100">{r.full_name}</div>
                            <div className="text-xs text-slate-500">{new Date(r.created_at).toLocaleDateString()}</div>
                          </Td>
                          <Td><span className="inline-flex items-center gap-1.5 text-slate-300"><Building2 className="h-3.5 w-3.5 text-slate-500" />{r.company_name}</span></Td>
                          <Td><a href={`mailto:${r.work_email}`} className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200"><Mail className="h-3.5 w-3.5" />{r.work_email}</a></Td>
                          <Td className="whitespace-nowrap text-slate-300">{new Date(r.created_at).toLocaleString()}</Td>
                          <Td>
                            <div className="max-w-xs flex items-start gap-1.5 text-slate-400 text-xs">
                              <FileText className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-600" />
                              <span className="line-clamp-2">{r.requirements || "—"}</span>
                            </div>
                          </Td>
                          <Td>
                            <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                              <SelectTrigger className={`h-8 w-[130px] bg-slate-950/60 border-white/10 text-xs ${r.status === "Contacted" ? "text-cyan-300" : "text-indigo-300"}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-900 border-white/10 text-slate-100">
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Contacted">Contacted</SelectItem>
                              </SelectContent>
                            </Select>
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SideItem({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
        active
          ? "bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 border border-cyan-400/20 text-white"
          : "text-slate-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Stat({ icon, label, value, accent = "indigo" }: { icon: React.ReactNode; label: string; value: number; accent?: "indigo" | "cyan" }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">{label}</span>
        <div className={`grid h-9 w-9 place-items-center rounded-lg ${accent === "cyan" ? "bg-cyan-500/15 text-cyan-300" : "bg-indigo-500/15 text-indigo-300"}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">{value}</div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-left font-semibold">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
