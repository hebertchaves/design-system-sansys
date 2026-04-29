import { ReactNode } from 'react';

declare function TooltipProvider({ children }: {
    children: ReactNode;
    delayDuration?: number;
}): import("react/jsx-runtime").JSX.Element;
declare function Tooltip({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function TooltipTrigger({ children, asChild: _asChild, }: {
    children: ReactNode;
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function TooltipContent({ children, side, sideOffset: _sideOffset, align: _align, hidden, className, }: {
    children?: ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    align?: string;
    hidden?: boolean;
    className?: string;
}): import("react/jsx-runtime").JSX.Element | null;
export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
//# sourceMappingURL=tooltip.d.ts.map