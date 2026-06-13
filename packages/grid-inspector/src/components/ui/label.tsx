import { type ReactNode } from 'react';
import { cn } from './utils';

interface LabelProps {
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

function Label({ htmlFor, className, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none',
        className,
      )}
    >
      {children}
    </label>
  );
}

export { Label };
