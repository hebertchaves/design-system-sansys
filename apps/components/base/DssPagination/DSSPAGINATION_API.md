# DssPagination — API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `model-value` | `Number` | — | **(Obrigatório)** Página atual selecionada. Usar com `v-model`. |
| `max` | `Number` | — | **(Obrigatório)** Número total de páginas. |
| `max-pages` | `Number` | `5` | Número máximo de botões de página visíveis simultaneamente. |
| `disable` | `Boolean` | `false` | Desabilita toda a paginação (visual + interação). |
| `readonly` | `Boolean` | `false` | Bloqueia interação sem alterar aparência visual. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho dos botões de página. Mapeia para `--dss-compact-control-height-*`. |
| `ellipses` | `Boolean` | `true` | Exibe reticências (`…`) para páginas fora da janela visível. |
| `boundary-links` | `Boolean` | `false` | Exibe botões para ir à primeira e à última página. |
| `direction-links` | `Boolean` | `true` | Exibe botões para ir à página anterior e à próxima. |
| `flat` | `Boolean` | `false` | Variante sem fundo preenchido no botão ativo. |
| `outline` | `Boolean` | `false` | Variante com borda no botão ativo. |
| `round` | `Boolean` | `false` | Variante com botões circulares. |
| `brand` | `'hub' \| 'water' \| 'waste'` | — | Contexto de marca. Sobrescreve `--q-color-primary` com o token de marca correspondente. |
| `aria-label` | `String` | `'Navegação por páginas'` | Rótulo acessível para o `role="navigation"` do container raiz. |

## Eventos

| Evento | Payload | Descrição |
|---|---|---|
| `update:modelValue` | `number` | Emitido quando o usuário seleciona uma página. Atualiza o `v-model`. |

## Slots

Nenhum slot disponível. QPagination é usado como motor e não expõe API de slot para botões individuais (ver EXC-01 em `dss.meta.json`).

## Tokens Utilizados

### Cores
| Token | Uso |
|---|---|
| `--dss-action-primary` | Cor de fundo do botão ativo (via `--q-color-primary`). |
| `--dss-text-primary` | Cor do texto dos botões inativos e setas de navegação. |
| `--dss-text-on-primary` | Cor do texto no botão ativo (contraste sobre `--dss-action-primary`). |
| `--dss-hub-primary` | Cor ativa no contexto `brand="hub"`. |
| `--dss-water-primary` | Cor ativa no contexto `brand="water"`. |
| `--dss-waste-primary` | Cor ativa no contexto `brand="waste"`. |

### Espaçamento e Dimensões
| Token | Uso |
|---|---|
| `--dss-gap-1` | Espaçamento entre botões de página. |
| `--dss-compact-control-height-xs/sm/md/lg` | Dimensão mínima dos botões por `size`. |

### Tipografia
| Token | Uso |
|---|---|
| `--dss-font-size-xs` | Tamanho do texto nos sizes `xs` e `sm`. |
| `--dss-font-size-sm` | Tamanho do texto no size `md` (padrão). |
| `--dss-font-size-md` | Tamanho do texto no size `lg`. |
| `--dss-font-weight-medium` | Peso dos números de página (inativos). |
| `--dss-font-weight-bold` | Peso do número de página ativo (variante `flat`). |

### Forma
| Token | Uso |
|---|---|
| `--dss-radius-md` | Raio de borda padrão dos botões. |
| `--dss-radius-full` | Raio de borda na variante `round`. |
| `--dss-border-width-thin` | Espessura de borda (variante `outline`, high contrast). |
| `--dss-border-width-medium` | Espessura de borda do botão ativo em high contrast. |

### Movimento
| Token | Uso |
|---|---|
| `--dss-duration-150` | Duração das transições de hover/active. |
| `--dss-easing-standard` | Curva de easing para transições. |

### Feedback
| Token | Uso |
|---|---|
| `--dss-opacity-disabled` | Opacidade quando `disable=true`. |

## Exceções Arquiteturais

### EXC-01 — Motor QPagination
QPagination é utilizado como motor de navegação. Ele não fornece API de slot para botões individuais, impossibilitando a substituição por `DssButton`. A lógica de paginação (elipses, janela de páginas, boundary/direction links) é inteiramente gerenciada pelo Quasar.

### EXC-Gate-01 — Seletores CSS internos
Os seletores `.q-pagination__middle` e `.q-pagination .q-btn` são sobrescritos em `2-composition/_base.scss` com tokens DSS. A propriedade CSS `--q-color-primary` é sobreescrita para conectar os tokens de marca sem uso de `:deep()` ou `!important` nos estilos de cor.

## Acessibilidade

- Container raiz recebe `role="navigation"` e `aria-label` configurável.
- QPagination gerencia `aria-current="page"` no botão da página ativa internamente (valor correto per ARIA spec).
- Foco visível via `@include mixins.dss-focus-ring` em `:focus-visible`.
- Navegação por teclado: `Tab` entre botões, `Enter`/`Space` para ativar.
- Estado `disabled` aplica `pointer-events: none` + `opacity: var(--dss-opacity-disabled)`.
