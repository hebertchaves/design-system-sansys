# Relatório de emissão de contratos — Grupo **Outros**

> Frente "a" do `HANDOFF_ESCALA_CONTRATOS.md` · 2026-07-02 @ `import/dss-v2.4.0`.
> Grupo heterogêneo (27) — tratado caso a caso.

## Placar
- **27/27** com `dss.contract.json` — schema ✅, 0 gaps, 0 âncoras a11y reprovadas.
- `node scripts/emit-contract.mjs --all --strict` → **exit 0** · **76/76 no repo** (missão da frente "a" completa).

## 1. Feito

| Componente | classification | a11y | role | âncoras principais |
|---|---|---|---|---|
| DssAjaxBar | Visual | 1 | progressbar | 1.3.1 test |
| DssAvatar | Visual | 2 | img | 4.1.2 aria · 1.1.1 |
| DssBanner | Visual | 2 | status | 1.4.3 · 1.3.1 |
| DssBar | Visual | 2 | — | 1.3.1 · 1.4.3 |
| DssCircularProgress | Visual | 1 | progressbar | 1.3.1 |
| DssExpansionItem | **Action** | 4 | button | 2.1.1 · 2.4.7 · 4.1.2 · 1.4.3 |
| DssFab | **Action** | 3 | button | 2.1.1 · 2.4.7 · 4.1.2 |
| DssFabAction | **Action** | 4 | button | 2.1.1 · 2.4.7 · 2.5.5 · 4.1.2 |
| DssImg | Visual | 1 | img | 1.1.1 test |
| DssInfiniteScroll | Visual | 1 | — | 1.3.1 |
| DssLinearProgress | Visual | 1 | progressbar | 1.3.1 |
| DssPageScroller | Visual | 1 | — | 1.3.1 |
| DssPageSticky | Visual | 1 | — | 1.3.1 |
| DssParallax | Visual | 1 | img | 1.1.1 test |
| DssPopupProxy | Visual | 1 | — | 1.3.1 |
| DssPullToRefresh | Visual | 1 | — | 1.3.1 |
| DssRating | **Action** | 2 | slider | 2.1.1 · 2.4.7 |
| DssResponsive | Visual | 1 | — | 1.3.1 |
| DssScrollArea | Visual | 1 | — | 1.3.1 |
| DssSkeleton | Visual | 1 | — (aria-hidden) | 1.3.1 |
| DssSlideItem | Visual | 1 | — | 1.3.1 |
| DssSplitter | **Action** | 3 | separator | 2.1.1 · 2.4.7 · 2.5.5 |
| DssTimeline | Visual | 2 | list | 1.3.1 · 1.4.3 |
| DssTimelineEntry | Visual | 2 | listitem | 1.4.3 · 1.3.1 |
| DssTree | **Action** | 3 | tree | 2.1.1 · 2.4.7 · 1.4.3 |
| DssVideo | Visual | 1 | — | 1.1.1 test |
| DssVirtualScroll | Visual | 1 | — | 1.3.1 |

`classification` normalizada para taxonomia; prosa/objeto/`null` anteriores preservados em
`classificationNote`. Contraste (1.4.3) **não** reivindicado onde o texto fica sobre superfície de
ação (DssFab/DssFabAction) — só âncoras `test`/`css-focus`/`aria`.

## 2. Não feito / adiado — nenhum.

## 3. Precisa de atenção — **mapeamento a revisar** (enum garante valor bem-formado, não a escolha)
- **DssSlideItem → Visual:** tem interação por **deslize** (sem teclado). Não é um controle de teclado
  clássico, então não virou Action; mas também não é puramente visual. **Revisar** (pode exigir
  categoria própria ou ajuste de a11y de gesto).
- **DssBanner → Visual:** a faixa é uma superfície de mensagem, mas expõe **dispensar/ações**
  interativas. Bucket Visual escolhido pela natureza de "notice"; confirmar.
- **Indicadores de progresso** (DssAjaxBar, DssCircularProgress, DssLinearProgress) → Visual com
  `role=progressbar`. a11y mínima (1.3.1) porque **não há prop aria** para ancorar valor; o valor real
  vem do QProgress subjacente. Ver §4.

## 4. Ajuste extra (fora de escopo — dívida de componente)
- **DssVideo — legendas/1.2.2:** o contrato reivindica só 1.1.1 (nome via `title`). Acessibilidade de
  mídia temporal (legendas, transcrição) **não** é coberta e é dívida real do componente.
- **Progressbars sem prop aria:** DssAjaxBar/DssCircularProgress/DssLinearProgress não expõem
  `aria-valuenow`/label tipado — dependem do QProgress. Se o valor não for anunciado, é dívida a11y a
  verificar na adequação de UI.
- **Âncora `1.1.1` via `test`** (DssImg/DssParallax/DssVideo/DssAvatar) pressupõe que o `test.js`
  cobre `alt`/`decorative`. Confirmar a cobertura real desses casos nos testes.
- **DssTree/DssRating/DssSplitter sem prop aria tipada:** a11y ancorada em `test`+`css`; os atributos
  `aria-*` (valuenow/expanded/selected) vêm do Quasar. Verificar que são realmente emitidos.
