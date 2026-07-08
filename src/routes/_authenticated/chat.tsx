import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, Loader2, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const Route = createFileRoute("/_authenticated/chat")({
  component: ChatPage,
});

const SUGGESTIONS = [
  "Help me build a study timetable for finals",
  "Draft an internship application email",
  "Explain gradient descent simply",
  "Prepare me for a graduate interview",
  "Create a revision plan for my exams",
  "Improve my CV bullet points",
];

function ChatPage() {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status } = useChat({ transport });
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const submit = () => {
    const text = input.trim();
    if (!text) return;
    sendMessage({ text });
    setInput("");
  };

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">AI Chatbot</h1>
          <p className="text-sm text-muted-foreground">Your always-on student support & career coach.</p>
        </div>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
                <Sparkles className="h-7 w-7" />
              </div>
              <h2 className="font-display text-xl font-bold">How can I help you today?</h2>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Ask about study strategies, assignments, research, careers, or interview prep.
              </p>
              <div className="mt-6 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage({ text: s })}
                    className="rounded-xl border bg-card p-3 text-left text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((m) => {
                const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
                const isUser = m.role === "user";
                return (
                  <div key={m.id} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                        isUser ? "bg-secondary text-secondary-foreground" : "bg-gradient-primary text-primary-foreground"
                      }`}
                    >
                      {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                    </div>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap text-sm">{text}</p>
                      ) : (
                        <article className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-display prose-p:my-2 prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-headings:text-foreground">
                          <ReactMarkdown>{text || "…"}</ReactMarkdown>
                        </article>
                      )}
                    </div>
                  </div>
                );
              })}
              {status === "submitted" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <div className="border-t bg-background/50 p-3 sm:p-4">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="Ask anything..."
              rows={1}
              className="min-h-[44px] resize-none"
              disabled={isLoading}
            />
            <Button onClick={submit} disabled={isLoading || !input.trim()} className="bg-gradient-primary shadow-soft">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            AI-generated content may require human review.
          </p>
        </div>
      </Card>
    </div>
  );
}
