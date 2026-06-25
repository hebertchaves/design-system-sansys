# HANDOFF — Zerar o backlog de `type-check` (vue-tsc) do core

> Documento de passagem de contexto para iniciar a tarefa em um chat novo.
> Gerado em 2026-06-25 a partir do estado em `import/dss-v2.4.0` @ `e3774ac`.

---

## 🎯 Missão

Zerar os **66 erros pré-existentes** de `npm run type-check` (vue-tsc) no pacote
`@sansys/design-system` (`packages/core`), em 29 arquivos `.ts.vue`/composables/wrappers.
Ao chegar a **0**, ligar `type-check` como **gate** (pre-commit + CI) para impedir
regressão — hoje ele NÃO é gate.

## 🧭 Contexto crítico (ler antes de tocar em código)

- **`type-check` NÃO é gate hoje.** O build da lib (`npm run core:build`) usa **Vite/esbuild
  transpile-only** — não faz type-check. Por isso 66 erros convivem com builds verdes.
  `vue-tsc --noEmit -p tsconfig.json` só roda manual (`npm run type-check` em `packages/core`).
- Esses 66 erros são **pré-existentes** — não foram introduzidos pela onda de propagação/barrels
  (jun/2026). A migração de barrels `.js→.ts` (commit `5ae9a81`) só **expôs** 6 erros no
  agregador `components/index.ts`, que **já foram corrigidos** (commit `e3774ac`). Saldo da
  migração: 0 erro novo.
- `tsconfig` do core: `allowJs:false`, `verbatimModuleSyntax:false`, `moduleResolution:"bundler"`,
  `noEmit:true`, `types:["vite/client"]`. Há `packages/core/env.d.ts` com `/// <reference types="vite/client" />`.

## ⚠️ Restrições normativas (CLAUDE.md — Nível 1, vinculante)

- **NÃO instalar `@types/node`** para resolver os erros de `process` (TS2591). O idiom do
  próprio código é **`import.meta.env?.DEV`** (já usado em DssImg/Parallax/Video; tipado via
  `vite/client`). Foi assim que `components/index.ts` e o agregador foram corrigidos. Manter padrão.
- Token First, `@import` proibido (usar `@use`/`@forward`), arquitetura 4 camadas — mas esta
  tarefa é **só TypeScript** (não deve alterar SCSS, visual, nem `meta.json`).
- **Não alterar comportamento em runtime.** São correções de **tipo**: assinar parâmetros,
  estreitar/alargar tipos, corrigir imports de macro. Se um fix exigir mudança de lógica,
  PARAR e perguntar.
- Não tocar nos gates/scripts da onda de propagação (já fechados e pushados).

## 📊 Inventário (66 erros) — por código de erro (causa raiz)

| Código | Qtd | Causa típica | Estratégia |
|---|---:|---|---|
| TS2322 | 29 | `Type X is not assignable to Y` (props p/ Q* do Quasar, atributos ARIA `Booleanish`) | estreitar tipo na origem ou castar p/ o tipo do Quasar |
| TS2769 | 11 | `No overload matches this call` (emits/QTable) | alinhar assinatura de emit/payload ao tipo Quasar |
| TS7006 | 5 | parâmetro com `any` implícito (callbacks `files`, `app`) | tipar o parâmetro |
| TS2440 | 5 | **import conflita com macro** (`defineProps`/`defineOptions` importados) | remover o import — são macros globais do compilador |
| TS2345 | 5 | argumento de tipo errado (`string|null` → `string`) | guarda de null / estreitamento |
| TS18046 | 4 | `'emit' is of type 'unknown'` (composable recebe emit sem tipo) | tipar o param `emit` do composable |
| TS2591 | 2 | `Cannot find name 'process'` | **trocar por `import.meta.env?.DEV`** (NÃO @types/node) |
| TS2551 | 2 | `scrollTo/scrollBy` não existe em `QScrollArea` | usar API correta do QScrollArea / cast do ref |
| TS2528 | 2 | **múltiplos default exports** no wrapper `.vue` | corrigir o wrapper (ver nota abaixo) |
| TS7053 | 1 | index com `string` em tipo de Slots | assinar index signature ou estreitar a chave |

## 📁 Inventário — por arquivo (qtd de erros)

```
6  components/composed/DssForm/1-structure/DssForm.ts.vue
5  components/base/DssTree/1-structure/DssTree.ts.vue
4  components/base/DssInnerLoading/1-structure/DssInnerLoading.ts.vue   (TS2440: imports de macro)
4  components/base/DssFile/composables/useFileActions.ts                (TS18046: emit unknown)
4  components/base/DssFile/1-structure/DssFile.ts.vue                   (TS7006: files any)
3  components/composed/DssTestPageComplexity/1-structure/...ts.vue      (fixture — ver nota)
3  components/composed/DssTable/1-structure/DssTable.ts.vue
3  components/composed/DssPopupEdit/1-structure/DssPopupEdit.ts.vue
3  components/base/DssTextarea/1-structure/DssTextarea.ts.vue
3  components/base/DssScrollArea/1-structure/DssScrollArea.ts.vue       (TS2551: scrollTo/By)
3  components/base/DssBtnDropdown/1-structure/DssBtnDropdown.ts.vue
2  components/composed/DssUploader/1-structure/DssUploader.ts.vue
2  components/composed/DssDatePicker/1-structure/DssDatePicker.ts.vue
2  components/base/DssSlider/1-structure/DssSlider.ts.vue              (TS2591: process)
2  components/base/DssSkeleton/1-structure/DssSkeleton.ts.vue
2  components/base/DssSelect/composables/useSelectActions.ts
2  components/base/DssSelect/1-structure/DssSelect.ts.vue
2  components/base/DssFabAction/1-structure/DssFabAction.ts.vue
1  cada: DssTimePicker, DssColorPicker, DssVideo, DssToggle.vue, DssStep,
       DssSpace, DssRange (process), DssPopupProxy, DssOptionGroup,
       useInputClasses.ts, DssCheckbox.vue
```

## ✅ Quick wins (comece por aqui — baixo risco, padrão claro)

1. **TS2591 `process` (DssRange, DssSlider):** trocar `process.env.NODE_ENV !== 'production'`
   por `import.meta.env?.DEV`. Mesmo fix já aplicado em `components/index.ts`.
2. **TS2440 imports de macro (DssInnerLoading, 5 erros):** remover `import { defineProps,
   defineOptions, ... } from 'vue'` — são macros de compilador `<script setup>`, globais.
3. **TS18046 `emit` unknown (useFileActions.ts, useSelectActions.ts):** tipar o parâmetro
   `emit` do composable (passar o tipo de Emits do componente).
4. **TS2528 múltiplos default exports (DssCheckbox.vue, DssToggle.vue):** investigar o wrapper —
   provável `export default` duplicado no `<script>`. NOTA: o Entry Point Wrapper deve ser
   re-export puro (Princípio #11); corrigir sem quebrar o contrato do wrapper.

## 🔁 Fluxo de trabalho sugerido

1. Rodar baseline: `cd packages/core && npm run type-check 2>&1 | grep -E "error TS" | tee /tmp/tc.txt; wc -l < /tmp/tc.txt` (deve dar 66).
2. Atacar **por arquivo** (não por código) p/ manter contexto do componente; começar pelos quick wins.
3. Após cada lote, re-rodar e confirmar a contagem caindo (vue-tsc não escopa por arquivo facilmente; rode o full e filtre pelo arquivo).
4. Commits pequenos por componente/grupo: `fix(types): <Componente> — zera erros de type-check (TSxxxx)`.
5. **Verificar que o build segue verde** após mudanças: `npm run core:build` (pesado, ~1m30 em WSL — rodar pontualmente, não a cada commit).
6. Ao chegar a **0**: criar gate `validate:type-check` (npm script `vue-tsc --noEmit`) e ligar no
   pre-commit (`scripts/hooks/pre-commit`) + CI. Atenção: hook em `/mnt/c` precisa shebang LF
   (`sed -i 's/\r$//'` + reinstalar via `npm run setup:hooks`).

## 🧪 Definition of Done

- [ ] `npm run type-check` em `packages/core` retorna **0 erros**.
- [ ] `npm run core:build` segue verde (ES+UMD emitidos).
- [ ] Nenhuma mudança de runtime/visual/SCSS/meta.json (só tipos).
- [ ] **NÃO** foi adicionado `@types/node` (process → `import.meta.env?.DEV`).
- [ ] Gate `type-check` ligado (pre-commit + CI) e documentado.
- [ ] Commits pushados em `origin` (GitHub) e `gitlab`.

## 🧠 Memórias relevantes (auto-memory do projeto)

- `project_propagation_pipeline.md` — estado da onda de propagação + este achado dos 66.
- `reference_qfield_anatomy_root_fontsize.md`, `project_qfield_height_token_bug.md` — anatomia QField/QInput (útil p/ DssInput/Select/Textarea/Field).
- `project_cobertura_testes.md` — CadrisCard e TestPageComplexity são **fixtures** (decidir se
  entram no escopo do type-check ou são excluídos do `tsconfig` como já são de teste).

## 📌 Decisão pendente p/ o mantenedor (resolver no novo chat)

`DssTestPageComplexity` e `DssCadrisCard` são **fixtures de stress-test** (fora da cobertura de
testes por governança). Decidir: **corrigir os tipos deles também** OU **excluí-los do
`tsconfig` do type-check** (consistente com já estarem fora do escopo de teste). Recomendação:
excluir do type-check (não são componentes de uso), reduzindo o backlog real.
