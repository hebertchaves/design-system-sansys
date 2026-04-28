/**
 * ==========================================================================
 * useColorClasses - React Hook
 * ==========================================================================
 * 
 * Portado de: composables/useColorClasses.ts (DSS Lovable)
 * Gera classes de cores DSS baseadas em variante
 * Segue o padrão Quasar de classes utilitárias (.bg-*, .text-*)
 * 
 * OBSERVABILITY: Emits component_variant_resolution signal
 * 
 * @example
 * ```tsx
 * const colorClasses = useColorClasses({
 *   color: 'primary',
 *   variant: 'filled'
 * });
 * // Retorna: 'bg-primary text-white'
 * ```
 */

import { emitComponentVariantResolution } from '@/observability/dss-signals';

/**
 * Cores semânticas DSS (compatível com Quasar)
 */
export type DssColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info';

/**
 * Opções para geração de classes de cor
 */
export interface ColorClassesOptions {
  /**
   * Cor semântica do componente
   */
  color?: DssColor | string | null;
  
  /**
   * Cor customizada do texto (sobrescreve padrão)
   */
  textColor?: string | null;
  
  /**
   * Variante que afeta aplicação de cores
   * - 'filled': bg-{color} + text-white
   * - 'outlined': text-{color} (sem background)
   * - 'flat': text-{color} (sem background)
   * - 'transparent': text-{color} (sem background)
   */
  variant?: 'filled' | 'outlined' | 'flat' | 'transparent';
}

/**
 * Hook para gerar classes de cores DSS
 * 
 * Gera classes utilitárias DSS baseadas em cor e variante:
 * - Variantes filled: bg-{color} + text-white
 * - Variantes outlined/flat/transparent: text-{color}
 * - Override com textColor quando fornecido
 */
export function useColorClasses(options: ColorClassesOptions): string {
  if (!options.color) return '';
  
  // Determina se a variante usa background ou apenas texto
  const usesBackground = !options.variant || options.variant === 'filled';
  
  let classes = '';
  const resolvedClasses: string[] = [];
  
  if (usesBackground) {
    // Variante filled: fundo colorido + texto branco
    classes = `bg-${options.color} text-white`;
    resolvedClasses.push(`bg-${options.color}`, 'text-white');
  } else {
    // Variantes outlined/flat/transparent: apenas cor de texto
    classes = `text-${options.color}`;
    resolvedClasses.push(`text-${options.color}`);
  }
  
  // Override de text color se especificado
  if (options.textColor) {
    classes += ` text-${options.textColor}`;
    resolvedClasses.push(`text-${options.textColor}`);
  }
  
  // OBSERVABILITY: Emit component_variant_resolution signal
  // This tracks how color variants are resolved across the system
  emitComponentVariantResolution(
    'ColorClasses', // Component using this hook
    options.variant || 'filled',
    {
      color: options.color,
      textColor: options.textColor,
      usesBackground
    },
    resolvedClasses
  );
  
  return classes;
}