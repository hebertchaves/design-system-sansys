# Onda P0 — Relatório de Execução das Correções Bloqueantes

**Executado em:** 11 de Junho de 2026
**Insumo:** `PROMPT_DIRECIONADOR_ONDA_P0_CORRECOES_BLOQUEANTES.md` (T0–T7)
**Baseline:** `AUDITORIA_FINAL_CONSOLIDADA_JUNHO_2026.md` — veredicto ❌ BLOQUEADO, 16 bloqueantes
**Escopo deste relatório:** execução e evidências. O parecer de "pronto para migração" é papel da **reauditoria dirigida** (Seção 2 do consolidado), não deste documento.

---

## Sumário por Tarefa

| Tarefa | Status | Commit | Bloqueantes resolvidos (Seção 2) |
|--------|--------|--------|----------------------------------|
| T0 — Sanear HEAD | ✅ | `7ee0ceb` | #1 (parcial: imports DssUploader; barrels `export type` já estavam corrigidos e commitados antes da onda) |
| T1 — Tokens no dist | ✅ | `d674ce5` | #2 + GAP-03/NC-A5-01 (dupla carga, listado na Seção 3) |
| T2 — DssButton dual | ✅ | `aaf046f` | #5 (+ legados órfãos de Avatar/Badge) |
| T3 — DssChip white | ✅ | `27bedaf` | #7 |
| T4 — Brand teleportado | ✅ | `ad1a02f` | Risco A8 (Seção 3, priorizado pelo orquestrador como B4) |
| T5 — DssTable slots | ✅ | `70647d8` | #6 (NC-A9-01) |
| T6 — CSS supremo | ✅ | `985392b` + `573d59f` | A11-07 (elevado a P0 por decisão do mantenedor) |
| T7.1 — @use | ✅ | `2cdeb1a` | #3 |
| T7.2 — --quasar-* | ✅ | `2cdeb1a` | #4 |
| T7.3 — DssAvatar | ✅ | `d889a00` | #8 |
| T7.4 — Barrels em lote | ✅ | `67f4477` | #9, #10 (débito sistêmico A — 25 componentes) |
| T7.5 — Órfão DssBadge | ✅ | `67f4477` | #11 |
| T7.6 — Drift docs-portal | ✅ | `67f4477` | #12 |

**Resultado: 12/12 bloqueantes da Seção 2 endereçados.**

---

## Evidências por Tarefa

### T0 — Sanear o HEAD
- **Achado em campo:** os 5 barrels composed (`export type` inválido) **já estavam corrigidos e commitados** — o relatório A2 retratava estado anterior. O que restava quebrado era só o import do DssUploader.
- `DssUploader.ts.vue:60-62`: `'../../base/...'` → `'../../../base/...'` (o caminho antigo apontava para `composed/base/`, inexistente).
- **Validação:** `npm run core:build` → **exit 0**; `git status` em `packages/` limpo pós-commit (HEAD ≡ working tree para o core).

### T1 — Tokens no dist (o mais grave)
- `packages/core/index.js` agora importa `./index.scss` (antes o bundle da lib saía **sem nenhum bloco `:root`**).
- Para não duplicar CSS, os `@import '../X.module.scss'` dos `<style>` de **18 SFCs 1-structure** foram removidos (os módulos já eram `@forward`-ados em `components/index.scss` — era a dupla carga do GAP-03). Bloco de transições Vue do DssTabPanels preservado.
- **Validação:** `grep -c ":root" dist/style.css` → 1 (bloco minificado com todos os tokens); `compact-control-height` declarado; `dss-chip` presente; `--dss-primary` declarado exatamente 1×; seletores repetidos só em contextos distintos legítimos (`forced-colors`, `print`); style.css 327 KB → 682 KB.

### T2 — DssButton + infraestrutura de testes
- Wrapper raiz re-exporta `1-structure/DssButton.ts.vue` (canônico com ARIA). Legados `1-structure/DssButton.vue`, `DssAvatar.vue`, `DssBadge.vue` removidos (zero refs restantes — verificado por grep).
- **Achado da onda (não estava em nenhum relatório):** o gate de testes do CLAUDE.md **nunca foi executável** — não existia projeto vitest para os `*.test.js`, `@vue/test-utils` não estava instalado em nenhum workspace, e o helper Quasar usado por 82 arquivos de teste nem existia no lockfile. Criado: projeto `unit` (jsdom) no `vitest.config.ts` do core, deps `@vue/test-utils`+`jsdom`, shim local do helper Quasar (o oficial é incompatível com vitest 4) com registro global dos QComponents e alias do build client do Quasar (o exports map resolvia o build SSR em ambiente node).
- 7 testes pré-existentes que só "passavam" com o runner quebrado foram adaptados ao contrato canônico (validators runtime → tipos TS; slots de ícone inexistentes do Chip → props; conteúdo teleportado de Dialog/PopupEdit → busca no `document.body`).
- **Validação:** Button 69, Avatar 45, Badge 65 → **179/179**.

### T3 — DssChip
- 4 ocorrências reais de `color: white` (o relatório dizia 6) em `3-variants/_outline.scss` → `var(--dss-text-inverse)` (token confirmado no catálogo: light `gray-50`, dark `gray-900`; padrão dos demais componentes).
- **Validação:** zero `white` no componente; SCSS compila; 4 usos do token no CSS de saída; meta sem referência ao valor antigo (sync não necessário).

### T4 — Brand em overlays teleportados
- **Norma documentada** (DSS_IMPLEMENTATION_GUIDE.md, seção Brandabilidade): `data-brand` DEVE viver em `document.body`.
- **Defesa:** novo composable global `useTeleportedBrand()` (resolve brand do body/html, fallback para container legado, MutationObserver para troca em runtime) integrado em DssDialog, DssBottomSheet e DssPopupEdit via `:data-brand` no root teleportado. DssPopupProxy intocado (imune por design).
- `_brands.scss` dos 3 ganharam seletor self (`.dss-dialog[data-brand=x]`) além do descendente — o seletor de atributo no próprio elemento também reativa os tokens `[data-brand]` na subárvore.
- Storybook decorator aplica `data-brand` no body.
- **Validação:** 3 testes novos no DssDialog.test.js (norma body, fallback legado, omissão) + suites Dialog/BottomSheet/PopupEdit/Chip → **118/118**.

### T5 — DssTable
- Lista fixa de 16 slots substituída pelo **forwarding dinâmico** do padrão DssTree (`v-for $slots`) — cobre `body-cell-[name]`, `header-cell-[name]`, `body-selection`.
- **Validação:** 3 testes novos (body-cell-[name], header-cell-[name], regressão do slot estático `top`) + correção de expectativa pré-existente (QTable devolve default `'none'`, nunca `undefined`) → **32/32**.

### T6 — CSS supremo, Figma rebaixado
- `DSS_REFERENCIA_VISUAL_ANALISE.md`: 5 regiões manuais corrigidas (nota de Autoridade, tabela de autoridade, Seção 2.2 reescrita, passo da Seção 5.2, hierarquia da Seção 5.4 com nota explícita "Figma fora da cadeia").
- Varredura encontrou +2 documentos vivos com o resíduo: `DSS_VISUAL_CONTRACT.md` (5 trechos) e `DSS_COMPONENT_ARCHITECTURE.md` (Regra de Implementação #1 — **documento Nível 1**, reescrita). PROMPT_DIRECIONADOR_* históricos preservados como registro de época.
- **Validação:** grep de autoridade (`supremo|prevalece|árbitro|fonte de verdade` + figma) → zero em docs vivos; `sync:visual-contract` rodado com **diff zero** na região auto-gerada.

### T7.1 — @use
- Migrados: `themes/index` (3), `tokens/brand/index` (3), `tokens/semantic/index` (14), `tokens/semantic/accessibility/index` (4 ativos), `themes/quasar.variables` (1), 3 `example.vue` (`@use ... as *`).
- **Validação-chave:** CSS **comprimido** pré/pós migração (via `git stash`) → **diff vazio** (equivalência funcional absoluta). Zero `@import` ativo em `packages/core` fora de `_archive`.

### T7.2 — Namespace --quasar-*
- 18 refs `var(--quasar-*)` → bridge `var(--dss-*)` em `_quasar-overrides` (16), `_quasar-utilities` (2, achado extra) e `quasar.variables`.
- 3 declarações `rgba(var(--x), a)` (CSS **inválido**, descartado pelo browser) → `color-mix(in srgb, ...)`, padrão canônico já usado pela Golden Reference.
- **Validação:** zero `var(--quasar-` no core; compila.

### T7.3 — DssAvatar
- `4-output/DssAvatar.scss` → `4-output/index.scss` (canônico); brands movidos da L3 para `4-output/_brands.scss` (fallbacks hex removidos — fallback de brand deve ser semântico); `DssAvatar.example.vue` criado (5 cenários); meta `computedDimensions` 40px → **48px** (default md do CSS — Princípio #12).
- **Retificação de achado:** os valores fixos (40/56/64/80/768px) **têm exceção documentada** (DssAvatar.md Seção 14, EXC-01..05) — o item "sem exceção aprovada" do A3 era impreciso.
- **Validação:** módulo compila; brands no output; zero hex; **45/45** testes.

### T7.4 — Barrels em lote
- **25 componentes** migrados `index.js` → `index.ts` com `export type *` dos types e export dos composables (padrão DssFile/DssOptionGroup). Barrel central usa caminhos sem extensão — resolução intacta.
- **Validação:** `npm run core:build` → exit 0 pós-migração.

### T7.5 — Órfão DssBadge
- `4-output/DssBadge.scss` removido (importava `3-variants/colors` inexistente; zero referências — verificado).

### T7.6 — Drift docs-portal
- 355 declarações `--dss-*` manuais substituídas por **bloco auto-gerado** (2.821 linhas) entre marcadores `BEGIN/END:DSS-TOKENS-AUTO-GENERATED`, via novo `npm run sync:portal-tokens` (compila `packages/core/tokens/index.scss` e injeta em `@layer base`).
- Sub-blocos DSS duplicados dos temas light/dark removidos; 42 tokens **próprios do portal** (jtech/sidebar/header/code + classes de brand com cadeias `var()`) preservados.
- Colateral do core: 3 pares duplicados em `globals.scss` resolvidos (`--dss-{tertiary,warning,info}-deep`), mantendo o valor vencedor da cascata.
- **Validação:** `npm run docs:build` → verde (150 KB CSS); valores `-deep` do portal idênticos ao core; `--dss-primary` 1×.

---

## Bateria Final de Validação

| Verificação | Resultado |
|---|---|
| `npm run core:build` | ✅ exit 0 |
| `npm run docs:build` | ✅ exit 0 |
| `grep -r "@import" packages/core --include="*.scss" --include="*.vue"` (fora _archive) | ✅ zero ativo |
| `grep -r "var(--quasar-" packages/core` | ✅ zero |
| Tokens no dist (`:root`, `compact-control-height`, `dss-chip`) | ✅ presentes |
| `npm run sync:visual-contract` | ✅ diff zero (só timestamp) |
| Testes dos componentes tocados | ✅ 179+118+32+45 = **374 passando, 0 falhando** |

## Pendências e Observações (para a reauditoria dirigida)

1. **Warnings residuais de deprecação Sass** podem existir em arquivos não cobertos pelo escopo (verificar na reauditoria com build verboso).
2. **`installQuasarPlugin`/`installQuasar`** agora resolvem via shim local (`packages/core/test/quasar-vitest-helper.js`) — quando o kit oficial suportar vitest 4, avaliar a troca.
3. A suíte completa de testes dos **demais** componentes nunca rodou até esta onda — espere falhas pré-existentes da mesma classe das 7 corrigidas aqui (asserções escritas contra Quasar não registrado). É débito de teste, não de componente.
4. `npm run sync:portal-tokens` é manual — avaliar inclusão no pre-commit (mesmo padrão do visual-contract) ou no `docs:build`.
5. Barrels migrados mantêm import direto de `1-structure/*.ts.vue` em alguns casos (equivalente ao wrapper pós-T2; padronizar para o wrapper é cosmético).
6. Itens da Seção 3 do consolidado (69 alertas) permanecem como backlog pós-migração.
