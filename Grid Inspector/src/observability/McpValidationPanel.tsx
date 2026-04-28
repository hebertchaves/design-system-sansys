/**
 * ==========================================================================
 * MCP VALIDATION PANEL
 * ==========================================================================
 *
 * Componente de exemplo mostrando como exibir validações MCP em tempo real.
 *
 * USAGE:
 * ```tsx
 * import { McpValidationPanel } from '@/observability/McpValidationPanel';
 *
 * <McpValidationPanel />
 * ```
 */

import { useMcpValidation } from './useMcpValidation';

interface McpValidationPanelProps {
  /** Posição do painel */
  position?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';

  /** Auto-expirar validações após N ms */
  autoExpire?: number;

  /** Mostrar apenas erros críticos */
  errorsOnly?: boolean;
}

export function McpValidationPanel({
  position = 'bottom-right',
  autoExpire,
  errorsOnly = false
}: McpValidationPanelProps) {
  const { validations, hasErrors, hasWarnings, hasSuggestions, clear } =
    useMcpValidation(autoExpire);

  // Filtrar validações se errorsOnly ativo
  const displayValidations = errorsOnly
    ? validations.filter(v => v.severity === 'error')
    : validations;

  if (displayValidations.length === 0) {
    return null;
  }

  // Mapear posição para classes Tailwind
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-left': 'top-4 left-4',
  }[position];

  return (
    <div
      className={`fixed ${positionClasses} z-50 max-w-md space-y-2`}
      role="alert"
      aria-live="polite"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-900">
            MCP Validation
          </span>

          {/* Badges de status */}
          {hasErrors && (
            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
              {validations.filter(v => v.severity === 'error').length} erros
            </span>
          )}
          {hasWarnings && (
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
              {validations.filter(v => v.severity === 'warning').length} avisos
            </span>
          )}
          {hasSuggestions && (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
              {validations.filter(v => v.severity === 'suggestion').length} sugestões
            </span>
          )}
        </div>

        <button
          onClick={clear}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Limpar validações"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Validações */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {displayValidations.map((validation, index) => (
          <ValidationCard key={index} validation={validation} />
        ))}
      </div>
    </div>
  );
}

/**
 * Card individual de validação
 */
function ValidationCard({ validation }: { validation: any }) {
  const severityStyles = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: '❌',
      textColor: 'text-red-900',
      badgeBg: 'bg-red-100',
      badgeText: 'text-red-700',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: '⚠️',
      textColor: 'text-yellow-900',
      badgeBg: 'bg-yellow-100',
      badgeText: 'text-yellow-700',
    },
    suggestion: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: '💡',
      textColor: 'text-blue-900',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-700',
    },
  };

  const style = severityStyles[validation.severity || 'suggestion'];

  return (
    <div
      className={`${style.bg} border ${style.border} rounded-lg p-3 shadow-sm`}
    >
      {/* Mensagem principal */}
      <div className="flex items-start gap-2">
        <span className="text-base flex-shrink-0">{style.icon}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${style.textColor}`}>
            {validation.message}
          </p>

          {/* Sugestão de correção */}
          {validation.suggestion && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className={`px-2 py-0.5 ${style.badgeBg} ${style.badgeText} rounded font-mono`}>
                  {validation.suggestion.property}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="line-through">
                  {formatValue(validation.suggestion.currentValue)}
                </span>
                <span>→</span>
                <span className="font-semibold text-green-700">
                  {formatValue(validation.suggestion.suggestedValue)}
                </span>
              </div>

              {validation.suggestion.reason && (
                <p className="text-xs text-gray-600 mt-1">
                  {validation.suggestion.reason}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Formata valores para exibição
 */
function formatValue(value: any): string {
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }

  if (typeof value === 'number') {
    return `${value}px`;
  }

  return String(value);
}
