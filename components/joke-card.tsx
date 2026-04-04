"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Joke } from "@/lib/types";

interface JokeCardProps {
  joke: Joke;
  index: number;
}

export function JokeCard({ joke, index }: JokeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(joke.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-muted-foreground">
              #{index + 1}
            </span>
            <Badge variant="secondary">{joke.mechanism}</Badge>
            <span className="text-muted-foreground text-xs">x</span>
            <Badge variant="secondary">{joke.tone}</Badge>
            <span className="text-muted-foreground text-xs">x</span>
            <Badge variant="secondary">{joke.form}</Badge>
            <span className="text-muted-foreground text-xs">|</span>
            <Badge
              variant={
                joke.scale === "dark"
                  ? "destructive"
                  : joke.scale === "sharp"
                  ? "default"
                  : "outline"
              }
            >
              {joke.scale}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-xs shrink-0"
          >
            {copied ? "Zkop\u00EDrov\u00E1no!" : "Kop\u00EDrovat"}
          </Button>
        </div>

        <blockquote className="border-l-4 border-primary/30 pl-4 py-2 text-base leading-relaxed italic whitespace-pre-wrap">
          {joke.text}
        </blockquote>

        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Rozbor:</span> {joke.analysis}
        </p>
      </CardContent>
    </Card>
  );
}
