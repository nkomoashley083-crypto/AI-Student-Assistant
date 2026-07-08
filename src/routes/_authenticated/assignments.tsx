import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { AiToolShell } from "@/components/ai-tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/assignments")({
  component: Page,
});

function Page() {
  const [title, setTitle] = useState("");
  const [module, setModule] = useState("");
  const [brief, setBrief] = useState("");
  const [wordCount, setWordCount] = useState("");

  return (
    <AiToolShell
      kind="assignment"
      title="AI Assignment Assistant"
      description="Break down briefs, plan structure, and improve your academic writing."
      icon={<BookOpen className="h-5 w-5" />}
      outputFilename="assignment-plan.md"
      isValid={() => brief.trim().length > 10}
      buildInput={() =>
        `Assignment title: ${title || "n/a"}
Module/Subject: ${module || "n/a"}
Target word count: ${wordCount || "n/a"}
Brief/Requirements:
${brief}`
      }
    >
      <div className="space-y-1.5">
        <Label>Assignment title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Module / Subject</Label>
          <Input value={module} onChange={(e) => setModule(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Word count</Label>
          <Input value={wordCount} onChange={(e) => setWordCount(e.target.value)} placeholder="e.g. 2000" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Brief / requirements *</Label>
        <Textarea rows={8} value={brief} onChange={(e) => setBrief(e.target.value)} placeholder="Paste the assignment brief or describe the task in detail." />
      </div>
    </AiToolShell>
  );
}
