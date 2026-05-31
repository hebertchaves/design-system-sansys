import { cn } from './utils';

interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

function Slider({
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
}: SliderProps) {
  const current = value?.[0] ?? defaultValue?.[0] ?? min;
  const pct = Math.max(0, Math.min(100, ((current - min) / (max - min)) * 100));

  return (
    <div
      data-slot="slider"
      className={cn('relative flex w-full touch-none items-center select-none h-5', className)}
    >
      {/* Track */}
      <div className="relative h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className="absolute h-full bg-slate-400 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Thumb — role="slider" so [&_[role=slider]]:* Tailwind classes apply */}
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        className="absolute h-4 w-4 rounded-full border border-slate-300 bg-white shadow-sm pointer-events-none"
        style={{ left: `calc(${pct}% - 8px)` }}
      />

      {/* Transparent native range input for interaction */}
      <input
        type="range"
        value={current}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={e => onValueChange?.([Number(e.target.value)])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        style={{ margin: 0 }}
      />
    </div>
  );
}

export { Slider };
