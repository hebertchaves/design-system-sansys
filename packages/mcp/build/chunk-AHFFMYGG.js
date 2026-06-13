// src/tools/validateGridLayout.ts
var VALID_SPACING_TOKENS = [
  0,
  4,
  8,
  12,
  16,
  20,
  24,
  32,
  40,
  48,
  56,
  64
];
var VALID_COLUMN_COUNTS = [4, 8, 12, 16, 24];
var BREAKPOINTS = {
  xs: 0,
  // Extra small (mobile portrait)
  sm: 600,
  // Small (mobile landscape / tablet portrait)
  md: 1024,
  // Medium (tablet landscape / small desktop)
  lg: 1440,
  // Large (desktop)
  xl: 1920
  // Extra large (wide desktop)
};
var RECOMMENDED_CONFIGS = {
  mobile: {
    // < 600px
    columns: [4, 8],
    gutter: { x: 16, y: 16 },
    margin: { x: 16, y: 16 },
    autoColumnWidth: true
  },
  tablet: {
    // 600-1024px
    columns: [8, 12],
    gutter: { x: 20, y: 20 },
    margin: { x: 24, y: 24 },
    autoColumnWidth: true
  },
  desktop: {
    // >= 1024px
    columns: [12, 16],
    gutter: { x: 24, y: 24 },
    margin: { x: 24, y: 32 },
    autoColumnWidth: false
  }
};
async function validateGridLayout(config, dssRoot) {
  const violations = [];
  const suggestions = [];
  if (config.overlay) {
    validateSpacingTokens(
      config.overlay,
      "overlay",
      violations,
      "GRID_INSPECTOR_MCP_CONTRACT_v0.1.md \u2014 Regra 1: Spacing DEVE usar tokens DSS"
    );
  }
  if (config.layout) {
    validateSpacingTokens(
      config.layout,
      "layout",
      violations,
      "GRID_INSPECTOR_MCP_CONTRACT_v0.1.md \u2014 Regra 1: Spacing DEVE usar tokens DSS"
    );
  }
  if (config.overlay && config.layout) {
    validateOverlayLayoutSync(
      config.overlay,
      config.layout,
      violations,
      "GRID_INSPECTOR_MCP_CONTRACT_v0.1.md \u2014 Regra 2: Overlay vs Layout DEVE ser consistente"
    );
  }
  if (config.overlay?.columns) {
    validateColumnCount(
      config.overlay.columns,
      violations,
      "GRID_INSPECTOR_MCP_CONTRACT_v0.1.md \u2014 Regra 3: Grid columns DEVE ser v\xE1lido"
    );
  }
  if (config.layout && config.viewportWidth !== void 0) {
    suggestAutoColumnWidth(
      config.layout.autoColumnWidth,
      config.viewportWidth,
      suggestions
    );
  }
  if (config.layout && config.viewportWidth !== void 0) {
    suggestGutterByBreakpoint(
      config.layout.gutter,
      config.viewportWidth,
      suggestions
    );
  }
  if (config.layout?.margin && config.viewportWidth !== void 0) {
    suggestMarginByBreakpoint(
      config.layout.margin,
      config.viewportWidth,
      suggestions
    );
  }
  if (config.overlay?.columns && config.viewportWidth !== void 0) {
    suggestColumnCountByBreakpoint(
      config.overlay.columns,
      config.viewportWidth,
      suggestions
    );
  }
  const summary = {
    critical: violations.filter((v) => v.severity === "critical").length,
    high: violations.filter((v) => v.severity === "high").length,
    medium: violations.filter((v) => v.severity === "medium").length,
    low: violations.filter((v) => v.severity === "low").length,
    info: [...violations, ...suggestions].filter((v) => v.severity === "info").length,
    total: violations.length + suggestions.length
  };
  let verdict;
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
    notice: READ_ONLY_NOTICE
  };
}
function validateSpacingTokens(gridConfig, context, violations, reference) {
  const properties = [
    { name: "gutter.x", value: gridConfig.gutter?.x },
    { name: "gutter.y", value: gridConfig.gutter?.y },
    { name: "margin.x", value: gridConfig.margin?.x },
    { name: "margin.y", value: gridConfig.margin?.y },
    { name: "padding.x", value: gridConfig.padding?.x },
    { name: "padding.y", value: gridConfig.padding?.y }
  ];
  for (const { name, value } of properties) {
    if (value === void 0) continue;
    if (!VALID_SPACING_TOKENS.includes(value)) {
      const closest = findClosestToken(value);
      const tokenIndex = VALID_SPACING_TOKENS.indexOf(closest);
      violations.push({
        severity: "critical",
        category: "spacing",
        message: `${context}.${name} deve usar token DSS`,
        context: {
          property: `${context}.${name}`,
          actual: value,
          expected: VALID_SPACING_TOKENS,
          suggestion: {
            value: closest,
            token: `--dss-spacing-${tokenIndex}`
          }
        },
        reference
      });
    }
  }
}
function validateOverlayLayoutSync(overlay, layout, violations, reference) {
  const checks = [
    { name: "gutter.x", overlay: overlay.gutter.x, layout: layout.gutter.x },
    { name: "gutter.y", overlay: overlay.gutter.y, layout: layout.gutter.y },
    { name: "margin.x", overlay: overlay.margin.x, layout: layout.margin.x },
    { name: "margin.y", overlay: overlay.margin.y, layout: layout.margin.y },
    { name: "padding.x", overlay: overlay.padding.x, layout: layout.padding.x },
    { name: "padding.y", overlay: overlay.padding.y, layout: layout.padding.y }
  ];
  for (const { name, overlay: overlayVal, layout: layoutVal } of checks) {
    if (overlayVal !== layoutVal) {
      violations.push({
        severity: "critical",
        category: "sync",
        message: `\u26A0\uFE0F Inconsist\xEAncia detectada: Overlay e Layout desincronizados em ${name}`,
        context: {
          property: name,
          actual: { overlay: overlayVal, layout: layoutVal },
          suggestion: layoutVal
          // Prioriza layout real
        },
        reference
      });
    }
  }
}
function validateColumnCount(columns, violations, reference) {
  if (!VALID_COLUMN_COUNTS.includes(columns)) {
    const closest = VALID_COLUMN_COUNTS.reduce(
      (prev, curr) => Math.abs(curr - columns) < Math.abs(prev - columns) ? curr : prev
    );
    violations.push({
      severity: "high",
      category: "columns",
      message: `${columns} colunas n\xE3o segue conven\xE7\xE3o comum`,
      context: {
        property: "overlay.columns",
        actual: columns,
        expected: VALID_COLUMN_COUNTS,
        suggestion: closest
      },
      reference
    });
  }
}
function suggestAutoColumnWidth(currentAuto, viewportWidth, suggestions) {
  const breakpoint = getBreakpoint(viewportWidth);
  const recommended = breakpoint === "mobile" || breakpoint === "tablet" ? true : false;
  if (currentAuto !== recommended) {
    suggestions.push({
      severity: "info",
      category: "optimization",
      message: `\u{1F4A1} autoColumnWidth otimizado para ${breakpoint}`,
      context: {
        property: "layout.autoColumnWidth",
        actual: currentAuto ?? false,
        suggestion: recommended
      },
      reference: "GRID_INSPECTOR_MCP_CONTRACT_v0.1.md \u2014 Regra 6: autoColumnWidth baseado em breakpoint"
    });
  }
}
function suggestGutterByBreakpoint(currentGutter, viewportWidth, suggestions) {
  const breakpoint = getBreakpoint(viewportWidth);
  const recommended = getRecommendedGutter(breakpoint);
  if (currentGutter.x !== recommended.x || currentGutter.y !== recommended.y) {
    suggestions.push({
      severity: "info",
      category: "responsiveness",
      message: `\u{1F4A1} Gutter otimizado para ${breakpoint}`,
      context: {
        property: "layout.gutter",
        actual: currentGutter,
        suggestion: recommended
      },
      reference: "GRID_INSPECTOR_MCP_CONTRACT_v0.1.md \u2014 Regra 7: Gutter otimizado por dispositivo"
    });
  }
}
function suggestMarginByBreakpoint(currentMargin, viewportWidth, suggestions) {
  const breakpoint = getBreakpoint(viewportWidth);
  const recommended = getRecommendedMargin(breakpoint);
  if (currentMargin.x !== recommended.x || currentMargin.y !== recommended.y) {
    suggestions.push({
      severity: "info",
      category: "responsiveness",
      message: `\u{1F4A1} Margin otimizado para ${breakpoint}`,
      context: {
        property: "layout.margin",
        actual: currentMargin,
        suggestion: recommended
      },
      reference: "Material Design Grid Specification"
    });
  }
}
function suggestColumnCountByBreakpoint(currentColumns, viewportWidth, suggestions) {
  const breakpoint = getBreakpoint(viewportWidth);
  const recommended = getRecommendedColumns(breakpoint);
  if (!recommended.includes(currentColumns)) {
    suggestions.push({
      severity: "info",
      category: "responsiveness",
      message: `\u{1F4A1} N\xFAmero de colunas recomendado para ${breakpoint}`,
      context: {
        property: "overlay.columns",
        actual: currentColumns,
        suggestion: recommended[0]
        // Pega o primeiro recomendado
      },
      reference: "Material Design Grid Specification"
    });
  }
}
function findClosestToken(value) {
  return VALID_SPACING_TOKENS.reduce(
    (prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}
function getBreakpoint(viewportWidth) {
  if (viewportWidth < BREAKPOINTS.sm) return "mobile";
  if (viewportWidth < BREAKPOINTS.md) return "tablet";
  return "desktop";
}
function getRecommendedGutter(breakpoint) {
  return RECOMMENDED_CONFIGS[breakpoint].gutter;
}
function getRecommendedMargin(breakpoint) {
  return RECOMMENDED_CONFIGS[breakpoint].margin;
}
function getRecommendedColumns(breakpoint) {
  return RECOMMENDED_CONFIGS[breakpoint].columns;
}
var READ_ONLY_NOTICE = `
Grid Layout Validation \u2014 Read-Only Mode

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
- CLAUDE.md \u2014 Princ\xEDpio #1: Token First
- Material Design Grid Specification
`.trim();

export {
  validateGridLayout
};
