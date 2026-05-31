import { ReactNode } from 'react';

declare function Accordion({ type, defaultValue, children, className, }: {
    type?: 'single' | 'multiple';
    defaultValue?: string | string[];
    children: ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function AccordionItem({ value, className, children, }: {
    value: string;
    className?: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function AccordionTrigger({ className, children, }: {
    className?: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function AccordionContent({ className, children, }: {
    className?: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element | null;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
//# sourceMappingURL=accordion.d.ts.map