# Adequação de UI — onda Check-in NFAg / Grid Master

> **Escopo:** os componentes consumidos pelas duas telas desta atividade
> (`TestCheckinNFAg.vue` e `TestGridMasterDashboard.vue`) que ainda não tinham adequação fechada.
> **Norma:** [`DSS_UI_ADEQUACAO_CHECKLIST.md`](../governance/DSS_UI_ADEQUACAO_CHECKLIST.md) ·
> **Critério de fechado:** página Playground **e** Preview Frame **e** o frame com o que renderizar
> — derivado do disco por `npm run build:adequacao-status`, não declarado à mão.

**Placar: 23 → 35 componentes com adequação fechada** (de 88 das Fases 1 e 2).

Antes de começar, o quadro `DSS_ESTADO_ADEQUACAO_UI.md` estava **defasado em relação ao disco**:
`DssIcon`, `DssList` e `DssToolbar` apareciam como ⬜ e já estavam fechados. `--check` acusou,
regenerei. Isso corrige para menos o número que eu havia reportado antes (11 pendentes entre os
usados, não 5 — e dois deles já estavam prontos).

---

## 1. A sequência, e por que esta

Quatro blocos, em ordem de **quanto o defeito degradava as telas da atividade**:

| # | Bloco | Componentes | Critério |
|---|---|---|---|
| 1 | **Defeitos medidos** | `DssLinearProgress` → `DssBanner` → `DssBreadcrumbsEl` | Bugs que degradavam as telas AGORA. Banner e BreadcrumbsEl têm a **mesma causa** (contrato de ícone) — feitos em sequência, fix idêntico |
| 2 | **O que a tela reimplementou** | `DssMarkupTable` → `DssExpansionItem` | Cabeçalho e header de ênfase que a página teve de desenhar sozinha |
| 3 | **Só faltava artefato** | `DssTooltip` · `DssSeparator` · `DssCard` · `DssBadge` | Sem defeito de CSS: 🟡/⬜ → ✅ aplicando o template Playground |
| 4 | **Estrutura de página** | `DssLayout` · `DssPageContainer` · `DssPage` | Trio indivisível, sem visual próprio — adequados juntos, por último |

O princípio: **primeiro o que muda pixel na tela, depois o que só preenche artefato.** Blocos 1 e 2
alteram CSS do componente e melhoram as duas telas sem tocar nelas; blocos 3 e 4 não mudam
renderização nenhuma.

`DssSeparator` entrou de carona: `TestSeparatorTooltip.vue` cobria **dois** componentes num arquivo
só, e o quadro é derivado do nome do arquivo — nenhum dos dois pontuava. Dividir em
`TestSeparator.vue` + `TestTooltip.vue` fechou os dois.

---

## 2. O que foi corrigido, por componente

### Bloco 1 — defeitos medidos

**`DssLinearProgress` — a prop `color` era inerte em produção**

O `4-output/_brands.scss` pintava `.q-linear-progress__model` direto, com especificidade `(0,3,0)`,
e vencia a regra de cor `(0,2,0)`. Dentro de qualquer `[data-brand]` — isto é, **toda tela Sansys** —
`color="error"` renderizava azul-marca.

Forma canônica aplicada (§K5): a rota de brand **remapeia `--dss-action-primary`**; quem pinta é
`3-variants/_colors.scss`, que já consumia o token semântico. A rota ancestral perdeu a regra do
componente — `tokens/brand/_water.scss` já remapeia o token e o valor desce por herança. O mesmo
tratamento no bloco dark de `_states.scss`, onde a rota ancestral **continua necessária** porque
`themes/dark/_colors.scss` mantém `--dss-action-primary` no valor do claro.

*Medido no navegador, na tela de Check-in:* barra passou de `rgb(14,136,228)` (`--dss-water-500`)
para `rgb(216,24,46)` (`--dss-feedback-error`). **A tela melhorou sem uma linha de mudança nela.**

**`DssBanner` e `DssBreadcrumbsEl` — violavam o contrato de ícone do próprio DSS**

Os dois compunham `DssIcon` com `aria-hidden="true"` solto em vez da prop `decorative` que o
CCI §2.1 exige. O resultado de acessibilidade estava certo (o ícone era ocultado), mas o `DssIcon`
advertia no console **a cada renderização** — e console limpo é item do gate de fechamento.
Medido: 2 banners na tela de Check-in → 2 avisos; 3 breadcrumbs no Grid Master → 3 avisos.

Corrigidos. Varredura no resto do catálogo: **nenhum outro componente** tinha o mesmo defeito.

### Bloco 2 — o que a tela reimplementou

**`DssMarkupTable` — o comentário mentia sobre a brandabilidade**

O `_brands.scss` afirmava suportar *"1. Herança de contexto: `<div data-brand="hub">`"*. Não suporta:
**as duas alternativas do seletor exigem a classe** `.dss-markup-table--brand-*`, que só existe com a
prop. `[data-brand]` sozinho nunca pintou nada.

O **código está certo** — é o padrão de superfície, o mesmo do `DssToolbar` (já adequado): tabela
dentro de página brandeada não deve virar colorida sozinha. O comentário é que estava errado, e era
a única fonte que dizia o contrário. Corrigido, e a seção 04 do `TestMarkupTable.vue` põe as duas
rotas lado a lado para que a afirmação seja **verificável**, não confiável.

**`DssExpansionItem` — `outline-offset: -2px` cru**

Hardcode direto (Constituição #1), num anel de foco. Trocado por
`calc(var(--dss-focus-ring-offset) * -1)`. O anel é desenhado por dentro de propósito: o header ocupa
a largura toda e um offset positivo sairia do card.

### Bloco 3 — artefato, e os seeds que faziam o frame mentir

**`DssBanner` — duas falhas no `defaultPreview`**

- `demoSlots.action` (singular) não casava com nenhum slot do contrato (`default`, `avatar`, `actions`).
  O botão semeado nunca aparecia; o frame mostrava o *placeholder* «actions».
- `props.inline: true` — **prop que não existe**. A prop é `inlineActions`.

Ambos corrigidos, contrato reemitido.

**`DssTooltip` — o seed montava invisível.** Sem `visible`, o componente renderiza markup que nunca
aparece (é decisão de governança: a visibilidade é do consumidor). O frame montava casca. Seed ganhou
`visible: true`.

**`DssSeparator` — sem seed nenhum** (`props: {}`, `slots: null`). Ganhou `color`/`size`/`spaced`.

**`DssBadge` — dois hardcodes**

- `floating`: `top/right: -8px` → `calc(var(--dss-spacing-2) * -1)`.
- `outline`: 4 compensações de borda em `- 1px` → `- var(--dss-border-width-thin)`.

**`DssCard`** — sem defeito de CSS. A página de 530 linhas em HTML ad-hoc foi **substituída** (não
adaptada) pelo template Playground, cobrindo os mesmos 11 aspectos em 7 seções.

**`DssMarkupTable.example.vue` e `DssSeparator.example.vue` — dois defeitos que só aparecem quando o exemplo é renderizado**

O template Playground importa o `.example.vue` do componente na última seção. Isso fez aparecer:

- `DssMarkupTable.example.vue` usava `<DssMarkupTable>` e `<DssBadge>` **sem importar** — as tags
  caíam como custom-element e o exemplo não renderizava. É exatamente a regressão que o gate
  `validate:sandbox-tags` existe para pegar, mas ele **só varre `apps/sandbox`**.
- `DssSeparator.example.vue` passava `aria-hidden="true"` (string) a uma prop **Boolean** —
  `[Vue warn] Invalid prop: type check failed`. Corrigido para `:aria-hidden="true"`.

### Bloco 4 — estrutura

**`DssPageContainer.example.vue` — exceção vencida.** O exemplo usava `<q-page>` cru (3×) sob a
exceção *"EXC-02: DssPage ainda não existe (compositionFuture)"*. A premissa não vale mais: o
`DssPage` é componente selado das Fases 1/2. Quasar cru onde há equivalente DSS é violação de
composição (R1 do ui-rules) — trocado por `DssPage`, exceção removida.

Fora isso, sem defeito de CSS nos três. O que a adequação acrescentou foi **tornar o contrato de aninhamento
visível**: a seção 01 do `TestLayout.vue` mostra que fora do `DssLayout` o `DssHeader` **não entra no
DOM** — sem erro de Vue, sem tela em branco. Foi o primeiro defeito encontrado ao montar o Check-in.

---

## 2-bis. O achado maior: o Preview Frame não conseguia montar componentes de contexto

O `PreviewSubject.vue` montava o SFC alvo num `div` nu. Sete componentes **não podem** ser montados
assim — o Quasar exige ancestral: `QHeader`, `QFooter`, `QDrawer` e `QPageContainer` precisam de
`QLayout`; `QPage` precisa, além do layout, de um `QPageContainer`.

O sintoma era mudo pelo lado errado: no palco nu esses componentes **não renderizavam nada**, e o erro
do Quasar ia para o console **do iframe** — que não aparece no console da página. O frame do
`DssHeader` atestava "o componente monta" sobre uma moldura vazia, e o `DssHeader` está marcado como
adequado desde abril. Demorei a achar porque meu próprio patch de `console.error` cobria só a janela
de cima; a mensagem vivia no outro realm.

**Correção:** hospedeiro mínimo, decidido por componente (lista explícita — heurística aqui erra em
silêncio, e o sintoma de erro é idêntico ao de componente inexistente):

| Componente | Hospedeiro |
|---|---|
| `DssHeader` · `DssFooter` · `DssDrawer` · `DssPageContainer` | `DssLayout container` |
| `DssPage` · `DssPageSticky` · `DssPageScroller` | `DssLayout container` › `DssPageContainer` |
| todo o resto | palco nu (passthrough sem elemento no DOM) |

*Medido:* `?frame=DssPage` → `.q-layout`, `.q-page-container`, `.q-page` e `.dss-page` presentes,
**console vazio**. `?frame=DssHeader` → `.dss-header` e `.q-header` presentes (antes: nada).
`?frame=DssChip` → `.dss-chip` presente e **sem** `.q-layout` — o hospedeiro não custa nada a quem
não precisa dele.

Isto vale para além desta onda: são sete frames que atestavam moldura vazia.

---

## 2-ter. `DssButton` — botão de ícone renderizava como elipse (achado do usuário)

Reportado depois da onda, replicando em todo o sandbox: botões de ícone com margem
à direita desnecessária. Medido na app bar: **40×36** e **56×36** onde deveria ser
círculo. Três causas somadas, todas no `DssButton` (que está ✅ adequado e selado):

1. **Detecção.** `hasDefaultSlot = !!slots.default` contava como rótulo qualquer
   conteúdo do slot — inclusive `DssTooltip`/`DssMenu`/`DssPopupProxy`/`DssBadge`,
   que **não desenham texto**. `<DssButton icon><DssTooltip/></DssButton>` perdia
   `--icon-only` e caía no `min-width: 56px`. Passa a inspecionar os vnodes.
2. **Padding.** `.dss-button--icon-only` e `.dss-button--sm` têm a mesma
   especificidade; a regra de tamanho vem depois e vencia por ordem de arquivo.
   O `padding-inline` foi reposto nos 5 pares compostos, que já existiam.
3. **Gap.** O `<span>` de rótulo continua renderizando (carrega o `q-anchor--skip`
   de que o `DssMenu` precisa) e o `gap: 8px` o separava do ícone mesmo vazio.
4. **Estiramento pelo host.** Um flex container com `align-items: stretch` achatava o
   círculo no OUTRO eixo — medido em `TestAtenderSolicitacoes`: 36×40. Corrigido com
   `align-self: center` em `.dss-button--round:not(.dss-button--stretch)`.

*Resultado medido* em 5 páginas do sandbox: Atender Solicitações 18/18, Parcelamento
26/26, Check-in NFAg 3/3, Grid Master 10/10 — todos quadrados (app bar 36×36, `md`
44×44, alvo WCAG 2.5.5). Botões com rótulo inalterados.

**Resta 1 item, de página, não do componente:** em `TestParcelamentoClaude.vue` três
botões seguem 40×36. Ali o componente está comprovadamente correto — token
`--dss-touch-target-sm` resolve 36px, `padding-inline` 8/8, `gap` 0 — e o
`min-width: 40px` vem do contexto da página, cuja regra não consegui isolar pela
enumeração de `document.styleSheets`. Fica como item separado. 103 testes do `DssButton` passam. Contrato reemitido — diverge só nos
tokens de CSS; **nenhuma prop, slot ou evento mudou**.

> ⚠️ **`DssButton` é selado.** A mudança é de comportamento visual e entra na fila de
> reemissão de selo — quem constrói não sela (CLAUDE.md).

---

## 2-quater. Menu fantasma do sandbox

Reportado pelo usuário: *"por que o menu está criando uma página para IconButton,
se nem é componente DSS?"*. Não é — e a pergunta abriu um buraco maior.

`DssIconButton` **nunca existiu**: não está no catálogo nem no índice de selados. O
item entrou no commit `44503831` (*"Higienização e auditoria do DSS"*, 30/05/2026),
escrito como menu de um catálogo **planejado**, nunca derivado do disco. Clicar nele
deixava a área de conteúdo **vazia** — sem erro, sem fallback.

Medido: **59 itens de menu para 49 blocos de view**. Dez clicavam e não renderizavam
nada, e quatro nomeavam componentes inexistentes.

| Item | Situação | Ação |
|---|---|---|
| `alert` · `container` · `grid` · `icon-button` | nomeiam componente que **não existe** | removidos |
| `colors` · `typography` · `spacing` · `dashboards` · `login` | páginas nunca escritas | removidos |
| `table` | **`DssTable` existe** (`composed/`), faltava só a view | ligado |

E a prosa repetia o fantasma. A doc do **próprio `DssButton`** mandava *"Considere
`DssIconButton` para economizar espaço"* — e, na linha seguinte, `DssButtonGroup`,
que também não existe (o real é `DssBtnGroup`). Mais duas menções nos pre-prompts de
banner e date-picker. Todas corrigidas, e o `DssButton.md` ganhou uma seção dizendo
qual é a forma real: o próprio `DssButton` com `icon` e sem `label`.

### `DssTable` estava isento do gate por ausência

Ao ligar a view, descobri que o `DssTable` **não tinha `dss.contract.json`** — e a
linha 65 do `emit-contract.mjs` mostra por quê o gate nunca reclamou:

```js
if (e.isDirectory() && exists(path.join(base, e.name, 'dss.contract.json'))) out.push(e.name)
```

`--all` só varre pastas **que já têm contrato**. Componente sem contrato não é
reprovado: é invisível. **Outros 10 compostos estão nesse estado** — `DssBottomSheet`,
`DssCarousel`, `DssChatMessage`, `DssColorPicker`, `DssDatePicker`, `DssDialog`,
`DssForm`, `DssPopupEdit`, `DssTimePicker` e `DssTestPageComplexity`.

O meta do `DssTable` também não tinha `classification`, `tagline` nem bloco `a11y` —
o backfill que a Definition of Done exige. Preenchido com claims que as âncoras de
fato provam: 1.4.3 por contraste calculado dos tokens reais do componente
(`--dss-text-body` sobre `--dss-surface-default`) e 1.3.1 ancorado no `DssTable.test.js`.
O gate global passou de **80 para 81** componentes.

### Gate novo: `validate:sandbox-nav`

O menu é mantido à mão — é a mesma lição que o `build-adequacao-status.cjs` já
documenta no próprio cabeçalho ("números escritos à mão sobre uma fila que anda toda
semana envelhecem sem avisar"), só que lá foi aplicada e aqui não.

`scripts/validate-sandbox-nav.cjs` cobra duas regras: **(1)** todo item de menu tem
bloco de view; **(2)** todo rótulo que nomeia um `Dss*` corresponde a componente real
em `components/{base,composed,stress-test}`. Itens cujo rótulo não nomeia componente
(fundação, patterns) respondem só pela regra 1. Subcomponentes sem pasta própria
(`DssCardSection`) entram no catálogo via `1-structure/` — o mesmo ponto cego que fez
o `validate_composition` chamá-lo de inexistente.

Registrado em `npm run validate:sandbox-nav` e no `pre-commit` (bloco 6a).
**Provado que reprova:** reintroduzi o item `DssIconButton` e o gate acusou as duas
regras e saiu com `exit=1`; revertido, voltou a `exit=0`.

---

## 3. Gate da página (§ "Página do componente")

| Componente | Página `Test*.vue` | `PlaygroundLayout` | Seções | Componente real | `.example.vue` |
|---|---|---|---|---|---|
| `DssLinearProgress` | criada | ✔ | 7 | ✔ | ✔ |
| `DssBanner` | criada | ✔ | 6 | ✔ | ✔ |
| `DssBreadcrumbsEl` | criada | ✔ | 6 | ✔ | ✔ |
| `DssMarkupTable` | criada | ✔ | 6 | ✔ | ✔ |
| `DssExpansionItem` | criada | ✔ | 6 | ✔ | ✔ |
| `DssTooltip` | criada (split) | ✔ | 6 | ✔ | ✔ |
| `DssSeparator` | criada (split) | ✔ | 5 | ✔ | ✔ |
| `DssCard` | substituída | ✔ | 7 | ✔ | ✔ |
| `DssBadge` | substituída | ✔ | 6 | ✔ | ✔ |
| `DssLayout` | criada | ✔ | 3 | ✔ | ✔ |
| `DssPageContainer` | criada | ✔ | 3 | ✔ | ✔ |
| `DssPage` | criada | ✔ | 4 | ✔ | ✔ |

Todas ligadas no `TestSuite.vue` (import + nav + bloco de view).

---

## 4. Achados fora do escopo desta onda

Encontrados ao rodar o gate; **não corrigidos**, por serem de componentes que esta atividade não usa.

| Achado | Onde | Por que importa |
|---|---|---|
| `DssLayout.example.vue` é **100% Quasar cru por dentro** | `q-page-container`, `q-page`, `q-toolbar`, `q-toolbar-title`, `q-btn`, `q-list`, `q-item*`, `q-icon` — todos com equivalente DSS. O arquivo importa `DssLayout`/`DssHeader`/`DssFooter`/`DssDrawer` e usa Quasar para todo o resto | O exemplo do componente de layout não demonstra a família DSS. Trocar é mecânico mas mexe em 8 tags e pede verificação visual própria |
| `.example.vue` usa tags `Dss*` **sem importar** | `DssList` (DssIcon, DssSeparator) · `DssScrollArea` · `DssSplitter` · `DssForm` (8 tags) | Mesma regressão que o gate `validate:sandbox-tags` existe para pegar — **mas ele só varre `apps/sandbox`**. O `.example.vue` do próprio componente é ponto cego, e a tag cai como custom-element: o exemplo não renderiza. Encontrado porque o Playground importa o `.example.vue` na última seção. Sugestão: estender o escopo do gate a `packages/core/**/*.example.vue` |
| `rgba(255,255,255,.12/.15/.2/.06)` cru em bloco dark | `DssCard/_states.scss` · `DssMarkupTable/_states.scss` | Anotados como `EXC-01/02`, mas dark mode **não** é uma das exceções legítimas da Constituição #1 (media / fallback / forced-colors). Trocar exige verificação visual no escuro — cabe numa rodada própria |
| Sem paleta de **data-viz** | tokens | O donut do Grid Master usa `--dss-hub-600` (cor da marca Hub) como cor da categoria "Alta" numa tela do Water. Funciona e é semanticamente errado |
| Tokens de casca com **valor errado** para o Sansys | `--dss-layout-header-height` (64px, desenho pede 40) · `--dss-layout-sidebar-width-mini` (64px, rail é 52) · `--dss-gutter-*` (sem 20px) | Pior que não existir: o próximo agente usa o token achando que acertou |

---

## 5. Gates executados

```
validate:sandbox-tags --gate     ✅  36 páginas, nenhuma tag <Dss*> não-resolvida
build-adequacao-status --check   ✅  quadro em dia com o disco
emit-contract --all --strict     ✅  80 componentes, nenhum contrato inválido
validate:scss-tokens --gate      ✅  nenhum token fantasma novo
npx sass <cada módulo alterado>  ✅  compila limpo
```

Preview Frame, verificado por realm do iframe: `DssPage`, `DssHeader` e `DssChip` montam o SFC real,
console vazio.

Console do navegador, 12 páginas percorridas: **limpo** — sobra apenas o 404 do `favicon.ico`,
pré-existente. Os dois erros do Quasar que apareciam (`QHeader needs to be child of QLayout`,
`QPage needs to be child of QPageContainer`) vinham de **demos minhas** que montavam a composição
inválida de propósito para mostrar o defeito; foram trocadas por prosa. Demonstração não pode custar
um erro de console por renderização.
