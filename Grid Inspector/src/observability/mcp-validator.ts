/**
 * ==========================================================================
 * DSS MCP VALIDATOR (Client-side Implementation)
 * ==========================================================================
 *
 * Implements MCP validation rules from GRID_INSPECTOR_MCP_CONTRACT_v0.1.md
 *
 * ARCHITECTURE:
 * - Receives signals from dss-signals.ts
 * - Validates against DSS tokens and rules
 * - Returns suggestions/warnings (read-only)
 * - Does NOT modify state directly
 *
 * FUTURE: Replace with MCP server connection
 */

import type { DssSignal, GridComplianceCheckSignal, GridViolationSignal } from './dss-signals';

// ============================================================================
// TOKENS DSS (conforme contrato MCP v0.1)
// ============================================================================

export const VALID_SPACING_TOKENS = [
  0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64
];

export const VALID_COLUMN_COUNTS = [4, 8, 12, 16, 24];

export const BREAKPOINTS = {
  xs: 0,      // Extra small (mobile)
  sm: 600,    // Small (tablet portrait)
  md: 1024,   // Medium (tablet landscape)
  lg: 1440,   // Large (desktop)
  xl: 1920    // Extra large (wide desktop)
};

// ============================================================================
// MCP VALIDATION RESPONSE TYPES
// ============================================================================

export type McpSeverity = 'error' | 'warning' | 'suggestion';

export interface McpValidationResult {
  valid: boolean;
  severity?: McpSeverity;
  message?: string;
  suggestion?: {
    property: string;
    currentValue: any;
    suggestedValue: any;
    reason: string;
  };
}

// ============================================================================
// REGRA 1: Spacing DEVE usar tokens DSS (CRÍTICA)
// ============================================================================

export function validateSpacingToken(value: number, property: string): McpValidationResult {
  if (VALID_SPACING_TOKENS.includes(value)) {
    return { valid: true };
  }

  // Encontra token mais próximo
  const closest = VALID_SPACING_TOKENS.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );

  return {
    valid: false,
    severity: 'error',
    message: `${property} deve usar token DSS`,
    suggestion: {
      property,
      currentValue: value,
      suggestedValue: closest,
      reason: `${value}px não é token DSS. Use ${closest}px (--dss-spacing-${VALID_SPACING_TOKENS.indexOf(closest)})`
    }
  };
}

// ============================================================================
// REGRA 2: Overlay vs Layout DEVE ser consistente (CRÍTICA)
// ============================================================================

export function validateOverlayLayoutSync(
  overlayValue: number,
  layoutValue: number,
  property: string
): McpValidationResult {
  if (overlayValue === layoutValue) {
    return { valid: true };
  }

  return {
    valid: false,
    severity: 'error',
    message: `⚠️ Inconsistência detectada: Overlay e Layout desincronizados`,
    suggestion: {
      property,
      currentValue: { overlay: overlayValue, layout: layoutValue },
      suggestedValue: layoutValue, // Prioriza o layout real
      reason: `Grid Overlay (${overlayValue}px) difere do Layout Real (${layoutValue}px). Sincronizar?`
    }
  };
}

// ============================================================================
// REGRA 3: Grid columns DEVE ser válido (CRÍTICA)
// ============================================================================

export function validateColumnCount(columns: number): McpValidationResult {
  if (VALID_COLUMN_COUNTS.includes(columns)) {
    return { valid: true };
  }

  // Encontra número de colunas mais próximo
  const closest = VALID_COLUMN_COUNTS.reduce((prev, curr) =>
    Math.abs(curr - columns) < Math.abs(prev - columns) ? curr : prev
  );

  return {
    valid: false,
    severity: 'warning',
    message: `${columns} colunas não segue convenção comum`,
    suggestion: {
      property: 'columns',
      currentValue: columns,
      suggestedValue: closest,
      reason: `${columns} colunas não é convenção. Sugestões: ${VALID_COLUMN_COUNTS.join(', ')}`
    }
  };
}

// ============================================================================
// REGRA 7: Gutter otimizado por dispositivo (SUGESTÃO)
// ============================================================================

export function suggestGutterByBreakpoint(
  currentGutter: number,
  viewportWidth: number
): McpValidationResult {
  let suggestedGutter: number;
  let breakpointName: string;

  if (viewportWidth < BREAKPOINTS.sm) {
    suggestedGutter = 16;
    breakpointName = 'mobile';
  } else if (viewportWidth < BREAKPOINTS.md) {
    suggestedGutter = 20;
    breakpointName = 'tablet';
  } else {
    suggestedGutter = 24;
    breakpointName = 'desktop';
  }

  if (currentGutter === suggestedGutter) {
    return { valid: true };
  }

  return {
    valid: true, // Não invalida, apenas sugere
    severity: 'suggestion',
    message: `💡 Gutter otimizado para ${breakpointName}`,
    suggestion: {
      property: 'gutter',
      currentValue: currentGutter,
      suggestedValue: suggestedGutter,
      reason: `Em ${breakpointName}, gutter de ${suggestedGutter}px é mais comum que ${currentGutter}px`
    }
  };
}

// ============================================================================
// REGRA 6: autoColumnWidth baseado em breakpoint (SUGESTÃO)
// ============================================================================

export function suggestAutoColumnWidth(
  currentAuto: boolean,
  viewportWidth: number
): McpValidationResult {
  const suggestedAuto = viewportWidth < BREAKPOINTS.md;

  if (currentAuto === suggestedAuto) {
    return { valid: true };
  }

  const breakpointName = viewportWidth < BREAKPOINTS.sm ? 'mobile' : 'tablet';

  return {
    valid: true,
    severity: 'suggestion',
    message: `💡 autoColumnWidth otimizado para ${breakpointName}`,
    suggestion: {
      property: 'autoColumnWidth',
      currentValue: currentAuto,
      suggestedValue: suggestedAuto,
      reason: `Em ${breakpointName}, considere autoColumnWidth=${suggestedAuto} para melhor responsividade`
    }
  };
}

// ============================================================================
// MCP SIGNAL PROCESSOR
// ============================================================================

export interface McpProcessorResult {
  validations: McpValidationResult[];
  hasErrors: boolean;
  hasWarnings: boolean;
  hasSuggestions: boolean;
}

/**
 * Processa signal DSS e retorna validações MCP
 *
 * Este é o ponto de entrada principal para validação MCP.
 * Em produção, isto seria substituído por chamada ao servidor MCP.
 */
export function processDssSignal(signal: DssSignal): McpProcessorResult {
  const validations: McpValidationResult[] = [];

  // Processa apenas signals relevantes para validação
  if (signal.signal === 'grid_compliance_check') {
    const checkSignal = signal as GridComplianceCheckSignal;

    // Valida spacing tokens no overlay
    if (checkSignal.data.context.overlay) {
      const { gutter, margin, padding } = checkSignal.data.context.overlay;

      if (gutter) {
        validations.push(validateSpacingToken(gutter.x, 'overlay.gutter.x'));
        validations.push(validateSpacingToken(gutter.y, 'overlay.gutter.y'));
      }

      if (margin) {
        validations.push(validateSpacingToken(margin.x, 'overlay.margin.x'));
        validations.push(validateSpacingToken(margin.y, 'overlay.margin.y'));
      }

      if (padding) {
        validations.push(validateSpacingToken(padding.x, 'overlay.padding.x'));
        validations.push(validateSpacingToken(padding.y, 'overlay.padding.y'));
      }

      // Valida número de colunas
      if (checkSignal.data.context.overlay.columns) {
        validations.push(validateColumnCount(checkSignal.data.context.overlay.columns));
      }
    }

    // Valida spacing tokens no layout
    if (checkSignal.data.context.layout) {
      const { gutter, margin, padding } = checkSignal.data.context.layout;

      if (gutter) {
        validations.push(validateSpacingToken(gutter.x, 'layout.gutter.x'));
        validations.push(validateSpacingToken(gutter.y, 'layout.gutter.y'));
      }

      if (margin) {
        validations.push(validateSpacingToken(margin.x, 'layout.margin.x'));
        validations.push(validateSpacingToken(margin.y, 'layout.margin.y'));
      }

      if (padding) {
        validations.push(validateSpacingToken(padding.x, 'layout.padding.x'));
        validations.push(validateSpacingToken(padding.y, 'layout.padding.y'));
      }
    }

    // Valida sincronização overlay vs layout
    if (checkSignal.data.context.overlay && checkSignal.data.context.layout) {
      const overlay = checkSignal.data.context.overlay;
      const layout = checkSignal.data.context.layout;

      if (overlay.gutter && layout.gutter) {
        validations.push(validateOverlayLayoutSync(
          overlay.gutter.x,
          layout.gutter.x,
          'gutter.x'
        ));
        validations.push(validateOverlayLayoutSync(
          overlay.gutter.y,
          layout.gutter.y,
          'gutter.y'
        ));
      }

      if (overlay.margin && layout.margin) {
        validations.push(validateOverlayLayoutSync(
          overlay.margin.x,
          layout.margin.x,
          'margin.x'
        ));
        validations.push(validateOverlayLayoutSync(
          overlay.margin.y,
          layout.margin.y,
          'margin.y'
        ));
      }

      if (overlay.padding && layout.padding) {
        validations.push(validateOverlayLayoutSync(
          overlay.padding.x,
          layout.padding.x,
          'padding.x'
        ));
        validations.push(validateOverlayLayoutSync(
          overlay.padding.y,
          layout.padding.y,
          'padding.y'
        ));
      }
    }
  }

  // Filtra apenas resultados inválidos ou com sugestões
  const relevantValidations = validations.filter(v => !v.valid || v.suggestion);

  return {
    validations: relevantValidations,
    hasErrors: relevantValidations.some(v => v.severity === 'error'),
    hasWarnings: relevantValidations.some(v => v.severity === 'warning'),
    hasSuggestions: relevantValidations.some(v => v.severity === 'suggestion')
  };
}

// ============================================================================
// MCP CONNECTION (FUTURE)
// ============================================================================

/**
 * Envia signal para servidor MCP externo
 *
 * TODO: Implementar quando servidor MCP estiver disponível
 */
export async function sendToMcpServer(signal: DssSignal): Promise<McpProcessorResult> {
  // FUTURE: HTTP/WebSocket call to MCP server
  // const response = await fetch('http://mcp-server/validate', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(signal)
  // });
  // return response.json();

  // Por enquanto, usa validação client-side
  return processDssSignal(signal);
}

/**
 * Verifica se está conectado ao servidor MCP
 */
export function isMcpConnected(): boolean {
  // FUTURE: Check MCP server connection
  // return mcpClient.isConnected();

  return false; // Client-side apenas por enquanto
}
