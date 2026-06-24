import { useState } from "react";
import { Bell, User, Mail, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SettingsPanel() {
  const [notifyAppointments, setNotifyAppointments] = useState(true);
  const [notifySystem, setNotifySystem] = useState(false);
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@decisionpilot.ai");

  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {/* Notifications */}
      <GlassCard
        icon={<Bell className="h-5 w-5 text-cyan-300" />}
        title="Notifications"
        description="Choose what lands in your inbox."
      >
        <ToggleRow
          title="New Appointments"
          description="Get notified the moment a lead books a call."
          checked={notifyAppointments}
          onChange={setNotifyAppointments}
        />
        <ToggleRow
          title="System Alerts"
          description="Outages, model changes, and usage thresholds."
          checked={notifySystem}
          onChange={setNotifySystem}
        />
        <SaveButton onClick={() => toast.success("Notification preferences saved")} />
      </GlassCard>

      {/* Profile */}
      <GlassCard
        icon={<User className="h-5 w-5 text-cyan-300" />}
        title="Profile"
        description="How you appear across the workspace."
      >
        <Field label="Full Name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-950/60 border-white/10 text-slate-100"
          />
        </Field>
        <Field label="Email Address" icon={<Mail className="h-3.5 w-3.5" />}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-950/60 border-white/10 text-slate-100"
          />
        </Field>
        <SaveButton onClick={() => toast.success("Profile updated")} />
      </GlassCard>
    </div>
  );
}

function GlassCard({
  icon, title, description, children,
}: { icon: React.ReactNode; title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 overflow-hidden group">
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 blur-3xl opacity-60 group-hover:opacity-90 transition" />
      <div className="relative">
        <div className="flex items-start gap-3 mb-6">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10">
            {icon}
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">{title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <Label className="text-xs uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
        {icon}{label}
      </Label>
      {children}
    </div>
  );
}

function ToggleRow({
  title, description, checked, onChange,
}: { title: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div className="pr-4">
        <div className="text-sm font-medium text-slate-100">{title}</div>
        <div className="text-xs text-slate-400 mt-0.5">{description}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 text-white border-0"
    >
      <Save className="h-4 w-4" />
      Save Changes
    </Button>
  );
}
