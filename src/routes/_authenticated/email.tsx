import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { AiToolShell } from "@/components/ai-tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/email")({
  component: EmailTool,
});

const CATEGORIES = [
  "Lecturer email", "Extension request", "Internship application", "Graduate programme application",
  "Job application", "Scholarship application", "Networking email", "Meeting request", "Thank-you email",
];
const TONES = ["Professional", "Formal", "Respectful", "Friendly", "Persuasive"];

function EmailTool() {
  const [purpose, setPurpose] = useState("Lecturer email");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [points, setPoints] = useState("");
  const [tone, setTone] = useState("Professional");

  return (
    <AiToolShell
      kind="email"
      title="AI Email Generator"
      description="Craft professional emails for academic, internship and employment opportunities."
      icon={<Mail className="h-5 w-5" />}
      outputFilename="email.md"
      isValid={() => points.trim().length > 0}
      buildInput={() =>
        `Purpose/Category: ${purpose}
Recipient: ${recipient || "not specified"}
Working subject: ${subject || "(let AI propose)"}
Tone: ${tone}
Key points to include:
${points}`
      }
    >
      <div className="space-y-1.5">
        <Label>Purpose</Label>
        <Select value={purpose} onValueChange={setPurpose}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Recipient (name / role)</Label>
        <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Dr. Smith, Hiring Manager at Acme" />
      </div>
      <div className="space-y-1.5">
        <Label>Working subject <span className="text-muted-foreground">(optional)</span></Label>
        <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label>Key points *</Label>
        <Textarea rows={5} value={points} onChange={(e) => setPoints(e.target.value)} placeholder="What do you want to say? Bullet points are fine." />
        <p className="text-xs text-muted-foreground">{points.length} characters</p>
      </div>
      <div className="space-y-1.5">
        <Label>Tone</Label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{TONES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
        </Select>
      </div>
    </AiToolShell>
  );
}
