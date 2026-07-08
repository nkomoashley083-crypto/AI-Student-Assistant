import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";
import { AiToolShell } from "@/components/ai-tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/notes")({
  component: Page,
});

function Page() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <AiToolShell
      kind="notes"
      title="Study Notes Summarizer"
      description="Turn lecture notes and study materials into revision-ready summaries and flashcards."
      icon={<FileText className="h-5 w-5" />}
      outputFilename="study-notes.md"
      isValid={() => notes.trim().length > 30}
      buildInput={() =>
        `Topic: ${topic || "n/a"}
Notes to summarize:
${notes}`
      }
    >
      <div className="space-y-1.5">
        <Label>Topic</Label>
        <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Photosynthesis, Newton's Laws" />
      </div>
      <div className="space-y-1.5">
        <Label>Paste your notes *</Label>
        <Textarea rows={14} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste lecture notes, PDF content, textbook excerpts..." />
        <p className="text-xs text-muted-foreground">{notes.length} characters</p>
      </div>
    </AiToolShell>
  );
}
