import { ReactNode } from 'react';

declare function Tabs({ defaultValue, value: controlledValue, onValueChange, children, className, }: {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function TabsList({ className, children }: {
    className?: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function TabsTrigger({ value, className, children, }: {
    value: string;
    className?: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function TabsContent({ value, className, children, }: {
    value: string;
    className?: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element | null;
export { Tabs, TabsList, TabsTrigger, TabsContent };
//# sourceMappingURL=tabs.d.ts.map