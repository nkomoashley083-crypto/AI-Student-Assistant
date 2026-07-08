import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const SYSTEM_PROMPT = `You are the AI Student Assistant — a friendly, knowledgeable coach for university students. You help with:
- Academic support and study guidance
- Assignment planning and research
- Career advice, CVs, cover letters, and interview prep
- Internship and graduate programme applications
- Productivity coaching and study planning
- Explaining concepts simply

Be encouraging, concise, and practical. Use markdown (headings, bullet lists, bold) to structure longer replies. Ask a brief clarifying question when the request is ambiguous. Always remind students that AI output is a learning aid, not a substitute for their own work.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
