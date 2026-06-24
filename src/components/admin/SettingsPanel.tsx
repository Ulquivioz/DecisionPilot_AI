import { useState } from "react";
import { Bell, User, Mail, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SettingsPanel() {
  const [provider, setProvider] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const [retention, setRetention] = useState("90");
  const [notifyAppointments, setNotifyAppointments] = useState(true);
  const [notifySystem, setNotifySystem] = useState(false);
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@decisionpilot.ai");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* AI Configuration */}
      <GlassCard
        icon={<Cpu className="h-5 w-5 text-cyan-300" />}
        title="AI Configuration"
        description="Choose the model that powers your decisions."
      >
        <Field label="Model Provider">
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger className="bg-slate-950/60 border-white/10 text-slate-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-slate-100">
              <SelectItem value="openai">OpenAI · GPT-4o</SelectItem>
              <SelectItem value="anthropic">Anthropic · Claude 3.5</SelectItem>
              <SelectItem value="google">Google · Gemini 1.5 Pro</SelectItem>
              <SelectItem value="mistral">Mistral · Large</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="API Key" icon={<KeyRound className="h-3.5 w-3.5" />}>
          <Input
            type="password"
            placeholder="sk-••••••••••••••••••••"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-slate-950/60 border-white/10 text-slate-100 placeholder:text-slate-600"
          />
          <p className="text-xs text-slate-500 mt-2">Stored encrypted. Never exposed to the browser.</p>
        </Field>
        <SaveButton onClick={() => toast.success("AI configuration saved")} />
      </GlassCard>

      {/* Data & Privacy */}
      <GlassCard
        icon={<Database className="h-5 w-5 text-cyan-300" />}
        title="Data & Privacy"
        description="Control how long your data lives in our systems."
      >
        <Field label="Data Retention">
          <Select value={retention} onValueChange={setRetention}>
            <SelectTrigger className="bg-slate-950/60 border-white/10 text-slate-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-slate-100">
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
              <SelectItem value="180">6 months</SelectItem>
              <SelectItem value="365">1 year</SelectItem>
              <SelectItem value="forever">Indefinite</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-red-200">Danger zone</div>
              <p className="text-xs text-slate-400 mt-1">
                Permanently delete all embeddings, documents, and training data. This cannot be undone.
              </p>
            </div>
          </div>
          <Button
            onClick={() => toast.error("Knowledge base cleared (demo)")}
            className="mt-4 w-full bg-red-500/90 hover:bg-red-500 text-white border border-red-400/30"
          >
            <Trash2 className="h-4 w-4" />
            Clear Knowledge Base
          </Button>
        </div>
      </GlassCard>

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
