import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

interface ComponentQueryResult {
  component: string;
  found: boolean;
  meta: Record<string, unknown> | null;
  prePrompt: string | null;
  documentation: string | null;
  summary: string;
}

/**
 * query_component — Read-Only
 *
 * Reads dss.meta.json, pre-prompt and DssXxx.md for a given component.
 * Never writes or modifies any file.
 */
export async function queryComponent(
  componentName: string,
  dssRoot: string
): Promise<ComponentQueryResult> {
  // Normalize: accept "DssCard", "dsscard", "card" etc.
  const normalized = normalizeComponentName(componentName);

  const componentDir = resolve(dssRoot, "components/base", normalized);
  const metaPath = resolve(componentDir, "dss.meta.json");
  const docPath = resolve(componentDir, `${normalized}.md`);

  // Pre-prompt convention: pre_prompt_dss_{slug}.md
  const slug = normalized
    .replace(/^Dss/, "dss_")
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "")
    .replace(/dss__/, "dss_");

  const prePromptPath = resolve(
    dssRoot,
    "docs/governance/pre-prompts",
    `pre_prompt_${slug}.md`
  );

  // Component does not exist
  if (!existsSync(componentDir)) {
    return {
      component: normalized,
      found: false,
      meta: null,
      prePrompt: null,
      documentation: null,
      summary: `Component "${normalized}" not found in DSS components directory (${componentDir}). Verify the component name or check DSS_FASEAMENTO_COMPONENTES.md for the full list.`,
    };
  }

  // Read meta
  let meta: Record<string, unknown> | null = null;
  if (existsSync(metaPath)) {
    try {
      meta = JSON.parse(readFileSync(metaPath, "utf-8"));
    } catch {
      meta = null;
    }
  }

  // Read pre-prompt (optional)
  let prePrompt: string | null = null;
  if (existsSync(prePromptPath)) {
    prePrompt = readFileSync(prePromptPath, "utf-8");
  }

  // Read component documentation (optional)
  let documentation: string | null = null;
  if (existsSync(docPath)) {
    documentation = readFileSync(docPath, "utf-8");
  }

  // Build summary
  const summary = buildSummary(normalized, meta, prePrompt !== null, documentation !== null);

  return {
    component: normalized,
    found: true,
    meta,
    prePrompt,
    documentation,
    summary,
  };
}

function normalizeComponentName(name: string): string {
  // Already proper PascalCase with Dss prefix
  if (/^Dss[A-Z]/.test(name)) return name;

  // Remove "dss" prefix and convert to PascalCase
  const clean = name.replace(/^[Dd]ss[-_]?/, "");

  // Split on separators and capitalize
  const pascal = clean
    .split(/[-_\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");

  return `Dss${pascal}`;
}

function buildSummary(
  component: string,
  meta: Record<string, unknown> | null,
  hasPrePrompt: boolean,
  hasDoc: boolean
): string {
  if (!meta) {
    return `${component}: component directory found but dss.meta.json is missing or invalid.`;
  }

  const lines: string[] = [
    `## ${component}`,
    `- **Status:** ${meta.status ?? "unknown"}`,
    `- **Phase:** ${meta.phase ?? "unknown"}`,
    `- **Category:** ${meta.category ?? "unknown"}`,
    `- **DSS Version:** ${meta.dssVersion ?? "unknown"}`,
    `- **Golden Reference:** ${meta.goldenReference ?? "—"}`,
    `- **Golden Context:** ${meta.goldenContext ?? "—"}`,
    `- **Seal Date:** ${meta.sealDate ?? "not sealed"}`,
    `- **Has Pre-Prompt:** ${hasPrePrompt ? "yes" : "no"}`,
    `- **Has Documentation:** ${hasDoc ? "yes" : "no"}`,
  ];

  if (meta.hasReservations) {
    lines.push(`- **Reservations:** present (see dss.meta.json for details)`);
  }

  if (Array.isArray(meta.exceptions) && meta.exceptions.length > 0) {
    lines.push(`- **Exceptions:** ${(meta.exceptions as unknown[]).length} documented`);
  }

  if (Array.isArray(meta.props)) {
    lines.push(`- **Props:** ${(meta.props as string[]).join(", ")}`);
  } else if (meta.props && typeof meta.props === "object") {
    const allProps = Object.values(meta.props).flat();
    lines.push(`- **Props (all subcomponents):** ${(allProps as string[]).join(", ")}`);
  }

  return lines.join("\n");
}
