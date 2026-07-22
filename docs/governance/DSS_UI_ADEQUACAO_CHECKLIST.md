# DSS — Checklist de Adequação de UI (recorrências Input/Select → todas as famílias)

> **Origem:** padrões de erro que se repetiram na adequação da **família de campos**
> — `DssInput`/`DssSelect` (jun/2026) + `DssTextarea`/`DssFile`/`DssField` (jul/2026).
> Esta refatoração de UI **abrange todos os componentes** — rode este checklist no
> **primeiro prompt de adequação** de cada um. Sempre verifique **LIGHT e DARK**.
>
> **Como ler:** cada item traz o *sintoma* observado, a *causa-raiz* e o *fix
> canônico*. A seção final é o **Gate** (caixas para marcar por componente).
>
> **Dois meta-princípios (aprendidos na marra, valem para TODA a análise):**
> 1. **Quasar é a referência de COMPORTAMENTO, não só de estilo.** Em dúvida sobre
>    *como algo se comporta* (slot `error`, altura, placeholder, foco), **consulte a
>    fonte do Quasar** (`node_modules/quasar/src/…`, ex.: `use-field.js` → `getBottom()`)
>    antes de decidir. Não interpole do prior genérico (regra anti-delírio do CLAUDE.md).
> 2. **Ler o SCSS NÃO basta — MEÇA ao vivo.** Cascata layered/`!important`, `:focus-visible`,
>    herança de custom-property e paint **enganam** na leitura estática. Reproduza no
>    **Preview Frame** e leia os **estilos computados** (chrome-devtools), e **COMPARE com
>    os irmãos** da família pixel-a-pixel (tamanho/posição do ícone, gap, altura, anel de
>    foco). A paridade é medida, não presumida.

---

## 0. Mapa de exposição (quem herda o quê)

| Família | Estrutura | Exposto a `.q-field__*` (overrides Quasar)? |
|---|---|---|
| **DssInput** | classe própria `.dss-input__*` | **Não** (raiz própria) — mas usa `$attrs` no `<input>` interno (ver H1) |
| **DssSelect** | QSelect → `.q-field__*` | **Sim** |
| **DssTextarea** | QField → `.q-field__*` | **Sim** (mesmas armadilhas do Select) |
| Demais (Checkbox, Radio, Toggle, etc.) | conferir caso a caso | se envolver QField/QInput/QSelect → **Sim** |

> ⚠️ **Componentes QField-based reproduzem TODOS os itens A–E abaixo.** O DssInput
> escapa de parte deles por usar classes próprias, mas tem a armadilha H1.

---

## A. Cascade & sobreposição DSS × Quasar

- **A1 — Layered vs unlayered (Constituição #3 — Cascade Layers + exceção).** Quasar roda em
  `@layer quasar`. CSS DSS *unlayered* vence o layered **normal**, mas **NÃO**
  vence `!important` *layered* (ex.: `[disabled] { opacity:.6 !important }`).
  → Onde o Quasar impõe `!important` em layer, **não tente sobrescrever — contorne**.

- **A2 — Override global de label/native (`_quasar-overrides.scss`).**
  `themes/_quasar-overrides.scss` força, *unlayered* e com `!important`:
  - `.q-field__label { color: var(--dss-text-secondary) !important }`
  - `.q-input__native, .q-textarea__native { color: var(--dss-text-body) !important }`
  → Em componente **QField-based**, qualquer cor de **label** que você precise mudar
  num variant **exige `!important`**. `themes` carrega **antes** de `components`
  (`packages/core/index.scss`), então `!important` do componente vence por **ordem**.
  *(Sintoma real: label do standout do Select ficava cinza; o Input não, por usar
  `.dss-input__label`.)*

- **A3 — `!important` cirúrgico (anti-reflexo).** Aplique `!important` **só onde o
  override global existe** (label). **NUNCA no `native`** de QField-based:
  `.q-field__native` **não** é alvo do override, e no dark o `_states` corrige a cor
  do native **sem** `!important` — um `!important` ali **quebraria o dark** (forçaria
  `text-inverse` = escuro → texto sumiria). Ver C1.

---

## B. Dark mode — backgrounds das variantes (calibrar contra o "stage")

> No dark, o fundo **atrás** do campo é `--dss-surface-subtle = gray-700` (#525252).
> Calibre cada variante **contra esse cinza**, não contra o preto.

- **B1 — standout (destaque) = `gray-900`.** Mais escuro que o stage → "salta" como
  chip escuro (espelha o light). ❌ `gray-700` = **mesma cor do stage** → some / parece
  "claro". *(Sintoma: standout do Select/Input/Textarea sumia no dark.)*
- **B2 — filled (discreto) = `gray-600`.** Um tom **mais claro** que o stage → lê como
  "preenchido". ❌ `gray-900` = preto → some no fundo.
- **B3 — hover SEMPRE ≠ repouso no dark.** Se o repouso dark e o hover (L3) caem na
  mesma cor, o hover fica **invisível**:
  - outlined: repouso `gray-600` → **hover `gray-400`** (override dark obrigatório).
  - standout: repouso `gray-900` → **hover `gray-800`**.

---

## C. Tokens de texto — armadilhas de tema

- **C1 — `--dss-text-inverse` inverte de sentido no dark.** Light = `gray-50` (#fff);
  **dark = `gray-900` (ESCURO)**. → Nunca use `text-inverse` para texto/valor que
  precisa ser claro no dark. Para **native claro no dark** use `text-body`
  (= gray-200 no dark). O `_states` de cada campo já faz `.q-field__native { color:
  text-body }` no dark — não anule com `!important` (A3).
- **C2 — `--dss-text-inverse-secondary` é estável.** = `gray-100` (#fafafa) em **ambos**
  os temas (não redefinido no dark) → **seguro** para label sobre fundo escuro
  (standout/dark). Use-o (com `!important` em QField-based — A2).
- **C3 — Escala de erro inexistente.** `--dss-error-600/900` **não existem** → declarações
  caem para *transparente* (borderless/standout perdiam o anel de erro). Use
  **`--dss-feedback-error`**.

---

## D. Variante standout (padrão da família de campo)

- **D1 — Light = chip de alto contraste.** Fundo escuro `gray-800` + texto inverso.
  ❌ Fundo claro `gray-100` → fica **idêntico ao borderless**.
- **D2 — Cores de texto do standout:** native = `text-inverse` (light) / `text-body`
  (dark, via _states); **label = `text-inverse-secondary !important`** (A2);
  placeholder = `text-inverse-hint`; prepend/append = `text-inverse-secondary`.
- **D3 — Golden reference = DssInput standout.** Espelhe-o nos QField-based.

---

## E. Específicos de campo QField-based (placeholder, chips, prepend, altura)

- **E1 — Placeholder no QSelect.** O `<input>` (portador do `placeholder`) só é
  renderizado com `use-input`. Em **select de seleção pura**, exiba o placeholder
  via **`display-value`** quando vazio + classe de cor *hint* (light **e** dark).
  QInput/QTextarea mostram placeholder nativo — não precisa.
- **E2 — `use-chips` usa QChip do Quasar** (não DssChip). Reduzir altura para não
  cobrir a label: `--dss-compact-control-height-xs` (≈ QChip dense − 4px).
- **E3 — Espaçamento de slots internos.** prepend: **4px da borda + 4px do texto**
  (`.q-field__control:has(.q-field__prepend) { padding-left: spacing-1 }` +
  `.q-field__prepend { padding-right: spacing-1 }`). before: `padding-right` ≥ spacing-1.
- **E4 — Altura.** `--dss-input-height-min` indefinido → `min-height` vira no-op; a
  altura real vem da **`.q-field__marginal`** do Quasar (56/40px). Alinhe a marginal
  ao token-alvo (44/36px).
- **E5 — Radius do outlined = `--dss-radius-sm`** (cantos sóbrios, golden DssInput).
  `radius-md` = fora do padrão. **Gate:** `validate:field-conventions`.
- **E6 — Foco do outlined SEM `box-shadow`.** O anel de 1px duplica a borda; o foco
  é só `border-width: md`. **Gate:** `validate:field-conventions`. *(Botões PODEM ter
  shadow no foco — a regra é da família de campo.)*
- **E7 — Só tokens que existem.** `var(--dss-*)` sem definição no catálogo (ex.: o
  antigo `--dss-error-600`/`--dss-focus-ring`) resolve p/ vazio → estado/anel some.
  Usar `--dss-feedback-error*`. **Gate:** `validate:scss-tokens` (ratchet c/ baseline).
- **E8 — label × placeholder = padrão B (sem sobreposição em repouso).** Com **label E
  placeholder**, o label **flutua já em repouso** (assume o aspecto "selecionado") para o
  placeholder aparecer visível **sem colidir**. ❌ Não esconder o placeholder (estratégia A
  antiga), ❌ não deixar os dois centralizados sobrepostos. Mecanismo: QField-based → forçar
  `stack-label` quando `placeholder && label` (`computedStackLabel`); custom → classe `--float`
  incluindo `!!placeholder`. DssFile: o drop-hint É o placeholder (sempre presente) → label
  sempre flutua com label; o conteúdo desce (`align-items:flex-end` / `align-self`) p/ não colidir.
- **E9 — Base font-size + ícone de slot.** O **root** do campo seta `font-size:
  var(--dss-font-size-md)` **explícito** (senão herda um 14px acidental do ancestral).
  Ícone de prepend/append = **`--dss-font-size-xl` (20px)** uniforme na família (o `DssIcon`
  `inline` é `1em` → herda o contexto; ajuste o `font-size` do slot, não passe `size`).
  **Nunca emoji/glyph hardcoded** — só `<DssIcon>` (contrato de ícone). Confira posição/gap
  do ícone **igual aos irmãos** (custom vs Quasar têm padding estrutural diferente — meça).
- **E10 — slot `error` fiel ao `getBottom()` do Quasar.** Renderiza em
  `error && (errorMessage || slot)`; **`errorMessage` tem prioridade**, o **slot é o
  fallback** quando não há errorMessage. ❌ Não exigir `errorMessage` p/ o slot aparecer,
  ❌ não deixar o slot sobrepor o errorMessage. (Select/Textarea delegam ao QField = correto;
  Input/File reimplementam o bottom → espelhar o `getBottom`.)

---

## F. Estado disabled

- **F1 — Não empilhar opacity.** O DSS aplicava `opacity: .4` no wrapper × o
  `opacity: .6 !important` *layered* do Quasar no `[disabled]` = **0.24** (ilegível).
  → **Sem opacity no wrapper**; o fade vem da **cor desabilitada**
  (`--dss-text-disabled` = gray-600) + borda tracejada/fundo muted das variantes.

---

## G. Layout em grids/matrizes

- **G1 — min-width da raiz.** O campo tem `min-width: var(--dss-min-w-lg)` (≈240px) na
  raiz → **estoura células estreitas** (overlap na matriz). Em grids responsivos:
  `repeat(auto-fit, minmax(Xpx, 1fr))` + **`min-width: 0` na raiz real** do campo.
  ⚠️ Atenção ao H1 (a classe pode não chegar na raiz).

---

## H. inheritAttrs / onde a classe e `$attrs` aterrissam

- **H1 — Saber onde `v-bind="$attrs"` está.** Com `inheritAttrs: false`:
  - **DssSelect** repassa `$attrs` na **raiz** (QSelect) → classe externa chega na raiz.
  - **DssInput** repassa `$attrs` no **`<input>` interno** → classe externa cai no
    input, **não** na raiz que carrega o `min-width`.
  → Override de raiz via classe externa **pode não funcionar**; mire a **raiz real**
  (`.contexto > .dss-x`) com especificidade suficiente, em vez de depender da classe.

---

## I. Páginas de teste (sandbox) — escopo e HMR

- **I1 — Componentes funcionais (`render h()`) não recebem `data-v` de escopo.** Os
  filhos não casam o estilo *scoped* → um `<h2>` cai na regra **global do Quasar**
  (`h2 { font-size: 3.75rem }`). Use componentes reais (template) **ou** estilo
  **global** **ou** `:deep()`. *(Resolvido no template `playground/` via classes globais.)*
- **I2 — HMR no `/mnt/c` (WSL2) não dispara confiável.** `server.watch.usePolling`
  já está ligado; ainda assim, ao "ver bug" depois de editar, **hard-refresh
  (Ctrl+Shift+R) / restart do dev** antes de caçar no código. Evitar múltiplos
  `npm run dev` simultâneos (portas/servers stale).

---

## J. Anel de foco de teclado (`:focus-visible`) — próprio, no elemento VISÍVEL

> **WCAG 2.4.7.** O componente **declara seu próprio anel de foco** — não confie na regra
> global/Quasar (pode faltar ou ser sobrescrita). E7/E6 tratam a **borda** no foco; isto é
> o **outline externo** (o "anel"), coisa diferente.

- **J1 — Existe e é próprio.** Todo interativo tem `:focus-visible` com
  `outline: var(--dss-border-width-md) solid var(--dss-focus-primary)` + `outline-offset:
  var(--dss-spacing-1)`. *(Achado: Checkbox/Radio/Toggle/Field/Range/Slider e o DssFile não
  declaravam — dependiam da global.)*
- **J2 — Mora no elemento VISÍVEL, não num overlay.** Onde o alvo focável é interno/transparente
  (ex.: DssFile = controle do QFile dentro de overlay `opacity:0`), o `:focus-visible` do overlay
  **não aparece**. Escopar o outline no elemento visível:
  `.dss-x:has(.overlay :focus-visible) .dss-x__field { outline… }`. Escopar ao focável real
  (não ao botão limpar, que tem o próprio `:focus-visible`).
- **J3 — Cor do anel = `--dss-focus-primary`** (brand-aware, ver K). É a mesma via do brand no foco.

---

## K. Brand pela PROP `brand` (não só pelo `[data-brand]` ancestral)

> **Sintoma:** o brand vindo de um `[data-brand]` **ancestral** (seletor "global" da página)
> coloria a borda/anel de foco, mas o **`brand` como prop** (seletor "interno") **não** — a
> **classe** `.dss-x--brand-*` **não remapeia** `--dss-action-primary`/`--dss-focus-primary`.

- **K1 — div-rooted (Input/File/Field): `:data-brand` no root.** A prop emite
  `:data-brand="brand || undefined"` no elemento raiz → remapeia os tokens de brand na subárvore
  (borda via `--dss-action-primary`, anel via `--dss-focus-primary`). É a **norma DSS**
  (precedente DssCheckbox/DssChip/DssRadio).
- **K2 — Quasar-rooted (Select/Textarea): a CLASSE aliasa o token.** O Quasar roteia o atributo
  `data-brand` p/ o native interno (não fica ancestral do `.q-field__control`) → o `:data-brand`
  no root **não** serve. Aliasar `.dss-x--brand-*` aos blocos `[data-brand]` do `_focus.scss`
  (lar dos rgba de foco — sem hardcode em componente), remapeando `--dss-focus-primary` pela classe.
- **K3 — Dark do brand pela classe = seletor DESCENDENTE.** `&[data-theme=dark]` aninhado exige
  `data-theme` co-locado; ele mora no `body`. Usar `[data-theme="dark"] .dss-x--brand-*` (descendente).
- **K4 — Verificar pela PROP, não só pelo ancestral.** No Preview Frame, teste o **knob `brand`**
  (interno) — não só o brand global da página. Ambos devem colorir borda **e** anel de foco.

---

## Gate de adequação (marcar por componente — LIGHT e DARK)

- [ ] **standout (light)** distinto do borderless (chip escuro `gray-800` + texto inverso)
- [ ] **standout (dark)** destaca (`gray-900`, não some no stage)
- [ ] **filled (dark)** não-preto (`gray-600`)
- [ ] **hover perceptível** em todas as variantes (outlined `gray-400`, standout `gray-800` no dark)
- [ ] **label do standout** near-white (`text-inverse-secondary`) — com `!important` se QField-based
- [ ] **texto/valor legível no dark** (`text-body`; nunca `text-inverse` no native)
- [ ] **erro** com `--dss-feedback-error` (não `--dss-error-*`)
- [ ] **disabled** legível (sem empilhar opacity; cor `text-disabled`)
- [ ] **placeholder** visível (`display-value` se select de seleção pura)
- [ ] **label × placeholder**: label flutua em repouso quando há placeholder — sem sobreposição (E8)
- [ ] **prepend/before/chips** com espaçamento correto (E2/E3)
- [ ] **ícone de slot** = 20px, sem glyph hardcoded (DssIcon); posição/gap **iguais aos irmãos** (E9)
- [ ] **slot `error`** fiel ao Quasar: renderiza sem errorMessage; errorMessage tem prioridade (E10)
- [ ] **anel de foco `:focus-visible`** próprio, no elemento visível (não overlay, não só a global) (J)
- [ ] **brand pela PROP** colore borda + anel de foco (knob interno, não só `[data-brand]` global) (K)
- [ ] **sem overflow** em grid/matriz (`min-width: 0` na raiz real)
- [ ] verificado **sem** `!important` reflexo (só onde há override global — A3)

---

## Propagação pós-ajuste (cadeia de fonte única)

Depois de adequar o visual, a maior parte da cadeia propaga **sozinha no `git commit`**
(pre-commit): contrato `dss.contract.json` (§8, deriva `visual.states` do CSS compilado),
`catalog.json` (§3b), `DSS_REFERENCIA_VISUAL_ANALISE.md` (§3) e tokens do portal (§1b).
Não precisa rodar à mão — mas confira o resultado.

Passos que **NÃO** são automáticos (rodar/revisar por componente):

- [ ] **`npm run sync:token-values`** — se um token **dimensional** (px/ms/%) mudou de valor,
  mantém o campo `value` de `meta.visualProperties` honesto. (Cor tem `value: null` — não drifta.)
- [ ] **Revisar `meta.visualProperties`** (curatorial) — **só** se você ADICIONOU/REMOVEU/RENOMEOU
  um token documentado. O gate **não pega** essa drift: o validador não distingue "token aplicado
  via classe Quasar (`bg-primary`)" de "token removido" — mesma cegueira do contrato. Curadoria humana.
- [ ] **`meta.a11y`** — se o ajuste mexeu em **contraste / focus ring / touch target**, reverificar os
  claims `wcag[].verifiedBy` (o gate do contrato **reprova** âncora que não passa; não declarar o que
  não fecha — ex.: contraste real medível via `scripts/wcag-kit.mjs`).
- [ ] **Emitir/conferir o contrato:** `node scripts/emit-contract.mjs <Dss> --write` deve dar
  `✅ schema · 0 gaps · 0 âncora reprovada` (o §8 do hook já faz no commit — este passo é para ver antes).

> **Divisão de verdade:** o **contrato** (`visual.states`) é a verdade-máquina auto-derivada do CSS;
> `meta.visualProperties` é a camada **CURADA complementar** (inclui tokens aplicados via Quasar que o
> contrato não enxerga). Ambos existem por razões diferentes — não são redundantes.

*(Aplica-se também aos compostos — ver `DSS_UI_ADEQUACAO_CHECKLIST_COMPOSTOS.md`, que herda este passo.)*

---

## Validação visual final (Preview Frame) — **premissa de fechamento**

> **Esta é a etapa que FECHA a adequação.** O visual só está adequado quando o
> componente renderiza **fiel** no **Preview Frame** (`apps/sandbox/src/preview/`),
> o validador durável da cadeia de fonte única: `<iframe>` sobre o **SFC real** +
> knobs **derivados do `dss.contract.json`** — nunca reimplementação. É o mesmo
> contrato de derivação da [`COMPONENT_PAGE_STRUCTURE.md`](../specs/COMPONENT_PAGE_STRUCTURE.md) §4
> (preview = iframe sobre o componente real). O iframe é a **barreira** que contém
> overlays teleportados (veredito do spike de isolamento).
>
> **Pré-requisito:** o passo anterior (contrato emitido) rodou — o Preview Frame **consome** o contrato.

**Como rodar:** `npm run dev` em `apps/sandbox` → aba **"Preview Frame · Dss‹Nome›"**
(ou direto `/?frame=Dss‹Nome›` para inspecionar só o realm do iframe). Para habilitar um
componente novo: registrar a aba em `TestSuite.vue` (nav + `<PreviewFrame component="Dss‹Nome›" />`);
se for `composed/`, confirmar que os globs do Preview Frame o alcançam (`{base,composed}`).

**Gate visual final (marcar por componente — LIGHT e DARK):**

- [ ] **SFC real** monta no iframe (`.dss-‹nome›` presente; **não** o fallback "não encontrado")
- [ ] **Zero erros/warnings** no console do iframe
- [ ] Knobs **derivados do contrato** — nº de controles = nº de props do contrato (sem knob fantasma nem omissão)
- [ ] Mexer num knob → o **componente real reage** dentro do iframe; o **snippet** reflete o estado das props
- [ ] **LIGHT e DARK** corretos dentro do iframe (superfície calibrada contra o stage — B)
- [ ] **Brand** propaga pelo **ancestral `[data-brand]`** (global da página) **E pela prop `brand`** (knob interno) — os dois colorem borda + anel de foco (K)
- [ ] **Foco de teclado** (Tab) mostra o **anel `:focus-visible`** no elemento visível (J)
- [ ] **Medir, não presumir** — leia os **estilos computados** no iframe (chrome-devtools) e confira a paridade com os **irmãos** da família: tamanho/posição do ícone, gap ícone↔texto, altura do campo, geometria do anel de foco

> Só depois deste gate a adequação está **fechada** e o componente fica elegível ao selo (Definition of Done do `CLAUDE.md`).

---

## Página do componente (portal docs) — aplicar o template

> **A adequação NÃO termina no Preview Frame.** Ela também **ajusta/cria a página do
> componente** em `apps/docs-portal/src/pages/components/Dss‹Nome›Page.tsx`, aplicando o
> template **`docs/specs/COMPONENT_PAGE_STRUCTURE.md`**. Referência já desenvolvida:
> **`DssInputPage.tsx` / `DssButtonPage.tsx`** (golden). O Preview Frame é o validador ao
> vivo do SFC real; a **página** é a documentação/showcase pública — deriva do contrato (mesma
> cadeia de fonte única), **não se inventa** estado/prop/token.

**Gate da página (marcar por componente):**

- [ ] **Página existe** e segue a **Hierarquia Oficial de Seções** do template: badges de metadados ·
  título/descrição · quando usar/quando NÃO · playground · **estados interativos** · **anatomia 4 camadas** ·
  seções técnicas 7.1 props/eventos · 7.2 slots · 7.3 tokens · 7.4 a11y WCAG · anti-patterns · vinculantes · referências.
- [ ] **Estados/props/tokens/a11y** da página **batem com o contrato/meta** (derivação, não invenção — mesmo contrato do Preview Frame).
- [ ] **Visual da página reflete a adequação** (as correções de UI aparecem na página, não uma versão velha).

---

## Predição — DssTextarea (QField-based: reproduz tudo de A–E)

Estado atual (a corrigir, igual ao Select pré-fix):
- `3-variants/_standout.scss`: bg light `gray-100` → trocar para `gray-800` + texto
  inverso + `label !important`.
- `4-output/_states.scss` (dark): standout `gray-700` → **`gray-900`** (+ hover `gray-800`);
  filled `gray-900` → **`gray-600`**; **adicionar hover dark do outlined (`gray-400`)**.
- Conferir placeholder (QTextarea mostra nativo — provavelmente OK), disabled (F1 já
  aplicado no `_base.scss`), e a paridade de label do standout (A2 → `!important`).
