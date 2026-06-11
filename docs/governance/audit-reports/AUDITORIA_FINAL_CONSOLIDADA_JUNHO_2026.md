# AUDITORIA FINAL CONSOLIDADA — DSS Pré-Produção (Junho/2026)

**Data de consolidação:** 2026-06-11
**Agente de síntese:** Claude Code (síntese dos relatórios A1–A12)
**Fontes:** `docs/governance/audit-reports/AUDITORIA_FINAL_A1..A12_*.md` (12 relatórios, todos com evidência física de arquivo/linha)
**Objetivo:** decisão go/no-go para migração ao GitLab

---

## 1. SCORECARD EXECUTIVO

| Agente | Domínio | Veredicto | Bloqueantes | Alertas |
|--------|---------|-----------|:-----------:|:-------:|
| A1 | Fundação CSS (Layers, Token Bridge, @use/@import, Sass) | ❌ REPROVADO | 4 | 1 |
| A2 | Build, Imports e Dependências (Monorepo) | ❌ REPROVADO | 3 | 5 |
| A3 | Atômicos 1 (Button, Chip, Badge, Toggle, Checkbox, Radio, Avatar, Icon, Input, Tooltip) | ❌ 8 REPROVADOS / 2 RESSALVAS | 5 | 5 |
| A4 | Atômicos 2 (Textarea, Select, Slider, Range, File, Item*, Separator, Space, Spinner) | ⚠️ 2 REPROVADOS / 8 RESSALVAS / 1 APROVADO | 2 | 7 |
| A5 | Layout (Layout, Page*, Header, Footer, Drawer, Toolbar*, Bar) | ⚠️ APROVADO COM RESSALVAS | 0 | 9 |
| A6 | Navegação (Tabs*, Breadcrumbs*, Menu, Pagination, Stepper*) | ✅ APROVADO (11/11) | 0 | 6 |
| A7 | Formulários (Form, Field, OptionGroup, Rating, Knob, Pickers, Uploader) | ⚠️ APROVADO COM RESSALVAS | 0 | 7 |
| A8 | Overlays (Dialog, BottomSheet, PopupProxy/Edit, ExpansionItem, Splitter, Fab*) | ⚠️ RESSALVA | 0 | 5 |
| A9 | Dados e Conteúdo (Table, Carousel, Tree, Card, Timeline*, Scrolls, Skeleton, List) | ❌ 1 REPROVADO / 2 RESSALVAS / 7 APROVADOS | 1 | 6 |
| A10 | Periféricos (16 componentes) | ⚠️ ALERTA | 0 | 3 |
| A11 | Governança Documental | ⚠️ APROVADO COM ALERTAS | 0 | 8 |
| A12 | Apps & Developer Experience | ⚠️ ALERTA + 1 bloqueante setorial | 1 | 7 |
| **TOTAL** | | | **16** | **69** |

---

## 2. PROBLEMAS BLOQUEANTES PARA PRODUÇÃO

### Infraestrutura de Build (impedem qualquer release da biblioteca)

1. **[A1+A2] `packages/core` — `npm run core:build` FALHA.** Duas causas independentes confirmadas: (a) `DssUploader/1-structure/DssUploader.ts.vue:60-62` importa `'../../base/...'` quando o correto é `'../../../base/...'` (3 imports — A2 validou que a correção faz o build passar); (b) sintaxe TypeScript `export type` em 5 barrels `.js` no HEAD (`DssBottomSheet`, `DssCarousel`, `DssChatMessage`, `DssDialog`, `DssUploader` — correções existem no working tree mas **não estão commitadas**). **Impacto:** a biblioteca não compila; impossível publicar `@sansys/design-system` a partir do repositório commitado.

2. **[A2] `packages/core/dist/style.css` — TOKENS FANTASMAS.** O entry da lib (`vite.config.lib.js` → `index.js`) não importa `packages/core/index.scss`. Resultado medido em build fresco: **0 blocos `:root`** (nenhum token declarado), `--dss-compact-control-height-*` ausente, `dss-chip` ausente. **Impacto:** qualquer consumidor de produção recebe centenas de `var(--dss-*)` indefinidas e componentes sem estilo. O sandbox mascara o problema (compila o SCSS ao vivo) — falso positivo clássico de "funciona no dev".

3. **[A1] `@import` ativo em `packages/core/` — 25 ocorrências em `.scss` + 1 em `.vue`.** Cadeia viva: `themes/index.scss` (3) e `tokens/semantic/accessibility/index.scss` (4), confirmadas por DEPRECATION WARNING do Dart Sass; órfãos: `tokens/semantic/index.scss` (14), `tokens/brand/index.scss` (3), `themes/quasar.variables.scss` (1); SFC: `DssTabPanels.ts.vue:180`. A2 detectou ainda 17 warnings de `@import` nos `<style>` de 17 SFCs durante o build. **Impacto:** violação direta do Princípio #2 (vinculante); remoção programada no Dart Sass 3.0 quebrará o build futuro; contradiz a alegação "Onda 3 migrou 100%".

4. **[A1+A11] `_quasar-overrides.scss` — 16 referências `var(--quasar-*)` + CSS inválido.** Linhas 42–919; inclui 2 usos efetivamente quebrados: `rgba(var(--quasar-primary), 0.1)` (linhas 79, 90) — declaração descartada silenciosamente pelo browser. **Impacto:** estilos de hover/seleção de overrides Quasar não se aplicam; namespace legado fora da bridge canônica `--q-*`.

### Componentes (falhas reais de contrato/A11y)

5. **[A3] `DssButton` — implementação dupla divergente; wrapper entrega botão SEM ARIA.** `1-structure/` contém `DssButton.vue` (legado, sem `aria-label`/`aria-busy`/`aria-disabled`/`role="status"`) e `DssButton.ts.vue` (canônico, com ARIA). O wrapper raiz importa o **legado**; o barrel importa o canônico. **Impacto:** consumidores via wrapper recebem o componente mais usado do sistema sem acessibilidade — violação WCAG direta em produção e do Princípio #11. (Verificar mesmo padrão em `DssAvatar` e `DssBadge`, que também têm `.vue` extra em `1-structure/`.)

6. **[A9] `DssTable` — contrato de slot documentado mas NÃO implementado (NC-A9-01).** O README documenta `#body-cell-actions`, mas o template repassa apenas lista fixa de slots — sem forwarding dinâmico `body-cell-[name]`. **Impacto:** ações por linha (editar/excluir), caso de uso nº 1 de tabelas corporativas, falham silenciosamente em produção. Correção: forwarding dinâmico (padrão já existente no DssTree) ou corrigir o README.

7. **[A3] `DssChip` (Golden Reference interativo) — `color: white` literal em SCSS.** `3-variants/_outline.scss` (6 ocorrências). Viola Princípios #1 e #3; agravante: propaga-se como referência para auditorias de outros componentes. Correção trivial: `var(--dss-text-inverse)`.

8. **[A3] `DssAvatar` — 4 falhas acumuladas.** `DssAvatar.example.vue` NÃO existe (único do grupo); `4-output/index.scss` ausente (orquestrador com nome não-canônico); brands implementados na camada errada (`3-variants/_brands.scss`); `64px`/`56px`/`768px` hardcoded sem exceção aprovada; possível divergência meta (40px) × CSS (48px).

9. **[A3] Barrel exports incompletos — 7 componentes do Grupo Atômico 1** (DssButton, DssBadge, DssRadio, DssAvatar, DssIcon, DssInput, DssTooltip): `index.js` exporta apenas o componente; types e composables existem mas não são exportados. Item explícito e bloqueante do Gate Estrutural do CLAUDE.md.

10. **[A4] `DssSlider` e `DssRange` — barrel não exporta types** (`slider.types.ts` / `range.types.ts` órfãos). Mesma violação do item 9; correção de 1 linha cada (`export * from './types/...'`).

11. **[A3] `DssBadge` — arquivo órfão com import quebrado.** `4-output/DssBadge.scss` (fora da arquitetura) faz `@use '../3-variants/colors'` para módulo **inexistente** — código morto que falharia se compilado. Remover.

### Apps

12. **[A12] `apps/docs-portal/src/index.css` — drift sistêmico de paleta.** 346 declarações `--dss-*` manuais; **262 duplicam tokens do core**; **13 com valores DIVERGENTES** (toda a família `--dss-action-primary*` apontando para `--dss-hub-*` em vez de `--dss-primary*`; 5 sombras com opacidades diferentes; 3 cores `-deep` com hex antigos). **Impacto:** o portal de documentação renderiza com paleta diferente do sistema real — mina a confiança do contrato visual. Correção: gerar o bloco via script de sync ou importar o CSS de tokens do core. (Colateral no core: `globals.scss` tem declarações duplicadas do mesmo token nas linhas 89-90, 129-130, 137-138.)

---

## 3. ALERTAS NÃO-BLOQUEANTES (resolúveis pós-migração GitLab)

### Testes e Acessibilidade
- **Testes de teclado ausentes** (~17 componentes interativos — ver §4.D): Button, Toggle, Checkbox, Radio, Input (A3); Select, Slider, Range (A4); Tabs, Menu, Pagination, Stepper (A6); Knob, Rating (A7); Dialog, BottomSheet, ExpansionItem (A8); Drawer/ESC (A5). Delegação ao Quasar sem teste de regressão — risco em upgrades do Quasar.
- **[A7] `DssUploader.test.js` AUSENTE** e **[A10] `DssCadrisCard.test.js` AUSENTE** — contradizem a alegação "76/76 com test.js" do CLAUDE.md (contagem real: 87/89 base+composed, 1/2 stress-test).
- **[A6] DssMenu** sem focus trap próprio (delegado ao QMenu sem verificação); **[A7] DssColorPicker** sem estratégia de label acessível documentada.
- **[A4] DssItem** remove touch target em densidade compact (`_density.scss:33`) — documentar implicação WCAG 2.5.5 como exceção formal.

### Risco de Integração (alta prioridade pós-migração)
- **[A8] Brand CSS quebra sob teleport** — DssDialog, DssBottomSheet, DssPopupEdit usam seletores `[data-brand] .dss-*` que exigem o atributo em `<body>`/`<html>`; hoje `data-brand` é aplicado em divs internas (Storybook decorator, wrappers de página). Acento de brand silenciosamente não se aplica nos overlays. Normatizar `data-brand` em `document.body` + ajustar decorator do Storybook.
- **[A5] NC-A5-01 / GAP-03 (em aberto desde 17/04)** — 7 componentes de layout carregam CSS via `@import` no `<style>` do SFC **e** via `@forward` no index global → dupla carga e risco de divergência de cascata dev × prod. Exige decisão única de governança.

### Build/Infra (médio)
- **[A2] `dist/` versionado e stale** (04/06; 44 KB vs 887 KB do build real) e **nenhum `.d.ts` gerado** — contradiz "TypeScript ready".
- **[A2] `type-check` do core é stub** (`echo`) e core sem `tsconfig.json` — falso positivo permanente.
- **[A2+A12] Lockfiles concorrentes** (`bun.lock` desatualizado + `package-lock.json` na raiz; `pnpm-lock.yaml` no mcp; lock próprio no sandbox) — instalações não reprodutíveis.
- **[A12] MCP build stale** (build 02/06 < src 05/06) e **`validate_visual_contract` simulada e quebrada** (bug de cwd em `validateVisualContract.ts:22`; resposta é placeholder declarativo — NÃO usar como critério de aceite até a Fase 4).
- **[A12] `QUICK_START.md` obsoleto** — referencia estrutura/comandos inexistentes; dev novo falha em todos os passos.
- **[A2+A12] `main.js` do sandbox** importa `index.scss` por caminho relativo inter-pacote (viola Regra de Ouro do PATH_MAP) — criar alias `@core`.
- **[A1] Sass compila com 7 deprecation warnings** (consequência do item bloqueante 3).

### Governança Documental
- **[A11-07 — ALTA]** Seção 5.4 do Contrato Visual declara "Figma supremo" citando o Princípio #12, que afirma o **oposto** (CSS como fonte de verdade) — dois documentos Nível 1 em contradição direta. Reescrever a Seção 5.4.
- **[A11-08]** Production Readiness Laudo emitido ANTES da Onda 8 e nunca atualizado — exige adendo/v2 registrando a Onda 8 concluída.
- **[A11-01/02/03]** DssBottomSheet selado mas fora do CERTIFIED_COMPONENTS.md (resolve o "67/68" vs "68/68" do CLAUDE.md); DssCadrisCard com `status: sealed` sem selo físico.
- **[A11-04]** `DssPopupProxy` duplicado integralmente em `base/` e `composed/` com metas divergentes — linha dupla no contrato visual; remover a cópia de `composed/`.
- **[A11-05]** 3 placeholders "Selado hoje" congelados (ItemLabel, Step, Drawer).
- **[A11-06]** `visualProperties[].token` ⊄ catálogo `tokens` nos metas; `computedTokens` ad-hoc em 7 arquivos; `visualProperties` ausente em 15 composed/stress-test (A7: 5 forms; A8: 3 overlays; A9: 2 dados).
- **[A5 DOC-A5-01]** `dss.meta.json.status` divergente de CERTIFIED_COMPONENTS.md em 7 componentes de layout (Drawer "pending-audit" mas selado 20/04; PageSticky/PageScroller "in-progress" mas selados; sealDate ausente em Header/Footer/Toolbar).
- **READMEs abaixo do piso mínimo** (slots/events/tokens não declarados, ainda que existam nos `*_API.md`): ~13 componentes em A4, A5, A6, A9.
- **previewGroup possivelmente residual** (Toolbar/ToolbarTitle = "cartoes", Bar = "banners"); **DssDrawer preview aberto** (`modelValue: true` — decisão de governança); **DssTable preview sem rows demo**; **DssUploader defaultPreview mínimo**.
- **Hardcodes menores com candidato a token**: `outline-offset: 2px` (sistêmico, ver §4.E); DssFooter sombra upward `rgba(0,0,0,0.30)` (EXC-05 pendente desde o selo); DssDialog `1px` → `var(--dss-border-width-thin)`; DssChip `outline-offset: 1px`; DssTable/DssTree `outline-offset: -2px`.
- **[A10] DssParallax** sem nota de performance (scroll listener) no README.
- **[A2/A10] Barrel central** não exporta `DssTestPageComplexity`, `DssCadrisCard`, `DssDataCard` (intencional para stress-test — declarar a exclusão; endurecer `exports` map contra deep-import).
- **Resíduos de higiene**: `DssInput.vue.legacy`, artefatos `.module.css`/`.css.map` commitados (Button, Toggle, Radio, Input).

---

## 4. PADRÃO RECORRENTE (DÉBITO SISTÊMICO)

Cinco padrões aparecem em 3+ componentes e devem ser corrigidos **em lote**, não caso a caso:

### A. Barrel export incompleto (≈20 componentes) — SISTÊMICO/BLOQUEANTE
`index.js` não exporta types e/ou composables. Afetados: 7 em A3, 2 em A4 (Slider/Range), 3 em A5 (Layout/Header/Drawer), 5 composed em A7, 1 em A8 (PopupEdit), 3 em A9 (Table/Tree/Card). Causa raiz comum: `export type` é sintaxe TS inválida em `.js`. **Correção em lote:** migrar todos os barrels para `index.ts` (padrão já validado em DssOptionGroup/DssFile/Timeline) ou usar `export * from './types/...'`. Resolve simultaneamente o item bloqueante do HEAD (A2 #3) e padroniza a divergência `index.ts` vs `index.js` apontada por A4/A5/A6/A10.

### B. `@import` residual (24+ componentes/arquivos) — SISTÊMICO/BLOQUEANTE
17 SFCs com `@import` no `<style>` (A2), 7 deles componentes de layout com **dupla carga** de CSS (A5/GAP-03), + 7 arquivos de tokens/themes (A1). **Correção em lote:** uma onda única "migração @use + decisão de estratégia de carga de CSS" (SFC-local OU index global — nunca ambos).

### C. Ausência de testes de teclado (~17 componentes interativos) — SISTÊMICO
Padrão idêntico em A3, A4, A6, A7, A8: interação delegada ao Quasar, zero regressão. Único modelo positivo: `DssChip.test.js:318-338`. **Correção em lote:** suíte mínima padronizada (Enter/Space/Arrows/ESC/Tab) replicada do modelo DssChip.

### D. `visualProperties` ausente nos meta.json de composed (15 arquivos) — SISTÊMICO
Todos os 13 composed + 2 stress-test (A7, A8, A9, A11 convergem). **Correção em lote:** estender a automação `sync-css-to-meta`/`sync:visual-contract` aos composed + adotar a invariante vp ⊆ tokens proposta por A11.

### E. `outline-offset: 2px` hardcoded (22 arquivos no codebase) — SISTÊMICO
Detectado por A7 (5 comps), A8 (3), A9 (2), A3 (variações 1px/-2px). **Correção em lote:** criar token global `--dss-focus-ring-offset` e substituir nas 22 ocorrências — não tratar como falha individual.

### F. Metadados de selo dessincronizados (10+ componentes) — SISTÊMICO
`dss.meta.json.status`/`sealDate` × CERTIFIED_COMPONENTS.md (A5: 7 comps; A11: BottomSheet, CadrisCard, contagem 67/68 vs 68/68). **Correção em lote:** script de reconciliação meta ↔ índice de selos, idealmente com validação no pre-commit hook.

---

## 5. VEREDICTO FINAL

# ❌ BLOQUEADO — corrigir itens críticos antes de migrar ao GitLab

**Justificativa:** O estado commitado do repositório **não compila** (`core:build` falha por imports quebrados no DssUploader e `export type` em barrels `.js`) e, mesmo após o build passar, o artefato `dist/style.css` sai **sem nenhum token** — qualquer consumidor de produção receberia um design system literalmente sem estilos. Somam-se falhas reais de contrato em componentes centrais: o DssButton entrega versão sem ARIA pelo wrapper oficial, o DssTable tem o caminho documentado de ações por linha quebrado, e o docs-portal renderiza com paleta divergente do core (13 tokens). Nenhum desses 12 bloqueantes é especulativo — todos têm evidência física de arquivo/linha e a maioria tem correção pequena e bem mapeada (estimativa: itens 1, 2, 5, 7, 9, 10 e 11 são correções de poucas linhas; 3, 4, 6, 8 e 12 são tarefas de meio dia cada). Recomenda-se uma **onda de correção curta (P0: itens 1–2 e 5–6; P1: demais)** seguida de reauditoria dirigida apenas aos itens da Seção 2 — após isso a migração ao GitLab fica desbloqueada, com os 69 alertas da Seção 3 tratáveis pós-migração.

---

*Consolidação gerada a partir dos 12 relatórios setoriais A1–A12. Toda não-conformidade citada possui evidência reproduzível (arquivo + linha) no relatório de origem.*
