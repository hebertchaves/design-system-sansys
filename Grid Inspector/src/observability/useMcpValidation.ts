/**
 * ==========================================================================
 * USE MCP VALIDATION HOOK
 * ==========================================================================
 *
 * React hook para consumir validações MCP em tempo real.
 *
 * USAGE:
 * ```tsx
 * const { validations, hasErrors, hasWarnings } = useMcpValidation();
 *
 * return (
 *   <div>
 *     {validations.map(v => (
 *       <Alert severity={v.severity}>{v.message}</Alert>
 *     ))}
 *   </div>
 * );
 * ```
 *
 * ARCHITECTURE:
 * - Escuta eventos 'mcp-validation' do window
 * - Acumula validações de múltiplos signals
 * - Fornece helpers para filtrar por severity
 * - Auto-limpa validações antigas (opcional)
 */

import { useState, useEffect } from 'react';
import type { McpValidationResult, McpProcessorResult } from './mcp-validator';
import type { DssSignal } from './dss-signals';

export interface McpValidationState {
  /** Todas as validações ativas */
  validations: McpValidationResult[];

  /** Validações por severity */
  errors: McpValidationResult[];
  warnings: McpValidationResult[];
  suggestions: McpValidationResult[];

  /** Flags de estado */
  hasErrors: boolean;
  hasWarnings: boolean;
  hasSuggestions: boolean;

  /** Total de validações */
  total: number;

  /** Limpar todas as validações */
  clear: () => void;

  /** Limpar validações por severity */
  clearBySeverity: (severity: 'error' | 'warning' | 'suggestion') => void;
}

export interface McpValidationEvent extends CustomEvent {
  detail: {
    signal: DssSignal;
    result: McpProcessorResult;
  };
}

/**
 * Hook para consumir validações MCP
 *
 * @param autoExpire - Tempo em ms para auto-expirar validações (default: disabled)
 * @param maxValidations - Número máximo de validações mantidas (default: 50)
 */
export function useMcpValidation(
  autoExpire?: number,
  maxValidations: number = 50
): McpValidationState {
  const [validations, setValidations] = useState<McpValidationResult[]>([]);

  useEffect(() => {
    function handleMcpValidation(event: Event) {
      const mcpEvent = event as McpValidationEvent;
      const { result } = mcpEvent.detail;

      if (result.validations.length === 0) return;

      setValidations(prev => {
        // Adiciona novas validações
        const updated = [...prev, ...result.validations];

        // Limita número máximo
        if (updated.length > maxValidations) {
          return updated.slice(-maxValidations);
        }

        return updated;
      });
    }

    window.addEventListener('mcp-validation', handleMcpValidation);

    return () => {
      window.removeEventListener('mcp-validation', handleMcpValidation);
    };
  }, [maxValidations]);

  // Auto-expira validações antigas
  useEffect(() => {
    if (!autoExpire) return;

    const interval = setInterval(() => {
      setValidations([]);
    }, autoExpire);

    return () => clearInterval(interval);
  }, [autoExpire]);

  // Helpers para filtrar por severity
  const errors = validations.filter(v => v.severity === 'error');
  const warnings = validations.filter(v => v.severity === 'warning');
  const suggestions = validations.filter(v => v.severity === 'suggestion');

  // Função para limpar validações
  const clear = () => setValidations([]);

  // Função para limpar por severity
  const clearBySeverity = (severity: 'error' | 'warning' | 'suggestion') => {
    setValidations(prev => prev.filter(v => v.severity !== severity));
  };

  return {
    validations,
    errors,
    warnings,
    suggestions,
    hasErrors: errors.length > 0,
    hasWarnings: warnings.length > 0,
    hasSuggestions: suggestions.length > 0,
    total: validations.length,
    clear,
    clearBySeverity,
  };
}

/**
 * Hook para escutar apenas validações de erro (críticas)
 */
export function useMcpErrors(): {
  errors: McpValidationResult[];
  hasErrors: boolean;
  clearErrors: () => void;
} {
  const { errors, hasErrors, clearBySeverity } = useMcpValidation();

  return {
    errors,
    hasErrors,
    clearErrors: () => clearBySeverity('error'),
  };
}

/**
 * Hook para escutar apenas sugestões MCP
 */
export function useMcpSuggestions(): {
  suggestions: McpValidationResult[];
  hasSuggestions: boolean;
  clearSuggestions: () => void;
} {
  const { suggestions, hasSuggestions, clearBySeverity } = useMcpValidation();

  return {
    suggestions,
    hasSuggestions,
    clearSuggestions: () => clearBySeverity('suggestion'),
  };
}

/**
 * Hook para validação específica de propriedade
 *
 * Útil para validar inputs individuais em tempo real.
 *
 * @example
 * ```tsx
 * const gutterValidation = useMcpPropertyValidation('overlay.gutter.x');
 *
 * return (
 *   <Input
 *     error={gutterValidation?.severity === 'error'}
 *     helperText={gutterValidation?.message}
 *   />
 * );
 * ```
 */
export function useMcpPropertyValidation(
  property: string
): McpValidationResult | null {
  const { validations } = useMcpValidation();

  // Retorna a validação mais recente desta propriedade
  const propertyValidation = validations
    .filter(v => v.suggestion?.property === property)
    .pop();

  return propertyValidation || null;
}
