# SELO DE CONFORMIDADE DSS v2.2
## DssBottomSheet

---

| Campo | Valor |
|-------|-------|
| **Componente** | `DssBottomSheet` |
| **Versão** | 1.0.0 |
| **Fase** | 2 — Nível 2 (Composição de Primeiro Grau) |
| **Família** | Navegação |
| **Data do Selo** | 2026-05-21 |
| **Auditor** | Claude Code (MCP-First, prompt_auditoria_v2.5) |
| **Status** | ✅ **SELADO** |

---

## Classificação

- **Tipo:** Overlay Bottom Sheet
- **Motor Quasar:** `QDialog` com `position="bottom"` + `fullWidth` fixo
- **Interativo:** Sim — via `v-model:open`
- **Golden Reference:** DssChip
- **Golden Context:** DssDialog

---

## Resultado da Auditoria

| Gate | Status |
|------|--------|
| Estrutural (4 camadas + wrapper + orchestrador) | ✅ PASSOU |
| Tokens (Token First + reconciliação SCSS ↔ meta.json) | ✅ PASSOU |
| Composição (zero HTML nativo, zero :deep()) | ✅ PASSOU |
| Responsabilidade (zero captura de estados de filhos) | ✅ PASSOU |
| Testes (25 casos, cobertura completa) | ✅ PASSOU |
| Documentação (Template 13.1, API, README, meta.json) | ✅ PASSOU |

---

## Não-Conformidades Resolvidas

| ID | Gravidade | Descrição | Resolução |
|----|-----------|-----------|-----------|
| NC-01 | Não-bloqueante | `1px` hardcoded em `border-bottom` do header | Substituído por `var(--dss-border-width-thin)` |

---

## Gaps Documentados (Não-bloqueantes)

| ID | Descrição | Ação |
|----|-----------|------|
| GAP-01 | `--dss-hub/water/waste-primary` inexistente no catálogo (padrão herdado do DssDialog) | Documentado; substituição para tokens numéricos em sprint futuro |
| GAP-02 | `aria-hidden` no handle-area cobre o slot inteiro — risco se consumidor inserir conteúdo interativo | Anti-pattern a adicionar na documentação |
| GAP-03 | Teste de `inheritAttrs` via `$options` pode gerar falso positivo | Refatoração de teste em sprint futuro |

---

## Exceções Aprovadas

| ID | Tipo | Justificativa |
|----|------|---------------|
| EXC-Gate-01 | ComponentDirectUsage | QDialog como motor de overlay — sem equivalente DSS. Precedente: DssDialog |
| EXC-01 | CSSImportant | `!important` em bg/shadow — QDialog sobrescreve via especificidade. Precedente: DssDialog, DssMenu |
| EXC-02 | AsymmetricBorderRadius | `border-radius: var(--dss-radius-lg) var(--dss-radius-lg) 0 0` — UX canônico de bottom sheets |
| EXC-03 | HardcodedDimension | `max-height: 85vh` — sem token DSS para max-height de overlay |
| EXC-04 | HardcodedDimension | `max-height: 100dvh` em maximized — dvh necessário para suporte mobile correto |

---

## Tokens Auditados (22)

`--dss-surface-default` · `--dss-shadow-modal` · `--dss-radius-lg` · `--dss-radius-full` · `--dss-padding-3` · `--dss-padding-4` · `--dss-spacing-1` · `--dss-spacing-2` · `--dss-spacing-8` · `--dss-gray-100` · `--dss-gray-200` · `--dss-gray-300` · `--dss-border-width-thin` · `--dss-border-width-md` · `--dss-font-family-sans` · `--dss-text-body` · `--dss-hub-600` · `--dss-hub-primary` · `--dss-water-500` · `--dss-water-primary` · `--dss-waste-600` · `--dss-waste-primary`

---

## Decisão Arquitetural Principal

`QBottomSheet` do Quasar é um **plugin** (`$q.bottomSheet({})`), não um componente Vue reutilizável. `DssBottomSheet` implementa o comportamento equivalente usando `QDialog` com `position="bottom"` diretamente — que é o motor interno do plugin. Esta abordagem é mais limpa, testável e alinhada com a governança DSS do que tentar encapsular um plugin.

---

*Selo emitido conforme DSS_CRITERIOS_AVALIACAO_FASE2.md e prompt_auditoria_v2.5.txt*
