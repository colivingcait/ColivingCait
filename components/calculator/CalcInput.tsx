"use client";

import { cn } from "@/lib/cn";

// Calculator-specific number input with a $ or % adornment. Used across
// every step of the wizard.
type CalcInputProps = {
  label: string;
  value: number | string;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  required?: boolean;
  helper?: string;
  className?: string;
};

export default function CalcInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min,
  max,
  required = true,
  helper,
  className,
}: CalcInputProps) {
  return (
    <label className={cn("block", className)}>
      <span className="text-[10px] uppercase tracking-eyebrow text-charcoal/70">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </span>
      <div className="relative mt-2">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warmgray/70 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          required={required}
          value={value === 0 ? "" : value}
          onChange={(e) => {
            const v = e.target.value === "" ? 0 : Number(e.target.value);
            onChange(Number.isFinite(v) ? v : 0);
          }}
          step={step}
          min={min}
          max={max}
          className={cn(
            "w-full border border-brand bg-white px-4 py-3 text-sm font-sans text-charcoal placeholder:text-warmgray/60 focus:outline-none focus:border-gold transition-colors",
            prefix && "pl-8",
            suffix && "pr-12",
          )}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-warmgray/70 text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {helper && <p className="mt-2 text-xs text-warmgray/70">{helper}</p>}
    </label>
  );
}

// Simple checkbox tile used for the room inventory step
type CheckTileProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
};

export function CheckTile({
  label,
  description,
  checked,
  onChange,
}: CheckTileProps) {
  return (
    <label
      className={cn(
        "flex items-start gap-4 cursor-pointer border p-5 transition-colors",
        checked
          ? "border-gold bg-gold/[0.06]"
          : "border-brand bg-white hover:border-gold/60",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 accent-gold w-4 h-4 cursor-pointer"
      />
      <div className="flex-1">
        <p className="font-sans font-medium text-sm text-charcoal">{label}</p>
        {description && (
          <p className="mt-1 text-xs text-warmgray leading-body">
            {description}
          </p>
        )}
      </div>
    </label>
  );
}

// Yes/no toggle row
type ToggleProps = {
  label: string;
  helper?: string;
  value: boolean;
  onChange: (v: boolean) => void;
};

export function YesNoToggle({
  label,
  helper,
  value,
  onChange,
}: ToggleProps) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-eyebrow text-charcoal/70">
        {label}
      </p>
      <div className="mt-3 inline-flex border border-brand">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={cn(
            "px-6 py-2 text-xs font-medium uppercase tracking-button transition-colors",
            value
              ? "bg-charcoal text-cream"
              : "bg-white text-charcoal hover:bg-blush",
          )}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={cn(
            "px-6 py-2 text-xs font-medium uppercase tracking-button transition-colors border-l border-brand",
            !value
              ? "bg-charcoal text-cream"
              : "bg-white text-charcoal hover:bg-blush",
          )}
        >
          No
        </button>
      </div>
      {helper && <p className="mt-2 text-xs text-warmgray/70">{helper}</p>}
    </div>
  );
}
