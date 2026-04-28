/**
 * ==========================================================================
 * useAccessibility - React Hook
 * ==========================================================================
 *
 * Portado de: composables/useAccessibility.ts (DSS Lovable)
 * Gera atributos de acessibilidade WCAG 2.1 AA
 *
 * @example
 * ```tsx
 * const a11yAttrs = useAccessibility({
 *   role: 'button',
 *   ariaLabel: 'Close dialog',
 *   disabled: false
 * });
 *
 * <div {...a11yAttrs}>Close</div>
 * ```
 */
/**
 * Opções para atributos de acessibilidade
 */
export interface AccessibilityOptions {
    /**
     * Role ARIA do elemento
     */
    role?: string;
    /**
     * Label descritivo para leitores de tela
     */
    ariaLabel?: string;
    /**
     * Indica se o elemento está desabilitado
     */
    disabled?: boolean;
    /**
     * Indica se o elemento está em estado de carregamento
     */
    loading?: boolean;
    /**
     * ID do elemento que descreve este elemento
     */
    ariaDescribedBy?: string;
    /**
     * ID do elemento que rotula este elemento
     */
    ariaLabelledBy?: string;
    /**
     * Permite navegação por teclado (tab)
     */
    focusable?: boolean;
    /**
     * Atributos adicionais customizados
     */
    customAttrs?: Record<string, any>;
}
/**
 * Hook para atributos de acessibilidade WCAG 2.1 AA
 *
 * Gera atributos HTML apropriados para acessibilidade:
 * - role: define papel semântico
 * - aria-label: descrição para leitores de tela
 * - aria-disabled: estado desabilitado
 * - aria-busy: estado de carregamento
 * - tabindex: controla navegação por teclado
 */
export declare function useAccessibility(options: AccessibilityOptions): Record<string, any>;
export declare function generateA11yId(prefix?: string): string;
//# sourceMappingURL=useAccessibility.d.ts.map