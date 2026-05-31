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
/**
 * Cores semânticas DSS (compatível com Quasar)
 */
export type DssColor = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'positive' | 'negative' | 'warning' | 'info';
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
export declare function useColorClasses(options: ColorClassesOptions): string;
//# sourceMappingURL=useColorClasses.d.ts.map