# AUDITORIA FINAL A8 — Componentes de Overlay (Teleport, Z-Index, Estados Aberto/Fechado)

**Data:** 2026-06-11
**Escopo:** DssDialog, DssBottomSheet, DssPopupProxy, DssPopupEdit, DssExpansionItem, DssSplitter, DssFab, DssFabAction
**Contexto normativo:** CLAUDE.md, DSS_ARCHITECTURE.md (Princípio #13), CERTIFIED_COMPONENTS.md
**Golden Reference (interativo):** DssChip — confirmado como `goldenReference` em todos os 8 `dss.meta.json`
**Golden Contexts declarados:** DssCard (Dialog), DssDialog (BottomSheet), DssMenu (PopupEdit, PopupProxy), DssItem (ExpansionItem), DssSlider (Splitter), DssBtnDropdown (Fab), DssFab (FabAction)

---

## 1. Veredito Geral

| Componente | Gate Estrutural | Gate Técnico | Gate Documental | Risco Teleport | Veredito |
|---|---|---|---|---|---|
| DssDialog | ✅ | ✅ | ⚠️ (visualProperties ausente; demoSlots null) | ⚠️ brand CSS | ⚠️ RESSALVA |
| DssBottomSheet | ✅ | ✅ | ⚠️ (visualProperties ausente; demoSlots null) | ⚠️ brand CSS | ⚠️ RESSALVA |
| DssPopupEdit | ✅ | ✅ | ⚠️ (defaultPreview mínimo; composable não exportado) | ⚠️ brand CSS | ⚠️ RESSALVA |
| DssPopupProxy | ✅ | ✅ | ✅ (visualProperties N/A justificado) | ✅ brand delegado | ✅ APROVADO |
| DssExpansionItem | ✅ | ✅ | ✅ | N/A (não teleporta) | ⚠️ RESSALVA (teste teclado) |
| DssSplitter | ✅ | ✅ | ✅ | N/A | ✅ APROVADO |
| DssFab | ✅ | ✅ | ✅ | N/A | ✅ APROVADO |
| DssFabAction | ✅ | ✅ | ✅ | N/A | ✅ APROVADO |

**Resultado consolidado: ⚠️ RESSALVA** — nenhuma falha estrutural ou técnica bloqueante; ressalvas documentais e de cobertura de testes de teclado, e um risco real de brand em overlays teleportados (detalhado na Seção 4).

---

## 2. Gate Estrutural (8/8 ✅)

Verificado em lote via `ls -R` e leitura dos arquivos:

| Item | Dialog | BottomSheet | PopupEdit | PopupProxy | ExpansionItem | Splitter | Fab | FabAction |
|---|---|---|---|---|---|---|---|---|
| `1-structure/Dss<Comp>.ts.vue` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `2-composition/_base.scss` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `3-variants/` + `index.scss` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (`_extended.scss`) | ✅ (`_extended.scss`) |
| `4-output/` (_states, _brands, index) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Wrapper re-export puro | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `module.scss` L2 → L3 → L4 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Barrel export | ✅ comp+composable | ✅ comp+composable | ⚠️ só componente | ✅ comp+types+composable | ✅ completo | ✅ completo | ✅ completo | ✅ completo |
| `dss.meta.json` (golden/preview) | ✅* | ✅* | ⚠️* | ✅ | ✅ | ✅ | ✅ | ✅* |
| `Dss<Comp>.test.js` | ✅ 20 testes | ✅ 30 testes | ✅ 35 testes | ✅ 37 testes | ✅ 26 testes | ✅ 19 testes | ✅ 38 testes | ✅ 28 testes |

Evidências:
- Todos os 8 wrappers são re-exports puros de 3 linhas apontando para `1-structure/` (sem template/style/lógica).
- Todos os `module.scss` usam `@use` (zero `@import`) na ordem `2-composition` → `3-variants` → `4-output`.
- `index.js` de Dialog/BottomSheet documenta justificativa para não exportar types (`export type` é sintaxe TS inválida em `.js`). **DssPopupEdit/index.js não exporta `usePopupEditClasses`** ("não é exportado publicamente" — nota declarada, mas diverge do checklist "exporta componente, types e composables") → ressalva.

\* `demoSlots: null` declarado explicitamente em Dialog, BottomSheet, PopupEdit e FabAction:
- Dialog/BottomSheet: usam `previewHtml` estático no lugar de `demoSlots` — decisão correta que **evita teleport no sandbox** e mantém o preview fechado por padrão (equivalente funcional a `modelValue=false`; o prop real é `open`, ausente de `demoProps`, default `false`).
- FabAction: renderiza via pai DssFab — `demoSlots` no DssFab inclui dois `DssFabAction` (mail/edit).
- PopupEdit: `defaultPreview` é apenas `{"demoSlots": null}` — **sem previewHtml nem visualProperties** → lacuna documental.

---

## 3. Gate Técnico (8/8 ✅ com observações)

### 3.1 Token First — scan de hardcoded em `_base.scss`
- **DssDialog:** `border-bottom/top: 1px solid var(--dss-gray-100)` (linhas 105, 129) — o token `--dss-border-width-thin: 1px` existe em `tokens/semantic/_border-widths.scss` e deveria ser usado. Desvio menor, não bloqueante (cor já tokenizada).
- **DssExpansionItem:** `outline-offset: -2px` (linha 82); **DssFab/DssFabAction:** `outline-offset: 2px` — padrão recorrente nos componentes selados; observação, não bloqueante.
- BottomSheet, PopupEdit, PopupProxy, Splitter: zero valores hardcoded reais (ocorrências de grep eram comentários).
- **Zero hex/rgb/rgba** em qualquer `_base.scss`.

### 3.2 Brand `[data-brand="hub|water|waste"]`
- Dialog, BottomSheet, Splitter, Fab, FabAction: ✅ aspas duplas, 3 brands.
- PopupEdit: ✅ aspas simples (`[data-brand='hub']` etc.), 3 brands — equivalente.
- PopupProxy: ✅ exceção documentada — brand **delegado aos filhos** (precedente DssMenu), camada existe com justificativa arquitetural. Decisão teleport-safe.
- ExpansionItem: ✅ usa classes `.dss-expansion-item--brand-*` (prop `brand`) em vez de `[data-brand]` ancestral, com dark mode via `[data-theme="dark"]` e gate-exception documentada para `.q-expansion-item--expanded .q-item`. Mecanismo válido (brand via prop, padrão DssFab/DssCard).

### 3.3 `::before` reservado para touch target
✅ Únicos usos reais: `DssSplitter/2-composition/_base.scss:54` (touch target do separator, Opção B) e `DssFabAction/2-composition/_base.scss:87` (touch target 44px, WCAG 2.5.5). Nenhum uso visual. DssFab dispensa `::before` (56×56px ≥ 48px, justificado em comentário).

### 3.4 `brightness()` canônico
✅ Única ocorrência: `DssSplitter/4-output/_brands.scss` — `brightness(0.90)` ×3 (active dos 3 brands). Valor canônico.

### 3.5 Z-Index
✅ **Nenhum `z-index` hardcoded em nenhum SCSS dos 8 componentes** (grep `z-index` retornou apenas 1 comentário em DssPopupProxy.ts.vue). O empilhamento é integralmente delegado ao motor QDialog/QMenu do Quasar (EXC-Gate-01), cujo CSS vive dentro de `@layer quasar` — contido, mas funcional, pois z-index não é afetado por layers da cascata.
- Tokens `--dss-z-index-modal: 1060`, `--dss-z-index-backdrop: 1040` etc. existem em `packages/core/tokens/semantic/_z-index.scss` mas **não são consumidos** por estes componentes — aceitável (delegação ao Quasar), registrar como decisão consciente.
- DssFab: sem `z-index` nem `position: fixed` próprios — posicionamento é responsabilidade do consumidor. Sem token `--dss-z-fab` (não necessário no modelo atual).

### 3.6 Estado aberto/fechado
- DssDialog: `open` ausente de `defaultPreview.props` → fechado por default; preview via `previewHtml` estático ✅.
- DssBottomSheet: idem ✅.
- DssExpansionItem: transições tokenizadas ✅ — `transition: background-color var(--dss-duration-150) var(--dss-easing-standard)` e `transform var(--dss-duration-250) var(--dss-easing-standard)` (`_base.scss:69,130`), com `transition: none` sob reduced-motion em `_states.scss:37,41`.

---

## 4. Risco Crítico de Produção — Teleport (Princípio #13)

### 4.1 Infraestrutura de layers ✅
`apps/sandbox/index.html:11` carrega `/quasar-layered.css` ("CSS do Quasar encapsulado via @layer quasar"). CSS DSS permanece unlayered → precedência absoluta, inclusive sobre conteúdo teleportado (o layer é definido na importação da folha, não pela posição do nó no DOM). Conformidade com Princípio #13 confirmada.

### 4.2 CSS base dos overlays teleportados ✅
- DssDialog: classes globais `.dss-dialog`, `.dss-dialog__header/body/footer` aplicadas ao nó de conteúdo **dentro** do portal — funcionam fora de `#app`. CERTIFIED_COMPONENTS.md registra "CSS global (não scoped)"; os 4 arquivos `.ts.vue` de overlay documentam explicitamente "`<style scoped>` seria ineficaz — NÃO usar" ✅.
- DssBottomSheet: mesmo padrão (`.dss-bottom-sheet*`) ✅. Backdrop é o do QDialog (layer quasar) — correto.
- DssPopupProxy: delega ao QPopupProxy, **mas possui CSS próprio** (`.dss-popup-proxy`, `.q-dialog.dss-popup-proxy` em `_base.scss:49,91`) — não é wrapper puro; CSS global teleport-safe ✅.

### 4.3 ⚠️ ACHADO REAL — Brand CSS quebra sob teleport
Os seletores de brand dos overlays exigem ancestral `[data-brand]`:
- `[data-brand="hub"] .dss-dialog` (`DssDialog/4-output/_brands.scss:26`)
- `[data-brand="hub"] .dss-bottom-sheet` (`DssBottomSheet/4-output/_brands.scss:23`)
- `[data-brand='hub'] .q-popup-edit ...` (`DssPopupEdit/4-output/_brands.scss`)

O QDialog/QMenu teleporta o conteúdo para um portal filho direto de `<body>`. Hoje, `data-brand` é aplicado em **divs internas** (Storybook: decorator `<div :data-brand="brand">` em `packages/core/.storybook/preview.ts:8`; sandbox: wrappers de página como TestCard.vue). Não há aplicação em `<body>`/`<html>` em `main.js`/`App.vue`/`index.html`. **Consequência: em produção, o acento de brand desses 3 overlays silenciosamente NÃO se aplica** quando `data-brand` estiver em um wrapper de layout em vez de `<body>`.
- O próprio `DssPopupEdit/_brands.scss` documenta o requisito ("[data-brand] deve ser aplicado num ancestral comum"), mas "layout raiz ou wrapper de página" é insuficiente — sob teleport, **somente `<body>` ou `<html>` funciona**.
- DssPopupProxy está imune (brand delegado aos filhos renderizados no slot).
- **Recomendação (não bloqueante, prioridade alta):** normatizar a aplicação de `data-brand` em `document.body` (ou documentar como requisito de integração nos READMEs de Dialog/BottomSheet/PopupEdit) e ajustar o decorator do Storybook para refletir overlays.

---

## 5. Acessibilidade

| Verificação | Resultado | Evidência |
|---|---|---|
| DssDialog role="dialog" + aria-modal | ✅ (nativo QDialog) | QDialog injeta `role="dialog"` e `aria-modal` no portal; DssDialog repassa `$attrs` (teste cobre `aria-labelledby`, DssDialog.test.js:126-129) |
| aria-labelledby | ⚠️ não automático | Repassável via `$attrs`; consumidor é responsável (slot header é livre). Documentar exemplo no README seria desejável |
| Focus trap quando aberto | ✅ (nativo QDialog) | README.md:154 "Foco preso dentro do diálogo enquanto aberto (focus trap nativo do QDialog)" |
| ESC fecha o dialog | ✅ | Default ativo; `disableEsc` → `no-esc-dismiss` (DssDialog.ts.vue:12, API.md:88); `persistent` também bloqueia |
| BottomSheet handle decorativo | ✅ | `aria-hidden="true"` na handle-area (DssBottomSheet.ts.vue:21) |

---

## 6. Testes de Acessibilidade por Teclado (⚠️ Alerta WCAG 2.1.2)

Busca executada: `grep -n "keydown|Escape|keyboard|focusTrap|Enter|Space" *.test.js`

| Componente | ESC fecha | Focus trap | Enter/Space expande | Status |
|---|---|---|---|---|
| DssDialog.test.js (20 testes) | ❌ não coberto | ❌ não coberto | N/A | ⚠️ Alerta |
| DssBottomSheet.test.js (30 testes) | ❌ não coberto | N/A | N/A | ⚠️ Alerta |
| DssExpansionItem.test.js (26 testes) | N/A | N/A | ❌ não coberto (apenas menções em comentários) | ⚠️ Alerta |

Os testes existentes são reais (renderização, props, eventos, classes, aria-attrs — não são stubs), portanto **não configuram reprovação**. Porém, o escape de modal (WCAG 2.1.2 — No Keyboard Trap) e a ativação por Enter/Space dependem hoje exclusivamente do comportamento nativo do Quasar, sem teste de regressão DSS. **Recomendação:** adicionar testes de `keydown.Escape` (Dialog/BottomSheet, incl. variação `disableEsc`/`persistent`) e `keydown.Enter/Space` no header do ExpansionItem.

---

## 7. Gate Documental

| Componente | README API completa | example.vue ≥ 3 cenários | visualProperties ↔ CSS |
|---|---|---|---|
| DssDialog | ✅ (164 linhas; props/slots/events/tokens) | ✅ 5 cenários | ❌ ausente no meta → ressalva |
| DssBottomSheet | ✅ (70 linhas) | ✅ ~5 cenários (10 refs) | ❌ ausente no meta → ressalva |
| DssPopupEdit | ✅ (108 linhas) | ✅ ~5 cenários | ❌ defaultPreview mínimo → ressalva |
| DssPopupProxy | ✅ (80 linhas) | ✅ 5 exemplos numerados | ✅ N/A justificado ("estrutural adaptativo") |
| DssExpansionItem | ✅ (62 linhas) | ✅ 5 seções `<h3>` | ✅ 7 propriedades com tokens e source |
| DssSplitter | ✅ (62 linhas) | ✅ 6 cenários | ✅ 4 propriedades, fonte `_base.scss` |
| DssFab | ✅ (75 linhas) | ✅ 7 cenários | ✅ 8 propriedades |
| DssFabAction | ✅ (103 linhas) | ✅ 5 seções `<h3>` | ✅ 6 propriedades, fonte `_base.scss` |

Nota: `previewHtml` de Dialog/BottomSheet contém estilos inline com `rgba(...)` e px hardcoded — é HTML de demonstração do sandbox, fora do escopo Token First do componente, mas idealmente usaria `var(--dss-elevation-*)`.

---

## 8. Ações Recomendadas (priorizadas)

1. **[ALTA — produção]** Normatizar `data-brand` em `<body>`/`document.documentElement` ou documentar requisito de integração nos READMEs de DssDialog, DssBottomSheet e DssPopupEdit (Seção 4.3). Ajustar decorator do Storybook (`preview.ts:8`) que hoje não brandiza overlays teleportados.
2. **[MÉDIA — WCAG 2.1.2]** Adicionar testes de teclado: ESC em DssDialog/DssBottomSheet (incl. `disableEsc`/`persistent`), Enter/Space em DssExpansionItem.
3. **[MÉDIA — Princípio #12]** Preencher `defaultPreview.visualProperties` de DssDialog, DssBottomSheet e DssPopupEdit (espelho do CSS) e completar o `defaultPreview` do PopupEdit (hoje apenas `{"demoSlots": null}`).
4. **[BAIXA]** DssDialog `_base.scss:105,129`: substituir `1px` por `var(--dss-border-width-thin)`.
5. **[BAIXA]** Exportar `usePopupEditClasses` no barrel de DssPopupEdit ou formalizar a exceção no `dss.meta.json`.

---

## 9. Critério de Aceite Final

**⚠️ RESSALVA (não bloqueante).** Gates estrutural e técnico confirmados para os 8 componentes; nenhum teste é stub; `::before`, brightness, brands e z-index conformes. As ressalvas concentram-se em: (a) brand CSS de overlays teleportados dependente de `data-brand` em `<body>` — risco real de produção a normatizar; (b) ausência de testes de teclado para escape de modais e expansão; (c) lacunas de `visualProperties` nos 3 overlays composed.
