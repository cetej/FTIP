"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TopicInput } from "@/components/topic-input";
import { AxisControls } from "@/components/axis-controls";
import { JokeResults } from "@/components/joke-results";
import { ThemeToggle } from "@/components/theme-toggle";
import type {
  Mechanism,
  Tone,
  Form,
  Scale,
  GenerateResponse,
} from "@/lib/types";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [mechanism, setMechanism] = useState<Mechanism>("auto");
  const [tone, setTone] = useState<Tone>("auto");
  const [form, setForm] = useState<Form>("auto");
  const [scale, setScale] = useState<Scale>("medium");
  const [count, setCount] = useState(3);

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, mechanism, tone, form, scale, count }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || "API error");
      }
      setResults(data as GenerateResponse);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Nezn\u00E1m\u00E1 chyba";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="container max-w-4xl mx-auto py-8 px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex-1" />
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">FTIP</h1>
            <p className="text-sm text-muted-foreground">
              Humor Generator &mdash; Benign Violation Theory
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <ThemeToggle />
          </div>
        </div>

        <Separator />

        <TopicInput value={topic} onChange={setTopic} disabled={isLoading} />

        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="text-sm text-muted-foreground"
          >
            {settingsOpen ? "Skr\u00FDt nastaven\u00ED" : "Nastaven\u00ED os"}{" "}
            {settingsOpen ? "\u25B2" : "\u25BC"}
          </Button>

          {settingsOpen && (
            <Card className="mt-3">
              <CardContent className="pt-4">
                <AxisControls
                  mechanism={mechanism}
                  tone={tone}
                  form={form}
                  scale={scale}
                  count={count}
                  onMechanismChange={setMechanism}
                  onToneChange={setTone}
                  onFormChange={setForm}
                  onScaleChange={setScale}
                  onCountChange={setCount}
                  disabled={isLoading}
                />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={isLoading || !topic.trim()}
            className="px-8"
          >
            {isLoading ? "Generuji..." : "Generovat vtipy \uD83C\uDFAF"}
          </Button>

          {!settingsOpen && (
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span>
                {mechanism === "auto" ? "auto" : mechanism} x{" "}
                {tone === "auto" ? "auto" : tone} x{" "}
                {form === "auto" ? "auto" : form} | {scale} | {count}x
              </span>
            </div>
          )}
        </div>

        {error && (
          <Card className="border-destructive">
            <CardContent className="py-4 text-destructive text-sm">
              Chyba: {error}
            </CardContent>
          </Card>
        )}

        <JokeResults data={results} isLoading={isLoading} />
      </div>
    </main>
  );
}
