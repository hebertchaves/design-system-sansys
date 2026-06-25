# HANDOFF — Zerar o gate `validate:api-docs` (30 → 0) reconciliando props/eventos não tipados

> Prompt de execução para um agente novo. Gerado em 2026-06-25 @ `import/dss-v2.4.0` (após
> `f6b48b2`). Esta é a continuação da onda de higiene de tipos/contrato (type-check 0 + 9 bugs
> de runtime corrigidos). **Decisão de política já tomada pelo mantenedor** — só executar.

---

## 🎯 Missão

Zerar as **30 divergências** restantes de `node scripts/validate-api-docs.cjs --gate`
(eixo **props/eventos**), reconciliando cada membro **documentado mas não tipado** (`sobram`)
ou **tipado mas não documentado** (`faltam`). Ao chegar a 0, o gate de paridade de API fica
limpo para todos os 89 componentes.

**Restrição dura:** isto é tarefa de **documentação + (quando indicado) tipos**. NÃO mudar
runtime, SCSS, visual nem `meta.json`. Se um fix exigir mudar lógica/visual, **pare e pergunte**.

## ✅ Decisão de política do mantenedor (VINCULANTE)

Para props/eventos **passthrough do Quasar** (forwarded via `$attrs`) que hoje estão nas
tabelas governadas `## Props` / `## Eventos` mas não existem nas interfaces `*Props`/`*Emits`:

> **Mover** essas linhas das tabelas governadas para uma seção **não-governada**
> `## Passthrough Quasar (via $attrs)`. O **tipo continua sendo o contrato**; a doc segue
> informativa. (Opção "Seção Passthrough não-governada" — escolhida sobre "tipar tudo" e
> "remover dos docs".)

Nuances obrigatórias (triagem por membro — NÃO mover cego):

1. **Passthrough real** (`color`, `size`, `dense`, `transition-show/hide`, `max-height`,
   `ripple`, `glossy`, `push`, `flat`, `outline`, etc., e eventos `show`/`hide`/`before-show`/
   `before-hide`/`update:modelValue`): → seção `## Passthrough Quasar (via $attrs)`.
2. **Prop BLOQUEADA** (o DSS desabilita: tipicamente `dark` e `square`, governados
   globalmente via `[data-theme]` / tokens): → seção `## Props bloqueadas` (ou subseção).
   Confirme no componente se a prop é de fato bloqueada (procure menção a "bloqueada"/"dark
   global"); se for, documente como bloqueada, não como passthrough.
3. **Prop/evento DSS-projetado FALTANDO no tipo** (camelCase, claramente parte da API DSS —
   ex.: `ariaLabel`, `navigation`, `thumbnails`, `controlType` do **DssCarousel**): isto NÃO é
   passthrough. Verifique se o componente realmente usa (defineProps no `.ts.vue` / lógica):
   - Se o runtime usa mas a interface não declara → **adicionar à interface `*Props`/`*Emits`**
     (type-only; mantém type-check 0). É o fix correto.
   - Se é aspiracional/não implementado → remover da doc OU **pare e pergunte** ao mantenedor.
   - **DssCarousel é o caso mais pesado (23 membros) — trate com cuidado e, na dúvida, pergunte.**
4. **`faltam` (tipado, sem doc):** adicionar a linha/row na tabela governada correspondente
   (ex.: DssRange `tabindex` no README; DssAvatar `click` em Eventos do README; DssTable
   `noResultsLabel`/`hideBottom`/`hideHeader` + evento `row-contextmenu` no README;
   DssPopupEdit/DssBtnToggle/DssOptionGroup `modelValue` — doc como `v-model` é aceito pelo
   validador, ver abaixo).

## 🔧 Como o validador funciona (LER — explica por que "mover" resolve)

`scripts/validate-api-docs.cjs` compara a **verdade** (interfaces `*Props`/`*Emits`/`*Slots`
em `types/*.types.ts`, via parser TS) com o **derivado** (tabelas markdown na `*_API.md` e
`README.md`). Eixos e headings que ele lê:

| Eixo | Interface | Heading que ativa o parse (regex) |
|---|---|---|
| Props | `*Props` | `^props$` (case-insensitive — **exatamente** "Props") |
| Eventos | `*Emits` | `^(events?\|eventos?)$` |
| Slots | `*Slots` | `^slots?$` |

Regras de parse já implementadas (não precisa mexer no validador):
- Só conta linhas de tabela `| \`nome\` | … |` **sob um heading que casa o regex**.
  → Um heading `## Passthrough Quasar (via $attrs)` ou `## Props bloqueadas` **NÃO casa**
    `^props$` → **é ignorado**. Por isso **mover a linha p/ lá resolve a divergência**.
- Dentro da seção, subtítulo `### \`prop\` — Mapeamento de Tokens` marca **tabela de VALORES**
  daquele membro → não conta (não recoloque props nessas subseções).
- Subtítulo de **categoria em prosa** (`### Navegação`, `### Conteúdo Visual`) → a tabela
  seguinte **conta** como props. (Vários componentes agrupam props assim — ok.)
- Canonicalização: `text-color` ↔ `textColor` (kebab↔camel) e `v-model`/`v-model:x` ↔
  `modelValue`/`x`. Logo, documentar o v-model como `| \`v-model\` | … |` **casa** com a
  interface `modelValue` — não precisa renomear.

## 🔁 Workflow por componente

1. `node scripts/validate-api-docs.cjs <Comp>` (sem `--gate`, dá detalhe) — lista `sobram`/`faltam`.
2. Abra `*_API.md` e `README.md` do componente. Para cada `sobram`, triar (regra acima) e:
   - passthrough → recortar a linha da tabela sob `## Props`/`## Eventos` e colar numa seção
     nova `## Passthrough Quasar (via $attrs)` (crie uma vez por arquivo, perto do fim).
   - bloqueada → `## Props bloqueadas`.
   - DSS faltando no tipo → adicionar à interface `types/*.types.ts` (e manter na doc).
   - `faltam` → adicionar row na tabela governada.
3. `node scripts/validate-api-docs.cjs --gate <Comp>` → deve dar **0 divergências**.
4. Se mexeu em `types/*.types.ts`: `cd packages/core && npm run type-check` deve seguir **0**.
5. Commit por componente ou lote pequeno: `docs(<comp>): move passthrough Quasar p/ seção não-governada`.

## 🧱 Gates / convenções (do CLAUDE.md + pre-commit)

- O pre-commit roda `validate:api-docs --gate` nos componentes cujos `types/*.types.ts`,
  `*_API.md` ou `README.md` mudaram, e roda `type-check` se `.ts/.vue` do core mudou. Ambos
  devem passar (não use `--no-verify` aqui — diferente da onda anterior, aqui o gate é o alvo).
- Shebang/hooks em `/mnt/c`: se reinstalar hooks, `npm run setup:hooks` (LF).
- Push em `origin` (GitHub) **e** `gitlab` ao final.
- Testes unitários: `npx vitest run --project unit` a partir de `packages/core`. ⚠️ No `/mnt/c`
  (WSL2) o worker do vitest às vezes dá "Timeout waiting for worker" em arquivo único —
  ambiental, não falha de teste; a CI (Linux nativo) roda a suíte. Docs não exigem teste.

## 📋 Inventário das 30 divergências (estado em `f6b48b2`)

> `sobram` = documentado, não tipado. `faltam` = tipado, não documentado.
> Triagem sugerida entre colchetes — **confirme por membro**.

```
DssAjaxBar      Props/API: color                                   [passthrough]
DssAvatar       Props/README: shape [passthrough?]  Eventos/README faltam: click [add doc]
DssBreadcrumbsEl Props/README: ripple, exact, active-class, exact-active-class [passthrough]
DssBtnDropdown  Eventos/API: click, show, hide, before-show, before-hide [passthrough]
DssBtnGroup     Props/API: dark[bloq], color, text-color, size, dense [passthrough]
DssCard         Props/API: variant, square[bloq?], clickable, dark[bloq], brand, horizontal
                  ⚠️ variant/clickable/brand/horizontal parecem DSS — VERIFICAR no tipo
DssExpansionItem Props/API: dark[bloq], headerClass, headerStyle, switchToggleSide [passthrough]
                  Eventos/API: update:modelValue, show, hide, before-show, before-hide
DssFab          Props/API: glossy, push, flat, outline, unelevated, padding [passthrough/bloq]
                  Eventos/API: update:modelValue, click, show, hide, before-show, before-hide
DssKnob         Props/API: color, track-color, center-color, font-size [passthrough]
DssMarkupTable  Props/API: dark[bloq], dense [passthrough]
DssMenu         Props+README: dark[bloq], square[bloq], transition-show/hide, max-height/width,
                  persistent, no-focus, touch-position, no-route-dismiss, auto-close,
                  separate-close-popup [passthrough]   Eventos: update:modelValue, show, hide
DssPopupProxy   Props/API: dark[bloq], square[bloq]   Eventos/API: update:open, beforeShow,
                  show, beforeHide, hide  ⚠️ beforeShow/beforeHide camelCase — ver se são DSS
DssPullToRefresh Props/API: color, bg-color, pull-message, release-message, refresh-message [pt]
DssRange        Props/README faltam: tabindex  [add doc]
DssRating       Props/API: color, color-selected, color-half [passthrough]
DssSkeleton     Props/API: color, dark[bloq], square[bloq], animation-speed, size [passthrough]
DssStepper      Props/API: dark[bloq], color, active-color, done-color, error-color,
                  inactive-color [passthrough]
DssTabPanel     Props/API: dark[bloq]
DssTabPanels    Props/API: dark[bloq], transition-prev, transition-next [passthrough]
DssTabs         Props/API: active-color, active-bg-color, indicator-color, ripple, no-caps [pt]
DssToolbarTitle Props/README: color, active [passthrough]
DssCarousel     Props/API: animated, swipeable, vertical, infinite, autoplay, height, padding,
                  arrows, prevIcon, nextIcon, navigation, navigationPosition, navigationActiveIcon,
                  navigationIcon, thumbnails, controlType, fullscreen, keepAlive, keepAliveInclude,
                  keepAliveExclude, keepAliveMax, ariaLabel
                  ⚠️⚠️ MAIORIA parece DSS-PROJETADA faltando no tipo, NÃO passthrough.
                  VERIFICAR defineProps do .ts.vue; provável = ADICIONAR à interface. Na dúvida, PERGUNTAR.
DssColorPicker  Props/API: dark[bloq], color [passthrough]
DssDatePicker   Props/API: color, textColor, dark[bloq], square[bloq], flat, bordered [passthrough]
DssForm         Props/API: dark[bloq]
DssPopupEdit    Props/API faltam: modelValue [add doc v-model]  sobram: dark[bloq]
DssTable        Props/API: dark[bloq], color, square[bloq]
                  Props/README faltam: noResultsLabel, hideBottom, hideHeader [add doc]
                  Eventos/README faltam: row-contextmenu [add doc]
DssTimePicker   Props/API: color, textColor, dark[bloq], square[bloq], flat, bordered [passthrough]
DssUploader     Props/API: dark[bloq], hide-upload-btn  ⚠️ hide-upload-btn pode ser DSS — verificar
DssDataCard     Props/API: dark[bloq]
```

## ⚠️ Componentes que exigem VERIFICAÇÃO (não tratar como passthrough cego)

- **DssCarousel** — 23 membros, maioria DSS. Olhe `components/composed/DssCarousel/1-structure/
  *.ts.vue` (defineProps) e `types/*.types.ts`. Quase certo: completar a interface `*Props`.
- **DssCard** — `variant/clickable/brand/horizontal` soam DSS; `dark/square` bloqueadas. Triar.
- **DssUploader** — `hide-upload-btn` pode ser feature DSS; `dark` bloqueada.
- **DssPopupProxy** — `beforeShow/beforeHide` (camelCase) podem ser eventos DSS renomeados.

## 📌 Definition of Done

- [ ] `node scripts/validate-api-docs.cjs --gate` → **0 divergências** (todos os 89).
- [ ] Membros passthrough movidos p/ `## Passthrough Quasar (via $attrs)`; bloqueados p/
      `## Props bloqueadas`; DSS-faltantes adicionados à interface; `faltam` documentados.
- [ ] `type-check` segue 0 (se mexeu em tipos). Sem mudança de runtime/visual/SCSS/meta.
- [ ] Commits pushados em `origin` + `gitlab`.

## 🧠 Contexto / referências

- `docs/governance/HANDOFF_RUNTIME_CONTRACT_BUGS.md` — onda anterior (9 bugs runtime, 9/9 ✅).
- `docs/governance/HANDOFF_TYPECHECK_BACKLOG.md` — origem (type-check 66→0, gate ligado).
- Validador melhorado neste contexto (commit `639529b`/`f6b48b2`): ignora tabelas de valores,
  canoniza `v-model`, aceita subtítulo com sufixo. NÃO precisa mexer mais nele para esta tarefa
  (mover linhas p/ heading não-`^props$` já resolve).
- Memória do projeto: `project_typecheck_latent_contract_bugs`, `reference_api_docs_validator`.
```
