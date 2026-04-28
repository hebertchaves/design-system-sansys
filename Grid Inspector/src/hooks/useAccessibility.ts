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
export function useAccessibility(options: AccessibilityOptions): Record<string, any> {
  const attrs: Record<string, any> = {};
  
  // Role ARIA
  if (options.role) {
    attrs.role = options.role;
  }
  
  // Label para leitores de tela
  if (options.ariaLabel) {
    attrs['aria-label'] = options.ariaLabel;
  }
  
  // Referências ARIA
  if (options.ariaDescribedBy) {
    attrs['aria-describedby'] = options.ariaDescribedBy;
  }
  
  if (options.ariaLabelledBy) {
    attrs['aria-labelledby'] = options.ariaLabelledBy;
  }
  
  // Estado desabilitado
  if (options.disabled) {
    attrs['aria-disabled'] = 'true';
    // Remove do tab order quando desabilitado
    attrs.tabIndex = -1;
  } else if (options.focusable !== false) {
    // Permite foco por teclado (padrão)
    attrs.tabIndex = attrs.tabIndex ?? 0;
  }
  
  // Estado de carregamento
  if (options.loading) {
    attrs['aria-busy'] = 'true';
  }
  
  // Atributos customizados
  if (options.customAttrs) {
    Object.assign(attrs, options.customAttrs);
  }
  
  return attrs;
}

/**
 * Gera IDs únicos para acessibilidade
 * 
 * @example
 * ```ts
 * const id = generateA11yId('input') // 'dss-input-1234567890-1'
 * ```
 */
let idCounter = 0;

export function generateA11yId(prefix: string = 'dss'): string {
  idCounter++;
  return `${prefix}-${Date.now()}-${idCounter}`;
}
