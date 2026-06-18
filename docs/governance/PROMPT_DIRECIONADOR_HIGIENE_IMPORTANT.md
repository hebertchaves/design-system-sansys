# PROMPT DIRECIONADOR — HIGIENE DE `!important` (Pós-Princípio #13)

**Gerado em:** 18 de Junho de 2026
**Insumo primário:** investigação read-only sobre o uso de `!important` no DSS (1.016 ocorrências em `packages/core`)
**Objetivo:** Remover os `!important` que se tornaram **arquiteturalmente redundantes** após o Princípio #13 (`@layer quasar`), preservando o núcleo genuinamente necessário — sem nenhuma regressão visual.
**Natureza:** Higiene de dívida técnica. NÃO é correção de bug visual. Toda mudança é remoção de `!important` redundante ou substituição por especificidade.

---

## ⚠️ FATO DE CASCATA VINCULANTE (leia antes de tudo)

A classificação inteira depende desta regra. Para declarações `!important`, a ordem das cascade layers **inverte**, e **estilo unlayered é o MAIS FRACO dos `!important`**. Escada de precedência (author origin, forte → fraco):

```
1. !important  em layer declarada PRIMEIRO       ← mais forte
2. !important  em layers posteriores
3. !important  UNLAYERED                          ← onde o CSS DSS vive
4. normal      UNLAYERED
5. normal      em layers posteriores
6. normal      em layer declarada PRIMEIRO        ← mais fraco
```

Consequências (o Quasar é servido em `@layer quasar` via `apps/sandbox/public/quasar-layered.css`; o DSS é unlayered):

| Confronto | Vence | Implicação p/ o `!important` DSS |
|---|---|---|
| DSS normal × Quasar **normal** | DSS | `!important` DSS é **redundante** → REMOVER |
| DSS `!important` × Quasar **normal** | DSS (mas normal já venceria) | **redundante** → REMOVER |
| DSS normal × Quasar **`!important`** | Quasar | DSS precisa de algo além de normal |
| DSS `!important` × Quasar **`!important`** | **Quasar** | `!important` DSS é **insuficiente** → fix real = JS/inline/layer-anterior |

Confirmação no código: `packages/core/components/base/DssSelect/1-structure/DssSelect.ts.vue:207`.

**Regra de ouro do executor:** só vale manter um `!important` DSS quando ele compete contra (a) outra regra **DSS** (intra-DSS, especificidade) ou (b) requisito de **acessibilidade** (forced-colors / prefers-contrast). `!important` cuja única justificativa é "vencer o Quasar" é **redundante** (se o Quasar é normal) ou **insuficiente** (se o Quasar é `!important` — precisa de outra solução).

---

## ⚠️ PRÉ-REQUISITO DE SEGURANÇA (bloqueante)

"Remover é seguro" depende de **uma premissa**: o CSS do Quasar é **SEMPRE** servido dentro de `@layer quasar`, em todos os ambientes de entrega (sandbox, docs-portal, qualquer app consumidor, SSR, ambiente de teste).

**T0 — Auditar a premissa do layer ANTES de remover qualquer coisa.**
- Confirmar que todo entry point que carrega Quasar usa `quasar-layered.css` (ou equivalente `@layer quasar { ... }`).
- Procurar carregamentos de Quasar fora de layer: `grep -rn "quasar" --include="*.html" --include="*.js" --include="*.ts" apps | grep -i "css\|import" | grep -v layered`
- Se houver QUALQUER ambiente que carregue Quasar unlayered, **PARE**: a remoção é insegura ali. Resolva o isolamento (Princípio #13) primeiro, ou trate as utilitárias globais como defesa-em-profundidade permanente (não remover).
- Registrar o resultado. Sem T0 verde, não avance.

---

## Prompt para o Chat Executor

```
Você é o executor da Higiene de !important do Design System Sansys (DSS). Sua missão
é remover os !important que se tornaram redundantes após o Princípio #13 (@layer quasar),
SEM regressão visual. Trabalhe em LOTES pequenos, validando cada lote no browser antes
de seguir. NÃO remova em massa sem validação. NÃO introduza máscaras.

LEITURA OBRIGATÓRIA ANTES DE COMEÇAR:
1. CLAUDE.md (Princípios #1, #12, #13)
2. docs/reference/DSS_ARCHITECTURE.md (Princípio #13 — isolamento via cascade layers)
3. Este documento, seção "FATO DE CASCATA VINCULANTE" e "PRÉ-REQUISITO DE SEGURANÇA"
4. packages/core/components/base/DssSelect/1-structure/DssSelect.ts.vue:200-230 (caso real do resíduo legítimo)

MÉTODO DE VALIDAÇÃO POR LOTE (obrigatório, não-negociável):
a) Tirar baseline visual ANTES (screenshot via chrome-devtools MCP das páginas-chave da sandbox).
b) Aplicar a remoção do lote.
c) Recompilar (npm run build do core / rebuild da sandbox) e comparar screenshots DEPOIS.
d) Qualquer diferença visual = reverter aquela linha e reclassificar como MANTER, documentando o porquê.
e) Só então commitar o lote (mensagem descritiva por lote).

ORDEM DOS LOTES (do mais seguro/maior ganho ao mais delicado):
- Lote 1: themes/_quasar-overrides.scss — props estruturais vs Quasar NORMAL (~320)
- Lote 2: utils/_colors.scss + _colors-hover.scss + _quasar-utilities.scss (~107) — só após T0 garantir layer em TODOS os ambientes
- Lote 3: utils/_layout-helpers.scss (18) + componentes 3-variants/ (25) — reduzir por especificidade
- Lote 4: tokens/brand/index.scss (~146) — análise de ordem/especificidade .dss-brand-x × [data-brand=x]
- NÃO MEXER (manter): componentes 4-output/ em @media forced-colors/prefers-contrast (~260);
  _quasar-overrides opacity/disabled (~22); overlays 2-composition que brigam com .bg-primary DSS.
```

---

## Plano por Tarefa

### T1 — `_quasar-overrides.scss`: props estruturais (≈320) → REMOVER
**Contexto:** o Quasar declara `.q-btn`, `.q-field__control` etc. com regras **normais**. O DSS unlayered já vence sem `!important`.
- Para cada `!important` no arquivo, classificar a propriedade:
  - **REMOVER** se a propriedade-alvo no Quasar é `normal` (bg, color, padding, font-size, border-radius, min-height, box-shadow, border, line-height, margin, width, height, transition…). Cruzar com: `grep -n "<prop>" apps/sandbox/public/quasar-layered.css` — se não houver `!important` na regra Quasar correspondente, remover.
  - **MANTER** se a propriedade-alvo no Quasar tem `!important` (essencialmente `opacity` em contexto disabled/loading, `outline:0`). ~22 linhas. Documentar como "resíduo legítimo — combate `!important` do Quasar (necessário-mas-insuficiente; fix definitivo = não empilhar / JS)".
- Validar visualmente DssButton, DssInput, DssSelect, DssTextarea, campos de form em geral.

### T2 — Utilitárias globais `.bg-*` / `.text-*` (≈107) → REMOVER (depende de T0)
**Contexto:** redundantes por dois motivos — (1) DSS unlayered normal vence Quasar normal; (2) a bridge `--q-* → --dss-*` (`_quasar-tokens-mapping.scss` §12) já remapeia até as utilitárias do próprio Quasar para tokens DSS. O comentário em `_quasar-overrides.scss:~1000` já reconhece a redundância ("defesa em profundidade").
- **Só execute se T0 confirmou layer em TODOS os ambientes.** Caso contrário, mantenha como defesa permanente e documente a decisão.
- Arquivos: `utils/_colors.scss`, `utils/_colors-hover.scss`, `themes/_quasar-utilities.scss`, e o bloco duplicado no fim de `_quasar-overrides.scss`.
- Validar: aplicar `bg-primary`/`text-negative` etc. em superfícies de teste e em componentes Quasar (QHeader usa `bg-primary`).

### T3 — `_layout-helpers.scss` (18) + `3-variants/` (25) → REVISAR/reduzir
**Contexto:** intra-DSS. `!important` aqui costuma ser atalho de especificidade (variante sobrescrevendo base).
- Substituir por especificidade adequada (ex.: `.dss-x--variante` já é mais específico que `.dss-x` se bem ordenado em L2→L3). Remover o `!important` e confirmar que a variante ainda vence a base.

### T4 — `tokens/brand/index.scss` (≈146) → REVISAR
**Contexto:** `--dss-*: var(…) !important` em `.dss-brand-hub/water/waste`. Compete com `[data-brand="x"]` ambiente (mesma especificidade 0,1,0 → decide ordem). Custom property `!important` só importa quando há definição concorrente.
- Verificar se a ordem de carregamento garante que `.dss-brand-x` venha depois de `[data-brand]`. Se sim, remover `!important`. Se a intenção é override explícito independente de ordem, **manter e documentar** como decisão de intenção (não redundância).

### NÃO-MEXER (manter, com motivo)
| Grupo | Qtd aprox | Motivo de manter |
|---|---|---|
| `4-output/` em `@media (forced-colors)` / `prefers-contrast` | ~260 | Acessibilidade WCAG (hard) + override intra-DSS de base/variante mais específicas |
| `_quasar-overrides.scss` opacity/disabled/loading | ~22 | Único ponto que encosta no `!important` do Quasar; manter até fix arquitetural (não-empilhar/JS) |
| `2-composition/` overlays (Header/PopupProxy etc.) que brigam com `.bg-primary` DSS aplicada pelo componente Quasar | parte dos 92 | Arbitragem intra-DSS (empate de especificidade) — EXC-01/EXC-02 já documentadas |

---

## Critério de Conclusão
- [ ] T0 verde: Quasar comprovadamente em `@layer quasar` em todos os ambientes (ou decisão documentada de manter utilitárias como defesa).
- [ ] Contagem de `!important` em `packages/core` reduzida de 1.016 para a faixa-alvo (~370–570, conforme decisão sobre T2/T4), **sem nenhuma regressão visual** comprovada por screenshots antes/depois.
- [ ] Cada `!important` mantido tem motivo documentado (a11y, intra-DSS, ou resíduo Quasar legítimo).
- [ ] `npx sass` compila sem erros; suíte de testes (`npx vitest run --project unit` em `packages/core`) verde.

## Justificativa da Ordem
T0 primeiro porque toda a segurança da remoção depende da premissa do layer. T1 antes de T2 porque os overrides estruturais são o maior bloco de ganho com menor risco (competem contra Quasar normal, não contra utilitárias). T2 só depois de T0 porque as utilitárias são a defesa-em-profundidade explícita — removê-las sem garantia de layer reabre regressão em ambientes não-layered. T3/T4 por último porque são intra-DSS e exigem análise de especificidade/ordem caso a caso.

## Fora do Escopo deste Executor
- Resolver os `!important` do Quasar que o DSS realmente precisa vencer (disabled opacity etc.) via **layer DSS declarada antes de `quasar`** — é decisão arquitetural separada (mexe em ordem de layers global), não higiene.
- Qualquer mudança de aparência/token. Este executor só remove redundância de `!important`.
