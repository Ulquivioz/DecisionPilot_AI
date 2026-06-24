import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BrainCircuit, Database, MessageSquareOff, EyeOff, FileText, Search,
  Sparkles, BarChart3, Network, Server, Shield, Users, Upload,
  Lock, Cpu, ArrowRight, Check, Terminal, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentModal } from "@/components/AppointmentModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DecisionPilot AI — Turn private data into decisions" },
      { name: "description", content: "Privacy-first hybrid RAG + ML business intelligence platform." },
    ],
  }),
  component: Landing,
});

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10">
        <BrainCircuit className="h-5 w-5 text-cyan-400" />
      </div>
      <span className="text-lg font-bold tracking-tight">
        DecisionPilot <span className="text-indigo-400">AI</span>
      </span>
    </Link>
  );
}

function GradientButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick: () => void; className?: string }) {
  return (
    <Button
      onClick={onClick}
      className={`bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white border-0 shadow-[0_0_30px_-5px_rgba(99,102,241,0.7)] hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.8)] transition-all ${className}`}
    >
      {children}
    </Button>
  );
}

function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

function Landing() {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Ambient gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#how" className="hover:text-white transition">How it Works</a>
            <a href="#use-cases" className="hover:text-white transition">Use Cases</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
          </div>
          <GradientButton onClick={openModal} className="text-sm">Make an Appointment</GradientButton>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Privacy-first hybrid RAG + ML intelligence
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Turn private company data into{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                business decisions.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-xl">
              DecisionPilot AI is a privacy-first business intelligence platform that combines private document search, predictive machine learning, and company-configured LLMs to help teams make better decisions from their own data.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GradientButton onClick={openModal} className="h-12 px-6 text-base">
                Make an Appointment <ArrowRight className="ml-2 h-4 w-4" />
              </GradientButton>
              <a href="#features">
                <Button variant="outline" className="h-12 px-6 text-base bg-transparent border-white/10 text-slate-100 hover:bg-white/5 hover:text-white">
                  Explore platform
                </Button>
              </a>
            </div>
          </div>

          {/* Mockup */}
          <Glass className="p-6 sm:p-8 shadow-[0_0_80px_-20px_rgba(99,102,241,0.4)]">
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-4">Intelligence Flow</div>
            <div className="space-y-3">
              <FlowNode icon={<Database className="h-5 w-5" />} title="Company Data" sub="Docs · CSVs · CRMs · Drives" tone="indigo" />
              <FlowArrow />
              <FlowNode icon={<Network className="h-5 w-5" />} title="Hybrid AI Router" sub="RAG · ML · LLM orchestration" tone="cyan" highlight />
              <FlowArrow />
              <FlowNode icon={<Sparkles className="h-5 w-5" />} title="Actionable Insights" sub="Decisions · forecasts · answers" tone="indigo" />
            </div>
          </Glass>
        </div>
      </section>

      {/* Problem */}
      <Section id="problem" eyebrow="The challenge" title="The problem with modern AI">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Database />, title: "Scattered Data Silos", desc: "Knowledge buried across drives, tools, and inboxes." },
            { icon: <MessageSquareOff />, title: "Generic Chatbot Answers", desc: "Public LLMs know the internet, not your business." },
            { icon: <EyeOff />, title: "Blind Spots for Public LLMs", desc: "Sensitive data can't be sent to external models." },
            { icon: <FileText />, title: "Summaries Aren't Decisions", desc: "Recaps don't tell you what action to take next." },
          ].map((c) => (
            <Glass key={c.title} className="p-6 hover:bg-white/[0.05] transition">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-cyan-400">
                {c.icon}
              </div>
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{c.desc}</p>
            </Glass>
          ))}
        </div>
      </Section>

      {/* Solution */}
      <Section id="solution" eyebrow="Our approach" title="The intelligent hybrid solution">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            {[
              { title: "Centralize your knowledge", desc: "Ingest documents, CSVs, and structured data into a private, tenant-isolated index." },
              { title: "Ask in natural language", desc: "Employees ask business questions in plain English — no SQL, no dashboards." },
              { title: "Dynamic AI Execution", desc: "The Hybrid Router picks the best engine — RAG, ML, or LLM — per question." },
            ].map((s, i) => (
              <div key={s.title} className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white text-sm font-bold shadow-[0_0_20px_-5px_rgba(99,102,241,0.7)]">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold">{s.title}</h4>
                  <p className="mt-1 text-sm text-slate-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Glass className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-slate-500">Decision Output</span>
              <span className="rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-cyan-400/30 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-cyan-300">HYBRID</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Based on Q3 churn data and renewal contracts, prioritize 14 at-risk enterprise accounts. Recommended action: assign dedicated CSM and offer 12-month renewal discount.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Confidence</span><span className="text-cyan-300 font-semibold">93%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full w-[93%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
              </div>
            </div>
            <div className="mt-4 flex gap-2 text-[11px] text-slate-400">
              <span className="rounded-md bg-white/5 px-2 py-1 border border-white/10">RAG · 4 docs</span>
              <span className="rounded-md bg-white/5 px-2 py-1 border border-white/10">ML · churn model</span>
              <span className="rounded-md bg-white/5 px-2 py-1 border border-white/10">LLM · synthesis</span>
            </div>
          </Glass>
        </div>
      </Section>

      {/* Features */}
      <Section id="features" eyebrow="Capabilities" title="Powerful platform features">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: <Search />, title: "Private Document RAG", desc: "Semantic search over your internal docs with citations." },
            { icon: <BarChart3 />, title: "Predictive ML from CSV Data", desc: "Auto-train forecasting and classification models from spreadsheets." },
            { icon: <Network />, title: "Hybrid AI Router", desc: "Route each question to the right engine: RAG, ML, or LLM." },
            { icon: <Cpu />, title: "Bring Your Own LLM", desc: "Plug in OpenAI, Anthropic, or self-hosted models you trust." },
            { icon: <Shield />, title: "Multi-Tenant Privacy", desc: "Hard tenant isolation — your data never leaves your boundary." },
            { icon: <Users />, title: "Employee Decision Portal", desc: "A simple chat interface every team member can use." },
          ].map((c) => (
            <Glass key={c.title} className="p-6 hover:bg-white/[0.05] hover:border-cyan-400/20 transition group">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-cyan-400 group-hover:scale-110 transition">
                {c.icon}
              </div>
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{c.desc}</p>
            </Glass>
          ))}
        </div>
      </Section>

      {/* How it Works */}
      <Section id="how" eyebrow="Process" title="How it works">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Upload />, title: "Upload company data", desc: "Drop documents, CSVs, and connect data sources." },
            { icon: <Layers />, title: "Build private AI knowledge", desc: "We index and embed inside your tenant." },
            { icon: <Search />, title: "Ask business questions", desc: "Anyone on the team can query in natural language." },
            { icon: <Sparkles />, title: "Receive actionable decisions", desc: "Get answers with confidence scores and citations." },
          ].map((s, i) => (
            <div key={s.title} className="relative">
              <Glass className="p-6 h-full">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-white text-sm font-bold">{i + 1}</div>
                  <div className="text-cyan-400">{s.icon}</div>
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
              </Glass>
              {i < 3 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 h-5 w-5 text-slate-700" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Privacy */}
      <Section id="privacy" eyebrow="Privacy & Trust" title="Built for companies that need AI insights without losing control of their data.">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            {[
              { icon: <Lock />, title: "Tenant Isolation", desc: "Cryptographic separation between every customer." },
              { icon: <Server />, title: "Self-Hostable", desc: "Deploy in your VPC or on your own infrastructure." },
              { icon: <Shield />, title: "Zero Data Training", desc: "Your data is never used to train shared models." },
              { icon: <FileText />, title: "Audit Logs", desc: "Full trail of every query, document access, and model call." },
            ].map((p) => (
              <Glass key={p.title} className="p-5 flex gap-4 items-start">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-cyan-400">{p.icon}</div>
                <div>
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="mt-1 text-sm text-slate-400">{p.desc}</p>
                </div>
              </Glass>
            ))}
          </div>
          <Glass className="overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3 bg-slate-950/40">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 ml-2">
                <Terminal className="h-3.5 w-3.5" /> Security Audit Log
              </div>
            </div>
            <pre className="p-5 text-[12px] leading-6 text-slate-300 font-mono overflow-x-auto">
{`[OK] tenant.isolation         acme-corp → namespace ✓
[OK] tenant.isolation         globex-inc → namespace ✓
[OK] rls.policy.check         appointments     ✓
[OK] embedding.encryption     AES-256-GCM      ✓
[OK] llm.routing              private-only     ✓
[OK] data.exfiltration.scan   0 violations     ✓
> audit.complete  3.2s  ${'\u001b'}`}
              <span className="text-cyan-400">all checks passed</span>
            </pre>
          </Glass>
        </div>
      </Section>

      {/* Platform Split */}
      <Section id="use-cases" eyebrow="Two experiences" title="One platform, two experiences">
        <div className="grid lg:grid-cols-2 gap-6">
          <Glass className="p-8 hover:border-indigo-400/30 transition">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
              <Shield className="h-3.5 w-3.5" /> Admin
            </div>
            <h3 className="mt-4 text-2xl font-bold">Company Admin</h3>
            <p className="mt-2 text-slate-400">Control data sources, models, permissions, and observe usage across teams.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {["Connect data sources", "Configure LLM providers", "Manage tenants & roles", "Monitor cost & usage"].map((x) => (
                <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> {x}</li>
              ))}
            </ul>
          </Glass>
          <Glass className="p-8 hover:border-cyan-400/30 transition">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
              <Users className="h-3.5 w-3.5" /> Portal
            </div>
            <h3 className="mt-4 text-2xl font-bold">Employee Portal</h3>
            <p className="mt-2 text-slate-400">A clean chat interface for any team member to ask and get decisions.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {["Natural language Q&A", "Cited document answers", "Forecasts & predictions", "Saved decision history"].map((x) => (
                <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400" /> {x}</li>
              ))}
            </ul>
          </Glass>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" eyebrow="Pricing" title="Simple, transparent pricing">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Starter", price: "$299", note: "/mo", desc: "For small teams piloting private AI.", features: ["Up to 10 users", "5GB document index", "1 LLM provider", "Email support"], popular: false },
            { name: "Business", price: "$899", note: "/mo", desc: "Built for growing companies.", features: ["Up to 100 users", "100GB document index", "Hybrid Router", "Priority support", "Custom ML models"], popular: true },
            { name: "Enterprise", price: "Custom", note: "", desc: "Self-hosted & SLA backed.", features: ["Unlimited users", "Self-hosted option", "BYO LLM", "Dedicated CSM", "SAML SSO"], popular: false },
          ].map((p) => (
            <Glass key={p.name} className={`p-8 relative ${p.popular ? "border-cyan-400/40 shadow-[0_0_50px_-15px_rgba(34,211,238,0.5)]" : ""}`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-3 py-1 text-[10px] font-semibold tracking-widest text-white">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className={`text-4xl font-bold ${p.popular ? "bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent" : ""}`}>{p.price}</span>
                <span className="text-sm text-slate-400">{p.note}</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-400 shrink-0" /> {f}</li>
                ))}
              </ul>
              {p.popular ? (
                <GradientButton onClick={openModal} className="mt-8 w-full">Make an Appointment</GradientButton>
              ) : (
                <Button onClick={openModal} variant="outline" className="mt-8 w-full bg-transparent border-white/10 text-slate-100 hover:bg-white/5 hover:text-white">
                  Make an Appointment
                </Button>
              )}
            </Glass>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-24">
        <Glass className="p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Ready to turn your company data{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">into decisions?</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Book a personalized walkthrough — see DecisionPilot AI on your own data.
            </p>
            <div className="mt-8 flex justify-center">
              <GradientButton onClick={openModal} className="h-12 px-8 text-base">
                Make an Appointment <ArrowRight className="ml-2 h-4 w-4" />
              </GradientButton>
            </div>
          </div>
        </Glass>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-3 text-sm text-slate-400 max-w-sm">
              Privacy-first hybrid RAG + ML intelligence for companies that own their data.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-200">Product</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#how" className="hover:text-white">How it Works</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-200">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a href="#privacy" className="hover:text-white">Privacy</a></li>
              <li><a href="#use-cases" className="hover:text-white">Use Cases</a></li>
              <li><Link to="/admin" className="hover:text-white">Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 text-xs text-slate-500 flex justify-between">
            <span>© {new Date().getFullYear()} DecisionPilot AI</span>
            <span>Built with privacy first.</span>
          </div>
        </div>
      </footer>

      <AppointmentModal open={open} onOpenChange={setOpen} />
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24">
      <div className="max-w-3xl mb-12">
        <div className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold">{eyebrow}</div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function FlowNode({ icon, title, sub, tone, highlight }: { icon: React.ReactNode; title: string; sub: string; tone: "indigo" | "cyan"; highlight?: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border p-4 ${highlight ? "border-cyan-400/40 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 shadow-[0_0_30px_-10px_rgba(34,211,238,0.6)]" : "border-white/10 bg-white/[0.02]"}`}>
      <div className={`grid h-10 w-10 place-items-center rounded-lg ${tone === "cyan" ? "bg-cyan-500/15 text-cyan-300" : "bg-indigo-500/15 text-indigo-300"}`}>
        {icon}
      </div>
      <div>
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-slate-400">{sub}</div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center">
      <div className="h-6 w-px bg-gradient-to-b from-indigo-400/60 to-cyan-400/60" />
    </div>
  );
}
