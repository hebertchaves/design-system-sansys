# 🚨 ALERTA DE GOVERNANÇA — `tokens/brand/index.scss` NÃO é importado (código morto + lacuna funcional)

**Data:** 23 de Junho de 2026
**Origem:** Higiene de `!important` — Lote T4 (alvo era `tokens/brand/index.scss`, ~149 `!important`)
**Status:** ✅ **RESOLVIDO** — arquivo deletado (commit `7e3ce27`, 23/jun/2026). Ver seção 8.
**Severidade:** Média-alta (lacuna funcional latente em feature de brandabilidade; blast-radius atual baixo).

---

## 1. Resumo do achado

`packages/core/tokens/brand/index.scss` (≈770 linhas: classes `.dss-brand-hub/water/waste`,
`.dss-mode-semantic`, mixins `dss-brand-*`, funções Sass, utilitários de debug/demo e **~149
`!important`**) **NÃO é importado por nenhum arquivo** do código. Logo, **não é compilado em
nenhum bundle** — é **código morto**.

As classes `.dss-brand-*` que **de fato** chegam ao CSS compilado vêm de **outro arquivo**,
`packages/core/themes/_quasar-utilities.scss`, e definem **apenas 2 propriedades**
(`--quasar-primary`, `--quasar-primary-hover`) — não as ~25 do `brand/index.scss`.

> ⚠️ Isso foi descoberto ao tentar validar empiricamente o T4: o resolvedor de cascata
> mostrava `.dss-brand-water` com **2 props**, não as 25 do arquivo-alvo. A investigação
> confirmou que o arquivo-alvo nunca é carregado.

---

## 2. Evidências (verificáveis)

| # | Verificação | Resultado |
|---|---|---|
| C1 | `grep -rnE "@(use\|forward)[^;]*brand" … \| grep -v "brand/_(hub\|water\|waste)"` | **vazio** — ninguém importa `brand/index` (nem `'tokens/brand'`, que resolve para `index`). |
| C2 | `tokens/index.scss` (linhas 30-32) | importa só `@use 'brand/_hub'`, `'_water'`, `'_waste'` (o mecanismo `[data-brand]`). **Não** importa `brand/index`. |
| C3 | mixins/funções `dss-brand-context`, `dss-brand-variant`, `dss-brand-gradient`, `dss-brand-primary()`, `dss-brand-surface-subtle()` | **0 usos externos** ao próprio arquivo. |
| C4 | `.dss-brand-hub` em `apps/sandbox/public/dss-full.css` **e** `packages/core/dist/style.css` | versão de **2 props** (`--quasar-primary`, `--quasar-primary-hover`) → origem = `themes/_quasar-utilities.scss` (esse SIM é importado: `themes/index.scss:13`). |
| C5 | uso das **classes** `.dss-brand-hub/water/waste` / `.dss-mode-semantic` em fontes (`*.vue/*.html`, sem `dist/`/testes) | **0 usos como classe**. (Único match é `var(--dss-brand-hub-primary,…)` — variável, num demo do `TestAvatar.vue`.) |

---

## 3. Impacto no sistema (duplo)

### 3.1. Impacto na higiene de `!important` (T4)
Os **~149 `!important`** do `brand/index.scss` estão em **código não-compilado** → têm **efeito
zero** em runtime. Removê-los como "higiene" é **inócuo** (não há regressão possível, mas também
não há ganho real — continua sendo código morto). Por isso o **T4 foi suspenso neste arquivo**:
a ação correta não é "tirar `!important` de código morto", e sim **decidir o destino do arquivo**.

### 3.2. Impacto funcional (o alerta real)
O `brand/index.scss` documenta (seção "NOTAS DE USO", linhas ~755-765) uma feature de
**sobrescrita local de marca**:

- `.dss-brand-water` em qualquer elemento → sobrescreveria o contexto global `[data-brand]`
  para **todos** os tokens de marca (action, surface, border, shadow, focus, gradient, contrast).
- `.dss-mode-semantic` → **resetaria** todos os tokens de marca para os semânticos.

Como o arquivo não é carregado, essa feature está **apenas parcialmente entregue**:
- Das classes locais, **só** `--quasar-primary` e `--quasar-primary-hover` são realmente
  sobrescritas (via `_quasar-utilities.scss`).
- **Não** são sobrescritos: `--dss-action-primary(-hover/-deep/-light/-disable)`,
  `--dss-brand-*`, `--dss-surface-brand-*`, `--dss-border-brand-*`, `--dss-shadow-brand-*`,
  `--dss-focus-ring-brand`, `--dss-outline-focus-brand`, gradientes e contraste.
- `.dss-mode-semantic` **não** reseta os tokens de marca (só os 4 `--quasar-*`).

> **Blast-radius atual = baixo**, porque (C5) nenhum consumidor em fonte usa essas classes, e o
> mecanismo **global** `[data-brand="hub|water|waste"]` (via `brand/_hub.scss` etc.) **funciona
> normalmente** — esse SIM é importado por `tokens/index.scss`. O risco é **latente**: se algum
> produto passar a usar `.dss-brand-*`/`.dss-mode-semantic` esperando a sobrescrita completa
> documentada, receberá um override **parcial e silenciosamente quebrado**.

---

## 4. Causa (CONFIRMADA via git) — nunca foi ligado desde a criação

A arqueologia git **descartou** a hipótese de regressão pela migração `@import→@use`:

- `git log --all -S "brand/index" -- '*.scss'` → **vazio**: a string `brand/index` nunca foi
  adicionada/removida em nenhum `.scss`.
- `git log --all -S "@use 'brand'"` / `"@import 'brand'"` / `"tokens/brand"` → **todos vazios**:
  nunca houve import "bare" que resolvesse para `brand/index.scss`.
- `brand/index.scss` foi **criado no primeiro commit** (`63e4e07 "DSS compartilhado"`) e
  `tokens/index.scss` **sempre** importou apenas `brand/_hub/_water/_waste` (`@import` no
  `4450383`, depois `@use` no `9e12a87`) — **nunca** `brand/index`.

**Veredito:** o arquivo é um **scaffold órfão desde a origem** — foi escrito junto do esqueleto
inicial do DSS, mas **nunca foi conectado ao build**. Não há "regressão a restaurar": a versão
viva `.dss-brand-*` (2 props) sempre veio de `_quasar-utilities.scss`. Isso **simplifica a
decisão**: "religar para restaurar" não se aplica (nunca rodou); a feature de override local
**nunca foi entregue** de fato.

---

## 5. Averiguação requerida (checklist)

- [ ] **Bisect/`git log -p`** de `tokens/index.scss` e `brand/index.scss` para datar **quando**
      e **em qual commit** o import foi perdido (confirmar a hipótese da migração `@import→@use`).
- [ ] **Decidir a intenção**: o `brand/index.scss` **deve** ser carregado (feature de override
      local é desejada) ou foi **deliberadamente** descontinuado em favor de `[data-brand]`?
- [ ] **Mapear consumidores** (todos os apps/produtos, não só a sandbox) por uso das classes
      `.dss-brand-hub/water/waste` e `.dss-mode-semantic` — confirmar C5 fora deste repo se aplicável.
- [ ] **Resolver a duplicação** `.dss-brand-*`: hoje a definição viva está em
      `themes/_quasar-utilities.scss` (2 props) e a "fonte rica" (morta) em `tokens/brand/index.scss`
      (25 props). Não devem coexistir como fontes divergentes da mesma classe.
- [ ] **Verificar os mixins/funções** (`dss-brand-context`, etc.): se nenhum é usado, são
      candidatos a remoção; se há intenção de uso, expor via `@forward` adequado.

---

## 6. Recomendação

1. **NÃO** "limpar `!important`" do `brand/index.scss` como higiene — é maquiar código morto.
   O T4 da Higiene de `!important` deve ser **reescopado**: o único `.dss-brand-*` **vivo** com
   `!important` está em `themes/_quasar-utilities.scss` (a "sobra do T2"), e mesmo ali a remoção
   é redundante (set direto na classe vence o valor herdado de `[data-brand]`).
2. **Tratar este achado como item de governança/arquitetura separado** (não como higiene de CSS):
   decidir entre **(a) religar** `brand/index.scss` (e então entregar a feature completa, revalidar
   contraste/WCAG e a cascata vs `_quasar-utilities`), ou **(b) descontinuar** formalmente o arquivo
   (remover, deixando `[data-brand]` como único mecanismo, e consolidar as classes vivas).
3. Até a decisão, **não deletar** o arquivo (tem mixins/funções de aparência intencional e
   documentação de uma feature) nem religá-lo às cegas (mudaria cor/sombra/foco de marca em
   qualquer consumidor que use as classes).

---

## 8. Resolução (23/jun/2026, commit `7e3ce27`)

**Decisão: arquivo deletado.** A averiguação (seção 4) provou que era órfão desde a origem
(nunca rodou) e a comparação token-a-token provou que é **totalmente descartável** — não há
nada que melhore o `[data-brand]`:

| Comparação | Resultado |
|---|---|
| Tokens em `[data-brand=hub]` (`_hub.scss`, vivo) | **66** |
| Tokens em `.dss-brand-hub` (index, morto) | **26** — todos subconjunto do vivo |
| Tokens que o index tinha e o vivo não | **0** (nada a salvar) |
| Divergências de valor | **2**, e DESATUALIZADAS no morto (`--dss-action-primary-hover`, `--dss-brand-tertiary`: `hub-700` vs canônico `hub-800`) |

Salvaguarda antes da remoção: 0 imports (SCSS/JS/TS), 0 usos de mixins/funções/classes
exclusivas; `npx sass` compila bundle idêntico; as 4 classes `.dss-brand-*`/`.dss-mode-semantic`
**vivas** (via `_quasar-utilities.scss`) permanecem no CSS.

**Pendência menor remanescente (não-bloqueante):** a feature de **override LOCAL de marca**
(`.dss-brand-*` aplicada a um subtree) e o **opt-out semântico** (`.dss-mode-semantic`) só
existem hoje de forma parcial (4 props `--quasar-*` em `_quasar-utilities.scss`). Se o produto
**precisar** desses padrões no futuro, é uma **feature nova** a especificar sobre o `[data-brand]`
(que já é o mecanismo canônico e completo) — não uma restauração. Registrado para roadmap.

---

## 7. Relacionados
- Higiene de `!important`: `docs/governance/HANDOFF_HIGIENE_IMPORTANT.md` (T4 marcado como BLOQUEADO).
- `docs/governance/PROMPT_DIRECIONADOR_HIGIENE_IMPORTANT.md` (T4 original assumia `brand/index.scss` vivo).
- Mecanismo vivo de brand: `packages/core/tokens/brand/_hub.scss` / `_water.scss` / `_waste.scss` (`[data-brand]`).
- Duplicata viva das classes: `packages/core/themes/_quasar-utilities.scss`.
