import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/**
 * DssTabs - Componente de abas unificado do Design System Sansys
 * Com micro-interações profissionais de hover, focus e transições suaves
 */

const DssTabs = TabsPrimitive.Root;

interface DssTabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /** Variante visual da lista de abas */
  variant?: "default" | "underline" | "pills";
}

const DssTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  DssTabsListProps
>(({ className, variant = "default", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // Base styles
      "inline-flex items-center justify-start gap-1 flex-wrap",
      // Variant styles
      variant === "default" && [
        "p-1.5 h-auto w-full rounded-xl",
        "bg-[rgba(255,255,255,0.03)]",
        "border border-[rgba(255,255,255,0.06)]",
        "backdrop-blur-sm",
      ],
      variant === "underline" && [
        "w-full p-0 rounded-none bg-transparent",
        "border-b border-[var(--jtech-card-border)]",
      ],
      variant === "pills" && [
        "p-1 h-auto w-full gap-2",
        "bg-transparent",
      ],
      className,
    )}
    {...props}
  />
));
DssTabsList.displayName = "DssTabsList";

interface DssTabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** Variante visual do trigger */
  variant?: "default" | "underline" | "pills";
  /** Ícone opcional (ReactNode) */
  icon?: React.ReactNode;
  /** Badge/contador opcional */
  badge?: string | number;
}

const DssTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  DssTabsTriggerProps
>(({ className, variant = "default", icon, badge, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styles
      "relative inline-flex items-center justify-center gap-2",
      "text-sm font-medium whitespace-nowrap",
      "transition-all duration-300 ease-out",
      "outline-none select-none",
      
      // Text color base
      "text-[var(--jtech-text-body)]",
      
      // Hover - efeito glow sutil
      "hover:text-[var(--jtech-text-heading)]",
      
      // Focus visible - anel de foco acessível
      "focus-visible:ring-2 focus-visible:ring-[var(--dss-jtech-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--jtech-surface-dark)]",
      
      // Disabled
      "disabled:pointer-events-none disabled:opacity-40",
      
      // Variant: default (pill style)
      variant === "default" && [
        "px-4 py-2.5 rounded-lg",
        // Hover background
        "hover:bg-[rgba(255,255,255,0.06)]",
        // Active state
        "data-[state=active]:bg-[var(--dss-jtech-accent)]",
        "data-[state=active]:text-white",
        "data-[state=active]:shadow-lg",
        "data-[state=active]:shadow-[var(--dss-jtech-accent)]/25",
        // Active glow effect
        "data-[state=active]:after:absolute",
        "data-[state=active]:after:inset-0",
        "data-[state=active]:after:rounded-lg",
        "data-[state=active]:after:bg-[var(--dss-jtech-accent)]",
        "data-[state=active]:after:opacity-20",
        "data-[state=active]:after:blur-md",
        "data-[state=active]:after:-z-10",
      ],
      
      // Variant: underline
      variant === "underline" && [
        "px-4 py-3 rounded-none",
        "border-b-2 border-transparent",
        "-mb-px", // Overlap with container border
        // Hover
        "hover:border-[rgba(255,255,255,0.2)]",
        // Active state
        "data-[state=active]:border-[var(--dss-jtech-accent)]",
        "data-[state=active]:text-[var(--dss-jtech-accent)]",
      ],
      
      // Variant: pills (separated)
      variant === "pills" && [
        "px-5 py-2 rounded-full",
        "border border-transparent",
        // Hover
        "hover:border-[rgba(255,255,255,0.1)]",
        "hover:bg-[rgba(255,255,255,0.04)]",
        // Active
        "data-[state=active]:bg-[var(--dss-jtech-accent)]",
        "data-[state=active]:text-white",
        "data-[state=active]:border-[var(--dss-jtech-accent)]",
      ],
      
      className,
    )}
    {...props}
  >
    {/* Icon */}
    {icon && (
      <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
        {icon}
      </span>
    )}
    
    {/* Label */}
    <span className="relative z-10">{children}</span>
    
    {/* Badge */}
    {badge !== undefined && (
      <span 
        className={cn(
          "ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium",
          "bg-[rgba(255,255,255,0.1)]",
          "transition-colors duration-200",
          "group-data-[state=active]:bg-[rgba(255,255,255,0.2)]",
        )}
      >
        {badge}
      </span>
    )}
  </TabsPrimitive.Trigger>
));
DssTabsTrigger.displayName = "DssTabsTrigger";

const DssTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4",
      // Focus
      "outline-none",
      "focus-visible:ring-2 focus-visible:ring-[var(--dss-jtech-accent)] focus-visible:ring-offset-2",
      // Animation
      "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2",
      "data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0",
      "duration-300",
      className,
    )}
    {...props}
  />
));
DssTabsContent.displayName = "DssTabsContent";

export { DssTabs, DssTabsList, DssTabsTrigger, DssTabsContent };
export type { DssTabsListProps, DssTabsTriggerProps };
