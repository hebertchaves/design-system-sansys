import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { COMPONENT_GROUPS } from "../lib/componentGroups.js";

interface A11yClaim {
  criterion: string;
  level?: string;
  implementation?: string;
  verifiedBy?: string;
  verified?: boolean;
  test?: string | string[];
  ariaAttrs?: string[];
}

interface ComponentQueryResult {
  component: string;
  found: boolean;
  meta: Record<string, unknown> | null;
  /**
   * Afirmações WCAG como o CONTRATO as publica — com `verified`, que só existe
   * lá. O `meta.a11y` acima traz as mesmas afirmações cruas: lido sozinho, uma
   * afirmação pendente parece tão válida quanto uma verificada. `null` quando o
   * componente não tem dss.contract.json (nada foi verificado).
   */
  a11y: A11yClaim[] | null;
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

  // Componentes vivem em três grupos. Fixar "base" tornava a query cega para a
  // Fase 3 inteira (composed/) e para os stress tests — devolvia "não encontrado"
  // para componente que existe. Mesmo defeito que havia em recordAuditEvent.
  // Não achando em nenhum, cai em base/ para a mensagem de erro seguir legível.
  const componentDir =
    COMPONENT_GROUPS.map((g) => resolve(dssRoot, "packages/core/components", g, normalized)).find(
      (dir) => existsSync(dir)
    ) ?? resolve(dssRoot, "packages/core/components/base", normalized);
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
      a11y: null,
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

  // Afirmações a11y do CONTRATO (derivado e verificado pelo emit-contract). É o
  // único lugar onde existe `verified`; o meta é a fonte autorada, sem conferência.
  let a11y: A11yClaim[] | null = null;
  const contractPath = resolve(componentDir, "dss.contract.json");
  if (existsSync(contractPath)) {
    try {
      const contract = JSON.parse(readFileSync(contractPath, "utf-8"));
      a11y = Array.isArray(contract?.a11y?.wcag) ? contract.a11y.wcag : null;
    } catch {
      a11y = null;
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
  const summary = buildSummary(normalized, meta, prePrompt !== null, documentation !== null, a11y);

  return {
    component: normalized,
    found: true,
    meta,
    a11y,
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

/**
 * O corpus de dss.meta.json tem DUAS grafias para os mesmos fatos, e o summary
 * lia apenas uma:
 *
 *   versão  ->  `dssVersion` (83 arquivos)  |  `version` (20)
 *   selo    ->  `sealDate`   (24)           |  `seal` + `auditDate` (39/51)
 *
 * Medido em set/2026: 32 dos 92 componentes TÊM selo e o summary imprimia
 * "not sealed" — incluindo o DssButton, que é o Golden Sample. O `meta` no mesmo
 * retorno trazia o valor certo, então a tool se contradizia num único JSON.
 *
 * Correção aqui é TOLERAR as duas grafias, não migrar os 92 arquivos: o meta.json
 * é fonte de verdade de outra cadeia (contrato, referência visual) e normalizá-lo
 * é decisão de governança, não conserto de leitor. A divergência está registrada
 * como débito.
 */
function buildSummary(
  component: string,
  meta: Record<string, unknown> | null,
  hasPrePrompt: boolean,
  hasDoc: boolean,
  a11y: A11yClaim[] | null = null
): string {
  if (!meta) {
    return `${component}: component directory found but dss.meta.json is missing or invalid.`;
  }

  const lines: string[] = [
    `## ${component}`,
    `- **Status:** ${meta.status ?? "unknown"}`,
    `- **Phase:** ${meta.phase ?? "unknown"}`,
    `- **Category:** ${meta.category ?? "unknown"}`,
    `- **DSS Version:** ${meta.dssVersion ?? meta.version ?? "unknown"}`,
    `- **Golden Reference:** ${meta.goldenReference ?? "—"}`,
    `- **Golden Context:** ${meta.goldenContext ?? "—"}`,
    `- **Seal:** ${meta.seal ?? "not sealed"}`,
    `- **Seal Date:** ${meta.sealDate ?? meta.auditDate ?? "—"}`,
    `- **Has Pre-Prompt:** ${hasPrePrompt ? "yes" : "no"}`,
    `- **Has Documentation:** ${hasDoc ? "yes" : "no"}`,
  ];

  // Zona de marca — so quando o componente ESTABELECE uma. E o campo que diz a um
  // agente se colocar algo dentro deste componente muda a cor de acao do conteudo.
  // docs/governance/DSS_MODELO_PROPAGACAO_MARCA.md
  if (meta.brandZone) {
    const explica: Record<string, string> = {
      shell: "casca — o eixo de acao (--dss-action-*) SEGUE a marca aqui dentro",
      content: "conteudo — o eixo de acao VOLTA ao semantico aqui dentro; a identidade (--dss-brand-*) segue a marca",
      both: "as duas — este componente contem uma regiao de casca e uma de conteudo",
    };
    const z = String(meta.brandZone);
    lines.push(`- **Brand Zone:** \`${z}\` — ${explica[z] ?? "zona desconhecida"}`);
  }

  // Acessibilidade: o que o CONTRATO conferiu, não o que o meta afirma. Sem esta
  // linha, o agente lia `meta.a11y` cru e tratava afirmação pendente (sem teste,
  // ou com defeito conhecido) como conformidade. A âncora e o débito:
  // scripts/emit-contract.mjs e scripts/a11y-anchor-baseline.json.
  if (a11y === null) {
    lines.push(`- **A11y:** sem dss.contract.json — nenhuma afirmação de meta.a11y foi verificada`);
  } else {
    const pendentes = a11y.filter((c) => c.verified !== true);
    lines.push(`- **A11y (contrato):** ${a11y.length - pendentes.length} verificada(s) · ${pendentes.length} pendente(s)`);
    for (const c of pendentes) {
      const txt = String(c.implementation ?? "").replace(/\s+/g, " ");
      lines.push(`  - ⚠️ ${c.criterion} (${c.verifiedBy}) NÃO verificada — não trate como conformidade: ${txt.length > 160 ? txt.slice(0, 157) + "..." : txt}`);
    }
  }

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
