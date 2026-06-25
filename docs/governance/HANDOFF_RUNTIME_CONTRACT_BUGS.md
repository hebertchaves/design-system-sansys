# HANDOFF — Bugs de contrato runtime (wrapper DSS ↔ Quasar)

> Documento de passagem de contexto. Gerado em 2026-06-25 a partir do estado em
> `import/dss-v2.4.0` @ `9070e60`, logo após zerar o backlog de type-check
> (66 → 0, ver `docs/governance/HANDOFF_TYPECHECK_BACKLOG.md`).

---

## ✅ STATUS (atualizado 2026-06-25) — TODOS OS 9 RESOLVIDOS

**9 de 9 corrigidos** (commits `6f7d762`, `a38e191`, `b6cd1d2` + FabAction). type-check
segue 0; **todos** os casts type-only removidos; types/API.md/README/test atualizados.

| # | Bug | Status |
|---|---|---|
| 1 | DssScrollArea scrollTo/scrollBy (lança) | ✅ remapeado p/ setScrollPosition |
| 2 | DssScrollArea ScrollPayload fictício | ✅ mapeado p/ `{ position }` (sem vazar Quasar) |
| 4 | DssDatePicker range-start/end | ✅ tipado c/ forma real do QDate |
| 5 | DssForm validationError + reset | ✅ alinhado a `(ref: Component)` / `() => void` |
| 6 | DssTree after-show/hide | ✅ sem payload (`() => void`) |
| 7 | DssFile add/remove | ✅ removidos (eventos mortos) |
| 8 | DssColorPicker formatModel | ✅ estreitado aos 4 formatos do QColor |
| 9 | DssUploader headers Record | ✅ convertido no wrapper (`toHeaderItems`) |
| **3** | **DssFabAction externalLabel** | ✅ **Opção B — mapeado ao nativo do QFabAction** |

### ✅ #3 DssFabAction — resolvido via Opção B

A investigação revelou que `externalLabel` estava **morto em todas as camadas** (texto
ia p/ o `:external-label` boolean → QFabAction renderizava o `label` nativo vazio; classes
`--has-external-label`/`--label-*` sem nenhuma regra SCSS; QFabAction só tem 1 prop de texto).

**Decisão do mantenedor: Opção B** (mapear ao nativo). Implementado:
- `:label="externalLabel || label"` + `:external-label="!!externalLabel"` — o texto externo
  passa a renderizar de fato (nativo do QFabAction), na `labelPosition`.
- `externalLabel` tem **precedência** sobre `label` (QFabAction mostra um texto por vez).
- Sem SCSS novo (o QFabAction renderiza o label externo). Cast removido.

Opção A (DSS renderizar dois textos coexistindo) foi descartada: QFabAction não suporta
dois textos e não há requisito de UX para isso num FabAction secundário.

---

## 🎯 Missão

Corrigir os **bugs de contrato em runtime** descobertos durante a tarefa de
type-check. Esses bugs são **pré-existentes** — acumularam porque `type-check`
**nunca foi gate** (agora é). A tarefa de type-check era **só de tipos**, então os
casts aplicados **preservam o runtime exato** e apenas **silenciam o sinal de tipo**.
Esta tarefa é o oposto: **corrigir o runtime** para que o comportamento case com o
contrato declarado (ou ajustar o contrato declarado para casar com o runtime real).

⚠️ **Ao contrário da tarefa de type-check, AQUI mudar runtime/lógica é o objetivo.**
Cada correção provavelmente toca `meta.json` / `*_API.md` / `*.types.ts` (o contrato
público) e/ou a implementação `.ts.vue`. Seguir o gate documental do CLAUDE.md.

## 🧭 Contexto crítico

- A causa raiz é **drift**: vários wrappers compostos/avançados declaram assinaturas
  (props/emits/expose) **aspiracionais** que não correspondem ao que o Quasar
  realmente emite/aceita. Como `vue-tsc` não rodava como gate, ninguém percebeu.
- `type-check` agora é **GATE bloqueante** (pre-commit #7 + CI GitLab). Qualquer
  correção aqui que mude tipos será validada automaticamente.
- Todos os casts aplicados na tarefa anterior estão **marcados ou rastreáveis** —
  ao corrigir o runtime, **remover o cast** correspondente (o type-check deve
  continuar 0 sem ele).

---

## 🔴 BLOQUEANTE — quebra em runtime (corrigir primeiro)

### 1. DssScrollArea — `scrollTo` / `scrollBy` chamam método inexistente
**Arquivo:** `packages/core/components/base/DssScrollArea/1-structure/DssScrollArea.ts.vue`
(expose, ~linhas 110–127, marcados com `// FIXME(runtime)`)

- O `defineExpose` publica `scrollTo(offset, duration?, axis?)` e
  `scrollBy(offset, duration?, axis?)`, que internamente chamam
  `scrollAreaRef.value?.scrollTo(...)` / `.scrollBy(...)`.
- **QScrollArea NÃO possui esses métodos.** Só expõe `setScrollPosition(axis, offset, duration?)`
  e `setScrollPercentage(axis, offset, duration?)` (confirmado em `quasar/dist/types/index.d.ts`).
- **Efeito:** chamar `scrollTo()`/`scrollBy()` de um consumidor lança
  `TypeError: ...scrollTo is not a function`.
- **Cast atual (a remover):** `(scrollAreaRef.value as any)?.scrollTo(...)`.
- **Fix sugerido:** remapear para `setScrollPosition`. Atenção à **ordem dos args**
  (Quasar é `axis`-first: `setScrollPosition('vertical', offset, duration)`). `scrollBy`
  exige ler a posição atual (`getScrollPosition()`) e somar o delta. Decidir se a API
  pública DSS mantém `offset`-first (e adapta internamente) ou adota a assinatura Quasar.

### 2. DssScrollArea — `ScrollPayload` é fictício
**Arquivo:** `packages/core/components/base/DssScrollArea/types/scrollarea.types.ts` (linha ~3)

- `ScrollPayload` declara `{ position, direction?, delta?, inflectionPoint?, overflow? }`.
- O `@scroll` do QScrollArea passa **outra forma**: `{ ref, verticalPosition,
  verticalPercentage, verticalSize, horizontalPosition, ... }`.
- **Efeito:** o consumidor que ouve o `@scroll` do DssScrollArea recebe o objeto do
  Quasar tipado como `ScrollPayload` → `payload.position` é `undefined` em runtime.
- **Cast atual (a remover):** binding `@scroll="(e: unknown) => onScroll(e as ScrollPayload)"`.
- **Fix sugerido:** redefinir `ScrollPayload` para espelhar o payload real do QScrollArea
  **ou** mapear explicitamente no `onScroll` (ex.: `{ position: { top: e.verticalPosition,
  left: e.horizontalPosition } }`). Atualizar `*_API.md` / `meta.json`.

---

## 🟠 SEMÂNTICO — valor errado, não lança

### 3. DssFabAction — `externalLabel: string` ligado a prop boolean
**Arquivo:** `packages/core/components/base/DssFabAction/1-structure/DssFabAction.ts.vue` (~linha 38)
e `types/*.types.ts` (`externalLabel?: string`, doc com `@example 'Nova tarefa'`).

- `:external-label="externalLabel"` — o `external-label` do QFabAction é **boolean**
  (mostra/oculta o label fora do botão). A string sempre vira `truthy`; o texto exibido
  vem de `label`, não de `externalLabel`.
- **Cast atual (a remover):** `(externalLabel as unknown as boolean)`.
- **Decisão necessária:** `externalLabel` deve ser **boolean** (toggle) e o texto vir de
  `label`? OU manter o texto e bindar `:label="externalLabel"` + `:external-label="true"`?
  Definir a intenção e ajustar runtime + contrato.

### 4. DssDatePicker — emits `range-start` / `range-end` declarados `string`, QDate passa objeto
**Arquivo:** `packages/core/components/composed/DssDatePicker/1-structure/DssDatePicker.ts.vue` (~67–68)
e `types/*.types.ts`.

- QDate passa `{ year, month, day }` (range-start) e `{ from, to }` (range-end); o DSS
  declara ambos como `string`.
- **Cast atual (a remover):** `($event as unknown as string)`.
- **Fix:** tipar os emits com a forma real do QDate (ou converter para string no handler,
  se for a intenção de API).

### 5. DssForm — `validationError(el, tabIndex, index)` mas QForm passa só `(ref)`
**Arquivo:** `packages/core/components/composed/DssForm/1-structure/DssForm.ts.vue` (~linha 11)

- O emit DSS declara 3 args; o `validation-error` do QForm fornece **apenas 1**
  (`ref: Component`). `tabIndex`/`index` são sempre `undefined`; `el` é `Component`, não `Element`.
- **Cast atual (a remover):** `(el: any, tabIndex?: number, index?: number) => emit('validationError', el as Element, tabIndex as number, index as number)`.
- **Fix:** alinhar o emit DSS ao que o QForm fornece (1 arg) — ou derivar tabIndex/index
  do ref se possível.

### 6. DssTree — `after-show` / `after-hide` declarados `(node: DssTreeNode)`, QTree não passa payload
**Arquivo:** `packages/core/components/base/DssTree/1-structure/DssTree.ts.vue` (~27–28)

- `onAfterShow`/`onAfterHide` do QTree são `() => void` (sem payload). O DSS declara
  `(node: DssTreeNode)` → node sempre `undefined`.
- **Cast atual (a remover):** `($event as unknown as DssTreeNode)`.
- **Fix:** remover o param dos emits DSS (alinhar a `() => void`).

### 7. DssFile — `@add` / `@remove` ligados ao `<q-file>`, que não tem esses eventos
**Arquivo:** `packages/core/components/base/DssFile/1-structure/DssFile.ts.vue` (~26–27)

- QFile só emite `@update:model-value` e `@rejected` (add/remove são do QUploader). Os
  handlers `@add`/`@remove` no `<q-file>` **nunca disparam**.
- **Cast atual (a remover):** anotação de tipo no param do handler morto.
- **Fix:** remover os emits `add`/`remove` do contrato do DssFile (ou implementar a
  detecção via `@update:model-value` comparando o array antes/depois).

### 8. DssColorPicker — `formatModel` expõe formatos que o QColor não suporta
**Arquivo:** `packages/core/components/composed/DssColorPicker/types/color-picker.types.ts` (~linha 6)

- DSS declara `'rgb'|'hex'|'hexa'|'rgba'|'hsl'|'hsla'|'hsv'|'hsva'`; QColor só aceita
  `'auto'|'rgb'|'hex'|'hexa'|'rgba'`. `hsl/hsla/hsv/hsva` não renderizam.
- **Cast atual (a remover):** `(props.formatModel as QColorProps['formatModel'])`.
- **Fix:** estreitar o tipo DSS para os 5 formatos suportados (atualizar `meta.json`/`API.md`).

### 9. DssUploader — `headers` aceita `Record<string,string>` que o QUploader não aceita
**Arquivo:** `packages/core/components/composed/DssUploader/1-structure/DssUploader.ts.vue` (~205)
e `types/*.types.ts`.

- DSS `headers` permite `Record<string,string>`; QUploader só aceita `{ name, value }[]`
  ou `((files) => string)`. Passar um Record quebra silenciosamente.
- **Cast atual (a remover):** `(headers as QUploaderProps['headers'])` (e `factory` por
  cascata do mesmo tipo).
- **Fix:** estreitar o tipo DSS de `headers` OU converter `Record` → `{name,value}[]` no wrapper.

---

## 🔁 Fluxo sugerido

1. Por bug: corrigir runtime/contrato → **remover o cast/`as unknown as`/FIXME**
   correspondente → `cd packages/core && npm run type-check` deve seguir **0**.
2. Atualizar `meta.json` + `*_API.md` + `*.types.ts` quando o contrato público mudar
   (gate documental — CLAUDE.md). Rodar `npm run validate:api-docs:gate <Comp>`.
3. Garantir/atualizar testes (`*.test.js`) cobrindo o comportamento corrigido
   (especialmente DssScrollArea `scrollTo`/`scrollBy`, que hoje lançam).
4. `npm run core:build` verde + suíte unit verde.

## 🧪 Definition of Done

- [ ] Os 9 bugs corrigidos no runtime (ou contrato ajustado p/ casar com runtime).
- [ ] Todos os casts type-only listados acima **removidos**; `type-check` segue **0**.
- [ ] `meta.json` / `*_API.md` / `*.types.ts` atualizados onde o contrato mudou.
- [ ] DssScrollArea `scrollTo`/`scrollBy` deixam de lançar (teste cobrindo).
- [ ] `core:build` e suíte unit verdes; commits pushados em `origin` + `gitlab`.

## 🧠 Memória relevante

- `project_typecheck_latent_contract_bugs` — inventário-resumo destes bugs.
- `HANDOFF_TYPECHECK_BACKLOG.md` — origem (tarefa type-only que os revelou).
