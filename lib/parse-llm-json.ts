/**
 * Robustly parse JSON from LLM output.
 * Handles: markdown code blocks, trailing commas, unescaped newlines in strings.
 */
export function parseLlmJson<T>(raw: string): T {
  let text = raw.trim();

  // Strip markdown code blocks
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }

  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // continue to fixes
  }

  // Fix 1: trailing commas
  let fixed = text.replace(/,\s*([}\]])/g, "$1");

  try {
    return JSON.parse(fixed);
  } catch {
    // continue
  }

  // Fix 2: escape unescaped newlines inside JSON string values
  // Walk character by character to properly handle string boundaries
  fixed = escapeNewlinesInStrings(fixed);

  try {
    return JSON.parse(fixed);
  } catch {
    // continue
  }

  // Fix 3: try to extract the first valid JSON object
  const jsonMatch = fixed.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(escapeNewlinesInStrings(jsonMatch[0]));
    } catch {
      // continue
    }
  }

  throw new Error("Failed to parse LLM JSON output");
}

function escapeNewlinesInStrings(json: string): string {
  const result: string[] = [];
  let inString = false;
  let escaped = false;

  for (let i = 0; i < json.length; i++) {
    const ch = json[i];

    if (escaped) {
      result.push(ch);
      escaped = false;
      continue;
    }

    if (ch === "\\") {
      escaped = true;
      result.push(ch);
      continue;
    }

    if (ch === '"') {
      inString = !inString;
      result.push(ch);
      continue;
    }

    if (inString && ch === "\n") {
      result.push("\\n");
      continue;
    }

    if (inString && ch === "\r") {
      continue; // skip CR
    }

    if (inString && ch === "\t") {
      result.push("\\t");
      continue;
    }

    result.push(ch);
  }

  return result.join("");
}
