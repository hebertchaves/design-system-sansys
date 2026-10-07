# DssSectionTitle — API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `label` | `string` | `undefined` | Texto do título. O slot `default` tem precedência |
| `level` | `1 \| 2 \| 3 \| 4` | `2` | Nível semântico — vira a tag `<h1>`…`<h4>` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho visual, independente do nível |
| `accent` | `'brand' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'brand'` | Cor do traço |
| `brand` | `'hub' \| 'water' \| 'waste'` | `undefined` | Remapeia `--dss-action-primary` no escopo local |

## Slots

| Slot | Descrição |
|---|---|
| `default` | Conteúdo do título. Precedência sobre `label` |

## Events

Nenhum. O título não é interativo.

## Props deliberadamente ausentes

| Prop | Por que não existe | Alternativa |
|---|---|---|
| `color` | Cor livre abriria a porta para traço fora da paleta | `accent` |
| `underlineWidth` | O traço tem a largura do TEXTO — é o que o faz acento, não régua | `DssSeparator` |
| `align` | Alinhamento é responsabilidade do container | CSS do pai |

## Tokens

| Token | Camada | Uso |
|---|---|---|
| `--dss-section-title-rule-gap` | L2 | Distância texto↔traço — 2px, medido |
| `--dss-border-width-md` | L2 | Espessura do traço |
| `--dss-action-primary` | L2 | Cor em `accent="brand"` |
| `--dss-feedback-info` / `-success` / `-warning` / `-error` | L3 | Cor nas variantes de estado |
| `--dss-font-family-sans` | L2 | Família |
| `--dss-font-weight-semibold` | L2 | Peso |
| `--dss-font-size-sm` / `-md` / `-lg` | L3 | Tamanhos |
| `--dss-line-height-tight` | L2 | Entrelinha — parte da conta do respiro |
| `--dss-text-primary` | L2 | Cor do texto |
| `--dss-text-body` | L4 | Cor em `@media print` |
| `--dss-hub-600` / `--dss-water-500` / `--dss-waste-600` | L4 | Remapeamento por `brand` |
