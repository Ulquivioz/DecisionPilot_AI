import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles } from "lucide-react";

const schema = z.object({
  full_name: z.string().trim().min(1, "Required").max(100),
  work_email: z.string().trim().email("Invalid email").max(255),
  company_name: z.string().trim().min(1, "Required").max(100),
  preferred_date_time: z.string().refine((v) => {
    const d = new Date(v);
    return !isNaN(d.getTime()) && d.getTime() > Date.now();
  }, "Pick a future date & time"),
  requirements: z.string().trim().max(1000).optional(),
});

export function AppointmentModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    work_email: "",
    company_name: "",
    preferred_date_time: "",
    requirements: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid form");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("appointments").insert({
      full_name: parsed.data.full_name,
      work_email: parsed.data.work_email,
      company_name: parsed.data.company_name,
      preferred_date_time: new Date(parsed.data.preferred_date_time).toISOString(),
      requirements: parsed.data.requirements || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit. Try again.");
      return;
    }
    toast.success("Appointment booked! We'll be in touch shortly.");
    setForm({ full_name: "", work_email: "", company_name: "", preferred_date_time: "", requirements: "" });
    onOpenChange(false);
  };

  const minDateTime = new Date(Date.now() + 5 * 60 * 1000).toISOString().slice(0, 16);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] border border-white/10 bg-slate-900/70 backdrop-blur-xl text-slate-100 shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Make an Appointment
            </span>
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Book a personalized walkthrough of DecisionPilot AI.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="full_name" className="text-slate-300">Full Name</Label>
            <Input
              id="full_name" required maxLength={100}
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="bg-slate-950/60 border-white/10 text-slate-100"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="work_email" className="text-slate-300">Work Email</Label>
            <Input
              id="work_email" type="email" required maxLength={255}
              value={form.work_email}
              onChange={(e) => setForm({ ...form, work_email: e.target.value })}
              className="bg-slate-950/60 border-white/10 text-slate-100"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company_name" className="text-slate-300">Company Name</Label>
            <Input
              id="company_name" required maxLength={100}
              value={form.company_name}
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
              className="bg-slate-950/60 border-white/10 text-slate-100"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="preferred_date_time" className="text-slate-300">Preferred Date & Time</Label>
            <Input
              id="preferred_date_time" type="datetime-local" required min={minDateTime}
              value={form.preferred_date_time}
              onChange={(e) => setForm({ ...form, preferred_date_time: e.target.value })}
              className="bg-slate-950/60 border-white/10 text-slate-100 [color-scheme:dark]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="requirements" className="text-slate-300">Brief Note / Requirements</Label>
            <Textarea
              id="requirements" rows={4} maxLength={1000}
              placeholder="Tell us about your use case..."
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              className="bg-slate-950/60 border-white/10 text-slate-100"
            />
          </div>
          <Button
            type="submit" disabled={submitting}
            className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.7)] border-0"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Appointment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
