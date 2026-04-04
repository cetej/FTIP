import { readFileSync } from "fs";
import { join } from "path";

let _apiKey: string | null = null;

export function getAnthropicApiKey(): string {
  if (_apiKey) return _apiKey;

  // Try process.env first
  if (process.env.ANTHROPIC_API_KEY) {
    _apiKey = process.env.ANTHROPIC_API_KEY;
    return _apiKey;
  }

  // Fallback: read from .env.local directly
  try {
    const envPath = join(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const match = line.match(/^ANTHROPIC_API_KEY=(.+)$/);
      if (match) {
        _apiKey = match[1].trim();
        return _apiKey;
      }
    }
  } catch {
    // ignore
  }

  throw new Error("ANTHROPIC_API_KEY not found in env or .env.local");
}
