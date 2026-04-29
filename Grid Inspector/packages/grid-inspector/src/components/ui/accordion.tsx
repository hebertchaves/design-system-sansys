import { useState, createContext, useContext, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from './utils';

interface AccordionContextValue {
  openItems: string[];
  toggle: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextValue>({
  openItems: [],
  toggle: () => {},
  type: 'multiple',
});

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue>({
  value: '',
  isOpen: false,
});

function Accordion({
  type = 'multiple',
  defaultValue,
  children,
  className,
}: {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  children: ReactNode;
  className?: string;
}) {
  const initial = defaultValue
    ? Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    : [];
  const [openItems, setOpenItems] = useState<string[]>(initial);

  const toggle = (value: string) => {
    if (type === 'single') {
      setOpenItems(prev => prev.includes(value) ? [] : [value]);
    } else {
      setOpenItems(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value],
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle, type }}>
      <div data-slot="accordion" className={className}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: ReactNode;
}) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div data-slot="accordion-item" className={cn('border-b last:border-b-0', className)}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

function AccordionTrigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { toggle } = useContext(AccordionContext);
  const { value, isOpen } = useContext(AccordionItemContext);

  return (
    <div className="flex">
      <button
        type="button"
        data-slot="accordion-trigger"
        data-state={isOpen ? 'open' : 'closed'}
        onClick={() => toggle(value)}
        className={cn(
          'flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 w-full',
          className,
        )}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </div>
  );
}

function AccordionContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { isOpen } = useContext(AccordionItemContext);

  if (!isOpen) return null;

  return (
    <div
      data-slot="accordion-content"
      data-state="open"
      className={cn('overflow-hidden text-sm', className)}
    >
      {children}
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
