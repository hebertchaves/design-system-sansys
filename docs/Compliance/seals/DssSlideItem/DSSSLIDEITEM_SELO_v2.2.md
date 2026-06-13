# SELO DE CONFORMIDADE DSS v2.2
## DssSlideItem

> **Caminho canônico:** `DSS/docs/Compliance/seals/DssSlideItem/DSSSLIDEITEM_SELO_v2.2.md`
> Este arquivo é histórico e imutável. Não pode ser editado após emissão.
> Alterações no componente invalidam este selo. Nova auditoria → novo selo → novo arquivo.

---

## 1. Identificação

| Campo | Valor |
|-------|-------|
| **Componente** | DssSlideItem |
| **Versão DSS** | 2.2 |
| **Data de emissão** | 2026-05-20 |
| **Fase** | 2 — Nível 1 |
| **Família** | Interação Gestual |
| **Tipo** | Interativo — Wrapper de Interação Gestual |
| **Motor Quasar** | QSlideItem |
| **Golden Reference** | DssBadge (não interativo) |
| **Golden Context** | DssPullToRefresh |
| **Dependências DSS Internas** | Nenhuma |
| **Auditor** | Claude Code DSS |
| **Ciclos de auditoria** | 1 |

---

## 2. Não-Conformidades

### Ciclo 1 — 2026-05-20 (todas resolvidas antes da emissão)

| ID | Gravidade | Descrição | Correção | Evidência |
|----|-----------|-----------|----------|-----------|
| NC-01 | Não-bloqueante | `DssSlideItem.md` e `DSSSLIDEITEM_API.md` declaravam `Padrão: 'error'`/`'info'` para `leftColor`/`rightColor`, mas o código usa `undefined` com fallback condicional apenas quando o slot correspondente está presente. | Documentação corrigida: `undefined (comporta-se como 'error' quando slot left presente)` / `undefined (comporta-se como 'info' quando slot right presente)`. | `DssSlideItem.md` §3 Props; `DSSSLIDEITEM_API.md` tabela Props. |

### GAPs resolvidos no ciclo 1

| ID | Descrição | Resolução |
|----|-----------|-----------|
| GAP-01 | `reset()` no `defineExpose` usava `as any` sem comentário explicativo. | Comentário adicionado: `// QSlideItem.reset() não tipado publicamente na versão atual do Quasar — cast necessário`. |
| GAP-02 | `DssSlideItem.example.vue` usava componentes Quasar brutos (`q-item`, `q-icon`, `q-item-section`, `q-item-label`) quando existem equivalentes DSS. | `example.vue` reescrito com `DssItem` e `DssIcon`. |
| GAP-03 | `pre_prompt_dss_slide_item.md` descrevia semanticamente um item de carrossel com props `align`, `verticalAlign`, `padding`, `fullHeight` — completamente divergente do componente real. | Pré-prompt inteiramente reescrito com conteúdo correto: QSlideItem wrapper para swipe-to-reveal, API correta, tokens, EXC-Gates e WARN-A11Y-01. Corrigido retroativamente em 2026-05-20. |
| GAP-04 | Estado `disabled` sem feedback visual no container: QSlideItem bloqueia o gesto internamente mas não altera visual. Documentação omitia a responsabilidade do consumer. | Nota adicionada em `DssSlideItem.md` §6 e em `dss.meta.json` (`statesNotApplicable`). Demonstrado no `example.vue` cenário 3 com `<DssItem disable />` no slot default. |

---

## 3. Ressalvas

| ID | Tipo | Descrição | Impacto |
|----|------|-----------|---------|
| EXC-Gate-01 | gateException | QSlideItem como elemento root do componente DSS. | Motor necessário para comportamento de swipe (gestão de eventos de toque, limiares, animação de retorno). Sem ele o componente não pode existir. Aceito por governança DSS. |
| EXC-Gate-02-a | gateException | `background-color !important` nos descendant selectors `.q-slide-item__left` e `.q-slide-item__right`. | QSlideItem aplica classes `bg-{color}` (especificidade de 1 classe) nas áreas de ação. Sem `!important`, o override DSS perde em especificidade. Padrão canônico para motores Quasar com `bg-*` hardcoded. |
| EXC-Gate-02-b | gateException | CSS variables `--dss-slide-item-left-bg` e `--dss-slide-item-right-bg` injetadas via `:style` inline por instância Vue. | Única forma de governar a cor por instância sem criar tokens específicos de componente (proibido na Fase 2). Cada instância pode ter cores diferentes; variáveis no `:root` não resolveriam. |
| EXC-States-01 | statesException | `animation-duration: 0.01ms !important` para `prefers-reduced-motion`. | Animação de swipe/retorno é CSS-based (transição interna do QSlideItem). CSS puro é suficiente. Padrão canônico: DssPullToRefresh. |
| EXC-Expose-01 | exposeException | `defineExpose({ reset })` expõe método imperativo do QSlideItem. | Necessário para resetar o item programaticamente após processamento assíncrono de ação (ex: confirmar dialog, aguardar resposta de API). Padrão: DssInfiniteScroll, DssScrollArea, DssPullToRefresh. |
| WARN-A11Y-01 | acessibilidadeWarning | Gesto de swipe não é acessível via teclado ou tecnologias assistivas. | Toda interface com DssSlideItem DEVE fornecer alternativa acessível (DssButton ou menu contextual) para cada ação. Declarado obrigatoriamente na documentação (§6 e anti-patterns) e no `dss.meta.json` (`accessibilityNotes.criticalWarning`). |

---

## 4. Conformidades

### Tokens — PASS
O MCP `validate_component_code` retornou `verdict: compliant` — sem valores hardcoded não documentados. Todos os tokens declarados em `dss.meta.json` (`--dss-feedback-error`, `--dss-feedback-success`, `--dss-feedback-warning`, `--dss-feedback-info`, `--dss-text-inverse`, `--dss-padding-4`, `--dss-gap-2`, `--dss-border-width-thin`) correspondem aos usados nos arquivos SCSS. A ausência de `--dss-opacity-disabled` é intencional: o Gate de Responsabilidade proíbe captura visual de estados dos filhos; não há bloco CSS de `disabled` no container.

### Touch Target — CONFORME (N/A com justificativa)
`DssSlideItem` é um container de interação gestual, não um controle compacto com alvo de toque discreto. Touch target como Compact Control é N/A declarado explicitamente em `dss.meta.json` (`statesNotApplicable`) e na documentação §5. A responsabilidade de touch target ≥ 48px (WCAG 2.5.5) é do consumer — o conteúdo dos slots `left`/`right` deve usar `DssButton` ou padding adequado.

### Arquitetura — CONFORME
O componente está CONFORME com o Gate Estrutural DSS:
- **4 camadas obrigatórias presentes**: `1-structure/`, `2-composition/`, `3-variants/`, `4-output/` — verificadas com MCP e `find`.
- **Orquestrador SCSS** (`DssSlideItem.module.scss`): importa L2 → L3 → L4 na ordem exata.
- **Entry Point Wrapper** (`DssSlideItem.vue`) presente na raiz — re-export puro de `./1-structure/DssSlideItem.ts.vue`, sem `<template>`, sem `<style>`, sem lógica própria.
- **`index.js`** exporta tipos via `export type { DssSlideItemProps, DssSlideItemEmits, DssSlideItemActionDetails, DssSlideItemSlideDetails }`.
- **Gate de Composição**: sem seletores `:deep()`, sem tags HTML nativas substituíveis. Componente é Fase 2 — Nível 1 independente (nenhum componente DSS interno instanciado).
- **Gate de Responsabilidade**: sem captura de estados de filhos via CSS. `disabled` delegado inteiramente ao QSlideItem via prop `:disable`. Sem lógica de negócio no template.
- **`_brands.scss` vazio intencional**: cores de feedback (error, success, warning, info) têm precedência sobre identidade de marca para a semântica das ações. Decisão arquitetural documentada.

### Estados — CONFORME
Estados de swipe (`idle`, `sliding`, `action-revealed`, `action-triggered`) gerenciados pelo motor QSlideItem. Estado `disabled` delegado via prop `:disable`. Estados N/A (`hover`, `focus`, `loading`, `active`) declarados explicitamente em `dss.meta.json` (`statesNotApplicable`) e na documentação §4 com justificativas objetivas. `prefers-reduced-motion`, `prefers-contrast: more`, `forced-colors: active` e `@media print` implementados em `4-output/_states.scss`.

### Acessibilidade — CONFORME
- **WCAG 2.1 AA**: verificado.
- **`prefers-reduced-motion`**: `animation-duration: 0.01ms !important` nas áreas de ação e conteúdo (EXC-States-01).
- **`prefers-contrast: more`**: `border: var(--dss-border-width-thin) solid currentColor` nas áreas de ação.
- **`forced-colors: active`**: `forced-color-adjust: none` com SystemColor keywords (`Highlight`, `HighlightText`, `ButtonText`) nas áreas de ação.
- **`@media print`**: `display: none !important` nas áreas de ação (conteúdo principal permanece visível).
- **WARN-A11Y-01**: gesto de swipe não acessível via teclado. Aviso obrigatório declarado em §1 ("Quando NÃO usar"), §6 (bloco destacado com ⚠️), §10 (anti-patterns), `dss.meta.json` (`accessibilityNotes.criticalWarning`) e `compositionRecommendations`.
- **Slots condicionais**: `#left` e `#right` renderizados via `v-if="$slots.left"` / `v-if="$slots.right"` — área não renderizada sem slot, sem artefatos visuais vazios.
- **Forwarding**: `inheritAttrs: false` + `v-bind="$attrs"` garantem que `data-testid`, `aria-label` e classes extras passem ao QSlideItem root.

### Documentação — CONFORME
- `DssSlideItem.md`: Template 13.1 completo — visão geral, classificação, API, estados, tokens, acessibilidade, comportamentos implícitos, paridade Golden (DssBadge), decisões arquiteturais, exceções, anti-patterns, changelog.
- `DSSSLIDEITEM_API.md`: props (expostas e bloqueadas), slots com scope, eventos, métodos imperativos, classes CSS, tokens — consistente com o código após NC-01.
- `DssSlideItem.example.vue`: 3 cenários (deletar+arquivar, marcar como concluído, disabled) — usando `DssItem`/`DssIcon`, sem valores hardcoded.
- Exceções documentadas em `dss.meta.json` (5 entradas), `DssSlideItem.md` §9 e `DSSSLIDEITEM_API.md`.
- `dss.meta.json`: `goldenReference`, `goldenContext`, `motor`, tokens, `statesApplicable`, `statesNotApplicable`, `exceptions`, `accessibilityNotes`, `auditHistory` completos.

### Testes — CONFORME
`DssSlideItem.test.js` presente na raiz do componente. 11 testes cobrindo:
- **Renderização base**: componente renderiza sem erros, classe `dss-slide-item` presente.
- **Estado disabled**: classe `dss-slide-item--disabled` aplicada, sem `pointer-events: none` no conteúdo (Gate de Responsabilidade).
- **CSS variables**: `--dss-slide-item-left-bg` e `--dss-slide-item-right-bg` injetadas no style inline com tokens corretos.
- **Slots**: slot `default`, `#left` e `#right` renderizados corretamente.
- **Eventos**: `action` e `slide` emitidos via passthrough.
- **`defineExpose`**: método `reset()` exposto e callable.
- **Forwarding (`$attrs`)**: atributos arbitrários encaminhados ao root QSlideItem.

---

## 5. Resultado Final

**CONFORME — SELO DSS v2.2 CONCEDIDO**

- **Componente:** DssSlideItem
- **Data de emissão:** 2026-05-20
- **Este documento é imutável.** Qualquer alteração posterior no componente invalida este selo. Uma nova auditoria deve ser conduzida e um novo arquivo de selo deve ser criado.
