# DssAppBar — API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `brand` | `'water' \| 'hub' \| 'waste'` | `undefined` | Marca do produto: pinta a barra (via DssToolbar) e resolve o logo (via `[data-brand]`) |
| `title` | `string` | `undefined` | Nome do módulo. Ausente, o divisor também não é renderizado |
| `density` | `'compact' \| 'standard'` | `'compact'` | Altura: 48px ou 64px |
| `menu` | `boolean` | `true` | Exibe o botão de menu à esquerda |
| `menuAriaLabel` | `string` | `'Abrir menu principal'` | Nome acessível do botão de menu |
| `elevated` | `boolean` | `true` | Sombra sob a barra |

## Events

| Evento | Payload | Quando |
|---|---|---|
| `menu` | — | Clique no botão de menu |

## Slots

| Slot | Escopo | Descrição |
|---|---|---|
| `brand` | — | Substitui o `DssBrandLogo` padrão |
| `title` | — | Substitui o texto do título |
| `actions` | — | Ações da direita |

## Props deliberadamente ausentes

| Prop | Por que não existe | Alternativa |
|---|---|---|
| `color` | A pele é do `DssToolbar` | `brand` |
| `logoSrc` | O desenho vive nos dados, não numa URL | slot `brand` |
| `actions` (array) | Lista de ações como dados é reimplementar slot | slot `actions` |

## Composição exigida

| Requisito | Por quê |
|---|---|
| `QLayout` / `DssLayout` ancestral | O `DssHeader` não renderiza fora de um. **Falha em silêncio** |

## Tokens

| Token | Camada | Uso |
|---|---|---|
| `--dss-layout-header-height-compact` | L3 | 48px — altura `compact` |
| `--dss-layout-header-height` | L3 | 64px — altura `standard` |
| `--dss-spacing-3`, `-4`, `-5`, `-6` | L2, L3 | Respiros e gaps |
| `--dss-border-width-thin` | L2 | Espessura do divisor |
| `--dss-opacity-brand-medium` | L2 | Opacidade do divisor |
| `--dss-font-size-lg` | L2 | Tamanho do título (18px) |
| `--dss-font-weight-medium` | L2 | Peso do título |
| `--dss-line-height-snug` | L2 | Entrelinha do título |
