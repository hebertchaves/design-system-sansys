import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GridConfig {
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
    autoColumnWidth?: boolean;
  };
  viewportWidth?: number;
  brand?: "hub" | "water" | "waste";
  theme?: "light" | "dark";
}

type ViolationSeverity = "critical" | "high" | "medium" | "low" | "info";

interface GridViolation {
  severity: ViolationSeverity;
  category: "spacing" | "columns" | "sync" | "responsiveness" | "optimization";
  message: string;
  context: {
    property: string;
    actual: any;
    expected?: any;
    suggestion?: any;
  };
  reference: string;
}

interface GridValidationResult {
  verdict: "compliant" | "non-compliant" | "warnings" | "suggestions-only";
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
    total: number;
  };
  violations: GridViolation[];
  suggestions: GridViolation[];
  config: GridConfig;
  notice: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * Valid DSS spacing tokens (in pixels)
 * Maps to --dss-spacing-{0..16}
 */
const VALID_SPACING_TOKENS = [
  0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64,
] as const;

/**
 * Valid grid column counts per Material Design and CSS Grid conventions
 */
const VALID_COLUMN_COUNTS = [4, 8, 12, 16, 24] as const;

/**
 * DSS Breakpoints (in pixels)
 */
const BREAKPOINTS = {
  xs: 0, // Extra small (mobile portrait)
  sm: 600, // Small (mobile landscape / tablet portrait)
  md: 1024, // Medium (tablet landscape / small desktop)
  lg: 1440, // Large (desktop)
  xl: 1920, // Extra large (wide desktop)
} as const;

/**
 * Recommended grid configurations by breakpoint
 * Based on Material Design and DSS best practices
 */
const RECOMMENDED_CONFIGS = {
  mobile: {
    // < 600px
    columns: [4, 8],
    gutter: { x: 16, y: 16 },
    margin: { x: 16, y: 16 },
    autoColumnWidth: true,
  },
  tablet: {
    // 600-1024px
    columns: [8, 12],
    gutter: { x: 20, y: 20 },
    margin: { x: 24, y: 24 },
    autoColumnWidth: true,
  },
  desktop: {
    // >= 1024px
    columns: [12, 16],
    gutter: { x: 24, y: 24 },
    margin: { x: 24, y: 32 },
    autoColumnWidth: false,
  },
} as const;

// ─── Main Validation Function ─────────────────────────────────────────────────

/**
 * validate_grid_layout — Read-Only
 *
 * Validates grid/layout configuration against DSS spacing tokens and best practices.
 * Checks:
 * 1. Spacing values use DSS tokens (CRITICAL)
 * 2. Overlay vs Layout sync (CRITICAL)
 * 3. Column count conventions (HIGH)
 * 4. Responsive optimization (MEDIUM)
 * 5. Breakpoint-specific suggestions (INFO)
 *
 * Mode: strictly descriptive — never corrective, never mutating.
 * Per MCP_READ_ONLY_CONTRACT.md §3: "Validation must always be descriptive, never corrective."
 */
export async function validateGridLayout(
  config: GridConfig,
  dssRoot: string
): Promise<GridValidationResult> {
  const violations: GridViolation[] = [];
  const suggestions: GridViolation[] = [];

  // ── Critical Validations ────────────────────────────────────────────────────

  // RULE 1: Spacing MUST use DSS tokens
  if (config.overlay) {
    validateSpacingTokens(
      config.overlay,
      "overlay",
      violations,
      "GRID_INSPECTOR_MCP_CONTRACT_v0.1.md — Regra 1: Spacing DEVE usar tokens DSS"
    );
  }

  if (config.layout) {
    validateSpacingTokens(
      config.layout,
      "layout",
      violations,
      "GRID_INSPECTOR_MCP_CONTRACT_v0.1.md — Regra 1: Spacing DEVE usar tokens DSS"
    );
  }

  // RULE 2: Overlay vs Layout MUST be consistent
  if (config.overlay && config.layout) {
    validateOverlayLayoutSync(
      config.overlay,
      config.layout,
      violations,
      "GRID_INSPECTOR_MCP_CONTRACT_v0.1.md — Regra 2: Overlay vs Layout DEVE ser consistente"
    );
  }

  // RULE 3: Column count MUST be valid
  if (config.overlay?.columns) {
    validateColumnCount(
      config.overlay.columns,
      violations,
      "GRID_INSPECTOR_MCP_CONTRACT_v0.1.md — Regra 3: Grid columns DEVE ser válido"
    );
  }

  // ── Optimization Suggestions ────────────────────────────────────────────────

  // RULE 6: autoColumnWidth based on breakpoint
  if (config.layout && config.viewportWidth !== undefined) {
    suggestAutoColumnWidth(
      config.layout.autoColumnWidth,
      config.viewportWidth,
      suggestions
    );
  }

  // RULE 7: Gutter optimized by device
  if (config.layout && config.viewportWidth !== undefined) {
    suggestGutterByBreakpoint(
      config.layout.gutter,
      config.viewportWidth,
      suggestions
    );
  }

  // ── Additional Best Practices ───────────────────────────────────────────────

  // Suggest margin optimization
  if (config.layout?.margin && config.viewportWidth !== undefined) {
    suggestMarginByBreakpoint(
      config.layout.margin,
      config.viewportWidth,
      suggestions
    );
  }

  // Suggest column count by breakpoint
  if (config.overlay?.columns && config.viewportWidth !== undefined) {
    suggestColumnCountByBreakpoint(
      config.overlay.columns,
      config.viewportWidth,
      suggestions
    );
  }

  // ── Result Summary ──────────────────────────────────────────────────────────

  const summary = {
    critical: violations.filter((v) => v.severity === "critical").length,
    high: violations.filter((v) => v.severity === "high").length,
    medium: violations.filter((v) => v.severity === "medium").length,
    low: violations.filter((v) => v.severity === "low").length,
    info: [...violations, ...suggestions].filter((v) => v.severity === "info")
      .length,
    total: violations.length + suggestions.length,
  };

  // Determine verdict
  let verdict: GridValidationResult["verdict"];
  if (summary.critical > 0 || summary.high > 0) {
    verdict = "non-compliant";
  } else if (summary.medium > 0 || summary.low > 0) {
    verdict = "warnings";
  } else if (summary.info > 0) {
    verdict = "suggestions-only";
  } else {
    verdict = "compliant";
  }

  return {
    verdict,
    summary,
    violations,
    suggestions,
    config,
    notice: READ_ONLY_NOTICE,
  };
}

// ─── Validation Rules ─────────────────────────────────────────────────────────

/**
 * RULE 1: Validates that all spacing values use DSS tokens
 */
function validateSpacingTokens(
  gridConfig: {
    gutter?: { x: number; y: number };
    margin?: { x: number; y: number };
    padding?: { x: number; y: number };
  },
  context: "overlay" | "layout",
  violations: GridViolation[],
  reference: string
): void {
  const properties = [
    { name: "gutter.x", value: gridConfig.gutter?.x },
    { name: "gutter.y", value: gridConfig.gutter?.y },
    { name: "margin.x", value: gridConfig.margin?.x },
    { name: "margin.y", value: gridConfig.margin?.y },
    { name: "padding.x", value: gridConfig.padding?.x },
    { name: "padding.y", value: gridConfig.padding?.y },
  ];

  for (const { name, value } of properties) {
    if (value === undefined) continue;

    if (!VALID_SPACING_TOKENS.includes(value as any)) {
      const closest = findClosestToken(value);
      const tokenIndex = VALID_SPACING_TOKENS.indexOf(closest);

      violations.push({
        severity: "critical",
        category: "spacing",
        message: `${context}.${name} deve usar token DSS`,
        context: {
          property: `${context}.${name}`,
          actual: value,
          expected: VALID_SPACING_TOKENS as any,
          suggestion: {
            value: closest,
            token: `--dss-spacing-${tokenIndex}`,
          },
        },
        reference,
      });
    }
  }
}

/**
 * RULE 2: Validates overlay and layout are synchronized
 */
function validateOverlayLayoutSync(
  overlay: {
    gutter: { x: number; y: number };
    margin: { x: number; y: number };
    padding: { x: number; y: number };
  },
  layout: {
    gutter: { x: number; y: number };
    margin: { x: number; y: number };
    padding: { x: number; y: number };
  },
  violations: GridViolation[],
  reference: string
): void {
  const checks = [
    { name: "gutter.x", overlay: overlay.gutter.x, layout: layout.gutter.x },
    { name: "gutter.y", overlay: overlay.gutter.y, layout: layout.gutter.y },
    { name: "margin.x", overlay: overlay.margin.x, layout: layout.margin.x },
    { name: "margin.y", overlay: overlay.margin.y, layout: layout.margin.y },
    { name: "padding.x", overlay: overlay.padding.x, layout: layout.padding.x },
    { name: "padding.y", overlay: overlay.padding.y, layout: layout.padding.y },
  ];

  for (const { name, overlay: overlayVal, layout: layoutVal } of checks) {
    if (overlayVal !== layoutVal) {
      violations.push({
        severity: "critical",
        category: "sync",
        message: `⚠️ Inconsistência detectada: Overlay e Layout desincronizados em ${name}`,
        context: {
          property: name,
          actual: { overlay: overlayVal, layout: layoutVal },
          suggestion: layoutVal, // Prioriza layout real
        },
        reference,
      });
    }
  }
}

/**
 * RULE 3: Validates column count is standard
 */
function validateColumnCount(
  columns: number,
  violations: GridViolation[],
  reference: string
): void {
  if (!VALID_COLUMN_COUNTS.includes(columns as any)) {
    const closest = VALID_COLUMN_COUNTS.reduce((prev, curr) =>
      Math.abs(curr - columns) < Math.abs(prev - columns) ? curr : prev
    );

    violations.push({
      severity: "high",
      category: "columns",
      message: `${columns} colunas não segue convenção comum`,
      context: {
        property: "overlay.columns",
        actual: columns,
        expected: VALID_COLUMN_COUNTS as any,
        suggestion: closest,
      },
      reference,
    });
  }
}

// ─── Optimization Suggestions ─────────────────────────────────────────────────

/**
 * RULE 6: Suggests autoColumnWidth based on breakpoint
 */
function suggestAutoColumnWidth(
  currentAuto: boolean | undefined,
  viewportWidth: number,
  suggestions: GridViolation[]
): void {
  const breakpoint = getBreakpoint(viewportWidth);
  const recommended =
    breakpoint === "mobile" || breakpoint === "tablet" ? true : false;

  if (currentAuto !== recommended) {
    suggestions.push({
      severity: "info",
      category: "optimization",
      message: `💡 autoColumnWidth otimizado para ${breakpoint}`,
      context: {
        property: "layout.autoColumnWidth",
        actual: currentAuto ?? false,
        suggestion: recommended,
      },
      reference:
        "GRID_INSPECTOR_MCP_CONTRACT_v0.1.md — Regra 6: autoColumnWidth baseado em breakpoint",
    });
  }
}

/**
 * RULE 7: Suggests gutter based on device breakpoint
 */
function suggestGutterByBreakpoint(
  currentGutter: { x: number; y: number },
  viewportWidth: number,
  suggestions: GridViolation[]
): void {
  const breakpoint = getBreakpoint(viewportWidth);
  const recommended = getRecommendedGutter(breakpoint);

  if (
    currentGutter.x !== recommended.x ||
    currentGutter.y !== recommended.y
  ) {
    suggestions.push({
      severity: "info",
      category: "responsiveness",
      message: `💡 Gutter otimizado para ${breakpoint}`,
      context: {
        property: "layout.gutter",
        actual: currentGutter,
        suggestion: recommended,
      },
      reference:
        "GRID_INSPECTOR_MCP_CONTRACT_v0.1.md — Regra 7: Gutter otimizado por dispositivo",
    });
  }
}

/**
 * Suggests margin based on device breakpoint
 */
function suggestMarginByBreakpoint(
  currentMargin: { x: number; y: number },
  viewportWidth: number,
  suggestions: GridViolation[]
): void {
  const breakpoint = getBreakpoint(viewportWidth);
  const recommended = getRecommendedMargin(breakpoint);

  if (
    currentMargin.x !== recommended.x ||
    currentMargin.y !== recommended.y
  ) {
    suggestions.push({
      severity: "info",
      category: "responsiveness",
      message: `💡 Margin otimizado para ${breakpoint}`,
      context: {
        property: "layout.margin",
        actual: currentMargin,
        suggestion: recommended,
      },
      reference: "Material Design Grid Specification",
    });
  }
}

/**
 * Suggests column count based on device breakpoint
 */
function suggestColumnCountByBreakpoint(
  currentColumns: number,
  viewportWidth: number,
  suggestions: GridViolation[]
): void {
  const breakpoint = getBreakpoint(viewportWidth);
  const recommended = getRecommendedColumns(breakpoint);

  if (!recommended.includes(currentColumns)) {
    suggestions.push({
      severity: "info",
      category: "responsiveness",
      message: `💡 Número de colunas recomendado para ${breakpoint}`,
      context: {
        property: "overlay.columns",
        actual: currentColumns,
        suggestion: recommended[0], // Pega o primeiro recomendado
      },
      reference: "Material Design Grid Specification",
    });
  }
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Finds the closest valid DSS spacing token
 */
function findClosestToken(value: number): number {
  return VALID_SPACING_TOKENS.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

/**
 * Gets breakpoint name from viewport width
 */
function getBreakpoint(
  viewportWidth: number
): "mobile" | "tablet" | "desktop" {
  if (viewportWidth < BREAKPOINTS.sm) return "mobile";
  if (viewportWidth < BREAKPOINTS.md) return "tablet";
  return "desktop";
}

/**
 * Gets recommended gutter for breakpoint
 */
function getRecommendedGutter(
  breakpoint: "mobile" | "tablet" | "desktop"
): { x: number; y: number } {
  return RECOMMENDED_CONFIGS[breakpoint].gutter;
}

/**
 * Gets recommended margin for breakpoint
 */
function getRecommendedMargin(
  breakpoint: "mobile" | "tablet" | "desktop"
): { x: number; y: number } {
  return RECOMMENDED_CONFIGS[breakpoint].margin;
}

/**
 * Gets recommended column counts for breakpoint
 */
function getRecommendedColumns(
  breakpoint: "mobile" | "tablet" | "desktop"
): readonly number[] {
  return RECOMMENDED_CONFIGS[breakpoint].columns;
}

// ─── Read-Only Notice ─────────────────────────────────────────────────────────

const READ_ONLY_NOTICE = `
Grid Layout Validation — Read-Only Mode

This evaluation is strictly descriptive per MCP_READ_ONLY_CONTRACT.md.
The MCP server observes grid configurations and reports violations/suggestions.

It does NOT:
- Apply fixes automatically
- Modify grid configuration
- Make autonomous decisions

All corrections must be performed by a human developer or through explicit
user action in the Grid Inspector UI.

Severity Levels:
- CRITICAL: Blocks DSS compliance (e.g., non-token spacing, overlay/layout mismatch)
- HIGH: Violates conventions (e.g., non-standard column count)
- MEDIUM: Sub-optimal but acceptable
- LOW: Minor optimization opportunity
- INFO: Suggestions for best practices

References:
- GRID_INSPECTOR_MCP_CONTRACT_v0.1.md
- CLAUDE.md — Princípio #1: Token First
- Material Design Grid Specification
`.trim();
