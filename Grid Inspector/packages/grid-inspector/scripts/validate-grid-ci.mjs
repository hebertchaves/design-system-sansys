#!/usr/bin/env node
/**
 * ==========================================================================
 * @sansys/grid-inspector — CI Gate Script
 * ==========================================================================
 *
 * Validates a grid configuration JSON against DSS spacing tokens and rules.
 * Designed to run in CI pipelines (GitHub Actions, Jenkins, etc.).
 *
 * USAGE:
 *   node scripts/validate-grid-ci.mjs <config.json>
 *   cat grid-report.json | node scripts/validate-grid-ci.mjs --stdin
 *   node scripts/validate-grid-ci.mjs --mcp http://localhost:3001 config.json
 *
 * INPUT FORMAT (accepts both):
 *   1. Minimal config:
 *      { "overlay": {...}, "layout": {...} }
 *
 *   2. Full export report (from the Grid Inspector "Export" button):
 *      { "grid": { "overlay": {...}, "layout": {...} }, ... }
 *
 * ENV VARS:
 *   DSS_MCP_URL   Override MCP server URL (default: http://localhost:3001)
 *   DSS_BRAND     Brand to validate (hub | water | waste)
 *   DSS_FAIL_ON   Minimum severity to fail: critical|high|medium (default: high)
 *
 * EXIT CODES:
 *   0  All checks passed (or only suggestions)
 *   1  Violations at or above DSS_FAIL_ON threshold found
 *   2  Invalid input / script error
 */

import { readFileSync } from 'fs';
import { createInterface } from 'readline';

// ============================================================================
// CONFIG
// ============================================================================

const MCP_URL = process.env.DSS_MCP_URL ?? 'http://localhost:3001';
const BRAND   = process.env.DSS_BRAND ?? null;
const FAIL_ON = process.env.DSS_FAIL_ON ?? 'high'; // 'critical' | 'high' | 'medium'

const FAIL_SEVERITIES = {
  critical: ['critical'],
  high:     ['critical', 'high'],
  medium:   ['critical', 'high', 'medium'],
};

// ============================================================================
// DSS TOKENS (mirrors mcp-validator.ts)
// ============================================================================

const VALID_SPACING_TOKENS = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64];
const VALID_COLUMN_COUNTS  = [4, 8, 12, 16, 24];

// ============================================================================
// TERMINAL COLORS
// ============================================================================

const NO_COLOR = !process.stdout.isTTY || process.env.NO_COLOR;

const c = {
  reset:   NO_COLOR ? '' : '\x1b[0m',
  bold:    NO_COLOR ? '' : '\x1b[1m',
  dim:     NO_COLOR ? '' : '\x1b[2m',
  red:     NO_COLOR ? '' : '\x1b[31m',
  yellow:  NO_COLOR ? '' : '\x1b[33m',
  green:   NO_COLOR ? '' : '\x1b[32m',
  blue:    NO_COLOR ? '' : '\x1b[34m',
  magenta: NO_COLOR ? '' : '\x1b[35m',
  cyan:    NO_COLOR ? '' : '\x1b[36m',
  white:   NO_COLOR ? '' : '\x1b[37m',
};

// ============================================================================
// CLIENT-SIDE VALIDATION (fallback when MCP server is unreachable)
// ============================================================================

function closestToken(value) {
  return VALID_SPACING_TOKENS.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

function validateSpacingToken(value, property) {
  if (VALID_SPACING_TOKENS.includes(value)) return null;
  return {
    severity: 'critical',
    property,
    actual: value,
    suggestion: closestToken(value),
    message: `${property}: ${value}px não é token DSS válido → use ${closestToken(value)}px`,
  };
}

function validateColumnCount(columns) {
  if (VALID_COLUMN_COUNTS.includes(columns)) return null;
  const closest = VALID_COLUMN_COUNTS.reduce((prev, curr) =>
    Math.abs(curr - columns) < Math.abs(prev - columns) ? curr : prev
  );
  return {
    severity: 'high',
    property: 'columns',
    actual: columns,
    suggestion: closest,
    message: `${columns} colunas não segue convenção DSS → sugestão: ${closest}`,
  };
}

function validateSync(overlayVal, layoutVal, property) {
  if (overlayVal === layoutVal) return null;
  return {
    severity: 'high',
    property,
    actual: { overlay: overlayVal, layout: layoutVal },
    suggestion: layoutVal,
    message: `Overlay/Layout desincronizados em ${property}: overlay=${overlayVal}px, layout=${layoutVal}px`,
  };
}

function runClientValidation(overlay, layout) {
  const violations = [];

  // Overlay spacing tokens
  if (overlay) {
    const { gutter, margin, padding, columns } = overlay;
    if (gutter)   violations.push(validateSpacingToken(gutter.x,  'overlay.gutter.x'), validateSpacingToken(gutter.y,  'overlay.gutter.y'));
    if (margin)   violations.push(validateSpacingToken(margin.x,  'overlay.margin.x'), validateSpacingToken(margin.y,  'overlay.margin.y'));
    if (padding)  violations.push(validateSpacingToken(padding.x, 'overlay.padding.x'), validateSpacingToken(padding.y, 'overlay.padding.y'));
    if (columns != null) violations.push(validateColumnCount(columns));
  }

  // Layout spacing tokens
  if (layout) {
    const { gutter, margin, padding } = layout;
    if (gutter)   violations.push(validateSpacingToken(gutter.x,  'layout.gutter.x'), validateSpacingToken(gutter.y,  'layout.gutter.y'));
    if (margin)   violations.push(validateSpacingToken(margin.x,  'layout.margin.x'), validateSpacingToken(margin.y,  'layout.margin.y'));
    if (padding)  violations.push(validateSpacingToken(padding.x, 'layout.padding.x'), validateSpacingToken(padding.y, 'layout.padding.y'));
  }

  // Overlay ↔ Layout sync
  if (overlay && layout) {
    if (overlay.gutter && layout.gutter) {
      violations.push(validateSync(overlay.gutter.x, layout.gutter.x, 'gutter.x'));
      violations.push(validateSync(overlay.gutter.y, layout.gutter.y, 'gutter.y'));
    }
    if (overlay.margin && layout.margin) {
      violations.push(validateSync(overlay.margin.x, layout.margin.x, 'margin.x'));
      violations.push(validateSync(overlay.margin.y, layout.margin.y, 'margin.y'));
    }
    if (overlay.padding && layout.padding) {
      violations.push(validateSync(overlay.padding.x, layout.padding.x, 'padding.x'));
      violations.push(validateSync(overlay.padding.y, layout.padding.y, 'padding.y'));
    }
  }

  return violations.filter(Boolean);
}

// ============================================================================
// MCP HTTP VALIDATION
// ============================================================================

async function runMcpValidation(overlay, layout) {
  try {
    const body = JSON.stringify({
      overlay,
      layout,
      brand: BRAND,
      viewportWidth: null,
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${MCP_URL}/api/validate-grid-layout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    // Adapt GridValidationResult → flat violation array
    return (data.violations ?? []).map(v => ({
      severity: v.severity === 'critical' ? 'critical'
               : v.severity === 'high'     ? 'high'
               : v.severity === 'medium'   ? 'medium'
               : 'low',
      property: v.context?.property ?? v.rule ?? 'unknown',
      actual:   v.context?.actual   ?? null,
      suggestion: v.context?.suggestion ?? null,
      message:  v.message,
    }));
  } catch (err) {
    if (err.name === 'AbortError' || err.code === 'ECONNREFUSED' || err.cause?.code === 'ECONNREFUSED') {
      return null; // server unreachable — caller falls back to client-side
    }
    throw err;
  }
}

// ============================================================================
// INPUT PARSING
// ============================================================================

function parseConfig(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('JSON inválido');
  }

  // Support full export report format: { grid: { overlay, layout } }
  if (parsed.grid) {
    return { overlay: parsed.grid.overlay, layout: parsed.grid.layout };
  }

  // Support minimal format: { overlay, layout }
  if (parsed.overlay || parsed.layout) {
    return { overlay: parsed.overlay, layout: parsed.layout };
  }

  throw new Error('Formato não reconhecido. Esperado: { overlay, layout } ou export report completo.');
}

async function readStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    const rl = createInterface({ input: process.stdin });
    rl.on('line', line => { data += line + '\n'; });
    rl.on('close', () => resolve(data));
    rl.on('error', reject);
  });
}

// ============================================================================
// REPORT OUTPUT
// ============================================================================

const SEVERITY_COLOR = {
  critical: c.red,
  high:     c.magenta,
  medium:   c.yellow,
  low:      c.blue,
};

const SEVERITY_ICON = {
  critical: '✖',
  high:     '⚠',
  medium:   '●',
  low:      '○',
};

function printViolation(v) {
  const col  = SEVERITY_COLOR[v.severity] ?? c.white;
  const icon = SEVERITY_ICON[v.severity]  ?? '?';
  console.log(`  ${col}${c.bold}${icon} [${v.severity.toUpperCase()}]${c.reset} ${v.message}`);
  if (v.suggestion != null) {
    console.log(`    ${c.dim}→ sugestão: ${JSON.stringify(v.suggestion)}${c.reset}`);
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  // --- help ---
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
${c.bold}validate-grid-ci.mjs${c.reset} — DSS Grid Inspector CI Gate

Usage:
  node scripts/validate-grid-ci.mjs <config.json>
  cat report.json | node scripts/validate-grid-ci.mjs --stdin

Options:
  --mcp <url>   Override MCP server URL
  --stdin       Read config from stdin
  --help        Show this help

Env vars:
  DSS_MCP_URL   MCP server URL (default: http://localhost:3001)
  DSS_BRAND     Brand to include in context (hub|water|waste)
  DSS_FAIL_ON   Severity threshold to fail: critical|high|medium (default: high)

Exit codes:
  0  Compliant
  1  Violations found at or above DSS_FAIL_ON threshold
  2  Script error / invalid input
`);
    process.exit(0);
  }

  // --- parse --mcp flag ---
  const mcpFlagIdx = args.indexOf('--mcp');
  if (mcpFlagIdx !== -1 && args[mcpFlagIdx + 1]) {
    process.env.DSS_MCP_URL = args[mcpFlagIdx + 1];
  }

  // --- read input ---
  let raw;
  if (args.includes('--stdin')) {
    raw = await readStdin();
  } else {
    const filePath = args.find(a => !a.startsWith('--') && a !== process.env.DSS_MCP_URL);
    if (!filePath) {
      console.error(`${c.red}Erro: forneça um arquivo JSON ou use --stdin${c.reset}`);
      process.exit(2);
    }
    try {
      raw = readFileSync(filePath, 'utf-8');
    } catch {
      console.error(`${c.red}Erro: não foi possível ler '${filePath}'${c.reset}`);
      process.exit(2);
    }
  }

  // --- parse config ---
  let overlay, layout;
  try {
    ({ overlay, layout } = parseConfig(raw));
  } catch (err) {
    console.error(`${c.red}Erro ao parsear config: ${err.message}${c.reset}`);
    process.exit(2);
  }

  // --- header ---
  console.log(`\n${c.bold}${c.cyan}┌─ DSS Grid Inspector — CI Gate${c.reset}`);
  console.log(`${c.cyan}│${c.reset}  Brand : ${BRAND ? `${c.bold}${BRAND}${c.reset}` : `${c.dim}não definida${c.reset}`}`);
  console.log(`${c.cyan}│${c.reset}  Fail on : ${c.bold}${FAIL_ON}${c.reset} e acima`);

  // --- try MCP server ---
  let violations = null;
  let source = 'client-side';

  console.log(`${c.cyan}│${c.reset}  MCP URL : ${MCP_URL}`);

  violations = await runMcpValidation(overlay, layout);
  if (violations !== null) {
    source = 'mcp-server';
    console.log(`${c.cyan}│${c.reset}  Fonte   : ${c.green}MCP Server${c.reset} ✓`);
  } else {
    console.log(`${c.cyan}│${c.reset}  Fonte   : ${c.dim}local (MCP offline)${c.reset}`);
    violations = runClientValidation(overlay, layout);
  }

  console.log(`${c.cyan}└──────────────────────────────${c.reset}\n`);

  // --- results ---
  const failSeverities = FAIL_SEVERITIES[FAIL_ON] ?? FAIL_SEVERITIES.high;
  const blocking = violations.filter(v => failSeverities.includes(v.severity));
  const informational = violations.filter(v => !failSeverities.includes(v.severity));

  if (violations.length === 0) {
    console.log(`${c.green}${c.bold}✓ Nenhuma violação detectada — grid conforme com tokens DSS${c.reset}\n`);
    process.exit(0);
  }

  // Print blocking violations
  if (blocking.length > 0) {
    console.log(`${c.bold}${c.red}Violações bloqueantes (${blocking.length}):${c.reset}`);
    blocking.forEach(printViolation);
    console.log('');
  }

  // Print informational violations
  if (informational.length > 0) {
    console.log(`${c.bold}${c.dim}Avisos não-bloqueantes (${informational.length}):${c.reset}`);
    informational.forEach(printViolation);
    console.log('');
  }

  // --- summary ---
  const countBySeverity = violations.reduce((acc, v) => {
    acc[v.severity] = (acc[v.severity] ?? 0) + 1;
    return acc;
  }, {});

  const summaryParts = Object.entries(countBySeverity).map(
    ([sev, n]) => `${SEVERITY_COLOR[sev] ?? ''}${n} ${sev}${c.reset}`
  );

  console.log(`${c.bold}Resumo:${c.reset} ${summaryParts.join('  |  ')}`);
  console.log(`Fonte  : ${source}\n`);

  if (blocking.length > 0) {
    console.log(`${c.red}${c.bold}✖ CI FALHOU — ${blocking.length} violação(ões) bloqueante(s) (DSS_FAIL_ON=${FAIL_ON})${c.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${c.yellow}${c.bold}⚠ CI passou com avisos (${informational.length} não-bloqueante(s))${c.reset}\n`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error(`${c.red}Erro inesperado: ${err.message}${c.reset}`);
  process.exit(2);
});
