import { ReactNode } from 'react';

declare function ToggleGroup({ type: _type, value, onValueChange, children, className, }: {
    type?: 'single' | 'multiple';
    value?: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function ToggleGroupItem({ value, children, className, }: {
    value: string;
    children: ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export { ToggleGroup, ToggleGroupItem };
//# sourceMappingURL=toggle-group.d.ts.map