import { createContext, useContext, type ReactNode } from 'react';
import { cn } from './utils';

interface ToggleGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  value: '',
  onValueChange: () => {},
});

function ToggleGroup({
  type: _type = 'single',
  value = '',
  onValueChange,
  children,
  className,
}: {
  type?: 'single' | 'multiple';
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <ToggleGroupContext.Provider value={{ value, onValueChange: onValueChange ?? (() => {}) }}>
      <div
        data-slot="toggle-group"
        className={cn('flex items-center', className)}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

function ToggleGroupItem({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { value: selectedValue, onValueChange } = useContext(ToggleGroupContext);
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      data-slot="toggle-group-item"
      data-state={isSelected ? 'on' : 'off'}
      aria-pressed={isSelected}
      onClick={() => onValueChange(value)}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        className,
      )}
    >
      {children}
    </button>
  );
}

export { ToggleGroup, ToggleGroupItem };
