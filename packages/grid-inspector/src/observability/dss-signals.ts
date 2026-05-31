/**
 * ==========================================================================
 * DSS OBSERVABILITY SIGNALS
 * ==========================================================================
 * 
 * This module emits observability signals for the Grid Inspector.
 * 
 * SCOPE DISCIPLINE:
 * - ✅ EMIT signals when events occur
 * - ❌ NEVER validate, interpret, enforce or correct
 * - ❌ NEVER introduce business logic
 * - ❌ NEVER make architectural changes
 * 
 * Signals are emitted as structured objects for consumption by external
 * observability systems (MCP, monitoring tools, analytics, etc.)
 * 
 * Based on governance documents (when available):
 * - DSS_OBSERVABILITY_SIGNALS.md
 * - DSS_OBSERVABILITY_ACTORS.md
 * - MCP_READ_ONLY_CONTRACT.md
 */

/**
 * DSS Version Signal
 * Emitted once on initialization
 */
export interface DssVersionInUseSignal {
  signal: 'dss_version_in_use';
  timestamp: string;
  data: {
    version: string;
    environment: 'development' | 'production';
    gridInspectorVersion?: string;
  };
}

/**
 * Grid Compliance Check Signal
 * Emitted when layouts are evaluated or modified
 */
export interface GridComplianceCheckSignal {
  signal: 'grid_compliance_check';
  timestamp: string;
  data: {
    checkType: 'overlay' | 'layout' | 'sync';
    context: {
      overlay?: {
        columns: number;
        gutter: { x: number; y: number };
        margin: { x: number; y: number };
        padding: { x: number; y: number };
      };
      layout?: {
        gutter: { x: number; y: number };
        margin: { x: number; y: number };
        padding: { x: number; y: number };
      };
      brand?: string;
      theme?: string;
    };
    trigger: 'user_interaction' | 'initialization' | 'sync_check';
  };
}

/**
 * Grid Violation Signal
 * Emitted when documented grid rules are violated
 * 
 * NOTE: This module does NOT determine what is a violation.
 * It only emits the signal when told to do so by calling code.
 */
export interface GridViolationSignal {
  signal: 'grid_violation';
  timestamp: string;
  data: {
    violationType: 'spacing_token' | 'column_count' | 'overlay_layout_mismatch' | 'contrast' | 'unknown';
    severity: 'critical' | 'high' | 'medium' | 'low';
    context: {
      expected?: any;
      actual?: any;
      location?: string;
      affectedProperty?: string;
    };
    description?: string;
  };
}

/**
 * Component Variant Resolution Signal
 * Emitted when component variants are resolved
 * (Only if already applicable in the codebase)
 */
export interface ComponentVariantResolutionSignal {
  signal: 'component_variant_resolution';
  timestamp: string;
  data: {
    component: string;
    variant: string;
    props?: Record<string, any>;
    resolvedClasses?: string[];
    context?: {
      brand?: string;
      theme?: string;
      color?: string;
    };
  };
}

/**
 * Union type of all signals
 */
export type DssSignal =
  | DssVersionInUseSignal
  | GridComplianceCheckSignal
  | GridViolationSignal
  | ComponentVariantResolutionSignal;

/**
 * Signal emitter function
 *
 * This is the ONLY function that should be called to emit signals.
 * It handles logging, formatting, and (future) sending to external systems.
 *
 * IMPLEMENTATION NOTE:
 * Currently logs to console in development.
 * In production, this would send to monitoring/analytics service.
 */
export function emitDssSignal(signal: DssSignal): void {
  // Add timestamp if not present
  if (!signal.timestamp) {
    signal.timestamp = new Date().toISOString();
  }

  // In development, log to console
  if (import.meta.env.DEV) {
    console.log('[DSS Signal]', signal.signal, signal);
  }

  // Future: Send to monitoring service
  // sendToMonitoring(signal);

  // Send to MCP validator (client-side or server)
  sendToMcp(signal);
}

/**
 * Sends signal to MCP for validation
 *
 * ARCHITECTURE:
 * - Currently uses client-side validation (mcp-validator.ts)
 * - Future: Will send to external MCP server
 *
 * MCP responses are available via useMcpValidation() hook
 */
async function sendToMcp(signal: DssSignal): Promise<void> {
  try {
    // Dynamic import to avoid circular dependencies
    const { isMcpConnected, sendToMcpServer, processDssSignal } = await import('./mcp-validator');

    // Use server if connected, otherwise client-side
    const result = isMcpConnected()
      ? await sendToMcpServer(signal)
      : processDssSignal(signal);

    // Log MCP validation results in development
    if (import.meta.env.DEV && result.validations.length > 0) {
      console.group('[MCP Validation]', signal.signal);

      if (result.hasErrors) {
        console.error('❌ Erros detectados:', result.validations.filter(v => v.severity === 'error'));
      }

      if (result.hasWarnings) {
        console.warn('⚠️ Avisos:', result.validations.filter(v => v.severity === 'warning'));
      }

      if (result.hasSuggestions) {
        console.info('💡 Sugestões:', result.validations.filter(v => v.severity === 'suggestion'));
      }

      console.groupEnd();
    }

    // Dispatch MCP result as custom event for React hooks to consume
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mcp-validation', {
        detail: { signal, result }
      }));
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[MCP Error]', error);
    }
  }
}

/**
 * Emit dss_version_in_use signal
 * Should be called once on Grid Inspector initialization
 */
export function emitDssVersionInUse(version: string, gridInspectorVersion?: string): void {
  emitDssSignal({
    signal: 'dss_version_in_use',
    timestamp: new Date().toISOString(),
    data: {
      version,
      environment: import.meta.env.DEV ? 'development' : 'production',
      gridInspectorVersion,
    },
  });
}

/**
 * Emit grid_compliance_check signal
 * Should be called when layouts are evaluated or modified
 */
export function emitGridComplianceCheck(
  checkType: GridComplianceCheckSignal['data']['checkType'],
  context: GridComplianceCheckSignal['data']['context'],
  trigger: GridComplianceCheckSignal['data']['trigger']
): void {
  emitDssSignal({
    signal: 'grid_compliance_check',
    timestamp: new Date().toISOString(),
    data: {
      checkType,
      context,
      trigger,
    },
  });
}

/**
 * Emit grid_violation signal
 * Should be called when documented grid rules are violated
 * 
 * IMPORTANT: This function does NOT determine violations.
 * It only emits the signal when called.
 */
export function emitGridViolation(
  violationType: GridViolationSignal['data']['violationType'],
  severity: GridViolationSignal['data']['severity'],
  context: GridViolationSignal['data']['context'],
  description?: string
): void {
  emitDssSignal({
    signal: 'grid_violation',
    timestamp: new Date().toISOString(),
    data: {
      violationType,
      severity,
      context,
      description,
    },
  });
}

/**
 * Emit component_variant_resolution signal
 * Should be called when component variants are resolved
 */
export function emitComponentVariantResolution(
  component: string,
  variant: string,
  props?: Record<string, any>,
  resolvedClasses?: string[],
  context?: ComponentVariantResolutionSignal['data']['context']
): void {
  emitDssSignal({
    signal: 'component_variant_resolution',
    timestamp: new Date().toISOString(),
    data: {
      component,
      variant,
      props,
      resolvedClasses,
      context,
    },
  });
}
