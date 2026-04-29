/**
 * ==========================================================================
 * DSS MCP VALIDATOR (Client-side + HTTP bridge)
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
 * CONNECTION STRATEGY:
 * 1. Tries to call the MCP HTTP server (default: http://localhost:3001)
 * 2. Falls back to client-side validation when server is unreachable
 *
 * TO CHANGE THE SERVER URL:
 *   import { setMcpServerUrl } from './mcp-validator';
 *   setMcpServerUrl('https://your-production-mcp.sansys.com');
 *
 *   Or set before loading the bookmarklet:
 *   window.__DSS_MCP_URL__ = 'https://your-production-mcp.sansys.com';
 */

import type { DssSignal, GridComplianceCheckSignal } from './dss-signals';

// ============================================================================
// MCP SERVER URL — change this OR call setMcpServerUrl() before injection
// ============================================================================

let _mcpServerUrl: string =
  (typeof window !== 'undefined' && (window as any).__DSS_MCP_URL__)
    ? (window as any).__DSS_MCP_URL__
    : 'http://localhost:3001';

/** Override the MCP server URL at runtime. Call before injectGridInspector(). */
export function setMcpServerUrl(url: string): void {
  _mcpServerUrl = url.replace(/\/$/, ''); // strip trailing slash
}

export function getMcpServerUrl(): string {
  return _mcpServerUrl;
}

// ============================================================================
// SIMULATED VIEWPORT WIDTH
// ============================================================================

// When the user selects a breakpoint preset in the panel, the panel sets this
// value so that responsive suggestions use the simulated width instead of the
// real window.innerWidth (useful when testing on a large monitor).
let _simulatedViewportWidth: number | null = null;

/** Set a simulated viewport width. Pass null to revert to window.innerWidth. */
export function setSimulatedViewportWidth(px: number | null): void {
  _simulatedViewportWidth = px;
}

/** Returns the effective viewport width (simulated or real). */
export function getSimulatedViewportWidth(): number {
  if (_simulatedViewportWidth !== null) return _simulatedViewportWidth;
  return typeof window !== 'undefined' ? window.innerWidth : 1440;
}

// ============================================================================
// TOKENS DSS (conforme contrato MCP v0.1)
// ============================================================================

export const VALID_SPACING_TOKENS = [
  0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64
];

export const VALID_COLUMN_COUNTS = [4, 8, 12, 16, 24];

export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 1024,
  lg: 1440,
  xl: 1920,
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

  const closest = VALID_SPACING_TOKENS.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
  );

  return {
    valid: false,
    severity: 'error',
    message: `${property} deve usar token DSS`,
    suggestion: {
      property,
      currentValue: value,
      suggestedValue: closest,
      reason: `${value}px não é token DSS. Use ${closest}px (--dss-spacing-${VALID_SPACING_TOKENS.indexOf(closest)})`,
    },
  };
}

// ============================================================================
// REGRA 2: Overlay vs Layout DEVE ser consistente (CRÍTICA)
// ============================================================================

export function validateOverlayLayoutSync(
  overlayValue: number,
  layoutValue: number,
  property: string,
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
      suggestedValue: layoutValue,
      reason: `Grid Overlay (${overlayValue}px) difere do Layout Real (${layoutValue}px). Sincronizar?`,
    },
  };
}

// ============================================================================
// REGRA 3: Grid columns DEVE ser válido (CRÍTICA)
// ============================================================================

export function validateColumnCount(columns: number): McpValidationResult {
  if (VALID_COLUMN_COUNTS.includes(columns)) {
    return { valid: true };
  }

  const closest = VALID_COLUMN_COUNTS.reduce((prev, curr) =>
    Math.abs(curr - columns) < Math.abs(prev - columns) ? curr : prev,
  );

  return {
    valid: false,
    severity: 'warning',
    message: `${columns} colunas não segue convenção comum`,
    suggestion: {
      property: 'columns',
      currentValue: columns,
      suggestedValue: closest,
      reason: `${columns} colunas não é convenção. Sugestões: ${VALID_COLUMN_COUNTS.join(', ')}`,
    },
  };
}

// ============================================================================
// REGRA 7: Gutter otimizado por dispositivo (SUGESTÃO)
// ============================================================================

export function suggestGutterByBreakpoint(
  currentGutter: number,
  viewportWidth?: number,
): McpValidationResult {
  const width = viewportWidth ?? getSimulatedViewportWidth();
  let suggestedGutter: number;
  let breakpointName: string;

  if (width < BREAKPOINTS.sm) {
    suggestedGutter = 16;
    breakpointName = 'mobile';
  } else if (width < BREAKPOINTS.md) {
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
    valid: true,
    severity: 'suggestion',
    message: `💡 Gutter otimizado para ${breakpointName}`,
    suggestion: {
      property: 'gutter',
      currentValue: currentGutter,
      suggestedValue: suggestedGutter,
      reason: `Em ${breakpointName}, gutter de ${suggestedGutter}px é mais comum que ${currentGutter}px`,
    },
  };
}

// ============================================================================
// REGRA 6: autoColumnWidth baseado em breakpoint (SUGESTÃO)
// ============================================================================

export function suggestAutoColumnWidth(
  currentAuto: boolean,
  viewportWidth?: number,
): McpValidationResult {
  const width = viewportWidth ?? getSimulatedViewportWidth();
  const suggestedAuto = width < BREAKPOINTS.md;

  if (currentAuto === suggestedAuto) {
    return { valid: true };
  }

  const breakpointName = width < BREAKPOINTS.sm ? 'mobile' : 'tablet';

  return {
    valid: true,
    severity: 'suggestion',
    message: `💡 autoColumnWidth otimizado para ${breakpointName}`,
    suggestion: {
      property: 'autoColumnWidth',
      currentValue: currentAuto,
      suggestedValue: suggestedAuto,
      reason: `Em ${breakpointName}, considere autoColumnWidth=${suggestedAuto} para melhor responsividade`,
    },
  };
}

// ============================================================================
// REGRA 8: Brand DSS presente (SUGESTÃO)
// ============================================================================

const VALID_BRANDS = ['hub', 'water', 'waste'] as const;

export function validateBrandPresence(brand?: string | null): McpValidationResult {
  if (brand && (VALID_BRANDS as readonly string[]).includes(brand)) {
    return { valid: true };
  }
  return {
    valid: true,
    severity: 'suggestion',
    message: '💡 Nenhuma brand DSS selecionada',
    suggestion: {
      property: 'brand',
      currentValue: brand ?? null,
      suggestedValue: 'hub | water | waste',
      reason: 'Selecione uma brand DSS (Hub, Water, Waste) para validar tokens de cor específicos da marca',
    },
  };
}

// ============================================================================
// MCP SIGNAL PROCESSOR (client-side fallback)
// ============================================================================

export interface McpProcessorResult {
  validations: McpValidationResult[];
  hasErrors: boolean;
  hasWarnings: boolean;
  hasSuggestions: boolean;
}

/** Client-side validation — mirrors the MCP server logic. Used as fallback. */
export function processDssSignal(signal: DssSignal): McpProcessorResult {
  const validations: McpValidationResult[] = [];

  if (signal.signal === 'grid_compliance_check') {
    const checkSignal = signal as GridComplianceCheckSignal;

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
      if (checkSignal.data.context.overlay.columns) {
        validations.push(validateColumnCount(checkSignal.data.context.overlay.columns));
      }
    }

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

    if (checkSignal.data.context.overlay && checkSignal.data.context.layout) {
      const overlay = checkSignal.data.context.overlay;
      const layout = checkSignal.data.context.layout;

      if (overlay.gutter && layout.gutter) {
        validations.push(validateOverlayLayoutSync(overlay.gutter.x, layout.gutter.x, 'gutter.x'));
        validations.push(validateOverlayLayoutSync(overlay.gutter.y, layout.gutter.y, 'gutter.y'));
      }
      if (overlay.margin && layout.margin) {
        validations.push(validateOverlayLayoutSync(overlay.margin.x, layout.margin.x, 'margin.x'));
        validations.push(validateOverlayLayoutSync(overlay.margin.y, layout.margin.y, 'margin.y'));
      }
      if (overlay.padding && layout.padding) {
        validations.push(validateOverlayLayoutSync(overlay.padding.x, layout.padding.x, 'padding.x'));
        validations.push(validateOverlayLayoutSync(overlay.padding.y, layout.padding.y, 'padding.y'));
      }
    }

    // Brand presence check
    validations.push(validateBrandPresence(checkSignal.data.context.brand));
  }

  const relevantValidations = validations.filter(v => !v.valid || v.suggestion);

  return {
    validations: relevantValidations,
    hasErrors: relevantValidations.some(v => v.severity === 'error'),
    hasWarnings: relevantValidations.some(v => v.severity === 'warning'),
    hasSuggestions: relevantValidations.some(v => v.severity === 'suggestion'),
  };
}

// ============================================================================
// MCP HTTP CONNECTION
// ============================================================================

let _connected = false;

/** Returns true if the last call to sendToMcpServer() succeeded. */
export function isMcpConnected(): boolean {
  return _connected;
}

/**
 * Extracts the grid config from a DssSignal for the HTTP endpoint.
 */
function extractGridConfig(signal: DssSignal): Record<string, unknown> {
  if (signal.signal !== 'grid_compliance_check') return {};
  const s = signal as GridComplianceCheckSignal;
  return {
    overlay: s.data.context.overlay,
    layout: s.data.context.layout,
    viewportWidth: typeof window !== 'undefined' ? window.innerWidth : undefined,
    brand: s.data.context.brand,
    theme: s.data.context.theme,
  };
}

/**
 * Sends a DssSignal to the MCP HTTP server.
 *
 * Falls back to client-side processDssSignal() when the server is unreachable
 * (network error, server not running, CORS issue, etc.).
 *
 * TO SWITCH TO PRODUCTION:
 *   setMcpServerUrl('https://your-production-mcp.sansys.com');
 */
export async function sendToMcpServer(signal: DssSignal): Promise<McpProcessorResult> {
  try {
    const response = await fetch(`${_mcpServerUrl}/api/validate-grid-layout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(extractGridConfig(signal)),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const serverResult = await response.json();
    _connected = true;

    // Adapt server response (GridValidationResult) to McpProcessorResult
    const validations: McpValidationResult[] = (serverResult.violations ?? []).map(
      (v: any) => ({
        valid: false,
        severity: v.severity === 'critical' || v.severity === 'high' ? 'error' : 'warning',
        message: v.message,
        suggestion: v.context?.suggestion
          ? {
              property: v.context.property,
              currentValue: v.context.actual,
              suggestedValue: v.context.suggestion,
              reason: v.message,
            }
          : undefined,
      }),
    );

    return {
      validations,
      hasErrors: serverResult.summary?.critical > 0 || serverResult.summary?.high > 0,
      hasWarnings: serverResult.summary?.medium > 0 || serverResult.summary?.low > 0,
      hasSuggestions: serverResult.summary?.info > 0,
    };
  } catch {
    // Server unreachable — fall back to client-side validation silently
    _connected = false;
    return processDssSignal(signal);
  }
}
