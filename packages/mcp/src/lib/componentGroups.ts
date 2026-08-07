/**
 * componentGroups — os grupos de componentes do DSS, em UM lugar só.
 *
 * A lista estava duplicada em 5 arquivos do MCP (queryComponent,
 * recordAuditEvent, validateComponentCode ×2, validateVisualContract,
 * generatePrePromptTemplate), em duas formas: nomes curtos e caminhos
 * completos. Já tinha driftado: `lib/uiRules.ts` usava SEIS grupos
 * (incluindo feedback/forms/layout) enquanto as tools usavam três.
 *
 * Os três extras existem como diretório, mas estão VAZIOS — verificado.
 * Inofensivo hoje, e exatamente o tipo de divergência silenciosa que esta
 * frente combate: duas convenções para o mesmo fato, ambas plausíveis.
 *
 * Ponto de partida: o `COMPONENT_GROUPS` de validateVisualContract.ts, que já
 * era a forma correta.
 */

/** Grupos reais sob `packages/core/components/`. */
export const COMPONENT_GROUPS = ["base", "composed", "stress-test"] as const;

export type ComponentGroup = (typeof COMPONENT_GROUPS)[number];

/** Grupos que são fixture de teste, não componente de produção. */
export const FIXTURE_GROUPS: readonly ComponentGroup[] = ["stress-test"];

/** Caminhos relativos à raiz do DSS, para quem resolve por diretório. */
export const COMPONENT_GROUP_PATHS = COMPONENT_GROUPS.map(
  (g) => `packages/core/components/${g}`
);

/** Legível em mensagem de erro: "base, composed, stress-test". */
export const groupList = (): string => COMPONENT_GROUPS.join(", ");
