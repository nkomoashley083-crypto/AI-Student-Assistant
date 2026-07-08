import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { AiToolShell } from "@/components/ai-tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/research")({
  component: Page,
});

function Page() {
  const [topic, setTopic] = useState("");
  const [angle, setAngle] = useState("");
  const [context, setContext] = useState("");

  return (
    <AiToolShell
      kind="research"
      title="AI Research Assistant"
      description="Explore topics with overviews, literature-review angles, and critical thinking prompts."
      icon={<Search className="h-5 w-5" />}
      outputFilename="research.md"
      isValid={() => topic.trim().length > 2}
      buildInput={() =>
        `Research topic: ${topic}
Specific angle / research question: ${angle || "open"}
Additional context: ${context || "none"}`
      }
    >
      <div className="space-y-1.5">
        <Label>Research topic *</Label>
        <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Impact of remote work on team creativity" />
      </div>
      <div className="space-y-1.5">
        <Label>Specific angle / question</Label>
        <Input value={angle} onChange={(e) => setAngle(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label>Additional context</Label>
        <Textarea rows={4} value={context} onChange={(e) => setContext(e.target.value)} placeholder="Course level, region, discipline, etc." />
      </div>
    </AiToolShell>
  );
}
