# SELO DSS v2.2 — DssBar

> **Documento imutável.** Este selo certifica a conformidade do componente `DssBar` com os critérios de qualidade do Design System Sansys v2.2 na data de emissão. Alterações posteriores ao componente exigem nova auditoria e emissão de novo selo.

---

## Identificação

| Campo | Valor |
|-------|-------|
| **Componente** | `DssBar` |
| **Versão do Componente** | 1.0.0 |
| **Versão DSS** | v2.2 |
| **Data de Emissão** | 20/05/2026 |
| **Fase / Nível** | Fase 2 — Nível 1 — Independente |
| **Motor Quasar** | `QBar` |
| **Categoria** | Estrutural / Sistema |
| **Família** | Notificações e Alertas |
| **Golden Reference** | DssBadge (não-interativo) |
| **Golden Context** | DssToolbar (container horizontal de sistema) |

---

## Resultado da Auditoria

**Veredicto: ✅ CONFORME**

| Gate | Status | Observações |
|------|--------|-------------|
| Gate A — Token First (MCP) | ✅ PASS | `mcp__dss__validate_component_code`: `compliant, 0 findings` |
| Gate B — Arquitetura 4 Camadas | ✅ PASS | Todas as 4 camadas presentes e corretas |
| Gate C — Composição CSS | ✅ PASS | Sem `:deep()`, sem hardcoded, brand dual-selector correto |
| Gate D — Responsabilidade Vue | ✅ PASS | `inheritAttrs: false`, sem `defineEmits`, `useBarClasses` |
| Gate E — Testes | ✅ PASS | 9 testes cobrindo render, props, slots, attrs, não-interativo |
| Gate F — Documentação | ✅ PASS | Template 13.1 completo (12 seções), exceções documentadas |
| Gate G — dss.meta.json | ✅ PASS | GoldenReference, GoldenContext, 18 tokens, 3 exceções |

---

## Ciclos de Auditoria

### Ciclo 1 — Pré-correções (20/05/2026)

**NCs encontradas e corrigidas:**

| ID | Severidade | Arquivo | Descrição | Resolução |
|----|-----------|---------|-----------|-----------|
| NC-01 | Bloqueante | `4-output/_states.scss` | `forced-color-adjust: none` incorreto em container | Removido — containers não devem ter `forced-color-adjust: none` |
| NC-02 | Não-bloqueante | `3-variants/_variant.scss` | Header comentava EXC-01 que não mais existia após remoção do `rgba()` hardcoded | Corrigido para `✅ Sem valores hardcoded` |
| NC-03 | Bloqueante | `dss.meta.json` + `DssBar.md` | `goldenReference: "DssChip"` incorreto para componente `interactive: false` | Alterado para `"DssBadge"` (padrão canônico DSS para não-interativos) |

**GAPs de pré-prompt corrigidos:**

| ID | Arquivo | Descrição |
|----|---------|-----------|
| GAP-01 | `pre_prompt_dss_bar.md` | Declaração de Fase/Nível ausente na seção 1 |
| GAP-02 | `pre_prompt_dss_bar.md` | Golden Reference incorreto (DssChip → DssBadge) |
| GAP-03 | `pre_prompt_dss_bar.md` | Golden Context não nomeado → DssToolbar |
| GAP-04 | `pre_prompt_dss_bar.md` | Seção 3 mapeava QToolbar em vez de QBar; reescrita com API real do QBar |
| GAP-05 | `DssBar.md` | Seção 9 "Exceções aos Gates v2.4" ausente — adicionada |

### Ciclo 2 — Pós-correções / Auditoria Final (20/05/2026)

**Resultado:** ✅ Nenhuma NC residual encontrada.

- MCP validation: `compliant, 0 findings`
- Gates B–G: todos aprovados sem ressalvas
- Numeração das seções do DssBar.md corrigida (seções 11 e 12)

---

## Especificações Técnicas

### Props Expostas

| Prop | Tipo | Padrão | Bloqueada? |
|------|------|--------|-----------|
| `dense` | `Boolean` | `false` | Não — delegado ao QBar |
| `elevated` | `Boolean` | `false` | Não — DSS-própria, sem equivalente no QBar |

### Props Bloqueadas (QBar → DssBar)

| Prop QBar | Motivo do Bloqueio |
|-----------|-------------------|
| `dark` | DSS usa `[data-theme="dark"]` global |
| `glossy` | Efeito fora do vocabulário visual DSS |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo da barra — DssButton, DssIcon, títulos, q-space, etc. |

### Events

Nenhum. DssBar é container não-emissor. `defineEmits` omitido intencionalmente (padrão DSS).

---

## Tokens Utilizados (18)

| Token | Uso |
|-------|-----|
| `--dss-font-family-sans` | Tipografia base |
| `--dss-font-size-md` | Tamanho de fonte |
| `--dss-font-weight-normal` | Peso de fonte |
| `--dss-line-height-md` | Altura de linha |
| `--dss-touch-target-md` | Altura mínima padrão (48px) |
| `--dss-compact-control-height-sm` | Altura mínima no modo compacto |
| `--dss-padding-4` | Padding horizontal padrão (16px) |
| `--dss-padding-2` | Padding horizontal compacto (8px) |
| `--dss-gap-2` | Espaçamento entre itens |
| `--dss-surface-default` | Fundo padrão |
| `--dss-text-body` | Cor de texto padrão |
| `--dss-text-inverse` | Texto sobre fundos de brand |
| `--dss-gray-700` | Borda em prefers-contrast:more |
| `--dss-border-width-thin` | Espessura de borda |
| `--dss-shadow-md` | Sombra de elevação |
| `--dss-hub-600` | Fundo brand Hub |
| `--dss-water-500` | Fundo brand Water |
| `--dss-waste-600` | Fundo brand Waste |

---

## Exceções Registradas

| ID | Gate | Tipo | Localização | Justificativa |
|----|------|------|-------------|---------------|
| EXC-Gate-02 | Gate de Composição v2.4 | Compound selector `.dss-bar.q-bar--dense` | `3-variants/_variant.scss` | QBar aplica `.q-bar--dense` internamente ao elemento raiz. Sem este seletor, não é possível ajustar padding/min-height no modo compacto sem alterar props internas do QBar. Padrão idêntico a DssBanner EXC-Gate-02. |
| EXC-States-01 | Gate de Estados | System colors em `forced-colors: active` | `4-output/_states.scss` | `ButtonFace`/`ButtonText` são CSS System Colors obrigatórios em forced-colors (WCAG 1.4.11). Valor hardcoded `1px` em `border-bottom` aceito neste contexto conforme DSS_IMPLEMENTATION_GUIDE. |
| EXC-04 | Gate de Print | `!important` em `@media print` | `4-output/_states.scss` | Navegadores removem backgrounds em impressão por padrão. `!important` necessário para sobrescrever inline styles do QBar. Padrão canônico DSS. |

---

## Acessibilidade

| Critério | Status | Implementação |
|----------|--------|---------------|
| WCAG 1.4.11 (forced-colors) | ✅ | `ButtonFace`/`ButtonText` em `@media (forced-colors: active)` |
| WCAG 1.4.6 (prefers-contrast:more) | ✅ | `border-bottom: var(--dss-border-width-thin) solid var(--dss-gray-700)` |
| WCAG 2.5.5 (touch target 48px) | N/A | Container não-interativo; elementos internos têm touch target próprio |
| ARIA | N/A — delegado ao consumer | Consumer deve adicionar `role="banner"`, `aria-label` conforme contexto |
| Navegação por teclado | N/A — delegado a filhos | Elementos internos são responsáveis |
| prefers-reduced-motion | N/A | DssBar não possui animações próprias |

---

## Dependências

- `DssButton` — Fase 1, selado
- `DssIcon` — Fase 1, selado

---

## Arquivos do Componente

```
DSS/components/base/DssBar/
├── 1-structure/DssBar.ts.vue       ← Implementação canônica
├── 2-composition/_base.scss        ← Layout, tipografia, dimensionamento
├── 3-variants/_variant.scss        ← dense (EXC-Gate-02) + elevated
├── 3-variants/index.scss           ← Orquestrador L3
├── 4-output/_states.scss           ← forced-colors, prefers-contrast, print
├── 4-output/_brands.scss           ← Hub, Water, Waste (dual-selector)
├── 4-output/index.scss             ← Orquestrador L4
├── composables/useBarClasses.ts    ← Computed classes (elevated)
├── types/bar.types.ts              ← DssBarProps, DssBarSlots
├── DssBar.vue                      ← Entry point wrapper (re-export puro)
├── DssBar.module.scss              ← Orquestrador principal L2→L3→L4
├── DssBar.md                       ← Documentação normativa (Template 13.1)
├── DssBar.example.vue              ← Exemplos interativos
├── DssBar.test.js                  ← 9 testes (render, props, slots, attrs)
├── DSSBAR_API.md                   ← API Reference
├── README.md                       ← Quick start
├── dss.meta.json                   ← Metadados (status: conformant)
└── index.js                        ← Barrel export
```

---

*Selo emitido em 20/05/2026 — Design System Sansys v2.2*
