# AUDITORIA — Uso de `!important` no DSS (Higiene Pós-Princípio #13)

**Data:** 18 de Junho de 2026
**Tipo:** Investigação read-only (nenhuma alteração de código realizada)
**Escopo:** `packages/core/**/*.scss` (1.016 ocorrências de `!important`) cruzado com o CSS real do Quasar (`apps/sandbox/public/quasar-layered.css`, 791 ocorrências)
**Motivação:** Avaliar a percepção de uso "exacerbado" de `!important` — identificar a causa real, dimensionar quanto é redundante e quanto é necessário, e o impacto na construção de telas.
**Documentos derivados:** plano de execução em `docs/governance/PROMPT_DIRECIONADOR_HIGIENE_IMPORTANT.md`.

---

## 1. Sumário Executivo

- O `!important` **não está espalhado pelos componentes** — está concentrado em poucos arquivos globais de override/utilidades.
- A causa real do volume é **dívida histórica da era pré-`@layer`** somada à **"defesa em profundidade"** deliberada — **não** inadequação do sistema. Após o Princípio #13 (Quasar isolado em `@layer quasar`), a maioria desses `!important` tornou-se **arquiteturalmente redundante**.
- **~445** são removíveis com segurança (competem contra regras *normais* do Quasar, que o CSS DSS unlayered já vence); **~205** são revisáveis (intra-DSS, maioria removível); **~370** devem permanecer — e este núcleo é **dominado por acessibilidade** (forced-colors / alto contraste), não por combate ao Quasar.
- O resíduo que combate o `!important` do **próprio** Quasar é mínimo e tem uma verdade desconfortável: pela regra de cascata, `!important` DSS unlayered **não vence** `!important` do Quasar layered — a solução real é JS/inline/layer-anterior, não mais `!important`.

---

## 2. Regra de Cascata (base de toda a classificação)

O Quasar é servido em `@layer quasar`; o CSS DSS é **unlayered**. Para declarações `!important`, a ordem das cascade layers **inverte**, e **unlayered é a MENOR prioridade entre os `!important`**.

Escada de precedência (author origin, do mais forte ao mais fraco):

```
1. !important  em layer declarada PRIMEIRO       ← mais forte
2. !important  em layers posteriores
3. !important  UNLAYERED                          ← onde o CSS DSS vive
4. normal      UNLAYERED
5. normal      em layers posteriores
6. normal      em layer declarada PRIMEIRO        ← mais fraco
```

| Confronto | Vence | Implicação p/ o `!important` DSS |
|---|---|---|
| DSS normal × Quasar **normal** | **DSS** | `!important` DSS é **redundante** |
| DSS `!important` × Quasar **normal** | DSS (normal já venceria) | **redundante** |
| DSS normal × Quasar **`!important`** | **Quasar** | DSS precisa de mais que normal |
| DSS `!important` × Quasar **`!important`** | **Quasar** | `!important` DSS é **insuficiente** → fix = JS/inline/layer-anterior |

**Modelo mental:** estilos sem layer = layer implícita declarada por último. Para `normal`, "última vence" → unlayered vence. Para `!important`, a ordem inverte por completo → a "última" vira a mais fraca.

**Confirmação no código:** `packages/core/components/base/DssSelect/1-structure/DssSelect.ts.vue:207` — o time documentou que `!important` DSS unlayered não sobrescreve o `[disabled]{opacity:.6!important}` do Quasar; a correção foi remover o atributo via JS.

**Racional de design (por que é assim):** `!important` em layers é um mecanismo de *inversão de autoridade* — permite que uma layer deliberadamente fraca crave uma regra inegociável que sobreviva até ao CSS unlayered (ex.: layer de reset/acessibilidade declarada primeiro). Como efeito colateral benéfico, embrulhar o Quasar em layer neutraliza a *especificidade* das regras normais dele (o DSS vence fácil), enquanto **preserva** os poucos `!important` *funcionais* do Quasar (disabled, visibility, layout) contra override acidental.

---

## 3. Achado Central

Cruzamento dos `!important` do Quasar (`quasar-layered.css`):

| Propriedade no Quasar com `!important` | Qtd | Natureza |
|---|---|---|
| `background` | 305 | quase tudo = utilitários da paleta Material (`.bg-red`→`#f44336`) |
| `color` | 298 | quase tudo = utilitários da paleta Material (`.text-red`) |
| `opacity` | 18 | **estrutural** — disabled `.6/.32/.75`, inner-loading |
| `display` | 28 | toggles de visibilidade |
| `height`/`width` | 22 | poucos casos pontuais |
| `outline` | 6 | `.q-field--disabled … outline:0` |

**Conclusão:** o Quasar **não** usa `!important` nas props estruturais de `.q-btn` / `.q-field__control` (são `normal`). Ele só usa `!important` estrutural em pontos estreitos: `opacity` de disabled/loading, `outline:0`, `display:none`. Logo, a esmagadora maioria dos overrides DSS briga contra regras *normais* — e o `!important` ali é redundante.

---

## 4. Medição por Bucket (1.016 total em `packages/core`)

| # | Grupo / arquivo | Qtd | Veredito | Compete contra |
|---|---|---|---|---|
| 1 | `themes/_quasar-overrides.scss` — props estruturais (bg, color, padding, font-size, radius, min-height, box-shadow, border…) | ~320 | 🔴 **REMOVER** | Quasar **normal** → DSS unlayered já vence |
| 2 | `themes/_quasar-overrides.scss` — `opacity`/disabled/loading | ~22 | 🟡 **MANTER c/ ressalva** | Quasar **`!important`** (necessário-mas-insuficiente) |
| 3 | `utils/_colors.scss` (25) + `_colors-hover.scss` (56) + `themes/_quasar-utilities.scss` (26) | 107 | 🔴 **REMOVÍVEL** (hoje defesa em profundidade) | bridge `--q-*→--dss-*` já remapeia; código admite redundância (`_quasar-overrides.scss:~1000`) |
| 4 | `utils/_layout-helpers.scss` | 18 | 🟠 **REVISAR** | intra-DSS / utilitário |
| 5 | `tokens/brand/index.scss` (`--dss-*: … !important` em `.dss-brand-*`) | 149 (146 custom-prop) | 🟠 **REVISAR** (maioria removível) | intra-DSS: `.dss-brand-x` × `[data-brand=x]` |
| 6 | Componentes `3-variants/` | 25 | 🟠 **REVISAR** | intra-DSS: variante × base (resolver por especificidade) |
| 7 | Componentes `2-composition/` (overlays: Header, Menu, Dialog, PopupProxy, Footer, BottomSheet, PullToRefresh) | 92 | 🟡 **MANTER** (parte) / 🟠 revisar | intra-DSS: briga com `.bg-primary` DSS aplicada pelo componente Quasar (EXC-01/02) |
| 8 | Componentes `4-output/` — `@media (forced-colors)` / `prefers-contrast` | ~260 | 🟢 **MANTER** | a11y (WCAG) + intra-DSS (base/variante mais específica) |
| 9 | `4-output/` fora de a11y media (dark-mode / brand) | ~13 | 🟠 **REVISAR** | intra-DSS |

### Síntese quantitativa

| Destino | Aprox. | % |
|---|---|---|
| 🔴 Remover (redundante vs Quasar normal / bridge) | ~445 | ~44% |
| 🟠 Revisar (intra-DSS, baixo risco, maioria removível) | ~205 | ~20% |
| 🟢/🟡 Manter (carga real) | ~370 | ~36% |

> A percepção de "~600 redundantes" do solicitante confere: **~650 são removíveis ou provavelmente removíveis**; o núcleo necessário (~370) é **dominado por acessibilidade**, não por combate ao Quasar.

---

## 5. Os que FICAM — motivos

- **Bucket 2 (opacity/disabled no override, ~22):** único ponto que encosta no `!important` do Quasar (`[disabled]{opacity:.6!important}`). **Verdade desconfortável:** pela regra de cascata, o `!important` DSS unlayered **não vence** o do Quasar — funciona quando funciona por *não empilhar* opacidades ou por remover o atributo via JS (`DssSelect`). "Manter até fix arquitetural", não "manter porque resolve".
- **Bucket 7 (overlays em `2-composition`, parte):** documentados como EXC-01/EXC-02. `.dss-header`/`.dss-popup-proxy` precisa vencer a classe `.bg-primary` que o **próprio componente Quasar** aplica. Como a `.bg-primary` vencedora é a versão **DSS unlayered** (mesmo nome, mesma especificidade 0,1,0), o confronto é intra-DSS e decide por ordem — o `!important` arbitra esse empate. Manter os que miram utilitário aplicado pelo componente; revisar os justificados só por "especificidade vs `.q-menu`" (especificidade é irrelevante entre layers → provavelmente redundantes).
- **Bucket 8 (a11y, ~260, o maior bloco do "manter"):** overrides dentro de `@media (forced-colors: active)` e `prefers-contrast`. Legítimos por requisito WCAG hard de alto contraste/cores forçadas e por precisarem vencer regras base+variante DSS de maior especificidade.

---

## 6. Impacto na Construção de Telas

- **Funcional: baixo e contido.** O `!important` pesado vive em arquivos globais intencionalmente autoritativos, e o Quasar está isolado em layer. Telas montadas com componentes DSS herdam visual consistente sem briga de cascata.
- **O "somatório de indicações" observado** (campo disabled apagado demais) é **empilhamento de opacidade** (`.6` do Quasar × opacidade do DSS ≈ `0.24`), não disputa de cascata. Solução: não empilhar (ver `reference_quasar_layered_important` na base de conhecimento e `project_qfield_height_token_bug`).
- **Custo ergonômico real:** quem monta a tela perde a escotilha de escape — para ajustar uma instância, precisa de `!important` próprio ou inline.
- **Custo de manutenção:** raciocínio por "quem tem `!important` e em que ordem" em vez de especificidade; e os ~445 redundantes *escondem* quais são os poucos load-bearing.

---

## 7. Ressalvas e Metodologia

1. As **contagens por bucket são exatas** (medidas por `grep`); o split fino dentro do `_quasar-overrides.scss` (#1 vs #2) e dos overlays (#7) é **estimado por padrão de propriedade/seletor** — a verificação linha-a-linha definitiva (cruzar cada seletor DSS com o seletor Quasar correspondente) é o passo da execução (ver T1 do prompt direcionador).
2. **"Remover" é seguro apenas enquanto o Quasar for SEMPRE servido em `@layer quasar`** em todos os ambientes de entrega. Em SSR/teste isolado sem o layer, parte vira load-bearing de novo — por isso as utilitárias (#3) são mantidas hoje como defesa em profundidade. **T0 do plano** audita essa premissa antes de qualquer remoção.
3. O resíduo verdadeiramente irredutível (que nem `!important` resolve) é minúsculo e já tem padrão de solução: JS/inline/layer-anterior, como no `DssSelect`.

### Comandos de medição (reprodutíveis)
```bash
# Total e por arquivo
grep -rc "!important" packages/core --include="*.scss"
# Propriedades do Quasar marcadas !important
grep -oE "[a-z-]+:[^;{]*!important" apps/sandbox/public/quasar-layered.css \
  | grep -oE "^[a-z-]+:" | sort | uniq -c | sort -rn
# !important em contexto de acessibilidade
grep -rl "forced-colors\|prefers-contrast" packages/core/components/*/*/4-output/_states.scss
```

---

## 8. Próximos Passos (fora do escopo desta auditoria read-only)
- Executar o plano de higiene: `docs/governance/PROMPT_DIRECIONADOR_HIGIENE_IMPORTANT.md` (T0 → T4, por lotes, com validação visual antes/depois).
- Decisão arquitetural separada: introduzir uma **layer DSS declarada antes de `quasar`** para vencer os `!important` funcionais do Quasar de forma limpa (substituindo o resíduo do Bucket 2). Não é higiene — mexe na ordem global de layers.
