/**
 * ==========================================================================
 * DSS MCP Tool: describe_grid_inspector
 * ==========================================================================
 *
 * Returns a complete operational manual of the Grid Inspector tool,
 * including its 5 operational fronts, architecture, MCP integration,
 * canonical breakpoints, and CI Gate usage.
 *
 * This tool is the primary entry point for AI agents that need to
 * understand the Grid Inspector before using it. It eliminates the
 * need to read multiple README files spread across the repository.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface GridInspectorDescription {
  tool: string;
  version: string;
  summary: string;
  why_it_exists: string;
  operational_fronts: OperationalFront[];
  architecture: Architecture;
  panels: Panel[];
  canonical_breakpoints: BreakpointConfig[];
  valid_spacing_tokens: number[];
  valid_column_counts: number[];
  css_variables: CssVariables;
  mcp_integration: McpIntegration;
  ci_gate: CiGate;
  key_concepts: KeyConcept[];
  documentation_map: DocumentationEntry[];
}

interface OperationalFront {
  id: number;
  name: string;
  description: string;
  mechanism: string;
}

interface Architecture {
  overlay_grid: string;
  layout_grid: string;
  sync_rule: string;
  state_persistence: string;
  global_api: string;
}

interface Panel {
  id: number;
  name: string;
  color: string;
  purpose: string;
  controls: string[];
}

interface BreakpointConfig {
  name: string;
  viewport_px: number;
  columns: number;
  gutter_px: number;
  margin_px: number;
  padding_px: number;
}

interface CssVariables {
  overlay_visual: string[];
  layout_functional: string[];
  element_specific: string[];
}

interface McpIntegration {
  server_url: string;
  fallback: string;
  signals_emitted: string[];
  tools_available: string[];
  connection_indicator: string;
}

interface CiGate {
  script: string;
  usage_examples: string[];
  input_formats: string[];
  exit_codes: Record<string, string>;
  env_vars: Record<string, string>;
  fail_on_default: string;
}

interface KeyConcept {
  concept: string;
  description: string;
}

interface DocumentationEntry {
  scope: string;
  path: string;
  audience: string;
}

// ─── Implementation ───────────────────────────────────────────────────────────

export async function describeGridInspector(): Promise<GridInspectorDescription> {
  return {
    tool: "@sansys/grid-inspector",
    version: "1.0.0",
    summary:
      "Universal layout inspection, editing and validation tool built to enforce DSS compliance. Operates as a non-intrusive overlay injected into any page — it never modifies the application DOM, communicating exclusively via CSS custom properties.",
    why_it_exists:
      "To eliminate guesswork in interface spacing. The Grid Inspector allows designers, developers and AI agents to visualize, edit and validate the spacing hierarchy of any page against official DSS tokens, without modifying source code.",

    operational_fronts: [
      {
        id: 1,
        name: "Visual Debugger",
        description: "Draws the grid over the page",
        mechanism:
          "Injects a position:fixed overlay (z-index: 1000000, pointer-events: none) with columns, gutters, margins and paddings rendered as colored bands.",
      },
      {
        id: 2,
        name: "Layout Editor",
        description: "Changes real component spacing",
        mechanism:
          "Writes --dss-layout-gap-*, --dss-layout-margin-*, --dss-layout-padding-* CSS custom properties to :root (global) or element.style inline (Selection Mode).",
      },
      {
        id: 3,
        name: "Token Validator",
        description: "Enforces DSS compliance in real time",
        mechanism:
          "Validates that all spacing values belong to the official DSS token scale. Violations are shown in the Alerts tab with severity levels.",
      },
      {
        id: 4,
        name: "Brand Switcher",
        description: "Tests themes and brands without code changes",
        mechanism:
          "Injects data-brand='hub|water|waste' on <html> in real time, activating all brand selectors in DSS components.",
      },
      {
        id: 5,
        name: "CI Reporter",
        description: "Blocks non-compliant PRs",
        mechanism:
          "Exports grid configuration as JSON that can be validated by the CI Gate script (validate-grid-ci.mjs), returning exit code 0 (pass) or 1 (fail).",
      },
    ],

    architecture: {
      overlay_grid:
        "Visual didactic grid drawn on screen. Does NOT affect component spacing. Controlled by Overlay tab.",
      layout_grid:
        "Functional grid that injects real spacing values consumed by DSS components via CSS vars. Controlled by Layout tab.",
      sync_rule:
        "Overlay and Layout MUST be synchronized. Divergence triggers a severity:error violation in the Alerts tab.",
      state_persistence:
        "Full state persisted in localStorage under key 'sansys-grid-inspector-v1'. Survives page reloads.",
      global_api:
        "window.__SANSYS_GRID_INSPECTOR__ = { eject, toggle, version } — allows programmatic control without importing the package.",
    },

    panels: [
      {
        id: 1,
        name: "Layout",
        color: "green",
        purpose: "Controls real component spacing via CSS vars injected in :root",
        controls: [
          "Columns selector: [4, 6, 8, 10, 12, 16]",
          "Container Type: Fixed | Fluid",
          "Auto Column Width: toggle between 1fr and calculated fixed width",
          "Breakpoint presets: Mobile/Tablet/Desktop/Ultra (sync all values at once)",
          "Gap X/Y sliders (0–64px, step 4px)",
          "Padding L/R and T/B sliders (0–96px, step 4px)",
          "Margin X/Y sliders (0–96px, step 4px)",
        ],
      },
      {
        id: 2,
        name: "Overlay",
        color: "purple",
        purpose:
          "Controls the visual grid drawn on screen. In Selection Mode, edits the selected element's grid individually.",
        controls: [
          "Same controls as Layout tab (independent values)",
          "Grid type: Columnar (default) | Modular (64×64px) | Asymmetric (2fr 3fr 2fr 5fr)",
          "When element selected: header changes to green and shows 'EDITING ELEMENT' with tag and id",
        ],
      },
      {
        id: 3,
        name: "Show",
        color: "blue",
        purpose: "Controls visibility of each overlay layer independently",
        controls: [
          "X axis: Columns (rose), Padding L/R (green), Margin L/R (orange)",
          "Y axis: Rows (rose, auto-detected from DOM), Padding T/B (green), Margin T/B (orange), Gap Y (blue)",
          "Baseline Grid (violet): toggle visibility",
          "Global overlay opacity slider (0–100%)",
          "Show Overlay master toggle",
        ],
      },
      {
        id: 4,
        name: "Advanced",
        color: "indigo",
        purpose: "Selection Mode, Brand DSS, Baseline Grid, Density Mode",
        controls: [
          "Selection Mode: click any element to edit its grid individually. Tracking key is element.id — elements without id go to 'no-id' bucket.",
          "Brand DSS: applies data-brand='hub|water|waste' on <html> in real time",
          "Baseline Grid: toggle between 4px and 8px grid lines",
          "Density Mode: Comfortable (×1.0) | Compact (×0.75) | Dense (×0.5) — multiplier applied to all Layout values",
        ],
      },
      {
        id: 5,
        name: "Alerts",
        color: "red",
        purpose: "Real-time DSS violation detection and export",
        controls: [
          "Violation list with severity: critical, high, medium, low",
          "Violation types: spacing_token, column_count, overlay_layout_mismatch, contrast",
          "Click violation to highlight the corresponding row in the overlay",
          "Export button: downloads grid-report-{timestamp}.json",
        ],
      },
    ],

    canonical_breakpoints: [
      { name: "Mobile", viewport_px: 375, columns: 4, gutter_px: 8, margin_px: 16, padding_px: 8 },
      { name: "Tablet", viewport_px: 768, columns: 8, gutter_px: 16, margin_px: 24, padding_px: 16 },
      { name: "Desktop", viewport_px: 1440, columns: 12, gutter_px: 16, margin_px: 24, padding_px: 24 },
      { name: "Ultra", viewport_px: 1920, columns: 16, gutter_px: 24, margin_px: 40, padding_px: 24 },
    ],

    valid_spacing_tokens: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64],
    valid_column_counts: [4, 8, 12, 16, 24],

    css_variables: {
      overlay_visual: [
        "--grid-overlay-visible: 0 | 1",
        "--grid-overlay-opacity: 0.0–1.0",
        "--grid-show-columns: 0 | 1",
        "--grid-show-gaps-x / --grid-show-gaps-y: 0 | 1",
        "--grid-show-padding-x / --grid-show-padding-y: 0 | 1",
        "--grid-show-margin-x / --grid-show-margin-y: 0 | 1",
        "--grid-show-baseline: 0 | 1",
        "--grid-container-type: fixed | fluid",
        "--grid-container-max-width: 375px | 768px | 1440px | 1920px",
        "--grid-baseline: 4px | 8px",
        "--grid-density-multiplier: 0.5 | 0.75 | 1",
      ],
      layout_functional: [
        "--dss-layout-gap-x / --dss-layout-gap-y: {n}px  (consumed by DSS components)",
        "--dss-layout-margin-x / --dss-layout-margin-y: {n}px",
        "--dss-layout-padding-x / --dss-layout-padding-y: {n}px",
      ],
      element_specific: [
        "--element-grid-columns (applied to element.style inline)",
        "--element-grid-gutter-x / --element-grid-gutter-y",
        "--element-grid-margin-x / --element-grid-margin-y",
        "--element-grid-show-columns / --element-grid-show-rows",
        "--element-grid-show-margins / --element-grid-show-baseline",
      ],
    },

    mcp_integration: {
      server_url: "http://localhost:3001/api/validate-grid-layout (configurable via window.__DSS_MCP_URL__)",
      fallback:
        "If MCP server is offline, client-side validation runs automatically (identical rules). Connection status shown as Wifi/WifiOff icon in panel header.",
      signals_emitted: [
        "dss_version_in_use — on initialization",
        "grid_compliance_check — when overlay/layout is modified",
        "grid_violation — when a rule is violated",
        "component_variant_resolution — when variants are resolved",
      ],
      tools_available: [
        "describe_grid_inspector — returns this manual (use FIRST before any grid operation)",
        "validate_grid_layout — validates a grid config object against DSS rules",
      ],
      connection_indicator:
        "Wifi icon (green) = MCP server online. WifiOff icon (gray) = client-side fallback active.",
    },

    ci_gate: {
      script: "Grid Inspector/packages/grid-inspector/scripts/validate-grid-ci.mjs",
      usage_examples: [
        "node scripts/validate-grid-ci.mjs config.json",
        "cat grid-report.json | node scripts/validate-grid-ci.mjs --stdin",
        "node scripts/validate-grid-ci.mjs --mcp http://localhost:3001 config.json",
      ],
      input_formats: [
        "Minimal: { overlay: {...}, layout: {...} }",
        "Full export report from the Grid Inspector 'Export' button: { grid: { overlay: {...}, layout: {...} }, ... }",
      ],
      exit_codes: {
        "0": "All checks passed (or only suggestions/info)",
        "1": "Violations at or above DSS_FAIL_ON threshold found — COMPONENT IS BLOCKED",
        "2": "Invalid input or script error",
      },
      env_vars: {
        DSS_MCP_URL: "Override MCP server URL (default: http://localhost:3001)",
        DSS_BRAND: "Brand to validate: hub | water | waste",
        DSS_FAIL_ON: "Minimum severity to fail: critical | high | medium (default: high)",
      },
      fail_on_default:
        "high — violations of severity 'critical' or 'high' cause exit code 1. 'medium' and 'low' are warnings only.",
    },

    key_concepts: [
      {
        concept: "Selection Mode",
        description:
          "Allows editing the grid of a specific element instead of the global grid. Tracking key is element.id — elements without id go to the 'no-id' bucket. This is why id attributes are MANDATORY on major layout elements of complex components.",
      },
      {
        concept: "Density Mode",
        description:
          "Global multiplier applied to all Layout values before writing CSS vars. Comfortable (×1.0), Compact (×0.75), Dense (×0.5). Formula: Math.round(value * densityMultiplier).",
      },
      {
        concept: "Auto-detected Rows",
        description:
          "The GridOverlay uses ResizeObserver + scroll listener to measure DOM children in real time. Groups elements by top position (±2px tolerance). Re-measures on resize and scroll with a 300ms timeout for CSS vars to settle.",
      },
      {
        concept: "contentSelector",
        description:
          "Optional parameter for injectGridInspector(). When provided, the inspector reads real computed values from the container (gridTemplateColumns, columnGap, paddingLeft) before injecting any vars, pre-populating sliders with the actual page state.",
      },
      {
        concept: "Bookmarklet mode",
        description:
          "The inspector can be injected into ANY page (including production) without a build step, via a bookmarklet generated by 'npm run build:bookmarklet'. This enables validation of live environments.",
      },
    ],

    documentation_map: [
      {
        scope: "Overview, 5 fronts, MCP integration, CI Gate",
        path: "Grid Inspector/README.md",
        audience: "All stakeholders, AI agents (read FIRST)",
      },
      {
        scope: "NPM package installation, API, Vue/React integration",
        path: "Grid Inspector/packages/grid-inspector/README.md",
        audience: "Developers integrating the package",
      },
      {
        scope: "Observability signals, grid-rules-observer, MCP validator",
        path: "Grid Inspector/src/observability/README.md",
        audience: "Developers extending the observability layer",
      },
      {
        scope: "React DSS components inside the inspector panel",
        path: "Grid Inspector/src/app/components/dss/README.md",
        audience: "Developers contributing to the inspector UI",
      },
    ],
  };
}
