import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase } from "lucide-react";
import { AiToolShell } from "@/components/ai-tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/career")({
  component: Page,
});

const GOALS = [
  "CV analysis & improvement",
  "Cover letter",
  "LinkedIn optimisation",
  "Mock interview questions",
  "STAR interview preparation",
  "Employability score & skills gap",
  "Career pathway recommendations",
];

function Page() {
  const [goal, setGoal] = useState(GOALS[0]);
  const [roleTarget, setRoleTarget] = useState("");
  const [background, setBackground] = useState("");

  return (
    <AiToolShell
      kind="career"
      title="Career Preparation Assistant"
      description="Prepare for internships, graduate programmes and employment with tailored coaching."
      icon={<Briefcase className="h-5 w-5" />}
      outputFilename="career-prep.md"
      isValid={() => background.trim().length > 20}
      buildInput={() =>
        `Goal: ${goal}
Target role / programme: ${roleTarget || "not specified"}
Student background (CV text, experience, skills, goals):
${background}`
      }
    >
      <div className="space-y-1.5">
        <Label>What do you want help with?</Label>
        <Select value={goal} onValueChange={setGoal}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{GOALS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Target role / programme</Label>
        <Input value={roleTarget} onChange={(e) => setRoleTarget(e.target.value)} placeholder="e.g. Software Engineering Intern @ Acme" />
      </div>
      <div className="space-y-1.5">
        <Label>Your background *</Label>
        <Textarea rows={10} value={background} onChange={(e) => setBackground(e.target.value)} placeholder="Paste your CV, list your experience, skills, and career goals." />
      </div>
    </AiToolShell>
  );
}
