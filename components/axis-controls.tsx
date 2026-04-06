"use client";

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

function AxisGroup<T extends string>({
  title,
  options,
  value,
  onChange,
  disabled,
}: {
  title: string;
  options: readonly { value: T; label: string; description: string }[];
  value: T;
  onChange: (v: T) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as T)}
        disabled={disabled}
        className="space-y-1"
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-1.5 hover:bg-accent transition-colors"
          >
            <RadioGroupItem value={opt.value} />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium">{opt.label}</span>
              <span className="text-xs text-muted-foreground ml-2">
                {opt.description}
              </span>
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}

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
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <AxisGroup
          title="Mechanismus"
          options={MECHANISMS}
          value={mechanism}
          onChange={onMechanismChange}
          disabled={disabled}
        />
        <AxisGroup
          title="Tón"
          options={TONES}
          value={tone}
          onChange={onToneChange}
          disabled={disabled}
        />
        <AxisGroup
          title="Forma"
          options={FORMS}
          value={form}
          onChange={onFormChange}
          disabled={disabled}
        />
        <AxisGroup
          title="Terč"
          options={TARGETS}
          value={target}
          onChange={onTargetChange}
          disabled={disabled}
        />
        <AxisGroup
          title="Škála"
          options={SCALES}
          value={scale}
          onChange={onScaleChange}
          disabled={disabled}
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-foreground">
          {"\u0050o\u010Det variant:"}
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
