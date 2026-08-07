import {
  loadUiRules,
  checkSchemaIntegrity,
  hierarchyLevelOf,
  parseChildRef,
  moduleReference,
  SENTINELS,
  type SchemaIntegrity,
  type LoadedRules,
  type ComponentRule,
} from "../lib/uiRules.js";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CompositionNode {
  /** Component or element name: "DssCard", "q-checkbox", "text", "div". */
  component: string;
  /** Variant in use, when the rule is variant-qualified (e.g. "elevated"). */
  variant?: string;
  /** Props declared on the node — checked against required_props. */
  props?: Record<string, unknown>;
  /** States the composition declares for this node (e.g. ["empty", "loading"]). */
  states?: string[];
  children?: CompositionNode[];
}

export interface ValidateCompositionInput {
  tree: CompositionNode;
  /** Screen context for the report (e.g. "Atender Solicitações — listagem"). */
  context?: string;
}

type ViolationSeverity = "critical" | "high" | "medium" | "low" | "info";

interface CompositionViolation {
  severity: ViolationSeverity;
  rule: string;
  category:
    | "vocabulary"
    | "nesting"
    | "hierarchy"
    | "required-props"
    | "data-states"
    | "density";
  message: string;
  path: string;
  context: {
    component: string;
    actual?: unknown;
    expected?: unknown;
    suggestion?: unknown;
  };
  reference: string;
}

export interface CompositionValidationResult {
  verdict: "compliant" | "non-compliant" | "warnings" | "suggestions-only";
  screenContext: string | null;
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
    total: number;
    nodesVisited: number;
  };
  violations: CompositionViolation[];
  suggestions: CompositionViolation[];
  schemaIntegrity: SchemaIntegrity;
  notice: string;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

/**
 * validate_composition — Read-Only
 *
 * Validates a proposed component tree against `ui-rules.schema.json`: the
 * schema's first executable consumer. Rules evaluated:
 *   R1 vocabulary       — every node is a real DSS component (catches Quasar
 *                         cru and invented components)
 *   R2 forbidden_children / R3 allowed_children — direct nesting
 *   R4 forbidden_contexts / R5 self-nesting     — ancestor-wide nesting
 *   R6 Matryoshka       — a container may not sit inside a smaller-level one
 *   R7 required_props   — props the schema declares mandatory
 *   R8 data states      — tables/lists must declare empty and loading
 *   R9 form density     — max_visible_fields per form
 *
 * Mode: strictly descriptive — never corrective, never mutating.
 * Per MCP_READ_ONLY_CONTRACT.md §3: "Validation must always be descriptive, never corrective."
 */
export async function validateComposition(
  input: ValidateCompositionInput,
  dssRoot: string
): Promise<CompositionValidationResult> {
  const rules = loadUiRules(dssRoot);

  if (!rules) {
    throw new Error(
      "ui-rules.schema.json não encontrado em docs/guides/ui-rules/. " +
        "O contrato de composição é a fonte desta validação."
    );
  }

  const integrity = checkSchemaIntegrity(rules);
  const violations: CompositionViolation[] = [];
  const suggestions: CompositionViolation[] = [];
  let nodesVisited = 0;

  const visit = (node: CompositionNode, ancestors: CompositionNode[]): void => {
    nodesVisited++;
    const path = [...ancestors, node].map(describeNode).join(" > ");

    checkVocabulary(node, path, rules, violations, suggestions);
    checkAncestorRules(node, ancestors, path, rules, violations);
    checkRequiredProps(node, path, rules, violations);
    checkDataStates(node, path, rules, violations);
    checkFormDensity(node, path, rules, violations);

    for (const child of node.children ?? []) {
      checkDirectChild(node, child, path, rules, violations);
      checkMatryoshka(node, child, path, rules, violations);
      visit(child, [...ancestors, node]);
    }
  };

  visit(input.tree, []);

  const all = [...violations, ...suggestions];
  const summary = {
    critical: all.filter((v) => v.severity === "critical").length,
    high: all.filter((v) => v.severity === "high").length,
    medium: all.filter((v) => v.severity === "medium").length,
    low: all.filter((v) => v.severity === "low").length,
    info: all.filter((v) => v.severity === "info").length,
    total: all.length,
    nodesVisited,
  };

  let verdict: CompositionValidationResult["verdict"];
  if (summary.critical > 0 || summary.high > 0) verdict = "non-compliant";
  else if (summary.medium > 0 || summary.low > 0) verdict = "warnings";
  else if (summary.info > 0) verdict = "suggestions-only";
  else verdict = "compliant";

  return {
    verdict,
    screenContext: input.context ?? null,
    summary,
    violations,
    suggestions,
    schemaIntegrity: integrity,
    notice: READ_ONLY_NOTICE,
  };
}

// ─── R1: Vocabulary ───────────────────────────────────────────────────────────

/**
 * Every node must resolve to a real DSS component. This is the rule that
 * catches the two failure modes an AI agent actually produces: raw Quasar
 * where a DSS equivalent exists, and confidently invented component names.
 */
function checkVocabulary(
  node: CompositionNode,
  path: string,
  rules: LoadedRules,
  violations: CompositionViolation[],
  suggestions: CompositionViolation[]
): void {
  const name = node.component;
  if (SENTINELS.has(name)) return;

  const entry = rules.catalog.get(name);

  if (entry) {
    if (entry.isFixture) {
      suggestions.push({
        severity: "medium",
        rule: "R1 — vocabulário DSS",
        category: "vocabulary",
        message: `${name} é fixture de teste (${entry.group}), não componente de produção`,
        path,
        context: { component: name, actual: entry.group },
        reference: "packages/core/components/stress-test/",
      });
    }
    return;
  }

  // Raw Quasar: <q-checkbox>, <QCheckbox>
  const quasarMatch = name.match(/^q-([a-z0-9-]+)$/i) ?? name.match(/^Q([A-Z]\w+)$/);
  if (quasarMatch) {
    const equivalent = "Dss" + toPascal(quasarMatch[1]);
    const hasEquivalent = rules.catalog.has(equivalent);

    violations.push({
      severity: hasEquivalent ? "critical" : "high",
      rule: "R1 — vocabulário DSS",
      category: "vocabulary",
      message: hasEquivalent
        ? `Quasar cru: ${name} tem equivalente DSS (${equivalent})`
        : `Quasar cru: ${name} sem equivalente DSS mapeado`,
      path,
      context: {
        component: name,
        suggestion: hasEquivalent ? equivalent : undefined,
      },
      reference: hasEquivalent
        ? "CLAUDE.md — Cartão Composto: não reimplementar primitivos; nunca QComponent cru no template"
        : "CLAUDE.md — Cartão Composto",
    });
    return;
  }

  // Invented DSS component — the hallucination signature.
  if (name.startsWith("Dss")) {
    violations.push({
      severity: "critical",
      rule: "R1 — vocabulário DSS",
      category: "vocabulary",
      message: `${name} não existe no catálogo DSS (${rules.catalog.size} componentes)`,
      path,
      context: { component: name, suggestion: nearestComponent(name, rules) },
      reference: "packages/core/components/ — catálogo real",
    });
    return;
  }

  // Plain HTML element — allowed as structure, but reported for visibility.
  suggestions.push({
    severity: "info",
    rule: "R1 — vocabulário DSS",
    category: "vocabulary",
    message: `<${name}> é elemento nativo — verificar se há primitivo DSS equivalente`,
    path,
    context: { component: name },
    reference: "CLAUDE.md — Cartão Composto",
  });
}

// ─── R2/R3: Direct child rules ────────────────────────────────────────────────

function checkDirectChild(
  parent: CompositionNode,
  child: CompositionNode,
  parentPath: string,
  rules: LoadedRules,
  violations: CompositionViolation[]
): void {
  const rule = rules.schema.components[parent.component];
  if (!rule) return;

  const childPath = `${parentPath} > ${describeNode(child)}`;
  const ref = moduleReference(rule.module);
  let forbiddenReported = false;

  // R2 — forbidden_children (supports "DssCard[variant=elevated]")
  for (const raw of rule.forbidden_children ?? []) {
    const { component, variant } = parseChildRef(raw);
    if (component !== child.component) continue;
    if (variant && child.variant !== variant) continue;

    forbiddenReported = true;
    violations.push({
      severity: "critical",
      rule: "R2 — forbidden_children",
      category: "nesting",
      message:
        rule.nesting_rule ??
        `${child.component}${variant ? `[variant=${variant}]` : ""} não pode ser filho de ${parent.component}`,
      path: childPath,
      context: { component: child.component, actual: raw },
      reference: ref,
    });
  }

  // R3 — allowed_children (skipped when the schema declares "*", and when R2
  // already reported this pair — the same nesting stated from the other side)
  const allowed = rule.allowed_children;
  if (!forbiddenReported && allowed && !allowed.includes("*")) {
    const permitted = allowed.map((a) => parseChildRef(a).component);
    if (!permitted.includes(child.component) && !SENTINELS.has(child.component)) {
      violations.push({
        severity: "high",
        rule: "R3 — allowed_children",
        category: "nesting",
        message: `${parent.component} não aceita ${child.component} como filho`,
        path: childPath,
        context: {
          component: child.component,
          expected: allowed,
        },
        reference: ref,
      });
    }
  }
}

// ─── R4/R5: Ancestor-wide rules ───────────────────────────────────────────────

function checkAncestorRules(
  node: CompositionNode,
  ancestors: CompositionNode[],
  path: string,
  rules: LoadedRules,
  violations: CompositionViolation[]
): void {
  const rule = rules.schema.components[node.component];
  if (!rule) return;

  const ancestorNames = ancestors.map((a) => a.component);
  const ref = moduleReference(rule.module);

  // R4 — forbidden_contexts: the component may not appear anywhere inside these
  for (const forbidden of rule.forbidden_contexts ?? []) {
    if (ancestorNames.includes(forbidden)) {
      violations.push({
        severity: "high",
        rule: "R4 — forbidden_contexts",
        category: "nesting",
        message: `${node.component} não deve ser usado dentro de ${forbidden}`,
        path,
        context: { component: node.component, actual: forbidden },
        reference: ref,
      });
    }
  }

  // R5 — self-nesting beyond the direct parent (dialog opened over a dialog two
  // levels up). The direct-parent case is R2's; only deeper ancestry lands here.
  const forbidsSelf = (rule.forbidden_children ?? []).some(
    (raw) => parseChildRef(raw).component === node.component
  );
  const deeperAncestors = ancestorNames.slice(0, -1);
  if (forbidsSelf && deeperAncestors.includes(node.component)) {
    violations.push({
      severity: "critical",
      rule: "R5 — aninhamento de si mesmo",
      category: "nesting",
      message:
        rule.nesting_rule ??
        `${node.component} não pode ser aninhado dentro de outro ${node.component}`,
      path,
      context: { component: node.component },
      reference: ref,
    });
  }
}

// ─── R6: Matryoshka hierarchy ─────────────────────────────────────────────────

/**
 * Matryoshka rule: Padding(Pai) >= Padding(Filho). A container placed inside a
 * component of a deeper level is a structural inversion — e.g. a DssCard
 * (level 2) nested inside a DssInput (level 4).
 */
function checkMatryoshka(
  parent: CompositionNode,
  child: CompositionNode,
  parentPath: string,
  rules: LoadedRules,
  violations: CompositionViolation[]
): void {
  const parentLevel = hierarchyLevelOf(parent.component, rules.schema);
  const childLevel = hierarchyLevelOf(child.component, rules.schema);
  if (!parentLevel || !childLevel) return;

  if (childLevel.level < parentLevel.level) {
    violations.push({
      severity: "medium",
      rule: "R6 — hierarquia Matryoshka",
      category: "hierarchy",
      message: `Inversão de hierarquia: ${child.component} (nível ${childLevel.level} — ${childLevel.label}) dentro de ${parent.component} (nível ${parentLevel.level} — ${parentLevel.label})`,
      path: `${parentPath} > ${describeNode(child)}`,
      context: {
        component: child.component,
        actual: `nível ${childLevel.level} dentro de nível ${parentLevel.level}`,
        expected: "Padding(Pai) >= Padding(Filho)",
      },
      reference: "docs/guides/ui-rules/00_SPACING_HIERARCHY.md",
    });
  }
}

// ─── R7: Required props ───────────────────────────────────────────────────────

function checkRequiredProps(
  node: CompositionNode,
  path: string,
  rules: LoadedRules,
  violations: CompositionViolation[]
): void {
  const rule = rules.schema.components[node.component];
  if (!rule?.required_props) return;

  for (const prop of rule.required_props) {
    const value = node.props?.[prop];
    if (value === undefined || value === null || value === "") {
      violations.push({
        severity: "high",
        rule: "R7 — required_props",
        category: "required-props",
        message: `${node.component} exige a prop "${prop}"`,
        path,
        context: { component: node.component, expected: prop },
        reference: moduleReference(rule.module),
      });
    }
  }
}

// ─── R8: Data states ──────────────────────────────────────────────────────────

/**
 * Tables and lists must declare an empty state and a loading state. This is the
 * "ponta solta" the analyst spec most often omits: what the screen shows when
 * there is no data and while data is arriving.
 */
function checkDataStates(
  node: CompositionNode,
  path: string,
  rules: LoadedRules,
  violations: CompositionViolation[]
): void {
  const tableRules = rules.schema.table_rules;
  if (!tableRules?.applies_to?.includes(node.component)) return;

  const declared = new Set((node.states ?? []).map((s) => s.toLowerCase()));
  const ref = moduleReference(tableRules.module);

  if (tableRules.empty_state_required && !declared.has("empty")) {
    violations.push({
      severity: "high",
      rule: "R8 — estado vazio obrigatório",
      category: "data-states",
      message: `${node.component} não declara estado vazio`,
      path,
      context: {
        component: node.component,
        actual: [...declared],
        expected: rules.schema.empty_states?.required_elements,
      },
      reference: ref,
    });
  }

  if (tableRules.loading_state_required && !declared.has("loading")) {
    violations.push({
      severity: "high",
      rule: "R8 — estado de carregamento obrigatório",
      category: "data-states",
      message: `${node.component} não declara estado de carregamento`,
      path,
      context: { component: node.component, actual: [...declared] },
      reference: ref,
    });
  }
}

// ─── R9: Form density ─────────────────────────────────────────────────────────

function checkFormDensity(
  node: CompositionNode,
  path: string,
  rules: LoadedRules,
  violations: CompositionViolation[]
): void {
  const formRules = rules.schema.form_rules;
  if (!formRules?.applies_to?.includes(node.component)) return;

  const max = formRules.max_visible_fields;
  if (typeof max !== "number") return;

  const fields = new Set(formRules.field_components ?? []);
  let count = 0;
  const walk = (n: CompositionNode): void => {
    if (fields.has(n.component)) count++;
    for (const c of n.children ?? []) walk(c);
  };
  for (const c of node.children ?? []) walk(c);

  if (count > max) {
    violations.push({
      severity: "medium",
      rule: "R9 — densidade de formulário",
      category: "density",
      message: `${count} campos visíveis em ${node.component} (máximo ${max}) — quebrar em seções, DssStepper ou DssTabs`,
      path,
      context: { component: node.component, actual: count, expected: max },
      reference: moduleReference(formRules.module),
    });
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function describeNode(node: CompositionNode): string {
  return node.variant
    ? `${node.component}[variant=${node.variant}]`
    : node.component;
}

function toPascal(name: string): string {
  return name
    .split(/[-_]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

/** Best-effort nearest catalog name, for invented components. */
function nearestComponent(name: string, rules: LoadedRules): string | undefined {
  const target = name.toLowerCase();
  let best: { name: string; score: number } | null = null;

  for (const candidate of rules.catalog.keys()) {
    const c = candidate.toLowerCase();
    let score = 0;
    const len = Math.min(c.length, target.length);
    while (score < len && c[score] === target[score]) score++;
    if (c.includes(target) || target.includes(c)) score += 3;
    if (!best || score > best.score) best = { name: candidate, score };
  }

  return best && best.score > 4 ? best.name : undefined;
}

// ─── Read-Only Notice ─────────────────────────────────────────────────────────

const READ_ONLY_NOTICE = `
Composition Validation — Read-Only Mode

Source of truth: docs/guides/ui-rules/ui-rules.schema.json, existence-checked at
call time against the real component catalog (packages/core/components) and the
real spacing scale (tokens/semantic/_spacing.scss). See "schemaIntegrity".

This evaluation is strictly descriptive per MCP_READ_ONLY_CONTRACT.md.

It does NOT:
- Apply fixes automatically
- Modify any file
- Make autonomous decisions

Severity Levels:
- CRITICAL: Breaks DSS composition (Quasar cru, componente inexistente, aninhamento proibido)
- HIGH:     Violates an explicit schema rule (allowed_children, required_props, estado obrigatório)
- MEDIUM:   Structural warning (inversão de hierarquia, densidade, fixture em produção)
- INFO:     Observation worth a human decision

References:
- docs/guides/DSS_UI_RULES.md §3.2
- docs/guides/ui-rules/ (módulos 01–08)
- CLAUDE.md — Cartão Composto
`.trim();
