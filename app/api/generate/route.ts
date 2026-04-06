import Anthropic from "@anthropic-ai/sdk";
import { FTIP_SYSTEM_PROMPT, buildUserPrompt } from "@/lib/ftip-prompt";
import { getAnthropicApiKey } from "@/lib/env";
import { parseLlmJson } from "@/lib/parse-llm-json";
import type { GenerateRequest, GenerateResponse } from "@/lib/types";

export async function POST(request: Request) {
  const body: GenerateRequest = await request.json();

  if (!body.topic?.trim()) {
    return Response.json({ error: "T\u00E9ma je povinn\u00E9" }, { status: 400 });
  }

  let apiKey: string;
  try {
    apiKey = getAnthropicApiKey();
  } catch {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const anthropic = new Anthropic({ apiKey });

  const userPrompt = buildUserPrompt(
    body.topic,
    body.mechanism,
    body.tone,
    body.form,
    body.target,
    body.scale,
    body.count
  );

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: FTIP_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    try {
      const parsed = parseLlmJson<GenerateResponse>(text);
      return Response.json(parsed);
    } catch (parseErr) {
      // Fallback: show raw text as a single joke
      console.error("JSON parse failed:", parseErr, "Raw:", text.substring(0, 200));
      return Response.json({
        violationSurfaces: ["(JSON parsing selhal \u2014 zobrazuji raw text)"],
        jokes: [
          {
            mechanism: "auto",
            tone: "auto",
            form: "auto",
            scale: body.scale,
            text: text
              .replace(/^```(?:json)?\s*\n?/, "")
              .replace(/\n?```\s*$/, "")
              .replace(/[{}[\]",:]/g, (m) => {
                // Strip JSON syntax to show readable text
                if (m === '"') return "";
                if (m === ",") return "\n";
                if (m === "{" || m === "}" || m === "[" || m === "]") return "";
                return m;
              }),
            analysis: "Odpov\u011B\u010F nebyla ve validn\u00EDm JSON form\u00E1tu. Zkuste to znovu.",
          },
        ],
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
