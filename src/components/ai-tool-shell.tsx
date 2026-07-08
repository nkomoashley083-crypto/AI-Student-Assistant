import { useState, type ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Copy, Download, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { runAiTool } from "@/lib/ai-tools.functions";
import { useServerFn } from "@tanstack/react-start";

type Kind = "email" | "assignment" | "notes" | "planner" | "research" | "career";

interface AiToolShellProps {
  kind: Kind;
  title: string;
  description: string;
  icon: ReactNode;
  buildInput: () => string;
  isValid: () => boolean;
  children: ReactNode; // form fields
  outputFilename?: string;
}

export function AiToolShell({
  kind,
  title,
  description,
  icon,
  buildInput,
  isValid,
  children,
  outputFilename = "ai-output.md",
}: AiToolShellProps) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string>("");
  const runFn = useServerFn(runAiTool);

  const run = async () => {
    if (!isValid()) {
      toast.error("Please fill in the required fields");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const res = await runFn({ data: { kind, input: buildInput() } });
      setOutput(res.text);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outputFilename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
          {icon}
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inputs</CardTitle>
            <CardDescription>Fill in what you have. The AI will do the rest.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {children}
            <Button onClick={run} disabled={loading} className="w-full bg-gradient-primary shadow-soft">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Output</CardTitle>
              <CardDescription>AI-generated. Review before use.</CardDescription>
            </div>
            {output && (
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={copy} aria-label="Copy"><Copy className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={download} aria-label="Download"><Download className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={run} aria-label="Regenerate" disabled={loading}><RefreshCw className="h-4 w-4" /></Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1">
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
                <div className="mt-4 h-4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              </div>
            ) : output ? (
              <article className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground">
                <ReactMarkdown>{output}</ReactMarkdown>
              </article>
            ) : (
              <div className="flex h-full min-h-[240px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                Your AI output will appear here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        AI-generated content may require human review. Use as a learning aid, not a substitute for academic integrity.
      </p>
    </div>
  );
}
