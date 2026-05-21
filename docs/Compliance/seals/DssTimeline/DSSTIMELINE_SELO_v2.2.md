# SELO DSS v2.2 — DssTimeline

> **Documento imutável.** Este selo certifica a conformidade do componente `DssTimeline` com os critérios de qualidade do Design System Sansys v2.2 na data de emissão. Alterações posteriores ao componente exigem nova auditoria e emissão de novo selo.

---

## Identificação

| Campo | Valor |
|-------|-------|
| **Componente** | `DssTimeline` |
| **Versão do Componente** | 1.0.0 |
| **Versão DSS** | v2.2 |
| **Data de Emissão** | 21/05/2026 |
| **Fase / Nível** | Fase 2 — Nível 2 — Composição de Primeiro Grau |
| **Motor Quasar** | `QTimeline` |
| **Categoria** | Visualização de Dados e Histórico |
| **Família** | Timeline |
| **Golden Reference** | DssBadge (não-interativo) |
| **Golden Context** | DssBanner (container não-interativo com EXC-Gate-01 e brand dual-selector) |
| **Dependências DSS Internas** | `DssTimelineEntry` (subcomponente obrigatório), `DssIcon` (slot #icon), `DssAvatar` (prop avatar), `DssButton` (slot default), `DssBadge` (slot #title), `DssCard` (slot default) |

---

## Resultado da Auditoria

**Veredicto: ✅ CONFORME**

| Gate | Status | Observações |
|------|--------|-------------|
| Gate A — Token First (MCP) | ✅ PASS | `mcp__dss__validate_component_code`: `compliant, 0 findings` |
| Gate B — Arquitetura 4 Camadas | ✅ PASS | Todas as 4 camadas presentes; orquestrador L2→L3→L4 correto; Entry Point Wrapper `DssTimeline.vue` é re-export puro de `1-structure/DssTimeline.ts.vue` |
| Gate C — Composição CSS | ✅ PASS | Sem `:deep()`, sem hardcoded; EXC-Gate-01 documentado e justificado; brand dual-selector correto |
| Gate D — Responsabilidade Vue | ✅ PASS | `inheritAttrs: false`, `defineEmits` omitido (container não-emissor), `useTimelineClasses` em composable |
| Gate E — Testes | ✅ PASS | 10 testes cobrindo render, props (layout×3, side×2, dark), slot default, composição com DssTimelineEntry, forwarding de attrs |
| Gate F — Documentação | ✅ PASS | Template 13.1 completo (11 seções), exceções documentadas em código + meta.json + `.md` |
| Gate G — dss.meta.json | ✅ PASS | GoldenReference, GoldenContext, 25 tokens, 3 exceções documentadas |

---

## Ciclos de Auditoria

### Ciclo 1 — Auditoria Técnica (21/05/2026)

**NCs encontradas e corrigidas:**

| ID | Severidade | Arquivo | Descrição | Resolução |
|----|-----------|---------|-----------|-----------|
| NC-01 (família) | Não-bloqueante | `DssTimelineEntry.example.vue` | Cenário 3 com inline styles hardcoded (hex, px, font-weight numérico) | Reescrito com `DssBadge`, `DssIcon` e `<time>` sem valores hardcoded |
| NC-02 (família) | Não-bloqueante | `DssTimelineEntry/4-output/_states.scss` | `border-bottom: 1px solid ButtonText` com `1px` hardcoded | Corrigido para `var(--dss-border-width-thin) solid ButtonText` |

**GAPs corrigidos:**

| ID | Arquivo | Descrição |
|----|---------|-----------|
| GAP-01 | `DssTimelineEntry.example.vue` | Slot `#icon` sem cobertura em nenhum cenário — adicionado ao Cenário 3 |
| GAP-02 | `DssTimeline.md` | Ausência de aviso sobre inconsistência de `dark=true` sem `data-theme="dark"` — adicionado à tabela de props |
| GAP-03 | `DssTimeline.test.js` | Prop `dark` sem teste de forwarding — teste adicionado |
| GAP-04 | `DssTimelineEntry.md` | Seção "Mapeamento de Superfície" (slots + componentes DSS) ausente — adicionada |
| GAP-05 | `pre_prompt_dss_timeline.md` | Tokens inexistentes e nomes de props incorretos — nota de correção retroativa adicionada |

### Ciclo 2 — Auditoria Final (21/05/2026)

**Resultado:** ✅ Nenhuma NC residual encontrada.

- MCP validation pós-correção: `compliant, 0 findings`
- Gates B–G: todos aprovados sem ressalvas

---

## Especificações Técnicas

### Props Expostas

| Prop | Tipo | Padrão | Bloqueada? |
|------|------|--------|-----------|
| `layout` | `'dense' \| 'comfortable' \| 'loose'` | `undefined` | Não — delegado ao QTimeline |
| `side` | `'left' \| 'right'` | `undefined` | Não — delegado ao QTimeline |
| `dark` | `Boolean` | `false` | Não — delegado ao QTimeline (preferir `data-theme="dark"`) |

### Props Bloqueadas (QTimeline → DssTimeline)

| Prop QTimeline | Motivo do Bloqueio |
|----------------|-------------------|
| `color` | Governança exclusiva via CSS custom properties `--dss-timeline-line-color` e `--dss-timeline-dot-color`. Passagem direta criaria conflito com o sistema de tokens DSS (EXC-Gate-01). |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Slot principal — aceita exclusivamente componentes `DssTimelineEntry` |

### Events

Nenhum. DssTimeline é container não-emissor. `defineEmits` omitido intencionalmente (padrão DSS).

---

## Tokens Utilizados (25)

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-gray-300` | 2-composition | Linha conectora — estado neutro |
| `--dss-gray-400` | 2-composition | Marcador/ponto — estado neutro |
| `--dss-text-body` | 2-composition | Cor de texto padrão (título e conteúdo) |
| `--dss-text-subtle` | 2-composition | Cor do subtítulo/data |
| `--dss-text-inverse` | 2-composition | Texto sobre o marcador colorido |
| `--dss-font-family-sans` | 2-composition | Família tipográfica base |
| `--dss-font-size-md` | 2-composition | Tamanho de fonte padrão |
| `--dss-font-size-sm` | 2-composition | Tamanho de fonte do subtítulo |
| `--dss-font-weight-normal` | 2-composition | Peso de fonte padrão |
| `--dss-font-weight-semibold` | 2-composition | Peso de fonte do título |
| `--dss-line-height-md` | 2-composition | Altura de linha |
| `--dss-spacing-1` | 2-composition | Margin bottom do título |
| `--dss-spacing-2` | 2-composition | Margin bottom do subtítulo |
| `--dss-spacing-6` | 2-composition | Padding bottom do conteúdo (comfortable) |
| `--dss-spacing-3` | 3-variants | Padding bottom — layout dense |
| `--dss-spacing-8` | 3-variants | Padding bottom — layout loose |
| `--dss-hub-600` | 4-output/brands | Linha e marcador — brand Hub |
| `--dss-water-500` | 4-output/brands | Linha e marcador — brand Water |
| `--dss-waste-600` | 4-output/brands | Linha e marcador — brand Waste |
| `--dss-gray-600` | 4-output/states | Linha — prefers-contrast: more (neutro) |
| `--dss-gray-700` | 4-output/states | Marcador — prefers-contrast: more (neutro) |
| `--dss-hub-800` | 4-output/states | Linha e marcador Hub — prefers-contrast: more |
| `--dss-water-700` | 4-output/states | Linha e marcador Water — prefers-contrast: more |
| `--dss-waste-800` | 4-output/states | Linha e marcador Waste — prefers-contrast: more |
| `--dss-border-width-thin` | 4-output/states | Borda estrutural no modo de impressão |

---

## Exceções Registradas

| ID | Gate | Tipo | Localização | Justificativa |
|----|------|------|-------------|---------------|
| EXC-Gate-01 | Gate de Composição v2.4 | Descendant selectors `.q-timeline__*` | `2-composition/_base.scss` | QTimeline renderiza `.q-timeline__connector`, `.q-timeline__dot`, `.q-timeline__title`, `.q-timeline__subtitle` e `.q-timeline__content` internamente sem CSS custom properties nativas para controle de cor. Descendant selectors são obrigatórios para governança de tokens DSS sem uso de `:deep()`. |
| EXC-States-01 | Gate de Estados | System colors em `forced-colors: active` | `4-output/_states.scss` | `ButtonText`/`Canvas`/`CanvasText` são CSS System Colors obrigatórios em forced-colors (WCAG 1.4.11). Valores necessários para garantir visibilidade da linha e marcadores estruturais. |
| EXC-04 | Gate de Print | `!important` em `@media print` | `4-output/_states.scss` | Navegadores removem backgrounds em impressão por padrão. `!important` necessário para sobrescrever comportamento do QTimeline em impressão e garantir visibilidade estrutural da linha do tempo. Padrão canônico DSS (DssBanner EXC-04). |

---

## Acessibilidade

| Critério | Status | Implementação |
|----------|--------|---------------|
| WCAG 1.4.11 (forced-colors) | ✅ | `ButtonText`/`Canvas`/`CanvasText` em `@media (forced-colors: active)` |
| WCAG 1.4.6 (prefers-contrast: more) | ✅ | Tokens numéricos mais densos por marca (`--dss-gray-600/700`, `--dss-hub-800`, `--dss-water-700`, `--dss-waste-800`) |
| WCAG 2.5.5 (touch target) | N/A | Container não-interativo; elementos internos têm touch target próprio |
| WCAG 1.3.1 (semântica de lista) | ✅ | QTimeline renderiza como elemento de lista HTML semântica; DssTimeline herda automaticamente |
| ARIA | Delegado ao consumer | Consumer deve adicionar `aria-label` para descrever o propósito da linha do tempo (`<DssTimeline aria-label="Histórico">`) |
| Live region | Delegado ao consumer | `aria-live="polite"` via atributo forwarded para timelines com atualização dinâmica |
| Navegação por teclado | N/A no container | Elementos interativos internos (nos slots) são responsáveis pela própria navegação |
| prefers-reduced-motion | N/A | DssTimeline não possui animações próprias |

---

## Arquivos do Componente

```
DSS/components/base/DssTimeline/
├── 1-structure/DssTimeline.ts.vue      ← Implementação canônica (QTimeline wrapper)
├── 2-composition/_base.scss            ← CSS custom props + EXC-Gate-01 descendant selectors
├── 3-variants/_variant.scss            ← dense (spacing-3) + loose (spacing-8)
├── 3-variants/index.scss               ← Orquestrador L3
├── 4-output/_states.scss               ← forced-colors, prefers-contrast, print (EXC-04)
├── 4-output/_brands.scss               ← Hub, Water, Waste dual-selector
├── 4-output/index.scss                 ← Orquestrador L4
├── composables/useTimelineClasses.ts   ← Computed classes (layout, side)
├── types/timeline.types.ts             ← DssTimelineProps, DssTimelineSlots, tipos auxiliares
├── DssTimeline.vue                     ← Entry point wrapper (re-export puro)
├── DssTimeline.module.scss             ← Orquestrador principal L2→L3→L4
├── DssTimeline.md                      ← Documentação normativa (Template 13.1)
├── DssTimeline.example.vue             ← 5 cenários (padrão, alternado, brand hub, dense water, loose waste)
├── DssTimeline.test.js                 ← 10 testes (render, props, dark, slot, composição, attrs)
├── DSSTIMELINE_API.md                  ← API Reference completa
├── README.md                           ← Quick start e links
├── dss.meta.json                       ← Metadados (status: ready-for-audit → conformant)
└── index.js                            ← Barrel export (componente + composable + types)
```

---

*Caminho canônico do selo:* `DSS/docs/Compliance/seals/DssTimeline/DSSTIMELINE_SELO_v2.2.md`

*Selo emitido em 21/05/2026 — Design System Sansys v2.2*

**CONFORME — SELO DSS v2.2 CONCEDIDO**
