# DSS Agent Quickstart

> Leia este arquivo PRIMEIRO. Ele mapeia todo o resto.

## Em 30 segundos

DSS = camada corporativa sobre Quasar Framework. Não é uma lib standalone.

- **Token First** — nenhum valor hardcoded, sempre `var(--dss-*)`
- **4 Camadas** — Structure → Composition → Variants → Output (nenhuma omitível)
- **Brand-aware** — reage a `[data-brand="hub|water|waste"]`
- **Unlayered** — CSS DSS nunca entra em `@layer` (vence o Quasar via Princípio #13)
- **WCAG 2.1 AA** — acessibilidade não é opcional

---

## Os 5 documentos que você DEVE ler antes de tocar em código

| # | Arquivo | O que explica |
|---|---|---|
| 1 | [CLAUDE.md](/CLAUDE.md) | Regras operacionais vinculantes para agentes IA |
| 2 | [PRD_DSS.md](/docs/reference/PRD_DSS.md) | Por quê o DSS existe, produtos suportados |
| 3 | [DSS_ARCHITECTURE.md](/docs/reference/DSS_ARCHITECTURE.md) | Como o sistema funciona (inclui Princípio #13) |
| 4 | [DSS_COMPONENT_ARCHITECTURE.md](/docs/reference/DSS_COMPONENT_ARCHITECTURE.md) | As 4 camadas, anti-patterns, pseudo-elementos |
| 5 | [DSS_TOKEN_REFERENCE.md](/docs/reference/DSS_TOKEN_REFERENCE.md) | Catálogo oficial de tokens `--dss-*` |

---

## Workflows por tarefa

| Quero… | Leia |
|---|---|
| Criar componente novo | [DSS_IMPLEMENTATION_GUIDE.md](/docs/guides/DSS_IMPLEMENTATION_GUIDE.md) + [DSS_GOLDEN_COMPONENTS.md](/docs/governance/DSS_GOLDEN_COMPONENTS.md) |
| Auditar componente existente | [DSS_GOLDEN_COMPONENTS.md](/docs/governance/DSS_GOLDEN_COMPONENTS.md) + [CERTIFIED_COMPONENTS.md](/docs/governance/CERTIFIED_COMPONENTS.md) |
| Mudar token visual | [DSS_REFERENCIA_VISUAL_ANALISE.md](/docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md) + [DSS_DEFAULT_PREVIEW_WORKFLOW.md](/docs/governance/DSS_DEFAULT_PREVIEW_WORKFLOW.md) |
| Importar entre pacotes do monorepo | [DSS_MONOREPO_PATH_MAP.md](/docs/governance/DSS_MONOREPO_PATH_MAP.md) |
| Tocar no sandbox / testes | [apps/sandbox/tests/](/apps/sandbox/tests/) — `npm run test:regression` |
| Resolver vazamento Quasar/CSS | [DSS_ARCHITECTURE.md — Princípio #13](/docs/reference/DSS_ARCHITECTURE.md#princípio-13) |
| Usar o MCP DSS | [DSS_MCP_RELATORIO_TECNICO.md](/docs/governance/DSS_MCP_RELATORIO_TECNICO.md) |

---

## Regressão visual — como rodar

```bash
# Testes estáticos (rápidos, sem browser)
cd apps/sandbox && npm run test:static

# Testes E2E (browser real, requer sandbox rodando)
cd apps/sandbox && npm run test:e2e

# Ambos
cd apps/sandbox && npm run test:regression
```

---

## Mapa de governança

### Referência normativa (`docs/reference/`)

| Arquivo | Conteúdo |
|---|---|
| [DSS_ARCHITECTURE.md](/docs/reference/DSS_ARCHITECTURE.md) | Arquitetura geral + isolamento via Cascade Layers (Constituição DSS) |
| [DSS_COMPONENT_ARCHITECTURE.md](/docs/reference/DSS_COMPONENT_ARCHITECTURE.md) | 4 camadas, pseudo-elementos, brightness |
| [DSS_TOKEN_REFERENCE.md](/docs/reference/DSS_TOKEN_REFERENCE.md) | Catálogo de tokens semânticos |
| [PRD_DSS.md](/docs/reference/PRD_DSS.md) | Product Requirements Document |

### Guias técnicos (`docs/guides/`)

| Arquivo | Conteúdo |
|---|---|
| [DSS_IMPLEMENTATION_GUIDE.md](/docs/guides/DSS_IMPLEMENTATION_GUIDE.md) | Como implementar componentes passo a passo |
| [DSS_ARCHITECTURE_GUIDE.md](/docs/guides/DSS_ARCHITECTURE_GUIDE.md) | Decisões arquiteturais e racional técnico |

### Governança (`docs/governance/`)

| Arquivo | Conteúdo |
|---|---|
| [CERTIFIED_COMPONENTS.md](/docs/governance/CERTIFIED_COMPONENTS.md) | Índice de selos — 19 Fase 1 + 68 Fase 2 |
| [DSS_GOLDEN_COMPONENTS.md](/docs/governance/DSS_GOLDEN_COMPONENTS.md) | Golden Reference, Context e Sample |
| [DSS_REFERENCIA_VISUAL_ANALISE.md](/docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md) | Contrato Visual Canônico (auto-gerado) |
| [DSS_DEFAULT_PREVIEW_WORKFLOW.md](/docs/governance/DSS_DEFAULT_PREVIEW_WORKFLOW.md) | Workflow preview data-driven + demoSlots |
| [DSS_MONOREPO_PATH_MAP.md](/docs/governance/DSS_MONOREPO_PATH_MAP.md) | Mapeamento canônico de imports entre pacotes |
| [DSS_VISUAL_CONTRACT.md](/docs/governance/DSS_VISUAL_CONTRACT.md) | Contrato visual — premissas e validação |
| [DSS_MCP_RELATORIO_TECNICO.md](/docs/governance/DSS_MCP_RELATORIO_TECNICO.md) | MCP DSS — ferramentas e uso |
| [DSS_OBSERVABILITY_BASELINE.md](/docs/governance/DSS_OBSERVABILITY_BASELINE.md) | Observabilidade do sistema |
| [DSS_PRODUCTION_READINESS_LAUDO.md](/docs/governance/DSS_PRODUCTION_READINESS_LAUDO.md) | Laudo de prontidão para produção |
| [MCP_READ_ONLY_CONTRACT.md](/docs/governance/MCP_READ_ONLY_CONTRACT.md) | Contrato de leitura MCP |

### Prompts direcionadores (referência histórica)

| Arquivo | Conteúdo |
|---|---|
| [PROMPT_DIRECIONADOR_ONDA8_CORRECOES_CRITICAS.md](/docs/governance/PROMPT_DIRECIONADOR_ONDA8_CORRECOES_CRITICAS.md) | Última onda executada |
| [PROMPT_DIRECIONADOR_CONSOLIDACAO_SANDBOX_ISOLAMENTO.md](/docs/governance/PROMPT_DIRECIONADOR_CONSOLIDACAO_SANDBOX_ISOLAMENTO.md) | Isolamento Quasar↔DSS + regressão |
| [PROMPT_DIRECIONADOR_ONDA3_QUALIDADE.md](/docs/governance/PROMPT_DIRECIONADOR_ONDA3_QUALIDADE.md) | Migração @use, sass module system |
| [PROMPT_DIRECIONADOR_ONDA4_ESCALA.md](/docs/governance/PROMPT_DIRECIONADOR_ONDA4_ESCALA.md) | Escala e automação Fase 2 |

---

> Em caso de dúvida, prefira sempre **explicitar mais** do que inferir.
> O DssButton é referência de documentação, não fonte única de verdade arquitetural.
