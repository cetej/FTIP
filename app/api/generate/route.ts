import { FTIP_SYSTEM_PROMPT, buildUserPrompt } from "@/lib/ftip-prompt";
import { parseLlmJson } from "@/lib/parse-llm-json";
import type { GenerateRequest, GenerateResponse } from "@/lib/types";
import { readFileSync } from "fs";
import { join } from "path";

let _cachedKey: string | null = null;
function loadApiKey(): string {
  if (_cachedKey) return _cachedKey;
  const content = readFileSync(join(process.cwd(), ".env.local"), "utf-8");
  for (const line of content.split("\n")) {
    const match = line.match(/^ANTHROPIC_API_KEY=(.+)$/);
    if (match) {
      _cachedKey = match[1].trim();
      return _cachedKey;
    }
  }
  throw new Error("ANTHROPIC_API_KEY not found in .env.local");
}

export async function POST(request: Request) {
  const body: GenerateRequest = await request.json();

  if (!body.topic?.trim()) {
    return Response.json({ error: "Téma je povinné" }, { status: 400 });
  }

  let apiKey: string;
  try {
    apiKey = loadApiKey();
  } catch {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 500 }
    );
  }

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
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        system: FTIP_SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return Response.json(
        { error: `${res.status} ${errText}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const text =
      data.content?.[0]?.type === "text" ? data.content[0].text : "";

    try {
      const parsed = parseLlmJson<GenerateResponse>(text);
      return Response.json(parsed);
    } catch {
      return Response.json({
        violationSurfaces: ["(JSON parsing selhal — zobrazuji raw text)"],
        jokes: [
          {
            mechanism: "auto",
            tone: "auto",
            form: "auto",
            target: "auto",
            scale: body.scale,
            text: text
              .replace(/^```(?:json)?\s*\n?/, "")
              .replace(/\n?```\s*$/, "")
              .replace(/[{}[\]",:]/g, (m) => {
                if (m === '"') return "";
                if (m === ",") return "\n";
                if (m === "{" || m === "}" || m === "[" || m === "]") return "";
                return m;
              }),
            analysis: "Odpověď nebyla ve validním JSON formátu. Zkuste to znovu.",
          },
        ],
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
