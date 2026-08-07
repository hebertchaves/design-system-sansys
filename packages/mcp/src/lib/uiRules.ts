import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve, join } from "path";

/**
 * uiRules — Shared loader for the DSS UI Rules contract.
 *
 * Single point where `docs/guides/ui-rules/ui-rules.schema.json` is read from
 * disk, alongside the two other sources it must agree with:
 *   - the real component catalog (packages/core/components/*)
 *   - the real spacing scale (packages/core/tokens/semantic/_spacing.scss)
 *
 * Rationale: the schema was authored 2026-04-28 declaring itself "o contrato
 * programático que o MCP consome diretamente", but no consumer was ever wired
 * (the MCP phase plans never referenced it). Everything derived here is read at
 * runtime — never transcribed into constants — so the schema cannot silently
 * drift away from the code again.
 */

// ─── Paths ────────────────────────────────────────────────────────────────────

const SCHEMA_PATH = "docs/guides/ui-rules/ui-rules.schema.json";
const SPACING_PATH = "packages/core/tokens/semantic/_spacing.scss";
const COMPONENT_GROUPS = [
  "base",
  "composed",
  "feedback",
  "forms",
  "layout",
  "stress-test",
] as const;

/** Component groups that are fixtures, not production components. */
const FIXTURE_GROUPS = new Set(["stress-test"]);

/** Non-component tokens allowed as leaves in a composition tree. */
export const SENTINELS = new Set(["text", "*"]);

// ─── Schema types ─────────────────────────────────────────────────────────────

export interface HierarchyLevel {
  label: string;
  components: string[];
  padding_tokens: string[];
  gap_tokens: string[];
}

export interface ComponentRule {
  module?: string;
  allowed_variants?: string[];
  allowed_children?: string[];
  forbidden_children?: string[];
  forbidden_contexts?: string[];
  required_props?: string[];
  nesting_rule?: string;
  mobile_rule?: string;
  use_case?: string;
  forbidden_use?: string;
  spacing_rules?: Record<string, string>;
  color_tokens?: string[];
  [key: string]: unknown;
}

export interface UiRulesSchema {
  title: string;
  version: string;
  hierarchy: Record<string, HierarchyLevel | string>;
  components: Record<string, ComponentRule>;
  empty_states: Record<string, unknown>;
  form_rules: {
    module?: string;
    applies_to?: string[];
    field_components?: string[];
    gutter_tokens?: string[];
    max_visible_fields?: number;
    mobile_rule?: string;
    validation?: Record<string, unknown>;
  };
  table_rules: {
    module?: string;
    applies_to?: string[];
    cell_padding_tokens?: string[];
    mobile_rule?: string;
    pagination_position?: string;
    empty_state_required?: boolean;
    loading_state_required?: boolean;
  };
}

// ─── Component catalog (from disk) ────────────────────────────────────────────

export interface CatalogEntry {
  name: string;
  group: string;
  isFixture: boolean;
}

/**
 * Reads the real component catalog from packages/core/components.
 * The catalog is the authority on "does this component exist" — not the schema.
 */
export function loadComponentCatalog(dssRoot: string): Map<string, CatalogEntry> {
  const catalog = new Map<string, CatalogEntry>();

  for (const group of COMPONENT_GROUPS) {
    const groupDir = resolve(dssRoot, "packages/core/components", group);
    if (!existsSync(groupDir)) continue;

    for (const entry of readdirSync(groupDir, { withFileTypes: true })) {
      if (!entry.isDirectory() || !entry.name.startsWith("Dss")) continue;
      catalog.set(entry.name, {
        name: entry.name,
        group,
        isFixture: FIXTURE_GROUPS.has(group),
      });
    }
  }

  return catalog;
}

// ─── Spacing scale (from disk) ────────────────────────────────────────────────

export interface SpacingToken {
  name: string;
  px: number;
}

/**
 * Parses the real spacing scale from _spacing.scss into a token → px map.
 *
 * Replaces the previous hardcoded array + index-based naming, which produced
 * wrong token names above 24px (value 40 resolved to `--dss-spacing-8`, which
 * is 32px; the real 40px token is `--dss-spacing-10`).
 */
export function loadSpacingScale(dssRoot: string): SpacingToken[] {
  const path = resolve(dssRoot, SPACING_PATH);
  if (!existsSync(path)) return [];

  const source = readFileSync(path, "utf-8");
  const tokens: SpacingToken[] = [];
  const seen = new Set<string>();

  // --dss-spacing-4: 1rem;   |   --dss-spacing-0: 0;   |   --dss-spacing-px: 1px;
  const re = /(--dss-spacing-[\w-]+)\s*:\s*([\d.]+)\s*(rem|px)?\s*;/g;
  let match: RegExpExecArray | null;

  while ((match = re.exec(source)) !== null) {
    const [, name, rawValue, unit] = match;
    if (seen.has(name)) continue;
    seen.add(name);

    const value = parseFloat(rawValue);
    if (Number.isNaN(value)) continue;

    tokens.push({ name, px: unit === "rem" ? value * 16 : value });
  }

  return tokens.sort((a, b) => a.px - b.px);
}

/** Resolves a token name (e.g. "--dss-spacing-4") to its pixel value. */
export function resolveSpacingToken(
  tokenName: string,
  scale: SpacingToken[]
): number | null {
  const found = scale.find((t) => t.name === tokenName);
  return found ? found.px : null;
}

/** Finds the spacing token whose value is closest to a raw pixel value. */
export function closestSpacingToken(
  px: number,
  scale: SpacingToken[]
): SpacingToken | null {
  if (scale.length === 0) return null;
  return scale.reduce((prev, curr) =>
    Math.abs(curr.px - px) < Math.abs(prev.px - px) ? curr : prev
  );
}

// ─── Schema loading ───────────────────────────────────────────────────────────

export interface LoadedRules {
  schema: UiRulesSchema;
  schemaPath: string;
  catalog: Map<string, CatalogEntry>;
  spacing: SpacingToken[];
}

export function loadUiRules(dssRoot: string): LoadedRules | null {
  const path = resolve(dssRoot, SCHEMA_PATH);
  if (!existsSync(path)) return null;

  const schema = JSON.parse(readFileSync(path, "utf-8")) as UiRulesSchema;

  return {
    schema,
    schemaPath: SCHEMA_PATH,
    catalog: loadComponentCatalog(dssRoot),
    spacing: loadSpacingScale(dssRoot),
  };
}

// ─── Schema integrity (anti-rot) ──────────────────────────────────────────────

export interface SchemaIntegrity {
  schemaVersion: string;
  schemaPath: string;
  componentsInCatalog: number;
  componentsCitedBySchema: number;
  unknownComponents: string[];
  fixtureComponents: string[];
  unknownSpacingTokens: string[];
  healthy: boolean;
  summary: string;
}

/**
 * Existence-checks the schema's own vocabulary against the repository.
 *
 * Reported on every validation call so a schema that drifts away from the code
 * announces itself instead of rotting silently — the failure mode that left
 * this file without a consumer for three months.
 */
export function checkSchemaIntegrity(rules: LoadedRules): SchemaIntegrity {
  const { schema, catalog, spacing } = rules;
  const cited = new Set<string>();
  const citedTokens = new Set<string>();

  const citeComponent = (raw: string) => {
    const base = raw.replace(/\[.*\]$/, "").trim();
    if (base && !SENTINELS.has(base)) cited.add(base);
  };

  for (const level of Object.values(schema.hierarchy)) {
    if (typeof level === "string") continue;
    level.components?.forEach(citeComponent);
    level.padding_tokens?.forEach((t) => citedTokens.add(t));
    level.gap_tokens?.forEach((t) => citedTokens.add(t));
  }

  for (const [name, rule] of Object.entries(schema.components)) {
    citeComponent(name);
    for (const key of ["allowed_children", "forbidden_children", "forbidden_contexts"] as const) {
      (rule[key] ?? []).forEach(citeComponent);
    }
    Object.values(rule.spacing_rules ?? {}).forEach((t) => {
      if (typeof t === "string" && t.startsWith("--dss-")) citedTokens.add(t);
    });
  }

  for (const t of schema.table_rules?.cell_padding_tokens ?? []) citedTokens.add(t);

  // Subjects the screen-level rules govern (added in schema v1.2.0 so the rules
  // are executable — previously they stated a constraint without naming a target).
  schema.table_rules?.applies_to?.forEach(citeComponent);
  schema.form_rules?.applies_to?.forEach(citeComponent);
  schema.form_rules?.field_components?.forEach(citeComponent);

  const unknownComponents = [...cited].filter((c) => !catalog.has(c)).sort();
  const fixtureComponents = [...cited]
    .filter((c) => catalog.get(c)?.isFixture)
    .sort();

  const knownTokens = new Set(spacing.map((t) => t.name));
  const unknownSpacingTokens = [...citedTokens]
    .filter((t) => !knownTokens.has(t))
    .sort();

  const healthy =
    unknownComponents.length === 0 && unknownSpacingTokens.length === 0;

  const parts: string[] = [];
  if (unknownComponents.length > 0) {
    parts.push(`${unknownComponents.length} componente(s) inexistente(s): ${unknownComponents.join(", ")}`);
  }
  if (unknownSpacingTokens.length > 0) {
    parts.push(`${unknownSpacingTokens.length} token(s) de spacing inexistente(s): ${unknownSpacingTokens.join(", ")}`);
  }
  if (fixtureComponents.length > 0) {
    parts.push(`${fixtureComponents.length} fixture(s) tratado(s) como componente: ${fixtureComponents.join(", ")}`);
  }

  return {
    schemaVersion: schema.version,
    schemaPath: rules.schemaPath,
    componentsInCatalog: catalog.size,
    componentsCitedBySchema: cited.size,
    unknownComponents,
    fixtureComponents,
    unknownSpacingTokens,
    healthy,
    summary: healthy
      ? `Schema íntegro: ${cited.size} componentes citados, todos existem no catálogo (${catalog.size}).`
      : `Schema com divergências — ${parts.join(" · ")}`,
  };
}

// ─── Hierarchy helpers ────────────────────────────────────────────────────────

export interface HierarchyInfo {
  level: number;
  label: string;
  paddingTokens: string[];
}

/** Returns the Matryoshka hierarchy level of a component, if the schema places it. */
export function hierarchyLevelOf(
  component: string,
  schema: UiRulesSchema
): HierarchyInfo | null {
  for (const [key, level] of Object.entries(schema.hierarchy)) {
    if (typeof level === "string") continue;
    if (level.components?.includes(component)) {
      const parsed = parseInt(key.replace("level_", ""), 10);
      if (Number.isNaN(parsed)) continue;
      return {
        level: parsed,
        label: level.label,
        paddingTokens: level.padding_tokens ?? [],
      };
    }
  }
  return null;
}

/** Splits a schema child reference like "DssCard[variant=elevated]" into parts. */
export function parseChildRef(ref: string): {
  component: string;
  variant?: string;
} {
  const match = ref.match(/^([^[]+)\[variant=([^\]]+)\]$/);
  if (match) return { component: match[1].trim(), variant: match[2].trim() };
  return { component: ref.trim() };
}

/** Resolves the module doc (e.g. "04_FORMS_INPUTS") to its repo path. */
export function moduleReference(module?: string): string {
  return module
    ? `docs/guides/ui-rules/${module}.md`
    : "docs/guides/ui-rules/";
}
