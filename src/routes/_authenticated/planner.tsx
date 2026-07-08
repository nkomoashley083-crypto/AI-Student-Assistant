import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { AiToolShell } from "@/components/ai-tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/planner")({
  component: Page,
});

function Page() {
  const [subjects, setSubjects] = useState("");
  const [deadlines, setDeadlines] = useState("");
  const [exams, setExams] = useState("");
  const [hours, setHours] = useState("");

  return (
    <AiToolShell
      kind="planner"
      title="AI Study Planner"
      description="Get a daily schedule, priority tasks and a revision roadmap tuned to your deadlines."
      icon={<CalendarClock className="h-5 w-5" />}
      outputFilename="study-plan.md"
      isValid={() => subjects.trim().length > 0}
      buildInput={() =>
        `Subjects: ${subjects}
Available study hours per day: ${hours || "flexible"}
Assignment deadlines:
${deadlines || "none listed"}
Exam dates:
${exams || "none listed"}`
      }
    >
      <div className="space-y-1.5">
        <Label>Subjects *</Label>
        <Input value={subjects} onChange={(e) => setSubjects(e.target.value)} placeholder="e.g. Data Structures, Marketing, Statistics" />
      </div>
      <div className="space-y-1.5">
        <Label>Available study hours / day</Label>
        <Input value={hours} onChange={(e) => setHours(e.target.value)} placeholder="e.g. 4" />
      </div>
      <div className="space-y-1.5">
        <Label>Assignment deadlines</Label>
        <Textarea rows={3} value={deadlines} onChange={(e) => setDeadlines(e.target.value)} placeholder="e.g. DS Assignment 3 - due Fri" />
      </div>
      <div className="space-y-1.5">
        <Label>Exam dates</Label>
        <Textarea rows={3} value={exams} onChange={(e) => setExams(e.target.value)} placeholder="e.g. Marketing midterm - March 20" />
      </div>
    </AiToolShell>
  );
}
