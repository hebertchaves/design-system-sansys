# HANDOFF — Escalar a emissão de `dss.contract.json` (frente "a")

> Prompt de execução para um **chat novo**. Gerado em 2026-07-02 @ `import/dss-v2.4.0` (após `6a4baa6`).
> Continuação da cadeia de fonte única: o schema, o emissor e os gates já existem e estão provados
> em 2 componentes (DssInput, DssSelect). Falta **escalar** para os ~74 restantes.
>
> **Leia primeiro** (contexto durável): `docs/governance/DSS_BLUEPRINT_CADEIA_FONTE_UNICA.md`
> (a cadeia, D1–D4, §4.2 tiers, passo 2). Este handoff é o runbook operacional.

---

## 🎯 Missão

Para cada componente base **sem** `dss.contract.json`, backfillar o `dss.meta.json` com o mínimo
para derivar um contrato **schema-válido com a11y verificada**, então emitir + validar. Ao final,
o gate `contracts:gate` (já ligado no pre-commit + CI) passa a cobrir todos.

**Estado inicial:** 2/76 com contrato (DssInput, DssSelect). Faltam **74**.

## 🔒 Regra dura — NÃO paralelizar em agentes concorrentes

- **NÃO** rodar múltiplos agentes escrevendo/commitando na MESMA árvore git (colisão de index —
  aconteceu nesta onda com o agente de api-docs). O pre-commit re-emite TODOS os contratos e
  regenera arquivos compartilhados (`catalog.json`, `DSS_REFERENCIA_VISUAL_ANALISE.md`,
  `docs-portal/src/index.css`) → commits concorrentes colidem **mesmo em worktrees separadas**.
- **Modelo aprovado:** processar **um GRUPO por vez, em sequência**, na thread principal.
  Subagentes só para investigação **read-only** (ex.: levantar padrões a11y de um grupo).

## 📐 Definition of Done de derivação (o que backfillar no `meta`)

Um componente emite contrato completo quando o `dss.meta.json` tem:
1. **`classification`** — `"Action"` | `"Compact"` | `"Visual"` (conforme CLAUDE.md §9 / natureza do componente).
2. **`tagline`** — UMA frase editorial curta (≤120 chars) "o que é o componente". Não copiar do Quasar.
3. **bloco `a11y`** — `{ aria:{role,states[]}, keyboard:[{key,action}], wcag:[...] }`, onde cada
   `wcag[]` tem `{criterion, level, implementation, verifiedBy}` e **verifiedBy ∈ {css, aria, test}**:
   - `css` + `contrast:{fg,bg}` → o `wcag-kit` calcula e **precisa passar** (senão vira gap bloqueante).
   - `css` + `cssRule:{selectorIncludes,property}` → regra precisa existir no CSS compilado (ex.: focus ring).
   - `aria` → o componente precisa ter a prop/atributo aria correspondente.
   - `test` → precisa existir `Dss<Nome>.test.js`.

⚠️ **Âncora tem que ser VERDADEIRA.** Não escrever claim que não passa — o gate reprova. Verificar antes:
```
node --input-type=module -e 'import{checkContrast,hasCssRule}from"./scripts/wcag-kit.mjs";
  console.log(checkContrast("--dss-text-primary","--dss-gray-50",{}));'
```

## 🔧 Comandos

```
node scripts/emit-contract.mjs <Dss...>        # dry-run: valida + relatório de gaps (não grava)
node scripts/emit-contract.mjs <Dss...> --write # grava dss.contract.json no dir do componente
node scripts/emit-contract.mjs --all --strict   # GATE: exit 1 se algum inválido/âncora reprovada
npm run contracts:gate                          # idem, via npm
```
Fluxo por componente: `--write` → conferir "0 gaps · schema ✅" → seguir.
Fluxo por grupo: ao fim, `node scripts/emit-contract.mjs --all --strict` deve sair 0.

## 🗂️ Grupos (processar em sequência; ordem sugerida do mais templatável ao mais heterogêneo)

Sugestão: começar por **Form/Input** e **Feedback/Status** (a11y mais templatável e alto valor),
depois Navigation/Overlay (têm overlay teleportado — bom p/ o Preview Frame), depois Data/Layout,
por fim "Outros" (heterogêneo, tratar caso a caso).

- **Form/Input (23):** DssBadge, DssBtnDropdown, DssBtnGroup, DssBtnToggle, DssButton, DssCheckbox,
  DssChip, DssField, DssFile, DssIcon, DssKnob, DssOptionGroup, DssRadio, DssRange, DssRouteTab,
  DssSeparator, DssSlider, DssSpace, DssStep, DssTab, DssTextarea, DssToggle, DssTooltip
- **Feedback/Status (1):** DssSpinner
- **Navigation (9):** DssBreadcrumbs, DssDrawer, DssMarkupTable, DssMenu, DssPagination, DssStepper,
  DssTabPanel, DssTabPanels, DssTabs
- **Overlay (1):** DssInnerLoading
- **Data Display (3):** DssBreadcrumbsEl, DssItem, DssItemLabel
- **Layout (10):** DssCard, DssFooter, DssHeader, DssItemSection, DssLayout, DssList, DssPage,
  DssPageContainer, DssToolbar, DssToolbarTitle
- **Outros (27):** DssAjaxBar, DssAvatar, DssBanner, DssBar, DssCircularProgress, DssExpansionItem,
  DssFab, DssFabAction, DssImg, DssInfiniteScroll, DssLinearProgress, DssPageScroller, DssPageSticky,
  DssParallax, DssPopupProxy, DssPullToRefresh, DssRating, DssResponsive, DssScrollArea, DssSkeleton,
  DssSlideItem, DssSplitter, DssTimeline, DssTimelineEntry, DssTree, DssVideo, DssVirtualScroll

> A "category" do meta é grosseira — reclassificar um componente ao processá-lo se a família estiver
> errada (ex.: DssBadge/DssChip são mais Feedback/Compact que Form). Usar bom senso.

## ⚠️ Armadilhas conhecidas

- **Componentes NÃO-interativos** (DssSkeleton, DssImg, DssSeparator, DssSpace, DssLinearProgress…):
  `classification: "Visual"`; a11y mínima (talvez sem `wcag` de contraste — role/aria conforme o caso).
  O schema exige `a11y` com `wcag` minItems:1 → usar um critério real aplicável (ex.: 1.4.11 non-text,
  ou 4.1.2). NÃO inventar contraste onde não há texto.
- **Fixtures fora de escopo:** DssCadrisCard e DssTestPageComplexity NÃO recebem contrato (decisão de
  governança — são páginas de teste). Não estão na lista acima.
- **displayName com siglas:** o parser faz split camelCase; se sair errado (ex.: DssSPCReport →
  "S P C Report"), adicionar `"displayName"` explícito no meta.
- **status driftado:** o emissor deriva `status` do **selo físico** (sealed) ou normaliza meta.status
  (sealed/conformant/resolvida/approved/review/pendente). Não editar status à mão por isso.
- **Hook em /mnt/c precisa LF:** se editar `scripts/hooks/pre-commit`, reinstalar com
  `tr -d '\r' < scripts/hooks/pre-commit > .git/hooks/pre-commit`. (Só relevante se mexer no hook.)
- **CI real = GitLab** (`.gitlab-ci.yml`), não GitHub Actions.
- **Não tocar** `globals.scss`/tokens de cor: a frente (c1) de contraste está **aguardando decisão da
  equipe** (ver `docs/governance/` memória). c0 (reconciliação da rampa) já foi feito.

## 📋 Relatório por grupo (salvar em `docs/governance/relatorios/CONTRATOS_<GRUPO>.md`)

Ao fechar cada grupo, gravar um relatório com:
1. **Feito:** componentes emitidos (contrato schema-válido, 0 gaps, a11y N/N verificados).
2. **Não feito / adiado:** componentes pulados e o porquê (ex.: sem test.js → âncora `test` impossível).
3. **Precisa de atenção:** claims a11y frágeis, `classification` ambígua, tagline provisória.
4. **Precisa de ajuste extra (fora do escopo deste handoff):** bugs de componente descobertos
   (ex.: contraste real reprovando = dívida do item c; prop aria ausente; focus ring inexistente).
5. **Placar:** X/Y do grupo com contrato; `contracts:gate` exit 0? (sim/não).

## ✅ Critério de pronto (missão)

`node scripts/emit-contract.mjs --all --strict` → exit 0 com **76/76** componentes base
(74 novos + 2 existentes), cada um schema-válido e com a11y verificada. Relatórios de todos os grupos
salvos. Nenhum valor de token/visual/runtime alterado (só `meta.json` + `dss.contract.json` gerado).

## 🔗 Referências
- `docs/governance/DSS_BLUEPRINT_CADEIA_FONTE_UNICA.md` — a cadeia + tiers (D4/§4.2).
- `docs/governance/dss.contract.schema.json` — o schema (o que é válido).
- `scripts/emit-contract.mjs` / `extract-css-states.mjs` / `wcag-kit.mjs` — o toolchain.
- DssInput e DssSelect — os 2 exemplos-ouro já emitidos (copiar o padrão do bloco `a11y` do meta).
