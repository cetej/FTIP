"use client";

import { Textarea } from "@/components/ui/textarea";

interface TopicInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TopicInput({ value, onChange, disabled }: TopicInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {"\u0054\u00E9ma / \u010Cl\u00E1nek / Situace"}
      </label>
      <Textarea
        placeholder={"\u0056lo\u017E t\u00E9ma, tezi, \u010Dl\u00E1nek nebo popis situace..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="min-h-[120px] resize-y text-base"
      />
      <p className="text-xs text-muted-foreground">
        {"\u0056lo\u017E cokoliv \u2014 \u010Dl\u00E1nek, tezi, situaci, nebo jen t\u00E9ma jedn\u00EDm slovem."}
      </p>
    </div>
  );
}
