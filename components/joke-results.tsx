"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JokeCard } from "@/components/joke-card";
import type { GenerateResponse } from "@/lib/types";

interface JokeResultsProps {
  data: GenerateResponse | null;
  isLoading: boolean;
  streamText: string;
}

export function JokeResults({ data, isLoading, streamText }: JokeResultsProps) {
  if (isLoading && !data) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="text-2xl">🎭</div>
            <p className="text-muted-foreground">Generuji vtipy...</p>
            {streamText && (
              <pre className="text-xs text-left text-muted-foreground max-h-32 overflow-hidden opacity-30 mx-auto max-w-lg">
                {streamText.slice(-200)}
              </pre>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-4">
      {data.violationSurfaces && data.violationSurfaces.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              Violation Surfaces
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {data.violationSurfaces.map((surface, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {surface}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {(data.jokes || []).map((joke, i) => (
          <JokeCard key={i} joke={joke} index={i} />
        ))}
      </div>
    </div>
  );
}
