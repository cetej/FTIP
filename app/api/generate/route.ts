import Anthropic from "@anthropic-ai/sdk";
import { FTIP_SYSTEM_PROMPT, buildUserPrompt } from "@/lib/ftip-prompt";
import { getAnthropicApiKey } from "@/lib/env";
import type { GenerateRequest } from "@/lib/types";

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

    // Strip markdown code blocks
    let jsonText = text.trim();
    if (jsonText.startsWith("```")) {
      jsonText = jsonText
        .replace(/^```(?:json)?\s*\n?/, "")
        .replace(/\n?```\s*$/, "");
    }

    // Fix common LLM JSON issues
    jsonText = jsonText.replace(/,\s*([}\]])/g, "$1"); // trailing commas

    // Fix unescaped newlines inside JSON string values
    // Replace actual newlines inside strings with \\n
    jsonText = jsonText.replace(
      /"(?:[^"\\]|\\.)*"/g,
      (match) => match.replace(/\n/g, "\\n")
    );

    try {
      const parsed = JSON.parse(jsonText);
      return Response.json(parsed);
    } catch {
      // If JSON parse fails, return raw text for debugging
      return Response.json(
        {
          violationSurfaces: [],
          jokes: [
            {
              mechanism: "raw",
              tone: "raw",
              form: "raw",
              scale: body.scale,
              text: text,
              analysis: "JSON parse failed - raw response shown",
            },
          ],
        },
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
