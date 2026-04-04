"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JokeCard } from "@/components/joke-card";
import type { GenerateResponse } from "@/lib/types";

interface JokeResultsProps {
  data: GenerateResponse | null;
  isLoading: boolean;
}

export function JokeResults({ data, isLoading }: JokeResultsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="text-4xl">{"\uD83C\uDFAD"}</div>
            <p className="text-muted-foreground">Generuji vtipy...</p>
            <p className="text-xs text-muted-foreground">
              {"\u010Cek\u00E1m na odpov\u011B\u010F od Claude (~15s)"}
            </p>
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
