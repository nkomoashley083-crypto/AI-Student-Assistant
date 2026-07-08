import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const ToolKind = z.enum([
  "email",
  "assignment",
  "notes",
  "planner",
  "research",
  "career",
]);

const PROMPTS: Record<z.infer<typeof ToolKind>, string> = {
  email: `You are an expert professional communication coach for university students. Generate a polished email based on the student's inputs.

Return your response in this exact format:

**Subject:** <subject line>

**Email:**
<full email body, properly formatted with greeting and sign-off>

**Follow-up recommendation:**
<one short paragraph>

**Communication tips:**
- <tip 1>
- <tip 2>
- <tip 3>`,

  assignment: `You are an academic writing tutor. Given the student's assignment description, return:

## Assignment Breakdown
<parse the key requirements>

## Suggested Structure
<numbered outline with sections>

## Key Concepts to Cover
- <bullet list>

## Research Approach
<how to source and evaluate material>

## Writing Recommendations
<voice, evidence, citation tips>

## Common Pitfalls to Avoid
- <bullet list>`,

  notes: `You are a study coach. Summarize the student's material into clean revision notes.

## Concise Summary
<2-3 paragraphs>

## Key Concepts
- <bullet list>

## Important Definitions
- **Term:** definition

## Revision Highlights
<bullet list of exam-critical items>

## Flashcards
Q: ...
A: ...
(generate 5-8)`,

  planner: `You are a productivity coach for students. Build a realistic study plan.

## Weekly Overview
<paragraph>

## Daily Schedule
| Day | Focus | Hours | Priority Task |
|---|---|---|---|
...

## Priority Task List
1. ...

## Revision Roadmap
<phased plan up to exams>

## Productivity Tips
- <bullet list>`,

  research: `You are a research assistant. Support academic research on the given topic.

## Topic Overview
<paragraph>

## Key Insights
- <bullet list>

## Suggested Literature Review Angles
- <bullet list>

## Recommended Resources / Search Terms
- <bullet list>

## Critical Thinking Questions
- <bullet list>`,

  career: `You are an employability and careers coach. Analyze the student's input (CV, situation, or role target) and give career preparation guidance.

## Employability Snapshot
<paragraph — include a rough employability score /100 with reasoning>

## Strengths
- <bullet list>

## Skills Gap Analysis
- <bullet list>

## Career Readiness Recommendations
1. ...

## Suggested Next Steps
- <bullet list>

## STAR Interview Prep Prompts
- <3-4 tailored questions>`,
};

const RunInput = z.object({
  kind: ToolKind,
  input: z.string().min(1).max(20000),
});

export const runAiTool = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => RunInput.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY not configured");

    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-3-flash-preview");

    const system = PROMPTS[data.kind];

    try {
      const { text } = await generateText({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: data.input },
        ],
      });
      return { text };
    } catch (err) {
      const message = err instanceof Error ? err.message : "AI request failed";
      if (message.includes("429")) {
        throw new Error("Rate limit reached. Please wait a moment and try again.");
      }
      if (message.includes("402")) {
        throw new Error("AI credits exhausted. Add credits in your workspace billing.");
      }
      throw new Error(message);
    }
  });
