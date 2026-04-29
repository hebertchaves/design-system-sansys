import { type ReactNode } from 'react';
import { cn } from './utils';

// CSS hover-based tooltip — no Radix dependency.
// Wrap Tooltip > TooltipTrigger + TooltipContent inside a relative group div.

function TooltipProvider({ children }: { children: ReactNode; delayDuration?: number }) {
  return <>{children}</>;
}

function Tooltip({ children }: { children: ReactNode }) {
  return (
    <div className="relative inline-block group" data-slot="tooltip">
      {children}
    </div>
  );
}

function TooltipTrigger({
  children,
  asChild: _asChild,
}: {
  children: ReactNode;
  asChild?: boolean;
}) {
  // asChild is honored implicitly — children render inside the group div
  return <>{children}</>;
}

const SIDE_CLASSES: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
};

function TooltipContent({
  children,
  side = 'top',
  sideOffset: _sideOffset,
  align: _align,
  hidden,
  className,
}: {
  children?: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: string;
  hidden?: boolean;
  className?: string;
}) {
  if (hidden) return null;

  return (
    <div
      role="tooltip"
      data-slot="tooltip-content"
      className={cn(
        'absolute z-[1000002] w-max max-w-[280px] rounded-md px-3 py-1.5 text-xs',
        'opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150',
        // default dark background when no className overrides it
        'bg-slate-800 text-white',
        SIDE_CLASSES[side],
        className,
      )}
    >
      {children}
    </div>
  );
}

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
