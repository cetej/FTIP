"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MECHANISMS,
  TONES,
  FORMS,
  TARGETS,
  SCALES,
  type Mechanism,
  type Tone,
  type Form,
  type Target,
  type Scale,
} from "@/lib/types";

interface AxisControlsProps {
  mechanism: Mechanism;
  tone: Tone;
  form: Form;
  target: Target;
  scale: Scale;
  count: number;
  onMechanismChange: (v: Mechanism) => void;
  onToneChange: (v: Tone) => void;
  onFormChange: (v: Form) => void;
  onTargetChange: (v: Target) => void;
  onScaleChange: (v: Scale) => void;
  onCountChange: (v: number) => void;
  disabled?: boolean;
}

function getLabel<T extends string>(
  options: readonly { value: T; label: string }[],
  value: T
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function AxisPanel<T extends string>({
  title,
  options,
  value,
  onChange,
  isOpen,
  onToggle,
  disabled,
}: {
  title: string;
  options: readonly { value: T; label: string; description: string }[];
  value: T;
  onChange: (v: T) => void;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-accent/50 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-sm text-muted-foreground">
          {getLabel(options, value)}{" "}
          <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-3 border-t border-border/50">
          <RadioGroup
            value={value}
            onValueChange={(v) => onChange(v as T)}
            disabled={disabled}
            className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-2"
          >
            {options.map((opt) => (
              <label
                key={opt.value}
                className="flex items-start gap-2 cursor-pointer rounded-md px-2 py-2 hover:bg-accent transition-colors"
              >
                <RadioGroupItem value={opt.value} className="mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-sm font-medium">{opt.label}</span>
                  <span className="text-xs text-muted-foreground ml-1.5">
                    {opt.description}
                  </span>
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
}

type AxisKey = "mechanism" | "tone" | "form" | "target" | "scale";

export function AxisControls({
  mechanism,
  tone,
  form,
  target,
  scale,
  count,
  onMechanismChange,
  onToneChange,
  onFormChange,
  onTargetChange,
  onScaleChange,
  onCountChange,
  disabled,
}: AxisControlsProps) {
  const [openAxis, setOpenAxis] = useState<AxisKey | null>(null);

  const toggle = (key: AxisKey) =>
    setOpenAxis((prev) => (prev === key ? null : key));

  return (
    <div className="space-y-2">
      <AxisPanel
        title="Mechanismus"
        options={MECHANISMS}
        value={mechanism}
        onChange={onMechanismChange}
        isOpen={openAxis === "mechanism"}
        onToggle={() => toggle("mechanism")}
        disabled={disabled}
      />
      <AxisPanel
        title="Tón"
        options={TONES}
        value={tone}
        onChange={onToneChange}
        isOpen={openAxis === "tone"}
        onToggle={() => toggle("tone")}
        disabled={disabled}
      />
      <AxisPanel
        title="Forma"
        options={FORMS}
        value={form}
        onChange={onFormChange}
        isOpen={openAxis === "form"}
        onToggle={() => toggle("form")}
        disabled={disabled}
      />
      <AxisPanel
        title="Terč"
        options={TARGETS}
        value={target}
        onChange={onTargetChange}
        isOpen={openAxis === "target"}
        onToggle={() => toggle("target")}
        disabled={disabled}
      />
      <AxisPanel
        title="Škála"
        options={SCALES}
        value={scale}
        onChange={onScaleChange}
        isOpen={openAxis === "scale"}
        onToggle={() => toggle("scale")}
        disabled={disabled}
      />
      <div className="flex items-center gap-3 pt-2">
        <label className="text-sm font-medium text-foreground">
          Počet variant:
        </label>
        <Select
          value={String(count)}
          onValueChange={(v) => onCountChange(Number(v))}
          disabled={disabled}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
