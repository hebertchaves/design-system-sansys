# DSSEXPANSIONITEM_SELO_v2.2.md — Selo de Conformidade DSS

> **Componente:** DssExpansionItem  
> **Versão DSS:** 2.2  
> **Fase:** 2 | **Nível:** 2  
> **Família:** Expansão e Colapso  
> **Data do Selo:** 05 Mai 2026  
> **Auditor:** Claude Code (Sonnet 4.6) via Modo Auditor DSS v2.5  
> **Golden Reference:** DssChip | **Golden Context:** DssItem  
> **Status:** ✅ SELADO

---

## 1. Identidade do Componente

| Campo | Valor |
|-------|-------|
| Nome | DssExpansionItem |
| CSS Class | `.dss-expansion-item` |
| Quasar base | `QExpansionItem` |
| Arquitetura | WRAP (não rebuild) |
| Touch Target | Opção A — `min-height: --dss-spacing-12` (visual ≥ mínimo WCAG) |

---

## 2. Gates de Conformidade

| Gate | Status | Observação |
|------|--------|------------|
| Estrutural (4 camadas) | ✅ | 1-structure, 2-composition, 3-variants, 4-output presentes |
| Entry Point Wrapper | ✅ | `DssExpansionItem.vue` re-export puro |
| Orchestrador SCSS | ✅ | L2 → L3 → L4 na ordem correta |
| Barrel export | ✅ | `index.js` exporta componente, types, composables |
| `dss.meta.json` | ✅ | goldenReference e goldenContext declarados |
| Token First | ✅ | Sem hardcoded (3px em forced-colors = EXC-States-01) |
| Estados documentados | ✅ | default, hover, focus, active, disabled, expanded |
| Acessibilidade | ✅ | WCAG 2.5.5 Opção A, 2.4.7 focus ring, ARIA delegado ao Quasar |
| Documentação normativa | ✅ | DssExpansionItem.md Template 13.1 completo |
| API Reference | ✅ | DSSEXPANSIONITEM_API.md atualizado |
| Exemplo funcional | ✅ | DssExpansionItem.example.vue (5 cenários) |

---

## 3. Não-Conformidades Encontradas e Resoluções

### NC-01 — `forced-color-adjust` não documentado  
**Severidade:** Média  
**Arquivo:** `4-output/_states.scss`  
**Descrição:** `forced-color-adjust: none` e `forced-color-adjust: auto` presentes no bloco `@media (forced-colors: active)` sem documentação como exceção. Divergência do Golden Context (DssItem) sem justificativa registrada.  
**Resolução:** Ambas as linhas removidas. O bloco `forced-colors` contém exclusivamente SystemColor keywords e valores absolutos (EXC-States-01 vigente). Alinhado ao padrão DssItem.  
**Status:** ✅ Corrigido

---

## 4. GAPs Documentados

### GAP-01 — Compatibilidade `header-aria-label` (Quasar 2.14.x)
**Severidade:** Baixa  
**Descrição:** A prop `header-aria-label` do QExpansionItem foi testada com Quasar 2.14.x. Versões futuras podem não suportar esta prop.  
**Resolução:** Reserva adicionada em `dss.meta.json` e em `DssExpansionItem.md §11`. Fallback documentado: slot `#header` com `aria-label` no elemento raiz.  
**Status:** ✅ Documentado

### GAP-02 — EXC-States-01 escopo incompleto
**Severidade:** Baixa  
**Descrição:** A justificativa de EXC-States-01 em `dss.meta.json` cobria apenas `forced-colors`, mas não o contexto `@media print` (onde `background-color: transparent !important` e `display:none` também são exceções da regra Token First).  
**Resolução:** Justificativa expandida para incluir o escopo print.  
**Status:** ✅ Documentado

### GAP-03 — Token `--dss-text-secondary` no pre-prompt
**Severidade:** Baixa  
**Descrição:** O pre-prompt de criação referenciava o token `--dss-text-secondary`, que não existe no catálogo DSS v2.2.  
**Resolução:** Implementação usa corretamente `--dss-text-subtle`, conforme DssItem (Golden Context). Resolvido antes do início da implementação via Chat Estratégico.  
**Status:** ✅ Resolvido pré-implementação

---

## 5. Exceções Documentadas

| ID | Regra | Valor | Justificativa |
|----|-------|-------|---------------|
| EXC-Gate-01 | Gate de Composição v2.4 | `.dss-expansion-item .q-item` | DOM interno QExpansionItem — header nativo |
| EXC-Gate-02 | Gate de Composição v2.4 | `.dss-expansion-item .q-expansion-item__content` | Painel de conteúdo interno |
| EXC-Gate-03 | Gate de Composição v2.4 | `.dss-expansion-item .q-expansion-item__toggle-icon` | Ícone de expansão interno |
| EXC-Gate-04 | Gate de Composição v2.4 | `.dss-expansion-item .q-expansion-item--expanded` | Classe de estado interna Quasar |
| EXC-States-01 | Token First | `1px/2px/3px`, SystemColor keywords, `transparent !important`, `display:none` | forced-colors e print — CSS variables ignoradas |
| EXC-States-02 | Token First | `outline: 2px solid white` | `--dss-focus-ring-dark` não existe em DSS v2.2 |

---

## 6. Decisões Arquiteturais Seladas

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| Arquitetura base | WRAP (QExpansionItem) | Animação de altura, ARIA, accordion, teclado — nativo Quasar |
| Touch target | Opção A (visual ≥ 44px) | `min-height: --dss-spacing-12` (48px). Dense: `--dss-touch-target-md` (44px) |
| Brand no expanded | Apenas quando expandido | Marca não polui estado colapsado — decisão de design |
| `withDefaults` | 3 defaults não-triviais | `disable: false`, `dense: false`, `brand: null` |
| `defineEmits` | Interface tipada | `ExpansionItemEmits` — padrão DssFabAction |
| `<style>` sem scoped | Global (não scoped) | Seletores `.dss-expansion-item .q-item` precisam funcionar globalmente |
| Brand tokens | Numéricos (`--dss-hub-600`) | Tokens semânticos de brand não existem no catálogo v2.2 |

---

## 7. Tokens Declarados (29)

`--dss-font-family-sans`, `--dss-font-size-md`, `--dss-font-weight-normal`, `--dss-line-height-normal`, `--dss-text-body`, `--dss-text-subtle`, `--dss-spacing-1_5`, `--dss-spacing-3`, `--dss-spacing-4`, `--dss-spacing-12`, `--dss-surface-hover`, `--dss-surface-active`, `--dss-surface-subtle`, `--dss-surface-muted`, `--dss-focus-ring`, `--dss-duration-150`, `--dss-duration-250`, `--dss-easing-standard`, `--dss-opacity-disabled`, `--dss-touch-target-md`, `--dss-border-width-thin`, `--dss-border-width-md`, `--dss-border-width-thick`, `--dss-hub-600`, `--dss-hub-400`, `--dss-water-500`, `--dss-water-400`, `--dss-waste-600`, `--dss-waste-500`

---

## 8. Paridade com Golden Context (DssItem)

| Aspecto | DssItem | DssExpansionItem | Divergência |
|---------|---------|-----------------|-------------|
| Tipografia do header | `--dss-font-size-md`, `--dss-font-weight-normal` | ✅ Idêntico | — |
| Padding do header | `--dss-spacing-3` × `--dss-spacing-4` | ✅ Idêntico | — |
| min-height | `--dss-spacing-12` | ✅ Idêntico | — |
| Hover overlay | `--dss-surface-hover` | ✅ Idêntico | — |
| Focus ring | `--dss-focus-ring` | ✅ Idêntico | — |
| Active state | `--dss-surface-active` | ✅ Idêntico | — |
| Disabled opacity | `--dss-opacity-disabled` | ✅ Idêntico | — |
| `-webkit-tap-highlight-color` | `transparent` | ✅ Idêntico | — |
| ARIA (expanded, controls) | Manual | Quasar nativo | Benefício WRAP — sem divergência negativa |
| `forced-color-adjust` | Ausente | Ausente (NC-01 corrigido) | ✅ Alinhado |

---

## 9. Validação MCP

| Rodada | Resultado | Findings |
|--------|-----------|---------|
| Rodada 1 | `uncertain` | 7 warnings (px em comentários) → corrigidos |
| Rodada 2 (pré-correções NC/GAP) | `uncertain` | 1 warning (`3px` EXC-States-01) |
| Rodada 3 (pós-correções) | `uncertain` | 1 warning (`3px` EXC-States-01 — insubstituível) |

**Veredito final:** `uncertain` com 1 warning insubstituível (EXC-States-01). Aprovado para selo.

---

## 10. Precedentes Estabelecidos

- **Gate exception `.q-expansion-item--expanded`** — classe de estado Quasar usada como seletor descendente. Padrão análogo ao `.q-fab__trigger` (DssFab) e `.q-fab__action` (DssFabAction).
- **Opção A de touch target em componente composto** — `min-height` no elemento filho (`.q-item`) garante o target sem `::before`. Distinção clara vs. DssFabAction (Opção B).
- **`withDefaults` apenas com defaults não-triviais** — props com `undefined` implícito omitidas. Padrão estabelecido por DssFabAction (selado Mai 2026).
- **Brand apenas no expanded** — acento de marca via `border-left` condicional à classe `.q-expansion-item--expanded`. Primeiro componente com brand condicional por estado.

---

*Componente selado pelo Modo Auditor DSS v2.5. Todas as NCs corrigidas. GAPs documentados. Precedentes registrados.*
