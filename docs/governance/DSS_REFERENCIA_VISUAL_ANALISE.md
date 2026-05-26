# Análise Visual das Referências de Mercado — DSS

**Data:** 26 de Maio de 2026
**Objetivo:** Registrar as observações visuais coletadas nas páginas de componentes das referências Material Design 3, IBM Carbon e Salesforce Lightning, com indicações concretas de como cada categoria de componente DSS deveria se parecer.

---

## Metodologia

As três referências foram analisadas diretamente em suas documentações oficiais:

- **Material Design 3** — m3.material.io
- **IBM Carbon** — carbondesignsystem.com
- **Salesforce Lightning** — lightningdesignsystem.com

Para cada categoria de componente, foram observados: forma (border-radius), cor, tipografia, espaçamento, estados interativos (hover, focus, active, disabled) e densidade visual geral.

---

## 1. Botões (Button, FAB, BtnToggle, BtnDropdown)

### O que as referências mostram

**Material Design 3** define cinco variantes de botão com hierarquia clara:
- **Filled** (ação principal): fundo sólido na cor primária (`#6750A4` no M3 padrão), texto branco, `border-radius: 20px` (formato de pílula completo), sem sombra por padrão, `height: 40px`, `padding: 0 24px`, `font-size: 14px`, `font-weight: 500`, `letter-spacing: 0.1px`, `text-transform: none`.
- **Outlined** (ação secundária): fundo transparente, borda `1px solid` na cor de outline (`#79747E`), texto na cor primária, mesmo border-radius.
- **Text** (ação terciária): sem fundo, sem borda, texto na cor primária.
- **Elevated**: fundo `surface-container-low`, sombra `elevation level 1`.
- **Tonal**: fundo `secondary-container`, texto `on-secondary-container`.

**IBM Carbon** usa botões mais quadrados:
- `border-radius: 0` (sem arredondamento) ou `border-radius: 4px` no Carbon v11.
- Altura `48px` para tamanho padrão (`md`), `32px` para `sm`.
- Fundo sólido na cor primária (`#0f62fe`), texto branco.
- `font-size: 14px`, `font-weight: 400`, `letter-spacing: 0.16px`, `text-transform: none`.
- Hover: fundo escurece para `#0353e9` (10% mais escuro).
- Ícone à direita com `padding-right: 64px` para dar espaço.

**Salesforce Lightning** usa botões com `border-radius: 4px`:
- Variante primária: fundo `#0176d3` (azul Salesforce), texto branco.
- Variante neutra: fundo branco, borda `1px solid #dddbda`, texto escuro.
- `height: 32px` (padrão), `padding: 0 12px`.
- `font-size: 13px`, `font-weight: 700`, `text-transform: none`.

### Como o DSS deveria se parecer

O DSS deve adotar o padrão **Material Design 3 Filled** como variante `elevated` (principal):

| Propriedade | Valor DSS |
|---|---|
| `border-radius` | `var(--dss-radius-full)` — pílula completa (20px+) |
| `height` | `var(--dss-touch-target-md)` — 44px |
| `padding` | `0 var(--dss-spacing-6)` — 0 24px |
| `background` | `var(--dss-action-primary)` |
| `color` | `var(--dss-text-inverse)` |
| `font-size` | `var(--dss-font-size-sm)` — 14px |
| `font-weight` | `var(--dss-font-weight-medium)` — 500 |
| `letter-spacing` | `0.01em` |
| `text-transform` | `none` |
| Hover | `background: var(--dss-action-primary-hover)` |
| Focus | `outline: 3px solid var(--dss-action-primary-focus)`, `outline-offset: 2px` |
| Disabled | `opacity: 0.38`, `cursor: not-allowed` |

**Variante `outlined`:** borda `1px solid var(--dss-action-primary)`, fundo transparente, texto `var(--dss-action-primary)`.

**Variante `flat`/`text`:** sem borda, sem fundo, texto `var(--dss-action-primary)`.

---

## 2. Formulários (Input, Select, Textarea)

### O que as referências mostram

**Material Design 3** — Text Field:
- Duas variantes: **Filled** (fundo `surface-container-highest`, borda inferior `1px`) e **Outlined** (borda completa `1px`).
- `border-radius` no Filled: `4px 4px 0 0` (arredondado no topo, reto na base).
- `border-radius` no Outlined: `4px` em todos os cantos.
- Label flutuante: cor `on-surface-variant` no repouso, cor primária no foco.
- Borda no foco: `2px solid` na cor primária.
- `height: 56px` (padrão), `padding: 16px`.
- Ícones de suporte (leading/trailing) com `24px`.

**IBM Carbon** — Text Input:
- Variante única com borda inferior `1px solid #8d8d8d` no repouso.
- Foco: borda inferior `2px solid #0f62fe`.
- `height: 40px` (padrão), `padding: 0 16px`.
- Label acima do campo (não flutuante), `font-size: 12px`, `font-weight: 400`.
- Fundo `#f4f4f4` no repouso, `#ffffff` no foco.
- Mensagem de erro em vermelho abaixo do campo com ícone.

**Salesforce Lightning** — Input:
- Borda `1px solid #dddbda` no repouso.
- Foco: borda `1px solid #1b96ff` + `box-shadow: 0 0 3px #0176d3`.
- `height: 32px`, `border-radius: 4px`, `padding: 0 12px`.
- Label acima do campo, `font-size: 13px`.

### Como o DSS deveria se parecer

O DSS adota a variante **Outlined** como padrão, inspirada no M3 Outlined + Carbon:

| Propriedade | Estado | Valor DSS |
|---|---|---|
| `border` | Repouso | `1px solid var(--dss-gray-400)` |
| `border` | Hover | `1px solid var(--dss-gray-600)` |
| `border` | Foco | `2px solid var(--dss-action-primary)` |
| `border-radius` | — | `var(--dss-radius-md)` — 8px |
| `height` | — | `var(--dss-touch-target-md)` — 44px |
| `padding` | — | `0 var(--dss-spacing-4)` — 0 16px |
| `background` | Repouso | `var(--dss-surface-default)` |
| `label color` | Repouso | `var(--dss-text-subtle)` |
| `label color` | Foco | `var(--dss-action-primary)` |
| `font-size` | — | `var(--dss-font-size-sm)` — 14px |

---

## 3. Controles de Seleção (Checkbox, Radio, Toggle)

### O que as referências mostram

**Material Design 3** — Checkbox:
- Tamanho do controle: `18px × 18px`.
- Estado unchecked: borda `2px solid on-surface-variant` (cinza médio), fundo transparente.
- Estado checked: fundo `primary`, ícone de check branco, sem borda visível.
- `border-radius: 2px` (levemente arredondado).
- Estado indeterminate: fundo `primary`, traço horizontal branco.
- Área de toque: `40px × 40px` (com ripple).

**Material Design 3** — Radio:
- Tamanho: `20px × 20px`, circular.
- Unchecked: borda `2px solid on-surface-variant`.
- Checked: borda `2px solid primary` + ponto interno `10px` na cor `primary`.

**Material Design 3** — Switch (Toggle):
- Track unchecked: `52px × 32px`, fundo `surface-container-highest`, borda `2px solid outline`.
- Track checked: fundo `primary`, sem borda.
- Thumb unchecked: `16px`, fundo `outline` (cinza), centralizado.
- Thumb checked: `24px`, fundo `primary-container` (branco/claro), centralizado.
- Transição suave do thumb com `spring animation`.

**IBM Carbon** — Checkbox:
- `16px × 16px`, `border-radius: 2px`.
- Unchecked: borda `1px solid #8d8d8d`.
- Checked: fundo `#0f62fe`, ícone branco.

**IBM Carbon** — Toggle:
- Track: `48px × 24px`, arredondado.
- Off: fundo `#8d8d8d`.
- On: fundo `#0f62fe`.
- Thumb: `18px`, branco.

### Como o DSS deveria se parecer

**Checkbox:**

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Tamanho | — | `18px × 18px` |
| `border-radius` | — | `var(--dss-radius-sm)` — 4px |
| Borda | Unchecked | `2px solid var(--dss-gray-500)` |
| Fundo | Checked | `var(--dss-action-primary)` |
| Ícone | Checked | branco |
| Área de toque | — | `44px × 44px` |

**Radio:**

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Tamanho | — | `20px × 20px` |
| Borda | Unchecked | `2px solid var(--dss-gray-500)` |
| Borda | Checked | `2px solid var(--dss-action-primary)` |
| Ponto interno | Checked | `10px`, `var(--dss-action-primary)` |

**Toggle:**

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Track | Off | fundo `var(--dss-surface-muted)`, borda `2px solid var(--dss-gray-400)` |
| Track | On | fundo `var(--dss-action-primary)`, sem borda |
| Thumb | Off | `16px`, fundo `var(--dss-gray-500)` |
| Thumb | On | `24px`, fundo `var(--dss-text-inverse)` |

> **Observação crítica:** O estado **unchecked** dos três controles deve usar `var(--dss-gray-500)` (cinza médio), **não** a cor primária. A cor primária só aparece no estado **checked/on**. O que foi implementado anteriormente (primary no unchecked) diverge das três referências.

---

## 4. Chips e Badges

### O que as referências mostram

**Material Design 3** — Chip:
- Quatro variantes: Assist, Filter, Input, Suggestion.
- Formato: `border-radius: 8px` (não é pílula completa — é arredondado mas não oval).
- Altura: `32px`.
- Filter chip selecionado: fundo `secondary-container`, ícone de check à esquerda.
- Borda no estado padrão: `1px solid outline-variant`.
- `font-size: 14px`, `font-weight: 500`.

**IBM Carbon** — Tag:
- `border-radius: 24px` (pílula).
- Altura: `24px`.
- Fundo tintado por tipo (gray, blue, green, red, etc.).
- `font-size: 12px`.

**Salesforce Lightning** — Badge/Pill:
- `border-radius: 15px` (pílula).
- Altura: `20–24px`.
- Fundo colorido por tipo.

### Como o DSS deveria se parecer

| Propriedade | Valor DSS |
|---|---|
| `border-radius` | `var(--dss-radius-full)` — pílula |
| `height` | `32px` |
| `padding` | `0 var(--dss-spacing-3)` — 0 12px |
| Fundo (default/neutro) | `var(--dss-surface-muted)` |
| Texto (default/neutro) | `var(--dss-text-body)` |
| Fundo (primary/ativo) | `var(--dss-action-primary)` |
| Texto (primary/ativo) | `var(--dss-text-inverse)` |
| `font-size` | `var(--dss-font-size-xs)` — 12px |
| `font-weight` | `var(--dss-font-weight-medium)` — 500 |

---

## 5. Cards e Superfícies

### O que as referências mostram

**Material Design 3** — Card:
- Três variantes: **Elevated** (sombra `elevation 1`), **Filled** (fundo `surface-container-highest`, sem sombra), **Outlined** (borda `1px solid outline-variant`).
- `border-radius: 12px` em todos.
- Fundo: `surface-container-low` no Elevated.
- Hover no Elevated: `elevation 2` + overlay `on-surface` a 8%.
- Padding interno: `16px`.

**IBM Carbon** — Tile:
- `border-radius: 0` (sem arredondamento).
- Borda `1px solid #e0e0e0`.
- Fundo `#f4f4f4` (clickable tile) ou `#ffffff`.
- Hover: fundo `#e8e8e8`.

**Salesforce Lightning** — Card:
- `border-radius: 4px`.
- Sombra: `0 2px 2px rgba(0,0,0,0.1)`.
- Fundo branco.
- Header com `padding: 12px 16px`, borda inferior `1px solid #dddbda`.

### Como o DSS deveria se parecer

| Propriedade | Valor DSS |
|---|---|
| `border-radius` | `var(--dss-radius-lg)` — 12px |
| Fundo | `var(--dss-surface-default)` |
| Sombra (elevated) | `var(--dss-elevation-1)` |
| Sombra (hover) | `var(--dss-elevation-2)` |
| Borda (outlined) | `1px solid var(--dss-gray-200)` |
| Padding interno | `var(--dss-spacing-4)` — 16px |

---

## 6. Tabs (Abas)

### O que as referências mostram

**Material Design 3** — Tabs:
- Duas variantes: **Primary** (indicador embaixo, `3px`, cor primária) e **Secondary** (indicador embaixo, `2px`, cor primária).
- Tab ativa: texto na cor primária, `font-weight: 500`.
- Tab inativa: texto `on-surface-variant` (cinza médio), `font-weight: 400`.
- Hover: overlay `on-surface` a 8%.
- `height: 48px`.
- Indicador: `border-radius: 3px 3px 0 0` na ponta.

**IBM Carbon** — Tabs:
- Indicador: borda inferior `2px solid #0f62fe` na aba ativa.
- Tab ativa: texto `#0f62fe`, `font-weight: 600`.
- Tab inativa: texto `#525252`.
- `height: 40px`.

**Salesforce Lightning** — Tabs:
- Indicador: borda inferior `2px solid #0176d3`.
- Tab ativa: texto `#0176d3`, `font-weight: 700`.
- `height: 44px`.

### Como o DSS deveria se parecer

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Indicador | Ativo | `3px solid var(--dss-action-primary)`, `border-radius: 3px 3px 0 0` |
| Texto | Ativo | `var(--dss-action-primary)`, `font-weight: 500` |
| Texto | Inativo | `var(--dss-text-subtle)`, `font-weight: 400` |
| Fundo hover | — | `var(--dss-surface-hover)` — rgba(0,0,0,0.04) |
| `height` | — | `var(--dss-touch-target-md)` — 44px |

---

## 7. Progresso e Spinners

### O que as referências mostram

**Material Design 3** — Linear Progress:
- Track: `4px` de altura, fundo `secondary-container` (cinza claro).
- Indicador: fundo `primary`.
- `border-radius: 4px` em ambos.
- Animação indeterminada: dois segmentos se movendo.

**Material Design 3** — Circular Progress:
- Traço: `4px` de espessura.
- Cor: `primary`.
- Animação: rotação + variação do arco.

**IBM Carbon** — Loading:
- Spinner circular, traço `4px`.
- Cor: `#0f62fe`.
- Track: `#c6c6c6`.

### Como o DSS deveria se parecer

**LinearProgress:**

| Propriedade | Valor DSS |
|---|---|
| Altura | `4px` |
| `border-radius` | `var(--dss-radius-full)` |
| Cor do indicador | `var(--dss-action-primary)` |
| Cor do track | `var(--dss-gray-200)` |

**CircularProgress / Spinner:**

| Propriedade | Valor DSS |
|---|---|
| Espessura do traço | `4px` |
| Cor | `var(--dss-action-primary)` |
| Cor do track | `var(--dss-gray-200)` |

---

## 8. Navegação (Breadcrumbs, Pagination, Stepper)

### O que as referências mostram

**Material Design 3** — Breadcrumbs (não tem componente nativo, mas padrão de link):
- Links: cor primária, sem sublinhado por padrão, sublinhado no hover.
- Separador: `/` ou `>` em `on-surface-variant`.
- Item atual: texto `on-surface` (escuro), sem link.

**IBM Carbon** — Breadcrumb:
- Links: `#0f62fe`, sem sublinhado, sublinhado no hover.
- Separador: `/` em `#c6c6c6`.
- Item atual: texto `#161616`, `font-weight: 400`.

**Salesforce Lightning** — Breadcrumbs:
- Links: `#0176d3`, sem sublinhado.
- Item atual: texto `#3e3e3c`, `font-weight: 700`.

**IBM Carbon** — Pagination:
- Página ativa: fundo `#0f62fe`, texto branco.
- Páginas inativas: fundo transparente, texto `#161616`.
- Hover: fundo `#e8e8e8`.
- `border-radius: 0` (Carbon) ou `4px`.

**Material Design 3** — Stepper (não nativo, mas padrão):
- Step ativo: círculo `24px`, fundo `primary`, número branco.
- Step concluído: círculo `24px`, fundo `primary`, ícone de check branco.
- Step inativo: círculo `24px`, borda `1px solid on-surface-variant`, número `on-surface-variant`.
- Linha conectora: `1px solid outline-variant`.

### Como o DSS deveria se parecer

**Breadcrumbs:**

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Cor do link | Repouso | `var(--dss-text-action)` — mapeia para `action-primary` |
| Decoração | Repouso | `none` |
| Decoração | Hover | `underline` |
| Cor do item atual | — | `var(--dss-text-body)` |
| `font-weight` item atual | — | `var(--dss-font-weight-medium)` |

**Pagination:**

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Fundo da página ativa | — | `var(--dss-action-primary)` |
| Texto da página ativa | — | `var(--dss-text-inverse)` |
| Fundo hover | — | `var(--dss-surface-hover)` |
| `border-radius` | — | `var(--dss-radius-sm)` — 4px |

**Stepper:**

| Propriedade | Estado | Valor DSS |
|---|---|---|
| Círculo ativo | — | fundo `var(--dss-action-primary)`, texto `var(--dss-text-inverse)` |
| Círculo concluído | — | fundo `var(--dss-action-primary)`, ícone check branco |
| Círculo inativo | — | borda `1px solid var(--dss-gray-400)`, texto `var(--dss-text-subtle)` |
| Linha conectora | — | `1px solid var(--dss-gray-300)` |

---

## 9. Listas e Itens

### O que as referências mostram

**Material Design 3** — List:
- Item padrão: `height: 56px` (com suporte), `padding: 0 16px`.
- Item ativo/selecionado: fundo `secondary-container` (tintado), texto `on-secondary-container`.
- Hover: overlay `on-surface` a 8%.
- Divider: `1px solid outline-variant`.
- Leading element (avatar/ícone): `40px`, margem direita `16px`.

**IBM Carbon** — List:
- Item: `height: 40px`, `padding: 0 16px`.
- Hover: fundo `#e8e8e8`.
- Selecionado: fundo `#e8e8e8` + borda esquerda `4px solid #0f62fe`.

**Salesforce Lightning** — List:
- Item: `height: 32px`, `padding: 0 12px`.
- Hover: fundo `#f3f2f2`.
- Selecionado: texto `#0176d3`, `font-weight: 700`.

### Como o DSS deveria se parecer

| Propriedade | Estado | Valor DSS |
|---|---|---|
| `height` | — | `56px` (com suporte) / `48px` (simples) |
| `padding` | — | `0 var(--dss-spacing-4)` — 0 16px |
| Fundo hover | — | `var(--dss-surface-hover)` |
| Fundo ativo | — | `var(--dss-action-primary-surface)` — primary a 8% |
| Texto ativo | — | `var(--dss-action-primary)` |
| Divider | — | `1px solid var(--dss-gray-200)` |

---

## 10. Avatar e Indicadores

### O que as referências mostram

**Material Design 3** — Avatar (não nativo, mas padrão de profile picture):
- Circular, `40px` padrão.
- Sem imagem: fundo `primary-container`, iniciais em `on-primary-container`.
- Com imagem: `object-fit: cover`, `border-radius: 50%`.

**IBM Carbon** — Avatar:
- Circular, `32px` padrão.
- Sem imagem: fundo colorido por tipo/status.

**Material Design 3** — Badge:
- Pequeno (dot): `6px`, fundo `error`.
- Com número: `16px height`, `border-radius: 8px`, fundo `error` ou `primary`.
- `font-size: 11px`, `font-weight: 500`, texto branco.

### Como o DSS deveria se parecer

**Avatar:**

| Propriedade | Valor DSS |
|---|---|
| `border-radius` | `50%` |
| Tamanho padrão | `40px × 40px` |
| Fundo (sem imagem) | `var(--dss-action-primary-surface)` — primary a 8% |
| Texto/ícone (sem imagem) | `var(--dss-action-primary)` |

> **Observação:** O fundo do avatar sem imagem deve ser o tintado claro (`action-primary-surface`), não o `surface-muted` (cinza). Isso dá identidade visual ao componente sem ser agressivo.

**Badge:**

| Propriedade | Valor DSS |
|---|---|
| `border-radius` | `var(--dss-radius-full)` |
| `height` | `16px` |
| `min-width` | `16px` |
| `padding` | `0 4px` |
| Fundo | `var(--dss-action-primary)` |
| Texto | `var(--dss-text-inverse)` |
| `font-size` | `11px` |

---

## 11. Ponto Crítico: O que diverge do que foi implementado

| Componente | O que foi implementado | O que as referências indicam |
|---|---|---|
| **Checkbox/Radio unchecked** | Borda na cor `primary` | Borda em `gray-500` (cinza médio) — primary só no checked |
| **Toggle unchecked** | Track em `surface-muted` (cinza) | Track com borda `2px solid gray-400` + thumb cinza — correto |
| **Avatar sem imagem** | Fundo `surface-muted` (cinza) | Fundo `action-primary-surface` (tintado claro) |
| **Button border-radius** | `radius-full` aplicado | Correto — M3 usa pílula |
| **Input focus** | Label muda para primary | Correto — M3 e Carbon fazem isso |
| **Tabs indicador** | `currentColor` herdado | Deve ser explicitamente `3px solid action-primary` |

---

## 12. Resumo: Valores Concretos por Componente

| Componente | Propriedade | Valor correto |
|---|---|---|
| Button (primary) | background | `var(--dss-action-primary)` |
| Button (primary) | border-radius | `var(--dss-radius-full)` |
| Button (primary) | height | `44px` |
| Button (primary) | font-weight | `500` |
| Button (primary) | text-transform | `none` |
| Input | border (repouso) | `1px solid var(--dss-gray-400)` |
| Input | border (foco) | `2px solid var(--dss-action-primary)` |
| Input | border-radius | `var(--dss-radius-md)` — 8px |
| Input | label (foco) | `var(--dss-action-primary)` |
| Checkbox | borda (unchecked) | `2px solid var(--dss-gray-500)` |
| Checkbox | fundo (checked) | `var(--dss-action-primary)` |
| Radio | borda (unchecked) | `2px solid var(--dss-gray-500)` |
| Radio | borda (checked) | `2px solid var(--dss-action-primary)` |
| Toggle | track (off) | `var(--dss-surface-muted)` + borda `2px solid var(--dss-gray-400)` |
| Toggle | track (on) | `var(--dss-action-primary)` |
| Card | border-radius | `var(--dss-radius-lg)` — 12px |
| Card | box-shadow | `var(--dss-elevation-1)` |
| Tab ativa | color | `var(--dss-action-primary)` |
| Tab ativa | indicador | `3px solid var(--dss-action-primary)` |
| Tab inativa | color | `var(--dss-text-subtle)` |
| Avatar (sem imagem) | background | `var(--dss-action-primary-surface)` |
| Avatar (sem imagem) | color | `var(--dss-action-primary)` |
| Badge | background | `var(--dss-action-primary)` |
| Badge | border-radius | `var(--dss-radius-full)` |
| Breadcrumb link | color | `var(--dss-text-action)` |
| Breadcrumb link | hover | `text-decoration: underline` |
| Pagination ativa | background | `var(--dss-action-primary)` |
| Stepper ativo | background | `var(--dss-action-primary)` |
| LinearProgress | track | `var(--dss-gray-200)` |
| LinearProgress | indicador | `var(--dss-action-primary)` |
| Spinner | color | `var(--dss-action-primary)` |
