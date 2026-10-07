# DssContainer — API Reference

> Derivado de `types/container.types.ts`. Em divergência, o tipo é a fonte.

## Props

### `size`
`'sm' | 'md' | 'lg' | 'xl' | 'fluid' | 'responsive'` · padrão `'lg'`

Teto de largura do trilho.

| Valor | Token | Valor |
|---|---|---|
| `sm` | `--dss-container-sm` | 608px |
| `md` | `--dss-container-md` | 960px |
| `lg` | `--dss-container-lg` | 1280px |
| `xl` | `--dss-container-xl` | 1600px |
| `fluid` | — | `max-width: none` |
| `responsive` | — | Acompanha o breakpoint: 608 → 960 (≥1024px) → 1280 (≥1440px) → 1600 (≥1920px) |

A escala vem da família de **grade** (`--dss-container-*`), não de
`--dss-layout-content-max-width` (720/960), que mira leitura de texto corrido.
Trilho de aplicação é mais largo que coluna de leitura.

### `padding`
`'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'` · padrão `'md'`

Respiro interno, da família `--dss-gutter-*` — a mesma régua da calha entre
colunas. Respiro e calha saindo de escalas diferentes dá dois ritmos na página.

| Valor | Token | Valor |
|---|---|---|
| `none` | `--dss-spacing-0` | 0 |
| `xs` | `--dss-gutter-xs` | 8px |
| `sm` | `--dss-gutter-sm` | 16px |
| `md` | `--dss-gutter-md` | 24px |
| `lg` | `--dss-gutter-lg` | 32px |
| `xl` | `--dss-gutter-xl` | 40px |

Abaixo de 640px, `lg` e `xl` caem para 16px (`4-output/_states.scss`).

### `gap`
`'none' | 'sm' | 'md' | 'lg' | 'xl'` · padrão `'none'`

Ritmo vertical entre os **filhos diretos**, da família `--dss-grid-gap-*`
(8 · 16 · 24 · 32px).

⚠️ Acima de `none`, o container passa a `display: flex; flex-direction: column`.
É deliberado: `gap` só existe em contexto flex ou grid. Em `none` o container
não impõe display nenhum — continua bloco comum, e quem quiser outro arranjo
declara por fora sem brigar.

### `centered`
`boolean` · padrão `true`

Aplica `margin-inline: auto`. Usa `margin-inline` e não `margin: 0 auto` porque
o atalho zeraria a margem vertical que o consumidor tenha posto por fora.

### `tag`
`string` · padrão `'div'`

Elemento renderizado. Existe para **semântica**: o trilho principal costuma ser
`main`, uma faixa dentro dele `section`. O componente não decide a estrutura do
documento pelo consumidor — é a âncora do claim WCAG 1.3.1.

### `brand`
`'hub' | 'water' | 'waste' | null` · padrão `null`

Emite `data-brand` no elemento raiz, o que remapeia `--dss-action-primary` e a
rampa inteira na subárvore (norma §K1 do checklist de adequação). O container
não pinta nada com isso — quem brandeia são os filhos.

A rota **ancestral** (`[data-brand]` num pai) funciona sozinha e não precisa
desta prop: os tokens já descem por herança.

## Slots

| Slot | Escopo | O que recebe |
|---|---|---|
| `default` | — | O conteúdo do trilho |

## Eventos

Nenhum. Container é estrutura, não controle.

## Notas de implementação

- `inheritAttrs: false` com repasse explícito de `$attrs` no root — classe
  externa soma às do componente em vez de substituir.
- Não envolve componente Quasar: não há equivalente. `QPage` é a superfície da
  página e depende do `QLayout`; o trilho de largura entre ele e o conteúdo não
  existe lá.
- Não declara `background` nem `color`. Container não é superfície.
