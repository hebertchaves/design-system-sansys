# SELO DSS v2.2 — DssTimelineEntry

> **Documento imutável.** Este selo certifica a conformidade do componente `DssTimelineEntry` com os critérios de qualidade do Design System Sansys v2.2 na data de emissão. Alterações posteriores ao componente exigem nova auditoria e emissão de novo selo.

---

## Identificação

| Campo | Valor |
|-------|-------|
| **Componente** | `DssTimelineEntry` |
| **Versão do Componente** | 1.0.0 |
| **Versão DSS** | v2.2 |
| **Data de Emissão** | 21/05/2026 |
| **Fase / Nível** | Fase 2 — Nível 2 — Subcomponente da Família Timeline |
| **Motor Quasar** | `QTimelineEntry` |
| **Categoria** | Visualização de Dados e Histórico |
| **Família** | Timeline |
| **Golden Reference** | DssBadge (não-interativo) |
| **Golden Context** | DssTimeline (container pai obrigatório desta família) |
| **Dependências DSS Internas** | Nenhuma direta — conteúdo via slots (DssIcon no #icon, DssBadge no #title, DssButton no default são responsabilidade do consumer) |

---

## Resultado da Auditoria

**Veredicto: ✅ CONFORME**

| Gate | Status | Observações |
|------|--------|-------------|
| Gate A — Token First (MCP) | ✅ PASS | `mcp__dss__validate_component_code`: `compliant, 0 findings` (pós-correção NC-02) |
| Gate B — Arquitetura 4 Camadas | ✅ PASS | Todas as 4 camadas presentes; orquestrador L2→L3→L4 correto; Entry Point Wrapper `DssTimelineEntry.vue` é re-export puro de `1-structure/DssTimelineEntry.ts.vue` |
| Gate C — Composição CSS | ✅ PASS | Sem `:deep()`, sem hardcoded; EXC-Gate-01 documentado; `_brands.scss` vazio intencional (brands herdados do DssTimeline pai via cascade) |
| Gate D — Responsabilidade Vue | ✅ PASS | `inheritAttrs: false`, `defineEmits` omitido, slots condicionais via `useSlots()` + `v-if="$slots.xxx"` |
| Gate E — Testes | ✅ PASS | 11 testes cobrindo render em contexto real (dentro de DssTimeline), props (heading, side×2, has-icon, has-avatar), slots (#default, #title, #subtitle), forwarding de attrs, defineOptions |
| Gate F — Documentação | ✅ PASS | Template 13.1 completo (10 seções incluindo Mapeamento de Superfície), exceções documentadas |
| Gate G — dss.meta.json | ✅ PASS | GoldenReference, GoldenContext, 4 tokens próprios declarados, 2 exceções documentadas |

---

## Ciclos de Auditoria

### Ciclo 1 — Auditoria Técnica (21/05/2026)

**NCs encontradas e corrigidas:**

| ID | Severidade | Arquivo | Descrição | Resolução |
|----|-----------|---------|-----------|-----------|
| NC-01 | Não-bloqueante | `DssTimelineEntry.example.vue` | Cenário 3 com inline styles hardcoded: `font-weight: 600`, `font-size: 12px`, `#f0f0f0`, `2px`, `6px`, `4px` | Reescrito com `DssBadge` para o badge ADMIN e `DssIcon` no slot `#icon`; `<time>` para o subtítulo; sem valores hardcoded |
| NC-02 | Não-bloqueante | `4-output/_states.scss` | `border-bottom: 1px solid ButtonText` — `1px` hardcoded não justificado como exceção estrutural | Corrigido para `var(--dss-border-width-thin) solid ButtonText` |

**GAPs corrigidos:**

| ID | Arquivo | Descrição |
|----|---------|-----------|
| GAP-01 | `DssTimelineEntry.example.vue` | Slot `#icon` sem cobertura em nenhum cenário — demonstrado no Cenário 3 (Slots Customizados) |
| GAP-04 | `DssTimelineEntry.md` | Seção "Mapeamento de Superfície" ausente — adicionada com tabela slot × componente DSS e anti-patterns |

### Ciclo 2 — Auditoria Final (21/05/2026)

**Resultado:** ✅ Nenhuma NC residual encontrada.

- MCP validation pós-correção: `compliant, 0 findings`
- Gates B–G: todos aprovados sem ressalvas

---

## Especificações Técnicas

### Props Expostas

| Prop | Tipo | Padrão | Bloqueada? |
|------|------|--------|-----------|
| `heading` | `Boolean` | `false` | Não — delegado ao QTimelineEntry |
| `tag` | `String` | `'li'` | Não — delegado ao QTimelineEntry |
| `side` | `'left' \| 'right'` | `undefined` | Não — sobrescreve o side do DssTimeline pai |
| `icon` | `String` | `undefined` | Não — delegado ao QTimelineEntry |
| `avatar` | `String` | `undefined` | Não — delegado ao QTimelineEntry |
| `title` | `String` | `undefined` | Não — delegado ao QTimelineEntry |
| `subtitle` | `String` | `undefined` | Não — delegado ao QTimelineEntry |

### Props Bloqueadas (QTimelineEntry → DssTimelineEntry)

| Prop QTimelineEntry | Motivo do Bloqueio |
|---------------------|-------------------|
| `color` | Governança exclusiva via cascade CSS do DssTimeline pai. Passagem direta quebraria o sistema de custom properties `--dss-timeline-dot-color`. |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Corpo do evento — conteúdo textual, DssButton, DssCard |
| `#title` | Customização do título — DssBadge, DssIcon, markup rico |
| `#subtitle` | Customização do subtítulo — `<time>`, formatação de data/hora |
| `#icon` | Customização do marcador — DssIcon, SVG inline |

### Events

Nenhum. DssTimelineEntry é subcomponente não-emissor. `defineEmits` omitido intencionalmente (padrão DSS).

---

## Tokens Utilizados (4 próprios)

DssTimelineEntry herda os tokens de cor, tipografia e espaçamento de conteúdo do `DssTimeline` pai via cascade CSS e custom properties. Tokens próprios:

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-font-size-lg` | 2-composition | Heading — tamanho do título de separador de período |
| `--dss-font-weight-semibold` | 2-composition | Heading — peso do título de período |
| `--dss-text-subtle` | 2-composition | Heading — cor do título de período |
| `--dss-spacing-2` | 2-composition | Heading — padding vertical do separador |

---

## Exceções Registradas

| ID | Gate | Tipo | Localização | Justificativa |
|----|------|------|-------------|---------------|
| EXC-Gate-01 | Gate de Composição v2.4 | Descendant selector `.dss-timeline-entry--heading .q-timeline__heading-title` | `2-composition/_base.scss` | QTimelineEntry no modo `heading=true` renderiza `.q-timeline__heading-title` internamente sem CSS custom property nativa para tipografia. Selector descendente necessário para aplicar tokens de fonte DSS no separador de período. |
| EXC-States-01 | Gate de Estados | System color `ButtonText` em `forced-colors: active` | `4-output/_states.scss` | Em forced-colors, o heading separator usa `ButtonText` para cor e borda, garantindo visibilidade do separador de período em ambientes de alto contraste (WCAG 1.4.11). |

---

## Acessibilidade

| Critério | Status | Implementação |
|----------|--------|---------------|
| WCAG 1.4.11 (forced-colors) | ✅ | `color: ButtonText; border-bottom: var(--dss-border-width-thin) solid ButtonText` no heading em `@media (forced-colors: active)` |
| WCAG 1.3.1 (semântica) | ✅ | QTimelineEntry renderiza como `<li>` por padrão (prop `tag='li'`) — semântica de item de lista |
| WCAG 2.5.5 (touch target) | N/A | Subcomponente não-interativo; elementos interativos nos slots têm touch target próprio |
| Ícones decorativos | Delegado ao consumer | Consumer deve garantir `aria-hidden="true"` em ícones decorativos passados via slot `#icon` |
| Avatar alt | Delegado ao consumer | Consumer deve complementar com `aria-label` no DssTimeline pai quando avatar for informativo |
| Navegação por teclado | N/A no entry | Elementos interativos nos slots são responsáveis pela própria navegação |

---

## Arquivos do Componente

```
DSS/components/base/DssTimelineEntry/
├── 1-structure/DssTimelineEntry.ts.vue     ← Implementação canônica (QTimelineEntry wrapper)
├── 2-composition/_base.scss                ← Heading mode (font-size-lg, font-weight-semibold)
├── 3-variants/_variant.scss                ← Vazio (variantes herdadas do DssTimeline pai)
├── 3-variants/index.scss                   ← Orquestrador L3
├── 4-output/_states.scss                   ← Heading forced-colors (ButtonText)
├── 4-output/_brands.scss                   ← Vazio intencional (brands herdados do pai)
├── 4-output/index.scss                     ← Orquestrador L4
├── composables/useTimelineEntryClasses.ts  ← Computed classes (heading, side, has-icon, has-avatar)
├── types/timeline-entry.types.ts           ← DssTimelineEntryProps, DssTimelineEntrySlots
├── DssTimelineEntry.vue                    ← Entry point wrapper (re-export puro)
├── DssTimelineEntry.module.scss            ← Orquestrador principal L2→L3→L4
├── DssTimelineEntry.md                     ← Documentação normativa (Template 13.1)
├── DssTimelineEntry.example.vue            ← 4 cenários (padrão, heading, slots customizados, avatar)
├── DssTimelineEntry.test.js                ← 11 testes (render, props, slots, attrs, defineOptions)
├── DSSTIMELINEENTRY_API.md                 ← API Reference completa
├── README.md                               ← Quick start e links
├── dss.meta.json                           ← Metadados (status: ready-for-audit → conformant)
└── index.js                                ← Barrel export (componente + composable + types)
```

---

*Caminho canônico do selo:* `DSS/docs/Compliance/seals/DssTimelineEntry/DSSTIMELINEENTRY_SELO_v2.2.md`

*Selo emitido em 21/05/2026 — Design System Sansys v2.2*

**CONFORME — SELO DSS v2.2 CONCEDIDO**
